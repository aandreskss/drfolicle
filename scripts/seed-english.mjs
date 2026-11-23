// seed-english.mjs — Agrega traducciones al inglés en Supabase
// Ejecutar: node scripts/seed-english.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => [l.split('=')[0].trim(), l.split('=').slice(1).join('=').trim()])
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// ─── Utilidad: actualiza el campo EN de una sección ─────────────────────────
async function updateSection(pageSlug, key, en) {
  const { data, error } = await supabase
    .from('page_sections')
    .select('id, data_draft, data_published')
    .eq('page_slug', pageSlug)
    .eq('key', key)
    .single();

  if (error || !data) {
    console.warn(`  ⚠ No encontrada: [${pageSlug}] ${key}`);
    return;
  }

  const merged = {
    ...data.data_published,
    content: {
      ...data.data_published?.content,
      en: { ...data.data_published?.content?.en, ...en },
    },
  };

  const { error: err } = await supabase
    .from('page_sections')
    .update({ data_draft: merged, data_published: merged })
    .eq('id', data.id);

  if (err) console.error(`  ✗ [${pageSlug}] ${key}:`, err.message);
  else console.log(`  ✓ [${pageSlug}] ${key}`);
}

// ─── Secciones de páginas ─────────────────────────────────────────────────────
const sections = [
  // BLOG
  ['blog', 'hero', {
    t1: 'Clear answers about', t2: 'your hair.',
    text: 'Guides written with the Dr Follicle Solutions team so you arrive at your assessment with your questions answered.',
  }],
  ['blog', 'listado', { t1: 'Articles', t2: '', text: '' }],

  // CONTACTO
  ['contacto', 'hero', {
    t1: "Let's talk about", t2: 'your case.',
    text: 'Leave your details and a specialist will contact you to schedule your assessment. The first assessment is free.',
  }],
  ['contacto', 'formulario', {
    t1: 'Request your free assessment', t2: '',
    cta: 'Request free assessment', text: '', ctaLink: '',
  }],
  ['contacto', 'mapa', {
    t1: 'Visit us in Medellín', t2: '', cta: 'Open in Google Maps',
  }],

  // INICIO
  ['inicio', 'confianza', {
    t1: 'Why trust us', t2: '',
    text: 'Personalized care · Specialized medical team · Precision technology · Complete support',
  }],
  ['inicio', 'resultados', {
    t1: 'Results that tell', t2: 'real stories.',
    cta: 'Free assessment',
    text: 'Results vary by patient. We only publish real photographs with express authorization.',
    ctaLink: '#contact',
  }],
  ['inicio', 'ciencia', {
    t1: 'Medical precision.', t2: 'Results designed for you.',
    cta: 'Contact us',
    text: 'How the FUE technique works: extraction, preparation, and implantation.',
    ctaLink: 'https://wa.me/19548535335',
  }],
  ['inicio', 'proceso', {
    t1: 'Your transformation begins', t2: 'with a conversation.',
    text: 'The Dr Follicle process in 5 stages.',
  }],
  ['inicio', 'especialistas', {
    t1: 'The hands behind', t2: 'every result.',
    cta: 'Learn more about us',
    text: 'The same team attends you from assessment to follow-up.',
    ctaLink: '/nosotros#equipo',
  }],
  ['inicio', 'turismo', {
    t1: 'Your hair transplant in Medellín,', t2: 'with support at every step.',
    cta: 'Discover our international patient experience',
    text: 'Wherever you are coming from, we coordinate every step so you can focus on your recovery and enjoy Medellín.',
    ctaLink: '/turismo-medico',
  }],
  ['inicio', 'testimonios', { t1: 'Stories in', t2: 'their own words.', text: '' }],
  ['inicio', 'consulta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Request free assessment',
    text: 'Leave your details and a specialist will contact you to schedule your assessment. The first assessment is free.',
    ctaLink: '',
  }],
  ['inicio', 'faq', {
    t1: 'Frequently asked', t2: 'questions',
    text: "Can't find your question? Write to us and the medical team will respond.",
  }],

  // NOSOTROS
  ['nosotros', 'hero', {
    t1: 'Hair restoration experts', t2: 'you can trust.',
    cta: 'Free assessment',
    text: 'We are a hair restoration clinic in Medellín. We treat patients from Colombia, the United States, and other countries with an individual approach.',
    ctaLink: '/contacto',
  }],
  ['nosotros', 'filosofia', {
    t1: 'Our philosophy: precision, personalization', t2: 'and care.',
    text: 'Every patient deserves an individual approach. We combine medical science and aesthetic precision.',
  }],
  ['nosotros', 'equipo', {
    t1: 'The hands behind', t2: 'every result.',
    text: 'Learn about their training and experience before making a decision.',
  }],
  ['nosotros', 'tecnica', {
    t1: 'Advanced techniques and', t2: 'medical excellence.',
    cta: 'Learn about our method',
    text: 'We specialize in follicular unit extraction (FUE): minimal scarring and optimal graft survival.',
    ctaLink: '/nuestro-metodo',
  }],
  ['nosotros', 'compromisos', {
    t1: 'Experience, transparency', t2: 'and closeness.',
    text: 'Your comfort, your safety, and your confidence are our priority.',
  }],
  ['nosotros', 'largoplazo', {
    t1: 'Results designed', t2: 'for the long term.',
    text: 'Hair restoration is a gradual transformation: treatments are designed for sustainable growth and balanced density. Timelines vary by patient.',
  }],
  ['nosotros', 'internacional', {
    t1: 'A clear journey,', t2: 'from start to finish.',
    cta: 'Learn about medical tourism',
    text: 'Medellín is a growing medical tourism destination. We support you with a prior remote consultation and follow-up guidance after the procedure.',
    ctaLink: '/turismo-medico',
  }],
  ['nosotros', 'clinica', {
    t1: 'Our clinic', t2: 'in Medellín',
    cta: 'Free assessment at the clinic', text: '', ctaLink: '/contacto',
  }],
  ['nosotros', 'cta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Free assessment',
    text: 'The first assessment is free. It can be at the clinic in Medellín or by video call from your country.',
    ctaLink: '/contacto',
  }],

  // NUESTRO MÉTODO
  ['nuestro-metodo', 'hero', {
    t1: 'A safe, natural process', t2: 'designed for you.',
    cta: 'Free assessment',
    text: 'Our method is patient-centered: we accompany you from the first free assessment to the last follow-up appointment.',
    ctaLink: '/contacto',
  }],
  ['nuestro-metodo', 'pilares', {
    t1: 'Expert diagnosis · Your history, reviewed · A personalized plan', t2: '',
    text: 'Three pillars that define how your process begins.',
  }],
  ['nuestro-metodo', 'etapas', {
    t1: 'The method in', t2: '4 stages',
    text: 'Free assessment · Personalized treatment plan · The procedure · Recovery and support',
  }],
  ['nuestro-metodo', 'caminos', {
    t1: 'Your plan can take', t2: 'two paths.',
    text: 'Depending on the stage of your hair loss, the plan includes preventive care, surgical restoration, or both.',
  }],
  ['nuestro-metodo', 'beneficios', {
    t1: 'How this method', t2: 'helps you.',
    text: 'More density and a natural hairline · Minimal scarring · Safe protocols · Long-term confidence',
  }],
  ['nuestro-metodo', 'cta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Free assessment',
    text: 'The first assessment is free. It can be at the clinic in Medellín or by video call from your country.',
    ctaLink: '/contacto',
  }],

  // RESULTADOS
  ['resultados', 'hero', {
    t1: 'Results that tell', t2: 'real stories.',
    text: 'Real photographs of Dr Follicle Solutions patients in Medellín, published with their authorization. Results vary by patient.',
  }],
  ['resultados', 'historias', {
    t1: 'Stories in', t2: 'their own words.',
    cta: 'More videos on YouTube', text: '',
    ctaLink: 'https://www.youtube.com/@dr.folliclesolutions',
  }],
  ['resultados', 'cta', {
    t1: 'Ready to see', t2: 'your own result?',
    cta: 'Free assessment',
    text: 'Free assessment: we discuss your case and show you similar results.',
    ctaLink: '/contacto',
  }],

  // SERVICIOS
  ['servicios', 'hero', {
    t1: 'Solutions to restore your hair,', t2: 'your beard and your eyebrows.',
    text: 'Treatments for men and women using the FUE technique and hair therapies. Each one starts with an assessment of your case.',
  }],
  ['servicios', 'lista', { t1: 'Treatments', t2: '', text: '' }],
  ['servicios', 'orientador', {
    t1: 'Not sure which one', t2: 'is right for you?',
    cta: 'Free assessment',
    text: 'This is general guidance. The final recommendation comes from the specialist at your assessment, which is free.',
    ctaLink: '/contacto',
  }],
  ['servicios', 'cta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Free assessment',
    text: 'The first assessment is free. It can be at the clinic in Medellín or by video call from your country.',
    ctaLink: '/contacto',
  }],

  // TERAPIAS CAPILARES
  ['terapias-capilares', 'hero', {
    t1: 'Hair restoration', t2: 'therapies with PRP.',
    cta: 'Book your free assessment',
    text: 'Platelet-rich plasma (PRP) for those starting to notice hair loss or wanting to protect their hair, and as a complement to a transplant.',
    ctaLink: '/contacto',
  }],
  ['terapias-capilares', 'datos', {
    t1: 'Key facts', t2: '',
    text: 'FUE technique · Local anesthesia with nerve blocks · Initial recovery 7–10 days · Final result 8–12 months',
  }],
  ['terapias-capilares', 'zonas', {
    t1: 'Is this for', t2: 'you?',
    text: "You're starting to notice hair loss · You want to protect your hair · As a complement to your transplant",
  }],
  ['terapias-capilares', 'fue', {
    t1: 'How the FUE', t2: 'technique works.',
    text: 'A minimally invasive method that extracts follicles one by one.',
  }],
  ['terapias-capilares', 'esperar', {
    t1: 'What to expect', t2: 'after the procedure.',
    text: 'Timelines are approximate and vary by patient.',
  }],
  ['terapias-capilares', 'faq', { t1: 'Questions about', t2: 'hair restoration therapies', text: '' }],
  ['terapias-capilares', 'relacionados', { t1: 'Other treatments', t2: '', text: '' }],
  ['terapias-capilares', 'cta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Free assessment',
    text: 'The first assessment is free. It can be at the clinic in Medellín or by video call from your country.',
    ctaLink: '/contacto',
  }],

  // TRASPLANTE CAPILAR
  ['trasplante-capilar', 'hero', {
    t1: 'Hair transplant', t2: 'with FUE technique.',
    cta: 'Book your free assessment',
    text: 'Restore density to your hairline, temples, crown, or overall scalp, with a design that respects the angle and direction of your own hair.',
    ctaLink: '/contacto',
  }],
  ['trasplante-capilar', 'datos', {
    t1: 'Key facts', t2: '',
    text: 'FUE technique · Local anesthesia with nerve blocks · Initial recovery 7–10 days · Final result 8–12 months',
  }],
  ['trasplante-capilar', 'zonas', {
    t1: 'Which area do you want', t2: 'to restore?',
    text: 'Hairline · Temples · Crown · General thinning',
  }],
  ['trasplante-capilar', 'fue', {
    t1: 'How the FUE', t2: 'technique works.',
    text: 'A minimally invasive method that extracts follicles one by one.',
  }],
  ['trasplante-capilar', 'esperar', {
    t1: 'What to expect', t2: 'after the procedure.',
    text: 'Timelines are approximate and vary by patient.',
  }],
  ['trasplante-capilar', 'resultados', {
    t1: 'Hair transplant', t2: 'results.',
    cta: 'View all results',
    text: 'Results vary by patient. We only publish real photographs with express authorization.',
    ctaLink: '/resultados',
  }],
  ['trasplante-capilar', 'faq', { t1: 'Questions about the', t2: 'hair transplant', text: '' }],
  ['trasplante-capilar', 'relacionados', { t1: 'Other treatments', t2: '', text: '' }],
  ['trasplante-capilar', 'cta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Free assessment',
    text: 'The first assessment is free. It can be at the clinic in Medellín or by video call from your country.',
    ctaLink: '/contacto',
  }],

  // TRASPLANTE DE BARBA
  ['trasplante-de-barba', 'hero', {
    t1: 'Natural beard transplant', t2: 'with FUE technique.',
    cta: 'Book your free assessment',
    text: 'We take follicles from the occipital area of the scalp and implant them in the beard under local anesthesia.',
    ctaLink: '/contacto',
  }],
  ['trasplante-de-barba', 'datos', {
    t1: 'Key facts', t2: '',
    text: 'FUE technique · Local anesthesia with nerve blocks · Initial recovery 7–10 days · Final result 8–12 months',
  }],
  ['trasplante-de-barba', 'zonas', {
    t1: 'What do you want', t2: 'to achieve?',
    text: 'Full beard · Mustache · Low-density areas · Cover scars',
  }],
  ['trasplante-de-barba', 'fue', {
    t1: 'How the FUE', t2: 'technique works.',
    text: 'A minimally invasive method that extracts follicles one by one.',
  }],
  ['trasplante-de-barba', 'esperar', {
    t1: 'What to expect', t2: 'after the procedure.',
    text: 'Timelines are approximate and vary by patient.',
  }],
  ['trasplante-de-barba', 'faq', { t1: 'Questions about the', t2: 'beard transplant', text: '' }],
  ['trasplante-de-barba', 'relacionados', { t1: 'Other treatments', t2: '', text: '' }],
  ['trasplante-de-barba', 'cta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Free assessment',
    text: 'The first assessment is free. It can be at the clinic in Medellín or by video call from your country.',
    ctaLink: '/contacto',
  }],

  // TRASPLANTE DE CEJAS
  ['trasplante-de-cejas', 'hero', {
    t1: 'Eyebrow transplant', t2: 'with micrografts.',
    cta: 'Book your free assessment',
    text: 'Follicles taken from the scalp and implanted with precision in the eyebrows, following their natural direction.',
    ctaLink: '/contacto',
  }],
  ['trasplante-de-cejas', 'datos', {
    t1: 'Key facts', t2: '',
    text: 'FUE technique · Local anesthesia with nerve blocks · Initial recovery 7–10 days · Final result 8–12 months',
  }],
  ['trasplante-de-cejas', 'zonas', {
    t1: 'What do you want', t2: 'to achieve?',
    text: 'Thick, defined eyebrows · Shape and contour · Sparse areas',
  }],
  ['trasplante-de-cejas', 'fue', {
    t1: 'How the FUE', t2: 'technique works.',
    text: 'A minimally invasive method that extracts follicles one by one.',
  }],
  ['trasplante-de-cejas', 'esperar', {
    t1: 'What to expect', t2: 'after the procedure.',
    text: 'Timelines are approximate and vary by patient.',
  }],
  ['trasplante-de-cejas', 'faq', { t1: 'Questions about the', t2: 'eyebrow transplant', text: '' }],
  ['trasplante-de-cejas', 'relacionados', { t1: 'Other treatments', t2: '', text: '' }],
  ['trasplante-de-cejas', 'cta', {
    t1: 'The first step is', t2: 'understanding your case.',
    cta: 'Free assessment',
    text: 'The first assessment is free. It can be at the clinic in Medellín or by video call from your country.',
    ctaLink: '/contacto',
  }],

  // TURISMO MÉDICO
  ['turismo-medico', 'hero', {
    t1: 'Your hair transplant in Medellín,', t2: 'with support at every step.',
    cta: 'Plan your trip via WhatsApp',
    text: 'Medellín is a growing medical tourism destination and many of our patients come from the United States.',
    ctaLink: 'https://wa.me/19548535335',
  }],
  ['turismo-medico', 'viaje', {
    t1: 'Your trip,', t2: 'step by step.',
    text: 'Remote assessment · Trip planning · Accommodation and transfers · Tours of Medellín · Procedure · Recovery · Follow-up from your country',
  }],
  ['turismo-medico', 'galeria', {
    t1: 'This is how you will experience', t2: 'your time in Medellín.',
    text: 'The hotel, rooms, clinic, and sightseeing tours that can be arranged with us, for a premium medical tourism experience.',
  }],
  ['turismo-medico', 'estadia', {
    t1: 'Plan your stay', t2: 'with peace of mind.',
    text: 'Airport pickup · Hotel management · Care in Spanish and English · Suggested stay: ask us',
  }],
  ['turismo-medico', 'testimonio', { t1: 'What those who traveled say', t2: '', text: '' }],
  ['turismo-medico', 'faq', { t1: 'Questions from', t2: 'those who travel', text: '' }],
  ['turismo-medico', 'cta', {
    t1: 'Start from your country,', t2: 'without buying a ticket.',
    cta: 'Free remote assessment',
    text: "Get your free remote assessment. When you have your plan, we'll help you organize the trip.",
    ctaLink: '/contacto',
  }],
];

