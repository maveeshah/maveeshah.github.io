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
  
  // Particle Animation (only on index page)
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      particlesContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 25000);
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 1000);
    }
    
    // Continue creating particles
    setInterval(createParticle, 2000);
  }
  
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
    'Comprehensive property management system built on Frappe/ERPNext for a US real estate organization  managing buildings, units, residents, subscriptions, billing, and NYC Local Law compliance tracking across multiple property types.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed Building Management system with support for multiple property types (Condominium, Coop, HDFC, Rental, HOA) and comprehensive building details including floors, units, energy efficiency ratings, and year built.',
    'Implemented NYC Local Law compliance tracking (Local Law 69 - Bed Bug, Local Law 97, Local Law 84, Local Law 126, HPD Registration) at building level for regulatory compliance management.',
    'Built Corporation and Unit hierarchy with Corporation → Building → Unit structure, enabling multi-level property organization and ownership tracking for real estate portfolios.',
    'Customized Subscription management with unit-level tracking, automatic corporation and building assignment, and integration with ERPNext subscription workflows for recurring billing.',
    'Extended Sales Invoice with unit number tracking, sales tax exemption handling, and custom print format for property-specific billing statements with account statements and payment instructions.',
    'Enhanced Payment Entry with actual cheque number tracking and payment deduction management for comprehensive payment processing workflows.',
    'Implemented Customer management with tenant flagging and sales tax exemption status, enabling differentiated handling of tenant vs owner customers.',
    'Created Bank Reconciliation Report for automated financial reconciliation and transaction matching across bank accounts.',
    'Built Board of Directors (BOD) management system with member tracking for buildings requiring board oversight, supporting governance and decision-making processes.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2'],
  features: [
    'Multi-level property hierarchy (Corporation → Building → Unit)',
    'NYC Local Law compliance tracking (LL69, LL97, LL84, LL126, HPD)',
    'Building type management (Condominium, Coop, HDFC, Rental, HOA)',
    'Unit-level subscription and recurring billing',
    'Custom sales invoice print format with account statements',
    'Sales tax exemption handling for customers',
    'Tenant vs owner customer differentiation',
    'Board of Directors (BOD) member management',
    'Energy efficiency rating tracking',
    'Bank reconciliation reporting',
    'Payment entry with cheque number tracking',
    'Building status and compliance monitoring',
    'Automated corporation and building assignment in subscriptions'
  ]
},
'asset-compliance': {
  title: 'Asset Compliance Management System (Frappe App)',
  icon: '🏗️',
  description:
    'Comprehensive asset compliance and maintenance tracking system built on Frappe/ERPNext for a US real estate organization  automating compliance schedules, maintenance workflows, and supplier coordination for building assets.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed Compliance Tool for bulk creation of asset maintenance schedules with building-level compliance tracking (Local Law 69, 97, 84, 126, HPD Registration).',
    'Extended maintenance periodicity options (Daily to 6-Yearly) and automated next due date calculations based on completion dates and schedules.',
    'Implemented automated task assignment to supplier portal users and maintenance teams, enabling seamless vendor collaboration for compliance tasks.',
    'Built Purchase Invoice integration from completed maintenance logs, streamlining billing workflows and reducing manual data entry by 60%.',
    'Customized Asset, Asset Maintenance, and Asset Maintenance Log doctypes with building/corporation tracking, local law compliance fields, and real estate-specific workflows.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON'],
  features: [
    'Bulk compliance schedule creation via Compliance Tool',
    'Automated maintenance task assignment to suppliers and teams',
    'Extended periodicity support (Daily through 6-Yearly)',
    'Purchase Invoice generation from maintenance logs',
    'Building and corporation-level asset tracking',
    'NYC Local Law compliance tracking (LL69, LL97, LL84, LL126, HPD)',
    'Service item auto-creation for assets',
    'Custom workspace for compliance management'
  ]
},
'equrban-system': {
  title: 'E-Qurban Management System (Frappe App)',
  icon: '🐑',
  description:
    'Comprehensive Qurbani (Islamic sacrifice) management system built on Frappe/ERPNext for Malaysian/Indonesian organizations, managing livestock breeding, feedlot operations, package sales, payment processing, and grant applications with multi-language support (English/Malay) and mobile API integration.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed comprehensive Qurbani package management system with multi-language support (English/Malay), package types, opening/closing dates, execution tracking, and currency management for seasonal Qurbani operations.',
    'Built Member/Breeder management system with automated member ID generation (M-YYYY-STATE-#####), comprehensive profile tracking including personal details, employment information, heir relationships, and breeder experience documentation.',
    'Implemented Feedlot management system with feedlot capacity tracking, employee management, company registration details, and integration with Member/Breeder hierarchy for livestock facility operations.',
    'Created Ruminant (livestock) tracking system with detailed animal profiles including breed, age, weight, gender, physical status assessment, insurance tracking, import status, medical information, and death status management for complete livestock lifecycle tracking.',
    'Developed E-Pawah application system for grant applications with course attendance tracking (Pembutan Makanan Ruminan, Penjagan Lembu), cattle ownership documentation, farm capacity management, grant allocation, and approval workflow.',
    'Built comprehensive payment processing system with multiple payment gateway integrations (M1, FPX, Online Banking, Card Payment, Umobile, Emonei, Alipay), installment payment support (6-month installments), transaction tracking, and automated receipt generation.',
    'Implemented order management system with Sales Order and Sales Invoice creation, package-based ordering, delivery date calculation (30 months from order), order cancellation requests with refund processing, and payment term templates.',
    'Created custom print formats for Sales Invoice in multiple languages including Invois Jualan (Sales Invoice), Penyata Akaun (Account Statement), Resit Bayaran (Payment Receipt), Butir Penyertaan (Participation Details), and Arahan Penghantaran (Delivery Instructions).',
    'Developed RESTful API endpoints for mobile/frontend integration including user registration, OTP-based authentication, package browsing, order creation, payment processing, sales history, profile management, and dashboard analytics.',
    'Built automated email notification system with PDF invoice and receipt attachments, order confirmation emails, cancellation notifications, and application status updates for seamless customer communication.',
    'Implemented dashboard analytics with feedlot summaries, ruminant counts, Qurban readiness tracking (age-based filtering), pie chart visualizations for livestock class distribution, and E-Pawah application status monitoring.',
    'Created geographic hierarchy management (Country → State → City → District) with state code tracking for Malaysian/Indonesian administrative divisions and location-based filtering.',
    'Developed multi-role access control system with roles for Customer, Breeder, Feedlot, E Qurban Admin, Madani Admin, Madani Staff, and Guest with role-based permissions and workspace customization.',
    'Built announcement and policy management system with role-based announcements, image attachments, active/inactive status tracking, and user-specific policy display for organizational communication.',
    'Implemented order cancellation workflow with validation checks for delivery status, refund calculation (excluding first payment), bank account details collection, and approval process for order cancellations.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'Highcharts', 'REST API'],
  features: [
    'Multi-language Qurbani package management (English/Malay)',
    'Member/Breeder registration and profile management',
    'Feedlot facility management with capacity tracking',
    'Comprehensive ruminant (livestock) lifecycle tracking',
    'E-Pawah grant application system',
    'Multi-payment gateway integration (M1, FPX, Online Banking, etc.)',
    'Installment payment support (6-month terms)',
    'Order management with cancellation workflow',
    'Custom print formats in multiple languages',
    'RESTful API for mobile/frontend integration',
    'OTP-based user authentication',
    'Automated email notifications with PDF attachments',
    'Dashboard analytics with visualizations',
    'Geographic hierarchy management (Country/State/City/District)',
    'Multi-role access control system',
    'Announcement and policy management',
    'Sales history and payment tracking',
    'Ruminant health and medical information tracking',
    'Death status and insurance management',
    'Qurban readiness assessment (age-based)',
    'Package opening/closing date management',
    'Transaction status tracking and callbacks',
    'Refund processing with payment entry tracking',
    'Business inquiry form management',
    'User verification code system with expiration'
  ]
},
'danisa-cargo-attendance': {
  title: 'Cargo Handling & Attendance Management System (Frappe App)',
  icon: '📦',
  description:
    'Comprehensive cargo handling and workforce attendance management system built on Frappe/ERPNext for a corporate organization in Nigeria, managing cargo operations, employee attendance tracking, overtime calculations, labour requisitions, and automated invoicing with detailed reporting across multiple shifts and designations.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed Cargo Handling system with truck tracking, commodity type management, godown/shed assignment, and automated bag/bale counting with submission workflow for cargo operations management.',
    'Built Multi-Attendance Tool for bulk attendance marking with employee filtering by company, employee group, designation, and shift, enabling efficient mass attendance entry for large workforces.',
    'Implemented Mark Attendance form with batch employee attendance creation, supporting Peace Rate and Daily Rated employee groups with automatic amount calculation and pay rate assignment.',
    'Created Labour Requisition Form (LRF) with automated naming (LRF-YYYY-MM-####), personnel request tracking, area assignment, and customer company integration for workforce planning.',
    'Extended Attendance doctype with custom validation for duplicate attendance prevention and overlapping shift detection, ensuring data integrity and preventing attendance conflicts.',
    'Built comprehensive overtime calculation system with rest time deduction, supporting 8-hour standard shifts with automated overtime hours computation using time-in and time-out tracking.',
    'Developed Invoicing Summary report with shift-based head count, overtime hours tracking, and automated amount calculations including normal rate, overtime rate, and management fee per designation.',
    'Created multiple attendance reports including Daily Attendance Sheet with Overtime, Weekly Attendance Sheet, Monthly Attendance Sheets, and Daily Attendance List for comprehensive attendance monitoring.',
    'Built earnings reports for Peace Rate and Daily Rated employee groups with weekly and daily earnings calculations, supporting different pay structures and amount tracking per employee group.',
    'Implemented Cargo Handling reports including Daily Cargo Handling Report, Cargo Handling Weekly Summary with commodity type breakdown, and automated rate calculations for cargo operations.',
    'Developed designation-based summary reports with weekly designation summaries, pay rate weekly earnings, and designation-based weekly summaries for payroll and workforce analytics.',
    'Created Department and Customer Companies management with integration across attendance and cargo handling modules for organizational structure management.',
    'Built Commodity and Commodity Type management with rate tracking and integration with cargo handling operations for inventory and pricing management.',
    'Implemented Godown/Shed No. management for warehouse and storage location tracking in cargo handling operations.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2'],
  features: [
    'Cargo handling with truck and delivery number tracking',
    'Automated bag/bale counting and total calculation',
    'Commodity type and commodity management with rate tracking',
    'Godown/Shed number assignment for warehouse management',
    'Multi-attendance tool for bulk attendance marking',
    'Employee filtering by company, group, designation, and shift',
    'Mark Attendance form with batch employee processing',
    'Peace Rate and Daily Rated employee group support',
    'Overtime calculation with rest time deduction (8-hour standard)',
    'Duplicate attendance validation and overlapping shift detection',
    'Labour Requisition Form (LRF) with automated naming',
    'Shift-based attendance tracking and reporting',
    'Daily, weekly, and monthly attendance sheets',
    'Invoicing summary with head count and overtime calculations',
    'Weekly earnings reports for Peace Rate and Daily Rated groups',
    'Designation-based summary and earnings reports',
    'Cargo handling daily and weekly summary reports',
    'Department and customer company management',
    'Amount and pay rate tracking per attendance',
    'Place of work and ID number tracking',
    'Automated amount calculations with normal rate, overtime rate, and management fee',
    'Time-in and time-out tracking with datetime precision',
    'Approver name tracking for attendance approval workflow'
  ]
},
'supplier-item-picker': {
  title: 'Supplier Item Picker (Frappe App)',
  icon: '🛒',
  description:
    'Custom Frappe/ERPNext application developed for a Philippines-based e-commerce client to streamline supplier item management, barcode generation, and inventory reporting  automating purchase order item selection, EAN-13 barcode creation, and providing comprehensive sales and warehouse analytics.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Built Supplier Item Picker modal with advanced search and filtering capabilities, enabling bulk selection of items from specific suppliers or all suppliers in Purchase Orders, reducing item entry time by 70%.',
    'Implemented EAN-13 barcode generation with automated checksum calculation, custom image rendering using OpenCV to embed item codes and names directly on barcode images, and seamless integration with Item Barcode doctype.',
    'Developed Billed Items to Be Delivered report tracking pending deliveries by comparing Sales Invoice items against Delivery Note quantities, helping identify fulfillment gaps and improve order management.',
    'Created Display and Storage Warehouse Stock Summary report with dynamic warehouse column generation, providing real-time inventory visibility across multiple warehouse locations with filtering by company, item group, brand, and date ranges.',
    'Built Item-wise Sales Invoice with Margin and Discount report analyzing profitability at item level, tracking margin types, margin rates, discount percentages, and discount amounts to support pricing strategy decisions.',
    'Extended Purchase Order form with custom JavaScript client scripts, implementing search-as-you-type functionality, select-all capabilities, and duplicate item prevention for enhanced user experience.'
  ],
  technologies: [
    'Frappe Framework',
    'ERPNext',
    'Python',
    'JavaScript',
    'MariaDB',
    'OpenCV',
    'Barcode Library (EAN13)',
    'JSON'
  ],
  features: [
    'Multi-supplier item selection with search and filter',
    'Bulk item addition to Purchase Orders',
    'EAN-13 barcode generation with checksum validation',
    'Custom barcode images with embedded item code and name',
    'Billed Items to Be Delivered tracking report',
    'Dynamic warehouse stock summary across locations',
    'Item-wise sales invoice profitability analysis',
    'Margin and discount tracking per item',
    'Duplicate item prevention in Purchase Orders',
    'Custom workspace for trading operations'
  ]
},
'azure-blob-storage-integration': {
  title: 'Azure Blob Storage Integration (Frappe App)',
  icon: '☁️',
  description:
    'Custom Frappe/ERPNext application developed to seamlessly integrate Microsoft Azure Blob Storage with ERPNext platform  replacing local file storage with cloud-based blob storage, implementing secure file upload/download with permission validation, and providing scalable file management for their vast e-commerce/selling platform.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Built comprehensive Azure Blob Storage integration replacing Frappe\'s default file storage system, enabling automatic upload of all documents, images, and attachments to Microsoft Azure Blob Storage instead of local filesystem, providing better scalability and performance for production environments.',
    'Implemented secure file upload/download system with permission validation layer, overriding Frappe\'s core file handling methods (upload_file, download_file, get_file) to enforce document-level permissions before allowing file access, ensuring only authorized users can view or download files.',
    'Developed Azure Configuration doctype for centralized credential management, allowing administrators to configure Azure Storage account name, account key, connection string, and container name through Frappe Desk interface without requiring code changes or server restarts.',
    'Created internal URL generation system with permission-checked endpoints, routing all file access through custom API methods that validate user permissions on parent documents before streaming files from Azure, preventing unauthorized access to sensitive business documents.',
    'Built migration script to seamlessly migrate existing File documents with direct Azure blob URLs to use internal permission-checked endpoints, ensuring backward compatibility and maintaining security standards for legacy files.',
    'Implemented automatic file deletion from Azure when File documents are deleted in Frappe, with proper error handling and logging to maintain data consistency between Frappe database and Azure Blob Storage.',
    'Extended file upload handling to support multiple upload paths (direct content, file streams, local file uploads) with automatic blob name generation based on document context (doctype/document_name/file_name), organizing files hierarchically in Azure containers.',
    'Added comprehensive error handling and logging throughout the integration, with graceful fallback to local storage when Azure upload fails, ensuring system reliability and preventing data loss during network issues or configuration problems.'
  ],
  technologies: [
    'Frappe Framework',
    'ERPNext',
    'Python',
    'Microsoft Azure Blob Storage',
    'Azure Storage SDK',
    'PostgreSQL/MariaDB',
    'REST API',
    'JSON'
  ],
  features: [
    'Seamless Azure Blob Storage integration with Frappe/ERPNext',
    'Automatic file upload to Azure for all File documents',
    'Secure file download with permission validation',
    'Centralized Azure configuration management',
    'Internal URL generation with permission checks',
    'Automatic file deletion from Azure on document deletion',
    'Migration support for existing Azure-stored files',
    'Multiple upload path support (direct, stream, local)',
    'Hierarchical blob naming based on document context',
    'Graceful fallback to local storage on errors',
    'Comprehensive error handling and logging',
    'Support for private file access control'
  ]
},
'headstart-sms': {
  title: 'School Management System (Frappe App)',
  icon: '🏫',
  description:
    'Comprehensive HR and payroll management system built on Frappe/ERPNext for Headstart School in Pakistan, managing employee records, attendance, salary processing, Pakistan-specific statutory contributions (EOBI, Social Security, IESC), and mobile employee self-service portal.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed Employee Management system with custom HRMS ID generation, status validation (Active, Inactive, Suspended, Left), and automatic eligibility calculation for statutory contributions based on employment type, joining date, and age restrictions.',
    'Implemented Pakistan-specific statutory contribution management including Provident Fund (PF), Employees\' Old-Age Benefits Institution (EOBI), and IESC contributions with automatic calculation, eligibility tracking, and journal entry generation for employer contributions.',
    'Built Employee Letters system for generating official employee correspondence with comprehensive employee information including designation, department, branch, employment details, and CNIC/Passport tracking for documentation purposes.',
    'Customized Salary Slip processing with automatic incorporation of salary structure assignment allowances, statutory contribution calculations (PF, EOBI, IESC), and automated journal entry creation for employer contributions with proper accounting integration.',
    'Extended Salary Structure Assignment with custom allowance management supporting both fixed amounts and percentage-based calculations, with automatic application to salary slips based on employment type and months after joining.',
    'Created comprehensive Mobile API suite for employee self-service including authentication, attendance check-in/out with GPS tracking, leave application and allocation viewing, overtime entry, requisition requests, salary slip viewing, and personal information updates.',
    'Implemented Attendance Management with GPS-enabled check-in/out tracking, automatic attendance creation, morning/afternoon shift tracking, and employee self-approval workflow for attendance records.',
    'Built Leave Management system with leave allocation tracking, leave application submission, validation against existing attendance and leave records, and integration with mobile APIs for employee self-service.',
    'Developed Overtime Management with time tracking, automatic salary calculation based on daily salary and 1.5x overtime rate, integration with Additional Salary records, and overtime breakup tracking for payroll processing.',
    'Created Salary Contribution Settings for centralized management of PF, EOBI, and IESC contribution rules including employment type-based eligibility, gender-based calculations, age restrictions, and percentage/fixed amount configurations.',
    'Built custom Salary Register Report with comprehensive salary breakdown including earnings, deductions, employer contributions, employee bank details (CNIC, Bank Name, Account Number, IBAN), and date of joining information for payroll analysis.',
    'Implemented Push Notification system using OneSignal for attendance reminders, late arrival alerts, and absence notifications to improve employee engagement and attendance compliance.',
    'Developed Driver Check-in/Out system for specialized attendance tracking for driver employees with separate check-in/out workflow and validation logic.',
    'Created Requisition Management system for employee material requests with item details tracking and mobile API integration for request submission and viewing.',
    'Extended Employee model with custom fields for Pakistan-specific requirements including CNIC/Passport tracking, accommodation type, and contribution eligibility flags (PF, EOBI, IESC) with automatic updates based on employment criteria.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'OneSignal API', 'REST APIs'],
  features: [
    'Employee Management with custom HRMS ID and status validation',
    'Pakistan-specific statutory contributions (PF, EOBI, IESC)',
    'Automatic contribution eligibility calculation',
    'Employee Letters generation system',
    'Salary Structure Assignment with custom allowances',
    'Custom Salary Slip processing with contribution integration',
    'Mobile API suite for employee self-service',
    'GPS-enabled attendance tracking',
    'Leave management and allocation tracking',
    'Overtime tracking with automatic salary calculation',
    'Salary Contribution Settings management',
    'Custom Salary Register Report',
    'Push notifications for attendance and reminders',
    'Driver check-in/out system',
    'Requisition request management',
    'Journal entry automation for employer contributions',
    'Employee self-approval workflow for attendance',
    'Bank details tracking (CNIC, Account Number, IBAN)',
    'Employment type and gender-based contribution rules',
    'Age-based eligibility restrictions for contributions',
    'Months-after-joining eligibility criteria',
    'Mobile authentication and profile management',
    'Attendance statistics and reporting',
    'Salary slip viewing via mobile APIs'
  ]
},
'guard-shift-management': {
  title: 'Shift Management Solution (Frappe App)',
  icon: '🛡️',
  description:
    'Comprehensive shift and roster management system built on Frappe/ERPNext for a UK security guard company, managing employee and subcontractor shifts, site assignments, attendance tracking, timesheet processing, license management, and automated billing integration with Sales Invoices.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed Roster Management system with support for both employees and subcontractors, featuring shift start/end time tracking, hours calculation, attendance status management (Present, Absent, On Leave, Half Day, Work From Home), and late entry/early exit flagging for compliance monitoring.',
    'Implemented Site Management system with UK-specific fields including post codes, site addresses, contact information, trained guard requirements, and service item mapping for automated invoice generation and customer relationship management.',
    'Built Guard Type Management system supporting multiple guard type assignments per employee (primary, 2nd, and 3rd guard types) with license expiry date tracking for each type, ensuring compliance with UK security licensing requirements.',
    'Created Employee Timesheet system with UK banking integration including sort code, account number, and bank account title tracking, supporting detailed shift breakdowns with site, customer, date, time, hours, rate, and amount calculations for payroll processing.',
    'Developed automated Sales Invoice integration allowing bulk roster data fetching by customer and date range, with automatic item mapping, rate calculation from price lists, quantity calculation from shift hours, and income account assignment for streamlined billing workflows.',
    'Implemented Weekly Report and Timesheet Weekending Report systems with site-wise grouping, employee shift details, total hours calculation, and customer-based filtering for operational analysis and client reporting.',
    'Extended Employee model with custom fields for UK security industry requirements including SL (Security License) number tracking, multiple guard type assignments, license expiry dates, per-hour salary rates, and UK bank account details (sort code, account number, bank account title).',
    'Built Roster Category system for organizing and categorizing different types of shifts and assignments, enabling better workforce planning and reporting capabilities.',
    'Created custom Attendance integration with site name tracking, SL number display, shift start/end time fields, and automatic roster linking for seamless attendance-to-roster workflow.',
    'Developed customer-wise roster data API with date range filtering, price list integration, and automatic item-to-roster mapping for efficient invoice generation from submitted roster records.',
    'Implemented submittable Roster workflow with document status tracking (Draft, Submitted, Cancelled), enabling proper approval processes and preventing modifications to finalized shift records.',
    'Built automatic hours calculation based on shift start and end times, with support for flexible shift patterns and overtime tracking for accurate payroll processing.',
    'Created integration with ERPNext\'s standard Shift Type, Leave Application, and Attendance Request modules, ensuring seamless workflow with existing HR and attendance management systems.',
    'Extended Sales Invoice Item with custom roster linking, shift start/end time display, and automatic data population from roster records for transparent billing and audit trails.',
    'Developed comprehensive reporting system with site-based grouping, employee-wise shift tracking, date range filtering, and total hours aggregation for operational insights and client billing verification.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'REST APIs', 'Query Builder'],
  features: [
    'Roster Management with employee and subcontractor support',
    'Shift start/end time tracking and hours calculation',
    'Attendance status management (Present, Absent, On Leave, Half Day, Work From Home)',
    'Late entry and early exit tracking',
    'Site Management with UK post codes and addresses',
    'Guard Type Management with multiple assignments per employee',
    'License expiry date tracking for compliance',
    'SL (Security License) number tracking',
    'Employee Timesheet with UK banking details',
    'Sort code, account number, and bank account title tracking',
    'Automated Sales Invoice integration from roster data',
    'Customer-wise roster data fetching',
    'Price list integration for automatic rate calculation',
    'Weekly Report with site-wise grouping',
    'Timesheet Weekending Report',
    'Roster Category management',
    'Submittable roster workflow with status tracking',
    'Custom fields for UK security industry requirements',
    'Integration with ERPNext Shift Type, Leave, and Attendance modules',
    'Automatic item mapping from site services',
    'Hours-based quantity calculation for invoicing',
    'Income account assignment for accounting integration',
    'Date range filtering for reports and invoices',
    'Customer and site-based filtering',
    'Total hours aggregation in reports',
    'Trained guard requirement tracking',
    'Site contact information management',
    'Service item mapping for automated billing',
    'Document status tracking (Draft, Submitted, Cancelled)',
    'Roster-to-invoice workflow automation',
    'Employee and subcontractor payroll rate tracking'
  ]
},
'crystal-patisserie-oms': {
  title: 'Order Management System for Bakery (Frappe App)',
  icon: '🥐',
  description:
    'Comprehensive order management system built on Frappe/ERPNext for Crystal Patisserie bakery in the UK, managing sales orders, order status tracking, delivery date filtering, item group-based filtering, and RESTful API integration for real-time order updates and retrieval.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed custom order status tracking system on Sales Orders with status validation, completion tracking, and automatic filtering of completed orders from active order lists.',
    'Built RESTful API endpoints for order management including order status updates, paginated order retrieval, and filtered order queries with support for guest access and proper HTTP status code handling.',
    'Implemented order status update API endpoint with validation for order existence, completion status checks, and secure status updates with proper error handling and response formatting.',
    'Created paginated sales order retrieval API with configurable page size, total records tracking, total pages calculation, and comprehensive order data serialization excluding internal system fields.',
    'Developed filtered sales order API with advanced filtering capabilities including delivery date-based filtering (number of days from current date), item group-based filtering, and combination of both filters for precise order queries.',
    'Extended Sales Order doctype with custom order status field (custom_order_status) for tracking order lifecycle states including completion status and preventing updates to already completed orders.',
    'Implemented recursive field exclusion system for API responses to remove internal system fields (creation, modified, docstatus, etc.) from nested order data structures for clean API responses.',
    'Built comprehensive error handling with proper HTTP status codes (200, 400, 404, 405, 500) and structured error messages for all API endpoints with exception catching and user-friendly error responses.',
    'Created order filtering logic that supports filtering by target delivery date calculated from number of days parameter, enabling bakery staff to view orders due on specific future dates.',
    'Developed item group-based filtering system that allows filtering orders containing specific product categories (e.g., cakes, pastries, breads) for specialized production planning and inventory management.',
    'Implemented pagination metadata in API responses including total records count, total pages calculation using ceiling division, current page number, and page size for frontend pagination controls.',
    'Built order data serialization system that converts Frappe document objects to dictionaries while preserving nested structures (items, customer details, delivery information) for complete order information retrieval.',
    'Created API response standardization with consistent response structure including success/error keys, descriptive messages, and data payloads for uniform frontend integration.',
    'Extended Sales Order queries with docstatus filtering to only retrieve submitted orders, ensuring data integrity and preventing access to draft or cancelled orders through the API.',
    'Developed order completion tracking system that prevents status updates to completed orders and automatically excludes completed orders from active order lists for streamlined workflow management.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'REST APIs', 'HTTP Status Codes', 'JSON'],
  features: [
    'Custom order status tracking on Sales Orders',
    'RESTful API endpoints for order management',
    'Order status update API with validation',
    'Paginated order retrieval with metadata',
    'Delivery date-based order filtering',
    'Item group-based order filtering',
    'Combined filter support (date + item group)',
    'Order completion status tracking',
    'Automatic exclusion of completed orders',
    'Recursive field exclusion for clean API responses',
    'Comprehensive error handling with HTTP status codes',
    'Guest-accessible API endpoints',
    'Order data serialization with nested structures',
    'Pagination metadata (total records, pages, current page)',
    'Order existence and status validation',
    'Prevention of updates to completed orders',
    'Structured API response format',
    'Support for submitted orders only (docstatus filtering)',
    'Configurable page size for pagination',
    'Target delivery date calculation from days parameter',
    'Item group filtering within order items',
    'Exception handling with user-friendly error messages',
    'Order lifecycle management',
    'Real-time order status updates',
    'Production planning support through filtering'
  ]
},
'teller-automated-teller': {
  title: 'Automated Teller System (Frappe App)',
  icon: '🏦',
  description:
    'Comprehensive banking transaction management system built on Frappe/ERPNext for automated teller operations, handling customer deposits, withdrawals, real-time balance tracking, automatic accounting integration with GL entries, and overdraft prevention with balance validation.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed Transaction Management system with custom naming series (Beso-{transaction_type}-{####}), support for Deposit and Withdrawal transaction types, customer account linking, and automatic balance calculation with real-time updates.',
    'Implemented automatic General Ledger (GL) Entry creation on transaction submission with proper debit/credit handling, party accounting integration, fiscal year tracking, and cost center assignment for complete accounting integration.',
    'Built balance validation system preventing overdrafts by checking available balance before allowing withdrawals, with real-time balance calculation based on submitted deposits and withdrawals, and user-friendly error messages for insufficient funds.',
    'Created reverse GL Entry system for transaction cancellation with automatic debit/credit reversal, proper voucher tracking, and cancellation markers to maintain accurate accounting records when transactions are cancelled.',
    'Extended Customer model with custom Customer Account field for linking customers to their bank accounts, enabling seamless account selection and balance tracking per customer-account combination.',
    'Developed real-time balance calculation API (get_customer_balance) supporting both account-specific and aggregate balance queries, calculating net balance from all submitted deposits and withdrawals with proper filtering.',
    'Implemented dynamic account filtering in transaction forms based on transaction type, restricting account selection to Bank and Cash account types from Asset root type, ensuring only valid accounts are used for transactions.',
    'Created custom Teller Workspace dashboard with shortcuts for quick access to Deposits, Withdrawals, and All Transactions views, with color-coded shortcuts (Green for Deposits, Red for Withdrawals, Blue for All Transactions) for improved user experience.',
    'Built automatic account fetching from customer account field, streamlining transaction entry by pre-populating account information based on customer selection, reducing manual data entry and potential errors.',
    'Implemented submittable workflow for transactions ensuring data integrity, with proper validation before submission, automatic GL entry creation on submit, and reverse entry creation on cancellation.',
    'Developed JavaScript client-side validation and balance updates, automatically fetching and displaying available balance when customer, account, or transaction type changes, providing immediate feedback to users.',
    'Created comprehensive GL Entry structure with proper accounting fields including posting date, account, party type, party, voucher tracking, against account, debit/credit amounts, currency, exchange rate, fiscal year, and cost center for complete financial record keeping.',
    'Extended transaction form with automatic date population, description field for transaction notes, currency selection, and read-only available balance display for withdrawal transactions, improving user experience and data accuracy.',
    'Implemented proper fiscal year detection based on transaction date, ensuring GL entries are posted to the correct accounting period with automatic fiscal year lookup based on date ranges.',
    'Built default debtor account integration, automatically fetching company default receivable account for proper party accounting, ensuring all transactions are properly linked to customer accounts in the accounting system.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'JSON', 'Jinja2', 'REST APIs'],
  features: [
    'Transaction Management (Deposits/Withdrawals)',
    'Custom naming series with transaction type prefix',
    'Real-time balance calculation and display',
    'Overdraft prevention with balance validation',
    'Automatic GL Entry creation on submit',
    'Reverse GL Entry creation on cancel',
    'Customer account linking and management',
    'Dynamic account filtering (Bank/Cash accounts)',
    'Submittable transaction workflow',
    'Custom Teller Workspace dashboard',
    'Color-coded transaction shortcuts',
    'Real-time balance API endpoint',
    'Account-specific and aggregate balance queries',
    'Automatic account fetching from customer',
    'Fiscal year detection and assignment',
    'Cost center integration',
    'Party accounting with customer linking',
    'Currency support for multi-currency transactions',
    'Transaction description and notes',
    'Automatic date population',
    'Voucher tracking and against account linking',
    'Company default account integration'
  ]
},
'common-party-ledger': {
  title: 'Common Party Ledger (Frappe App)',
  icon: '📊',
  description:
    'Unified ledger reporting system built on Frappe/ERPNext for businesses dealing with parties that act as both customers and suppliers, aggregating all transactions from both roles into a single comprehensive view with opening balance, running balance, and ending balance calculations.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed unified ledger report system that aggregates transactions from parties acting as both customers and suppliers, solving the ERPNext limitation where buying and selling transactions are treated separately, enabling businesses to view all party transactions in one consolidated report.',
    'Implemented Party Link integration to connect customer and supplier records for the same business entity, automatically fetching primary and secondary party information, and supporting dual-role party accounting with proper role-based transaction filtering.',
    'Built comprehensive transaction aggregation system that combines GL entries from both customer and supplier roles, filtering transactions by date range, excluding cancelled entries, and maintaining chronological order for accurate financial reporting.',
    'Created opening balance calculation system that sums debit and credit amounts from all transactions before the selected date range for both primary and secondary parties, providing accurate starting balance for the unified ledger view.',
    'Developed running balance calculation algorithm that processes transactions chronologically, calculating cumulative balance after each transaction entry, ensuring accurate real-time balance tracking across all party transactions.',
    'Implemented ending balance calculation that displays the final balance after all transactions in the selected period, providing clear financial position summary for parties with dual customer-supplier relationships.',
    'Built dynamic filter system with Party Link selection that automatically populates party information, date range filtering with default values (last month to today), and company-based filtering for multi-company environments.',
    'Created JavaScript client-side enhancements with automatic party field population based on Party Link selection, read-only party display for data integrity, and dynamic filter dependencies for improved user experience.',
    'Developed comprehensive report columns including posting date, account, party type, party name, voucher type, voucher number, debit/credit amounts, running balance, and remarks for complete transaction visibility.',
    'Implemented transaction sorting system that orders all entries chronologically by posting date, ensuring proper sequence for balance calculations and providing clear transaction timeline for financial analysis.',
    'Built opening and ending balance row insertion system that adds summary rows at the beginning and end of the report, clearly displaying starting balance, transaction details, and final balance for easy financial reconciliation.',
    'Created validation system that ensures Party Link selection is mandatory before report execution, preventing incomplete queries and ensuring accurate data aggregation for unified ledger reporting.',
    'Developed SQL query optimization for efficient GL Entry retrieval, filtering by party type, party name, date range, and cancellation status, with proper indexing support for fast report generation on large datasets.',
    'Implemented multi-party balance aggregation that combines opening balances from both primary and secondary parties, ensuring accurate starting point for unified ledger calculations when parties have existing balances in both roles.',
    'Built flexible date range filtering with default values set to last month, allowing users to quickly view recent transactions or customize date ranges for historical analysis and period-specific financial reporting.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'MariaDB', 'SQL', 'JSON', 'Jinja2'],
  features: [
    'Unified ledger for dual-role parties (Customer & Supplier)',
    'Party Link integration and management',
    'Opening balance calculation and display',
    'Running balance calculation per transaction',
    'Ending balance summary',
    'Chronological transaction sorting',
    'Date range filtering with defaults',
    'Company-based filtering',
    'Dynamic party field population',
    'GL Entry aggregation from both roles',
    'Cancelled entry exclusion',
    'Comprehensive transaction columns',
    'Voucher type and number tracking',
    'Debit/Credit amount display',
    'Account-level transaction details',
    'Remarks and notes display',
    'Multi-party balance aggregation',
    'SQL-optimized query performance',
    'Role-based access control',
    'Read-only party field for data integrity',
    'Automatic filter dependencies',
    'Transaction timeline visualization',
    'Financial reconciliation support',
    'Period-specific reporting'
  ]
},
'billecta-integration': {
  title: 'Billecta Integration (Frappe App)',
  icon: '🔗',
  description:
    'Enterprise-grade bi-directional integration system built on Frappe/ERPNext that seamlessly synchronizes customer (debtor) data between ERPNext and Billecta debt collection platform, enabling real-time data consistency across systems for Swedish businesses managing accounts receivable and debt collection operations.',
  role: 'Full Stack Frappe Developer',
  githubLink: '#',
  liveDemoLink: '#',
  details: [
    'Developed comprehensive bi-directional integration system between ERPNext/Frappe and Billecta debt collection platform, enabling seamless synchronization of customer (debtor) records across both systems, eliminating manual data entry and ensuring real-time data consistency for Swedish businesses managing accounts receivable.',
    'Implemented automatic customer creation in Billecta when new customers are created in Frappe, with automatic mapping of customer data including organization numbers, VAT numbers, addresses, contact information, and customer type (Individual/Company) to Billecta\'s debtor format, ensuring immediate availability in debt collection workflows.',
    'Built automatic customer update mechanism that synchronizes changes made in Frappe to corresponding debtor records in Billecta, maintaining data consistency across both platforms and ensuring debt collection operations always have access to the latest customer information.',
    'Developed comprehensive webhook system to receive real-time updates from Billecta, handling DebtorCreated, DebtorUpdated, and DebtorDeleted events, allowing Frappe to automatically reflect changes made in Billecta, creating true bi-directional synchronization between platforms.',
    'Created sophisticated field mapping system that translates between Frappe Customer structure and Billecta Debtor format, handling complex mappings including customer type conversion (Private/Company ↔ Individual/Company), country codes, citizenship codes, and Swedish-specific fields like OrgNo (organization number).',
    'Implemented extensive custom field system on Customer doctype with dedicated Billecta tab, adding 20+ custom fields including DebtorPublicId, OrgNo, VAT Number, Citizenship Country Code, GLN, Protected Identity flags, and comprehensive address fields, enabling full support for Billecta\'s debtor data requirements.',
    'Built timezone-aware conflict prevention system that prevents update loops by tracking modification timestamps and implementing time-based update logic (3-minute threshold), ensuring updates from Billecta don\'t trigger unnecessary updates back to Billecta when recent changes were made in Frappe.',
    'Developed secure authentication system using Basic Auth with Base64-encoded credentials stored in Billecta Integration settings, supporting configurable API credentials that can be updated without code changes, with validation to ensure credentials are present before API calls.',
    'Created robust error handling and logging system that captures all API interactions, webhook events, and synchronization activities, providing comprehensive audit trail for troubleshooting and ensuring data integrity across integration workflows.',
    'Implemented PublicId tracking system that stores Billecta\'s unique debtor identifier in custom_debtor_public_id field, enabling efficient record matching and preventing duplicate creation, ensuring one-to-one relationship between Frappe customers and Billecta debtors.',
    'Built webhook event handlers for each event type (DebtorCreated, DebtorUpdated, DebtorDeleted), with proper exception handling, transaction rollback on errors, and cache clearing to ensure UI reflects latest data after webhook processing.',
    'Developed DebtorExternalId system that uses Frappe customer name as external identifier in Billecta, enabling Billecta to reference Frappe records and providing traceability between systems for audit and reconciliation purposes.',
    'Created automatic customer record creation from Billecta webhooks with intelligent duplicate prevention, checking for existing records by PublicId before creation, and properly mapping all Billecta debtor fields to corresponding Frappe custom fields.',
    'Implemented comprehensive data mapping that handles Swedish business requirements including OrgNo validation, country code standards (SE for Sweden), payment method information, Autogiro (Swedish direct debit) details, and Swedish-specific address formatting.',
    'Built flexible sync control mechanism with should_sync_with_billecta() function that validates credentials before API calls, allowing easy enable/disable of integration functionality and preventing API errors when credentials are not configured.',
    'Developed proper document lifecycle management that respects Frappe document states, ignoring Guest user creations to prevent system-initiated duplicates, and handling document modifications properly through on_update hooks with change detection.',
    'Created comprehensive API response handling that extracts PublicId from successful creation responses, automatically updating customer records with Billecta identifiers, and providing user-friendly success/error messages for manual operations.',
    'Implemented multi-field update tracking in update_customer_in_billecta() function that checks for relevant field changes before initiating API calls, optimizing API usage and preventing unnecessary synchronization when non-relevant fields are modified.'
  ],
  technologies: ['Frappe Framework', 'ERPNext', 'Python', 'JavaScript', 'REST API', 'Webhooks', 'JSON', 'Base64 Authentication', 'Timezone Handling', 'MariaDB'],
  features: [
    'Bi-directional customer/debtor synchronization',
    'Automatic customer creation in Billecta',
    'Automatic customer updates in Billecta',
    'Webhook integration for real-time updates',
    'DebtorCreated event handling',
    'DebtorUpdated event handling',
    'DebtorDeleted event handling',
    'Comprehensive field mapping system',
    'Customer type conversion (Private/Company ↔ Individual/Company)',
    '20+ custom fields on Customer doctype',
    'Dedicated Billecta tab in Customer form',
    'DebtorPublicId tracking and storage',
    'DebtorExternalId for cross-system reference',
    'OrgNo (Swedish organization number) support',
    'VAT Number mapping',
    'Country code and citizenship code mapping',
    'Address field mapping (Address, Address2, ZipCode, City)',
    'Contact information sync (Name, Email, Phone, ContactName, ContactEmail)',
    'Protected Identity flag support',
    'Protected Mail Delivery flag support',
    'GLN (Global Location Number) support',
    'Notes/Remarks synchronization',
    'Timezone-aware conflict prevention',
    '3-minute update threshold for loop prevention',
    'Basic Authentication with Base64 encoding',
    'Configurable API credentials',
    'Comprehensive error handling and logging',
    'Transaction rollback on errors',
    'Cache clearing after updates',
    'Duplicate prevention by PublicId',
    'Guest user filtering',
    'Change detection before API calls',
    'API response parsing and PublicId extraction',
    'User-friendly success/error messaging',
    'Swedish business compliance (OrgNo, SEK currency)',
    'Autogiro payment method support',
    'DebtorNo tracking',
    'Attention and CareOf field support',
    'Multi-language support preparation',
    'Database transaction management',
    'Permission-aware operations (ignore_permissions)',
    'Frappe document lifecycle integration',
    'Webhook security (whitelisted endpoints)',
    'Event-based architecture',
    'Audit trail through error logging'
  ]
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
          <div class="glass-card p-6 rounded-2xl fade-in-on-scroll group relative z-10" data-project="${projectId}" style="animation-delay: ${delay}s">
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