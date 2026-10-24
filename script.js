const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent standard page reload

    // Change button text to show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Collect form data into an object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // ⚠️ REPLACE THIS WITH YOUR ACTUAL EMAIL ADDRESS OR FORM-SUBMIT CODE
    const emailEndpoint = "https://formsubmit.co/ajax/solutionslanguages@gmail.com";

    try {
        const response = await fetch(emailEndpoint, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        responseMessage.classList.remove('hidden');

        if (response.ok) {
            responseMessage.textContent = "Thank you! Your message has been sent successfully.";
            responseMessage.className = "success";
            form.reset(); // Clear the form fields
        } else {
            responseMessage.textContent = result.message || "Something went wrong. Please try again.";
            responseMessage.className = "error";
        }
    } catch (error) {
        responseMessage.classList.remove('hidden');
        responseMessage.textContent = "Network error. Please check your internet connection.";
        responseMessage.className = "error";
    } finally {
        // Restore button state
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
    }
});