// seed-blog.mjs — Popula el cuerpo completo de los 5 artículos del blog
// Ejecutar: node scripts/seed-blog.mjs

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

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const articles = [
  {
    slug: 'all-inclusive-hair-transplant-package-medellin',
    published_at: '2026-10-23T10:00:00+00:00',
    body: {
      es: [],
      en: [
        { type: 'p', text: 'Patients considering international hair transplants often face questions about costs, accommodation, postoperative care, and clinic selection. Understanding what a provider actually includes in a package is essential before making any decision.' },
        { type: 'p', text: 'The term "all-inclusive" is not standardized in the hair restoration industry. Some providers include hotel stays and airport transfers; others cover only the procedure and basic aftercare. Before booking any procedure, ask for a written breakdown of exactly what is and is not included.' },
        { type: 'h2', text: 'What Is an All-Inclusive Hair Transplant Package?' },
        { type: 'p', text: 'At its most complete, an all-inclusive hair transplant package coordinates your medical care, accommodation, transportation, and recovery support into a single experience. Rather than managing each element separately, the clinic or its partners handle the logistics so you can focus on your procedure and recovery.' },
        { type: 'p', text: 'The components that may be included vary significantly between providers. Reviewing what each service covers in writing before committing to any package is an important step.' },
        { type: 'h2', text: 'An Initial Consultation and Personalized Evaluation' },
        { type: 'p', text: 'A hair transplant should begin with an assessment of your individual situation, not a one-size-fits-all recommendation. The initial consultation should evaluate your hair-loss pattern, donor area, scalp health, expectations, and overall medical suitability for the procedure.' },
        { type: 'p', text: 'Remote consultations are available for international patients before they travel, allowing you to understand whether you are a suitable candidate and what results are realistic for your specific case before you book a flight.' },
        { type: 'h2', text: 'Preoperative Testing and Medical Preparation' },
        { type: 'p', text: 'Before the procedure, medical preparation may include blood work or other testing depending on your health history. The clinic should explain any preoperative instructions clearly, including medications to avoid and what to do in the days before your arrival.' },
        { type: 'h2', text: 'Hotel Accommodation and Transportation' },
        { type: 'p', text: 'For international patients, accommodation and local transportation are often the most logistically complex parts of the experience. A well-organized package may include airport pickup, hotel accommodation near the clinic, and transfers between your accommodation and the medical facility.' },
        { type: 'p', text: 'Not every package includes these services. When comparing options, confirm whether accommodation is provided, what category of hotel is included, and how transportation is arranged.' },
        { type: 'h2', text: 'The Hair Transplant Procedure' },
        { type: 'p', text: 'The procedure itself should be performed by an experienced medical team using an appropriate technique for your specific case. A good clinic will explain the procedure in detail, including the technique, the expected number of grafts, the design of your hairline, and what you can expect during and after surgery.' },
        { type: 'h2', text: 'Postoperative Care and Follow-Up' },
        { type: 'p', text: 'The days immediately after a hair transplant are critical. Your clinic should provide clear instructions on scalp care, washing protocols, activity restrictions, and warning signs that require medical attention. For international patients, follow-up arrangements after returning home are particularly important.' },
        { type: 'h2', text: 'Personalized Tourism Experiences in Medellín' },
        { type: 'p', text: 'Once your medical team determines that you can resume light activity, personalized sightseeing experiences and visits to selected destinations in and around Medellín may be coordinated as part of your package. The city offers gastronomy, culture, mountain views, and neighborhoods that make for a comfortable recovery environment.' },
        { type: 'h2', text: 'Why Consider Medellín for a Hair Transplant?' },
        { type: 'p', text: 'Medellín has developed into one of Latin America\'s most visited international destinations, with significant growth in both general tourism and medical travel. The city offers modern infrastructure, internationally trained medical professionals, and a range of accommodation and leisure options at accessible prices.' },
        { type: 'p', text: 'For American and Canadian patients in particular, the combination of professional medical care, affordable costs, and a genuinely enjoyable city makes Medellín a practical choice for hair restoration travel.' },
        { type: 'h2', text: 'How Much Does an All-Inclusive Hair Transplant Package in Medellín Cost?' },
        { type: 'p', text: 'The total cost depends on several factors: the extent of your hair loss, the estimated number of grafts, the technique selected, any additional medical requirements, the type of accommodation included, and the specific services covered by the package.' },
        { type: 'p', text: 'Because these variables differ from patient to patient, a personalized evaluation is the most reliable way to understand what your procedure would involve and what it would cost. Be cautious of providers who quote prices without first assessing your individual case.' },
        { type: 'h2', text: 'Is an All-Inclusive Hair Transplant Package Right for You?' },
        { type: 'p', text: 'An all-inclusive package may be a good fit if you are traveling from abroad and prefer a coordinated experience, if you want to minimize the number of decisions you have to manage independently, or if you are combining your procedure with time spent in Medellín.' },
        { type: 'h2', text: 'Why Choose Dr. Follicle Solutions in Medellín?' },
        { type: 'p', text: 'At Dr. Follicle Solutions, the process begins with a personalized medical evaluation. The team works with each patient to understand their hair-loss pattern, donor area, goals, and long-term expectations before recommending a course of action.' },
        { type: 'p', text: 'For international patients, the clinic can help coordinate the experience in Medellín — from the initial consultation through the procedure, recovery, and remote follow-up. If you would like to find out whether you are a good candidate, contact us to request a free personalized evaluation.' },
      ],
    },
  },
  {
    slug: 'hair-loss-treatment',
    published_at: '2026-10-15T10:00:00+00:00',
    body: {
      es: [],
      en: [
        { type: 'p', text: 'Noticing more hair in your shower, on your pillow, or in your hairbrush can be unsettling. Maybe your hairline looks different than it did a year ago. Perhaps your part seems wider, your ponytail feels thinner, or your scalp has become more visible in certain areas.' },
        { type: 'p', text: 'Hair loss can raise a lot of questions. Is it temporary? Is it genetic? Can you reverse it? Do you need medication, a specialized treatment, or a hair transplant? The good news is that hair loss does not always mean permanent baldness. The right approach depends on what is happening to your hair follicles in the first place.' },
        { type: 'h2', text: 'What Causes Hair Loss?' },
        { type: 'p', text: 'Before choosing a hair loss treatment, it helps to understand why your hair is falling out. Hair loss is not one single condition. It is a symptom that can have several different causes, and each may require a different approach.' },
        { type: 'h2', text: 'Genetic Hair Loss' },
        { type: 'p', text: 'Hereditary hair loss, also known as androgenetic alopecia, is one of the most common causes of thinning hair in both men and women. In men, it often begins with a receding hairline or thinning around the crown. In women, it may appear as a widening part or a gradual reduction in overall hair density.' },
        { type: 'p', text: 'This type develops as genetically susceptible follicles gradually become smaller and produce finer hairs. Because the process can progress over time, identifying it early may help preserve existing hair and improve the chances of responding to treatment.' },
        { type: 'h2', text: 'Stress, Illness, and Major Life Changes' },
        { type: 'p', text: 'Physical or emotional stress, a major illness, surgery, significant weight loss, and childbirth can sometimes trigger a temporary type of shedding known as telogen effluvium. The shedding may not begin immediately — it can become noticeable months after the event that triggered it.' },
        { type: 'p', text: 'In many cases, hair growth gradually returns as the body recovers and the underlying trigger resolves. However, persistent shedding deserves professional evaluation, especially if there may be another contributing cause.' },
        { type: 'h2', text: 'Hormonal Changes and Medical Conditions' },
        { type: 'p', text: 'Thyroid disorders, hormonal changes, certain medical conditions, and some medications can contribute to hair loss. For women, conditions such as polycystic ovary syndrome (PCOS) may be associated with thinning hair. If you suspect a medication is responsible, speak with the prescribing healthcare professional before making any changes.' },
        { type: 'h2', text: 'Nutritional Deficiencies' },
        { type: 'p', text: 'Hair growth depends on adequate nutrition. Insufficient iron, protein, or other nutrients may contribute to hair loss in some people. However, taking high doses of vitamins or minerals without a confirmed deficiency may be unnecessary and, in some cases, harmful. A healthcare professional can help determine whether blood tests or nutritional changes are appropriate.' },
        { type: 'h2', text: 'Scalp Conditions and Hair Damage' },
        { type: 'p', text: 'Inflammation, infections, certain forms of alopecia, and repeated tension from tight hairstyles can also cause hair loss. Sometimes, what looks like hair loss is actually hair breakage caused by heat, chemical treatments, or mechanical damage. These situations are important to distinguish because the best treatment for a damaged hair shaft may be very different from treatment needed for a follicle condition.' },
        { type: 'quote', text: 'Before investing in a hair loss treatment, find out whether you are experiencing temporary shedding, progressive thinning, hair breakage, or a scalp condition.' },
        { type: 'h2', text: 'Which Hair Loss Treatment Actually Works?' },
        { type: 'p', text: 'There is no single treatment that works for every type of hair loss. The most appropriate option depends on the diagnosis, the extent of thinning, your health, and your goals.' },
        { type: 'h2', text: 'Minoxidil' },
        { type: 'p', text: 'Minoxidil is a well-established treatment for certain forms of hereditary hair loss. Depending on the formulation and the individual, it may help slow hair loss or encourage regrowth. Some people begin noticing changes after several months, while a more meaningful assessment may require six to twelve months.' },
        { type: 'p', text: 'Benefits generally depend on continued use. Hair maintained by the treatment may gradually be lost again after discontinuation. Minoxidil is not appropriate for every type of hair loss. Ask a healthcare professional whether it is suitable for you.' },
        { type: 'h2', text: 'Prescription Medications' },
        { type: 'p', text: 'Certain prescription medications can help manage specific forms of hair loss. For example, finasteride may be prescribed for male pattern hair loss. These treatments have different indications, risks, and precautions. Some are unsuitable during pregnancy, and others may cause side effects that need to be discussed before treatment begins.' },
        { type: 'h2', text: 'PRP Therapy for Hair Loss' },
        { type: 'p', text: 'Platelet-rich plasma (PRP) therapy uses a concentrated portion of a patient\'s own blood, which is prepared and injected into selected areas of the scalp. Research suggests it may help improve hair density in some cases, but results vary. It is not a guaranteed solution and does not replace the need to diagnose the cause of hair loss.' },
        { type: 'h2', text: 'Hair Transplant Surgery' },
        { type: 'p', text: 'For some people with established hereditary hair loss, a hair transplant may be an option. It involves moving hair follicles from a donor area to areas where greater coverage is desired. It may be appropriate when the pattern of hair loss, donor supply, scalp health, and overall goals make surgery a reasonable choice.' },
        { type: 'p', text: 'However, a hair transplant is not the right first step for everyone. People experiencing sudden, unexplained, or actively progressing hair loss may need further evaluation before surgery is considered. Existing hair can continue to thin even after a transplant, so long-term planning matters.' },
        { type: 'h2', text: 'Hair Loss Treatment for Men and Women: Is There a Difference?' },
        { type: 'p', text: 'Yes. Although men and women can experience some of the same types of hair loss, their patterns, contributing factors, and treatment considerations may differ. Male pattern hair loss commonly affects the temples, frontal hairline, and crown. Women may notice a widening part, reduced density, or increased shedding.' },
        { type: 'p', text: 'In both men and women, the objective should be to select a treatment based on the cause — not simply the appearance of the thinning area.' },
        { type: 'h2', text: 'How to Know Which Hair Loss Treatment You Need' },
        { type: 'p', text: 'Consider these questions: Is the shedding sudden or gradual? Are you losing hair everywhere or in specific areas? How long has it been happening? Are there other symptoms such as scalp pain, redness, or scaling? Have you already tried a treatment?' },
        { type: 'p', text: 'A medical assessment may include a review of your health history, examination of your scalp and hair, and blood tests when indicated. You do not necessarily need every test or every treatment — you need the evaluation that makes sense for your situation.' },
        { type: 'h2', text: 'A Simple Hair Loss Treatment Plan' },
        { type: 'p', text: 'Start by documenting what you are noticing. Take clear photographs of your hairline, crown, and part under similar lighting. Review recent changes in health, stress, diet, medications, or hormonal events. Avoid products that promise rapid regrowth for every type of hair loss.' },
        { type: 'p', text: 'Arrange a professional evaluation, especially if the shedding is persistent or you cannot identify a likely cause. Set realistic expectations: hair growth is slow, and many treatments require several months before their effects can be assessed.' },
        { type: 'h2', text: 'When Should You Consider Follicle Solutions?' },
        { type: 'p', text: 'At Dr. Follicle Solutions in Medellín, Colombia, hair restoration begins with understanding the patient\'s needs, hair-loss pattern, and goals. Options may include hair restoration planning, PRP treatment, or hair transplant surgery — not every patient needs a transplant.' },
        { type: 'quote', text: 'A good hair loss treatment plan should start with answers — not pressure.' },
      ],
    },
  },
  {
    slug: 'hair-transplant-medellin-safe',
    published_at: '2026-10-05T10:00:00+00:00',
    body: {
      es: [],
      en: [
        { type: 'p', text: 'If you are researching a hair transplant in Medellín, you are probably asking more than just whether the procedure itself is safe. You may also be wondering: Is Medellín safe for international patients? Where would I stay? What is the city like during recovery? Can I actually enjoy my trip while I am here?' },
        { type: 'p', text: 'Choosing a hair transplant abroad is not simply about comparing procedure prices. It is also about choosing the right medical team, understanding your recovery, planning your accommodation and transportation, and feeling comfortable in the destination where you will spend those days.' },
        { type: 'p', text: 'Known as the City of Eternal Spring, Medellín has evolved into an international destination for tourism, business, culture, wellness and medical care. The city offers modern infrastructure, a growing international tourism industry, excellent restaurants and cafés, cultural attractions, pleasant weather, and a reputation for the warmth of its people.' },
        { type: 'h2', text: 'Medellín Has Become a Major International Tourism Destination' },
        { type: 'p', text: 'In the first half of 2025, Medellín received approximately 954,600 tourists, representing a 12.4% increase compared with the same period of 2024. Of those visitors, approximately 546,000 were international tourists. Between 2014 and 2024, more than 10.1 million passengers entered through José María Córdova International Airport — a 234.9% increase over the decade.' },
        { type: 'p', text: 'In 2025, the United States was the largest source market with more than 310,000 travelers. For an American patient considering a hair transplant in Medellín, this is relevant: you are not traveling to a city that is unfamiliar with international visitors.' },
        { type: 'h2', text: 'What About Safety in Medellín?' },
        { type: 'p', text: 'Medellín is a large Latin American city, not a risk-free destination. Like any major city, it has areas and situations where visitors need to exercise caution. Crime exists, and international travelers should be aware of risks such as theft, scams, and other situations that can affect tourists.' },
        { type: 'p', text: 'That does not mean every visitor will have a dangerous experience or that traveling to Medellín for medical treatment is inherently unsafe. It means you should travel intelligently.' },
        { type: 'p', text: 'Simple precautions for international patients include: staying in established tourist areas and reputable accommodations; using trusted transportation rather than hailing taxis from the street; avoiding displaying large amounts of cash or expensive belongings; following the guidance of your clinic and accommodation; and planning transportation in advance.' },
        { type: 'h2', text: 'What Makes Medellín Attractive for a Hair Transplant?' },
        { type: 'p', text: 'A hair transplant is different from many other types of travel. You are undergoing a medical procedure and then spending several days allowing your body to recover. That makes the destination itself part of the experience.' },
        { type: 'p', text: 'Medellín\'s mild climate is one of the characteristics that makes the city particularly attractive to visitors. There are no extreme seasonal temperature changes like those in many parts of the United States or Canada — which can make the overall travel experience more comfortable during recovery.' },
        { type: 'h2', text: 'A City Where You Can Actually Relax' },
        { type: 'p', text: 'One of the advantages of choosing Medellín is that your trip does not have to feel like a hospital visit. Once your medical team determines that you can resume light activities, there are many ways to enjoy the city without exhausting yourself.' },
        { type: 'p', text: 'You can spend an afternoon having Colombian coffee in El Poblado. You can enjoy a quiet dinner at a restaurant in Laureles. You can visit a museum or explore local art and architecture. Or you can simply stay at your hotel, order a good meal and rest. Sometimes, after a medical procedure, doing less is exactly what you need.' },
        { type: 'h2', text: 'The People: One of Medellín\'s Most Memorable Experiences' },
        { type: 'p', text: 'Ask many visitors what they remember most about Medellín and the answer will often go beyond the weather, restaurants or mountains. It is the people. Paisa culture is known for its warmth, friendliness and hospitality.' },
        { type: 'p', text: 'For someone traveling internationally for a medical procedure, this human element matters. You are arriving in a new country for something personal. Having a city where people are generally welcoming can make the experience feel less intimidating.' },
        { type: 'h2', text: 'Medellín and Medical Tourism' },
        { type: 'p', text: 'According to official tourism information, more than 23,000 people arrived in Medellín from other countries in 2024 for medical reasons, including diagnostic procedures, scheduled surgeries, and specialized consultations. This shows that international healthcare travel is not a new phenomenon in Medellín.' },
        { type: 'h2', text: 'What Can You Do in Medellín Before or After a Hair Transplant?' },
        { type: 'p', text: 'El Poblado is one of the city\'s most popular areas for international visitors — home to hotels, restaurants, cafés, shopping, and wellness services. Laureles offers a different atmosphere, known for its restaurants, cafés, tree-lined streets and more residential feel. For patients who prefer a slower and quieter environment, it can be an attractive alternative.' },
        { type: 'p', text: 'Food can be one of the easiest ways to enjoy Medellín without exhausting yourself. Try traditional Colombian dishes, specialty coffee, fresh fruit, and local desserts. And if your medical team approves longer outings, Antioquia also offers destinations outside the city.' },
        { type: 'h2', text: 'What Should You Avoid During Hair Transplant Recovery?' },
        { type: 'p', text: 'Your hair transplant recovery comes first. Depending on your procedure and your doctor\'s instructions, you may need to temporarily limit intense exercise, heavy physical activity, excessive sun exposure, swimming, activities that cause excessive sweating, touching or scratching the recipient area, and long or physically demanding excursions.' },
        { type: 'h2', text: 'How Long Should You Stay in Medellín for a Hair Transplant?' },
        { type: 'p', text: 'There is no universal number of days that works for every patient. Your ideal stay depends on the procedure performed, the number of grafts, your individual recovery, your doctor\'s recommendations, and your travel distance. For international patients, staying several days allows time for the initial recovery period and any recommended follow-up before returning home.' },
        { type: 'h2', text: 'Hair Transplant in Medellín with Follicle Solutions' },
        { type: 'p', text: 'At Follicle Solutions, we understand that international patients are looking for more than a hair transplant. They want to feel confident about their medical decision, have clear communication, and feel supported while away from home.' },
        { type: 'p', text: 'The process includes personalized hair restoration planning, medical evaluation, and follow-up during recovery. For international patients, the journey can include assistance with the experience before and after the procedure.' },
        { type: 'quote', text: 'Your hair restoration journey can be medical, comfortable and memorable at the same time.' },
      ],
    },
  },
  {
    slug: 'hair-transplant-timeline-what-to-expect-month-by-month',
    published_at: '2026-09-21T10:00:00+00:00',
    body: {
      es: [],
      en: [
        { type: 'p', text: 'Deciding to undergo a hair transplant is a major decision. Once the procedure is behind you, most patients want to know one thing above all else: when will they see results?' },
        { type: 'p', text: 'The honest answer is that hair transplant results take time — more time than many patients expect. Initial changes typically appear around the third or fourth month, with more visible improvement between six and nine months, and growth potentially continuing through twelve months or longer. Evaluating a hair transplant too early can create unrealistic expectations.' },
        { type: 'h2', text: 'How Long Does It Take for Hair to Grow After a Hair Transplant?' },
        { type: 'p', text: 'Hair follicles have their own biological growth cycle. After transplantation, they require adaptation time in their new location before restarting that cycle. A hair transplant involves moving living hair follicles that need recovery time before producing new hair — it is not simply placing artificial hair in the scalp.' },
        { type: 'h2', text: 'Day 1: The Day of the Procedure' },
        { type: 'p', text: 'Follicles are harvested using techniques like FUE (Follicular Unit Extraction), requiring several hours depending on the method and number of grafts. Immediately after the procedure, the scalp will show redness, small scabs around the follicles, sensitivity, mild swelling, and an altered appearance. This is completely normal.' },
        { type: 'h2', text: 'The First Week: Protection and Recovery' },
        { type: 'p', text: 'The priority in the first week is protecting the newly transplanted follicles. Avoid touching or scratching the treated area. Small scabs will develop around the implanted follicles. Swelling may occur, particularly around the forehead, and will gradually decrease over the following days.' },
        { type: 'h2', text: 'Month 1: A Stage That Can Confuse Many Patients' },
        { type: 'p', text: 'During the first month, transplanted hair may fall out — a process called shock loss or postoperative shedding. The follicle remains intact while the hair shaft temporarily sheds, then enters a new growth phase. This shedding does not indicate transplant failure. Many patients become concerned when they see this, but it is a normal part of the follicular cycle.' },
        { type: 'h2', text: 'Months 2–3: The Waiting Stage' },
        { type: 'p', text: 'Months two and three represent an emotionally challenging period for many patients. After initial shedding, minimal visible change occurs. Some patients may feel they have less hair than before the procedure. This is normal — the follicles are completing their biological cycle without yet producing significant visible growth. Patience and adherence to post-operative instructions are essential.' },
        { type: 'h2', text: 'Month 4: New Hair Begins to Appear' },
        { type: 'p', text: 'Around the fourth month, the first signs of new growth emerge. New hairs may appear very fine, short, light, and uneven, growing at different rates across the transplanted area. Not all follicles produce hair simultaneously, which creates an initially patchy appearance. This unevenness is temporary.' },
        { type: 'h2', text: 'Months 5–6: Growth Becomes More Noticeable' },
        { type: 'p', text: 'Between months five and six, changes become much more visible. New hairs continue growing, increasing in length and thickness. The transplanted area begins to appear fuller. Most patients see significant improvement compared to earlier stages and start feeling encouraged by what they observe.' },
        { type: 'h2', text: 'Months 7–9: Increasing Density' },
        { type: 'p', text: 'Transplanted hair appears thicker and more natural. Beyond length increases, hairs increase in caliber, making results considerably denser even if follicles have not fully matured. Many patients feel substantially more satisfied during this phase and begin to see how the final result is taking shape.' },
        { type: 'h2', text: 'Months 10–12: The Results Take Shape' },
        { type: 'p', text: 'A large portion of the expected growth becomes visible. Hair typically exhibits greater length, increased thickness, improved density, a more natural appearance, and uniform integration with existing hair. Growth rates vary individually; some patients may continue to experience improvements beyond the first year.' },
        { type: 'h2', text: 'Is Hair Shedding After a Hair Transplant Normal?' },
        { type: 'p', text: 'Yes. Temporary shedding through shock loss is a normal part of the process. The critical distinction is between temporary hair shaft shedding versus permanent follicle loss. A properly performed procedure preserves the follicular unit for continued hair production.' },
        { type: 'h2', text: 'What Factors Can Affect the Hair Transplant Timeline?' },
        { type: 'p', text: 'Not every patient follows an identical timeline. Hair growth variation depends on individual factors: age, hair characteristics such as thickness and texture, donor area quality, surgical technique and planning, overall health, and adherence to post-operative care instructions.' },
        { type: 'h2', text: 'The Goal Is Not Just Hair Growth — It\'s a Natural-Looking Result' },
        { type: 'p', text: 'Successful hair transplants involve more than follicle numbers. Essential factors include hairline design, follicle distribution, growth direction, density, and integration with existing hair. Each of these contributes to whether the result looks natural.' },
        { type: 'p', text: 'At Dr. Follicle Solutions, procedures are planned according to facial anatomy, hair-loss patterns, donor area characteristics, and individual needs — aiming for natural-appearing restoration that also considers how the hair will look as the patient ages.' },
        { type: 'quote', text: 'Comparing your progress with other patients\' photographs can be misleading due to individual variation. The best reference point is your own follow-up with your medical team.' },
      ],
    },
  },
  {
    slug: 'finasteride-before-hair-transplant',
    published_at: '2026-09-04T10:00:00+00:00',
    body: {
      es: [],
      en: [
        { type: 'p', text: 'If you are considering a hair transplant, you may have already come across the medication finasteride. Some clinics recommend it before surgery. Others mention it after. And some patients wonder whether they need it at all.' },
        { type: 'p', text: 'The answer is not the same for every patient. Finasteride can be an important part of a hair loss management plan for some men with androgenetic alopecia, but it is not automatically required before a hair transplant.' },
        { type: 'h2', text: 'What Is Finasteride?' },
        { type: 'p', text: 'Finasteride is a prescription medication used for male pattern hair loss (androgenetic alopecia). Its mechanism involves inhibiting the 5-alpha reductase enzyme, which reduces the conversion of testosterone to dihydrotestosterone (DHT). In men who are genetically susceptible, DHT causes progressive miniaturization of hair follicles — the underlying process behind male pattern hair loss.' },
        { type: 'p', text: 'By reducing DHT levels, finasteride may slow the progression of androgenetic alopecia in some men. Not every patient responds in the same way, and benefits depend on factors including the stage of hair loss, age, and individual response to the medication.' },
        { type: 'h2', text: 'Why Might Finasteride Be Recommended Before a Hair Transplant?' },
        { type: 'p', text: 'A hair transplant restores hair in areas where it has been lost, but it does not necessarily stop the underlying process responsible for male pattern hair loss. Consider a patient with a receding hairline who also has significant hair coverage in the frontal area. If the transplanted follicles perform well but the patient\'s existing hair continues to thin, the overall result may not reflect what was planned.' },
        { type: 'p', text: 'In that scenario, a medication that helps slow the progression of androgenetic alopecia may be a relevant part of the overall plan — particularly for younger patients whose hair loss pattern is likely to continue evolving.' },
        { type: 'h2', text: 'Does Everyone Need Finasteride Before a Hair Transplant?' },
        { type: 'p', text: 'No. Finasteride is not a universal requirement for hair transplantation. Some patients have stable hair loss and are good surgical candidates without any medical therapy. Others may benefit from finasteride as part of a broader plan to preserve existing hair. The decision should be made with a qualified medical professional.' },
        { type: 'h2', text: 'Who May Benefit From Finasteride Before a Hair Transplant?' },
        { type: 'p', text: 'Finasteride may be a relevant consideration for men with active androgenetic alopecia who are still losing non-transplanted hair, those showing significant miniaturization, younger patients with possible future progression, and those with good donor density but ongoing thinning in recipient areas.' },
        { type: 'h2', text: 'Why Stabilizing Hair Loss Matters' },
        { type: 'p', text: 'Donor hair is a limited resource. In planning a hair transplant, the medical team must consider not only the current state of the patient\'s hair but also how it may look five, ten, or twenty years in the future — particularly for younger patients.' },
        { type: 'p', text: 'If a patient\'s existing hair continues to thin after surgery, the balance between transplanted and native hair changes over time. Medical therapy that slows androgenetic progression can help maintain that balance when clinically appropriate.' },
        { type: 'h2', text: 'Can Finasteride Prevent the Need for a Hair Transplant?' },
        { type: 'p', text: 'In some cases, finasteride may help slow progression and maintain existing hair to a degree that reduces the urgency for surgical intervention. However, finasteride cannot reliably recreate large areas of permanently lost hair. Once follicles have been significantly miniaturized or lost, medical treatment has limited ability to restore those areas.' },
        { type: 'h2', text: 'Finasteride Before vs. After a Hair Transplant' },
        { type: 'p', text: 'Finasteride can be used before a transplant to help stabilize hair loss and evaluate the patient\'s response. When used after a transplant, the focus is typically on preserving non-transplanted native hair in and around the treated areas.' },
        { type: 'p', text: 'Transplanted follicles are generally selected from DHT-resistant donor areas, which is why they tend to maintain their characteristics after transplantation. The concern is not protecting the transplanted hair, but preserving the existing native hair that surrounds it.' },
        { type: 'h2', text: 'What Are the Potential Side Effects of Finasteride?' },
        { type: 'p', text: 'Like any prescription medication, finasteride can have potential side effects. Some men may experience sexual or reproductive side effects, while others may experience no significant problems. It also affects PSA levels, which is relevant for prostate health monitoring. Before starting finasteride, discuss potential risks and benefits with a healthcare professional.' },
        { type: 'h2', text: 'Can You Have a Hair Transplant Without Finasteride?' },
        { type: 'p', text: 'Yes. Many patients undergo hair transplantation without taking finasteride. The decision depends on the specific pattern of hair loss, the likelihood of future progression, and the patient\'s individual circumstances and preferences. Younger patients with actively progressing hair loss require different planning than those with stable, well-established patterns.' },
        { type: 'h2', text: 'Personalized Hair Restoration at Follicle Solutions' },
        { type: 'p', text: 'At Dr. Follicle Solutions, the conversation about finasteride happens in the context of a full evaluation. The team does not apply a standard protocol to every patient. The goal is to understand your specific situation — the current state of your hair, the likely trajectory, your donor area, and your long-term expectations — and to recommend a plan that reflects that reality.' },
        { type: 'p', text: 'For international patients traveling to Medellín, this evaluation can begin remotely. You do not need to book a flight to find out whether you are a good candidate or what role, if any, medical therapy should play in your plan.' },
        { type: 'quote', text: 'Finasteride is not a universal requirement. It is one potential tool in a broader plan — and whether it is right for you depends on your individual evaluation.' },
      ],
    },
  },
];

async function main() {
  for (const article of articles) {
    console.log(`Updating: ${article.slug}`);
    const { error } = await supabase
      .from('posts')
      .update({ body: article.body, published_at: article.published_at })
      .eq('slug', article.slug);

    if (error) {
      console.error(`  ERROR code: ${error.code}`);
      console.error(`  ERROR msg:  ${error.message}`);
      console.error(`  ERROR details:`, error.details, error.hint);
    } else {
      console.log(`  OK`);
    }
  }
  console.log('Done.');
}

main().catch((e) => {
  console.error('Fatal:', e.message);
  console.error(e.cause ?? e);
});
