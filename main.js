/* West Campus FRC — shared script. Each block only runs if its elements exist on the page. */

// ---------- Mobile nav ----------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ---------- Scroll reveal ----------
function attachReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
}
attachReveal();

// ---------- Build-process timeline bars ----------
(function () {
  const tl = document.querySelector('.timeline');
  if (!tl) return;
  const steps = tl.querySelectorAll('.t-step');
  const run = (step) => {
    const target = parseInt(step.dataset.percent, 10) || 0;
    const bar = step.querySelector('.bar > div');
    const label = step.querySelector('.t-pct');
    bar.style.width = target + '%';
    const start = performance.now(), dur = 900;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      label.textContent = Math.round(p * target) + '%';
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) { steps.forEach(run); io.disconnect(); }
  }, { threshold: 0.3 });
  io.observe(tl);
})();

// ---------- Modal helper ----------
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
function openModal(html) {
  if (!modal) return;
  modalContent.innerHTML = html;
  modal.classList.add('open');
}
function closeModal() { if (modal) modal.classList.remove('open'); }
if (modal) {
  modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('.modal-close')) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// ---------- Officers ----------
const OFFICERS = [
  { name: 'Cody Yin', role: 'Team President', initials: 'CY',
    bio: 'I lead all members by setting goals, organizing meetings, and coordinating teamwork across mechanical, programming, outreach, and media subteams. I oversee major decision-making, competition planning, and build-season timelines to keep the team focused and productive. I communicate with mentors, sponsors, and school administrators to maintain strong partnerships and secure resources. I motivate members by building a positive team culture built on accountability, collaboration, and learning.' },
  { name: 'Owen Kay', role: 'Vice President', initials: 'OK',
    bio: 'As Vice President of West Campus FRC, I facilitate club meetings and build days, coordinate with competition and school faculty, and delegate important tasks to the officer team. Along with our club advisor, we have managed to fund, recruit, and train a dedicated team of students who are excited to make their mark on West Campus history.' },
  { name: 'Daniel Gonzalez-Sanders', role: 'Mechanics', initials: 'DG',
    bio: 'I design, build, and assemble major components of our competition robot, including the drivetrain, intake systems, and structural framing. I work directly from CAD models and engineering plans to fabricate accurate, durable parts using hand tools and shop machinery. I collaborate closely with programmers and electrical members to ensure mechanical systems integrate smoothly with software controls and sensors.' },
  { name: 'Jordan Bailey', role: 'Lead Programmer', initials: 'JB',
    bio: 'I develop and manage the robot\u2019s control software using Java to operate drivetrains, sensors, and autonomous routines. I design autonomous paths, implement vision tracking, and fine-tune control algorithms for accuracy and efficiency. I also mentor newer programmers by teaching coding fundamentals and best debugging practices.' },
  { name: 'Timothy Shen', role: 'Vision Team Lead', initials: 'TS',
    bio: 'I develop and implement computer vision algorithms to enable the robot to detect and track objects on the field using cameras and sensors. I work closely with programmers to integrate vision processing into autonomous routines for tasks like target alignment and object recognition.' },
  { name: 'Emily Nguyen', role: 'Social Media Manager', initials: 'EN',
    bio: 'I create and manage content for our team\u2019s online platforms to showcase competitions, builds, fundraising efforts, and community events. I design graphics, write captions, edit videos, and schedule posts, and I maintain consistent branding across platforms to build team recognition and professionalism.' },
  { name: 'Kai Bzoskie', role: 'Community Outreach Coordinator', initials: 'KB',
    bio: 'I organize events that connect our team with schools, nonprofits, sponsors, and local organizations. I plan STEM workshops, team demonstrations, volunteer activities, and fundraising initiatives that promote robotics education.' },
  { name: 'Oliver Hsu', role: 'Treasurer', initials: 'OH',
    bio: 'I manage the team\u2019s budget by tracking expenses, organizing reimbursements, and monitoring funding for parts, travel, and competition fees. I maintain financial records to ensure transparency and accountability, and work with sponsors and administrators to manage donations and purchasing approvals.' },
  { name: 'Thach Ngu', role: 'Web Developer', initials: 'TN',
    bio: 'I design, build, and maintain our team website using HTML, CSS, and JavaScript to showcase projects, outreach, and competition updates. I focus on responsive layouts and clean user experiences that make information easy to access for team members, sponsors, and judges.' }
];
const officerGrid = document.getElementById('officer-grid');
if (officerGrid) {
  OFFICERS.forEach((o, i) => {
    const b = document.createElement('button');
    b.className = 'officer reveal';
    b.type = 'button';
    b.innerHTML = `
      <div class="ph r-1x1">${o.initials}</div>
      <div class="officer-info"><h3>${o.name}</h3><span>${o.role}</span></div>`;
    b.addEventListener('click', () => openModal(`
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-top">
        <div class="ph r-1x1">${o.initials}</div>
        <div><h3>${o.name}</h3><div class="modal-role">${o.role}</div></div>
      </div>
      <p>${o.bio}</p>`));
    officerGrid.appendChild(b);
  });
  attachReveal();
}

