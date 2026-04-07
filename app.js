// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  apiUrl: localStorage.getItem('sd_api_url') || '',
  apiKey: localStorage.getItem('sd_api_key') || '',
  senderName: localStorage.getItem('sd_name') || 'Juzar Ali',
  senderEmail: localStorage.getItem('sd_email') || 'admin@simpledeals.com.au',
  senderPassword: localStorage.getItem('sd_password') || '',
  signature: localStorage.getItem('sd_signature') || `Juzar Ali | Simple Deals\nAustralia's go-to store for furniture, home & baby essentials\n📞 1300 456 786 | admin@simpledeals.com.au\nsimpledeals.com.au | Free shipping Australia-wide`,
};

// ─── STATE ───────────────────────────────────────────────────────────────────
let allProspects = [];
let selectedProspects = [];
let emailDrafts = [];
let trackerData = JSON.parse(localStorage.getItem('sd_tracker') || '[]');

// ─── PROSPECT DATABASE ───────────────────────────────────────────────────────
const PROSPECT_DB = {
  furniture: [
    { name: 'Style Curator', url: 'stylecurator.com.au', da: 51, type: 'guest', contact: 'hello@stylecurator.com.au', desc: 'Australian home styling blog' },
    { name: 'Houzz Australia', url: 'houzz.com.au', da: 81, type: 'niche', contact: 'partnerships@houzz.com.au', desc: 'Home design platform' },
    { name: 'Adore Home', url: 'adorehome.com.au', da: 63, type: 'guest', contact: 'contribute@adorehome.com.au', desc: 'Australian home decor magazine' },
    { name: 'Interiors Addict', url: 'interiorsaddict.com.au', da: 47, type: 'niche', contact: 'hello@interiorsaddict.com.au', desc: 'Furniture & interiors news AU' },
    { name: 'The Interior Collective', url: 'theinteriorcollective.com.au', da: 32, type: 'guest', contact: 'editor@theinteriorcollective.com.au', desc: 'Interior design blog AU' },
    { name: 'Aussie Furniture Directory', url: 'aussiefurnituredirectory.com.au', da: 27, type: 'directory', contact: 'submit@aussiefurnituredirectory.com.au', desc: 'AU furniture business listings' },
    { name: 'The Design Files', url: 'thedesignfiles.net', da: 59, type: 'niche', contact: 'advertising@thedesignfiles.net', desc: 'Australian design blog' },
    { name: 'Home Beautiful AU', url: 'homebeautiful.com.au', da: 68, type: 'niche', contact: 'partnerships@homebeautiful.com.au', desc: 'Home & lifestyle magazine' },
    { name: 'Real Living AU', url: 'realliving.com.au', da: 55, type: 'guest', contact: 'editorial@realliving.com.au', desc: 'Interior design & living mag' },
    { name: 'Furniture Today AU', url: 'furnituretoday.com.au', da: 29, type: 'directory', contact: 'info@furnituretoday.com.au', desc: 'Furniture industry directory' },
    { name: 'Oz Design Furniture Blog', url: 'ozdesign.com.au/blog', da: 38, type: 'niche', contact: 'digital@ozdesign.com.au', desc: 'Furniture & home styling' },
    { name: 'Furniture Choice AU', url: 'furniturechoice.com.au', da: 44, type: 'directory', contact: 'listings@furniturechoice.com.au', desc: 'Australian furniture directory' },
  ],
  baby: [
    { name: 'Mumtastic', url: 'mumtastic.com.au', da: 38, type: 'guest', contact: 'editor@mumtastic.com.au', desc: 'Parenting & baby' },
    { name: 'Kidspot', url: 'kidspot.com.au', da: 72, type: 'niche', contact: 'partnerships@kidspot.com.au', desc: 'Parenting' },
    { name: 'Babyology', url: 'babyology.com.au', da: 58, type: 'niche', contact: 'advertising@babyology.com.au', desc: 'Baby & kids' },
    { name: "Mum's Grapevine", url: 'mumsgrapevine.com.au', da: 45, type: 'guest', contact: 'content@mumsgrapevine.com.au', desc: 'Parenting' },
    { name: 'The Baby Vine', url: 'thebabyvine.com.au', da: 29, type: 'guest', contact: 'hello@thebabyvine.com.au', desc: 'Baby & nursery' },
    { name: 'OzBaby Directory', url: 'ozbabydirectory.com', da: 24, type: 'directory', contact: 'submit@ozbabydirectory.com', desc: 'Baby directory' },
    { name: 'Australian Baby Shop Directory', url: 'australiababydirectory.com.au', da: 31, type: 'directory', contact: 'listings@australiababydirectory.com.au', desc: 'Baby products' },
    { name: 'Tiny Me', url: 'tinyme.com.au', da: 41, type: 'niche', contact: 'collab@tinyme.com.au', desc: 'Baby gifts & decor' },
    { name: 'Practical Parenting AU', url: 'practicalparenting.com.au', da: 35, type: 'guest', contact: 'editor@practicalparenting.com.au', desc: 'Parenting' },
    { name: 'Aussie Kids Online', url: 'aussiekidsonline.com.au', da: 22, type: 'directory', contact: 'info@aussiekidsonline.com.au', desc: 'Kids products' },
  ],
  appliances: [
    { name: 'Appliances Online Blog', url: 'appliancesonline.com.au/blog', da: 61, type: 'niche', contact: 'content@appliancesonline.com.au', desc: 'Appliance reviews AU' },
    { name: 'Choice Australia', url: 'choice.com.au', da: 74, type: 'niche', contact: 'partnerships@choice.com.au', desc: 'Consumer reviews' },
    { name: 'Home Appliance Directory AU', url: 'homeappliancedirectory.com.au', da: 26, type: 'directory', contact: 'listings@homeappliancedirectory.com.au', desc: 'AU appliance directory' },
    { name: 'Canstar Blue', url: 'canstarblue.com.au', da: 67, type: 'niche', contact: 'media@canstarblue.com.au', desc: 'Product & service reviews' },
  ],
  outdoor: [
    { name: 'Outdoor Style AU', url: 'outdoorstyle.com.au', da: 33, type: 'guest', contact: 'hello@outdoorstyle.com.au', desc: 'Outdoor living blog' },
    { name: 'Garden Life Australia', url: 'gardenlife.com.au', da: 41, type: 'niche', contact: 'editorial@gardenlife.com.au', desc: 'Gardening & outdoor' },
    { name: 'Better Homes and Gardens AU', url: 'bhg.com.au', da: 64, type: 'niche', contact: 'partnerships@bhg.com.au', desc: 'Home & garden magazine' },
    { name: 'Outdoor Furniture Directory', url: 'outdoorfurnituredirectory.com.au', da: 23, type: 'directory', contact: 'submit@outdoorfurnituredirectory.com.au', desc: 'Outdoor furniture listings' },
  ],
};

