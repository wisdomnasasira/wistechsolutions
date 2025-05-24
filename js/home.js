document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Newsletter Form Submission (Footer)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();

            if (!email) {
                alert("Please enter your email address for the newsletter.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address for the newsletter.");
                return;
            }

            // In a real application, you would send this email to a server
            // or a newsletter service (e.g., Mailchimp, SendGrid, etc.)
            // For now, we'll just show an alert.
            alert(`Thank you for subscribing, ${email}!`);
            emailInput.value = ''; // Clear the input field
        });
    }
});