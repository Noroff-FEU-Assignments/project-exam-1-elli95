const apiBase = "https://thecozycookingpot.elisemariehogsnes.no";
const postBace = "/wp-json";
const commentEndpoint = "/wp/v2/comments";
const postEndpoint = "/wp/v2/posts/";
const embeddedBase = "?_embed";

const apiUrlPosts = apiBase + postBace + postEndpoint + embeddedBase;

// Api url with Id //
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const idBlogPostBase = apiBase + postBace + postEndpoint + productId + embeddedBase ;

async function getApiFromId(){
    try{
        const response = await fetch(idBlogPostBase);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        pageContent.innerHTML = error;
    }
}

// Email and input validation //

//Reference: Function structure from https://content.noroff.dev/javascript-1/form-validation.html#regular-expressions
//Reference: Email address validation pattern from https://regexr.com/3e48o
function emailValidate(email) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailPatternCheck = emailPattern.test(email);
    return emailPatternCheck;
}

function valueLength(value, inputLength){
    if (value.trim().length >= inputLength){
        return true;
    } 
    else {
        return false;
    }
}

export{
    apiBase,
    postBace,
    commentEndpoint,
    postEndpoint,
    embeddedBase,
    apiUrlPosts,
    getApiFromId,
    emailValidate,
    valueLength,
}