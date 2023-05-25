import {apiUrlPosts} from "/js/source.js";

const caruselContent = document.querySelector(".carusel-content");
const thisWeeksSpecialContent = document.querySelector(".meal-post");
const tryNewContent = document.querySelector(".try-new-content");
//Reference: Date.prototype.toLocaleString()  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
const dateSetup = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };

let pageAmount = "&per_page=12";

function main() {
    caruselContentInfo();
    thisWeeksSpecial();
    tryNewRecipes();
}
main();

async function FetchApi(){
        const response = await fetch(apiUrlPosts + pageAmount);
        const data = await response.json();
        return data;
}

async function caruselContentInfo(){
    try{
        const apiData = await FetchApi();

        caruselContent.innerHTML = "";

        Object.values(apiData).forEach(function(postData){
            const caruselBox = document.querySelector(".carusel-content-box");
            caruselBox.style.justifyContent = "start";

            const date =  new Date(postData.date_gmt);
            const postDate = date.toLocaleString("en-GB", dateSetup);

            caruselContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry">
                                            <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                            <h2>${postData.title.rendered}</h2>
                                            <p>${postDate}</p>
                                            </a>`
        });
    }
    catch (error) {
        console.log(error);
        caruselContent.innerHTML = error;
    }
}

async function thisWeeksSpecial(){
    try {
        const apiData = await FetchApi();
        
        let result = apiData.filter(blogPost => blogPost._embedded["wp:term"][0][0].name === "This week's special");

        thisWeeksSpecialContent.innerHTML = "";

        Object.values(result).forEach(function(postData){
            thisWeeksSpecialContent.innerHTML = `<div class="meal-info">
                                                <h2 class="grid-a">${postData.title.rendered}</h2>
                                                <h3 class="grid-b">${postData.excerpt.rendered}</h3>
                                                <img class="grid-c" src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                                </div>
                                                <a href="/specific-blog-post.html?id=${postData.id}"  class="btn-style meal-info-btn">Learn more <i class="fa-solid fa-arrow-right"><span class="wave-form-lable-fix">Learn more arrow</span></i></a>`
        });
    } 
    catch (error) {
        console.log(error);
        thisWeeksSpecialContent.innerHTML = error;
    }
}

async function tryNewRecipes(){
    try {
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
            const postDate = date.toLocaleString("en-GB", dateSetup);

            tryNewContent.innerHTML += `<a href="/specific-blog-post.html?id=${postData.id}" class="try-new">
                                        <img class="grid-a" src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                        <h2 class="grid-b">${postData.title.rendered}</h2>
                                        <h3 class="grid-c post-excerpt">${postData.excerpt.rendered}</h3>
                                        <p class="grid-d try-new-date">${postDate}</p>
                                        </a>`
                
        });
    } 
    catch (error) {
        console.log(error);
        tryNewContent.innerHTML = error;
    }
}