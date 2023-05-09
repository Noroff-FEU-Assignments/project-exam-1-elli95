import {
    apiBase,
    postBace,
    postEndpoint } from "/js/source.js";

const allBlogPostBase = apiBase + postBace + postEndpoint;
// console.log("hello", allBlogPostBase);

const searchInput = document.querySelector("#search");
const searchResult = document.querySelector("#search-list-result");

searchInput.addEventListener("input", inputContent);
document.addEventListener("click", noSearchList);

async function inputContent(inputText){
        try{
            const response = await fetch(allBlogPostBase);
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
    Object.values(result).forEach(function(blogPost) {
        searchResult.innerHTML += ` <a class="search-list-products" href="product-storm-jacket.html?id=${blogPost.id}">
                                    <p>${blogPost.title.rendered}</p>
                                    </a>
                                  `;
    });
}

function noSearchList(){
    searchResult.innerHTML = ""
}