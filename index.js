// ========== MOBILE NAV TOGGLE ==========
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav when clicking a link (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}


// ========== OFFICER POPUP ==========
const officerPopup = document.getElementById('officer-popup');
const popupName = document.getElementById('officer-popup-name');
const popupRole = document.getElementById('officer-popup-role');
const popupBio = document.getElementById('officer-popup-bio');
const popupImg = document.getElementById('officer-popup-img');
const popupClose = document.getElementById('popup-close');

const officers = document.querySelectorAll('.officer');

// You can adjust these bios/roles as you like
const officersArray = [
  ['danielg', 'Daniel Gonzalez-Sanders', 'Mechanics',
    'I design, build, and assemble major components of our competition robot, including the drivetrain, intake systems, and structural framing. I work directly from CAD models and engineering plans to fabricate accurate, durable parts using hand tools and shop machinery. I collaborate closely with programmers and electrical members to ensure mechanical systems integrate smoothly with software controls and sensors. I also test robot functionality, diagnose mechanical failures, and iterate designs to improve speed, precision, and reliability. Through teamwork and problem-solving, I help translate ideas into a fully functional competitive robot under tight build-season deadlines.',
    'https://via.placeholder.com/400x400'],
  ['emilyn', 'Emily Nguyen', 'Social Media Manager',
    'I create and manage content for our team’s online platforms to showcase competitions, builds, fundraising efforts, and community events. I design graphics, write captions, edit videos, and schedule posts to keep our audience engaged and informed. I maintain consistent branding across platforms to build team recognition and professionalism. I collaborate with subteams to gather updates and translate technical achievements into accessible content. Through social media outreach, I help increase team visibility, attract sponsors, and grow community support.',
    'https://via.placeholder.com/400x400'],
  ['codyy', 'Cody Yin', 'Team President',
    'I lead all members by setting goals, organizing meetings, and coordinating teamwork across mechanical, programming, outreach, and media subteams. I oversee major decision-making, competition planning, and build-season timelines to keep the team focused and productive. I communicate with mentors, sponsors, and school administrators to maintain strong partnerships and secure resources. I motivate members by building a positive team culture built on accountability, collaboration, and learning. Through leadership and organization, I ensure our team operates smoothly while pursuing competitive and educational excellence.',
    'https://via.placeholder.com/400x400'],
  ['jordanb', 'Jordan Bailey', 'Lead Programmer',
    'I develop and manage the robot’s control software using Java to operate drivetrains, sensors, and autonomous routines. I design autonomous paths, implement vision tracking, and fine-tune control algorithms for accuracy and efficiency. I collaborate with the mechanical and electrical subteams to integrate hardware with software systems. I troubleshoot bugs, conduct system testing, and manage version control for the team’s codebase. I also mentor newer programmers by teaching coding fundamentals and best debugging practices.',
    'https://via.placeholder.com/400x400'],
  ['kaib', 'Kai Bzoskie', 'Community Outreach Coordinator',
    'I organize events that connect our team with schools, nonprofits, sponsors, and local organizations. I plan STEM workshops, team demonstrations, volunteer activities, and fundraising initiatives that promote robotics education. I communicate with community partners to build long-term relationships and secure sponsorship opportunities. I coordinate volunteers and logistics to ensure events run smoothly and professionally. Through outreach, I help expand our team’s impact by inspiring students and strengthening public support for STEM programs.',
    'https://via.placeholder.com/400x400'],
  ['owenk', 'Owen Kay', 'Treasurer',
    'I manage the team’s budget by tracking expenses, organizing reimbursements, and monitoring funding for parts, travel, and competition fees. I maintain financial records to ensure transparency and accountability. I work with sponsors, fundraising teams, and school administrators to manage donations and purchasing approvals. I assist in setting financial priorities based on team needs throughout the season. Through responsible money management, I help ensure the team remains financially stable and competition-ready.',
    'https://via.placeholder.com/400x400'],
  ['thachn', 'Thach Ngu', 'Web Developer',
    'I design, build, and maintain our team website using HTML, CSS, and JavaScript to showcase projects, outreach, and competition updates. I focus on creating responsive layouts and clean user experiences that make information easy to access for team members, sponsors, and judges. I collaborate with subteams to translate technical robotics work into clear, visually engaging online content. I manage updates through GitHub, troubleshoot layout and performance issues, and refine features to keep the website reliable and professional. Through encouraging creative input, I help grow technical skills while strengthening our team’s digital presence.',
    'IMG_5117.jpg'],
];


