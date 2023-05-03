const contactForm = document.querySelector(".contact-form");
const errorMessage = document.querySelector("#error-message");
const formMessageSubmission = document.querySelector("#form-message-submission");

const name = document.querySelector("#name");
const nameError = document.querySelector("#error-name");

const email = document.querySelector("#email");
const emailError = document.querySelector("#error-email");


const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#error-subject");

const message = document.querySelector("#message");
const messageError = document.querySelector("#error-message-field");

contactForm.addEventListener("submit", contactFormValidator);
contactForm.addEventListener("submit", formSubmission);

function contactFormValidator(event){
    try{
        event.preventDefault();

        if(valueLength(name.value, 5) === true) {
            nameError.style.display = "none";
        }
        else {
            nameError.style.display = "block";
        }

        if(emailValidate(email.value) === true) {
            emailError.style.display = "none";
        }
        else {
            emailError.style.display = "block";
        }

        if(valueLength(subject.value, 15) === true) {
            subjectError.style.display = "none";
        }
        else {
            subjectError.style.display = "block";
        }

        if(valueLength(message.value, 25) === true) {
            messageError.style.display = "none";
        }
        else {
            messageError.style.display = "block";
        }
    }
    catch (error){
        console.log(error);
        errorMessage.innerHTML = error;
    }
}

function valueLength(value, inputLength){
    if (value.trim().length >= inputLength){
        return true;
    } 
    else {
        return false;
    }
}

//Reference: function structure from https://content.noroff.dev/javascript-1/form-validation.html#regular-expressions
//Reference: Email address validation pattern from https://regexr.com/3e48o
function emailValidate(email) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailPatternCheck = emailPattern.test(email);
    return emailPatternCheck;
}

function formSubmission(){
    if (valueLength(name.value, 5) && emailValidate(email.value) && valueLength(subject.value, 15) && valueLength(message.value, 25)){
        formMessageSubmission.innerText = 'Your form has been submitted, you will hear from us as soon as possible.';
        formMessageSubmission.classList.add("submission-success");
    }
    else {
        formMessageSubmission.innerText = 'Your form does not meet the requirement. Correct the errors and try again.';
        formMessageSubmission.classList.add("submission-fail");
    }
}