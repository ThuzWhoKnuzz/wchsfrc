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
    'My name is Daniel. I design, install, and improve electrical circuits and mechanical systems for our robot, while mentoring newer members on build techniques.',
    'https://via.placeholder.com/400x400'],
  ['emilyn', 'Emily Nguyen', 'Social Media Manager',
    'My name is Emily. I manage our social media accounts, create content to showcase our team’s activities, and help with outreach efforts to engage the community.',
    'https://via.placeholder.com/400x400'],
  ['codyy', 'Cody Yin', 'Team President',
    'My name is Cody. I oversee team operations, coordinate subteams, and represent the team at school events, competitions, and sponsor meetings.',
    'https://via.placeholder.com/400x400'],
  ['jordanb', 'Jordan Bailey', 'Lead Programmer',
    'My name is Jordan. I support the programming team, review code, and help connect software decisions with mechanical and electrical constraints.',
    'https://via.placeholder.com/400x400'],
  ['kaib', 'Kai Bzoskie', 'Community Outreach Coordinator',
    'My name is Kai. I organize community outreach events, coordinate with local schools and organizations, and help promote STEM education through our team’s activities.',
    'https://via.placeholder.com/400x400'],
  ['owenk', 'Owen Kay', 'Treasurer',
    'My name is Owen. I manage the team budget, track expenses, and help plan fundraising so we can afford parts, tools, and competitions.',
    'https://via.placeholder.com/400x400'],
  ['thachn', 'Thach Ngu', 'Web Developer',
    'My name is Thach. I design and maintain our team website, ensuring it effectively showcases our projects, members, and achievements.',
    'https://via.placeholder.com/400x400'],
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
