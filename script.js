document.addEventListener('DOMContentLoaded', function() {
    // Select all dropdown toggle links
    var dropdownToggles = document.querySelectorAll('.nav-item.dropdown .nav-link.dropdown-toggle');

    // Add click event listener to each toggle
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(event) {
            // Prevent the default anchor action
            event.preventDefault();

            // Find the parent .dropdown element
            var dropdown = this.parentElement;

            // Toggle the .show class on the .dropdown-menu
            var dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            } else {
                // Close other dropdowns by removing 'show' from any .dropdown-menu that has it
                document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show').forEach(function(openMenu) {
                    openMenu.classList.remove('show');
                });

                // Show this dropdownMenu
                dropdownMenu.classList.add('show');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.nav-item.dropdown .nav-link.dropdown-toggle')) {
            document.querySelectorAll('.nav-item.dropdown .dropdown-menu.show').forEach(function(openMenu) {
                openMenu.classList.remove('show');
            });
        }
    });
});





// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Form Submission Event Listener
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        
        // Form validation
        var name = document.getElementById('Ad-Soyad').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var subject = document.getElementById('konu').value;

        if (!name || !email || !phone || !subject) {
            alert('Lütfen tüm alanları doldurun.');
        } else {
            // Here you can add an AJAX request to send the form data to a server without reloading the page
            console.log('Form Submitted', {name, email, phone, subject});
            alert('Formunuz başarıyla gönderildi. Teşekkür ederiz!');
            // Reset form after submission
            document.getElementById('form').reset();
        }
    });

    // Smooth Scroll for Navbar Links (If needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Additional custom JavaScript can be added here
});