// ---------- Projects ----------
const PROJECTS = [
  { title: 'Robot Code', tag: 'Programming', members: ['Daniel', 'Owen', 'Kai'], desc: 'The essential code required to control the robot in competition.' },
  { title: 'Vision Tracking', tag: 'Programming', members: ['Emily', 'Jordan'], desc: 'AI-powered AprilTag detection feeding real-time pose estimates into autonomous path planning.' },
  { title: 'Shooter Prototype', tag: 'Mechanical', members: ['Cody', 'Daniel'], desc: 'Spin-up wheel shooter with adjustable hood for high-accuracy scoring at varying distances.' },
  { title: 'Electrical Board', tag: 'Electrical', members: ['Kai', 'Emily'], desc: 'Reworking power routing, CAN loops, and labeling so repairs between matches take minutes, not hours.' },
  { title: 'CAD Kitbot', tag: 'Mechanical', members: ['Owen', 'Cody'], desc: 'Full parametric CAD assembly of the base chassis so new members can learn from a clean model.' },
  { title: 'Intake Arm', tag: 'Mechanical', members: ['Daniel', 'Jordan'], desc: 'Deployable intake tuned for fast floor pickup without compromising frame perimeter rules.' }
];
const projectGrid = document.getElementById('project-grid');
if (projectGrid) {
  PROJECTS.forEach(p => {
    const b = document.createElement('button');
    b.className = 'project reveal';
    b.type = 'button';
    b.innerHTML = `
      <div class="ph r-4x3">${p.title} photo</div>
      <div class="project-body"><span class="tag">${p.tag}</span><h3>${p.title}</h3><p>${p.desc}</p></div>`;
    b.addEventListener('click', () => openModal(`
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="ph r-16x9 wide">${p.title} photo</div>
      <span class="tag">${p.tag}</span>
      <h3 style="font-size:2.4rem">${p.title}</h3>
      <p style="margin-top:.8rem">${p.desc}</p>
      <div class="chips">${p.members.map(m => `<span>${m}</span>`).join('')}</div>`));
    projectGrid.appendChild(b);
  });
  attachReveal();
}

