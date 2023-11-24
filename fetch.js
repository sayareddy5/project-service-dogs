const trainingForm = document.getElementById('trainingForm');
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'none';
    const errorElement = document.getElementById('application-submit-message')
    trainingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formDataObject = {};

        const formData = new URLSearchParams(new FormData(trainingForm));

        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;

        }
        
        fetch('/our-dogs/training-application', {
            method: 'POST',
            body: JSON.stringify(formDataObject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                successModal.style.display = 'block';
                
                errorElement.textContent = "Application Submitted Succesfully.";

                setTimeout(function() {
                    successModal.style.display = 'none';
                }, 4000);
                trainingForm.reset();
            } else {

                successModal.style.display = 'block';
                
                errorElement.textContent = "Error submitting form, Please try again later.";
                setTimeout(function() {
                    successModal.style.display = 'none';

                }, 4000);

                console.error('Error submitting form:', response.status, response.statusText);
                
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    });

