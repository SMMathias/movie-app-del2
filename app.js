"use strict";

// #0: Listen for page load
window.addEventListener("load", initApp);

const MOVIES_URL =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";

let allMovies = [];
let movieListElement;
let searchInput;
let genreSelect;
let sortSelect;
let yearFromInput;
let yearToInput;
let ratingFromInput;
let ratingToInput;
let clearFiltersButton;
let movieDialog;
let dialogContent;

// #1: Initialize the app
function initApp() {
  console.log("initApp: app.js is running 🎉");

  movieListElement = document.querySelector("#movie-list");
  searchInput = document.querySelector("#search-input");
  genreSelect = document.querySelector("#genre-select");
  sortSelect = document.querySelector("#sort-select");
  yearFromInput = document.querySelector("#year-from");
  yearToInput = document.querySelector("#year-to");
  ratingFromInput = document.querySelector("#rating-from");
  ratingToInput = document.querySelector("#rating-to");
  clearFiltersButton = document.querySelector("#clear-filters");
  movieDialog = document.querySelector("#movie-dialog");
  dialogContent = document.querySelector("#dialog-content");

  if (
    !movieListElement ||
    !searchInput ||
    !genreSelect ||
    !sortSelect ||
    !yearFromInput ||
    !yearToInput ||
    !ratingFromInput ||
    !ratingToInput ||
    !clearFiltersButton ||
    !movieDialog ||
    !dialogContent
  ) {
    console.error("❌ Mangler nødvendige DOM-elementer til appen");
    return;
  }

  getMovies();

  searchInput.addEventListener("input", filterMovies);
  genreSelect.addEventListener("change", filterMovies);
  sortSelect.addEventListener("change", filterMovies);
  yearFromInput.addEventListener("input", filterMovies);
  yearToInput.addEventListener("input", filterMovies);
  ratingFromInput.addEventListener("input", filterMovies);
  ratingToInput.addEventListener("input", filterMovies);
  clearFiltersButton.addEventListener("click", clearAllFilters);
}

// #2: Fetch movies from JSON and display them
async function getMovies() {
  try {
    console.log("🌐 Henter alle movies fra JSON...");
    const response = await fetch(MOVIES_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    allMovies = await response.json();
    console.log(`📊 JSON data modtaget: ${allMovies.length} movies`);

    populateGenreDropdown();
    filterMovies();
  } catch (error) {
    console.error("❌ Kunne ikke hente movies:", error);
    movieListElement.innerHTML =
      '<div class="movie-list-empty"><p>🚨 Kunne ikke hente filmdata.</p></div>';
  }
}

// #3: Render all movies in the grid
function displayMovies(movies) {
  movieListElement.innerHTML = "";

  if (!movies.length) {
    movieListElement.insertAdjacentHTML(
      "beforeend",
      '<div class="movie-list-empty"><p>🎬 Ingen film matchede dine filtre...</p></div>'
    );
    return;
  }

  console.log(`🎬 Viser ${movies.length} movies`);
  for (const movie of movies) {
    displayMovie(movie);
  }
}

// #4: Render a single movie card
function displayMovie(movie) {
  const movieHTML = `
    <article class="movie-card" tabindex="0">
      <img src="${movie.image}" 
           alt="Poster of ${movie.title}" 
           class="movie-poster" />
      <div class="movie-info">
        <h3>${movie.title} <span class="movie-year">(${movie.year})</span></h3>
        <p class="movie-genre">${movie.genre.join(", ")}</p>
        <p class="movie-rating">${movie.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${movie.director}</p>
      </div>
    </article>
  `;

  movieListElement.insertAdjacentHTML("beforeend", movieHTML);

  const newCard = movieListElement.lastElementChild;
  newCard.addEventListener("click", () => {
    console.log(`🎬 Klik på: "${movie.title}"`);
    showMovieModal(movie);
  });

  newCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showMovieModal(movie);
    }
  });
}

// #5: Kombineret søgning, genre, år, rating og sortering
function filterMovies() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const genreValue = genreSelect.value;
  const sortValue = sortSelect.value;
  const yearFrom = yearFromInput.value === "" ? 0 : Number(yearFromInput.value);
  const yearTo = yearToInput.value === "" ? 9999 : Number(yearToInput.value);
  const ratingFrom =
    ratingFromInput.value === "" ? 0 : Number(ratingFromInput.value);
  const ratingTo = ratingToInput.value === "" ? 10 : Number(ratingToInput.value);

  let filteredMovies = [...allMovies];

  if (searchValue) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue)
    );
  }

  if (genreValue !== "all") {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.includes(genreValue)
    );
  }

  if (yearFrom > 0 || yearTo < 9999) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.year >= yearFrom && movie.year <= yearTo
    );
  }

  if (ratingFrom > 0 || ratingTo < 10) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.rating >= ratingFrom && movie.rating <= ratingTo
    );
  }

  if (sortValue === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "year") {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortValue === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  }

  displayMovies(filteredMovies);
}

// #6: Udfyld genre-dropdown med alle unikke genrer
function populateGenreDropdown() {
  const genres = new Set();

  for (const movie of allMovies) {
    for (const genre of movie.genre) {
      genres.add(genre);
    }
  }

  const sortedGenres = Array.from(genres).sort();
  genreSelect.innerHTML = '<option value="all">Alle genrer</option>';

  for (const genre of sortedGenres) {
    genreSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${genre}">${genre}</option>`
    );
  }
}

// #7: Ryd alle filtre
function clearAllFilters() {
  searchInput.value = "";
  genreSelect.value = "all";
  sortSelect.value = "none";
  yearFromInput.value = "";
  yearToInput.value = "";
  ratingFromInput.value = "";
  ratingToInput.value = "";

  filterMovies();
}

// #8: Vis movie i modal dialog
function showMovieModal(movie) {
  dialogContent.innerHTML = `
    <img src="${movie.image}" alt="Poster af ${movie.title}" class="movie-poster" />
    <div class="dialog-details">
      <h2>${movie.title} <span class="movie-year">(${movie.year})</span></h2>
      <p class="movie-genre">${movie.genre.join(", ")}</p>
      <p class="movie-rating">${movie.rating}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Actors:</strong> ${movie.actors.join(", ")}</p>
      <p class="movie-description">${movie.description}</p>
    </div>
  `;

  if (typeof movieDialog.showModal === "function") {
    movieDialog.showModal();
  } else {
    alert("Din browser understøtter ikke modals. Opgrader venligst din browser.");
  }
}