// ---------- Sponsors ----------
const SPONSORS = [
  { id: 1, name: 'NovaTech Industries', tier: 'Platinum', accent: '#b57bd1', amount: '$50,000', since: '2021', website: 'novatech.example', details: 'Supporting AI research and innovation initiatives across our engineering programs, funding lab equipment and competition travel.' },
  { id: 2, name: 'Orion Labs', tier: 'Platinum', accent: '#b57bd1', amount: '$35,000', since: '2022', website: 'orionlabs.example', details: 'Dedicated to empowering student robotics teams with hardware grants and mentorship from professional engineers.' },
  { id: 3, name: 'Synthex', tier: 'Gold', accent: '#d4a017', amount: '$18,000', since: '2023', website: 'synthex.example', details: 'Funding workshops on synthetic data and machine learning pipelines for our software subteam.' },
  { id: 4, name: 'DataForge', tier: 'Gold', accent: '#d4a017', amount: '$12,500', since: '2023', website: 'dataforge.example', details: 'Providing cloud credits and data infrastructure for competition simulations and autonomous routine testing.' },
  { id: 5, name: 'IronCore Mfg.', tier: 'Silver', accent: '#9aa1ab', amount: '$8,000', since: '2024', website: 'ironcore.example', details: 'Donating precision-machined parts and sponsoring hands-on manufacturing education for our mechanical subteam.' },
  { id: 6, name: 'Volt Systems', tier: 'Silver', accent: '#9aa1ab', amount: '$6,200', since: '2024', website: 'voltsys.example', details: 'Providing electrical components, batteries, and power systems \u2014 keeping our robot powered through every match.' },
  { id: 7, name: 'Crestwood Tools', tier: 'Bronze', accent: '#c98a4b', amount: '$3,000', since: '2024', website: 'crestwoodtools.example', details: 'Supplying hand tools and shop equipment for our build space, directly improving our fabrication capability.' },
  { id: 8, name: 'Pacific Print Co.', tier: 'Bronze', accent: '#c98a4b', amount: '$1,500', since: '2025', website: 'pacificprint.example', details: 'Sponsoring all team apparel, banners, pit display materials, and printed outreach content.' }
];
const sponsorGrid = document.getElementById('sponsor-grid');
if (sponsorGrid) {
  const order = { Diamond: 0, Platinum: 1, Gold: 2, Silver: 3, Bronze: 4 };
  const sorted = [...SPONSORS].sort((a, b) => order[a.tier] - order[b.tier]);
  const build = (tier = 'all') => {
    sponsorGrid.innerHTML = '';
    const list = sorted.filter(s => tier === 'all' || s.tier === tier);
    if (!list.length) {
      sponsorGrid.innerHTML = `<p class="note">No ${tier} sponsors yet \u2014 want to be the first?</p>`;
      return;
    }
    list.forEach(s => {
      const c = document.createElement('div');
      c.className = 'sponsor reveal';
      c.style.setProperty('--accent', s.accent);
      c.innerHTML = `
        <div class="badge">${s.tier}</div>
        <div class="ph r-1x1">Logo</div>
        <h3>${s.name}</h3>
        <div class="site">${s.website}</div>
        <div class="sponsor-more">
          <hr>
          <div class="sponsor-stats">
            <div><small>Donated</small><b>${s.amount}</b></div>
            <div><small>Partner since</small><b class="n">${s.since}</b></div>
          </div>
          <p>${s.details}</p>
        </div>`;
      c.addEventListener('click', () => {
        const was = c.classList.contains('open');
        sponsorGrid.querySelectorAll('.sponsor').forEach(x => x.classList.remove('open'));
        if (!was) c.classList.add('open');
      });
      sponsorGrid.appendChild(c);
    });
    attachReveal();
  };
  build();
  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    build(t.dataset.tier);
  }));
}

// ---------- Contact form ----------
const form = document.getElementById('contact-form');
if (form) {
  const msg = document.getElementById('form-msg');
  const btn = form.querySelector('button[type="submit"]');
  const label = btn.textContent;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.style.display = 'none';
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch('https://formsubmit.co/wchsfrc@gmail.com', { method: 'POST', body: new FormData(form) })
      .then(() => {
        msg.style.color = '#22c55e';
        msg.textContent = "Thanks for contacting West Campus Robotics! We'll reply within 48 hours.";
        msg.style.display = 'block';
        form.reset();
      })
      .catch(() => {
        msg.style.color = '#ef4444';
        msg.textContent = 'Something went wrong. Please try again later.';
        msg.style.display = 'block';
      })
      .finally(() => { btn.disabled = false; btn.textContent = label; });
  });
}