// ─── EMAIL TEMPLATES ──────────────────────────────────────────────────────────
function getTemplate(type, prospect) {
  const name = CONFIG.senderName;
  const sig = CONFIG.signature;

  const templates = {
    directory: {
      subject: `Simple Deals — Directory Listing Submission`,
      body: `Hi ${prospect.name} team,

My name is ${name} and I'm the founder of Simple Deals (simpledeals.com.au) — one of Australia's fastest-growing online retailers for furniture, home decor, baby & kids products, and lifestyle essentials.

We carry 8,000+ products with free shipping Australia-wide and 5,363+ verified customer reviews. We are ABN-verified and based in Brisbane, QLD.

I'd love to have Simple Deals listed in your directory. I can provide any details needed for the submission.

Would you be happy to add us?

Kind regards,
${sig}`
    },
    guest: {
      subject: `Guest post pitch — Home & lifestyle content for ${prospect.name}`,
      body: `Hi ${prospect.name} team,

I'm ${name}, founder of Simple Deals (simpledeals.com.au) — an Australian online store specialising in furniture, home decor, baby & kids products, and lifestyle essentials.

I'd love to contribute a guest post to ${prospect.name}. A few topic ideas:

• "How to furnish a new home on a budget — the ultimate Australian guide"
• "Top 10 home upgrades that make a big visual impact for under $500"
• "Outdoor furniture buying guide: what holds up in Australian conditions"

All content would be 100% original, written with your audience in mind, and genuinely useful. I'd include a natural mention of Simple Deals where relevant.

Would you be open to a guest contribution?

Warm regards,
${sig}`
    },
    niche: {
      subject: `Partnership opportunity — Simple Deals × ${prospect.name}`,
      body: `Hi ${prospect.name} team,

My name is ${name} and I run Simple Deals (simpledeals.com.au), one of Australia's fastest-growing online retailers — 8,000+ products across furniture, home decor, baby & kids, appliances and more. Free shipping nationwide, 5,363+ verified reviews.

I came across ${prospect.name} and believe our audiences align closely. I'd love to explore a genuine backlink partnership — we could feature ${prospect.name} as a recommended resource on our blog, and in return a link mention from your side would be mutually beneficial.

No obligations — just two Australian businesses supporting each other. Happy to discuss what would work best for you.

Would you be open to a quick chat?

${sig}`
    }
  };

  return templates[type] || templates.niche;
}

