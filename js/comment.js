import {
    apiBase,
    postBace,
    postEndpoint,
    mediaEndpoint } from "/js/source.js";

const pageContent = document.querySelector(".comment-section");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const blogPostBase = apiBase + postBace + postEndpoint + productId + mediaEndpoint ;

// console.log("url info123123123", blogPostBase);

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