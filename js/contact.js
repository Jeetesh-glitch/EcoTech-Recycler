// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
    const contactError = document.getElementById('contact-error');
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const wasteType = document.getElementById('wasteType').value;
            const message = document.getElementById('message').value;
            const privacyAgreed = document.getElementById('privacy').checked;
            
            // Additional validation
            if (!privacyAgreed) {
                showError('You must agree to our privacy policy.');
                return;
            }
            
            // Simulate form submission (in a real application, this would be an API call)
            handleContactSubmission(name, email, phone, subject, wasteType, message);
        });
    }
    
    // Format phone number as user types
    function formatPhoneNumber(e) {
        // Get only digits from the input
        let input = e.target.value.replace(/\D/g, '');
        
        // Format the phone number as (XXX) XXX-XXXX
        if (input.length > 0) {
            if (input.length <= 3) {
                input = input;
            } else if (input.length <= 6) {
                input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
            } else {
                input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
            }
        }
        
        // Update the input value
        e.target.value = input;
    }
    
    // Display error message
    function showError(message) {
        if (contactError) {
            const errorMessage = contactError.querySelector('#error-message');
            if (errorMessage) errorMessage.textContent = message;
            contactError.classList.remove('d-none');
            
            // Hide error after 5 seconds
            setTimeout(() => {
                contactError.classList.add('d-none');
            }, 5000);
            
            // Scroll to error message
            contactError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Show success message
    function showSuccess() {
        if (contactSuccess) {
            contactSuccess.classList.remove('d-none');
            
            // Scroll to success message
            contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Handle contact form submission (simulation)
    function handleContactSubmission(name, email, phone, subject, wasteType, message) {
        // In a real application, this would be an API call to send the message
        console.log('Contact form submission:', { 
            name, 
            email, 
            phone, 
            subject,
            wasteType,
            message 
        });
        
        // Simulate successful submission after a short delay
        setTimeout(() => {
            // Hide the form
            contactForm.classList.add('d-none');
            
            // Show success message
            showSuccess();
            
            // Optional: Add a button to allow sending another message
            contactSuccess.innerHTML += `
                <div class="mt-3">
                    <button class="btn btn-outline-success" id="send-another">Send Another Message</button>
                </div>
            `;
            
            // Add event listener to the "Send Another" button
            document.getElementById('send-another').addEventListener('click', function() {
                // Reset the form
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                contactForm.classList.remove('d-none');
                
                // Hide success message
                contactSuccess.classList.add('d-none');
                
                // Remove the added button
                this.parentElement.remove();
            });
        }, 1000);
    }
    
    /* 
     * Google Maps Integration - For future implementation
     * This is a placeholder for integrating Google Maps
     */
    // Placeholder function for Google Maps initialization
    function initMap() {
        // This would be implemented when ready to add actual Google Maps
        /*
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const location = { lat: 40.7128, lng: -74.0060 }; // Example coordinates
            const map = new google.maps.Map(mapElement, {
                zoom: 12,
                center: location
            });
            const marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
        */
    }
    
    // Add any page-specific initialization here
    function initPage() {
        // Simulate map loading for the placeholder
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            // You could add animation or loading indicators here
            console.log('Map container found, would initialize map in production version');
        }
    }
    
    // Initialize the page
    initPage();
});