// ─── Tratamientos ─────────────────────────────────────────────────────────────
const treatments = [
  {
    nameEs: 'Trasplante capilar',
    nameEn: 'Hair Transplant',
    shortEn: 'FUE technique for the hairline, temples, crown, or overall density. For men and women.',
  },
  {
    nameEs: 'Trasplante de barba',
    nameEn: 'Beard Transplant',
    shortEn: 'Direction, angle, and density designed according to your features, for a naturally looking beard.',
  },
  {
    nameEs: 'Trasplante de cejas',
    nameEn: 'Eyebrow Transplant',
    shortEn: 'FUE micrografts that follow the natural direction of your eyebrows.',
  },
  {
    nameEs: 'Terapias de restauración capilar',
    nameEn: 'Hair Restoration Therapies',
    shortEn: 'Platelet-rich plasma (PRP) to strengthen and complement your treatment.',
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const faqs = [
  // inicio
  {
    qEs: '¿Duele el procedimiento?',
    qEn: 'Is the procedure painful?',
    aEn: "It depends on each person's tolerance. Local anesthesia may sting when applied, which is why the specialist prefers nerve blocks, which use the least amount of anesthesia possible and provide greater comfort. Our patients describe it as uncomfortable rather than painful.",
  },
  {
    qEs: '¿Cuánto dura un trasplante capilar?',
    qEn: 'How long does a hair transplant last?',
    aEn: 'It is designed to deliver long-lasting, often permanent results, because transplanted follicles are typically resistant to the hair-loss pattern. Each patient is different: proper care and medical check-ups are key to the best long-term outcome.',
  },
  {
    qEs: '¿Cómo funciona un trasplante capilar?',
    qEn: 'How does a hair transplant work?',
    aEn: 'Follicular units are moved from a donor area, usually the back of the scalp, to areas with less density. At Dr Follicle Solutions, it is performed using the FUE technique under local anesthesia.',
  },
  {
    qEs: '¿Quién puede ser candidato?',
    qEn: 'Who can be a candidate?',
    aEn: 'Every hair-loss case is different. During the assessment, we evaluate the cause of the loss, the available donor area, the characteristics of your hair, and the progression of the condition.',
  },
  {
    qEs: '¿Cómo es la recuperación?',
    qEn: 'What is recovery like?',
    aEn: 'Initial recovery typically takes 7 to 10 days, with mild redness and swelling. It is recommended to avoid intense physical activity for at least two weeks.',
  },
  {
    qEs: '¿Cuándo suelen observarse resultados?',
    qEn: 'When are results usually seen?',
    aEn: 'The first signs of growth usually appear between the third and fourth month. The full result is generally visible between 8 and 12 months.',
  },
  {
    qEs: '¿Qué incluye una valoración?',
    qEn: 'What does an assessment include?',
    aEn: 'A conversation about your case, a review of your history and expectations, and a proposed plan. The first assessment is free.',
  },
  {
    qEs: '¿Puedo viajar desde otro país para realizarme el procedimiento?',
    qEn: 'Can I travel from another country to have the procedure?',
    aEn: 'Yes. We conduct the assessment remotely, guide you in organizing the trip, and accompany you during follow-up from your country.',
  },
  // trasplante-capilar, trasplante-de-barba (shared)
  {
    qEs: '¿Duele el procedimiento?',
    qEn: 'Is the procedure painful?',
    aEn: "It depends on each person's tolerance. The specialist prefers nerve blocks, which use the least amount of anesthesia possible and provide greater comfort. Our patients describe it as uncomfortable rather than painful.",
  },
  // trasplante-capilar
  {
    qEs: '¿Cuánto dura la recuperación completa?',
    qEn: 'How long does full recovery take?',
    aEn: 'Initial recovery takes 7 to 10 days, with mild redness and swelling. Full recovery and the appearance of new hair take between 6 and 12 months.',
  },
  {
    qEs: '¿Puedo hacer actividad física después?',
    qEn: 'Can I exercise after the procedure?',
    aEn: 'Avoid intense activity for at least two weeks. You can gradually resume light activity following the specialist\'s guidance.',
  },
  {
    qEs: '¿Cuándo veré resultados?',
    qEn: 'When will I see results?',
    aEn: 'Growth usually begins between the third and fourth month. The final result is visible between 8 and 12 months.',
  },
  {
    qEs: '¿Quién puede ser candidato?',
    qEn: 'Who can be a candidate?',
    aEn: 'We determine this during the assessment: we evaluate the cause of the loss, the available donor area, the characteristics of your hair, and its progression.',
  },
  // trasplante-de-barba
  {
    qEs: '¿De dónde se toman los folículos?',
    qEn: 'Where are the follicles taken from?',
    aEn: 'From the occipital area of the scalp, at the back of the head.',
  },
  {
    qEs: '¿El resultado es permanente?',
    qEn: 'Is the result permanent?',
    aEn: 'Yes. It is designed to be a permanent and natural-looking result.',
  },
  {
    qEs: '¿Cuándo puedo volver a mi rutina?',
    qEn: 'When can I return to my routine?',
    aEn: "Within a few days, following the specialist's instructions.",
  },
  {
    qEs: '¿Sirve para cubrir cicatrices?',
    qEn: 'Can it cover scars?',
    aEn: 'Yes. It is also used to cover scars and improve density in sparse areas.',
  },
  // trasplante-de-cejas
  {
    qEs: '¿Cuánto dura el procedimiento?',
    qEn: 'How long does the procedure take?',
    aEn: 'Approximately 3 to 4 hours, under local anesthesia.',
  },
  {
    qEs: '¿De dónde se toman los folículos?',
    qEn: 'Where are the follicles taken from?',
    aEn: 'From the scalp, using the FUE technique.',
  },
  {
    qEs: '¿El resultado se ve natural?',
    qEn: 'Does the result look natural?',
    aEn: 'Yes. The follicles are placed following the natural direction of your eyebrows.',
  },
  {
    qEs: '¿Es un procedimiento seguro?',
    qEn: 'Is it a safe procedure?',
    aEn: 'It is a safe and well-tolerated procedure with a quick recovery.',
  },
  // terapias-capilares
  {
    qEs: '¿Para quién es el plasma capilar?',
    qEn: 'Who is PRP for?',
    aEn: 'For those starting to notice hair loss or wanting to protect their hair, and as a complement to a transplant.',
  },
  {
    qEs: '¿Necesito cirugía?',
    qEn: 'Do I need surgery?',
    aEn: 'No. It is a non-surgical therapy.',
  },
  // turismo-medico
  {
    qEs: '¿Puedo hacer la valoración sin viajar?',
    qEn: 'Can I get an assessment without traveling?',
    aEn: 'Yes. The first assessment is remote and free. This way you know if you are a candidate before buying your flight.',
  },
  {
    qEs: '¿Me recogen en el aeropuerto?',
    qEn: 'Will I be picked up at the airport?',
    aEn: 'Yes. We coordinate airport pickup and help you manage your hotel.',
  },
  {
    qEs: '¿Cómo es el seguimiento cuando regreso?',
    qEn: 'What is follow-up like when I return home?',
    aEn: 'We conduct remote check-ups while your new hair grows. The final result is visible between 8 and 12 months.',
  },
];

// ─── Testimonios ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    author: 'Hayxa Escobar',
    en: 'Exceptional care from the airport pickup to the procedure and post-op. I am very pleased with the results.',
  },
  {
    author: 'Tatiana Ortega',
    en: 'They took care of every detail, from reliable transportation to accommodation. The doctor and the team made me feel at ease from start to finish.',
  },
  {
    author: 'Daniella G.',
    en: 'My fiancé always felt insecure about his hairline. Six months after the procedure, we can already see a huge difference, and they took care of us every step of the way.',
  },
  {
    author: 'John E.',
    en: 'From the initial consultation to the final results, the entire process was seamless. I am delighted with how natural it looks.',
  },
];

