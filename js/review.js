const movies = [
    {
      key: "sonic",
      title: "Sonic the Hedgehog 3",
      rating: 86,
      audience: 95,
      image: "image/shawshank.png",
      summary: "Sonic the Hedgehog is back in an epic adventure where he teams up with friends to save the multiverse.",
      reviews: [
        { reviewer: "John Doe", comment: "A visual delight with heart-pounding action and great character moments." },
        { reviewer: "Jane Smith", comment: "The humor is spot-on, and the story is engaging." }
      ]
    },
    {
      key: "nosferatu",
      title: "Nosferatu",
      rating: 85,
      audience: 73,
      image: "image/shawshank.png",
      summary: "A haunting tale of terror and suspense with Nosferatu as the central figure.",
      reviews: [
        { reviewer: "Alice Johnson", comment: "A chilling masterpiece of horror cinema." },
        { reviewer: "Bob Lee", comment: "Nosferatu remains timeless and iconic." }
      ]
    }
  ];
  
  // Extract the movie key from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const movieKey = urlParams.get("movie");
  
  // Find the corresponding movie object
  const movie = movies.find(m => m.key === movieKey);
  
  if (movie) {
    // Update the movie title
    document.getElementById("movie-title").textContent = movie.title;
  
    // Update the movie details
    const movieDetails = document.getElementById("movie-details");
    movieDetails.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="poster">
      <div class="details">
        <h2>${movie.title}</h2>
        <p class="rating">🍅 <span class="fresh">${movie.rating}%</span> | 🎥 Audience Score: <span>${movie.audience}%</span></p>
        <p class="summary">${movie.summary}</p>
      </div>
    `;
  
    // Update the reviews section
    const reviews = document.getElementById("reviews");
    reviews.innerHTML = `
      <h3>Critic Reviews</h3>
      ${movie.reviews.map(review => `
        <div class="review">
          <p class="reviewer">${review.reviewer}</p>
          <p class="comment">${review.comment}</p>
        </div>
      `).join('')}
    `;
  } else {
    document.body.innerHTML = `<h1>Movie not found</h1>`;
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
  