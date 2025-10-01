"use strict";

const movieListContainer = document.querySelector("#movie-list");
const MOVIES_URL =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";

function displayMovie(movieObject) {
  const genreString = movieObject.genre.join(", ");
  const actorsString = movieObject.actors.join(", ");

  const movieHTML = `
    <article class="movie-card" tabindex="0">
      <img src="${movieObject.image}" 
           alt="Poster of ${movieObject.title}" 
           class="movie-poster" />
      <div class="movie-info">
        <h3>${movieObject.title} <span class="movie-year">(${movieObject.year})</span></h3>
        <p class="movie-genre">${genreString}</p>
        <p class="movie-rating">⭐ ${movieObject.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${movieObject.director}</p>
        <p class="movie-actors"><strong>Stars:</strong> ${actorsString}</p>
      </div>
    </article>
  `;

  movieListContainer.insertAdjacentHTML("beforeend", movieHTML);
}

function displayMovies(movieArray) {
  movieListContainer.innerHTML = "";
  for (const movie of movieArray) {
    displayMovie(movie);
  }
  console.log(`🎉 ${movieArray.length} movies vist!`);
}

async function loadMovies() {
  try {
    console.log("🌐 Henter movies fra JSON...");
    const response = await fetch(MOVIES_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const moviesFromJSON = await response.json();
    console.log(`📊 Fik ${moviesFromJSON.length} movies`);

    displayMovies(moviesFromJSON);
  } catch (error) {
    console.error("❌ Kunne ikke hente movies:", error);
  }
}

loadMovies();
