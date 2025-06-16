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
        } else {
            imagePath = '/images/ist2-1116.webp';
        }
        
        const img = new Image();
        img.onerror = () => {
            console.warn(`Görsel yüklenemedi: ${imagePath}`);
            const fallbackPath = '/images/ist2-696.webp';
            img.src = fallbackPath;
        };
        img.src = imagePath;
        return img.decode().catch(error => {
            console.warn(`Görsel kodlanamadı: ${imagePath}`, error);
        });
    };

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            preloadImages();
        }, 250);
    });

    preloadImages();
}
  
function preloadImage(imagePath) {
    const img = new Image();
    img.onerror = () => {
        console.warn(`Görsel yüklenemedi: ${imagePath}`);
        const fallbackPath = '/images/ist2-696.webp';
        img.src = fallbackPath;
    };
    img.src = imagePath;
}
  
function updateBackgroundPreload() {
    if (window.innerWidth < 580) {
        preloadImage('/images/ist2-696.webp');
    } else if (window.innerWidth < 780) {
        preloadImage('/images/ist2-1116.webp');
    } else {
        preloadImage('/images/ist2-1116.webp');
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
// İHBAR TAZMİNATI HESAPLAMA
  function diffInMonths(date1, date2) {
      let years = date2.getFullYear() - date1.getFullYear();
      let months = date2.getMonth() - date1.getMonth();
      let days = date2.getDate() - date1.getDate();

      if (days < 0) {
        months--;
        days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      return { years, months, days };
    }

    // Toplam çalışma süresine (ay) göre ihbar haftasını bul
    function getNoticeWeeks(totalMonths) {
      if (totalMonths < 6) return 2;      // 0-6 ay => 2 hafta
      if (totalMonths < 18) return 4;     // 6-18 ay => 4 hafta (1.5 yıl)
      if (totalMonths < 36) return 6;     // 18-36 ay => 6 hafta (3 yıl)
      return 8;                           // 3 yıldan uzun => 8 hafta
    }

    document.getElementById('calcForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const start = new Date(document.getElementById('startDate').value);
      const end = new Date(document.getElementById('endDate').value);

      if (end <= start) {
        alert('Çıkış tarihi, işe başlama tarihinden sonra olmalıdır.');
        return;
      }

      const diff = diffInMonths(start, end);
      const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

      const noticeWeeks = getNoticeWeeks(totalMonths);
      const noticeDays = noticeWeeks * 7;

      const gross = parseFloat(document.getElementById('grossSalary').value) || 0;
      const allowance = parseFloat(document.getElementById('allowance').value) || 0;
      const monthly = gross + allowance;     // Giydirilmiş aylık ücret
      const daily = monthly / 30;            // 30 günlük hesap
      const comp = daily * noticeDays;       // İhbar tazminatı

      document.getElementById('seniorityText').textContent = `${diff.years} yıl ${diff.months} ay ${diff.days} gün`;
      document.getElementById('noticeText').textContent = `${noticeWeeks} hafta (${noticeDays} gün)`;
      document.getElementById('compText').textContent = comp.toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      document.getElementById('resultBox').style.display = 'block';
    });