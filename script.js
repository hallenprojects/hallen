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
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            // Corecție: Am scos backslash-ul de la [type="submit"]
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send form data using fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'flex';
                
                // Reset form and show it again after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'flex';
                    successMessage.style.display = 'none';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 3000);
            })
            .catch(error => {
                // Show error message
                errorMessage.textContent = 'Failed to send message. Please try again or contact us directly at contact@hallen.ro';
                errorMessage.style.display = 'block';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide error after 5 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
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
