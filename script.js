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
});
