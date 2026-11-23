import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Lang } from '@/lib/content/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === 'en'
    ? { title: 'Privacy, Security & Terms | Dr Follicle Solutions', description: 'Privacy policy, security practices and terms of use for Dr Follicle Solutions.' }
    : { title: 'Privacidad, Seguridad y Condiciones | Dr Follicle Solutions', description: 'Política de privacidad, prácticas de seguridad y condiciones de uso de Dr Follicle Solutions.' };
}

const INK = '#0A2730';
const TEAL_D = '#007A8C';
const SLATE = '#4B5F66';
const BODY = '#24414A';
const BORDER = '#D5E3E6';
const MIST = '#E3F2F4';

interface Section {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

function getSections(lang: Lang): Section[] {
  if (lang === 'en') return [
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: 'The website and all its content are the exclusive property of Dr. Follicle Solutions, protected by copyright and intellectual property laws applicable in Colombia, the United States, and international jurisdictions. Personal, non-commercial use only is permitted. Users may not reproduce, distribute, modify, or create derivative works from any content without prior written consent from Dr. Follicle Solutions.',
    },
    {
      id: 'copyright',
      title: 'Copyright & Content Use',
      content: 'All materials published on this site and on affiliated platforms — including blogs and social media — remain the exclusive property of Dr. Follicle Solutions. Any commercial use or republication requires express written permission from the company\'s Legal Department.',
    },
    {
      id: 'technologies',
      title: 'Website Content & Technologies',
      content: 'Dr. Follicle Solutions does not endorse the technologies used to build this site. Exporting software or data to jurisdictions that violate applicable export laws is strictly prohibited.',
    },
    {
      id: 'external-links',
      title: 'External Links',
      content: 'External links are provided for informational convenience only. Dr. Follicle Solutions assumes no responsibility for external sites, their services, or linked material. Creating hyperlinks to this site or using framing techniques requires prior written consent.',
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: 'Information on this site is provided "as is" without warranties of accuracy or completeness. Dr. Follicle Solutions disclaims all liability for direct, indirect, incidental, or consequential damages arising from the use of the site or reliance on any information contained herein.',
    },
    {
      id: 'termination',
      title: 'Termination',
      content: 'Violation of these policies automatically revokes the user\'s authorization to access and use the site. Upon denial of access, users must immediately destroy all content previously downloaded or obtained from this site.',
    },
    {
      id: 'promotions',
      title: 'Promotions',
      content: 'Dr. Follicle Solutions reserves the right to cancel or adjust online orders. Promotions are valid in Colombia and the United States only, through this website, while supplies last. Previously placed orders are excluded from promotional adjustments.',
    },
    {
      id: 'privacy-commitment',
      title: 'Our Privacy Commitment',
      content: 'Protecting your privacy is a priority for Dr. Follicle Solutions. This section describes our practices for collecting, using, and safeguarding personal information through both our online and offline channels.',
    },
    {
      id: 'consent',
      title: 'Your Consent',
      content: 'By reviewing and accepting this policy before submitting any personal data, you consent to the collection, use, disclosure, and sharing of your information as described herein.',
    },
    {
      id: 'information-collected',
      title: 'Information We Collect',
      content: 'We collect personal data through three methods: (1) voluntary submission by the user, (2) automated technology, and (3) third-party sources including service providers and analytics entities. Data collected may include names, addresses, email addresses, phone numbers, payment information, browsing history, purchase behavior, IP addresses, device type, carrier information, and location data.',
    },
    {
      id: 'automatic-collection',
      title: 'Automatic Data Collection',
      content: 'The site uses cookies, web beacons, tags, and scripts for analytics and marketing purposes. Cookie types used include: essential cookies (enable site navigation), server-side cookies (improve browsing experience), session cookies (manage authentication), functional cookies (remember user preferences), analytics cookies (collect usage data), and social media cookies (installed through third-party platforms). Third-party cookies and tracking technologies may also collect behavioral data. This site does not respond to "Do Not Track" signals.',
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: 'Information collected is used for order fulfillment, delivery confirmation, improving the user experience, product recommendations, and site analytics. Email correspondence is retained solely for response purposes and is not shared with third parties. User-generated content such as reviews may be published at the company\'s discretion.',
    },
    {
      id: 'email-marketing',
      title: 'Email & Text Marketing',
      content: 'Dr. Follicle Solutions may send promotional emails to previous customers regarding contests and product catalogs. Users may opt out at any time via the unsubscribe link included in each email. SMS/text marketing campaigns require a separate opt-in. Data used for these communications may include phone numbers, email addresses, browsing behavior, purchase activity, device type, carrier, and location.',
    },
    {
      id: 'disclosure',
      title: 'How We Disclose Your Personal Information',
      content: 'We may share your information with: (a) Service providers and contractors — vendors, subsidiaries, partners, and independent contractors involved in transaction processing, marketing, and site tracking, all contractually obligated to protect your data; (b) Third parties — partner entities for data collection, communications, contest sponsorship, analytics, and targeted advertising; (c) Legal obligations — when required by law, court order, or government request, to prevent harm, support legal claims, or enforce these terms; (d) Corporate restructuring — in connection with business sales, mergers, or reorganizations, provided third parties agree to adhere to this policy.',
    },
    {
      id: 'hosting',
      title: 'Third-Party Hosting',
      content: 'This website is hosted by a third-party provider that stores all submitted information on external servers. The provider implements security technologies and strict policies to safeguard personal information.',
    },
    {
      id: 'advertising',
      title: 'Third-Party Advertising & Analytics',
      content: 'The site uses third-party technologies — including cookies, beacons, and tracking pixels — for advertising, analytics, behavioral marketing, and performance monitoring. These include Google Analytics (opt-out via the Google Analytics Opt-Out Browser Add-on), Facebook Pixel (see Facebook\'s privacy policy), and Mouseflow (a web analytics tool that records clicks, mouse movements, scrolling, form completion, and session data; opt-out available at mouseflow.com; data requests: privacy@mouseflow.com). Users may also opt out of interest-based advertising via aboutads.info (US) or youronlinechoices.eu (Europe).',
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      content: 'Personal information is retained for as long as necessary to fulfill the purposes described in this policy and to comply with applicable legal obligations, resolve disputes, and enforce our agreements.',
    },
    {
      id: 'cookie-consent',
      title: 'Cookie Consent',
      content: 'Our website stores and retrieves information in your browser through cookies to provide functionality and personalization. You may modify cookie settings by category through your browser preferences. Please note that blocking certain cookies may affect your experience on the site.',
    },
    {
      id: 'data-security',
      title: 'Our Data Security Commitment',
      content: 'We implement physical, electronic, and administrative procedures to safeguard the information we collect. However, internet transmission carries inherent security risks. Dr. Follicle Solutions is not liable for disclosure resulting from transmission errors or unauthorized security breaches.',
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Applications & Links',
      content: 'Third-party applications and external site links featured on this site operate under separate privacy policies beyond our control. All use of those third-party services is governed by the respective operator\'s policies. Dr. Follicle Solutions is not responsible for transactions or interactions conducted through third-party platforms.',
    },
  ];

