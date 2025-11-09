document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Ameer Muavia Shah's Portfolio Loaded");
  
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('#mobile-menu a, nav a');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.classList.toggle('active');
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
  
  // Highlight active navigation link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPage || (currentPage === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // Project Modal System Data Model
  const projectData = {
    'grow-healthy': {
      title: 'Grow Healthy Platform (ERPNext)',
      icon: '🏥',
      description: 'A comprehensive, customized ERPNext-based healthcare system, designed for research institutes, that centralized patient health records and management for multiple facilities.',
      role: 'Lead Frappe/ERPNext Developer',
      githubLink: 'https://github.com/maveeshah/grow-healthy',
      liveDemoLink: '#', // Placeholder if no live demo exists
      details: [
        '**Reduced Data Silos by 60%** by centralizing patient data from five previously disparate clinics into one ERPNext instance.',
        'Developed custom healthcare modules (Patient Admission, Research Protocol, Lab Management) on the Frappe framework using **Jinja** for reports.', // Added Jinja detail
        'Created advanced, real-time admin dashboards for **analytics and compliance reporting** on research data.',
        'Implemented Role-Based Access Control (RBAC) to ensure HIPAA/GDPR compliance across different user types (Doctors, Researchers, Admin).'
      ],
      technologies: ['ERPNext', 'Frappe Framework', 'Python', 'JavaScript', 'MySQL', 'Jinja', 'REST APIs'], // Added Jinja
      features: [
        'Multi-institute support and dynamic facility selection',
        'Custom workflow for patient consent and protocol tracking',
        'Automated reporting and executive dashboards',
        'Secure API integration layer for external lab systems'
      ]
    },
    'real-estate': {
      title: 'Real Estate Property ERP',
      icon: '🏢',
      description: 'A highly customized Frappe application for complete property lifecycle management, enabling faster sales cycles and accurate project accounting for a major real estate firm.',
      role: 'Full Stack Frappe Developer',
      githubLink: 'https://github.com/maveeshah/real-estate-erp',
      liveDemoLink: '#',
      details: [
        '**Streamlined Transaction Approvals**, cutting average contract closing time from 7 days to 2 days using custom workflow automation.',
        'Implemented comprehensive project accounting, enabling **real-time budget tracking** against property development milestones.',
        'Designed custom DocTypes for property inventory, sales management, and post-sales maintenance tracking.',
        'Integrated a customer portal for buyers to track payment plans and download documents, improving customer satisfaction.'
      ],
      technologies: ['Frappe Framework', 'Python', 'JavaScript', 'PostgreSQL', 'ERPNext', 'Jinja'], // Added Jinja
      features: [
        'Property listing and inventory management with map views',
        'Automated sales/purchase order creation from CRM leads',
        'Dynamic workflow system for multi-level approvals',
        'Detailed financial reporting (P&L per project)'
      ]
    },
    'automation': {
      title: 'ERPNext Automation Suite (Python)',
      icon: '⚙️',
      description: 'A powerful Python-based automation toolkit that dramatically reduces manual effort by streamlining repetitive administrative, HR, and data migration tasks within ERPNext.',
      role: 'Python Automation Engineer',
      githubLink: 'https://github.com/maveeshah/automation-suite',
      liveDemoLink: '#',
      details: [
        'Developed data migration scripts that **successfully imported 100,000+ records** from legacy systems with a <0.1% error rate.', // Matches experience detail
        'Automated HR processes (attendance, payroll sync, and report distribution) reducing manual data entry time by **~8 hours per week**.', // Matches experience detail
        'Built a centralized notification engine using Python and the ERPNext API for scheduled reports and critical alerts.',
        'Designed scalable scripts leveraging **Celery** for asynchronous task execution, ensuring ERP performance stability.'
      ],
      technologies: ['Python', 'ERPNext API', 'Selenium', 'Pandas', 'SQLAlchemy', 'Celery', 'MariaDB/MySQL'], // Added MariaDB/MySQL
      features: [
        'Automated nightly data synchronization and backups',
        'Bulk operations for user management and batch processing',
        'Custom reporting distribution via email/Slack integration',
        'Performance monitoring and logging with auto-retry logic'
      ]
    }
  };

  // Dynamic Project Card Generation
  const projectsContainer = document.getElementById('projects-container');
  
  if (projectsContainer) {
    let delay = 0;
    
    for (const projectId in projectData) {
      if (projectData.hasOwnProperty(projectId)) {
        const project = projectData[projectId];
        
        // Generate a list of the first three technologies for the card's tag display
        const techTags = project.technologies.slice(0, 3).map(tech => `
          <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">${tech}</span>
        `).join('');

        const cardHTML = `
          <div class="bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-800/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-2 fade-in-on-scroll group" data-project="${projectId}" style="animation-delay: ${delay}s">
            <div class="mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span class="text-3xl">${project.icon}</span>
              </div>
              <h3 class="text-xl font-semibold mb-3 text-emerald-400 group-hover:text-emerald-300 transition-colors">${project.title}</h3>
            </div>
            <p class="text-gray-400 text-sm mb-4 leading-relaxed">
              ${project.description}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              ${techTags}
            </div>
            <button class="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors inline-flex items-center gap-2 group-hover:gap-3 cursor-pointer">
              View Details <span class="text-lg">→</span>
            </button>
          </div>
        `;

        projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
        delay += 0.1; // Add a slight delay for a staggered fade-in effect
      }
    }

    // Re-query for project cards, including the dynamically generated ones
    const projectCards = document.querySelectorAll('[data-project]');

    // Attach click listeners to dynamically created elements
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });
  }

  // Initialize project modal
  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal');

  function openModal(projectId) {
    if (!projectModal) return; // Guard: modal doesn't exist on this page
    
    const project = projectData[projectId];
    if (!project) return;

    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalContent = document.getElementById('modal-content');
    
    if (!modalTitle || !modalIcon || !modalContent) return;

    // Generate link buttons for the modal
    const liveDemoModalButton = project.liveDemoLink && project.liveDemoLink !== '#' ?
      `<a href="${project.liveDemoLink}" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-colors text-lg">
        Live Demo
      </a>` : '';
    
    const githubModalButton = project.githubLink && project.githubLink !== '#' ?
      `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 border-2 border-emerald-400 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-400 hover:text-black transition-colors text-lg">
        Source Code
      </a>` : '';


    modalTitle.textContent = project.title;
    modalIcon.textContent = project.icon;
    
    modalContent.innerHTML = `
      <div class="mb-6 border-b border-gray-800 pb-4">
        <p class="text-lg font-medium text-emerald-300">Role: ${project.role}</p>
      </div>

      <div>
        <p class="text-gray-300 text-lg leading-relaxed mb-6">${project.description}</p>
        
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-emerald-400 mb-3">Key Results & Features</h3>
          <ul class="space-y-3">
            ${project.details.map(detail => `
              <li class="text-gray-300 flex items-start gap-3">
                <span class="text-emerald-400 mt-1.5 text-lg">✅</span>
                <span>${detail}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-semibold text-emerald-400 mb-3">Core Technologies</h3>
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(tech => `
              <span class="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-full font-medium">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-start pt-4 border-t border-gray-800">
          ${liveDemoModalButton}
          ${githubModalButton}
        </div>
      </div>
    `;

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return; // Guard: modal doesn't exist on this page
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Event listeners - only if modal exists on this page
  if (projectModal) {
    
    // Close button handler
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on backdrop click
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
});