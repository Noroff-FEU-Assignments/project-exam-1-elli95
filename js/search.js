import {
    apiBase,
    postBace,
    postEndpoint,
    embeddedBase } from "/js/source.js";

var pageAmount = "&per_page=99";

const allBlogPostBase = apiBase + postBace + postEndpoint + embeddedBase;
// console.log("hello", allBlogPostBase);

const searchInput = document.querySelector("#search");
const searchResult = document.querySelector("#search-list-result");
// const searchResult = document.querySelector("#search-result");

searchInput.addEventListener("input", inputContent);
document.addEventListener("click", noSearchList);

async function inputContent(inputText){
        try{
            const response = await fetch(allBlogPostBase + pageAmount);
            const data = await response.json();
            console.log("url info", data);
    
            const value = inputText.target.value.toLowerCase();
            console.log("value",value);
    
            let result = data.filter(blogPost => blogPost.title.rendered.toLowerCase().includes(value));
            console.log(result);
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
                                    <img src="${blogPost._embedded["wp:featuredmedia"][0].source_url}" alt="" />
                                    <p>${blogPost.title.rendered}</p>
                                    </a>
                                  `;
    });
}

function noSearchList(){
    searchResult.innerHTML = ""
    searchResult.classList.remove("search-list-result");
}