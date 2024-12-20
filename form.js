
    // localStorage.setItem('userData', JSON.stringify({name: "ram", email: "ram@gmail.com", mobile: "1234567890", password: "123456"}));

    function validateField(fieldId, errorId, validationFn) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(errorId);
        const errorMessage = validationFn(field.value);
        errorElement.textContent = errorMessage;
        return !errorMessage;
    }

    function validateForm(event) {
        event.preventDefault();

        const isNameValid = validateField('name', 'nameError', value => {
            return value.trim() === '' ? 'Name is required.' : '';
        });

        const isEmailValid = validateField('email', 'emailError', value => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return !emailRegex.test(value) ? 'Enter a valid email address.' : '';
        });

        const isMobileValid = validateField('mobile', 'mobileError', value => {
            const mobileRegex = /^\d{10}$/;
            return !mobileRegex.test(value) ? 'Enter a valid 10-digit mobile number.' : '';
        });

        const isPasswordValid = validateField('password', 'passwordError', value => {
            return value.length < 6 ? 'Password must be at least 6 characters long.' : '';
        });

        const isConfirmPasswordValid = validateField('confirmPassword', 'confirmPasswordError', value => {
            const password = document.getElementById('password').value;
            return value !== password ? 'Passwords do not match.' : '';
        });

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isMobileValid) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const password = document.getElementById('password').value;

            const storedUser = JSON.parse(localStorage.getItem('userData'));


            let formData = { name, email, mobile, password };
            localStorage.setItem('formData', JSON.stringify(formData));

            const form = document.getElementById('userForm');
            form.reset();

            if (
                name === storedUser.name &&
                email === storedUser.email &&
                mobile === storedUser.mobile &&
                password === storedUser.password 
                
            ) {
                alert('Login successful!');
               
            } else {
                alert('Login failed: User data does not match.');
            }
            
        }

    }


    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('name').addEventListener('blur', () => {
            validateField('name', 'nameError', value => {
                return value.trim() === '' ? 'Name is required.' : '';
            });
        });

        document.getElementById('email').addEventListener('blur', () => {
            validateField('email', 'emailError', value => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Enter a valid email address.' : '';
            });
        });

        document.getElementById('mobile').addEventListener('blur', () => {
            validateField('mobile', 'mobileError', value => {
                const mobileRegex = /^\d{10}$/;
                return !mobileRegex.test(value) ? 'Enter a valid 10-digit mobile number.' : '';
            });
        });

        document.getElementById('password').addEventListener('blur', () => {
            validateField('password', 'passwordError', value => {
                return value.length < 6 ? 'Password must be at least 6 characters long.' : '';
            });
        });

        document.getElementById('confirmPassword').addEventListener('blur', () => {
            validateField('confirmPassword', 'confirmPasswordError', value => {
                const password = document.getElementById('password').value;
                return value !== password ? 'Passwords do not match.' : '';
            });
        });

    });
    


    document.getElementById('resetButton').addEventListener('click', function () {

        const form = document.getElementById('userForm');
        form.reset();

        localStorage.clear();
    });