  return [
    {
      id: 'propiedad-intelectual',
      title: 'Propiedad intelectual',
      content: 'El sitio web y todo su contenido son propiedad exclusiva de Dr. Follicle Solutions, protegidos por las leyes de derechos de autor y propiedad intelectual aplicables en Colombia, Estados Unidos y jurisdicciones internacionales. Solo se permite el uso personal y no comercial. Los usuarios no pueden reproducir, distribuir, modificar ni crear obras derivadas de ningún contenido sin el consentimiento previo y por escrito de Dr. Follicle Solutions.',
    },
    {
      id: 'derechos-autor',
      title: 'Derechos de autor y uso del contenido',
      content: 'Todos los materiales publicados en este sitio y en plataformas afiliadas —incluidos blogs y redes sociales— son propiedad exclusiva de Dr. Follicle Solutions. Cualquier uso comercial o republicación requiere permiso escrito expreso del Departamento Legal de la empresa.',
    },
    {
      id: 'tecnologias',
      title: 'Contenidos y tecnologías del sitio web',
      content: 'Dr. Follicle Solutions no respalda las tecnologías utilizadas para construir este sitio. La exportación de software o datos a jurisdicciones que violen las leyes de exportación aplicables está estrictamente prohibida.',
    },
    {
      id: 'enlaces-externos',
      title: 'Enlaces a otros sitios web',
      content: 'Los enlaces externos se proporcionan únicamente para conveniencia informativa. Dr. Follicle Solutions no asume responsabilidad alguna por sitios externos, sus servicios ni el material enlazado. La creación de hipervínculos a este sitio o el uso de técnicas de enmarcado requiere consentimiento previo por escrito.',
    },
    {
      id: 'descargo',
      title: 'Descargo de responsabilidad',
      content: 'La información de este sitio se proporciona "tal como está", sin garantías de exactitud o integridad. Dr. Follicle Solutions se exime de toda responsabilidad por daños directos, indirectos, incidentales o consecuentes derivados del uso del sitio o de la confianza depositada en cualquier información aquí contenida.',
    },
    {
      id: 'terminacion',
      title: 'Terminación',
      content: 'La violación de estas políticas revoca automáticamente la autorización del usuario para acceder y usar el sitio. Ante la denegación de acceso, el usuario deberá destruir de inmediato todo el contenido previamente descargado u obtenido de este sitio.',
    },
    {
      id: 'promociones',
      title: 'Promociones',
      content: 'Dr. Follicle Solutions se reserva el derecho de cancelar o ajustar pedidos en línea. Las promociones son válidas en Colombia y Estados Unidos únicamente, a través de este sitio web, mientras haya disponibilidad. Los pedidos realizados previamente quedan excluidos de los ajustes promocionales.',
    },
    {
      id: 'compromiso-privacidad',
      title: 'Nuestro compromiso con la privacidad',
      content: 'Proteger tu privacidad es una prioridad para Dr. Follicle Solutions. Esta sección describe nuestras prácticas para recopilar, usar y proteger la información personal a través de nuestros canales en línea y fuera de línea.',
    },
    {
      id: 'consentimiento',
      title: 'Tu consentimiento',
      content: 'Al revisar y aceptar esta política antes de enviar cualquier dato personal, consientes la recopilación, uso, divulgación y compartición de tu información tal como se describe en este documento.',
    },
    {
      id: 'informacion-recopilamos',
      title: 'La información que recopilamos',
      content: 'Recopilamos datos personales mediante tres métodos: (1) envío voluntario por parte del usuario, (2) tecnología automatizada, y (3) fuentes de terceros, incluidos proveedores de servicios y entidades analíticas. Los datos recopilados pueden incluir nombres, direcciones, correos electrónicos, números de teléfono, información de pago, historial de navegación, comportamiento de compra, direcciones IP, tipo de dispositivo, información del operador y datos de ubicación.',
    },
    {
      id: 'recopilacion-automatica',
      title: 'Recopilación automática de datos',
      content: 'El sitio utiliza cookies, balizas web, etiquetas y scripts con fines analíticos y de marketing. Los tipos de cookies utilizadas incluyen: cookies esenciales (permiten la navegación), cookies del lado del servidor (mejoran la experiencia de navegación), cookies de sesión (gestionan la autenticación), cookies funcionales (recuerdan preferencias del usuario), cookies analíticas (recopilan datos de uso) y cookies de redes sociales (instaladas a través de plataformas de terceros). Las tecnologías de rastreo de terceros también pueden recopilar datos de comportamiento. Este sitio no responde a señales de "No rastrear".',
    },
    {
      id: 'uso-informacion',
      title: 'La forma en que utilizamos la información',
      content: 'La información recopilada se utiliza para el cumplimiento de pedidos, confirmación de entregas, mejora de la experiencia del usuario, recomendaciones de productos y análisis del sitio. La correspondencia por correo electrónico se conserva únicamente con fines de respuesta y no se comparte con terceros. El contenido generado por los usuarios, como reseñas, puede publicarse a discreción de la empresa.',
    },
    {
      id: 'marketing',
      title: 'Marketing por correo electrónico y mensajes de texto',
      content: 'Dr. Follicle Solutions puede enviar correos electrónicos promocionales a clientes anteriores sobre concursos y catálogos de productos. Los usuarios pueden darse de baja en cualquier momento a través del enlace de cancelación de suscripción incluido en cada correo. Las campañas de SMS requieren una suscripción separada. Los datos utilizados para estas comunicaciones pueden incluir números de teléfono, correos electrónicos, comportamiento de navegación, actividad de compra, tipo de dispositivo, operador y ubicación.',
    },
    {
      id: 'divulgacion',
      title: 'Cómo divulgamos tu información personal',
      content: 'Podemos compartir tu información con: (a) Proveedores de servicios y contratistas — vendedores, subsidiarias, socios y contratistas independientes involucrados en el procesamiento de transacciones, marketing y seguimiento del sitio, todos obligados contractualmente a proteger tus datos; (b) Terceros — entidades asociadas para recopilación de datos, comunicaciones, patrocinio de concursos, análisis y publicidad dirigida; (c) Obligaciones legales — cuando lo exija la ley, una orden judicial o una solicitud gubernamental, para prevenir daños, apoyar reclamaciones legales o hacer cumplir estos términos; (d) Reestructuración corporativa — en relación con ventas, fusiones o reorganizaciones empresariales, siempre que los terceros acuerden cumplir esta política.',
    },
    {
      id: 'alojamiento',
      title: 'Alojamiento de terceros',
      content: 'Este sitio web está alojado por un proveedor externo que almacena toda la información enviada en servidores externos. El proveedor implementa tecnologías de seguridad y políticas estrictas para proteger la información personal.',
    },
    {
      id: 'publicidad',
      title: 'Avisos legales sobre publicidad y análisis de terceros',
      content: 'El sitio utiliza tecnologías de terceros —incluidas cookies, balizas y píxeles de seguimiento— para publicidad, análisis, marketing conductual y monitoreo de rendimiento. Estas incluyen Google Analytics (exclusión mediante el complemento de inhabilitación de Google Analytics), Facebook Pixel (consulta la política de privacidad de Facebook) y Mouseflow (herramienta de análisis web que registra clics, movimientos del mouse, desplazamiento, envíos de formularios y datos de sesión; exclusión disponible en mouseflow.com; solicitudes de datos: privacy@mouseflow.com). Los usuarios también pueden excluirse de la publicidad basada en intereses en aboutads.info (EE.UU.) o youronlinechoices.eu (Europa).',
    },
    {
      id: 'retencion-datos',
      title: 'Retención de datos',
      content: 'La información personal se conserva durante el tiempo necesario para cumplir los propósitos descritos en esta política y para satisfacer las obligaciones legales aplicables, resolver disputas y hacer cumplir nuestros acuerdos.',
    },
    {
      id: 'consentimiento-cookies',
      title: 'Consentimiento de cookies',
      content: 'Nuestro sitio web almacena y recupera información en tu navegador a través de cookies para proporcionar funcionalidad y personalización. Puedes modificar la configuración de cookies por categoría a través de las preferencias de tu navegador. Ten en cuenta que bloquear ciertas cookies puede afectar tu experiencia en el sitio.',
    },
    {
      id: 'seguridad-datos',
      title: 'Nuestro compromiso con la seguridad de los datos',
      content: 'Implementamos procedimientos físicos, electrónicos y administrativos para proteger la información que recopilamos. Sin embargo, la transmisión por internet conlleva riesgos de seguridad inherentes. Dr. Follicle Solutions no se hace responsable de divulgaciones resultantes de errores de transmisión o brechas de seguridad no autorizadas.',
    },
    {
      id: 'aplicaciones-terceros',
      title: 'Aplicaciones y enlaces de terceros',
      content: 'Las aplicaciones de terceros y los enlaces a sitios externos presentes en este sitio operan bajo políticas de privacidad propias, fuera de nuestro control. Todo uso de esos servicios de terceros se rige por las políticas del operador respectivo. Dr. Follicle Solutions no se responsabiliza de transacciones o interacciones realizadas a través de plataformas de terceros.',
    },
  ];
}

