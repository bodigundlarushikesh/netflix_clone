/* =====================================================
   STREAMFLIX
   APP.JS
===================================================== */

/* =====================================================
   DOM ELEMENTS
===================================================== */

const navbar = document.getElementById("navbar");

const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");
const heroRating = document.getElementById("heroRating");
const heroYear = document.getElementById("heroYear");
const heroGenre = document.getElementById("heroGenre");

const trendingContainer = document.getElementById("trendingContainer");
const popularContainer = document.getElementById("popularContainer");
const topRatedContainer = document.getElementById("topRatedContainer");
const tvContainer = document.getElementById("tvContainer");

const playBtn = document.getElementById("playBtn");
const infoBtn = document.getElementById("infoBtn");

const searchBtn = document.getElementById("searchBtn");
const searchModal = document.getElementById("searchModal");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const closeSearch = document.getElementById("closeSearch");

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let heroMovies = [];

let trendingMovies = [];

let popularMovies = [];

let topRatedMovies = [];

let tvShows = [];

let currentHero = 0;

let heroInterval = null;

/* =====================================================
   NAVBAR EFFECT
===================================================== */

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.classList.add("nav-scroll");

        } else {

            navbar.classList.remove("nav-scroll");

        }

    });

}

/* =====================================================
   HERO SECTION
===================================================== */

function updateHero(movie) {

    if (!movie) return;

    heroImage.src = backdrop(movie.backdrop_path);

    heroTitle.textContent =
        movie.title || movie.name;

    heroDescription.textContent =
        truncate(movie.overview, 180);

    heroRating.textContent =
        "⭐ " + formatRating(movie.vote_average);

    heroYear.textContent =
        getYear(
            movie.release_date ||
            movie.first_air_date
        );

    heroGenre.textContent =
        movie.original_language
            ? movie.original_language.toUpperCase()
            : "N/A";

}

function startHeroSlider() {

    if (!heroMovies.length) return;

    updateHero(heroMovies[currentHero]);

    clearInterval(heroInterval);

    heroInterval = setInterval(() => {

        currentHero++;

        if (currentHero >= heroMovies.length) {

            currentHero = 0;

        }

        updateHero(heroMovies[currentHero]);

    }, CONFIG.HERO_SLIDER_INTERVAL);

}

/* =====================================================
   CREATE MOVIE CARD
===================================================== */

function createMovieCard(movie) {

    return `

<div
class="movie-card"
data-id="${movie.id}">

<img

src="${poster(movie.poster_path)}"

alt="${movie.title || movie.name}"

loading="lazy">

<div class="movie-overlay">

<div class="overlay-buttons">

<button
class="play-btn"
data-id="${movie.id}">

<i class="fas fa-play"></i>

</button>

<button
class="watchlist-btn"
data-id="${movie.id}">

<i class="fas fa-plus"></i>

</button>

<button
class="info-btn"
data-id="${movie.id}">

<i class="fas fa-circle-info"></i>

</button>

</div>

<div class="movie-info">

<h3>

${movie.title || movie.name}

</h3>

<p>

⭐ ${formatRating(movie.vote_average)}

</p>

</div>

</div>

</div>

`;

}
/* =====================================================
   RENDER MOVIES
===================================================== */

function renderMovies(container, movies) {

    if (!container) return;

    container.innerHTML = "";

    if (!movies || movies.length === 0) {

        container.innerHTML = `

            <div class="text-center py-10 text-gray-400">

                No Movies Found

            </div>

        `;

        return;

    }

    movies.forEach(movie => {

        container.insertAdjacentHTML(

            "beforeend",

            createMovieCard(movie)

        );

    });

}

/* =====================================================
   LOAD HOME PAGE
===================================================== */

