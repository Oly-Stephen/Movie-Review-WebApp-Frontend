// Function to fetch movie details
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/movies/${movieId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const movie = await response.json();
    renderMovieDetails(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

// Function to render movie details
function renderMovieDetails(movie) {
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-poster").src = movie.poster;
  document.getElementById("movie-release-date").textContent = `Release Date: ${movie.releaseDate}`;

  // Render genres
  const genresContainer = document.getElementById("movie-genres");
  genresContainer.innerHTML = `<strong>Genres:</strong> ${movie.genres.join(", ")}`;

  // Render backdrops
  const backdropsContainer = document.getElementById("movie-backdrops");
  backdropsContainer.innerHTML = movie.backdrops
    .map(
      (backdrop, index) => `
      <img src="${backdrop}" alt="Backdrop" class="backdrop-image" data-index="${index}" />
    `
    )
    .join("");

  // Add click event listeners to backdrop images
  const backdropImages = document.querySelectorAll(".backdrop-image");
  backdropImages.forEach((img) => {
    img.addEventListener("click", () => openModal(movie.backdrops, img.dataset.index));
  });
}

// Function to open the modal and display the clicked backdrop
function openModal(backdrops, currentIndex) {
  const modal = document.getElementById("backdrop-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const prevButton = document.getElementById("prev-backdrop");
  const nextButton = document.getElementById("next-backdrop");

  // Display the modal and set the initial backdrop
  modal.style.display = "block";
  modalBackdrop.src = backdrops[currentIndex];

  // Update the backdrop when navigating
  function updateBackdrop(index) {
    modalBackdrop.src = backdrops[index];
  }

  // Handle next button click
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % backdrops.length;
    updateBackdrop(currentIndex);
  });

  // Handle previous button click
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + backdrops.length) % backdrops.length;
    updateBackdrop(currentIndex);
  });

  // Close the modal when the close button is clicked
  document.querySelector(".close-modal").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the image
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Function to fetch and render reviews
async function fetchReviews(movieId) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/reviews/movie/${movieId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = await response.json();
    renderReviews(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

// Function to render reviews
function renderReviews(reviews) {
  const reviewsContainer = document.getElementById("existing-reviews");
  reviewsContainer.innerHTML = ""; // Clear any existing content

  reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.className = "review";
    reviewElement.innerHTML = `
      <p>${review.body}</p>
      <p><em>Posted on: ${new Date(review.created).toLocaleDateString()}</em></p>
      ${review.updated ? `<p><em>Last updated: ${new Date(review.updated).toLocaleDateString()}</em></p>` : ""}
      <hr>
    `;
    reviewsContainer.appendChild(reviewElement);
  });
}

// Function to handle form submission
document.getElementById("add-review-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const movieId = new URLSearchParams(window.location.search).get("movie");
  const reviewText = document.getElementById("review-text").value;

  try {
    // Submit the new review
    const createResponse = await fetch(`http://localhost:8080/api/v1/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewBody: reviewText,
        imdbId: movieId,
      }),
    });

    if (!createResponse.ok) {
      throw new Error("Failed to submit review");
    }

    // Fetch the updated list of reviews
    await fetchReviews(movieId);

    // Clear the form
    document.getElementById("review-text").value = "";
  } catch (error) {
    console.error("Error submitting review:", error);
  }
});

// Fetch movie details and reviews on page load
const movieId = new URLSearchParams(window.location.search).get("movie");
if (movieId) {
  fetchMovieDetails(movieId);
  fetchReviews(movieId);
}

// Light/Dark Mode Toggle Logic
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

// Check and apply the user's saved mode
const savedMode = localStorage.getItem("theme");
if (savedMode === "dark") {
  body.classList.add("dark-mode");
  modeToggle.textContent = "🌙";
} else {
  body.classList.remove("dark-mode");
  modeToggle.textContent = "🌞";
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