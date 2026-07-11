/* =====================================================
   STREAMFLIX
   WATCHLIST.JS
===================================================== */

/* =====================================================
   DOM ELEMENTS
===================================================== */

const watchlistContainer =
    document.getElementById("watchlistContainer");

const emptyWatchlist =
    document.getElementById("emptyWatchlist");

const clearModal =
    document.getElementById("clearModal");

const cancelClear =
    document.getElementById("cancelClear");

const confirmClear =
    document.getElementById("confirmClear");

/* =====================================================
   WATCHLIST
===================================================== */

let watchlist = storage.getWatchlist();

/* =====================================================
   CREATE CARD
===================================================== */

function createWatchlistCard(movie) {

    return `

<div class="movie-card">

<img

src="${poster(movie.poster_path || movie.poster)}"

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
class="remove-btn"
data-id="${movie.id}">

<i class="fas fa-trash"></i>

</button>

</div>

<div class="movie-info">

<h3 class="movie-title">

${movie.title || movie.name}

</h3>

<p class="movie-rating">

⭐ ${formatRating(movie.vote_average || movie.rating)}

</p>

</div>

</div>

</div>

`;

}

/* =====================================================
   RENDER WATCHLIST
===================================================== */

function renderWatchlist() {

    if (!watchlistContainer) return;

    watchlistContainer.innerHTML = "";

    watchlist = storage.getWatchlist();

    if (watchlist.length === 0) {

        emptyWatchlist?.classList.remove("hidden");

        return;

    }

    emptyWatchlist?.classList.add("hidden");

    watchlist.forEach(movie => {

        watchlistContainer.insertAdjacentHTML(

            "beforeend",

            createWatchlistCard(movie)

        );

    });

}
/* =====================================================
   REMOVE MOVIE
===================================================== */

function removeMovie(movieId) {

    watchlist = watchlist.filter(

        movie => movie.id != movieId

    );

    storage.saveWatchlist(watchlist);

    renderWatchlist();

    showSuccess(

        "Movie removed from Watchlist"

    );

}

/* =====================================================
   CLEAR WATCHLIST
===================================================== */

function clearWatchlist() {

    watchlist = [];

    storage.saveWatchlist(watchlist);

    renderWatchlist();

    modal.close("clearModal");

    showSuccess(

        "Watchlist cleared"

    );

}

/* =====================================================
   EVENTS
===================================================== */

document.addEventListener(

    "click",

    event => {

        const playButton =

            event.target.closest(".play-btn");

        if (playButton) {

            redirect(

                movieURL(playButton.dataset.id)

            );

            return;

        }

        const removeButton =

            event.target.closest(".remove-btn");

        if (removeButton) {

            removeMovie(

                removeButton.dataset.id

            );

            return;

        }

    }

);

/* =====================================================
   CLEAR MODAL
===================================================== */

confirmClear?.addEventListener(

    "click",

    clearWatchlist

);

cancelClear?.addEventListener(

    "click",

    () => {

        modal.close("clearModal");

    }

);

/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(

    "keydown",

    event => {

        if (event.key === "Escape") {

            modal.close("clearModal");

        }

    }

);

/* =====================================================
   IMAGE FALLBACK
===================================================== */

document.addEventListener(

    "error",

    event => {

        if (

            event.target.tagName === "IMG"

        ) {

            event.target.src =

                CONFIG.PLACEHOLDER_IMAGE;

        }

    },

    true

);

/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        renderWatchlist();

    }

);

/* =====================================================
   READY
===================================================== */

console.log(

    "%c❤️ Watchlist Ready",

    "color:#22c55e;font-size:16px;font-weight:bold;"

);