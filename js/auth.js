// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    // Error elements
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    
    // Password strength elements (on register page)
    const passwordStrengthBar = document.getElementById('password-strength-bar');
    const passwordStrengthText = document.getElementById('password-strength-text');
    
    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const eyeIcon = this.querySelector('i');
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    });

    // Password Strength Checker
    if (registerForm) {
        const passwordInput = document.getElementById('password');
        
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Update strength bar
            passwordStrengthBar.style.width = strength.score + '%';
            passwordStrengthBar.classList.remove('bg-danger', 'bg-warning', 'bg-success');
            passwordStrengthText.classList.remove('password-strength-weak', 'password-strength-medium', 'password-strength-strong');
            
            if (strength.score < 40) {
                passwordStrengthBar.classList.add('bg-danger');
                passwordStrengthText.classList.add('password-strength-weak');
                passwordStrengthText.textContent = 'Weak - ' + strength.message;
            } else if (strength.score < 80) {
                passwordStrengthBar.classList.add('bg-warning');
                passwordStrengthText.classList.add('password-strength-medium');
                passwordStrengthText.textContent = 'Medium - ' + strength.message;
            } else {
                passwordStrengthBar.classList.add('bg-success');
                passwordStrengthText.classList.add('password-strength-strong');
                passwordStrengthText.textContent = 'Strong - ' + strength.message;
            }
        });
        
        // Password matching validation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            
            if (password !== confirmPassword) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Form Validation - Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Simulate login (for demonstration)
            handleLogin(email, password, rememberMe);
        });
    }
    
    // Form Validation - Register Form
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const termsAgreed = document.getElementById('terms').checked;
            
            // Additional validation
            if (password !== confirmPassword) {
                showError(registerError, 'Passwords do not match!');
                return;
            }
            
            if (!termsAgreed) {
                showError(registerError, 'You must agree to the terms and conditions.');
                return;
            }
            
            // Simulate registration (for demonstration)
            handleRegistration(fullName, email, password, phone, address);
        });
    }
    
    // Helper Functions
    
    // Check password strength
    function checkPasswordStrength(password) {
        let score = 0;
        let message = '';
        
        // Length check
        if (password.length < 6) {
            return { score: 10, message: 'Password is too short' };
        } else if (password.length >= 10) {
            score += 30;
        } else {
            score += 10;
        }
        
        // Complexity checks
        if (/[A-Z]/.test(password)) score += 15;
        if (/[a-z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 15;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;
        
        // Determine message based on score
        if (score < 40) {
            message = 'Try adding numbers or symbols';
        } else if (score < 80) {
            message = 'Good, but could be stronger';
        } else {
            message = 'Excellent password!';
        }
        
        return { score, message };
    }
    
    // Display error message
    function showError(errorElement, message) {
        if (errorElement) {
            const messageSpan = errorElement.querySelector('#error-message');
            if (messageSpan) messageSpan.textContent = message;
            errorElement.classList.remove('d-none');
            
            // Hide after 5 seconds
            setTimeout(() => {
                errorElement.classList.add('d-none');
            }, 5000);
        }
    }
    
    // Handle login (simulation)
    function handleLogin(email, password, rememberMe) {
        // In a real application, this would make an API call to authenticate the user
        console.log('Login attempt:', { email, password: '********', rememberMe });
        
        // Simulate successful login
        if (email && password) {
            // Store remember-me preference if checked
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Redirect to dashboard or homepage
            window.location.href = 'index.html';
        } else {
            showError(loginError, 'Please enter valid credentials');
        }
    }
    
    // Handle registration (simulation)
    function handleRegistration(fullName, email, password, phone, address) {
        // In a real application, this would make an API call to register the user
        console.log('Registration attempt:', { 
            fullName, 
            email, 
            password: '********',
            phone,
            address
        });
        
        // Simulate successful registration
        if (fullName && email && password && phone && address) {
            // Show success message
            registerForm.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <i class="fas fa-check-circle me-2"></i>
                    Registration successful! You can now <a href="login.html" class="alert-link">login to your account</a>.
                </div>
            `;
        } else {
            showError(registerError, 'Please fill out all required fields');
        }
    }
    
    // Check for remembered email on login page load
    if (loginForm) {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            document.getElementById('email').value = rememberedEmail;
            document.getElementById('remember-me').checked = true;
        }
    }
}); 
