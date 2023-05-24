import {
    apiBase,
    postBace,
    postEndpoint,
    embeddedBase } from "/js/source.js";

const pageContent = document.querySelector(".blog-section");

var pageNumbr = "&page=";

var thePageNr = 1;

var apiUrl = apiBase + postBace + postEndpoint + embeddedBase + pageNumbr + thePageNr;
console.log("url",apiUrl);


async function FetchApi(){
    try{
        const response = await fetch(apiUrl);
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
    
    hideXMark();
    thePageNr = 1;
    
    ViewMoreBtn.style.display = "block";
    pageContent.innerHTML = "";
    Object.values(apiData).forEach(function(postData){
        
        let date =  new Date(postData.date_gmt);
            
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
                
        const postDate = date.toLocaleString("en-GB", options);

        pageContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry">
                                    <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                    <h2>${postData.title.rendered}</h2>
                                    <p>${postDate}</p>
                                    </a>`
    });
}
contentInfo();


const ViewMoreBtn = document.querySelector("#view-more-btn");
ViewMoreBtn.addEventListener("click", fetchMorePosts);

async function fetchMorePosts(){
    try{
        thePageNr ++;
        console.log("clicks", thePageNr);
        
        
        const response = await fetch(apiBase + postBace + postEndpoint + embeddedBase + pageNumbr + thePageNr);
        const data = await response.json();
        
            Object.values(data).forEach(function(postData){
                        
                let date =  new Date(postData.date_gmt);
                    
                const options = {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                };
                        
                const postDate = date.toLocaleString("en-GB", options);
                pageContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry">
                                            <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                            <h2>${postData.title.rendered}</h2>
                                            <p>${postDate}</p>
                                            </a>`
            });

            console.log("data.length",data.length)

        if(data.length < 10  ){
            console.log("there is no more");
            ViewMoreBtn.style.display = "none";
        } 
    }
    catch (error) {
        console.log(error);
        pageContent.innerHTML = error;
    }
}

const breakfastBtn = document.querySelector(".breakfast-label");
const lunchBtn = document.querySelector(".lunch-label");
const dinnerBtn = document.querySelector(".dinner-label");
const dessertBtn = document.querySelector(".dessert-label");

breakfastBtn.addEventListener("click", breakfast);
lunchBtn.addEventListener("click", lunch);
dinnerBtn.addEventListener("click", dinner);
dessertBtn.addEventListener("click", dessert);



async function get99Apiposts(){

    var pageAmount = "&per_page=99";
    
    const response = await fetch(apiBase + postBace + postEndpoint + embeddedBase + pageAmount);
    const data = await response.json();
    pageContent.innerHTML = "";

    return data;
}

const xMarkBreakfast = document.querySelector(".x-mark-breakfast");
const xMarkLunch = document.querySelector(".x-mark-lunch");
const xMarkDinner = document.querySelector(".x-mark-dinner");
const xMarkDessert = document.querySelector(".x-mark-dessert");

async function breakfast(){

    const apiData = await get99Apiposts();

    hideXMark();

    xMarkBreakfast.style.display = "initial";
    let result = apiData.filter(blogPost => blogPost._embedded["wp:term"][1][0].name === "Breakfast");
    console.log("breakfastBtn",result);
    blogListPostStyle(result);

}

async function lunch(){

    const apiData = await get99Apiposts();

    hideXMark();
    xMarkLunch.style.display = "initial";
    let result = apiData.filter(blogPost => blogPost._embedded["wp:term"][1][0].name === "Lunch");
    console.log("breakfastBtn",result);
    blogListPostStyle(result);
}

async function dinner(){

    const apiData = await get99Apiposts();

    hideXMark();
    xMarkDinner.style.display = "initial";
    let result = apiData.filter(blogPost => blogPost._embedded["wp:term"][1][0].name === "Dinner");
    console.log("breakfastBtn",result);
    blogListPostStyle(result);
}

async function dessert(){

    const apiData = await get99Apiposts();

    hideXMark();
    xMarkDessert.style.display = "initial";
    let result = apiData.filter(blogPost => blogPost._embedded["wp:term"][1][0].name === "Dessert");
    console.log("breakfastBtn",result);
    blogListPostStyle(result);
}


function blogListPostStyle(result){

    Object.values(result).forEach(function(postData){
        
        let date =  new Date(postData.date_gmt);
                    
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };
                
        const postDate = date.toLocaleString("en-GB", options);

        pageContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry">
                                                <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                                <h2>${postData.title.rendered}</h2>
                                                <p>${postDate}</p>
                                                </a>`
    });
}

function hideXMark(){
    ViewMoreBtn.style.display = "none";
    xMarkBreakfast.style.display = "none";
    xMarkLunch.style.display = "none";
    xMarkDinner.style.display = "none";
    xMarkDessert.style.display = "none";
}

const faXMark = document.querySelectorAll(".fa-xmark");
for (let i = 0; i < faXMark.length; i++) {
    faXMark[i].addEventListener("click", contentInfo);
}