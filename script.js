document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Ameer Muavia Shah's Portfolio Loaded");
  
  // Mobile menu elements (declared early for use in theme toggle)
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
  const modernCards = document.querySelectorAll('.modern-card');
  modernCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
  
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
'newgents-pms': {
  title: 'Property Management System (Frappe App)',
  icon: '🏢',
  description:
    'Comprehensive property management system built on Frappe/ERPNext for a US real estate organization managing buildings, units, residents, subscriptions, billing, and NYC Local Law compliance tracking across multiple property types.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Multi-level property hierarchy (Corporation → Building → Unit) with comprehensive building details and unit tracking',
    'NYC Local Law compliance tracking (LL69, LL97, LL84, LL126, HPD) at building level for regulatory compliance',
    'Automated subscription management with unit-level tracking and recurring billing integration',
    'Custom sales invoice system with unit tracking, sales tax exemption handling, and property-specific print formats',
    'Bank reconciliation reporting for automated financial reconciliation',
    'Board of Directors (BOD) management system for governance oversight'
  ],
  impact: 'Streamlined property management operations for US real estate organization, enabling centralized management of multiple property types with automated compliance tracking and billing workflows.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2']
},
'asset-compliance': {
  title: 'Asset Compliance Management System (Frappe App)',
  icon: '🏗️',
  description:
    'Comprehensive asset compliance and maintenance tracking system built on Frappe/ERPNext for a US real estate organization automating compliance schedules, maintenance workflows, and supplier coordination for building assets.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Bulk compliance schedule creation tool with building-level NYC Local Law tracking (LL69, LL97, LL84, LL126, HPD)',
    'Extended maintenance periodicity (Daily to 6-Yearly) with automated next due date calculations',
    'Automated task assignment to supplier portal users and maintenance teams for seamless vendor collaboration',
    'Purchase Invoice integration from maintenance logs, reducing manual data entry by 60%',
    'Building and corporation-level asset tracking with real estate-specific workflows'
  ],
  impact: 'Reduced manual data entry by 60% and streamlined compliance management for building assets, enabling automated maintenance scheduling and supplier coordination.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON']
},
'equrban-system': {
  title: 'E-Qurban Management System (Frappe App)',
  icon: '🐑',
  description:
    'Comprehensive Qurbani (Islamic sacrifice) management system built on Frappe/ERPNext for Malaysian/Indonesian organizations, managing livestock breeding, feedlot operations, package sales, payment processing, and grant applications with multi-language support (English/Malay) and mobile API integration.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Multi-language Qurbani package management (English/Malay) with seasonal operations support',
    'Complete livestock lifecycle tracking from breeding to delivery with automated member ID generation',
    'E-Pawah grant application system with course attendance tracking and approval workflows',
    'Multi-payment gateway integration (M1, FPX, Online Banking, Alipay) with 6-month installment support',
    'RESTful API suite for mobile integration with OTP authentication, order management, and dashboard analytics',
    'Automated email notifications with PDF attachments and multi-language print formats',
    'Geographic hierarchy management (Country/State/City/District) with role-based access control'
  ],
  impact: 'Enabled digital transformation for Qurbani operations across Malaysian/Indonesian organizations, streamlining livestock management, payment processing, and grant applications with mobile-first approach.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'Highcharts', 'REST API']
},
'danisa-cargo-attendance': {
  title: 'Cargo Handling & Attendance Management System (Frappe App)',
  icon: '📦',
  description:
    'Comprehensive cargo handling and workforce attendance management system built on Frappe/ERPNext for a corporate organization in Nigeria, managing cargo operations, employee attendance tracking, overtime calculations, labour requisitions, and automated invoicing with detailed reporting across multiple shifts and designations.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Cargo handling system with truck tracking, automated bag/bale counting, and commodity type management',
    'Multi-attendance tool for bulk attendance marking with filtering by company, designation, and shift',
    'Automated overtime calculation with rest time deduction for 8-hour standard shifts',
    'Comprehensive reporting suite: Daily/Weekly/Monthly attendance sheets, invoicing summaries, and earnings reports',
    'Labour Requisition Form (LRF) with automated naming and workforce planning integration',
    'Duplicate attendance prevention and overlapping shift detection for data integrity',
    'Automated invoicing with shift-based head count, overtime tracking, and designation-wise calculations'
  ],
  impact: 'Streamlined workforce and cargo management operations for Nigerian corporate organization, enabling efficient bulk attendance processing, automated overtime calculations, and comprehensive reporting across multiple shifts.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2']
},
'supplier-item-picker': {
  title: 'Supplier Item Picker (Frappe App)',
  icon: '🛒',
  description:
    'Custom Frappe/ERPNext application developed for a Philippines-based e-commerce client to streamline supplier item management, barcode generation, and inventory reporting automating purchase order item selection, EAN-13 barcode creation, and providing comprehensive sales and warehouse analytics.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Supplier Item Picker modal with advanced search and filtering, reducing item entry time by 70%',
    'EAN-13 barcode generation with automated checksum and custom image rendering using OpenCV',
    'Billed Items to Be Delivered report for tracking fulfillment gaps and improving order management',
    'Dynamic warehouse stock summary with real-time inventory visibility across multiple locations',
    'Item-wise Sales Invoice profitability analysis with margin and discount tracking',
    'Enhanced Purchase Order form with search-as-you-type and duplicate item prevention'
  ],
  impact: 'Reduced purchase order item entry time by 70% and improved inventory visibility for Philippines e-commerce client, enabling better fulfillment tracking and profitability analysis.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'OpenCV', 'Barcode Library (EAN13)', 'JSON']
},
'azure-blob-storage-integration': {
  title: 'Azure Blob Storage Integration (Frappe App)',
  icon: '☁️',
  description:
    'Custom Frappe/ERPNext application developed to seamlessly integrate Microsoft Azure Blob Storage with ERPNext platform replacing local file storage with cloud-based blob storage, implementing secure file upload/download with permission validation, and providing scalable file management for their vast e-commerce/selling platform.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Complete Azure Blob Storage integration replacing local file storage for better scalability and performance',
    'Secure file upload/download with document-level permission validation layer',
    'Centralized Azure configuration management through Frappe Desk interface',
    'Internal URL generation with permission-checked endpoints for secure file access',
    'Migration script for seamless transition of existing files to permission-checked endpoints',
    'Automatic file deletion synchronization and graceful fallback to local storage on errors',
    'Support for multiple upload paths with hierarchical blob naming based on document context'
  ],
  impact: 'Enabled scalable cloud-based file storage for large e-commerce platform, improving performance and providing secure, permission-validated file access with seamless migration from local storage.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'Microsoft Azure Blob Storage', 'Azure Storage SDK', 'PostgreSQL/MariaDB', 'REST API', 'JSON']
},
'headstart-sms': {
  title: 'School Management System (Frappe App)',
  icon: '🏫',
  description:
    'Comprehensive HR and payroll management system built on Frappe/ERPNext for Headstart School in Pakistan, managing employee records, attendance, salary processing, Pakistan-specific statutory contributions (EOBI, Social Security, IESC), and mobile employee self-service portal.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Employee Management with custom HRMS ID and automatic eligibility calculation for Pakistan-specific statutory contributions (PF, EOBI, IESC)',
    'Automated salary slip processing with statutory contribution calculations and journal entry generation',
    'Mobile API suite for employee self-service with GPS-enabled attendance tracking, leave management, and salary slip viewing',
    'Overtime management with automatic salary calculation (1.5x rate) and integration with payroll',
    'Push notification system using OneSignal for attendance reminders and compliance alerts',
    'Custom Salary Register Report with comprehensive breakdown including bank details and contribution tracking',
    'Driver check-in/out system and requisition management with mobile integration'
  ],
  impact: 'Digitized HR and payroll operations for Headstart School in Pakistan, enabling mobile-first employee self-service, automated statutory contribution calculations, and improved attendance compliance through GPS tracking and push notifications.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'OneSignal API', 'REST APIs']
},
'guard-shift-management': {
  title: 'Shift Management Solution (Frappe App)',
  icon: '🛡️',
  description:
    'Comprehensive shift and roster management system built on Frappe/ERPNext for a UK security guard company, managing employee and subcontractor shifts, site assignments, attendance tracking, timesheet processing, license management, and automated billing integration with Sales Invoices.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Roster Management system supporting employees and subcontractors with shift tracking and attendance status management',
    'UK-specific Site Management with post codes, trained guard requirements, and service item mapping for automated invoicing',
    'Guard Type Management with multiple assignments per employee and license expiry tracking for UK compliance',
    'Employee Timesheet system with UK banking integration (sort code, account number) and detailed shift breakdowns',
    'Automated Sales Invoice integration with bulk roster data fetching, automatic item mapping, and rate calculation',
    'Comprehensive reporting: Weekly Reports, Timesheet Weekending Reports with site-wise grouping and customer filtering',
    'Submittable roster workflow with status tracking and seamless integration with ERPNext HR modules'
  ],
  impact: 'Streamlined shift and roster management for UK security guard company, enabling automated billing workflows, compliance tracking for security licenses, and comprehensive reporting for operational insights and client billing verification.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'REST APIs', 'Query Builder']
},
'crystal-patisserie-oms': {
  title: 'Order Management System for Bakery (Frappe App)',
  icon: '🥐',
  description:
    'Comprehensive order management system built on Frappe/ERPNext for Crystal Patisserie bakery in the UK, managing sales orders, order status tracking, delivery date filtering, item group-based filtering, and RESTful API integration for real-time order updates and retrieval.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Custom order status tracking with completion tracking and automatic filtering of completed orders',
    'RESTful API suite with order status updates, paginated retrieval, and filtered queries with guest access support',
    'Advanced filtering: delivery date-based (days from current date) and item group-based filtering for production planning',
    'Comprehensive error handling with proper HTTP status codes and structured error messages',
    'Order data serialization with recursive field exclusion for clean API responses',
    'Order completion tracking preventing updates to completed orders and streamlining workflow management',
    'Pagination metadata support with configurable page size for frontend integration'
  ],
  impact: 'Enabled real-time order management for Crystal Patisserie bakery in the UK, providing production planning capabilities through advanced filtering and seamless API integration for order tracking and updates.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'REST APIs', 'HTTP Status Codes', 'JSON']
},
'teller-automated-teller': {
  title: 'Automated Teller System (Frappe App)',
  icon: '🏦',
  description:
    'Comprehensive banking transaction management system built on Frappe/ERPNext for automated teller operations, handling customer deposits, withdrawals, real-time balance tracking, automatic accounting integration with GL entries, and overdraft prevention with balance validation.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Transaction Management system with custom naming series supporting Deposits and Withdrawals with real-time balance calculation',
    'Automatic GL Entry creation on transaction submission with proper debit/credit handling and fiscal year tracking',
    'Overdraft prevention system with balance validation and user-friendly error messages for insufficient funds',
    'Reverse GL Entry system for transaction cancellation with automatic debit/credit reversal',
    'Real-time balance calculation API supporting account-specific and aggregate balance queries',
    'Custom Teller Workspace dashboard with color-coded shortcuts for quick transaction access',
    'Dynamic account filtering and automatic account fetching for streamlined transaction entry'
  ],
  impact: 'Automated teller operations with real-time balance tracking and complete accounting integration, preventing overdrafts and ensuring accurate financial record keeping through automated GL entry creation.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'REST APIs']
},
'common-party-ledger': {
  title: 'Common Party Ledger (Frappe App)',
  icon: '📊',
  description:
    'Unified ledger reporting system built on Frappe/ERPNext for businesses dealing with parties that act as both customers and suppliers, aggregating all transactions from both roles into a single comprehensive view with opening balance, running balance, and ending balance calculations.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Unified ledger report aggregating transactions from parties acting as both customers and suppliers, solving ERPNext limitation',
    'Party Link integration connecting customer and supplier records for same business entity with dual-role accounting',
    'Comprehensive balance calculations: opening balance, running balance per transaction, and ending balance summary',
    'Chronological transaction sorting with GL Entry aggregation from both roles, excluding cancelled entries',
    'Dynamic filtering system with Party Link selection, date range (default: last month), and company-based filtering',
    'SQL-optimized query performance for efficient GL Entry retrieval on large datasets',
    'Complete transaction visibility with posting date, voucher details, debit/credit amounts, and remarks'
  ],
  impact: 'Solved ERPNext limitation by enabling unified view of all transactions for parties acting as both customers and suppliers, providing comprehensive financial reconciliation and period-specific reporting capabilities.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'SQL', 'JSON', 'Jinja2']
},
'billecta-integration': {
  title: 'Billecta Integration (Frappe App)',
  icon: '🔗',
  description:
    'Enterprise-grade bi-directional integration system built on Frappe/ERPNext that seamlessly synchronizes customer (debtor) data between ERPNext and Billecta debt collection platform, enabling real-time data consistency across systems for Swedish businesses managing accounts receivable and debt collection operations.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  keyResults: [
    'Bi-directional synchronization between ERPNext and Billecta with automatic customer creation and updates',
    'Comprehensive webhook system handling DebtorCreated, DebtorUpdated, and DebtorDeleted events for real-time sync',
    'Sophisticated field mapping with customer type conversion and Swedish-specific fields (OrgNo, VAT, Autogiro)',
    '20+ custom fields on Customer doctype with dedicated Billecta tab for complete debtor data support',
    'Timezone-aware conflict prevention with 3-minute update threshold to prevent update loops',
    'Secure authentication with Base64-encoded credentials and configurable API settings',
    'Robust error handling with comprehensive logging, transaction rollback, and duplicate prevention'
  ],
  impact: 'Eliminated manual data entry and ensured real-time data consistency between ERPNext and Billecta for Swedish businesses, enabling seamless debt collection operations with automatic synchronization and comprehensive audit trails.',
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'REST API', 'Webhooks', 'JSON', 'Base64 Authentication', 'Timezone Handling', 'MariaDB']
},
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
          <div class="modern-card p-8 rounded-3xl fade-in-on-scroll group relative z-10 cursor-pointer" data-project="${projectId}" style="animation-delay: ${delay}s">
            <div class="mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                <span class="text-4xl">${project.icon}</span>
              </div>
              <h3 class="text-xl font-bold mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors">${project.title}</h3>
            </div>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">
              ${project.description}
            </p>
            <div class="flex flex-wrap gap-2 mb-6">
              ${techTags}
            </div>
            <div class="text-emerald-400 text-sm font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-2 group-hover:gap-3">
              View Details <span class="text-lg transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
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
        
        ${project.impact ? `
        <div class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <h3 class="text-lg font-semibold text-emerald-400 mb-2">Impact</h3>
          <p class="text-gray-300 leading-relaxed">${project.impact}</p>
        </div>
        ` : ''}
        
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-emerald-400 mb-3">Key Results</h3>
          <ul class="space-y-3">
            ${project.keyResults.map(result => `
              <li class="text-gray-300 flex items-start gap-3">
                <span class="text-emerald-400 mt-1.5 text-lg">✅</span>
                <span>${result}</span>
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