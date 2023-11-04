document.addEventListener("DOMContentLoaded", function() {

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const question = document.querySelector('input[name="question"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const successMessage = document.getElementById('faq-successMessage');


        const formData = {
            question,
            email
        };
        try{
            const response = await fetch('/faq/ask-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                // -----If form submission is successful(code 200), hide the form and display success message----------
                contactFormContainer.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                successMessage.textContent= "Question Submission Failed. Please try after sometime"
                contactFormContainer.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }
    } catch (error) {
        console.error('Error submitting form:', error);
        contactFormContainer.classList.add('hidden');
        successMessage.textContent= "Error occurred. Please try after sometime"
        successMessage.classList.remove('hidden');
        
    }
    });
});