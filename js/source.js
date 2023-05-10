const apiBase = "https://thecozycookingpot.elisemariehogsnes.no";
const postBace = "/wp-json";
const commentEndpoint = "/wp/v2/comments";
const postEndpoint = "/wp/v2/posts/";
const embeddedBase = "?_embed";

// async function fetchApi(){
//         const response = await fetch(apiBase + postBace + postEndpoint);
//         const data = await response.json();
//         console.log("url info", data);
// }

export{
    apiBase,
    postBace,
    commentEndpoint,
    postEndpoint,
    embeddedBase
}