// Function to fetch movies from the backend
async function fetchMovies() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/movies"); // Replace with your actual API URL if necessary
    if (!response.ok) {
      throw new Error("Failed to fetch movies from the backend");
    }
    const movies = await response.json();
    renderMovies(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Function to render movies dynamically
function renderMovies(movies) {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = ""; // Clear any existing content

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="info">
        <h3>${movie.title}</h3>
        <div class="rating">
          <span>🎥 Release Date: ${movie.releaseDate}</span>
        </div>
        <a href="review.html?movie=${movie.imdbId}" class="review-button">
          <span class="review-icon">📝</span> Read Reviews
        </a>
        <a href="${movie.trailerLink}" target="_blank" class="play-button">
          <span class="play-icon">▶️</span> Watch Trailer
        </a>
      </div>
    `;

    movieList.appendChild(movieCard);
  });
}

// Light/Dark Mode Toggle Logic
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

// Check and apply the user's saved mode
const savedMode = localStorage.getItem("theme");
if (savedMode === "dark") {
  body.classList.add("dark-mode");
  modeToggle.textContent = "🌙";
}

// Toggle the mode on button click
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    modeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    modeToggle.textContent = "🌞";
    localStorage.setItem("theme", "light");
  }
});

// Fetch and render movies on page load
fetchMovies();
