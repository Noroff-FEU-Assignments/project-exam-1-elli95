import {
    apiBase,
    postBace,
    postEndpoint,
    embeddedBase } from "/js/source.js";

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

async function blogPostDate(){
    const apiData = await FetchApi();
    //Reference: Date.prototype.toLocaleString()  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    let date =  new Date(apiData.date_gmt);

    console.log("date", apiData);

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
        
    const postDate = date.toLocaleString("en-GB", options);
    return postDate;
}


async function contentInfo(){
    const apiData = await FetchApi();
    const postDate = await blogPostDate();
    console.log("data", apiData);
    caruselContent.innerHTML = "";
    Object.values(apiData).forEach(function(postData){
        const caruselBox = document.querySelector(".carusel-content-box");
        caruselBox.style.justifyContent = "start";
        let date =  new Date(postData.date_gmt);
        
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
                
        const postDate = date.toLocaleString("en-GB", options);
        caruselContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry">
                                        <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                        <h2>${postData.title.rendered}</h2>
                                        <p>${postDate}</p>
                                        </a>`
    });
}
contentInfo();

const thisWeeksSpecialContent = document.querySelector(".meal-post");
async function thisWeeksSpecial(){
    const apiData = await FetchApi();

    
    let result = apiData.filter(blogPost => blogPost._embedded["wp:term"][0][0].name === "This week's special");

    console.log("result",result);
    thisWeeksSpecialContent.innerHTML = "";

    Object.values(result).forEach(function(postData){

        console.log("result",postData);
        thisWeeksSpecialContent.innerHTML = `<div class="meal-info">
                                            <h2 class="grid-a">${postData.title.rendered}</h2>
                                            <h3 class="grid-b">${postData.excerpt.rendered}</h3>
                                            <img class="grid-c" src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                            </div>
                                            <a href="/specific-blog-post.html?id=${postData.id}"  class="btn-style meal-info-btn">Learn more <i class="fa-solid fa-arrow-right"><span class="wave-form-lable-fix">Learn more arrow</span></i></a>`
    });
}
thisWeeksSpecial();

const tryNewContent = document.querySelector(".try-new-content");
async function tryNewRecipes(){
    const apiData = await FetchApi();

    tryNewContent.innerHTML = "";
    
    //Reference: Fisher–Yates Shuffle https://bost.ocks.org/mike/shuffle/
    var mixedApiList = [], 
    apiLength = apiData.length, 
    apiShuffle;

    while (apiLength) {
      apiShuffle = Math.floor(Math.random() * apiLength--);
      mixedApiList.push(apiData.splice(apiShuffle, 1)[0]);
    }

    mixedApiList.length = 4;
    
    Object.values(mixedApiList).forEach(function(postData){
            

        let date =  new Date(postData.date_gmt);
        
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
                
        const postDate = date.toLocaleString("en-GB", options);

            tryNewContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="try-new">
                                        <img class="grid-a" src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                        <h2 class="grid-b">${postData.title.rendered}</h2>
                                        <h3 class="grid-c post-excerpt">${postData.excerpt.rendered}</h3>
                                        <p class="grid-d try-new-date">${postDate}</p>
                                        </a>`
            
    });
}
tryNewRecipes();