const apiBase = "https://thecozycookingpot.elisemariehogsnes.no";
const postBace = "/wp-json";
const postEndpoint = "/wp/v2/posts/";
const mediaEndpoint = "?_embed";

// async function fetchApi(){
//         const response = await fetch(apiBase + postBace + postEndpoint);
//         const data = await response.json();
//         console.log("url info", data);
// }

export{
    apiBase,
    postBace,
    postEndpoint,
    mediaEndpoint
}