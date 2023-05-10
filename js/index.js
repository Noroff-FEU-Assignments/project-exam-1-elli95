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


async function FetchApi(){
    try{
        const response = await fetch(apiBase + postBace + postEndpoint + embeddedBase);
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

    // const test11 = postData._links['wp:featuredmedia'][0].href;
    // console.log("111111111", test11)
    // console.log(postData._links['wp:featuredmedia'][0].href)

    caruselContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry carusel-blog-post" id="carusel-blog-post">
                                    <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="" />
                                    <h2>${postData.title.rendered}</h2>
                                    <p>${postData.date_gmt}</p>
                                    </a>`
    });
}
contentInfo();



// const blogSection = document.querySelector(".blog-carousel-section");
// const caruselContentBox = document.querySelector(".carusel-content-box");
// const blogEntry = document.querySelectorAll(".carusel-blog-post");

// const arrowLeft = document.querySelector(".arrow-left");
// const arrowRight = document.querySelector(".arrow-right");

// arrowLeft.addEventListener("click",lastEntryRow);
// arrowRight.addEventListener("click",nextEntryRow);

// const entrySize = caruselContentBox.clientWidth;

// // Reference: How To Make An Infinite Image Slider That Loops with HTML CSS and JavaScript  https://www.youtube.com/watch?v=wjC8iGt67UE

// var clicks = 0;
// var caruselWidthContent = caruselContentBox.offsetWidth;

// console.log("hello",caruselWidthContent);

// console.log("hello2y",blogEntry);

// function lastEntryRow (){
//     const leftArrowClick = clicks * caruselWidthContent
//     clicks -= 1;
//     console.log("hello",clicks);
//     for(let i = 0; i < blogSection.length; i++){
//         console.log("hello2y",blogSection[i]);
//         if(clicks === -1 || clicks === 2 ){
//             clicks = 2;
//             blogEntry[i].style.transform = `translateX(-3380px)`;
//             blogEntry[i].style.transition = "300ms ease-in-out transform";
//             // blogEntry.style.transform = `translateX(-3380px)`;
//             // blogEntry.style.transition = "300ms ease-in-out transform";
//             navSymbolChange (); 
//             console.log("hello2",clicks);
//         }
//         else{
//             // blogEntry[i].style.transform = `translateX(${entrySize - leftArrowClick}px)`;
//             // blogEntry[i].style.transition = "300ms ease-in-out transform";
//             blogEntry.style.transform = `translateX(${entrySize - leftArrowClick}px)`;
//             blogEntry.style.transition = "300ms ease-in-out transform";
//             console.log("click <-", clicks);
//             navSymbolChange (); 
//         }
//     }
// }

// function nextEntryRow (){
//     const rightArrowClick = clicks * caruselWidthContent
//     clicks += 1;
//     console.log("hello----",clicks);
//     for(let i = 0; i < blogEntry.length; i++){
//             if(clicks === 3 || clicks === 0 ){
//                 clicks = 0;
//                 blogEntry[i].style.transform = `translateX(0px)`;
//                 blogEntry[i].style.transition = "300ms ease-in-out transform";
//                 navSymbolChange (); 
//                 console.log("hello----2",clicks);
//             }
//             else{
//                 blogEntry[i].style.transform = `translateX(${-entrySize - rightArrowClick}px)`;
//                 blogEntry[i].style.transition = "300ms ease-in-out transform";
//                 console.log("click ->",clicks);
//                 navSymbolChange ();
//             }
//         }
// }


// const carouselNavSymbols1 = document.querySelector(".nav-btn-1");
// const carouselNavSymbols2 = document.querySelector(".nav-btn-2");
// const carouselNavSymbols3 = document.querySelector(".nav-btn-3");

// function navSymbolChange () {
//     if(clicks === 0){
//         carouselNavSymbols1.style.backgroundColor = "lightgray";
//         carouselNavSymbols1.style.border = "solid 1px black";
//     }
//     else{
//         carouselNavSymbols1.style.backgroundColor = "gray";
//         carouselNavSymbols1.style.border = "none";
//     }
//     if(clicks === 1){
//         carouselNavSymbols2.style.backgroundColor = "lightgray";
//         carouselNavSymbols2.style.border = "solid 1px black";
//     }
//     else{
//         carouselNavSymbols2.style.backgroundColor = "gray";
//         carouselNavSymbols2.style.border = "none";
//     }
//     if(clicks === 2){
//         carouselNavSymbols3.style.backgroundColor = "lightgray";
//         carouselNavSymbols3.style.border = "solid 1px black";
//     }
//     else{
//         carouselNavSymbols3.style.backgroundColor = "gray";
//         carouselNavSymbols3.style.border = "none";
//     }
// }
// navSymbolChange ();
