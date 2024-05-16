document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown toggles and smooth scroll for links
    initDropdownToggles();
    initSmoothScroll();
  });
  
  function initDropdownToggles() {
    var dropdownToggles = document.querySelectorAll('.nav-item.dropdown .nav-link.dropdown-toggle');
  
    // Add click event listener to each toggle for dropdown functionality
    dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor click behavior
        var dropdown = this.parentElement; // Get parent element
        var dropdownMenu = dropdown.querySelector('.dropdown-menu'); // Find dropdown menu
        toggleDropdown(dropdownMenu); // Toggle dropdown visibility
      });
    });
  
    // Close all dropdowns when clicking outside of them
    document.addEventListener('click', function(event) {
      if (!event.target.matches('.nav-item.dropdown .nav-link.dropdown-toggle')) {
        closeAllDropdowns();
      }
    });
  }
  
  function toggleDropdown(dropdownMenu) {
    // Close any open dropdown menus
    document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show').forEach(function(openMenu) {
      openMenu.classList.remove('show');
    });
    // Toggle the current dropdown menu
    dropdownMenu.classList.toggle('show');
  }
  
  function closeAllDropdowns() {
    // Close all dropdown menus
    document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show').forEach(function(openMenu) {
      openMenu.classList.remove('show');
    });
  }
  
  function initSmoothScroll() {
    // Apply smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        // Smoothly scroll to the target element
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }
  
  function preloadImage(imagePath) {
    var img = new Image();
    img.src = imagePath;
  }
  
  function updateBackgroundPreload() {
    if (window.innerWidth < 580) {
      preloadImage('/images/ist2-696.jpg');
    } else if (window.innerWidth < 780) {
      preloadImage('/images/ist2-1116.jpg');
    } else if (window.innerWidth < 1000) {
      preloadImage('/images/ist2-1392.jpg');
    } else if (window.innerWidth < 1200) {
      preloadImage('/images/ist2-1650.jpg');
    } else if (window.innerWidth < 1400) {
      preloadImage('/images/ist2-1872.jpg');
    } else {
      preloadImage('/images/ist2-2048.jpg');
    }
  }
  
  // Sayfa yüklenirken ve pencere boyutu değiştiğinde fonksiyonu çağır
  window.addEventListener('load', updateBackgroundPreload);
  window.addEventListener('resize', updateBackgroundPreload);
  