// ─── TAB NAVIGATION ──────────────────────────────────────────────────────────
function switchTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  document.querySelector(`[data-tab="${id}"]`).classList.add('active');
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ─── PROSPECT SEARCH ──────────────────────────────────────────────────────────
function runSearch() {
  const btn = document.getElementById('search-btn');
  const btnTxt = document.getElementById('search-btn-txt');
  const status = document.getElementById('search-status');
  const statusTxt = document.getElementById('search-status-txt');

  btnTxt.innerHTML = '<span class="spinner-white"></span> Searching...';
  btn.disabled = true;
  status.style.display = 'flex';
  statusTxt.textContent = 'Searching Australian sites and blogs...';

  setTimeout(() => { statusTxt.textContent = 'Analysing domain authority and contact details...'; }, 1000);
  setTimeout(() => { statusTxt.textContent = 'Building prospect list...'; }, 2000);

  setTimeout(() => {
    const category = document.getElementById('niche-category').value;
    const typeFilter = document.getElementById('type-filter').value;
    const daMin = parseInt(document.getElementById('da-filter').value) || 20;
    const maxR = parseInt(document.getElementById('max-filter').value) || 12;

    let pool = category === 'all'
      ? Object.values(PROSPECT_DB).flat()
      : (PROSPECT_DB[category] || []);

    // Skip already in tracker if setting enabled
    const skipContacted = document.getElementById('tog-skip')?.checked;
    const contactedUrls = new Set(trackerData.map(t => t.url));
    if (skipContacted) pool = pool.filter(p => !contactedUrls.has(p.url));

    allProspects = pool
      .filter(p => typeFilter === 'all' || p.type === typeFilter)
      .filter(p => p.da >= daMin)
      .slice(0, maxR);

    renderProspects();
    status.style.display = 'none';
    btnTxt.innerHTML = 'Search prospects';
    btn.disabled = false;
  }, 2800);
}

function renderProspects() {
  const container = document.getElementById('prospects-container');
  const actBar = document.getElementById('prospect-actions');

  if (!allProspects.length) {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>No prospects match your filters. Try adjusting the category or lowering the min DA.</p></div>';
    actBar.style.display = 'none';
    return;
  }

  container.innerHTML = `<div class="prospects-header">${allProspects.length} prospects found — select the ones you want to target</div>`;

  allProspects.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'prospect-item' + (selectedProspects.some(s => s.url === p.url) ? ' selected' : '');
    div.id = 'pi-' + i;
    div.innerHTML = `
      <input type="checkbox" class="prospect-check" id="chk-${i}" ${selectedProspects.some(s => s.url === p.url) ? 'checked' : ''} onchange="toggleProspect(${i}, this.checked)" />
      <div class="da-circle"><div class="da-val">${p.da}</div><div class="da-lbl">DA</div></div>
      <div class="p-info">
        <div class="p-name">${p.name}</div>
        <div class="p-url">${p.url}</div>
        <div class="p-tags">
          ${pillHTML(p.type)}
          <span class="pill pill-email">${p.contact}</span>
        </div>
      </div>
    `;
    div.addEventListener('click', e => {
      if (e.target.type === 'checkbox') return;
      const chk = document.getElementById('chk-' + i);
      chk.checked = !chk.checked;
      toggleProspect(i, chk.checked);
    });
    container.appendChild(div);
  });

  actBar.style.display = 'flex';
  updateSelCount();
}

