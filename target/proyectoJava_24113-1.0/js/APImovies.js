const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGVjZTU3ZGMzNWQ1ODNhOTgyMDI3NmQ1MDYzMWM1MiIsInN1YiI6IjY2MzkyZGQ1NWVkOGU5MDEyNjE1N2UzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cY57u6tBCkChkaOTfAr8r83ao4p4hrGvvn6P_CmD1ho",
  },
};

fetch("https://api.themoviedb.org/3/movie/popular", options)
  .then((response) => response.json())
  .then((response) => createMovie(response.results))
  .catch((err) => console.error(err));

export function getDetailsMovie(idMovie) {
  const descriptionMovie = document.querySelector(".description-movie"),
    runtimeMovie = document.querySelector(".runtime-movie"),
    genreMovie = document.querySelector(".genre-movie");

  fetch(`https://api.themoviedb.org/3/movie/${idMovie}`, options)
    .then((response) => response.json())
    .then((response) => {
      descriptionMovie.innerHTML = response.overview;
      runtimeMovie.innerHTML =
        "<strong>Duración: </strong>" + response.runtime + " min";
    })
    .catch((err) => console.error(err));

  genreMovie.innerHTML ="<strong>Genero: </strong>";
  fetch(`https://api.themoviedb.org/3/movie/${idMovie}`, options)
    .then((response) => response.json())
    .then((response) => {
      response.genres.map((genre)=>{
        genreMovie.innerHTML+=genre.name+", ";
      })
    })
    .catch((err) => console.error(err));
}

function createMovie(data) {
  let i = 0;
  data.map((element) => {
    const articleMovie = `
            <article class="movie-card" data-id="${element.id}">
                <img src="${"https://image.tmdb.org/t/p/original/" + element.poster_path}" alt="Película Imagen" class="movie-image">
                <p class="title-movie">${element.original_title}</p>
            </article>`;
    document.querySelector(".grid-container").innerHTML += articleMovie;
    i++;
  });
}
