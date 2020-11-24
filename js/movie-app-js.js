"use strict";

<!--url for Glitch Movie API-->
const url = "https://absorbed-adaptive-silverfish.glitch.me/movies";

// function getMovies(movies) {
//     const url = "https://absorbed-adaptive-silverfish.glitch.me/movies";
//     return fetch(url)
//         .then(result => result.json())
//         .then(console.log)
//         .catch(console.error);
// }

const getMovies = () => fetch(url)
    .then(result => result.json())
    .catch(console.error);

const getSingleMovie = (id) => fetch(`${url}/${id}`)
    .then(result => result.json())
    .catch(console.error);

const editMovie = (movie) => fetch(`${url}/${movie.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(movie)
})
    .then(result => result.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
    })
    .catch(console.error);




getMovies().then(console.log);
getSingleMovie(3).then(console.log);
// editMovie(2).then(console.log);