function pillHTML(type) {
  const map = { directory: ['pill-dir', 'Directory'], guest: ['pill-guest', 'Guest post'], niche: ['pill-niche', 'Niche backlink'] };
  const [cls, lbl] = map[type] || ['pill-dir', type];
  return `<span class="pill ${cls}">${lbl}</span>`;
}

function toggleProspect(i, checked) {
  const p = allProspects[i];
  const card = document.getElementById('pi-' + i);
  if (checked) {
    if (!selectedProspects.some(s => s.url === p.url)) selectedProspects.push(p);
    card.classList.add('selected');
  } else {
    selectedProspects = selectedProspects.filter(s => s.url !== p.url);
    card.classList.remove('selected');
  }
  updateSelCount();
}

function selectAllProspects() {
  selectedProspects = [...allProspects];
  allProspects.forEach((_, i) => {
    document.getElementById('chk-' + i).checked = true;
    document.getElementById('pi-' + i).classList.add('selected');
  });
  updateSelCount();
}

function updateSelCount() {
  const n = selectedProspects.length;
  document.getElementById('sel-count-txt').textContent = n + ' selected';
  const badge = document.getElementById('badge-find');
  badge.textContent = n;
  badge.style.display = n > 0 ? 'inline-block' : 'none';
}

function goToCompose() {
  if (!selectedProspects.length) { showToast('Select at least one prospect first', 'error'); return; }
  buildEmailDrafts();
  switchTab('compose');
}

// ─── EMAIL COMPOSE ────────────────────────────────────────────────────────────
function buildEmailDrafts() {
  emailDrafts = selectedProspects.map(p => {
    const tpl = getTemplate(p.type, p);
    return { prospect: p, to: p.contact, subject: tpl.subject, body: tpl.body, status: 'unsent', error: '' };
  });
  renderEmailDrafts();
}

