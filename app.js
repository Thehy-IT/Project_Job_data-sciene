// Data Science VN Application JavaScript - Fixed Version

// Application data
const appData = {
  salaryData: [
    {"position": "Data Scientist", "startSalary": 15, "avgSalary": 30, "highSalary": 50, "experience": 2},
    {"position": "Data Engineer", "startSalary": 12, "avgSalary": 25, "highSalary": 40, "experience": 1},
    {"position": "Data Analyst", "startSalary": 8, "avgSalary": 15, "highSalary": 25, "experience": 0},
    {"position": "ML Engineer", "startSalary": 17, "avgSalary": 35, "highSalary": 60, "experience": 3},
    {"position": "AI Engineer", "startSalary": 12, "avgSalary": 25, "highSalary": 42.5, "experience": 2}
  ],
  comparisonData: [
    {
      "position": "Data Scientist",
      "description": "Phân tích dữ liệu, xây dựng mô hình ML, đưa ra insights kinh doanh",
      "skills": "Python, R, SQL, Statistics, ML, Storytelling",
      "salary": 30,
      "experience": 2,
      "career": "Cao"
    },
    {
      "position": "Data Engineer", 
      "description": "Xây dựng pipeline dữ liệu, ETL, quản lý hạ tầng dữ liệu",
      "skills": "Python, SQL, Spark, Kafka, Docker, Cloud",
      "salary": 25,
      "experience": 1,
      "career": "Cao"
    },
    {
      "position": "Data Analyst",
      "description": "Phân tích dữ liệu, tạo báo cáo, dashboard, KPIs", 
      "skills": "SQL, Excel, Power BI, Tableau, Python cơ bản",
      "salary": 15,
      "experience": 0,
      "career": "Trung bình"
    },
    {
      "position": "ML Engineer",
      "description": "Thiết kế và triển khai mô hình machine learning",
      "skills": "Python, TensorFlow, PyTorch, MLOps, Statistics", 
      "salary": 35,
      "experience": 3,
      "career": "Cao"
    },
    {
      "position": "AI Engineer",
      "description": "Phát triển ứng dụng AI, deep learning, computer vision",
      "skills": "Python, Deep Learning, Computer Vision, NLP",
      "salary": 25, 
      "experience": 2,
      "career": "Cao"
    }
  ]
};

// DOM elements
let navToggle, navMenu, positionFilter, salaryTableBody, comparisonTableBody;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Data Science VN App...');
  initializeElements();
  setupEventListeners();
  populateTables();
  handleNavigation();
  setupScrollEffects();
});

// Initialize DOM elements
function initializeElements() {
  navToggle = document.getElementById('nav-toggle');
  navMenu = document.getElementById('nav-menu');
  positionFilter = document.getElementById('positionFilter');
  salaryTableBody = document.getElementById('salaryTableBody');
  comparisonTableBody = document.getElementById('comparisonTableBody');
  
  console.log('Elements initialized:', {
    navToggle: !!navToggle,
    navMenu: !!navMenu,
    positionFilter: !!positionFilter,
    salaryTableBody: !!salaryTableBody,
    comparisonTableBody: !!comparisonTableBody
  });
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMobileMenu();
    });
  }

  // Position filter
  if (positionFilter) {
    positionFilter.addEventListener('change', function() {
      filterSalaryTable();
    });
  }

  // Navigation links smooth scrolling
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      handleNavClick(e);
    });
  });

  // CTA Button - Explore Now
  const ctaButton = document.querySelector('.hero-section .btn--primary');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const overviewSection = document.getElementById('overview');
      if (overviewSection) {
        smoothScrollTo(overviewSection);
      }
    });
  }

  // Scroll event for active nav highlighting
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  if (navMenu) {
    navMenu.classList.toggle('active');
    
    // Update toggle icon
    const icon = navToggle.querySelector('i');
    if (icon) {
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    }
  }
}

