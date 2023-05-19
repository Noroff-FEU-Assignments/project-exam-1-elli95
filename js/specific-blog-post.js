import {
    apiBase,
    postBace,
    postEndpoint,
    embeddedBase } from "/js/source.js";

const pageContent = document.querySelector(".blog-post-content");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

const blogPostBase = apiBase + postBace + postEndpoint + productId + embeddedBase ;

// console.log("url info123123123", blogPostBase);

async function FetchApi(){
    try{
        const response = await fetch(blogPostBase);
        const data = await response.json();
        // console.log("url info", data);
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
    console.log("data123", apiData);
    pageContent.innerHTML = "";

    //Date.prototype.toLocaleString()  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    let date =  new Date(apiData.date_gmt);

    const options = {
        // weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    
    const postDate = date.toLocaleString("en-GB", options);

    document.title = `The Cozy Cooking Pot | ${apiData.title.rendered}`;

        pageContent.innerHTML += `  <h1>${apiData.title.rendered}</h1>
                                    <img src="${apiData._embedded["wp:featuredmedia"][0].source_url}" alt="${apiData._embedded["wp:featuredmedia"][0].alt_text}" />
                                    <div class="modal-section">
                                    <div class="modal-img">hello</div>
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

// window.addEventListener("load", (event) => {
//     getImages();
// });

// function getImages(){
//       setTimeout(() => {  
//     //   const pageImg = document.getElementsByTagName("img");
//       const pageImg = document.querySelectorAll("img");
//       console.log("pageImg",pageImg);
//       for(var i = 0; i <= pageImg.length; i++){
//             pageImg[i].addEventListener("click", biggerImg);
//           console.log("pageImg1----",pageImg[i]);
//         //   if (window.addEventListener) {
//         //     //   console.log("pageImg2----",pageImg[i]);
//         //     //   pageImg[i].addEventListener("click", biggerImg);
//         //   }
//       }
//       }, 500);
// }



async function biggerImg(){
    const apiData = await FetchApi();
    const modalSection = document.querySelector(".modal-section");
    const modalImg = document.querySelector(".modal-img");
    // console.log("modalSection",modalSection);
    modalSection.style.display = "block";
    // console.log("this is the way");
    
    modalImg.innerHTML = `<img class="modal-img-style" src="${apiData._embedded["wp:featuredmedia"][0].source_url}" alt="${apiData._embedded["wp:featuredmedia"][0].alt_text}" />`

    document.onclick = function(event) {
        if (event.target === modalSection) {
            modalSection.style.display = "none";
        }
    }
    // document.addEventListener("click");
    // if (document.addEventListener("click")){  
    //     modalSection.style.display = "none";
    // }

}

// document.addEventListener("click", noModal);

// function noModal(){
//     console.log("dgbnaspdnvsdnvaudhbsdvmsd");
// //     modalSection.style.display = "none";
// }


      // // const pageImg = document.querySelector("#post-image");
      // pageImg.addEventListener("click", biggerImg);
  
      // const images = document.querySelectorAll("img");
  
          // pageImg[i].addEventListener("click", biggerImg);

    //   const pageImg = document.getElementsByTagName("img");
      
      // console.log("pageImg",images);

// pageImg.addEventListener("click", biggerImg);

// async function main(){
//     const apiData = await FetchApi();
//     createHTML(apiData);
// }
// main()

// function createHTML(apiData){

//     const title = document.createElement("h1");
//     title.innerText = apiData.title.rendered;
//     pageContent.append(title);

//     const image = document.createElement("img");
//     image.innerText = apiData._embedded["wp:featuredmedia"][0].source_url;
//     pageContent.append(image);

//     const date = document.createElement("p");
//     date.innerText = apiData.date_gmt;
//     date.classList.add("date");
//     pageContent.append(date);

//     const postContent = document.createElement("div");
//     postContent.innerHTML = apiData.content.rendered;
//     postContent.classList.add("description-ingredients");
//     pageContent.append(postContent);
// }