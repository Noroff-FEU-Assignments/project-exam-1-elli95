import {
    apiBase,
    postBace,
    commentEndpoint,
    postEndpoint,
    embeddedBase } from "/js/source.js";

const pageContent = document.querySelector(".comment-section");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const blogPostBase = apiBase + postBace + postEndpoint + productId + embeddedBase ;


async function FetchApi(){
    try{
        const response = await fetch(blogPostBase);
        const data = await response.json();
        console.log("url info", data);
        return data;
    }
    catch (error) {
        console.log(error);
        pageContent.innerHTML = error;
    }
}
FetchApi();


async function contentInfo(){
    const apiData = await FetchApi();
    // console.log("data123", apiData);
    pageContent.innerHTML = "";

    if(apiData._embedded.replies){
        const commentList = apiData._embedded.replies[0];

        Object.values(commentList).forEach(function(commentData){
            // console.log("commentData----commentData", commentData);
            pageContent.innerHTML += `  <h2>${commentData.author_name}</h2>
                                        <h3>${commentData.content.rendered}</h3>
                                        <p>${commentData.date}</p>`
        });
    }
    else{
        pageContent.innerHTML += `<h2>Be the first to add a new comment!</h2>`
        console.log("there is no comment");
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
    // console.log(post);
    if (valueLength(nameInput.value, 1) && emailValidate(emailInput.value) && valueLength(messageInput.value, 1)){
        commentSubmissionMessage.innerText = 'Your comment has been submitted.';
        commentSubmissionMessage.classList.add("submission-success");
        
        //Reference: POST form data using JavaScript's Fetch AP  https://www.youtube.com/watch?v=TTf0mMl0Sc4
        const preCommentPost = new FormData(commentForm);
        const CommentPost = new URLSearchParams(preCommentPost);
        console.log("commentPost",[...CommentPost]);

        // fetch(`https://thecozycookingpot.elisemariehogsnes.no/wp-json/wp/v2/comments`, {
        //         method: "POST",
        //         body: CommentPost,
        //     })
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));
    }
    else {
        commentSubmissionMessage.innerText = 'Your comment does not meet the requirement. Correct the errors and try again.';
        commentSubmissionMessage.classList.add("submission-fail");
    }
}