async function loadHomePage() {

    try {

        loader.show();

        trendingMovies = await getTrendingMovies();

        popularMovies = await getPopularMovies();

        topRatedMovies = await getTopRatedMovies();

        tvShows = await getTVShows();

        heroMovies = [...trendingMovies].slice(0, 5);

        startHeroSlider();

        renderMovies(

            trendingContainer,

            trendingMovies

        );

        renderMovies(

            popularContainer,

            popularMovies

        );

        renderMovies(

            topRatedContainer,

            topRatedMovies

        );

        if (tvContainer) {

            renderMovies(

                tvContainer,

                tvShows

            );

        }

    }

    catch (error) {

        console.error(error);

        showError(

            "Unable to load movies."

        );

    }

    finally {

        loader.hide();

    }

}

/* =====================================================
   SEARCH
===================================================== */

if (searchBtn && searchModal) {

    searchBtn.addEventListener("click", () => {

        searchModal.classList.remove("hidden");

        if (searchInput) {

            searchInput.focus();

        }

    });

}

if (closeSearch && searchModal) {

    closeSearch.addEventListener("click", () => {

        searchModal.classList.add("hidden");

        if (searchResults) {

            searchResults.innerHTML = "";

        }

        if (searchInput) {

            searchInput.value = "";

        }

    });

}

if (searchInput) {

    const searchHandler = debounce(

        async () => {

            const query =

                searchInput.value.trim();

            if (query.length < 2) {

                searchResults.innerHTML = "";

                return;

            }

            const movies =

                await searchMovies(query);

            searchResults.innerHTML = "";

            if (!movies.length) {

                searchResults.innerHTML =

                    `<p class="text-center text-gray-400 py-6">

                        No movies found

                    </p>`;

                return;

            }

            movies.forEach(movie => {

                searchResults.insertAdjacentHTML(

                    "beforeend",

                    createMovieCard(movie)

                );

            });

        },

        CONFIG.SEARCH_DELAY

    );

    searchInput.addEventListener(

        "keyup",

        searchHandler

    );

}
/* =====================================================
   WATCHLIST
===================================================== */

let watchlist = storage.getWatchlist();

function saveWatchlist() {

    storage.saveWatchlist(watchlist);

}

function addToWatchlist(movieId) {

    const movies = [

        ...trendingMovies,

        ...popularMovies,

        ...topRatedMovies,

        ...tvShows

    ];

    const movie = movies.find(

        item => item.id == movieId

    );

    if (!movie) {

        showError("Movie not found.");

        return;

    }

    const exists = watchlist.some(

        item => item.id === movie.id

    );

    if (exists) {

        showWarning(

            "Movie already in Watchlist."

        );

        return;

    }

    watchlist.push(movie);

    saveWatchlist();

    showSuccess(

        "Added to Watchlist ❤️"

    );

}

/* =====================================================
   HERO BUTTONS
===================================================== */

if (playBtn) {

    playBtn.addEventListener("click", () => {

        if (!heroMovies.length) return;

        redirect(

            movieURL(heroMovies[currentHero].id)

        );

    });

}

if (infoBtn) {

    infoBtn.addEventListener("click", () => {

        if (!heroMovies.length) return;

        redirect(

            movieURL(heroMovies[currentHero].id)

        );

    });

}

/* =====================================================
   MOVIE EVENTS
===================================================== */

document.addEventListener("click", event => {

    const play = event.target.closest(".play-btn");

    if (play) {

        redirect(

            movieURL(play.dataset.id)

        );

        return;

    }

    const info = event.target.closest(".info-btn");

    if (info) {

        redirect(

            movieURL(info.dataset.id)

        );

        return;

    }

    const watch = event.target.closest(".watchlist-btn");

    if (watch) {

        addToWatchlist(

            watch.dataset.id

        );

    }

});

/* =====================================================
   IMAGE FALLBACK
===================================================== */

document.addEventListener(

    "error",

    event => {

        if (event.target.tagName === "IMG") {

            event.target.src =

                CONFIG.PLACEHOLDER_IMAGE;

        }

    },

    true

);

/* =====================================================
   WINDOW EVENTS
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("fade-in");

});

window.addEventListener("beforeunload", () => {

    window.scrollTo(0, 0);

});

/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadHomePage();

    }

);

/* =====================================================
   READY
===================================================== */

console.log(

    "%c🎬 StreamFlix Ready",

    "color:#22c55e;font-size:16px;font-weight:bold;"

);