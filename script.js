document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Ameer Muavia Shah's Portfolio Loaded");

  // Mobile menu elements
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('#mobile-menu a, nav a');

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  const html = document.documentElement;

  // Get saved theme or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '🌙' : '☀️';
    if (themeIcon) themeIcon.textContent = icon;
    if (mobileThemeIcon) mobileThemeIcon.textContent = icon;
  }

  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
      toggleTheme();
      // Close mobile menu after theme toggle
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        if (mobileMenuButton) mobileMenuButton.classList.remove('active');
      }
    });
  }

  // Interactive 3D card tilt effect
  function initTiltEffect() {
    const modernCards = document.querySelectorAll('.modern-card');
    modernCards.forEach(card => {
      // Remove existing listeners to avoid duplicates if re-initialized
      const newCard = card.cloneNode(true);
      if (card.parentNode) {
        card.parentNode.replaceChild(newCard, card);
      }

      newCard.addEventListener('mousemove', (e) => {
        const rect = newCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20; // Reduced sensitivity
        const rotateY = (centerX - x) / 20;

        newCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      newCard.addEventListener('mouseleave', () => {
        newCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });

      // Re-attach click listener if it's a project card
      if (newCard.hasAttribute('data-project')) {
        newCard.addEventListener('click', () => {
          const projectId = newCard.getAttribute('data-project');
          openModal(projectId);
        });
      }
    });
  }

  // Initial tilt init for static cards
  initTiltEffect();

  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.classList.toggle('active');
      mobileMenuButton.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.classList.remove('active');
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#') && href.length > 1) {
        e.preventDefault();

        const targetId = href.substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          // Close mobile menu if open
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (mobileMenuButton) {
              mobileMenuButton.classList.remove('active');
              mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
          }

          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      }
    });
  });

  // Highlight active navigation link
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('nav a[href^="#"]');

  function highlightActiveSection() {
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          const linkHref = link.getAttribute('href');
          if (linkHref && linkHref.startsWith('#')) {
            link.classList.remove('active');
            if (linkHref === `#${sectionId}`) {
              link.classList.add('active');
              const underline = link.querySelector('span');
              if (underline) underline.style.width = '100%';
            } else {
              const underline = link.querySelector('span');
              if (underline) underline.style.width = '';
            }
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection();

  // Fade-in animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Project Data Global Variable
  let projectData = {};

  // Fetch Project Data from JSON
  async function loadProjects() {
    try {
      const response = await fetch('projects.json');
      if (!response.ok) throw new Error('Failed to load projects');
      projectData = await response.json();
      renderProjects();
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = ''; // Clear existing content
    let delay = 0;

    for (const projectId in projectData) {
      if (projectData.hasOwnProperty(projectId)) {
        const project = projectData[projectId];

        // Tags
        const techTags = project.technologies.slice(0, 3).map(tech => `
          <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium whitespace-nowrap">${tech}</span>
        `).join('');

        const cardHTML = `
          <div class="modern-card p-8 rounded-3xl fade-in-on-scroll group relative z-10 cursor-pointer h-full flex flex-col" data-project="${projectId}" style="opacity: 0; animation: fadeIn 0.5s ease-out forwards ${delay}s">
            <div class="mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span class="text-4xl filter drop-shadow-md">${project.icon}</span>
              </div>
              <h3 class="text-xl font-bold mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors">${project.title}</h3>
            </div>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
              ${project.description.slice(0, 150)}...
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              ${techTags}
            </div>
            <div class="text-emerald-400 text-sm font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-2 group-hover:gap-3 mt-auto">
              View Case Study <span class="text-lg transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        `;

        projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
        delay += 0.1;
      }
    }

    // Re-initialize tilt and click listeners
    initTiltEffect();
  }

  // Load projects immediately
  loadProjects();

  // Initialize project modal
  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal');

  function openModal(projectId) {
    if (!projectModal) return;

    const project = projectData[projectId];
    if (!project) return;

    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalContent = document.getElementById('modal-content');

    if (!modalTitle || !modalIcon || !modalContent) return;

    // Button Logic: Always show buttons, disable if '#'
    const isLiveLink = project.liveDemoLink && project.liveDemoLink !== '#';
    const isGitLink = project.githubLink && project.githubLink !== '#';

    // Helper to generate button HTML
    const createBtn = (href, text, isPrimary, icon) => {
      const isPlaceholder = !href || href === '#';
      const classes = isPrimary
        ? "bg-emerald-500 text-black hover:bg-emerald-400"
        : "border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black";

      const style = isPlaceholder ? "opacity-50 cursor-not-allowed" : "hover:scale-105";
      const clickAttr = isPlaceholder ? 'onclick="return false;" title="Coming Soon"' : `href="${href}" target="_blank" rel="noopener noreferrer"`;
      const tag = isPlaceholder ? 'button' : 'a';

      return `
            <${tag} ${clickAttr} class="px-6 py-3 font-bold rounded-lg transition-all duration-200 flex items-center gap-2 justify-center w-full sm:w-auto ${classes} ${style}">
                <span>${icon}</span> ${text}
            </${tag}>
        `;
    };

    const liveDemoBtn = createBtn(project.liveDemoLink, "Live Demo", true, "🚀");
    const sourceCodeBtn = createBtn(project.githubLink, "Source Code", false, "💻");

    modalTitle.textContent = project.title;
    modalIcon.innerHTML = `<div class="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-6xl">${project.icon}</div>`;

    modalContent.innerHTML = `
      <div class="mb-8 border-b border-gray-700/50 pb-6">
        <div class="flex flex-wrap items-center gap-4 text-emerald-300 bg-emerald-500/5 px-4 py-2 rounded-lg inline-block">
            <span class="font-semibold">ROLE:</span> ${project.role}
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <div>
                <h3 class="text-xl font-bold text-gray-100 mb-4">Project Overview</h3>
                <p class="text-gray-300 text-lg leading-relaxed">${project.description}</p>
            </div>

            ${project.impact ? `
            <div class="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden">
                <div class="absolute -right-4 -top-4 text-emerald-500/10 text-9xl">📈</div>
                <h3 class="text-lg font-bold text-emerald-400 mb-2 relative z-10">Business Impact</h3>
                <p class="text-gray-200 leading-relaxed relative z-10">${project.impact}</p>
            </div>
            ` : ''}
            
            <div>
                <h3 class="text-xl font-bold text-gray-100 mb-4">Key Outcomes</h3>
                <ul class="grid sm:grid-cols-1 gap-3">
                    ${project.keyResults.map(result => `
                    <li class="flex items-start gap-3 text-gray-300 bg-gray-800/30 p-3 rounded-lg border border-gray-700/50">
                        <span class="text-emerald-400 mt-1">✅</span>
                        <span class="text-sm leading-relaxed">${result}</span>
                    </li>
                    `).join('')}
                </ul>
            </div>
          </div>

          <div class="lg:col-span-1 space-y-8">
              <div>
                <h3 class="text-white font-bold mb-4 flex items-center gap-2">
                    <span>🛠️</span> Tech Stack
                </h3>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `
                    <span class="px-3 py-1.5 bg-gray-800 border border-gray-700 text-emerald-400 text-xs rounded-md font-mono hover:border-emerald-500/50 transition-colors cursor-default">
                        ${tech}
                    </span>
                    `).join('')}
                </div>
              </div>

              <div class="flex flex-col gap-3 pt-6 border-t border-gray-700/50">
                  ${liveDemoBtn}
                  ${sourceCodeBtn}
              </div>
          </div>
      </div>
    `;

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (projectModal) {
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) closeModal();
    });
  }

  // Contact form handler fallback
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Preparing...';
      submitButton.disabled = true;

      const mailtoLink = `mailto:mavee.shah@hotmail.com?subject=Portfolio Contact: ${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message + '\n\nFrom: ' + data.email)}`;

      if (formMessage) {
        formMessage.classList.remove('hidden');
        formMessage.className = 'mt-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center animate-fade-in';
        formMessage.innerHTML = `
            <p class="font-bold mb-1">Thanks, ${data.name}!</p>
            <p class="text-sm opacity-80">Opening your email client now...</p>
        `;
      }

      setTimeout(() => {
        window.location.href = mailtoLink;
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        setTimeout(() => formMessage && formMessage.classList.add('hidden'), 5000);
      }, 1000);
    });
  }

  // Experience Counter Logic
  function initExperienceCounter() {
    const startDate = new Date('2019-11-01'); // Start date based on career start (Internship Nov 2019)
    const counterElement = document.getElementById('experience-counter');

    if (!counterElement) return;

    function updateCounter() {
      const now = new Date();
      const diff = now - startDate;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

      counterElement.innerHTML = `
        <div class="flex flex-col items-center"><span class="text-emerald-400">${years}</span><span class="text-[10px] text-gray-500 uppercase font-sans">Years</span></div>
        <span class="text-gray-700">:</span>
        <div class="flex flex-col items-center"><span class="text-emerald-400">${months}</span><span class="text-[10px] text-gray-500 uppercase font-sans">Mos</span></div>
        <span class="text-gray-700">:</span>
        <div class="flex flex-col items-center"><span class="text-emerald-400">${days}</span><span class="text-[10px] text-gray-500 uppercase font-sans">Days</span></div>
      `;
    }

    updateCounter();
    setInterval(updateCounter, 1000 * 60 * 60 * 24); // Update daily
  }

  initExperienceCounter();
});