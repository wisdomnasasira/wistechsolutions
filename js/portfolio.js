// js/portfolio.js
// This script handles the specific contact form on the portfolio page.

// Initialize EmailJS with your Public Key
// You can get this from your EmailJS dashboard: Account -> API Keys -> Public Key
(function () {
    // IMPORTANT: Replace "YOUR_EMAILJS_PUBLIC_KEY" with your actual EmailJS Public Key.
    // Example: emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); 
})();

document.addEventListener("DOMContentLoaded", function() {
    const portfolioContactForm = document.getElementById('portfolioContactForm');
    const portfolioSubmitBtn = document.getElementById('portfolioSubmitBtn');

    // Basic email validation function
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    if (portfolioContactForm) {
        portfolioContactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            const name = document.getElementById('pName').value.trim();
            const email = document.getElementById('pEmail').value.trim();
            const message = document.getElementById('pMessage').value.trim();

            let isValid = true; // Flag for overall form validity

            // Client-side validation
            if (!name) {
                alert('Please enter your name.');
                isValid = false;
            }
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }
            if (!message) {
                alert('Message cannot be empty.');
                isValid = false;
            } else if (message.length < 10) {
                alert('Message must be at least 10 characters long.');
                isValid = false;
            }

            // If form is not valid, stop submission
            if (!isValid) {
                return;
            }

            // Define EmailJS parameters (using the template IDs you set up for the portfolio)
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message
            };

            // IMPORTANT: Replace "service_YOUR_PORTFOLIO_SERVICE_ID" and "template_YOUR_PORTFOLIO_TEMPLATE_ID"
            // with your actual EmailJS Service ID and Template ID specifically for your portfolio contact form.
            // You can create a new service and template in your EmailJS dashboard to keep them separate.
            const serviceID = "service_YOUR_PORTFOLIO_SERVICE_ID"; 
            const templateID = "template_YOUR_PORTFOLIO_TEMPLATE_ID"; 

            // Disable the submit button to prevent multiple submissions
            portfolioSubmitBtn.disabled = true;
            portfolioSubmitBtn.textContent = 'Sending...';

            // Send email using EmailJS
            emailjs.send(serviceID, templateID, templateParams)
                .then(function (response) {
                    alert(`Thank you, ${name}! Your message has been successfully sent.`);
                    portfolioContactForm.reset(); // Clear form fields
                    portfolioSubmitBtn.disabled = false;
                    portfolioSubmitBtn.textContent = 'Send Message';
                })
                .catch(function (error) {
                    alert("Oops! Something went wrong. Please try again later.");
                    console.error("EmailJS Error:", error);
                    portfolioSubmitBtn.disabled = false;
                    portfolioSubmitBtn.textContent = 'Send Message';
                });
        });
    }
});