// ========== THEME TOGGLE (LIGHT / DARK) ==========
const themeToggleBtn = document.getElementById('theme-toggle');

// check saved preference or system preference
const savedTheme = localStorage.getItem('wc-theme');
const prefersDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('theme-dark');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    const mode = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    localStorage.setItem('wc-theme', mode);
  });
}

// Turn into a lookup map for quick access
const officerMap = {};
officersArray.forEach(([id, name, role, bio, img]) => {
  officerMap[id] = { name, role, bio, img };
});

function openOfficerPopup(officerId) {
  const data = officerMap[officerId];
  if (!data || !officerPopup) return;

  popupName.textContent = data.name;
  popupRole.textContent = data.role;
  popupBio.textContent = data.bio;
  if (!popupImg.src || popupImg.src.includes("placeholder")) {
    popupImg.src = data.img;   // fallback only
  }

  officerPopup.style = 'opacity: 1; pointer-events: auto;';
}

function closeOfficerPopup() {
  if (officerPopup) {
    officerPopup.style = 'opacity: 0; pointer-events: none;';
  }
}

// Attach click events to officer cards
officers.forEach(officer => {
  officer.addEventListener('click', () => {

    // Grab the image directly from the clicked officer tile
    const imgEl = officer.querySelector("img");
    if (imgEl) {
      popupImg.src = imgEl.src;
    }

    openOfficerPopup(officer.id);
  });
});

// Close button
if (popupClose) {
  popupClose.addEventListener('click', closeOfficerPopup);
}

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOfficerPopup();
  }
});

// Close when clicking outside popup
document.addEventListener('click', (e) => {
  if (!officerPopup) return;
  if (officerPopup.style.display !== 'block') return;
  if (!officerPopup.contains(e.target) && !e.target.closest('.officer')) {
    closeOfficerPopup();
  }
});


// ========== CONTACT FORM INLINE SUCCESS + LOADING STATE ==========
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');
const submitBtn = contactForm ? contactForm.querySelector('.form-submit') : null;

if (contactForm && successMessage && submitBtn) {
  const originalBtnText = submitBtn.textContent;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // stop normal redirect

    // reset / hide previous message
    successMessage.style.display = "none";
    successMessage.style.color = "#22c55e";
    successMessage.textContent = "Thanks for contacting West Campus Robotics! We'll reply within 48 hours.";

    // set loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(contactForm);

    fetch("https://formsubmit.co/wchsfrc@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        // show success
        successMessage.style.display = "block";
        contactForm.reset();
      })
      .catch(() => {
        // show error
        successMessage.style.display = "block";
        successMessage.style.color = "red";
        successMessage.textContent = "Something went wrong. Please try again later.";
      })
      .finally(() => {
        // restore button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
  });
}


// =================== PROJECT SPOTLIGHT (unused modal, safely disabled) ===================
const spotlight = document.getElementById('spotlight');
const sTitle = document.getElementById('spotlight-title');
const sDesc = document.getElementById('spotlight-desc');
const sMembers = document.getElementById('spotlight-members');
const sImg = document.getElementById('spotlight-img');
const spotlightClose = document.getElementById('spotlight-close');

const tiles = document.querySelectorAll('.project-tile');

// Only wire spotlight behavior if those elements actually exist in the DOM
if (spotlight && spotlightClose && sTitle && sDesc && sMembers && sImg) {
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      sTitle.textContent = tile.dataset.title;
      sDesc.textContent = tile.dataset.desc;
      sImg.src = tile.dataset.img;

      sMembers.innerHTML = "";
      tile.dataset.members.split(",").forEach(name => {
        const span = document.createElement('span');
        span.textContent = name.trim();
        sMembers.appendChild(span);
      });

      spotlight.style.display = 'grid';
    });
  });

  spotlightClose.addEventListener('click', () => {
    spotlight.style.display = 'none';
  });

  spotlight.addEventListener('click', (e) => {
    if (e.target === spotlight) {
      spotlight.style.display = 'none';
    }
  });
}


