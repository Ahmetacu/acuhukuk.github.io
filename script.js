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
      preloadImage('/images/ist2-696.webp');
    } else if (window.innerWidth < 780) {
      preloadImage('/images/ist2-1116.webp');
    } else if (window.innerWidth < 1000) {
      preloadImage('/images/ist2-1392.webp');
    } else if (window.innerWidth < 1200) {
      preloadImage('/images/ist2-1650.webp');
    } else if (window.innerWidth < 1400) {
      preloadImage('/images/ist2-1872.webp');
    } else {
      preloadImage('/images/ist2-2048.webp');
    }
  }
  
  // Sayfa yüklenirken ve pencere boyutu değiştiğinde fonksiyonu çağır
  window.addEventListener('load', updateBackgroundPreload);
  window.addEventListener('resize', updateBackgroundPreload);
  
  // Araçlar JS
  // Araç Değer Kaybı JS
  function formatInput(input) {
    const value = input.value.replace(/\D/g, "");
    input.value = new Intl.NumberFormat('tr-TR').format(value);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value).replace('TRY', '').trim();
}

function calculateDepreciation() {
    const ageFactor = parseFloat(document.getElementById('age').value);
    const marketValue = parseFloat(document.getElementById('marketValue').value.replace(/\./g, ''));
    const mileageFactor = parseFloat(document.getElementById('mileage').value);
    const damageRatio = parseFloat(document.getElementById('damageRatio').value) / 100;

    if (!marketValue || !damageRatio) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    // Mevzuattaki formül uygulanıyor
    const depreciation = marketValue * damageRatio * ageFactor * mileageFactor;

    // Sonucu ekrana yazdır
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<strong>Hesaplanan Tahmini Değer Kaybı:</strong> ${formatCurrency(depreciation)}`;
}

