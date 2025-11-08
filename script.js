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
  
  // Add typing effect to hero text (optional enhancement)
  const heroText = document.querySelector('.typing-effect');
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    heroText.style.borderRight = '2px solid';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        heroText.style.borderRight = 'none';
      }
    };
    setTimeout(typeWriter, 500);
  }

  // Project Modal System
  const projectData = {
    'grow-healthy': {
      title: 'Grow Healthy Platform',
      icon: '🏥',
      description: 'A comprehensive ERPNext-based healthcare ERP system designed for research institutes, featuring advanced admin dashboards and patient health tracking modules.',
      details: [
        'Custom healthcare modules built on ERPNext framework',
        'Real-time patient health tracking and monitoring',
        'Advanced admin dashboards with analytics and reporting',
        'Research data management and compliance tracking',
        'Integration with medical devices and lab systems',
        'Role-based access control for different user types'
      ],
      technologies: ['ERPNext', 'Frappe Framework', 'Python', 'JavaScript', 'MySQL', 'REST APIs'],
      features: [
        'Patient health records management',
        'Research data collection and analysis',
        'Automated reporting and dashboards',
        'Multi-institute support',
        'Compliance and audit trails'
      ]
    },
    'real-estate': {
      title: 'Real Estate ERP',
      icon: '🏢',
      description: 'A custom Frappe application for comprehensive property management, project accounting, and streamlined approval workflows tailored for real estate businesses.',
      details: [
        'Complete property lifecycle management',
        'Project accounting with budget tracking',
        'Automated approval workflows for transactions',
        'Customer relationship management (CRM)',
        'Document management and digital signatures',
        'Financial reporting and analytics'
      ],
      technologies: ['Frappe Framework', 'Python', 'JavaScript', 'PostgreSQL', 'ERPNext'],
      features: [
        'Property listing and inventory management',
        'Sales and purchase order processing',
        'Automated workflow approvals',
        'Financial reporting and analytics',
        'Customer portal integration'
      ]
    },
    'automation': {
      title: 'Automation Suite',
      icon: '⚙️',
      description: 'A powerful Python-based automation toolkit seamlessly integrated with ERPNext to streamline repetitive administrative and HR tasks, significantly reducing manual effort.',
      details: [
        'Automated data entry and migration scripts',
        'HR process automation (attendance, payroll)',
        'Email and notification automation',
        'Report generation and distribution',
        'API integrations with third-party services',
        'Scheduled task execution and monitoring'
      ],
      technologies: ['Python', 'ERPNext API', 'Selenium', 'Pandas', 'SQLAlchemy', 'Celery'],
      features: [
        'Automated data synchronization',
        'Bulk operations and batch processing',
        'Custom workflow automation',
        'Error handling and logging',
        'Performance monitoring and optimization'
      ]
    }
  };

  // Initialize project modal
  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const projectCards = document.querySelectorAll('[data-project]');

  function openModal(projectId) {
    if (!projectModal) return; // Guard: modal doesn't exist on this page
    
    const project = projectData[projectId];
    if (!project) return;

    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalContent = document.getElementById('modal-content');
    
    if (!modalTitle || !modalIcon || !modalContent) return;

    modalTitle.textContent = project.title;
    modalIcon.textContent = project.icon;
    
    modalContent.innerHTML = `
      <div>
        <p class="text-gray-300 text-lg leading-relaxed mb-6">${project.description}</p>
        
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-emerald-400 mb-3">Key Features</h3>
          <ul class="space-y-2">
            ${project.details.map(detail => `
              <li class="text-gray-300 flex items-start gap-2">
                <span class="text-emerald-400 mt-1">▸</span>
                <span>${detail}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold text-emerald-400 mb-3">Technologies Used</h3>
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(tech => `
              <span class="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-full font-medium">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-emerald-400 mb-3">Highlights</h3>
          <div class="grid sm:grid-cols-2 gap-3">
            ${project.features.map(feature => `
              <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <p class="text-gray-300 text-sm">${feature}</p>
              </div>
            `).join('')}
          </div>
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
    // Project card click handlers
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openModal(projectId);
      });
    });

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