// =================== PROJECT GRID EXPAND ===================
const projectsGrid = document.querySelector('.projects-grid');
const projectTiles = document.querySelectorAll('.project-tile');

// Build the default thumbnail content for a tile
function buildProjectThumbnail(tile) {
  const imgUrl = tile.dataset.img;
  const title = tile.dataset.title || "Project image";

  tile.innerHTML = `
    <div class="project-tile-thumb">
      <img src="${imgUrl}" alt="${title}">
    </div>
  `;
}

// Initialize all tiles with thumbnails on page load
projectTiles.forEach(tile => {
  buildProjectThumbnail(tile);
});

function resetProjectsGrid() {
  if (!projectsGrid) return;

  projectsGrid.classList.remove('expanded');

  projectTiles.forEach(tile => {
    tile.classList.remove('active', 'collapsed');
    tile.style.backgroundImage = ''; // just in case
    buildProjectThumbnail(tile);     // restore thumbnail view
  });
}

projectTiles.forEach(tile => {
  tile.addEventListener('click', () => {
    // if this tile is already active, collapse back to grid
    if (tile.classList.contains('active')) {
      resetProjectsGrid();
      return;
    }

    // mark grid as expanded (7×6, active tile spans all)
    projectsGrid.classList.add('expanded');

    // collapse all others
    projectTiles.forEach(other => {
      if (other !== tile) {
        other.classList.add('collapsed');
        other.innerHTML = "";
      }
    });

    // activate this tile
    tile.classList.remove('collapsed');
    tile.classList.add('active');

    const imgUrl = tile.dataset.img;
    const title = tile.dataset.title;
    const desc = tile.dataset.desc;
    const members = tile.dataset.members
      .split(',')
      .map(name => `<span>${name.trim()}</span>`)
      .join('');

    tile.innerHTML = `
      <div class="project-expanded">
        <div class="project-expanded-img" style="background-image:url('${imgUrl}')"></div>
        <div class="project-expanded-info">
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="project-expanded-members">
            ${members}
          </div>
          <button type="button" class="project-collapse-btn">
            Back to all projects
          </button>
        </div>
      </div>
    `;

    // wire up the "back" button
    const collapseBtn = tile.querySelector('.project-collapse-btn');
    collapseBtn.addEventListener('click', (ev) => {
      ev.stopPropagation(); // don’t re-trigger tile click
      resetProjectsGrid();
    });
  });
});

// optional: ESC key closes expanded project
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    resetProjectsGrid();
  }
});


// ========== PROCESS TIMELINE ANIMATION ==========
const timeline = document.querySelector('.process-timeline');

if (timeline) {
  const steps = timeline.querySelectorAll('.timeline-step');

  const animateStep = (step) => {
    const target = parseInt(step.dataset.percent, 10) || 0;
    const bar = step.querySelector('.timeline-bar-inner');
    const label = step.querySelector('.timeline-percent');
    if (!bar || !label) return;

    bar.style.width = target + '%';

    let current = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.round(progress * target);
      label.textContent = current + '%';
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          steps.forEach(animateStep);
          observer.disconnect(); // run once
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(timeline);
}


// ========== SCROLL REVEAL (FADE + SLIDE) ==========
(function () {
  const revealConfig = [
    { selector: '.hero-left', direction: 'left' },
    { selector: '.hero-right', direction: 'right' },
    { selector: '.mission', direction: 'up' },
    { selector: '.mission-detail-inner', direction: 'up' },
    { selector: '.projects-grid', direction: 'up' },
    { selector: '.project-tile', direction: 'up' },
    { selector: '.officers', direction: 'up' },
    { selector: '.officer', direction: 'up' },
    { selector: '.support-inner', direction: 'up' },
    { selector: '.contact-inner', direction: 'up' },
    { selector: '.section-header', direction: 'up' }
  ];

  // Attach .reveal + data-reveal to elements we want animated
  revealConfig.forEach(({ selector, direction }) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('reveal');
      el.dataset.reveal = direction || 'up';
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
})();
