import {apiUrlPosts, emailValidate} from "/js/source.js";

var pageAmount = "&per_page=99";

const searchInput = document.querySelector("#search");
const searchResult = document.querySelector("#search-list-result");

searchInput.addEventListener("input", inputContent);
document.addEventListener("click", noSearchList);

async function inputContent(inputText){
        try{
            const response = await fetch(apiUrlPosts + pageAmount);
            const data = await response.json();
    
            const value = inputText.target.value.toLowerCase();
    
            let result = data.filter(blogPost => blogPost.title.rendered.toLowerCase().includes(value));
            searchResultsList(result)
        }
        catch (error) {
            console.log(error);
            searchResult.innerHTML = error;
        }
}
function searchResultsList(result){
    searchResult.innerHTML = "";
    searchResult.classList.add("search-list-result");
    Object.values(result).forEach(function(blogPost) {
        searchResult.innerHTML += ` <a class="search-list-products" href="/specific-blog-post.html?id=${blogPost.id}">
                                    <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="${blogPost._embedded["wp:featuredmedia"][0].alt_text}" />
                                    <p>${blogPost.title.rendered}</p>
                                    </a>
                                  `;
    });
}

function noSearchList(){
    searchResult.innerHTML = ""
    searchResult.classList.remove("search-list-result");
}

// Subscribe validation //
const email = document.querySelector("#subscribe-newsletter");
const emailError = document.querySelector("#subscribe-error-email");

const subscribeForm = document.querySelector(".subscribe-form");
const errorMessage = document.querySelector("#subscribe-error-message");
const formMessageSubmission = document.querySelector("#subscribe-form-message-submission");

subscribeForm.addEventListener("submit", subscribeFormFormValidator);
subscribeForm.addEventListener("submit", formSubmission);

function subscribeFormFormValidator(event){
    try{
        event.preventDefault();

        if(emailValidate(email.value) === true) {
            emailError.style.display = "none";
        }
        else {
            emailError.style.display = "block";
        }
    }
    catch (error){
        console.log(error);
        errorMessage.innerHTML = error;
    }
}

function formSubmission(){
    if (emailValidate(email.value)){
        formMessageSubmission.innerHTML = '<i class="fa-solid fa-circle-check"><span class="wave-form-lable-fix">Submission success</span></i> Thank you for joining our subscription.';
        formMessageSubmission.classList.add("submission-success");
    }
    else {
        formMessageSubmission.innerHTML = '<i class="fa-solid fa-triangle-exclamation"><span class="wave-form-lable-fix">Error</span></i> Please enter a valid email.';
        formMessageSubmission.classList.add("submission-fail");
    }
}