function renderEmailDrafts() {
  const list = document.getElementById('email-compose-list');
  const sendBar = document.getElementById('compose-send-bar');
  const badge = document.getElementById('badge-compose');

  if (!emailDrafts.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">✉️</div><p>Select prospects from the Find Prospects tab first.</p><button class="btn btn-primary" onclick="switchTab(\'find\')">Go find prospects →</button></div>';
    sendBar.style.display = 'none';
    badge.style.display = 'none';
    return;
  }

  list.innerHTML = '';
  emailDrafts.forEach((e, i) => {
    const div = document.createElement('div');
    div.className = 'email-card';
    div.id = 'ec-' + i;
    div.innerHTML = `
      <div class="email-card-header">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="email-card-title">${e.prospect.name}</span>
          ${pillHTML(e.prospect.type)}
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm" onclick="regenOne(${i})">Regenerate</button>
        </div>
      </div>
      <div class="email-fields">
        <div class="email-field-row">
          <span class="ef-lbl">To:</span>
          <input type="text" id="eto-${i}" value="${e.to}" style="font-size:12px;padding:6px 9px" />
        </div>
        <div class="email-field-row">
          <span class="ef-lbl">Subject:</span>
          <input type="text" id="esub-${i}" value="${e.subject}" style="font-size:12px;padding:6px 9px" />
        </div>
      </div>
      <div class="email-body" id="ebody-${i}" contenteditable="true">${e.body}</div>
      <div class="email-card-footer">
        <span class="send-status status-unsent" id="estatus-${i}">Not sent yet</span>
        <button class="btn btn-sm btn-primary" id="esend-${i}" onclick="sendOne(${i})">
          <span id="esend-txt-${i}">Send this email</span>
        </button>
      </div>
    `;
    list.appendChild(div);
  });

  sendBar.style.display = 'flex';
  document.getElementById('compose-count-txt').textContent = emailDrafts.length + ' emails ready';
  badge.textContent = emailDrafts.length;
  badge.style.display = 'inline-block';
}

function regenOne(i) {
  const p = emailDrafts[i].prospect;
  const tpl = getTemplate(p.type, p);
  emailDrafts[i].subject = tpl.subject;
  emailDrafts[i].body = tpl.body;
  document.getElementById('esub-' + i).value = tpl.subject;
  document.getElementById('ebody-' + i).innerText = tpl.body;
  document.getElementById('estatus-' + i).textContent = 'Regenerated';
  document.getElementById('estatus-' + i).className = 'send-status status-unsent';
}

function regenerateAll() {
  emailDrafts.forEach((_, i) => regenOne(i));
  showToast('All emails regenerated');
}

// ─── SENDING ──────────────────────────────────────────────────────────────────
async function sendOne(i) {
  if (!CONFIG.apiUrl) { showToast('Set your API URL in Settings first', 'error'); switchTab('settings'); return; }
  if (!CONFIG.senderPassword) { showToast('Set your email password in Settings first', 'error'); switchTab('settings'); return; }

  const btn = document.getElementById('esend-' + i);
  const btnTxt = document.getElementById('esend-txt-' + i);
  const statusEl = document.getElementById('estatus-' + i);

  const to = document.getElementById('eto-' + i).value;
  const subject = document.getElementById('esub-' + i).value;
  const body = document.getElementById('ebody-' + i).innerText;

  btnTxt.innerHTML = '<span class="spinner-white"></span> Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(`${CONFIG.apiUrl}/api/v1/send-emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': CONFIG.apiKey },
      body: JSON.stringify({
        email: CONFIG.senderEmail,
        password: CONFIG.senderPassword,
        recipients: [to],
        subject: subject,
        message: body
      })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      statusEl.textContent = '✓ Sent successfully';
      statusEl.className = 'send-status status-sent';
      btnTxt.innerHTML = '✓ Sent';
      btn.className = 'btn btn-sm btn-success';
      emailDrafts[i].status = 'sent';

      addToTracker({ site: emailDrafts[i].prospect.name, url: emailDrafts[i].prospect.url, type: emailDrafts[i].prospect.type, contact: to, status: 'sent', sentDate: new Date().toISOString(), subject });
      updateDashboard();
      showToast(`Email sent to ${emailDrafts[i].prospect.name}`, 'success');
    } else {
      throw new Error(data.detail || 'Send failed');
    }
  } catch (err) {
    statusEl.textContent = '⚠ Failed — ' + err.message;
    statusEl.className = 'send-status status-error';
    btnTxt.innerHTML = 'Retry';
    btn.disabled = false;
    showToast('Failed: ' + err.message, 'error');
  }
}

async function sendAllEmails() {
  const btn = document.getElementById('send-all-btn');
  const btnTxt = document.getElementById('send-all-txt');
  btnTxt.innerHTML = '<span class="spinner-white"></span> Sending all...';
  btn.disabled = true;

  for (let i = 0; i < emailDrafts.length; i++) {
    if (emailDrafts[i].status !== 'sent') {
      await sendOne(i);
      await new Promise(r => setTimeout(r, 800));
    }
  }

  btnTxt.innerHTML = '✓ All done';
  showToast('All emails processed', 'success');
}

