const blogSection = document.querySelector(".blog-carousel-section");
const caruselContent = document.querySelector(".carusel-content-box");
const blogPostContainer = document.querySelectorAll(".carusel-content");

const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

arrowLeft.addEventListener("click",lastEntryRow);

arrowRight.addEventListener("click",nextEntryRow);

const entrySize = caruselContent.clientWidth;
console.log(entrySize)

// Reference: How To Make An Infinite Image Slider That Loops with HTML CSS and JavaScript  https://www.youtube.com/watch?v=wjC8iGt67UE

var clicks = 0;
var caruselWidthContent = caruselContent.offsetWidth;

console.log("hello",caruselWidthContent);

console.log("hello2y",blogPostContainer);

function lastEntryRow (){
    const leftArrowClick = clicks * caruselWidthContent
    clicks -= 1;
    console.log("hello",clicks);
    for(let i = 0; i < blogPostContainer.length; i++){
        console.log("hello2y",blogPostContainer[i]);
        if(clicks === -1 || clicks === 2 ){
            clicks = 2;
            blogPostContainer[i].style.transform = `translateX(${-entrySize * 2}px)`;
            blogPostContainer[i].style.transition = "300ms ease-in-out transform";
            navSymbolChange (); 
            console.log("hello",clicks);
        }
        else{
            blogPostContainer[i].style.transform = `translateX(${entrySize - leftArrowClick}px)`;
            blogPostContainer[i].style.transition = "300ms ease-in-out transform";
            console.log("click <-", clicks);
            navSymbolChange (); 
        }
    }
}

function nextEntryRow (){
    const rightArrowClick = clicks * caruselWidthContent
    clicks += 1;
    for(let i = 0; i < blogPostContainer.length; i++){
            if(clicks === 3 || clicks === 0 ){
                clicks = 0;
                blogPostContainer[i].style.transform = `translateX(0px)`;
                blogPostContainer[i].style.transition = "300ms ease-in-out transform";
                navSymbolChange (); 
            }
            else{
                blogPostContainer[i].style.transform = `translateX(${-entrySize - rightArrowClick}px)`;
                blogPostContainer[i].style.transition = "300ms ease-in-out transform";
                console.log("click ->",clicks);
                navSymbolChange ();
            }
        }
}


const carouselNavSymbols1 = document.querySelector(".nav-btn-1");
const carouselNavSymbols2 = document.querySelector(".nav-btn-2");
const carouselNavSymbols3 = document.querySelector(".nav-btn-3");

function navSymbolChange () {
    if(clicks === 0){
        carouselNavSymbols1.style.backgroundColor = "var(--carousel-nav-symbols-selected)";
        carouselNavSymbols1.style.border = "solid 1px var(--standar-black-color)";
    }
    else{
        carouselNavSymbols1.style.backgroundColor = "var(--carousel-nav-symbols-not-selected)";
        carouselNavSymbols1.style.border = "none";
    }
    if(clicks === 1){
        carouselNavSymbols2.style.backgroundColor = "var(--carousel-nav-symbols-selected)";
        carouselNavSymbols2.style.border = "solid 1px var(--standar-black-color)";
    }
    else{
        carouselNavSymbols2.style.backgroundColor = "var(--carousel-nav-symbols-not-selected)";
        carouselNavSymbols2.style.border = "none";
    }
    if(clicks === 2){
        carouselNavSymbols3.style.backgroundColor = "var(--carousel-nav-symbols-selected)";
        carouselNavSymbols3.style.border = "solid 1px var(--standar-black-color)";
    }
    else{
        carouselNavSymbols3.style.backgroundColor = "var(--carousel-nav-symbols-not-selected)";
        carouselNavSymbols3.style.border = "none";
    }
}
navSymbolChange ();
