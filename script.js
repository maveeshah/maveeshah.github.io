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
  
// Project Modal System Data Model (Actual Verified Projects)
const projectData = {
  'real-estate': {
    title: 'Real Estate ERP (Custom Frappe App)',
    icon: '🏢',
    description:
      'End-to-end real estate lifecycle management system built on Frappe/ERPNext for a US client — covering project setup, property sales, invoicing, and after-sales service.',
    role: 'Lead Full Stack Frappe Developer',
    githubLink: 'https://github.com/maveeshah/real-estate-erp',
    liveDemoLink: '#',
    details: [
      'Implemented **property and project management workflows**, reducing manual document handling by 70%.',
      'Integrated **multi-company accounting** and automated cost center allocations for construction projects.',
      'Developed **buyer portal** for property payments, plan tracking, and document downloads.',
      'Built **custom reports and dashboards** using Jinja and Frappe Charts for sales, cost, and project tracking.'
    ],
    technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'PostgreSQL', 'Jinja'],
    features: [
      'Automated document and payment plan generation',
      'Workflow-based sales approval process',
      'Customer self-service portal',
      'Dynamic financial reporting by project'
    ]
  },

  'automation-suite': {
    title: 'ERPNext Automation Suite',
    icon: '⚙️',
    description:
      'Python-based automation and data-migration toolkit built to reduce repetitive administrative and HR tasks across ERPNext deployments.',
    role: 'Python Automation Engineer',
    githubLink: 'https://github.com/maveeshah/automation-suite',
    liveDemoLink: '#',
    details: [
      'Automated **data migrations for 100,000+ records** from legacy ERP with <0.1% error rate.',
      'Developed **scripts for HR, payroll, and attendance** automation using ERPNext API.',
      'Built **centralized notification engine** for scheduled reports via email/Slack.',
      'Used **Celery workers** for parallel task execution and system health monitoring.'
    ],
    technologies: ['Python', 'ERPNext API', 'Celery', 'SQLAlchemy', 'Pandas', 'MariaDB'],
    features: [
      'Bulk operations for record sync and cleanup',
      'Nightly data sync and backup automation',
      'Dynamic report generation and distribution',
      'Error handling and retry logic for reliability'
    ]
  },

  'multi-company': {
    title: 'Multi-Company ERPNext Deployment',
    icon: '🏭',
    description:
      'Configured and deployed a multi-company ERPNext environment for a group of trading and manufacturing firms to unify operations under one system.',
    role: 'ERPNext Implementation Lead',
    githubLink: 'https://github.com/maveeshah/multi-company-erp',
    liveDemoLink: '#',
    details: [
      'Implemented **multi-company accounting** with consolidated financial reports and inter-company transactions.',
      'Configured **branch-level permissions and role hierarchies** for finance and operations users.',
      'Optimized performance by tuning background jobs and database indexing for high transaction volume.'
    ],
    technologies: ['ERPNext', 'Frappe Framework', 'Python', 'MySQL', 'JavaScript'],
    features: [
      'Cross-company stock and accounting integration',
      'Unified reporting dashboards for executives',
      'Automated journal entries between companies'
    ]
  },

  'custom-dashboards': {
    title: 'Advanced Dashboards & Reporting System',
    icon: '📊',
    description:
      'Developed a series of ERPNext-based dashboards and analytics modules with real-time KPIs for admin, finance, and operational insights.',
    role: 'ERPNext Developer',
    githubLink: 'https://github.com/maveeshah/custom-dashboards',
    liveDemoLink: '#',
    details: [
      'Built **department-wise dashboards** (Finance, Sales, HR) using Frappe Charts and Jinja templating.',
      'Integrated **RBAC controls** ensuring data isolation per user and department.',
      'Implemented drill-down analytics for P&L, invoices, and daily operations summaries.'
    ],
    technologies: ['Frappe Framework', 'ERPNext', 'Jinja', 'JavaScript', 'Chart.js', 'Python'],
    features: [
      'Real-time data visualization from ERPNext DocTypes',
      'Custom report filters and export options',
      'Secure access based on roles and permissions'
    ]
  },

  'hr-automation': {
    title: 'ERPNext HR & Payroll Automation',
    icon: '👔',
    description:
      'Enhanced ERPNext’s HR module with automated attendance sync, payroll generation, and compliance workflows for local regulations.',
    role: 'ERPNext Developer',
    githubLink: 'https://github.com/maveeshah/hr-automation',
    liveDemoLink: '#',
    details: [
      'Automated **attendance import and payroll calculations**, cutting HR processing time by 60%.',
      'Integrated **biometric attendance system** via REST API with real-time data push to ERPNext.',
      'Built **custom salary structures** and government compliance reports (EOBI/Tax).'
    ],
    technologies: ['ERPNext', 'Python', 'Jinja', 'MySQL', 'REST APIs'],
    features: [
      'API-based biometric attendance sync',
      'Dynamic payroll rules per department',
      'Self-service employee portal with payslip access'
    ]
  },

  'grow-healthy': {
    title: 'Grow Healthy Platform (ERPNext)',
    icon: '🏥',
    description: 'N/A — part of the research institute’s “Bump Coach” ecosystem; currently in restricted production phase.',
    role: 'Lead Frappe/ERPNext Developer',
    githubLink: 'N/A',
    liveDemoLink: 'N/A',
    details: ['N/A'],
    technologies: ['N/A'],
    features: ['N/A']
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