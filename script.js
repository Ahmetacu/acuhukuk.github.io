document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown toggles and smooth scroll for links
    initDropdownToggles();
    initSmoothScroll();
    initImagePreload();
    
    // Sayfa yüklendiğinde arka plan önbelleğe alınır
    updateBackgroundPreload();
    
    // Performans için throttle ekleyelim
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                updateBackgroundPreload();
            }, 250);
        }
    });
});
  
function initDropdownToggles() {
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown .nav-link.dropdown-toggle');
  
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', async (event) => {
            event.preventDefault();
            const dropdown = toggle.parentElement;
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Close other dropdowns first
            await closeAllDropdowns();
            
            // Then toggle the current one
            dropdownMenu.classList.toggle('show');
        });
    });
  
    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.matches('.nav-item.dropdown .nav-link.dropdown-toggle')) {
            closeAllDropdowns();
        }
    });
}
  
async function closeAllDropdowns() {
    const openMenus = document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show');
    const promises = Array.from(openMenus).map(menu => {
        return new Promise(resolve => {
            menu.classList.remove('show');
            // Give time for any animations to complete
            setTimeout(resolve, 100);
        });
    });
    await Promise.all(promises);
}
  
function initSmoothScroll() {
    document.querySelector('body').addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
}
  
function initImagePreload() {
    const preloadImages = () => {
        const width = window.innerWidth;
        let imagePath;
        
        if (width < 580) {
            imagePath = '/images/ist2-696.webp';
        } else if (width < 780) {
            imagePath = '/images/ist2-1116.webp';
        } else if (width < 1000) {
            imagePath = '/images/ist2-1392.webp';
        } else if (width < 1200) {
            imagePath = '/images/ist2-1650.webp';
        } else if (width < 1400) {
            imagePath = '/images/ist2-1872.webp';
        } else {
            imagePath = '/images/ist2-2048.webp';
        }
        
        const img = new Image();
        img.src = imagePath;
        return img.decode(); // Returns a promise
    };

    // Debounce the resize event
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            preloadImages().catch(console.error);
        }, 250);
    });

    // Initial load
    preloadImages().catch(console.error);
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

