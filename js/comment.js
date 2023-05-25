import {
    emailValidate,
    valueLength,
    getApiFromId } from "/js/source.js";

const pageContent = document.querySelector(".comment-section");

async function contentInfo(){
    const apiData = await getApiFromId();
    pageContent.innerHTML = "";

    if(apiData._embedded.replies){
        const commentList = apiData._embedded.replies[0];

        Object.values(commentList).forEach(function(commentData){
            //Reference: Date.prototype.toLocaleString()  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
            const options = {
                day: "numeric",
                month: "long",
                year: "numeric",
            };
            let date =  new Date(commentData.date);
            const commentDate = date.toLocaleString("en-GB", options);

            pageContent.innerHTML += `  <div class="comment-box">
                                        <h2 class="comment-author">${commentData.author_name}</h2>
                                        <h3 class="comment-text">${commentData.content.rendered}</h3>
                                        <p class="comment-date">${commentDate}</p>
                                        </div>`
        });
    }
    else{
        pageContent.innerHTML += `<h2>Be the first to add a new comment!</h2>`
    }
}
contentInfo();

const commentSubmissionMessage = document.querySelector("#comment-submission-message");
const errorMessage = document.querySelector("#error-message");
const commentForm = document.querySelector(".comment-form");

const nameInput = document.querySelector("#name");
const nameError = document.querySelector("#error-name");

const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#error-email");

const messageInput = document.querySelector("#message");
const messageError = document.querySelector("#error-message-field");

commentForm.addEventListener("submit", commentFormValidator);
commentForm.addEventListener("submit", formSubmission);


function commentFormValidator(event){
    try{
        event.preventDefault();

        if(valueLength(nameInput.value, 1) === true) {
            nameError.style.display = "none";
        }
        else {
            nameError.style.display = "block";
        }

        if(emailValidate(emailInput.value) === true) {
            emailError.style.display = "none";
        }
        else {
            emailError.style.display = "block";
        }

        if(valueLength(messageInput.value, 1) === true) {
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
    if (valueLength(nameInput.value, 1) && emailValidate(emailInput.value) && valueLength(messageInput.value, 1)){
        commentSubmissionMessage.innerHTML = '<i class="fa-solid fa-circle-check"><span class="wave-form-lable-fix">Submission success</span></i> Your comment has been submitted.';
        commentSubmissionMessage.classList.add("submission-success");

        const CommentPost = { 
                post: productId,
                author_name: nameInput.value,
                author_email: emailInput.value,
                content: messageInput.value,
            };
        
        //JavaScript Post Request – How to Send an HTTP Post Request in JS  https://www.freecodecamp.org/news/javascript-post-request-how-to-send-an-http-post-request-in-js/
        fetch(`https://thecozycookingpot.elisemariehogsnes.no/wp-json/wp/v2/comments`, {
                method: "POST",
                headers: {"content-Type": "application/json",},
                body: JSON.stringify(CommentPost),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
            commentForm.reset();
        
            setTimeout(() => {
                contentInfo();
            }, 500);
    }
    else {
        commentSubmissionMessage.innerHTML = '<i class="fa-solid fa-triangle-exclamation"><span class="wave-form-lable-fix">Error</span></i> Your comment does not meet the requirement. Correct the errors and try again.';
        commentSubmissionMessage.classList.add("submission-fail");
    }
}