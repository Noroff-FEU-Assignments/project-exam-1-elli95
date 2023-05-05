const blogSection = document.querySelector(".blog-carousel-section");
const caruselContent = document.querySelector(".carusel-content");
const blogEntry = document.querySelectorAll(".carusel-content a");

const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

arrowLeft.addEventListener("click",lastEntryRow);
arrowRight.addEventListener("click",nextEntryRow);

const entrySize = caruselContent.clientWidth;

// Reference: How To Make An Infinite Image Slider That Loops with HTML CSS and JavaScript  https://www.youtube.com/watch?v=wjC8iGt67UE

var clicks = 0;
var caruselWidthContent = caruselContent.offsetWidth;

function lastEntryRow (){
    rightArrowClick = clicks * caruselWidthContent
    clicks -= 1;
    for(let i = 0; i < blogEntry.length; i++){
        if(clicks === -1 || clicks === 2 ){
            clicks = 2;
            blogEntry[i].style.transform = `translateX(-3380px)`;
            blogEntry[i].style.transition = "300ms ease-in-out transform";
            navSymbolChange (); 
        }
        else{
            blogEntry[i].style.transform = `translateX(${entrySize - rightArrowClick}px)`;
            blogEntry[i].style.transition = "300ms ease-in-out transform";
            console.log("click <-", clicks);
            navSymbolChange (); 
        }
    }
}

function nextEntryRow (){
    rightArrowClick = clicks * caruselWidthContent
    clicks += 1;
    for(let i = 0; i < blogEntry.length; i++){
            if(clicks === 3 || clicks === 0 ){
                clicks = 0;
                blogEntry[i].style.transform = `translateX(0px)`;
                blogEntry[i].style.transition = "300ms ease-in-out transform";
                navSymbolChange (); 
            }
            else{
                blogEntry[i].style.transform = `translateX(${-entrySize - rightArrowClick}px)`;
                blogEntry[i].style.transition = "300ms ease-in-out transform";
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
        carouselNavSymbols1.style.backgroundColor = "lightgray";
        carouselNavSymbols1.style.border = "solid 1px black";
    }
    else{
        carouselNavSymbols1.style.backgroundColor = "gray";
        carouselNavSymbols1.style.border = "none";
    }
    if(clicks === 1){
        carouselNavSymbols2.style.backgroundColor = "lightgray";
        carouselNavSymbols2.style.border = "solid 1px black";
    }
    else{
        carouselNavSymbols2.style.backgroundColor = "gray";
        carouselNavSymbols2.style.border = "none";
    }
    if(clicks === 2){
        carouselNavSymbols3.style.backgroundColor = "lightgray";
        carouselNavSymbols3.style.border = "solid 1px black";
    }
    else{
        carouselNavSymbols3.style.backgroundColor = "gray";
        carouselNavSymbols3.style.border = "none";
    }
}
navSymbolChange ();
