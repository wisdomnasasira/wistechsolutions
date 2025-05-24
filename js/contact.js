// Initialize EmailJS with your Public Key
(function () {
    emailjs.init("kvH9XL-le-dX5fy0j"); // Ensure this is your correct public key
})();

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');

    // Function to display error message
    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Function to clear error message
    function clearError(elementId) {
        const errorElement = document.getElementById(elementId + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // Basic email validation function
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Input event listeners for immediate feedback
    document.getElementById('name').addEventListener('input', () => clearError('name'));
    document.getElementById('email').addEventListener('input', () => clearError('email'));
    document.getElementById('message').addEventListener('input', () => clearError('message'));


    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true; // Flag for overall form validity

            // Validate Name
            if (!name) {
                displayError('name', 'Name is required.');
                isValid = false;
            } else {
                clearError('name');
            }

            // Validate Email
            if (!email) {
                displayError('email', 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(email)) {
                displayError('email', 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError('email');
            }

            // Validate Message
            if (!message) {
                displayError('message', 'Message cannot be empty.');
                isValid = false;
            } else if (message.length < 10) { // Example: minimum message length
                displayError('message', 'Message must be at least 10 characters long.');
                isValid = false;
            } else {
                clearError('message');
            }

            // If form is not valid, stop submission
            if (!isValid) {
                return;
            }

            // Define EmailJS parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

            // Disable the submit button to prevent multiple submissions
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Send email using EmailJS with public key
            emailjs.send("service_9mergpl", "template_kiv5uda", templateParams, "kvH9XL-le-dX5fy0j")
                .then(function (response) {
                    alert(`Thank you, ${name}! Your message has been successfully sent.`);
                    contactForm.reset(); // Clear form fields
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                })
                .catch(function (error) {
                    alert("Oops! Something went wrong. Please check the console for details.");
                    console.error("EmailJS Error:", error);
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }
});