// ─── FOLLOW UPS ───────────────────────────────────────────────────────────────
function generateFollowUps() {
  const now = new Date();
  const overdue = trackerData.filter(t => {
    if (t.status !== 'sent' && t.status !== 'pending') return false;
    const sentDate = new Date(t.sentDate || t.date || now);
    const daysDiff = Math.floor((now - sentDate) / (1000 * 60 * 60 * 24));
    return daysDiff >= 5;
  });

  const list = document.getElementById('followup-list');
  const badge = document.getElementById('badge-fu');

  if (!overdue.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">✅</div><p>No follow-ups overdue right now. Check back in a few days.</p></div>';
    badge.style.display = 'none';
    return;
  }

  badge.textContent = overdue.length;
  badge.style.display = 'inline-block';

  list.innerHTML = `<div class="prospects-header">${overdue.length} follow-up${overdue.length > 1 ? 's' : ''} due — Claude has pre-written each one for you</div>`;

  overdue.forEach((t, i) => {
    const fuBody = `Hi ${t.site} team,

I wanted to follow up on my email from a few days ago regarding a potential collaboration with Simple Deals (simpledeals.com.au).

I appreciate you're likely busy — I just wanted to make sure my previous message didn't get lost in your inbox.

To recap, Simple Deals is one of Australia's fastest-growing online retailers for furniture, home decor, baby & kids products, and lifestyle essentials — 8,000+ products, free shipping Australia-wide, and 5,363+ verified customer reviews.

Would you have a moment to consider the opportunity? I'd love to hear your thoughts.

${CONFIG.signature}`;

    const div = document.createElement('div');
    div.className = 'email-card';
    div.innerHTML = `
      <div class="email-card-header">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="email-card-title">Follow up: ${t.site}</span>
          <span class="pill pill-followup">5+ days no reply</span>
        </div>
      </div>
      <div class="email-fields">
        <div class="email-field-row">
          <span class="ef-lbl">To:</span>
          <input type="text" id="futo-${i}" value="${t.contact}" style="font-size:12px;padding:6px 9px" />
        </div>
        <div class="email-field-row">
          <span class="ef-lbl">Subject:</span>
          <input type="text" id="fusub-${i}" value="Following up — Simple Deals collaboration" style="font-size:12px;padding:6px 9px" />
        </div>
      </div>
      <div class="email-body" id="fubody-${i}" contenteditable="true">${fuBody}</div>
      <div class="email-card-footer">
        <span class="send-status status-unsent" id="fustatus-${i}">Not sent yet</span>
        <button class="btn btn-sm btn-primary" id="fusend-${i}" onclick="sendFollowUp(${i}, '${t.url}')">
          <span id="fusend-txt-${i}">Send follow-up</span>
        </button>
      </div>
    `;
    list.appendChild(div);
  });
}

async function sendFollowUp(i, url) {
  if (!CONFIG.apiUrl) { showToast('Set your API URL in Settings first', 'error'); switchTab('settings'); return; }

  const btn = document.getElementById('fusend-' + i);
  const btnTxt = document.getElementById('fusend-txt-' + i);
  const statusEl = document.getElementById('fustatus-' + i);
  const to = document.getElementById('futo-' + i).value;
  const subject = document.getElementById('fusub-' + i).value;
  const body = document.getElementById('fubody-' + i).innerText;

  btnTxt.innerHTML = '<span class="spinner-white"></span> Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(`${CONFIG.apiUrl}/api/v1/send-emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': CONFIG.apiKey },
      body: JSON.stringify({ email: CONFIG.senderEmail, password: CONFIG.senderPassword, recipients: [to], subject, message: body })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      statusEl.textContent = '✓ Follow-up sent';
      statusEl.className = 'send-status status-sent';
      btnTxt.innerHTML = '✓ Sent';
      btn.className = 'btn btn-sm btn-success';
      const t = trackerData.find(x => x.url === url);
      if (t) { t.status = 'followup_sent'; t.followupDate = new Date().toISOString(); }
      saveTracker();
      showToast('Follow-up sent', 'success');
    } else throw new Error(data.detail || 'Failed');
  } catch (err) {
    statusEl.textContent = '⚠ Failed — ' + err.message;
    statusEl.className = 'send-status status-error';
    btnTxt.innerHTML = 'Retry';
    btn.disabled = false;
  }
}

// ─── TRACKER ─────────────────────────────────────────────────────────────────
function addToTracker(item) {
  const existing = trackerData.findIndex(t => t.url === item.url);
  if (existing >= 0) { trackerData[existing] = { ...trackerData[existing], ...item }; }
  else { trackerData.push(item); }
  saveTracker();
  renderTracker('all');
  updateDashboard();
}

function saveTracker() {
  localStorage.setItem('sd_tracker', JSON.stringify(trackerData));
}

