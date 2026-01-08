// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

// Portfolio filter function
function filterPortfolio(category) {
    const cards = document.querySelectorAll('.portfolio-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('filter-btn-active'));
    
    // Corecție: Folosim window.event pentru a identifica butonul apăsat
    if (window.event && window.event.target) {
        window.event.target.classList.add('filter-btn-active');
    }
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearSpace = document.getElementById('currentYear');
    if (currentYearSpace) {
        currentYearSpace.textContent = new Date().getFullYear();
    }
    
    // Contact form submission
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Trimitem datele către Formspree folosind FETCH
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Dacă totul e ok, ascundem formularul și arătăm succesul
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'flex';
                    contactForm.reset();
                } else {
                    throw new Error('Oops! A apărut o problemă la trimitere.');
                }
            })
            .catch(error => {
                errorMessage.textContent = 'Eroare! Te rugăm să ne contactezi direct la contact@hallen.ro';
                errorMessage.style.display = 'block';
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Opțional: revenim la formular după 5 secunde
                if (successMessage.style.display === 'flex') {
                    setTimeout(() => {
                        contactForm.style.display = 'flex';
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            });
        });
    }
    
    // Add scroll animation for header
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 255, 209, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
        
        lastScroll = currentScroll;
    });
});

