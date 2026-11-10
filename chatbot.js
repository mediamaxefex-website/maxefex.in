/** MAX EFEX guided assistant. Deterministic answers; no API keys or external AI calls. */
// Classic-script wrapper keeps direct file:// previews working without leaking lexical globals.
(() => {
'use strict';
const CONTACT = {
  phone: '+91 99616 99196',
  emails: ['mediamaxefex@gmail.com', 'studiomaxefex@gmail.com', 'maxefexgraphics@gmail.com'],
  whatsapp: 'https://wa.me/919961699196'
};
const PACKAGE_LINK = { label: 'Compare all packages', href: 'packages.html' };
const TECHNOLOGY_LINK = { label: 'Explore technology options', href: 'technical.html' };
const TERMS_LINK = { label: 'Read project & service terms', href: 'terms.html' };
const PAYMENT_LINK = { label: 'Payment & activation policy', href: 'terms.html#payment' };
const CARE_LINK = { label: 'Explore update plans', href: 'care.html#plans' };
const ADVANCED_LINK = { label: 'Compare advanced packages', href: 'packages.html#advanced-packages' };
const ADVANCED_PACKAGES = [
  {intent:'advanced-automation',names:['business automation website','business automation package','15999'],text:'Business Automation Website starts from ₹15,999. The published scope covers login/registration, admin and customer dashboards, a website assistant, WhatsApp enquiries, forms and maps, advanced SEO setup, SSL, responsive design and one year of support. Confirm the supported tasks and support terms in the quotation.'},
  {intent:'advanced-ai',names:['ai business website','ai business package','24999'],text:'AI Business Website starts from ₹24,999. It includes the Business Automation scope plus a connected ChatGPT/Gemini chatbot, a business knowledge base, smart FAQs, booking and lead workflows, email automation, analytics and reviews integration. API/subscription fees and the connected assistant’s data, usage limits and setup are agreed separately. This website’s own studio assistant still uses prepared local answers.'},
  {intent:'advanced-commerce',names:['e-commerce pro','ecommerce pro','e commerce pro','39999'],text:'E-Commerce Pro starts from ₹39,999. It includes the AI Business scope plus catalogue, cart and orders, Razorpay/UPI/card integration, tracking, customer accounts, inventory, coupons, GST-ready configuration and SEO. Product capacity, hosting, tax requirements and integration scope are confirmed in the quotation; there is no fixed unlimited-product or unlimited-hosting promise. Merchant approval and payment-provider fees are separate.'},
  {intent:'advanced-enterprise',names:['enterprise business suite','enterprise suite','59999'],text:'Enterprise Business Suite starts from ₹59,999. It includes the E-Commerce Pro scope plus multi-user access, employee and customer portals, CRM, billing, inventory, AI reports, APIs and mobile integration, a cloud database and security tailored to the agreed system. User roles, capacity, infrastructure, data protection and support need a project-specific scope.'},
  {intent:'advanced-custom',names:['premium custom development','custom development package','60000'],text:'Premium Custom Development starts from ₹60,000+. It is tailored for ERP, hospital or school/college systems, hotel booking, marketplaces, pharmacy, real estate, job portals, LMS, delivery/event booking, Android/iOS apps and other bespoke workflows. The listed examples are possible project types, not a promise to deliver all of them together for the starting price.'}
];
const ADVANCED_TERMS = '\n\nThese are starting estimates. Final requirements and charges are confirmed by written quotation; API, subscription, merchant and other applicable third-party fees are separate unless expressly included. Public activation and final handover follow preview approval and full cleared payment of the agreed project balance and approved extras.';
const STARTERS = ['Help me choose a package', 'Website prices', 'Technology for my business', 'Contact the studio'];
const reply = (intent, text, links = [], suggestions = []) => ({ intent, text, links, suggestions });
const has = (text, words) => words.some(word => text.includes(word));

function getAssistantReply(input, context = {}) {
  const original = String(input || '').trim().slice(0, 600);
  const text = original.toLowerCase().replace(/[₹,]/g, '').replace(/\s+/g, ' ');
  const advancedPackage = ADVANCED_PACKAGES.find(item => has(text, item.names));
  if (!text) return reply('empty', 'Tell me what your business needs, or choose one of the questions below.', [], STARTERS);

  if (has(text, ['മലയാളം', 'വില', 'വെബ്സൈറ്റ്', 'ലോഗോ', 'ബന്ധപ്പെട', 'നമസ്കാരം'])) {
    if (text.includes('ലോഗോ')) return reply('malayalam-logo', 'ലോഗോ ഡിസൈൻ ₹1,500 മുതൽ. PNG, JPG, സോഷ്യൽ മീഡിയ ഫയലുകൾ ഉൾപ്പെടുന്നു. വെക്റ്റർ ഫയലുകൾ ആവശ്യമെങ്കിൽ ₹3,000-ന്റെ വെക്റ്റർ ഡിസൈൻ പാക്കേജ് പരിശോധിക്കാം. അന്തിമ ആവശ്യങ്ങളും നിരക്കും സ്റ്റുഡിയോയുമായി ഉറപ്പാക്കുക.', [PACKAGE_LINK]);
    if (text.includes('ബന്ധപ്പെട')) return reply('malayalam-contact', `MAX EFEX-നെ ബന്ധപ്പെടാം: ${CONTACT.phone}.\nഇമെയിൽ: ${CONTACT.emails.join(' · ')}.\nതാഴെയുള്ള WhatsApp ബട്ടൺ വഴി സന്ദേശം അയയ്ക്കാം.`, [{ label: 'Call the studio', href: 'tel:+919961699196' }]);
    return reply('malayalam', 'നമസ്കാരം! MAX EFEX-ലേക്ക് സ്വാഗതം. വെബ്സൈറ്റ് പാക്കേജുകൾ: Standard ₹4,999, Classic ₹6,999, Premium ₹8,999, Business ₹11,999. ഒരു വർഷത്തെ ഡൊമെയ്നും ഹോസ്റ്റിംഗും ഉൾപ്പെടുന്നു. ആവശ്യങ്ങൾ, പുതുക്കൽ നിരക്ക്, സമയപരിധി എന്നിവ സ്റ്റുഡിയോയുമായി ഉറപ്പാക്കുക.', [PACKAGE_LINK], ['Website prices', 'Contact the studio']);
  }

  if (!advancedPackage && has(text, ['privacy', 'saved', 'stored', 'personal data', 'human', 'real person', 'ai bot', 'chatgpt'])) {
    return reply('assistant-info', 'I’m a guided website assistant with prepared answers about MAX EFEX services. I’m not a live person or a connected AI model. This chat stays in this page’s memory and is cleared when you reload; it is not sent to an AI service. The WhatsApp handoff includes your recent chat only when you choose to open the draft. Please leave out passwords, payment details and other sensitive information.', [{ label: 'Email the studio', href: 'mailto:maxefexgraphics@gmail.com' }]);
  }
  if (has(text, ['public launch', 'launch policy', 'before launch', 'go live', 'full payment', 'full-payment', 'fullpayment', 'cleared payment', 'remaining balance', 'payment policy']) || /\b(activate|activation|handover|publishing)\b/.test(text)) {
    return reply('payment-activation', 'You review and approve the agreed private preview first. Public launch or activation, and final handover of the newly commissioned work, take place only after the full project balance and any approved additional charges have cleared. A pending transfer or payment screenshot is not cleared payment. Any advance and payment milestones are stated in your written quotation; there is no fixed advance percentage here. This applies to the commissioned project, not an unrelated fully paid website or a client-owned domain.', [PAYMENT_LINK, TERMS_LINK], ['Update plans', 'Domain renewal charges', 'Contact the studio']);
  }
  if (has(text, ['update plan', 'care plan', 'content updates', 'maintenance plan']) || (/\b(monthly|six[- ]?months?(?:ly)?|6[- ]?months?(?:ly)?|half[- ]?year(?:ly)?|yearly|annual)\b/.test(text) && /\b(updates?|care|maintenance|plans?)\b/.test(text) && !has(text, ['domain', 'hosting', 'renew']))) {
    return reply('update-plans', 'Monthly, six-monthly and yearly content-update plans are available by written quotation. Prices vary with the agreed tasks, update volume, request frequency and support scope; no fixed plan price has been published. The quotation confirms included work, dates, billing, revision limits, response expectations and renewal/cancellation arrangements. New features or redesigns are separately estimated and require your approval. Domain and hosting renewals are separate from a content-update plan unless expressly included.', [CARE_LINK, PAYMENT_LINK], ['Domain renewal charges', 'Contact the studio']);
  }
  if (has(text, ['renew', 'second year', 'after one year', 'after 1 year', 'hosting', 'domain']) || /\.co\.in\b|\.in\b|\.com\b|\.store\b/.test(text)) {
    return reply('hosting', 'Published website packages include one year of domain and hosting within the approved package scope. Standard lists .co.in support; Classic lists .in and .co.in support. Other extensions such as .com and .store must be confirmed in your quotation and are not automatically included in every package. Registration is subject to availability. Renewal charges vary by the selected extension, registrar/provider, hosting and support plan. You receive a written renewal quotation; there is no single fixed annual renewal rate. Domain/hosting renewal and content-update plans are separate unless explicitly combined in the quotation.', [CARE_LINK, PACKAGE_LINK, TERMS_LINK], ['Update plans', 'Contact the studio']);
  }
  if (has(text, ['custom website', 'custom web', 'custom project']) && has(text, ['cost', 'price', 'charge', 'quote', 'quotation', 'budget'])) {
    return reply('custom-quote', 'Custom website charges vary with your requirements: pages, design, products, user roles, content, integrations, migration, testing and support. The listed package prices are starting scopes, not a fixed price for every custom feature. The studio will provide a written quotation; additional work and third-party costs require approval before being charged.', [PACKAGE_LINK, TERMS_LINK], ['Contact the studio']);
  }
  if (advancedPackage && !has(text, ['payment terms', 'refund', 'cancellation', 'ownership', 'revision'])) {
    return reply(advancedPackage.intent, advancedPackage.text + ADVANCED_TERMS, [ADVANCED_LINK, PAYMENT_LINK], ['Advanced packages', 'Contact the studio']);
  }
  if (has(text, ['advanced package', 'advanced website package'])) {
    return reply('advanced-packages', 'Advanced starting estimates:\n• Business Automation Website — from ₹15,999.\n• AI Business Website — from ₹24,999.\n• E-Commerce Pro — from ₹39,999.\n• Enterprise Business Suite — from ₹59,999.\n• Premium Custom Development — from ₹60,000+.\n\nChoose by your required workflow and capacity, not only the starting price.' + ADVANCED_TERMS, [ADVANCED_LINK, PAYMENT_LINK], ['Business Automation Website', 'AI Business Website', 'E-Commerce Pro', 'Enterprise Business Suite']);
  }
  if (has(text, ['contact', 'email', 'phone', 'call', 'whatsapp', 'address', 'location', 'visit', 'speak to', 'talk to'])) {
    return reply('contact', `Call ${CONTACT.phone}.\n\nEmail the team:\n${CONTACT.emails.join('\n')}\n\nStudio: 113, Alphonsa Nagar, Padamattam, Changanassery, Thrikkodithanam, Kerala 686106. Contact the studio to arrange a visit.`, [
      { label: 'Call the studio', href: 'tel:+919961699196' },
      { label: 'Email MAX EFEX Graphics', href: 'mailto:maxefexgraphics@gmail.com' },
      { label: 'Get directions', href: 'https://www.google.com/maps/dir/?api=1&destination=9.4646188,76.567985' }
    ]);
  }
  if (has(text, ['timeline', 'how long', 'delivery', 'revision', 'refund', 'payment terms', 'terms', 'conditions', 'cancel', 'tax', 'gst', 'copyright', 'ownership']) || /\badvance\b/.test(text)) {
    return reply('terms', 'Your accepted written quotation defines the deliverables, revision rounds, schedule, payment milestones, applicable taxes, usage rights and support. Custom website charges vary with requirements. Additional work needs an approved written estimate. Public activation follows preview approval and full cleared payment. For cancellation, completed work and reasonable approved commitments are itemised, with any unused advance settled subject to applicable law; there is no blanket no-refund rule. Statutory rights remain available. See the complete service terms or ask the studio about your quotation.', [TERMS_LINK, PAYMENT_LINK], ['Update plans', 'Contact the studio']);
  }
  if (has(text, ['ecommerce', 'e-commerce', 'online store', 'sell online', 'checkout', 'woocommerce', 'payment', 'razorpay', 'upi'])) {
    return reply('commerce', 'E-Commerce Pro starts from ₹39,999 and includes the AI Business scope plus catalogue, cart, orders, payment integration, tracking, accounts, inventory, coupons, GST-ready configuration and SEO. Start by defining your catalogue size, stock, delivery rules and payment requirements. Product capacity and hosting are confirmed in the quotation, not an unlimited promise. Gateway approval, merchant charges and applicable API/subscription fees are separate unless expressly included. Public activation follows approved preview and full cleared payment. Final charges depend on the written project scope.', [
      ADVANCED_LINK, { label: 'Custom services', href: 'services.html' }, TECHNOLOGY_LINK
    ], ['Contact the studio', 'Website prices']);
  }
  if (has(text, ['booking', 'appointment', 'reservation', 'automation', 'crm', 'customer management', 'restaurant', 'salon', 'clinic', 'hotel'])) {
    return reply('business-workflow', 'A useful starting point is a mobile-friendly service page, clear enquiries and a Google Business presence. For appointment-led businesses, ask about booking slots and reminders; for hospitality, ask about menus, enquiries or reservations. CRM connections and automation are custom integrations that need a scope, a provider and any ongoing fees agreed first.', [TECHNOLOGY_LINK], ['Help me choose a package', 'Contact the studio']);
  }
  if (has(text, ['technology', 'technologies', 'modern', 'latest', 'pwa', 'progressive', 'accessibility', 'performance', 'core web', 'web vitals', 'analytics', 'structured data', 'chatbot', 'security', 'secure', 'passkey']) || /\bai\b/.test(text)) {
    return reply('technology', 'Choose technology around the customer task:\n• A fast, accessible mobile website helps customers read, navigate and enquire.\n• Structured data and search foundations help search engines understand the business; they do not guarantee rankings.\n• Booking, payments and CRM connections can reduce manual steps when properly scoped.\n• An installable PWA, a connected AI assistant or analytics may suit some projects, but require planning, configuration and any relevant ongoing services.\n\nThese are options to discuss, not features automatically included in every package. This assistant uses prepared local answers, not a connected AI model.', [TECHNOLOGY_LINK], ['Help me choose a package', 'Contact the studio']);
  }
  if (has(text, ['business growth', '5500'])) return reply('business-growth', 'Business Growth Package is ₹5,500 per setup. The published scope combines Google Business Starter and vector-logo features, branding, advanced product/service setup, keyword-focused optimisation and website-link integration. Search visibility and Google verification remain subject to Google; no ranking is guaranteed.', [PACKAGE_LINK], ['Contact the studio']);
  if (has(text, ['business starter'])) return reply('business-starter', 'Google Business Starter is ₹3,000 per setup. It includes profile creation, accurate map-pin location, category/contact information, WhatsApp integration and verification support. Google controls verification and approval.', [PACKAGE_LINK], ['Contact the studio']);
  if (has(text, ['seo', 'google business', 'google maps', 'search', 'ranking', 'rank ', 'indexing'])) {
    return reply('seo', 'Basic Google SEO & Location setup is ₹1,500. Google Business Starter is ₹3,000. Business Growth is ₹5,500 and combines branding, vector logo and business-presence work. Google controls profile verification and search results. A specific ranking, approval or indexing date is not guaranteed.', [PACKAGE_LINK, TECHNOLOGY_LINK], ['Contact the studio']);
  }

  const recommend = has(text, ['choose', 'recommend', 'which package', 'best package', 'suggest', 'need a website', 'new business', 'startup', 'start-up']);
  if ((has(text, ['logo', 'brand identity', 'branding']) && has(text, ['website', 'web site'])) || (recommend && has(text, ['brand', 'logo']))) {
    return reply('recommend-premium', 'If you need a website and a coordinated brand start, compare Premium Website at ₹8,999. The published scope includes 4–8 pages, logo and QR setup, social integration, SEO/Google location setup and branding support. Confirm final deliverables, revision rounds and renewal charges in your quotation.', [PACKAGE_LINK], ['Premium package', 'Contact the studio']);
  }
  if (has(text, ['vector', 'cnc', 'laser', 'cdr', 'illustrator', 'signage'])) {
    return reply('vector', 'Logo Vector Design is ₹3,000 per project. The listed scope includes logo redraw, CDR and AI files, scalable artwork, and preparation for CNC, laser and LED signage. Confirm the production specifications with your fabricator and the studio.', [PACKAGE_LINK]);
  }
  if (has(text, ['logo', 'brand identity', 'branding'])) {
    return reply('logo', 'Standard Logo Design is ₹1,500 per project. The published scope includes multiple concepts, colour variations, PNG/JPG files, social-ready files and commercial usage rights. Vector redraw with CDR/AI production files is a separate ₹3,000 package. Concept count, revisions and final rights should be confirmed in your quotation.', [PACKAGE_LINK], ['Vector files', 'Contact the studio']);
  }
  if (has(text, ['simple business website', 'small business website', 'basic website'])) return getAssistantReply('standard');
  if (has(text, ['11999', 'business website package', 'business package']) || text === 'business website') return reply('business', 'Business Website is ₹11,999 per launch. Listed features: custom design/theme setup, SEO and Google Business optimisation, WhatsApp chat support, lead forms and branding identity support. One year of domain and hosting is included. Custom store, app and login features need a separate scope.', [PACKAGE_LINK], ['Contact the studio']);
  if (has(text, ['8999', 'premium'])) return reply('premium', 'Premium Website is ₹8,999 per launch. It includes 4–8 pages, logo and QR setup, social media integration, SEO/Google location setup and full branding identity support. One year of domain and hosting is included. Confirm revisions, content requirements and renewal charges before booking.', [PACKAGE_LINK], ['Contact the studio']);
  if (has(text, ['6999', 'classic'])) return reply('classic', 'Classic Website is ₹6,999 per launch. It includes 3–6 pages, contact/social integration, Google reviews display, a professional interface and basic SEO setup. It lists .in and .co.in domain support and includes one year of domain and hosting.', [PACKAGE_LINK], ['Contact the studio']);
  if (has(text, ['4999', 'standard'])) return reply('standard', 'Standard Website is ₹4,999 per launch. It includes 2–4 pages, contact details, WhatsApp/social links, Google location setup and .co.in domain support, with one year of domain and hosting. It is a useful starting point for a small informational business site.', [PACKAGE_LINK], ['Contact the studio']);
  const budgetMatch = text.match(/(?:budget|under|around|about|rs\.?\s*)\s*(\d{1,6})(k)?\b/);
  if (budgetMatch) {
    const amount = Number(budgetMatch[1]) * (budgetMatch[2] ? 1000 : 1);
    if (amount < 4999) return reply('budget-low', 'The lowest published website package is Standard at ₹4,999. If your budget is lower, contact the studio to discuss the essentials and whether a smaller scope is possible. I can’t promise a discount or custom price.', [PACKAGE_LINK]);
    if (amount < 6999) return getAssistantReply('standard');
    if (amount < 8999) return getAssistantReply('classic');
    if (amount < 11999) return getAssistantReply('premium');
    return getAssistantReply('business website');
  }
  if (has(text, ['android', 'software', 'windows', 'billing']) || /\bapps?\b/.test(text)) {
    return reply('software', 'MAX EFEX lists Android apps, WebView apps, Play Store publishing, Windows billing software and automation tools. Premium Custom Development starts from ₹60,000+ for tailored systems and Android/iOS apps. Define user roles, screens, data, integrations, distribution, capacity and support first; final charges vary by the written requirements. API/subscription, infrastructure and merchant charges are separate unless expressly included. Public activation and final handover follow approved preview and full cleared payment.', [ADVANCED_LINK, { label: 'View services', href: 'services.html' }], ['Premium Custom Development', 'Contact the studio']);
  }
  if (has(text, ['qr', 'menu', 'print', 'business card', 'packaging'])) {
    return reply('production', 'The studio provides static and dynamic QR solutions, business cards, banners, glass graphics, wallpaper and production-ready print files. Share the size, quantity, print process and destination link. Dynamic QR management and production charges should be agreed separately.', [{ label: 'View services', href: 'services.html' }], ['Vector files', 'Contact the studio']);
  }
  if (recommend || has(text, ['price', 'cost', 'package', 'pricing', 'website', 'what is included'])) {
    return reply('packages', 'Website starting points:\n• Standard ₹4,999 — 2–4 pages and essential contact links.\n• Classic ₹6,999 — 3–6 pages, reviews display and basic SEO.\n• Premium ₹8,999 — 4–8 pages plus logo, QR and branding support.\n• Business ₹11,999 — custom design, lead forms and business-presence support.\n\nThese original website packages include one year of domain and hosting within their approved extension/scope. Advanced packages start from ₹15,999 for automation, with AI Business, E-Commerce Pro, Enterprise and Premium Custom options. Final requirements, capacity, third-party fees, renewals and support are confirmed by written quotation; public activation follows full cleared payment and preview approval. Tell me whether you need an information site, branding, online sales or bookings.', [PACKAGE_LINK, ADVANCED_LINK], ['Simple business website', 'Advanced packages', 'Online store', 'Appointments & bookings']);
  }
  if (has(text, ['about', 'experience', 'studio', 'who are'])) return reply('about', 'MAX EFEX Graphics is a creative studio in Changanassery, Kerala, with 15+ years of experience in branding, websites, digital visuals and print production. The site describes experience since 2011.', [{ label: 'Meet MAX EFEX', href: 'about.html' }], ['Contact the studio']);
  if (/^(hi|hello|hey|hii|good morning|good afternoon|good evening)[!.\s]*$/.test(text)) return reply('greeting', 'Hello! Tell me what you want to build. I can help compare website packages, explain branding and technology options, or connect you with the studio.', [], STARTERS);
  if (/^(thanks|thank you|thankyou|ok|okay)[!.\s]*$/.test(text)) return reply('thanks', 'You’re welcome. If you’re ready, choose “Continue on WhatsApp” to review a draft for the studio, or ask another question here.', [], STARTERS);
  return reply('fallback', 'I may not have a prepared answer for that. I can explain packages, logo design, hosting, SEO, custom apps and technology options. For a project-specific answer, continue on WhatsApp and the studio can help. What would you like to explore?', [], STARTERS);
}

function buildWhatsAppHandoff(history = []) {
  const recent = history.slice(-8).map(({ role, text }) => `${role === 'user' ? 'Visitor' : 'Assistant'}: ${String(text).slice(0, 700)}`).join('\n\n');
  return `${CONTACT.whatsapp}?text=${encodeURIComponent('Hello MAX EFEX Graphics, I would like to discuss a project.' + (recent ? '\n\nMy recent website chat:\n' + recent : ''))}`;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function initStudioAssistant() {
  if (document.getElementById('me-assistant-launcher')) return;
  document.getElementById('chat-toggle')?.remove();
  document.getElementById('maxefex-chat')?.remove();
  const history = [];
  const launcher = element('button', 'me-assistant-launcher');
  launcher.id = 'me-assistant-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open MAX EFEX studio assistant');
  launcher.setAttribute('aria-haspopup', 'dialog');
  launcher.setAttribute('aria-controls', 'me-assistant-dialog');
  launcher.setAttribute('aria-expanded', 'false');
  const launchIcon = element('span', 'me-assistant-launch-icon', '✦');
  launchIcon.setAttribute('aria-hidden', 'true');
  launcher.append(launchIcon, element('span', '', 'Ask MAX EFEX'));
  const dialog = element('dialog', 'me-assistant-dialog');
  dialog.id = 'me-assistant-dialog';
  dialog.setAttribute('aria-labelledby', 'me-assistant-title');
  dialog.setAttribute('aria-describedby', 'me-assistant-description');
  const header = element('div', 'me-assistant-header');
  const brand = element('div', 'me-assistant-brand');
  const logo = element('span', 'brand-mark me-assistant-logo');
  logo.setAttribute('aria-hidden', 'true');
  if (globalThis.MaxefexBrand) logo.append(globalThis.MaxefexBrand.createMark());
  else { const fallback = element('img'); fallback.src = 'images/logo-mark.svg'; fallback.alt = ''; logo.append(fallback); }
  const heading = element('div');
  const title = element('h2', '', 'Studio assistant'); title.id = 'me-assistant-title';
  const description = element('p', '', 'Instant answers · guided assistant'); description.id = 'me-assistant-description';
  heading.append(title, description); brand.append(logo, heading);
  const close = element('button', 'me-assistant-icon-button', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Close assistant');
  header.append(brand, close);
  const log = element('div', 'me-assistant-log');
  log.setAttribute('role', 'log'); log.setAttribute('aria-live', 'polite'); log.setAttribute('aria-relevant', 'additions'); log.setAttribute('aria-label', 'Conversation'); log.tabIndex = 0;
  const quick = element('div', 'me-assistant-prompts'); quick.setAttribute('role', 'group'); quick.setAttribute('aria-label', 'Suggested questions');
  const form = element('form', 'me-assistant-form');
  const inputLabel = element('label', 'me-assistant-sr-only', 'Your question'); inputLabel.htmlFor = 'me-assistant-question';
  const input = element('input'); input.id = 'me-assistant-question'; input.type = 'text'; input.placeholder = 'Ask about your next project…'; input.maxLength = 600; input.autocomplete = 'off'; input.required = true;
  const send = element('button', 'me-assistant-send', 'Send ↗'); send.type = 'submit';
  form.append(inputLabel, input, send);
  const footer = element('div', 'me-assistant-footer');
  const handoff = element('a', 'me-assistant-handoff', 'Continue on WhatsApp ↗'); handoff.target = '_blank'; handoff.rel = 'noopener noreferrer';
  const reset = element('button', 'me-assistant-reset', 'New chat'); reset.type = 'button';
  const disclosure = element('p', 'me-assistant-disclosure', 'WhatsApp opens a draft with your recent chat. Review it before sending. Please omit sensitive details.');
  footer.append(handoff, reset, disclosure);
  dialog.append(header, log, quick, form, footer);
  document.body.append(launcher, dialog);
  let lastFocus;

  function updateHandoff() { handoff.href = buildWhatsAppHandoff(history); }
  function message(role, text, links = []) {
    const bubble = element('div', `me-assistant-message me-assistant-message--${role}`);
    bubble.append(element('span', 'me-assistant-speaker', role === 'user' ? 'You' : 'MAX EFEX'));
    bubble.append(element('p', '', text));
    if (links.length) {
      const actions = element('div', 'me-assistant-links');
      links.forEach(({ label, href }) => {
        const anchor = element('a', '', label + ' ↗'); anchor.href = href;
        if (/^https?:/.test(href)) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
        actions.append(anchor);
      });
      bubble.append(actions);
    }
    log.append(bubble);
    while (log.children.length > 24) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
  }
  function suggestions(prompts) {
    quick.replaceChildren();
    (prompts.length ? prompts : STARTERS).slice(0, 4).forEach(text => {
      const button = element('button', '', text); button.type = 'button'; button.addEventListener('click', () => ask(text)); quick.append(button);
    });
  }
  function ask(value) {
    const text = String(value).trim().slice(0, 600); if (!text) return;
    message('user', text); history.push({ role: 'user', text });
    const answer = getAssistantReply(text);
    message('assistant', answer.text, answer.links); history.push({ role: 'assistant', text: answer.text });
    if (history.length > 24) history.splice(0, history.length - 24);
    suggestions(answer.suggestions); input.value = ''; updateHandoff(); input.focus();
  }
  function start() {
    history.splice(0); log.replaceChildren();
    message('assistant', 'Welcome to MAX EFEX Graphics. I can help you compare packages, understand technology options and plan a conversation with the studio. You can also ask in Malayalam.');
    suggestions(STARTERS); updateHandoff();
  }
  function openAssistant(question) {
    if (!dialog.open) { lastFocus = document.activeElement; dialog.showModal(); launcher.setAttribute('aria-expanded', 'true'); }
    if (question) ask(question); else input.focus();
  }
  launcher.addEventListener('click', () => openAssistant());
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { launcher.setAttribute('aria-expanded', 'false'); (lastFocus || launcher).focus(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  reset.addEventListener('click', () => { start(); input.value = ''; input.focus(); });
  document.addEventListener('click', event => { const trigger = event.target.closest('[data-open-assistant]'); if (trigger) { event.preventDefault(); openAssistant(trigger.getAttribute('data-question') || ''); } });
  start();
}

globalThis.MaxefexAssistant = Object.freeze({ getAssistantReply, buildWhatsAppHandoff, initStudioAssistant });

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initStudioAssistant, { once: true });
  else initStudioAssistant();
}
})();
