import {getApiFromId} from "/js/source.js";

const pageContent = document.querySelector(".blog-post-content");

async function contentInfo(){
    const apiData = await getApiFromId();
    pageContent.innerHTML = "";

    //Reference: Date.prototype.toLocaleString()  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    let date =  new Date(apiData.date_gmt);
    const postDate = date.toLocaleString("en-GB", options);

    document.title = `The Cozy Cooking Pot | ${apiData.title.rendered}`;

    pageContent.innerHTML += `  <h1>${apiData.title.rendered}</h1>
                                <img src="${apiData._embedded["wp:featuredmedia"][0].source_url}" alt="${apiData._embedded["wp:featuredmedia"][0].alt_text}" />
                                <div class="modal-section">
                                <div class="modal-img"></div>
                                </div>
                                <p class="date">${postDate}</p>
                                <div class="description-ingredients">
                                ${apiData.content.rendered}
                                </div>`

    const pageImg = document.querySelectorAll("img");
        for (let i = 0; i < pageImg.length; i++) {
            pageImg[i].addEventListener("click", biggerImg);
        }          
}
contentInfo();

async function biggerImg(){
    let postImg = this;   

    const modalSection = document.querySelector(".modal-section");
    const modalImg = document.querySelector(".modal-img");
    
    modalSection.style.display = "block";
    modalImg.innerHTML = `<img src="${postImg.src}" alt="${postImg.alt}" />`

    document.onclick = function(event) {
        if (event.target === modalSection) {
            modalSection.style.display = "none";
        }
    }
}