// ─── Ejecución ────────────────────────────────────────────────────────────────
async function run() {
  console.log('\n── Secciones de páginas ──');
  for (const [page, key, en] of sections) {
    await updateSection(page, key, en);
  }

  console.log('\n── Tratamientos ──');
  for (const t of treatments) {
    const { error } = await supabase
      .from('treatments')
      .update({ name: supabase.rpc ? undefined : undefined })
      .eq('name->>es', t.nameEs);

    // Update name.en and short.en via raw jsonb update
    const { data: rows } = await supabase
      .from('treatments')
      .select('id, name, short')
      .eq('name->>es', t.nameEs);

    if (!rows?.length) { console.warn(`  ⚠ Treatment not found: ${t.nameEs}`); continue; }

    for (const row of rows) {
      const { error: err } = await supabase
        .from('treatments')
        .update({
          name: { ...row.name, en: t.nameEn },
          short: { ...row.short, en: t.shortEn },
        })
        .eq('id', row.id);
      if (err) console.error(`  ✗ ${t.nameEs}:`, err.message);
      else console.log(`  ✓ ${t.nameEn}`);
    }
  }

  console.log('\n── FAQs ──');
  for (const f of faqs) {
    const { data: rows } = await supabase
      .from('faqs')
      .select('id, question, answer')
      .eq('question->>es', f.qEs);

    if (!rows?.length) { console.warn(`  ⚠ FAQ not found: ${f.qEs}`); continue; }

    for (const row of rows) {
      const { error: err } = await supabase
        .from('faqs')
        .update({
          question: { ...row.question, en: f.qEn },
          answer: { ...row.answer, en: f.aEn },
        })
        .eq('id', row.id);
      if (err) console.error(`  ✗ "${f.qEs}":`, err.message);
      else console.log(`  ✓ ${f.qEn}`);
    }
  }

  console.log('\n── Testimonios ──');
  for (const t of testimonials) {
    const { data: rows } = await supabase
      .from('testimonials')
      .select('id, quote')
      .eq('author', t.author);

    if (!rows?.length) { console.warn(`  ⚠ Testimonial not found: ${t.author}`); continue; }

    for (const row of rows) {
      const { error: err } = await supabase
        .from('testimonials')
        .update({ quote: { ...row.quote, en: t.en } })
        .eq('id', row.id);
      if (err) console.error(`  ✗ ${t.author}:`, err.message);
      else console.log(`  ✓ ${t.author}`);
    }
  }

  console.log('\n✅ Listo.\n');
  console.log('⚠️  Pendientes (necesitan info de la clínica):');
  console.log('  - [contacto] mapa: dirección, horario y enlace de Google Maps');
  console.log('  - FAQ "¿Qué diferencia existe entre las técnicas disponibles?": respuesta pendiente');
  console.log('  - FAQ "¿Cuántas sesiones necesito?": respuesta pendiente');
  console.log('  - FAQ "¿Cuántos días debo quedarme en Medellín?": días exactos pendientes');
  console.log('  - Testimonios: [País] → actualizar con países reales');
}

run().catch(console.error);
