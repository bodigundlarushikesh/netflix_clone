/* =====================================================
   STREAMFLIX
   SEARCH.JS
===================================================== */

/* =====================================================
   DOM ELEMENTS
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const searchResults =
    document.getElementById("searchResults");

const searchInfo =
    document.getElementById("searchInfo");

const loading =
    document.getElementById("loading");

const noResults =
    document.getElementById("noResults");

/* =====================================================
   UI
===================================================== */

function clearResults() {

    searchResults.innerHTML = "";

}

function createSearchCard(movie) {

    return `

<div class="movie-card" data-id="${movie.id}">

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
class="details-btn"
data-id="${movie.id}">

<i class="fas fa-circle-info"></i>

</button>

</div>

<div class="movie-info">

<h3 class="movie-title">

${movie.title || movie.name}

</h3>

<p class="movie-rating">

⭐ ${formatRating(movie.vote_average)}

</p>

</div>

</div>

</div>

`;

}

function renderResults(movies) {

    clearResults();

    if (!movies.length) {

        noResults?.classList.remove("hidden");

        return;

    }

    noResults?.classList.add("hidden");

    movies.forEach(movie => {

        searchResults.insertAdjacentHTML(

            "beforeend",

            createSearchCard(movie)

        );

    });

}

/* =====================================================
   SEARCH
===================================================== */

async function performSearch() {

    const query =

        searchInput.value.trim();

    if (query.length < 2) {

        clearResults();

        searchInfo.textContent =

            "Enter at least 2 characters.";

        return;

    }

    try {

        loader.show();

        const movies =

            await searchMovies(query);

        renderResults(movies);

        searchInfo.textContent =

            `${movies.length} result(s) found`;

    }

    catch (error) {

        console.error(error);

        showError(

            "Search failed."

        );

    }

    finally {

        loader.hide();

    }

}
/* =====================================================
   EVENTS
===================================================== */

searchButton?.addEventListener(

    "click",

    performSearch

);

searchInput?.addEventListener(

    "keydown",

    event => {

        if (event.key === "Enter") {

            performSearch();

        }

    }

);

searchInput?.addEventListener(

    "input",

    debounce(

        performSearch,

        CONFIG.SEARCH_DELAY

    )

);

/* =====================================================
   MOVIE EVENTS
===================================================== */

document.addEventListener(

    "click",

    event => {

        const play =

            event.target.closest(".play-btn");

        if (play) {

            redirect(

                movieURL(play.dataset.id)

            );

            return;

        }

        const details =

            event.target.closest(".details-btn");

        if (details) {

            redirect(

                movieURL(details.dataset.id)

            );

            return;

        }

        const watch =

            event.target.closest(".watchlist-btn");

        if (!watch) return;

        const card =

            watch.closest(".movie-card");

        const movie = {

            id: Number(watch.dataset.id),

            title:

                card.querySelector(".movie-title").textContent,

            poster:

                card.querySelector("img").src,

            rating:

                Number(

                    card.querySelector(".movie-rating")

                        .textContent.replace("⭐", "")

                )

        };

        const added =

            storage.addToWatchlist(movie);

        if (!added) {

            showWarning(

                "Movie already exists in Watchlist."

            );

            return;

        }

        showSuccess(

            "Added to Watchlist ❤️"

        );

    }

);

/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(

    "keydown",

    event => {

        if (event.key !== "Escape") return;

        searchInput.value = "";

        clearResults();

        noResults?.classList.add("hidden");

        searchInfo.textContent =

            "Start typing to search.";

    }

);

/* =====================================================
   INITIALIZE
===================================================== */

window.addEventListener(

    "load",

    () => {

        searchInput?.focus();

    }

);

/* =====================================================
   READY
===================================================== */

console.log(

    "%c🔍 Search Ready",

    "color:#22c55e;font-size:16px;font-weight:bold;"

);