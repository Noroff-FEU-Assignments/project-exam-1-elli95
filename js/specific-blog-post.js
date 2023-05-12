import {
    apiBase,
    postBace,
    postEndpoint,
    embeddedBase } from "/js/source.js";

const pageContent = document.querySelector(".blog-post-content");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const blogPostBase = apiBase + postBace + postEndpoint + productId + embeddedBase ;

// console.log("url info123123123", blogPostBase);

async function FetchApi(){
    try{
        const response = await fetch(blogPostBase);
        const data = await response.json();
        // console.log("url info", data);
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
    console.log("data123", apiData);
    pageContent.innerHTML = "";

        pageContent.innerHTML += `  <h1>${apiData.title.rendered}</h1>
                                    <img src="${apiData._embedded["wp:featuredmedia"][0].source_url}" alt="${apiData._embedded["wp:featuredmedia"][0].alt_text}" />
                                    <p class="date">${apiData.date_gmt}</p>
                                    <div class="description-ingredients">
                                    ${apiData.content.rendered}
                                    </div>`
}
contentInfo();