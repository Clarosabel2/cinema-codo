import { getDetailsMovie } from "./APImovies.js";

const btnsInfo = document.querySelectorAll(".movie-card"),
  btnClose = document.querySelector(".btn-close"),
  ctnInfo = document.querySelector(".container-info"),
  main = document.querySelector("main");

/* Funcion que permite obtener el informacion de la pelicula seleccionada*/
/*
btnsInfo.forEach((btn) => {
  btn.addEventListener("click", function () {
    tittleMovie = this.querySelector(".title-movie").textContent;
    ctnInfo.querySelector(".title-info").textContent = tittleMovie;
    var movieInfo = this.querySelector(".movie-image").src;
    var pathImg = movieInfo.replace(/^.*\/\/[^\/]+/, "");
    ctnInfo.querySelector(".movie-selectimg").src = pathImg;
    ctnInfo.classList.add("show");
    ctnInfo.classList.remove("close");
    ctnInfo.style.visibility = "visible";
    main.classList.add("pointer-e");
    document.body.style.overflow="hidden";
    
  });
});*/

/*Cierra el container de informacion de la pelicula selecciona*/

btnClose.addEventListener("click", function () {
  ctnInfo.classList.remove("show");
  ctnInfo.classList.add("close");
  main.classList.remove("pointer-e");
  document.body.style.overflow="auto";
});

/*Corrobora que haya finalizado una animacion*/

ctnInfo.addEventListener("animationend", function (event) {
  if (event.animationName === "scale-down-center") {
    ctnInfo.style.visibility = "hidden";
    ctnInfo.classList.remove("show");
  }
});

document.querySelector(".grid-container").addEventListener("click", function (e) {
  if (e.target.closest(".movie-card")) {
    const movieCard = e.target.closest(".movie-card");

    const idMovie = movieCard.getAttribute('data-id');
    getDetailsMovie(idMovie);

    const tittleMovie = movieCard.querySelector(".title-movie").textContent;
    const ctnInfo = document.querySelector(".container-info");
    const main = document.querySelector("main");
    
    ctnInfo.querySelector(".title-info").textContent = tittleMovie;
    const movieInfo = movieCard.querySelector(".movie-image").src;
    //console.log(movieInfo);
    //const pathImg = movieInfo.replace(/^.*\/\/[^\/]+/, "");
    //console.log(pathImg);
    ctnInfo.querySelector(".movie-selectimg").src = movieInfo;
    ctnInfo.classList.add("show");
    ctnInfo.classList.remove("close");
    ctnInfo.style.visibility = "visible";
    main.classList.add("pointer-e");
    document.body.style.overflow = "hidden";
  }
});