import React from 'react';

export default async function PrivacidadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Lang;

  const sections = getSections(lang);
  const lastUpdated = lang === 'en' ? 'Last updated: 2024' : 'Última actualización: 2024';
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';
  const pageTitle = lang === 'en' ? 'Privacy, Security & Terms' : 'Privacidad, Seguridad y Condiciones';
  const pageSubtitle = lang === 'en'
    ? 'Here you will find our privacy policy, data security practices and general terms of use.'
    : 'Aquí encontrarás nuestra política de privacidad, prácticas de seguridad de datos y condiciones generales de uso.';

  return (
    <main>
      {/* Hero */}
      <section style={{ background: INK, color: '#FFFFFF', padding: 'clamp(48px,7vw,96px) 0 clamp(40px,5vw,64px)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
          <nav aria-label={lang === 'en' ? 'Breadcrumb' : 'Ruta'} style={{ fontSize: '13px', color: '#9BD3DC', display: 'flex', gap: '8px' }}>
            <Link href="/" style={{ color: '#9BD3DC', textDecoration: 'none' }}>{homeLabel}</Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: '#DCEBEE' }}>{pageTitle}</span>
          </nav>
          <h1 style={{ margin: 0, fontSize: 'clamp(36px,5vw,64px)', lineHeight: 0.97, letterSpacing: '-0.04em', fontWeight: 800 }}>
            {pageTitle}
          </h1>
          <p style={{ margin: 0, fontSize: '17px', color: '#DCEBEE', lineHeight: 1.6 }}>{pageSubtitle}</p>
          <span style={{ fontSize: '13px', color: '#4B5F66' }}>{lastUpdated}</span>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(48px,7vw,96px) 0' }}>
        <div className="wrap" style={{ display: 'grid', gap: 'clamp(32px,4vw,56px)', gridTemplateColumns: '1fr', maxWidth: '800px' }}>
          {/* Table of contents */}
          <nav aria-label={lang === 'en' ? 'Table of contents' : 'Tabla de contenidos'} style={{ background: MIST, borderRadius: '20px', padding: 'clamp(20px,3vw,32px)' }}>
            <p style={{ margin: '0 0 14px', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: TEAL_D }}>
              {lang === 'en' ? 'Contents' : 'Contenido'}
            </p>
            <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} style={{ fontSize: '14px', color: TEAL_D, textDecoration: 'none', fontWeight: 500 }}
                    className="lnk">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          {sections.map((s, i) => (
            <div key={s.id} id={s.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '8px', borderTop: `1px solid ${BORDER}` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: '28px', color: TEAL_D, lineHeight: 1, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 style={{ margin: 0, fontSize: 'clamp(18px,2vw,22px)', letterSpacing: '-0.015em', fontWeight: 800, color: INK }}>{s.title}</h2>
              </div>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.75, color: BODY, paddingLeft: '42px' }}>
                {s.content}
              </p>
            </div>
          ))}

          {/* Footer note */}
          <div style={{ background: MIST, borderRadius: '16px', padding: '20px 24px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: SLATE, lineHeight: 1.65 }}>
              {lang === 'en'
                ? 'For any questions about this policy, contact us at '
                : 'Para cualquier consulta sobre esta política, contáctanos en '}
              <a href="mailto:dr.folliclesolutions@gmail.com" style={{ color: TEAL_D, fontWeight: 600 }}>
                dr.folliclesolutions@gmail.com
              </a>
              {lang === 'en' ? ' or via WhatsApp at +1 (954) 853-5335.' : ' o vía WhatsApp al +1 (954) 853-5335.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
