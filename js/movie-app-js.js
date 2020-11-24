"use strict";

<!--url for Glitch Movie API-->
const url = "https://absorbed-adaptive-silverfish.glitch.me/movies";

function getMovies(movies) {
    const url = "https://absorbed-adaptive-silverfish.glitch.me/movies";
    return fetch(url)
        .then(result => result.json())
        .then(console.log)
        .catch(console.error);
}
getMovies().then(console.log);



function addMovie () {


}