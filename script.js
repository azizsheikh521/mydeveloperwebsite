// ========================================================
// 1. HAMBURGER MOBILE ACTION LOGIC
// ========================================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}


// ========================================================
// 2. SECURE FORM VALIDATION & WEB3FORMS SUBMISSION INTERFACE
// ========================================================
const contactForm = document.getElementById('portfolio-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show immediate loading feedback status 
        formStatus.style.display = 'block';
        formStatus.className = 'form-status-msg'; 
        formStatus.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Encrypting parameters & transmitting...';

        // Extract internal submission data values
        const nameVal = document.getElementById('name').value.trim();
        const phoneVal = document.getElementById('phone').value.trim();
        const emailVal = document.getElementById('email').value.trim();
        const messageVal = document.getElementById('message').value.trim();

        // Regex setup structural check configuration configurations
        const phoneRegex = /^[0-9]{10}$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!phoneRegex.test(phoneVal)) {
            formStatus.className = 'form-status-msg error';
            formStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Transmission Failed: Enter a valid 10-digit mobile number.';
            return;
        }

        if (!emailRegex.test(emailVal)) {
            formStatus.className = 'form-status-msg error';
            formStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Transmission Failed: Enter a valid destination email structure.';
            return;
        }

        // Web3Forms payload parameters configuration pipeline setup
        const formData = new FormData();
        formData.append("access_key", "74880fb1-6e3a-4da2-8be9-e090f339cf01");
        formData.append("name", nameVal);
        formData.append("phone", phoneVal);
        formData.append("email", emailVal);
        formData.append("message", messageVal);

        // Instant safe AJAX fetch channel operations loop 
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status === 200 && res.success) {
                formStatus.className = 'form-status-msg success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Transmission Successful! Secure terminal data saved successfully.';
                contactForm.reset();
            } else {
                formStatus.className = 'form-status-msg error';
                formStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error: ' + res.message;
            }
        })
        .catch(error => {
            formStatus.className = 'form-status-msg error';
            formStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Transmission Interrupted: Check node network connections.';
        });
    });
}