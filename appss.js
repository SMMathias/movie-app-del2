"use strict";

// ========== MOVIE OBJECTS ==========

// Movie 1: Barbie
const barbieMovie = {
  id: 1,
  title: "Barbie",
  year: 2023,
  genre: ["Adventure", "Comedy", "Fantasy"],
  rating: 7.0,
  director: "Greta Gerwig",
  image:
    "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
  actors: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
  description:
    "Barbie and Ken embark on a journey of self-discovery after leaving the utopian Barbie Land for the real world.",
};

console.log("Barbie movie object:", barbieMovie);

// Movie 2: Dune
const duneMovie = {
  id: 2,
  title: "Dune",
  year: 2021,
  genre: ["Adventure", "Drama", "Sci-Fi"],
  rating: 8.0,
  director: "Denis Villeneuve",
  image:
    "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
  actors: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
  description:
    "Paul Atreides leads nomadic tribes in a battle to control the desert planet Arrakis and its valuable spice.",
};

console.log("Dune movie object:", duneMovie);

// Movie 3: Dune: Part Two
const duneTwoMovie = {
  id: 3,
  title: "Dune: Part Two",
  year: 2024,
  genre: ["Action", "Adventure", "Drama"],
  rating: 8.7,
  director: "Denis Villeneuve",
  image:
    "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_.jpg",
  actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
  description:
    "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
};

console.log("Dune: Part Two movie object:", duneTwoMovie);

const eaaaoMovie = {
  id: 4, // Unikt nummer for filmen
  title: "Everything Everywhere All at Once",
  year: 2022, // Number, ikke string!
  genre: ["Action", "Adventure", "Comedy"], // Array med genres, f.eks. ["Action", "Drama"]
  rating: 7.8, // Number (kan have decimaler)
  director: "Daniel Kwan, Daniel Scheinert",
  image:
    "https://m.media-amazon.com/images/M/MV5BOWNmMzAzZmQtNDQ1NC00Nzk5LTkyMmUtNGI2N2NkOWM4MzEyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", // URL til poster billede
  actors: ["Michele Yeoh", "Ke Huy Quan", "Stephanie Hsu"], // Array med skuespillere
  description:
    "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.", // Kort beskrivelse af filmen
};

console.log("Everything Everywhere All at Once", eaaaoMovie);

const fightClubMovie = {
  id: 5,
  title: "Fight Club",
  year: 1999,
  genre: ["Drama", "Thriller"],
  rating: 8.8,
  director: "David Fincher",
  image: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
  actors: ["Edward Norton", "Brad Pitt", "Helena Bonham Carter"],
  description:
    "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something far more dangerous.",
};

console.log("Fight Club", fightClubMovie);

const forrestGumpMovie = {
  id: 6,
  title: "Forrest Gump",
  year: 1994,
  genre: ["Drama", "Romance"],
  rating: 8.8,
  director: "Robert Zemeckis",
  image:
    "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
  actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
  description:
    "Forrest Gump, a kind-hearted man with a low IQ, recounts his extraordinary life story and its impact on American history.",
};

console.log("Forrest Gump", forrestGumpMovie);

const goodfellasMovie = {
  id: 7,
  title: "Goodfellas",
  year: 1990,
  genre: ["Biography", "Crime", "Drama"],
  rating: 8.7,
  director: "Martin Scorsese",
  image: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg",
  actors: ["Ray Liotta", "Robert De Niro", "Joe Pesci"],
  description:
    "The rise and fall of mob associate Henry Hill and his friends spans three decades in the New York mafia.",
};

console.log("Goodfellas", goodfellasMovie);

const inceptionMovie = {
  id: 8,
  title: "Inception",
  year: 2010,
  genre: ["Action", "Adventure", "Sci-Fi"],
  rating: 8.8,
  director: "Christopher Nolan",
  image: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
  actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  description:
    "A skilled thief enters the subconscious of his targets to steal secrets, but his latest job threatens to blur the line between dreams and reality.",
};

console.log("Inception", inceptionMovie);

// Test hvordan du får adgang til movie data
console.log("=== TESTING MOVIE OBJECTS ===");

console.log("Barbie title:", barbieMovie.title);
console.log("Dune year:", duneMovie.year);
console.log("Fight Club rating:", fightClubMovie.rating);
console.log("Inception director:", inceptionMovie.director);

// Opret beskeder med movie data
console.log(
  `${barbieMovie.title} (${barbieMovie.year}) - Rating: ⭐ ${barbieMovie.rating}`
);
console.log(`${duneMovie.title} er instrueret af ${duneMovie.director}`);
console.log(
  `${fightClubMovie.title} er fra ${fightClubMovie.year} og har rating ${fightClubMovie.rating}`
);

// Du kan nu programmatisk arbejde med data:

// Ændre rating
barbieMovie.rating = 7.5;
console.log("Updated Barbie rating:", barbieMovie.rating);

// Tilføje ny property
barbieMovie.watched = true;
console.log("Barbie movie with watched status:", barbieMovie);

// Beregne movie alder
const currentYear = new Date().getFullYear();
const barbieAge = currentYear - barbieMovie.year;
console.log(`${barbieMovie.title} er ${barbieAge} år gammel`);
