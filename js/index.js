const blogSection = document.querySelector(".blog-carousel-section");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const blogEntry = document.querySelectorAll(".blog-entry");

// Reference: How to Create a Carousel (Basic) - HTML, CSS & JavaScript Web Design Tutorial  https://www.youtube.com/watch?v=XtFlpgaLbZ4

// blogSection.forEach((item, i) => {
//     let containerDimensions = item.getBoundingClientRect();
//     let containerWidth = containerDimensions.width;
//     arrowRight[i].addEventListener("click", () => {
//         item.scrollLeft += containerWidth;
//     })
// });

arrowRight.addEventListener("click", (event) => {
    const slideWidth = blogEntry.clientWidth;
    blogSection.scrollLeft += slideWidth;
    console.log("hello");
});

arrowLeft.addEventListener("click", (event) => {
    const slideWidth = blogEntry.clientWidth;
    blogSection.scrollLeft += slideWidth;
    console.log("hello");
});