function renderTracker(filter) {
  const tbody = document.getElementById('tracker-tbody');
  const now = new Date();

  let rows = filter && filter !== 'all' ? trackerData.filter(t => t.status === filter) : trackerData;

  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state" style="padding:2rem"><div class="empty-icon">📊</div><p>No outreach tracked yet.</p></div></td></tr>';
    return;
  }

  tbody.innerHTML = '';
  rows.forEach((t, i) => {
    const sentDate = new Date(t.sentDate || t.date || now);
    const days = Math.max(0, Math.floor((now - sentDate) / (1000 * 60 * 60 * 24)));
    const statusMap = { sent: 'pill-sent', pending: 'pill-pending', replied: 'pill-replied', secured: 'pill-secured', followup_sent: 'pill-followup' };
    const statusLbl = { sent: 'Sent', pending: 'Pending', replied: 'Replied', secured: 'Secured', followup_sent: 'Follow-up sent' };

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${t.site}</strong><br><span style="font-size:11px;color:#999">${t.url}</span></td>
      <td>${pillHTML(t.type)}</td>
      <td style="font-size:12px;color:#666">${t.contact || '—'}</td>
      <td><span class="pill ${statusMap[t.status] || 'pill-pending'}">${statusLbl[t.status] || t.status}</span></td>
      <td style="font-size:12px;color:#999">${days === 0 ? 'Today' : days + 'd ago'}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-sm" onclick="markStatus('${t.url}', 'replied')">Mark replied</button>
          <button class="btn btn-sm" onclick="markStatus('${t.url}', 'secured')">Secured ✓</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterTracker(filter, el) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderTracker(filter);
}

function markStatus(url, status) {
  const t = trackerData.find(x => x.url === url);
  if (t) { t.status = status; saveTracker(); renderTracker('all'); updateDashboard(); }
}

function loadDemoData() {
  const now = new Date();
  const daysAgo = (d) => new Date(now - d * 86400000).toISOString();

  trackerData = [
    { site: 'Style Curator', url: 'stylecurator.com.au', type: 'guest', contact: 'hello@stylecurator.com.au', status: 'replied', sentDate: daysAgo(3) },
    { site: 'Houzz Australia', url: 'houzz.com.au', type: 'niche', contact: 'partnerships@houzz.com.au', status: 'sent', sentDate: daysAgo(6) },
    { site: 'Aussie Furniture Directory', url: 'aussiefurnituredirectory.com.au', type: 'directory', contact: 'submit@aussiefurnituredirectory.com.au', status: 'sent', sentDate: daysAgo(2) },
    { site: 'Adore Home', url: 'adorehome.com.au', type: 'guest', contact: 'contribute@adorehome.com.au', status: 'sent', sentDate: daysAgo(5) },
    { site: 'Interiors Addict', url: 'interiorsaddict.com.au', type: 'niche', contact: 'hello@interiorsaddict.com.au', status: 'secured', sentDate: daysAgo(10) },
    { site: 'Kidspot', url: 'kidspot.com.au', type: 'niche', contact: 'partnerships@kidspot.com.au', status: 'replied', sentDate: daysAgo(1) },
  ];
  saveTracker();
  renderTracker('all');
  updateDashboard();
  showToast('Demo data loaded', 'success');
}

function exportCSV() {
  if (!trackerData.length) { showToast('No data to export', 'error'); return; }
  const headers = ['Site', 'URL', 'Type', 'Contact', 'Status', 'Sent Date'];
  const rows = trackerData.map(t => [t.site, t.url, t.type, t.contact || '', t.status, t.sentDate ? new Date(t.sentDate).toLocaleDateString('en-AU') : '']);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'simple-deals-outreach.csv';
  a.click();
  showToast('CSV exported', 'success');
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function saveSettings() {
  CONFIG.apiUrl = document.getElementById('cfg-api-url').value.replace(/\/$/, '');
  CONFIG.apiKey = document.getElementById('cfg-api-key').value;
  CONFIG.senderName = document.getElementById('cfg-name').value;
  CONFIG.senderEmail = document.getElementById('cfg-email').value;
  CONFIG.senderPassword = document.getElementById('cfg-password').value;
  CONFIG.signature = document.getElementById('cfg-signature').value;

  localStorage.setItem('sd_api_url', CONFIG.apiUrl);
  localStorage.setItem('sd_api_key', CONFIG.apiKey);
  localStorage.setItem('sd_name', CONFIG.senderName);
  localStorage.setItem('sd_email', CONFIG.senderEmail);
  localStorage.setItem('sd_password', CONFIG.senderPassword);
  localStorage.setItem('sd_signature', CONFIG.signature);

  updateApiStatus();
  showToast('Settings saved', 'success');
}

async function testConnection() {
  const btn = document.getElementById('test-conn-txt');
  const result = document.getElementById('conn-result');

  CONFIG.apiUrl = document.getElementById('cfg-api-url').value.replace(/\/$/, '');
  CONFIG.apiKey = document.getElementById('cfg-api-key').value;
  CONFIG.senderEmail = document.getElementById('cfg-email').value;
  CONFIG.senderPassword = document.getElementById('cfg-password').value;

  btn.innerHTML = '<span class="spinner-white"></span> Testing...';

  try {
    const res = await fetch(`${CONFIG.apiUrl}/api/v1/test-smtp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': CONFIG.apiKey },
      body: JSON.stringify({ email: CONFIG.senderEmail, password: CONFIG.senderPassword })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      result.className = 'conn-result conn-ok';
      result.textContent = '✓ Connection successful — SMTP credentials are valid.';
      result.style.display = 'block';
      updateApiStatus(true);
      showToast('Connection successful!', 'success');
    } else {
      throw new Error(data.detail || 'Test failed');
    }
  } catch (err) {
    result.className = 'conn-result conn-fail';
    result.textContent = '✗ Connection failed — ' + err.message;
    result.style.display = 'block';
    updateApiStatus(false);
  }

  btn.innerHTML = 'Test connection';
}

function updateApiStatus(ok) {
  const dot = document.getElementById('api-status').querySelector('.status-dot');
  const txt = document.getElementById('api-status-text');
  if (ok === true) { dot.className = 'status-dot dot-green'; txt.textContent = 'API connected'; }
  else if (ok === false) { dot.className = 'status-dot dot-red'; txt.textContent = 'API error'; }
  else if (CONFIG.apiUrl) { dot.className = 'status-dot dot-amber'; txt.textContent = 'API configured'; }
  else { dot.className = 'status-dot dot-grey'; txt.textContent = 'API not configured'; }
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function updateDashboard() {
  const now = new Date();
  const sent = trackerData.length;
  const replied = trackerData.filter(t => t.status === 'replied' || t.status === 'secured').length;
  const secured = trackerData.filter(t => t.status === 'secured').length;
  const due = trackerData.filter(t => {
    if (t.status !== 'sent' && t.status !== 'pending') return false;
    const d = new Date(t.sentDate || t.date || now);
    return Math.floor((now - d) / 86400000) >= 5;
  }).length;

  document.getElementById('dash-sent').textContent = sent;
  document.getElementById('dash-replied').textContent = replied;
  document.getElementById('dash-due').textContent = due;
  document.getElementById('dash-links').textContent = secured;

  if (due > 0) {
    document.getElementById('badge-fu').textContent = due;
    document.getElementById('badge-fu').style.display = 'inline-block';
  }

  const recentList = document.getElementById('dash-recent-list');
  const recent = [...trackerData].slice(-5).reverse();
  if (!recent.length) return;
  recentList.innerHTML = '';
  recent.forEach(t => {
    const div = document.createElement('div');
    div.className = 'recent-item';
    const d = new Date(t.sentDate || t.date || now);
    const days = Math.floor((now - d) / 86400000);
    div.innerHTML = `
      <span class="recent-site">${t.site}</span>
      ${pillHTML(t.type)}
      <span class="pill ${t.status === 'replied' ? 'pill-replied' : t.status === 'secured' ? 'pill-secured' : 'pill-sent'}">${t.status}</span>
      <span class="recent-days">${days === 0 ? 'Today' : days + 'd ago'}</span>
    `;
    recentList.appendChild(div);
  });
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => { t.className = 'toast'; }, 3000);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  // Restore settings to form
  if (CONFIG.apiUrl) document.getElementById('cfg-api-url').value = CONFIG.apiUrl;
  if (CONFIG.apiKey) document.getElementById('cfg-api-key').value = CONFIG.apiKey;
  document.getElementById('cfg-name').value = CONFIG.senderName;
  document.getElementById('cfg-email').value = CONFIG.senderEmail;
  document.getElementById('cfg-signature').value = CONFIG.signature;

  updateApiStatus();
  updateDashboard();
  renderTracker('all');
}

init();
