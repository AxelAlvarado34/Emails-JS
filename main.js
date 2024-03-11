const emailInput = document.querySelector('#email');
const titleInput = document.querySelector('#theme');
const descriptionInput = document.querySelector('#description');

const btnSend = document.querySelector('#send');
const btnReset = document.querySelector('#resetForm');

const form = document.querySelector('#form');

const emailObject = {
    email: '',
    title: '',
    description: ''
}


document.addEventListener('DOMContentLoaded', () => {
    eventListener();
})


function eventListener() {
    emailInput.addEventListener('input', readContent);
    titleInput.addEventListener('input', readContent);
    descriptionInput.addEventListener('input', readContent);

    
    form.addEventListener('submit', submitEmail);

    btnReset.addEventListener('click', resetForm );
}

function readContent(e) {
    if (e.target.value === '') {
        createAlert(`The field ${e.target.name} is requerid`, 'error', e.target.parentElement);
        emailObject[e.target.name] = '';
        sendEmailValidation();
        return;
    }

    if (!emailValidation(e.target.value) && e.target.name === 'email') {
        createAlert('The email is invalid', 'error', e.target.parentElement);
        emailObject[e.target.name] = '';
        sendEmailValidation();
        return;
    }

    alertRemove(e.target.parentElement);

    emailObject[e.target.name] = e.target.value;

    sendEmailValidation();
}


function createAlert(message, type, container) {
    const alertDiv = container.querySelector('.alert');

    if (!alertDiv) {
        const alert = document.createElement('DIV');
        alert.classList.add('alert');
        alert.textContent = message;

        if (type === 'error') {
            alert.classList.add('alert-danger');
        }
        else {
            alert.classList.add('alert-success')
        }

        container.appendChild(alert);
    }
}

function alertRemove(container) {
    const alert = container.querySelector('.alert');
    if (alert) {
        alert.remove();
    }
}

function emailValidation(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = regex.test(email);
    return result;
}

function sendEmailValidation() {
    if (Object.values(emailObject).includes('')) {
        btnSend.disabled = true;
        btnSend.classList.remove('activate');
    } else {
        btnSend.disabled = false;
        btnSend.classList.add('activate');
    }
}

function resetForm(){

    emailObject.email = '';
    emailObject.title = '';
    emailObject.description = ''

    form.reset();
    sendEmailValidation();
}

function submitEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');

    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden');
        createAlert('Email sent correctly', 'success', form);

        setTimeout(() => {
            alertRemove(form);
            resetForm();
        }, 3500);

    }, 3000);
}