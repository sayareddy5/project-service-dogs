document.getElementById('submitFormBtn').addEventListener('click', function (event) {
    var form = document.getElementById('trainingForm');
    var radioGroup = document.querySelectorAll('input[type="radio"][required]');
    var radioSelected = false;

    for (var i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
            radioSelected = true;
            break;
        }
    }

    if (!radioSelected) {
        var optionForm = document.querySelector('.option-form');
        insertErrorMessage(optionForm, 'Please select an option');
    }

    var elements = form.elements;

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].hasAttribute('required') && elements[i].value.trim() === '') {
            elements[i].style.borderColor = 'red';
            insertErrorMessage(elements[i].parentNode, 'This field is required');
        } else {
            elements[i].style.borderColor = '';
            removeErrorMessages(elements[i].parentNode);
        }
    }

    // Prevent form submission if there are errors
    if (form.querySelector('.error')) {
        event.preventDefault();
    }
});

function insertErrorMessage(parentNode, message) {
    var errorMessage = parentNode.querySelector('.error');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error';
        parentNode.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function removeErrorMessages(parentNode) {
    var errorMessages = parentNode.querySelectorAll('.error');
    for (var i = 0; i < errorMessages.length; i++) {
        parentNode.removeChild(errorMessages[i]);
    }
}

var radioButtons = document.querySelectorAll('input[type="radio"]');
for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function () {
        var optionForm = document.querySelector('.option-form');
        removeErrorMessages(optionForm);
    });
}