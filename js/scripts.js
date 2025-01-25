const movies = [
    {
      id: 1,
      title: "Sonic the Hedgehog 3",
      rating: 86,
      audience: 95,
      image: "image/shawshank.png",
      key: "sonic",
      summary: "Sonic the Hedgehog is back in an epic adventure where he teams up with friends to save the multiverse.",
      reviews: [
        { reviewer: "John Doe", comment: "A visual delight with heart-pounding action and great character moments." },
        { reviewer: "Jane Smith", comment: "The humor is spot-on, and the story is engaging." }
      ]
    },
    {
      id: 2,
      title: "Nosferatu",
      rating: 85,
      audience: 73,
      image: "image/shawshank.png",
      key: "nosferatu",
      summary: "A haunting tale of terror and suspense with Nosferatu as the central figure.",
      reviews: [
        { reviewer: "Alice Johnson", comment: "A chilling masterpiece of horror cinema." },
        { reviewer: "Bob Lee", comment: "Nosferatu remains timeless and iconic." }
      ]
    },
    {
      id: 3,
      title: "Nosferatu",
      rating: 85,
      audience: 73,
      image: "image/shawshank.png",
      key: "nosferatu",
      summary: "A haunting tale of terror and suspense with Nosferatu as the central figure.",
      reviews: [
        { reviewer: "Alice Johnson", comment: "A chilling masterpiece of horror cinema." },
        { reviewer: "Bob Lee", comment: "Nosferatu remains timeless and iconic." }
      ]
    },
    {
      id: 4,
      title: "Nosferatu",
      rating: 85,
      audience: 73,
      image: "image/shawshank.png",
      key: "nosferatu",
      summary: "A haunting tale of terror and suspense with Nosferatu as the central figure.",
      reviews: [
        { reviewer: "Alice Johnson", comment: "A chilling masterpiece of horror cinema." },
        { reviewer: "Bob Lee", comment: "Nosferatu remains timeless and iconic." }
      ]
    }
    
  ];
  
  // Dynamically render movie cards with links
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <div class="info">
        <h3>${movie.title}</h3>
        <div class="rating">
          <span class="${movie.rating >= 60 ? 'fresh' : 'rotten'}">🍅 ${movie.rating}%</span>
          | 🎥 ${movie.audience}%
        </div>
        <a href="review.html?movie=${movie.key}" class="review-button">
          <span class="review-icon">📝</span> Read Reviews
        </a>
      </div>
    `;
    document.getElementById("movie-list").appendChild(movieCard);
  });
  
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
