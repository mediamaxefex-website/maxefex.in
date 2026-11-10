(function () {
  'use strict';

  const goals = {
    brand: { label: 'Launch my brand', tier: 'Premium Website', price: '₹8,999', summary: 'Bring your logo, website and first customer touchpoints into one consistent launch.', reason: 'The published Premium package combines 4–8 pages, logo and QR setup, SEO and brand identity support.' },
    enquiries: { label: 'Get more enquiries', tier: 'Classic Website', price: '₹6,999', summary: 'Make your services easy to understand, build trust and give visitors a clear route to contact you.', reason: 'The published Classic package includes 3–6 pages, contact integration, Google reviews display and basic SEO setup.' },
    sell: { label: 'Sell online', tier: 'E-Commerce Pro', price: '₹39,999', starting: true, summary: 'Plan the product catalogue, checkout, order handling and ongoing store management together.', reason: 'The E-Commerce Pro package starts at ₹39,999. Product capacity, payment setup, provider charges and final functionality are agreed in your quotation.' },
    automate: { label: 'Simplify my operations', tier: 'Business Automation Website', price: '₹15,999', starting: true, summary: 'Start with the repetitive task, then design the right customer or staff workflow around it.', reason: 'Business Automation Website starts at ₹15,999. Compare AI Business Website from ₹24,999, Enterprise Business Suite from ₹59,999 and Premium Custom Development from ₹60,000+ for broader requirements.' }
  };

  const featureInfo = {
    booking: { label: 'Appointments & booking', advice: 'Booking: agree on available slots, confirmation messages and who manages changes before choosing a booking tool.' },
    payments: { label: 'Online payments', advice: 'Payments: use an approved payment provider with server-side order handling and verified payment status. Merchant setup and integration are quoted separately.' },
    catalog: { label: 'Product or service catalogue', advice: 'Catalogue: decide who updates items, how many products or services are needed, and whether visitors browse or buy.' },
    multilingual: { label: 'Malayalam + English', advice: 'Two languages: plan human-reviewed translations, a visible language switcher and search-friendly page URLs.' },
    search: { label: 'Search within my website', advice: 'Website search: useful for larger catalogues or content libraries. Define the searchable content and a clear no-results experience.' },
    analytics: { label: 'Enquiry & visitor insights', advice: 'Insights: choose the enquiries and visitor actions worth measuring, then plan suitable privacy controls before adding analytics.' }
  };

  function recommend(input = {}) {
    const goal = Object.hasOwn(goals, input.goal) ? input.goal : 'enquiries';
    const selected = [...new Set(Array.isArray(input.features) ? input.features : [])].filter(key => Object.hasOwn(featureInfo, key));
    const base = goals[goal];
    const business = typeof input.business === 'string' ? input.business.trim().slice(0, 120) : '';
    const features = selected.map(key => featureInfo[key].label);
    const advice = [
      'A fast mobile experience: responsive layouts, optimised images and clear contact actions.',
      'Search foundations: descriptive page content, metadata and structured data where appropriate. Search rankings and rich results are not guaranteed.',
      ...selected.map(key => featureInfo[key].advice)
    ];
    if (goal === 'sell' && !selected.includes('payments')) advice.push('If customers will pay online, add checkout and payment verification to the project scope.');
    if (goal === 'automate') advice.push('Map the current process first. Discuss data access, user roles, maintenance and any third-party subscriptions before choosing an automation.');
    const pricing = base.price ? `${base.tier} — ${base.starting?'starting from ':''}${base.price} ${base.starting?'before scoped extras':'published launch package'}` : base.tier;
    const brief = [
      'Hello MAX EFEX Graphics, I would like to discuss a project.',
      '',
      `Goal: ${base.label}`,
      ...(business ? [`Business / industry: ${business}`] : []),
      `Features: ${features.length ? features.join(', ') : 'Please help me choose the right features.'}`,
      `Suggested starting point: ${pricing}`,
      '',
      'Please confirm the scope, total quotation, revisions, timeline, renewal and ongoing support costs. I understand that additional features and third-party subscriptions may cost extra. Public activation follows approval and clearance of the full project balance.'
    ].join('\n');
    return { goal, business, selected, features, ...base, advice, pricing, brief, hasExtras: selected.length > 0 };
  }

  function initialise(host, index) {
    const prefix = `me-planner-${index}`;
    host.classList.add('me-planner');
    const heading = document.createElement('div');
    heading.className = 'me-planner-heading';
    heading.innerHTML = '<div><span class="me-tool-kicker">YOUR NEXT MOVE</span><h2>Find the right starting point.</h2></div><p>Tell us what you want to achieve. Get a practical direction and a brief you can discuss with the studio.</p>';
    const layout = document.createElement('div');
    layout.className = 'me-planner-layout';
    const form = document.createElement('form');
    form.className = 'me-planner-form';
    form.setAttribute('aria-label', 'Build your project brief');

    const goalSet = document.createElement('fieldset');
    goalSet.innerHTML = '<legend><span>01</span> What is your main goal?</legend>';
    const goalOptions = document.createElement('div');
    goalOptions.className = 'me-goal-options';
    for (const [value, goal] of Object.entries(goals)) {
      const label = document.createElement('label');
      label.className = 'me-goal-choice';
      const radio = document.createElement('input');
      radio.type = 'radio'; radio.name = 'goal'; radio.value = value; radio.checked = value === 'enquiries';
      const text = document.createElement('span'); text.textContent = goal.label;
      label.append(radio, text); goalOptions.append(label);
    }
    goalSet.append(goalOptions);
    const businessLabel = document.createElement('label');
    businessLabel.className = 'me-business-label'; businessLabel.htmlFor = `${prefix}-business`;
    businessLabel.textContent = 'Your business or industry';
    const optional = document.createElement('small'); optional.textContent = 'Optional'; businessLabel.append(optional);
    const business = document.createElement('input');
    business.id = `${prefix}-business`; business.name = 'business'; business.type = 'text'; business.maxLength = 120;
    business.placeholder = 'For example, a salon, restaurant or local store'; business.autocomplete = 'off';
    const featureSet = document.createElement('fieldset');
    featureSet.innerHTML = '<legend><span>02</span> What would help your customers?</legend>';
    const featureOptions = document.createElement('div'); featureOptions.className = 'me-feature-options';
    for (const [value, feature] of Object.entries(featureInfo)) {
      const label = document.createElement('label');
      const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.name = 'features'; checkbox.value = value;
      const text = document.createElement('span'); text.textContent = feature.label;
      label.append(checkbox, text); featureOptions.append(label);
    }
    featureSet.append(featureOptions);
    const privacy = document.createElement('p'); privacy.className = 'me-planner-privacy';
    privacy.textContent = 'Your choices stay in this browser until you choose to share the brief. No account needed.';
    form.append(goalSet, businessLabel, business, featureSet, privacy);

    const result = document.createElement('aside'); result.className = 'me-planner-result'; result.setAttribute('aria-label', 'Your project direction');
    const resultLabel = document.createElement('span'); resultLabel.className = 'me-result-label'; resultLabel.textContent = 'YOUR PROJECT DIRECTION';
    const title = document.createElement('h3'); title.setAttribute('aria-live', 'polite'); title.setAttribute('aria-atomic', 'true');
    const price = document.createElement('p'); price.className = 'me-result-price';
    const summary = document.createElement('p'); summary.className = 'me-result-summary';
    const reason = document.createElement('p'); reason.className = 'me-result-reason';
    const featureSummary = document.createElement('div'); featureSummary.className = 'me-selected-features';
    const scope = document.createElement('p'); scope.className = 'me-scope-note';
    const details = document.createElement('details'); details.className = 'me-planner-details';
    const detailsSummary = document.createElement('summary'); detailsSummary.textContent = 'What should we plan for?';
    const recommendations = document.createElement('ul'); details.append(detailsSummary, recommendations);
    const actions = document.createElement('div'); actions.className = 'me-planner-actions';
    const whatsapp = document.createElement('a'); whatsapp.className = 'me-plan-whatsapp'; whatsapp.target = '_blank'; whatsapp.rel = 'noopener noreferrer'; whatsapp.textContent = 'Discuss this brief on WhatsApp ↗';
    const download = document.createElement('button'); download.type = 'button'; download.className = 'me-plan-download'; download.textContent = 'Download my brief ↓';
    actions.append(whatsapp, download);
    const actionNote = document.createElement('p'); actionNote.className = 'me-result-footnote'; actionNote.textContent = 'WhatsApp opens a draft for you to review and send. This is a guide, not a final quotation.';
    result.append(resultLabel, title, price, summary, reason, featureSummary, scope, details, actions, actionNote);
    layout.append(form, result); host.append(heading, layout);
    let current;
    function update() {
      const data = new FormData(form);
      current = recommend({ goal: data.get('goal'), business: data.get('business'), features: data.getAll('features') });
      title.textContent = current.tier;
      price.textContent = current.price ? `${current.starting?'Starting from ':''}${current.price} / ${current.starting?'final scope quoted':'published launch package'}` : 'Let’s scope it together';
      summary.textContent = current.summary; reason.textContent = current.reason;
      featureSummary.replaceChildren();
      current.features.forEach(text => { const tag = document.createElement('span'); tag.textContent = text; featureSummary.append(tag); });
      featureSummary.hidden = !current.features.length;
      scope.textContent = current.price
        ? 'Selected extra features are quoted separately. The displayed package price is not a total including your selections.'
        : 'Functionality, third-party fees, delivery and support are quoted after we understand your requirements.';
      recommendations.replaceChildren();
      current.advice.forEach(text => { const li = document.createElement('li'); li.textContent = text; recommendations.append(li); });
      whatsapp.href = `https://wa.me/919961699196?text=${encodeURIComponent(current.brief)}`;
    }
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('change', update); business.addEventListener('input', update);
    download.addEventListener('click', () => {
      const blob = new Blob([`MAX EFEX GRAPHICS — PROJECT BRIEF\n\n${current.brief}\n\nPrepared with the MAX EFEX project planner.\nContact: maxefexgraphics@gmail.com | +91 99616 99196\n`], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'maxefex-project-brief.txt'; document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    update();
  }
  globalThis.MaxefexPlanner = Object.freeze({ recommend });
  if (typeof document !== 'undefined') {
    const start = () => document.querySelectorAll('[data-project-planner]').forEach(initialise);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
  }
})();