// Smooth scroll to element
function smoothScrollTo(targetElement) {
  if (targetElement) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;
    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Handle navigation link clicks
function handleNavClick(e) {
  const targetId = e.target.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  console.log('Navigation clicked:', targetId, 'Element found:', !!targetElement);
  
  if (targetElement) {
    smoothScrollTo(targetElement);
    
    // Update active nav link immediately
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
  }
  
  // Close mobile menu if open
  if (navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-bars';
    }
  }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;
  const scrollPosition = window.pageYOffset + navbarHeight + 100;
  
  let activeSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      activeSection = section.getAttribute('id');
    }
  });
  
  if (activeSection) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// Populate tables with data
function populateTables() {
  populateSalaryTable();
  populateComparisonTable();
}

// Populate salary table
function populateSalaryTable(filterValue = 'all') {
  if (!salaryTableBody) return;
  
  const filteredData = filterValue === 'all' 
    ? appData.salaryData 
    : appData.salaryData.filter(item => item.position === filterValue);
  
  salaryTableBody.innerHTML = '';
  
  filteredData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.position}</strong></td>
      <td>${item.startSalary}</td>
      <td>${item.avgSalary}</td>
      <td>${item.highSalary}</td>
      <td>${item.experience}</td>
    `;
    salaryTableBody.appendChild(row);
  });
  
  console.log('Salary table populated with', filteredData.length, 'items');
}

// Filter salary table based on position
function filterSalaryTable() {
  if (!positionFilter) return;
  
  const filterValue = positionFilter.value;
  console.log('Filtering salary table by:', filterValue);
  
  populateSalaryTable(filterValue);
  
  // Add animation effect
  const table = document.getElementById('salaryTable');
  if (table) {
    table.style.opacity = '0.7';
    table.style.transform = 'translateY(10px)';
    setTimeout(() => {
      table.style.opacity = '1';
      table.style.transform = 'translateY(0)';
    }, 200);
  }
}

// Populate comparison table
function populateComparisonTable() {
  if (!comparisonTableBody) return;
  
  comparisonTableBody.innerHTML = '';
  
  appData.comparisonData.forEach(item => {
    const row = document.createElement('tr');
    
    // Create career opportunity status badge
    const careerStatus = item.career === 'Cao' 
      ? '<span class="status status--high">Cao</span>'
      : '<span class="status status--medium">Trung bình</span>';
    
    row.innerHTML = `
      <td><strong>${item.position}</strong></td>
      <td>${item.description}</td>
      <td>${item.skills}</td>
      <td>${item.salary}</td>
      <td>${item.experience} năm</td>
      <td>${careerStatus}</td>
    `;
    comparisonTableBody.appendChild(row);
  });
  
  console.log('Comparison table populated with', appData.comparisonData.length, 'items');
}

// Handle navigation and scrolling effects
function handleNavigation() {
  setupScrollEffects();
}

// Setup scroll effects for navbar
function setupScrollEffects() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    });
  }
}

// Utility function: Throttle
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Add scroll-to-top functionality
function addScrollToTop() {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollButton.className = 'scroll-to-top';
  scrollButton.setAttribute('aria-label', 'Cuộn lên đầu trang');
  
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #16a34a);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    transition: all 0.3s ease;
    z-index: 999;
  `;
  
  document.body.appendChild(scrollButton);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollButton.style.display = 'flex';
    } else {
      scrollButton.style.display = 'none';
    }
  });
  
  // Scroll to top when clicked
  scrollButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add animation to elements when they come into view
function setupIntersectionObserver() {
  const elementsToAnimate = document.querySelectorAll('.card, .chart-image, .overview-card, .skills-category-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 50);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });
    
    elementsToAnimate.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    addScrollToTop();
    setupIntersectionObserver();
  }, 500);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Handle Escape key to close mobile menu
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-bars';
    }
  }
});

// Enhanced mobile menu functionality
function enhanceMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    // Ensure mobile menu is properly styled
    navMenu.style.transition = 'all 0.3s ease';
    
    // Add click event to each nav link in mobile menu
    const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Close mobile menu when a link is clicked
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });
  }
}

// Initialize enhanced mobile menu
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(enhanceMobileMenu, 100);
});