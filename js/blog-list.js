import {
    apiBase,
    postBace,
    postEndpoint,
    embeddedBase } from "/js/source.js";

// const apiBase = "https://thecozycookingpot.elisemariehogsnes.no";
// const postBace = "/wp-json";
// const postEndpoint = "/wp/v2/posts";

// const apiImgBase = "https://thecozycookingpot.elisemariehogsnes.no/wp-json/wp/v2/media/";

const pageContent = document.querySelector(".blog-section");


async function FetchApi(){
    try{
        const response = await fetch(apiBase + postBace + postEndpoint + embeddedBase);
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
    console.log("data", apiData);
    pageContent.innerHTML = "";
    Object.values(apiData).forEach(function(postData){

    // const test11 = postData._links['wp:featuredmedia'][0].href;
    // console.log("111111111", test11)
    // console.log(postData._links['wp:featuredmedia'][0].href)

        pageContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry">
                                    <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="" />
                                    <h2>${postData.title.rendered}</h2>
                                    <p>${postData.date_gmt}</p>
                                    </a>`
    });
}
contentInfo();


const ViewMoreBtn = document.querySelector("#view-more-btn");
