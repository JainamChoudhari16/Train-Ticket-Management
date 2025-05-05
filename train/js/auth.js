/**
 * Railway Booking System - Authentication JavaScript
 * Handles login and registration functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Update button text
            if (type === 'password') {
                this.innerHTML = '<i class="bi bi-eye"></i> Show';
            } else {
                this.innerHTML = '<i class="bi bi-eye-slash"></i> Hide';
            }
        });
    });

    // Login Form Validation and Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            document.getElementById('loginError').classList.add('d-none');
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            
            // Get form values
            const userType = document.getElementById('userType')?.value;
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Validate user type if it exists
            if (document.getElementById('userType') && !userType) {
                document.getElementById('userType').classList.add('is-invalid');
                return;
            }
            
            // Validate username
            if (!username) {
                document.getElementById('username').classList.add('is-invalid');
                document.getElementById('usernameError').textContent = 'Username is required.';
                return;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('password').classList.add('is-invalid');
                document.getElementById('passwordError').textContent = 'Password is required.';
                return;
            }
            
            // Simulate login (in production, this would be an AJAX call to a backend)
            if (userType) {
                // If user type dropdown exists
                if (userType === 'customer') {
                    // Customer login - validate format requirements instead of specific credentials
                    const isValidUsername = username.length >= 6 && !/[^a-zA-Z]/.test(username);
                    const hasMinLength = password.length >= 8;
                    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                    const hasNumber = /[0-9]/.test(password);
                    
                    // No longer requiring uppercase for customer login
                    if (isValidUsername && hasMinLength && hasSpecialChar && hasNumber) {
                        // Redirect to customer dashboard
                        window.location.href = 'customer-dashboard.html';
                    } else {
                        // Show login error
                        document.getElementById('loginError').textContent = 'Invalid username or password. Please try again.';
                        document.getElementById('loginError').classList.remove('d-none');
                    }
                } else if (userType === 'admin' && username === 'admin' && password === 'Admin123!') {
                    // Admin login - keep hardcoded credentials
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Show login error
                    document.getElementById('loginError').classList.remove('d-none');
                }
            } else {
                // For backward compatibility
                // Customer login - validate format requirements
                const isValidUsername = username.length >= 6 && !/[^a-zA-Z]/.test(username);
                const hasMinLength = password.length >= 8;
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                
                // No longer requiring uppercase for customer login
                if (isValidUsername && hasMinLength && hasSpecialChar && hasNumber) {
                    // Redirect to customer dashboard
                    window.location.href = 'customer-dashboard.html';
                } else if (username === 'admin' && password === 'Admin123!') {
                    // Admin login - keep hardcoded credentials
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Show login error
                    document.getElementById('loginError').classList.remove('d-none');
                }
            }
        });
    }

    // Registration Form Validation and Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            document.getElementById('registerError').classList.add('d-none');
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            
            // Get form values
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const email = document.getElementById('email').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const aadhar = document.getElementById('aadhar').value.trim();
            
            let isValid = true;
            
            // Validate username
            if (!username) {
                document.getElementById('username').classList.add('is-invalid');
                document.getElementById('usernameError').textContent = 'Username is required.';
                isValid = false;
            } else if (username.length < 6) {
                document.getElementById('username').classList.add('is-invalid');
                document.getElementById('usernameError').textContent = 'Username must be at least 6 characters long.';
                isValid = false;
            } else if (/[^a-zA-Z]/.test(username)) { // Check for non-alphabet characters
                document.getElementById('username').classList.add('is-invalid');
                document.getElementById('usernameError').textContent = 'Username must contain only alphabets, no special characters or numbers.';
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                document.getElementById('password').classList.add('is-invalid');
                document.getElementById('passwordError').textContent = 'Password is required.';
                isValid = false;
            } else {
                const hasMinLength = password.length >= 8;
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasUpperCase = /[A-Z]/.test(password);
                
                if (!hasMinLength || !hasSpecialChar || !hasNumber || !hasUpperCase) {
                    document.getElementById('password').classList.add('is-invalid');
                    let errorMsg = 'Password must:';
                    if (!hasMinLength) errorMsg += ' be at least 8 characters long,';
                    if (!hasSpecialChar) errorMsg += ' include at least 1 special character,';
                    if (!hasNumber) errorMsg += ' include at least 1 number,';
                    if (!hasUpperCase) errorMsg += ' include at least 1 uppercase letter,';
                    
                    // Remove trailing comma and add period
                    errorMsg = errorMsg.slice(0, -1) + '.';
                    
                    document.getElementById('passwordError').textContent = errorMsg;
                    isValid = false;
                }
            }
            
            // Validate confirm password
            if (!confirmPassword) {
                document.getElementById('confirmPassword').classList.add('is-invalid');
                document.getElementById('confirmPasswordError').textContent = 'Please confirm your password.';
                isValid = false;
            } else if (password !== confirmPassword) {
                document.getElementById('confirmPassword').classList.add('is-invalid');
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                document.getElementById('email').classList.add('is-invalid');
                document.getElementById('emailError').textContent = 'Email is required.';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('email').classList.add('is-invalid');
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }
            
            // Validate mobile
            if (!mobile) {
                document.getElementById('mobile').classList.add('is-invalid');
                document.getElementById('mobileError').textContent = 'Mobile number is required.';
                isValid = false;
            } else if (!/^\d{10}$/.test(mobile)) {
                document.getElementById('mobile').classList.add('is-invalid');
                document.getElementById('mobileError').textContent = 'Mobile number must be 10 digits with no alphabets.';
                isValid = false;
            }
            
            // Validate Aadhar
            if (!aadhar) {
                document.getElementById('aadhar').classList.add('is-invalid');
                document.getElementById('aadharError').textContent = 'Aadhar number is required.';
                isValid = false;
            }
            
            // If all validations pass
            if (isValid) {
                // Simulate registration (in production, this would be an AJAX call to a backend)
                setTimeout(() => {
                    // Show success modal instead of alert
                    const successModal = new bootstrap.Modal(document.getElementById('registrationSuccessModal'));
                    successModal.show();
                    
                    // Setup the button to redirect to login page
                    document.getElementById('goToLoginBtn').addEventListener('click', function() {
                        window.location.href = 'login.html';
                    });
                    
                    // If modal is dismissed using the X or clicking outside, still redirect after a delay
                    document.getElementById('registrationSuccessModal').addEventListener('hidden.bs.modal', function() {
                        window.location.href = 'login.html';
                    });
                }, 1000);
            }
        });
    }
}); 