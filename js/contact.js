import {emailValidate, valueLength} from "/js/source.js";

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

function formSubmission(){
    if (valueLength(name.value, 5) && emailValidate(email.value) && valueLength(subject.value, 15) && valueLength(message.value, 25)){
        formMessageSubmission.innerHTML = '<i class="fa-solid fa-circle-check"><span class="wave-form-lable-fix">Submission success</span></i> Your form has been submitted, you will hear from us as soon as possible.';
        formMessageSubmission.classList.add("submission-success");
    }
    else {
        formMessageSubmission.innerHTML = '<i class="fa-solid fa-triangle-exclamation"><span class="wave-form-lable-fix">Error</span></i> Your form does not meet the requirement. Correct the errors and try again.';
        formMessageSubmission.classList.add("submission-fail");
    }
}