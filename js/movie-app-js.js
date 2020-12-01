"use strict";

<!--url for Glitch Movie API-->
const url = "https://bolder-voracious-deposit.glitch.me/movies";

const getMovies = () => fetch(url)
        .then(result => result.json())
        .catch(console.error);


const getSingleMovie = (id) => fetch(`${url}/${id}`)
    .then(result => result.json())
    .catch(console.error);


const editMovie = (movie) => fetch(`${url}/${movie.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(movie)
})
    .then(result => result.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
        renderMovies();
    })
    .catch(console.error);


//Allows user to edit a film title
$(document).on('click', '.save-changes', function () {
    let thisId = $(this).data("id");
    let movieObject = {
        title: $(this).parent().prev().children().val(),
        id: thisId
    }
    editMovie(movieObject);
    $("#editModal" + thisId).modal("toggle");
})


const deleteMovie = (movie) => fetch(`${url}/${movie.id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then(result => result.json())
    .then(() => {
        console.log((`Success: deleted movie with id of ${movie.id}`));
        renderMovies();
    })
    .catch(console.error);


//Allows user to delete a film from the database
$(document).on('click', '.delete-movie', function () {
    let thisId = $(this).data("id");
    let movieObject = {
        id: thisId
    }
    deleteMovie(movieObject);
    $("#deleteModal" + thisId).modal("toggle");
})


const addMovie = (movie) => fetch(`${url}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(movie)
})
    .then(result => result.json())
    .then(data => {
        console.log(`Success: created ${JSON.stringify(data)}`);
        renderMovies();
    })
    .catch(console.error);


$(document).on("click", "#add-movie-btn", function(){
    let newTitle = $("#add-new-movie").val();
    let newRating = $("#add-new-rating").val();
    let movieObject = {
        title: newTitle,
        rating: newRating,
    }
    console.log(movieObject);
    addMovie(movieObject);

})


getMovies().then(movies => {
    let movieHtml = '<div class="album py-5 bg-dark">\n' +
        '        <div class="container">\n' +
        '            <div class="row">';
    for (let movie of movies) {
        movieHtml += `<div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="${movie.poster}" alt="pic">
                        <div class="card-body">
                            <p class="card-text">${movie.title}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#movieModal${movie.id}">View</button>
                                <div class="modal fade" id="movieModal${movie.id}" tabindex="-1" role="dialog" aria-labelledby="movieModal${movie.id}Label" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="movieModal${movie.id}Label">${movie.title}</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Rating: ${movie.rating}</p>
                                                <p>Year: ${movie.year}</p>
                                                <p>Directed by: ${movie.director}</p>
                                                <p>Plot: ${movie.plot}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-warning" data-id="${movie.id}" data-toggle="modal" data-target="#editModal${movie.id}">Edit</button>
                                    <div class="modal fade editModal" id="editModal${movie.id}" tabindex="-1" role="dialog" aria-labelledby="editModal${movie.id}Label" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="editModal${movie.id}Label">${movie.title}</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>See something wrong? Make it right!</p>
                                                    <form class="input-group">
                                                        <input id="edit-title-${movie.id}" type="text" class="form-control form-control-sm" placeholder="Edit movie title" aria-label="Edit Movie" aria-describedby="basic-addon2">
                                                    </form>
                                                    <div class="modal-footer">
                                                        <button id ="save-changes-btn-${movie.id}" type="button" class="btn btn-sm btn-warning save-changes" data-id="${movie.id}">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal${movie.id}">Delete</button>
                                    <div class="modal fade" id="deleteModal${movie.id}" tabindex="-1" role="dialog" aria-labelledby="deleteModal${movie.id}Label" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="deleteModal${movie.id}Label">${movie.title}</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h3 class="text-center">WARNING!!!</h3>
                                                    <h3 class="text-center">YOU ARE ABOUT TO DELETE THIS ENTRY!</h3>
                                                    <p class="text-center">You cannot undo this action. Are you sure you wish to continue?</p>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-sm btn-danger delete-movie" data-id="${movie.id}">Delete movie</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    movieHtml += '</div>';

    $("#movie-div").html(movieHtml);
    renderHeader();
    renderJumbo();
    renderFooter();
})


const renderMovies = () => {
    getMovies().then(movies => {
        let movieHtml = '<div class="album py-5 bg-dark">\n' +
            '        <div class="container">\n' +
            '            <div class="row">';
        for (let movie of movies) {
            movieHtml += `<div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="${movie.poster}" alt="pic">
                        <div class="card-body">
                            <p class="card-text">${movie.title}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#movieModal${movie.id}">View</button>
                                <div class="modal fade" id="movieModal${movie.id}" tabindex="-1" role="dialog" aria-labelledby="movieModal${movie.id}Label" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="movieModal${movie.id}Label">${movie.title}</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Rating: ${movie.rating}</p>
                                                <p>Year: ${movie.year}</p>
                                                <p>Directed by: ${movie.director}</p>
                                                <p>Plot: ${movie.plot}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-warning" data-id="${movie.id}" data-toggle="modal" data-target="#editModal${movie.id}">Edit</button>
                                    <div class="modal fade editModal" id="editModal${movie.id}" tabindex="-1" role="dialog" aria-labelledby="editModal${movie.id}Label" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="editModal${movie.id}Label">${movie.title}</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>See something wrong? Make it right!</p>
                                                    <form class="input-group">
                                                        <input id="edit-title-${movie.id}" type="text" class="form-control form-control-sm" placeholder="Edit movie title" aria-label="Edit Movie" aria-describedby="basic-addon2">
                                                    </form>
                                                    <div class="modal-footer">
                                                        <button id ="save-changes-btn-${movie.id}" type="button" class="btn btn-sm btn-warning save-changes" data-id="${movie.id}">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal${movie.id}">Delete</button>
                                    <div class="modal fade" id="deleteModal${movie.id}" tabindex="-1" role="dialog" aria-labelledby="deleteModal${movie.id}Label" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="deleteModal${movie.id}Label">${movie.title}</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h3 class="text-center">WARNING!!!</h3>
                                                    <h3 class="text-center">YOU ARE ABOUT TO DELETE THIS ENTRY!</h3>
                                                    <p class="text-center">You cannot undo this action. Are you sure you wish to continue?</p>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-sm btn-danger delete-movie" data-id="${movie.id}">Delete movie</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        }
        movieHtml += '</div>';

        $("#movie-div").html(movieHtml);
        renderHeader();
        renderJumbo();
        renderFooter();
    })
}


const renderHeader = () => {
    $("#pageHeader").html("");
    let headerHtml = `<div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-md-7 py-3">
                    <h4 class="text-white">K&E Movies</h4>
                    <p class="text-muted">We're a bunch of film nerds. Let us pass on our recommendations to you! Please. We have no social life.</p>
                </div>
                <div class="col-sm-4 offset-md-1 py-3">
                    <h4 class="text-white">Contact</h4>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white"><i class="fab fa-instagram-square"></i> Instagram</a></li>
                        <li><a href="#" class="text-white"><i class="fab fa-twitter-square"></i> Twitter</a></li>
                        <li><a href="#" class="text-white"><i class="fab fa-instagram-square"></i> Facebook</a></li>
                        <li><a href="#" class="text-white"><i class="far fa-envelope"></i> weLikeMovies@movieEmail.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="navbar navbar-dark bg-dark">
        <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center">
                <strong><i class="fas fa-video"></i></i> Movies</strong>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>`;
    $("#pageHeader").html(headerHtml)
}


const renderJumbo = () => {
    $("#jumbotron-div").html("");
    let jumboHtml = `<section class="jumbotron text-center bg-warning mb-0">
        <div class="container-fluid">
            <h1 class="jumbotron-heading">Movies!!!</h1>
            <p class="lead text-muted">"Photography is truth...and cinema is truth 24 times a second."   --Jean-Luc Godard</p>
            <p>
                <a href="#" class="btn btn-info my-2" id="add-movie-btn">Add a movie!</a>
            </p>
            <form class="input-group">
                 <input id="add-new-movie" type="text" class="form-control form-control-sm" placeholder="Add new movie title" aria-label="add Movie" aria-describedby="basic-addon2">
            </form>
            <form class="input-group">
                 <input id="add-new-rating" type="text" class="form-control form-control-sm" placeholder="Add a rating" aria-label="add Rating" aria-describedby="basic-addon2">
            </form>
        </div>
    </section>`;
    $("#jumbotron-div").html(jumboHtml);
}


const renderFooter = () => {
    $("#footer-div").html("");
    let footerHtml = `<footer class="footer font-small bg-dark pt-4">
    <div class="container">
        <div class="row">
            <div class="col-md-6 mb-4">
                <form class="form-inline">
                    <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
                           aria-label="Search">
                    <a href=""><i class="fas fa-search text-warning" aria-hidden="true"></i></a>
                </form>
            </div>
            <div class="col-md-6 mb-4">
                <form class="input-group">
                    <input type="text" class="form-control form-control-sm" placeholder="Your email"
                           aria-label="Your email" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-sm btn-outline-warning my-0" type="button">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</footer>`
    $("#footer-div").html(footerHtml);
}


