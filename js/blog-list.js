import {apiUrlPosts} from "/js/source.js";

const pageContent = document.querySelector(".blog-section");

const ViewMoreBtn = document.querySelector("#view-more-btn");
ViewMoreBtn.addEventListener("click", fetchMorePosts);

const mealFilterBtn = document.querySelectorAll(".mealFilter");
for (let i = 0; i < mealFilterBtn.length; i++) {
    mealFilterBtn[i].addEventListener("click", mealFilter);
}

const faXMark = document.querySelectorAll(".fa-xmark");
for (let i = 0; i < faXMark.length; i++) {
    faXMark[i].addEventListener("click", contentInfo);
}

let pageNumbr = "&page=";

let thePageNr = 1;
    
//Reference: Date.prototype.toLocaleString()  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
const dateSetup = {
    day: "numeric",
    month: "long",
    year: "numeric",
};

async function FetchApi(){
        const response = await fetch(apiUrlPosts);
        const data = await response.json();
        return data;
}

async function contentInfo(){
    try {
        const apiResult = await FetchApi();
        
        hideXMark();
        thePageNr = 1;
        
        ViewMoreBtn.style.display = "block";
        pageContent.innerHTML = "";

        blogListPostStyle(apiResult);
    }
    catch (error) {
        console.log(error);
        pageContent.innerHTML = error;
    }
}
contentInfo();

async function fetchMorePosts(){
    try{
        thePageNr ++;
        
        const response = await fetch(apiUrlPosts + pageNumbr + thePageNr);
        const apiResult = await response.json();
            
        blogListPostStyle(apiResult);

        if(apiResult.length < 10  ){
            ViewMoreBtn.style.display = "none";
        } 
    }
    catch (error) {
        console.log(error);
        pageContent.innerHTML = error;
    }
}

async function get99Apiposts(){
    let pageAmount = "&per_page=99";
    
    const response = await fetch(apiUrlPosts + pageAmount);
    const data = await response.json();

    pageContent.innerHTML = "";

    return data;
}

async function mealFilter(){
    try {
        const apiData = await get99Apiposts();

        let mealType = this;

        hideXMark();
        let newXStyle = mealType.nextElementSibling;
        newXStyle.style.display = "initial";
        
        let apiResult = apiData.filter(blogPost => blogPost._embedded["wp:term"][1][0].name === mealType.textContent);
        
        blogListPostStyle(apiResult);
    }
    catch (error) {
        console.log(error);
        pageContent.innerHTML = error;
    }
}

function blogListPostStyle(apiResult){
    Object.values(apiResult).forEach(function(postData){
        let date =  new Date(postData.date_gmt);       
        const postDate = date.toLocaleString("en-GB", dateSetup);

        pageContent.innerHTML += `  <a href="/specific-blog-post.html?id=${postData.id}" class="blog-entry">
                                    <img src="${postData._embedded["wp:featuredmedia"][0].source_url}" alt="${postData._embedded["wp:featuredmedia"][0].alt_text}" />
                                    <h2>${postData.title.rendered}</h2>
                                    <p>${postDate}</p>
                                    </a>`
    });
}

function hideXMark(){
    ViewMoreBtn.style.display = "none";
    for (let i = 0; i < faXMark.length; i++) {
        faXMark[i].style.display = "none";
    }
}