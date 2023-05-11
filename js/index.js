import {
    apiBase,
    postBace,
    postEndpoint,
    embeddedBase } from "/js/source.js";

// const apiBase = "https://thecozycookingpot.elisemariehogsnes.no";
// const postBace = "/wp-json";
// const postEndpoint = "/wp/v2/posts";

// const apiImgBase = "https://thecozycookingpot.elisemariehogsnes.no/wp-json/wp/v2/media/";

const caruselContent = document.querySelector(".carusel-content");


var pageAmount = "&per_page=12";

var apiUrl = apiBase + postBace + postEndpoint + embeddedBase + pageAmount;
console.log("url",apiUrl);

async function FetchApi(){
    try{
        const response = await fetch(apiBase + postBace + postEndpoint + embeddedBase + pageAmount);
        const data = await response.json();
        console.log("url info", data);
        return data;
    }
    catch (error) {
        console.log(error);
        caruselContent.innerHTML = error;
    }
}
FetchApi();

async function contentInfo(){
    const apiData = await FetchApi();
    console.log("data", apiData);
    caruselContent.innerHTML = "";
    // var apiData = apiData.length = 12
    Object.values(apiData).forEach(function(postData){

    caruselContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry carusel-blog-post" id="carusel-blog-post">
                                    <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="" />
                                    <h2>${postData.title.rendered}</h2>
                                    <p>${postData.date_gmt}</p>
                                    </a>`
    });
    // innerText
}
contentInfo();
