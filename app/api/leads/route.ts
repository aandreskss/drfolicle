import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { createHash } from 'crypto';
import { serviceClient } from '@/lib/content/server-client';
import { checkRateLimit } from '@/lib/rate-limit';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.email().max(200),
  phone: z.string().max(30).optional(),
  interests: z.array(z.string().max(60)).max(5).default([]),
  message: z.string().max(1000).optional(),
  hp: z.string().max(0),
  locale: z.enum(['es', 'en']).default('es'),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ipHash = createHash('sha256')
    .update(ip + (process.env.IP_HASH_SALT ?? ''))
    .digest('hex')
    .slice(0, 16);

  const rl = checkRateLimit(ipHash);
  if (!rl.ok) {
    return NextResponse.json({ error: 'rate_limit' }, {
      status: 429,
      headers: { 'Retry-After': String(rl.retryAfter) },
    });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation' }, { status: 400 });
  }

  const { hp, locale, ...data } = parsed.data;

  // Honeypot — accept silently so bots don't retry
  if (hp.length > 0) return NextResponse.json({ ok: true });

  const { error: dbErr } = await serviceClient().from('leads').insert({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    interests: data.interests,
    message: data.message ?? null,
    source_page: 'contacto',
    consent_at: new Date().toISOString(),
    consent_text_version: 'v1',
    ip_hash: ipHash,
  });
  if (dbErr) console.error('leads insert', dbErr.message);

  const toEmail = process.env.LEADS_TO_EMAIL;
  const fromEmail = process.env.LEADS_FROM_EMAIL ?? 'noreply@drfolliclesolutions.com';
  if (toEmail && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const interestsLine = data.interests.length > 0
      ? `<strong>Intereses:</strong> ${data.interests.join(', ')}<br/>`
      : '';
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Nuevo lead: ${data.name}`,
      html: `<p>
<strong>Nombre:</strong> ${data.name}<br/>
<strong>Email:</strong> ${data.email}<br/>
${data.phone ? `<strong>Teléfono:</strong> ${data.phone}<br/>` : ''}
${interestsLine}
${data.message ? `<strong>Mensaje:</strong> ${data.message}` : ''}
</p>`,
    }).catch((e: unknown) => console.error('resend error', e));
  }

  return NextResponse.json({ ok: true });
}
