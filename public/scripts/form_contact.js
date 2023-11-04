document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.querySelector('#contact-form-element');
    const contactFormContainer = document.getElementById('contactFormContainer');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
            question: document.querySelector('textarea[name="question"]').value
        };
        console.log(formData)
        try {
            const response = await fetch('/contact/contact-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),

            });
            
            if (response.ok) {
                // --If form submission is successful (status 200) hide the form and display success message
                contactFormContainer.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                successMessage.textContent= "Error occurred. Please try after sometime"
                successMessage.classList.remove('hidden');
            }
    } catch (error) {
        console.error('Error submitting form:', error);
        successMessage.textContent= "Error occurred. Please try after sometime"
        successMessage.classList.remove('hidden');
        
    }
});

});