// Pickup Form Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Form elements
    const pickupForm = document.getElementById("pickup-form");
    const pickupSuccess = document.getElementById("pickup-success");
    const pickupError = document.getElementById("pickup-error");
    
    // Initialize Flatpickr date picker
    if (document.getElementById("pickupDate")) {
        flatpickr("#pickupDate", {
            minDate: "today",
            maxDate: new Date().fp_incr(30), // Allow booking up to 30 days in advance
            disable: [
                function(date) {
                    // Disable Sundays
                    return date.getDay() === 0;
                }
            ],
            dateFormat: "Y-m-d",
            altInput: true,
            altFormat: "F j, Y",
            locale: {
                firstDayOfWeek: 1
            }
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", formatPhoneNumber);
    }

    // Form validation and submission
    if (pickupForm) {
        pickupForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // Get form values
            const formData = {
                fullName: document.getElementById("fullName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                streetAddress: document.getElementById("streetAddress").value,
                city: document.getElementById("city").value,
                state: document.getElementById("state").value,
                zipCode: document.getElementById("zipCode").value,
                addressNotes: document.getElementById("addressNotes").value,
                pickupDate: document.getElementById("pickupDate").value,
                pickupTime: document.getElementById("pickupTime").value,
                wasteTypes: getSelectedWasteTypes(),
                quantity: document.getElementById("quantity").value,
                specialInstructions: document.getElementById("specialInstructions").value
            };
            
            // Handle form submission
            handlePickupSubmission(formData);
        });
    }
    
    // Format phone number as user types
    function formatPhoneNumber(e) {
        let input = e.target.value.replace(/\D/g, "");
        
        if (input.length > 0) {
            if (input.length <= 3) {
                input = input;
            } else if (input.length <= 6) {
                input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
            } else {
                input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
            }
        }
        
        e.target.value = input;
    }
    
    // Get selected waste types
    function getSelectedWasteTypes() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
        return Array.from(checkboxes)
            .filter(cb => cb.id !== "terms")
            .map(cb => cb.value);
    }
    
    // Validate form
    function validateForm() {
        const form = document.getElementById("pickup-form");
        form.classList.add("was-validated");
        
        // Check if at least one waste type is selected
        const wasteTypes = getSelectedWasteTypes();
        if (wasteTypes.length === 0) {
            document.querySelector(".waste-type-feedback").style.display = "block";
            return false;
        }
        
        return form.checkValidity();
    }
    
    // Display error message
    function showError(message) {
        if (pickupError) {
            const errorMessage = pickupError.querySelector("#error-message");
            if (errorMessage) errorMessage.textContent = message;
            pickupError.classList.remove("d-none");
            
            // Hide error after 5 seconds
            setTimeout(() => {
                pickupError.classList.add("d-none");
            }, 5000);
            
            // Scroll to error message
            pickupError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
    
    // Show success message
    function showSuccess() {
        if (pickupSuccess) {
            pickupSuccess.classList.remove("d-none");
            
            // Scroll to success message
            pickupSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Hide the form
            pickupForm.classList.add("d-none");
        }
    }
    
    // Handle pickup form submission (simulation)
    function handlePickupSubmission(formData) {
        // In a real application, this would be an API call to schedule the pickup
        console.log("Pickup form submission:", formData);
        
        // Simulate successful submission after a short delay
        setTimeout(() => {
            // Show success message
            showSuccess();
            
            // Optional: Add a button to schedule another pickup
            pickupSuccess.innerHTML += `
                <div class="mt-3">
                    <button class="btn btn-outline-success" id="schedule-another">Schedule Another Pickup</button>
                </div>
            `;
            
            // Add event listener to the "Schedule Another" button
            document.getElementById("schedule-another").addEventListener("click", function() {
                // Reset the form
                pickupForm.reset();
                pickupForm.classList.remove("was-validated");
                pickupForm.classList.remove("d-none");
                
                // Hide success message
                pickupSuccess.classList.add("d-none");
                
                // Remove the added button
                this.parentElement.remove();
            });
        }, 1000);
    }
});
