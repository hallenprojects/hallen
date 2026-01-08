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
    
    // Safety check for event target
    if (window.event) {
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
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
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
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send form data using fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
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
                } else {
                    throw new Error('Response not ok');
                }
            })
            .catch(error => {
                // Show error message
                errorMessage.textContent = 'Failed to send message. Please try again or contact us directly.';
                errorMessage.style.display = 'block';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            });
        });
    }
    
    // Header shadow on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 255, 209, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
