/* =====================================================
   STREAMFLIX
   MOVIE.JS
===================================================== */

/* =====================================================
   DOM ELEMENTS
===================================================== */

const backdropImage =
    document.getElementById("backdrop");

const posterImage =
    document.getElementById("poster");

const movieTitle =
    document.getElementById("movieTitle");

const movieStatus =
    document.getElementById("movieStatus");

const movieOverview =
    document.getElementById("movieOverview");

const movieRating =
    document.getElementById("movieRating");

const movieRelease =
    document.getElementById("movieRelease");

const movieRuntime =
    document.getElementById("movieRuntime");

const movieLanguage =
    document.getElementById("movieLanguage");

const movieGenres =
    document.getElementById("movieGenres");

const movieBudget =
    document.getElementById("movieBudget");

const movieRevenue =
    document.getElementById("movieRevenue");

const movieStudio =
    document.getElementById("movieStudio");

const castContainer =
    document.getElementById("castContainer");

const similarMovies =
    document.getElementById("similarMovies");

const watchTrailer =
    document.getElementById("watchTrailer");

const addWatchlist =
    document.getElementById("addWatchlist");

const trailerModal =
    document.getElementById("trailerModal");

const trailerFrame =
    document.getElementById("trailerFrame");

const closeTrailer =
    document.getElementById("closeTrailer");

/* =====================================================
   URL PARAMS
===================================================== */

const movieId =
    getQueryParam("id");

/* =====================================================
   GLOBALS
===================================================== */

let currentMovie = null;

let trailerKey = "";

/* =====================================================
   RENDER MOVIE
===================================================== */

function renderMovie(movie){

    currentMovie = movie;

    backdropImage.src =
        backdrop(movie.backdrop_path);

    posterImage.src =
        poster(movie.poster_path);

    movieTitle.textContent =
        movie.title;

    movieStatus.textContent =
        movie.status;

    movieOverview.textContent =
        movie.overview;

    movieRating.textContent =
        "⭐ " +
        formatRating(movie.vote_average);

    movieRelease.textContent =
        formatDate(movie.release_date);

    movieRuntime.textContent =
        formatRuntime(movie.runtime);

    movieLanguage.textContent =
        movie.original_language.toUpperCase();

    movieGenres.textContent =
        movie.genres
            .map(item=>item.name)
            .join(", ");

    movieBudget.textContent =
        formatCurrency(movie.budget);

    movieRevenue.textContent =
        formatCurrency(movie.revenue);

    movieStudio.textContent =
        movie.production_companies.length
        ?
        movie.production_companies[0].name
        :
        "N/A";

}
/* =====================================================
   LOAD MOVIE
===================================================== */

async function loadMovie() {

    if (!movieId) {

        showError("Movie not found.");

        redirect("index.html");

        return;

    }

    try {

        loader.show();

        const movie = await getMovieDetails(movieId);

        if (!movie) {

            showError("Movie not found.");

            redirect("index.html");

            return;

        }

        renderMovie(movie);

        await loadCast();

        await loadSimilarMovies();

        await loadTrailer();

    }

    catch (error) {

        console.error(error);

        showError("Unable to load movie.");

    }

    finally {

        loader.hide();

    }

}

/* =====================================================
   LOAD CAST
===================================================== */

async function loadCast() {

    if (!castContainer) return;

    const cast = await getMovieCast(movieId);

    castContainer.innerHTML = "";

    cast
        .slice(0, CONFIG.MAX_CAST)
        .forEach(actor => {

            castContainer.insertAdjacentHTML(

                "beforeend",

                `

<div class="bg-neutral-900 rounded-xl overflow-hidden">

<img

src="${poster(actor.profile_path)}"

alt="${actor.name}"

loading="lazy"

class="w-full h-64 object-cover">

<div class="p-4">

<h3 class="font-semibold">

${actor.name}

</h3>

<p class="text-gray-400 text-sm mt-1">

${actor.character || "Unknown"}

</p>

</div>

</div>

`

            );

        });

}

/* =====================================================
   LOAD SIMILAR MOVIES
===================================================== */

async function loadSimilarMovies() {

    if (!similarMovies) return;

    const movies =

        await getSimilarMovies(movieId);

    similarMovies.innerHTML = "";

    movies
        .slice(0, CONFIG.MAX_SIMILAR_MOVIES)
        .forEach(movie => {

            similarMovies.insertAdjacentHTML(

                "beforeend",

                createMovieCard(movie)

            );

        });

}

/* =====================================================
   LOAD TRAILER
===================================================== */

async function loadTrailer() {

    const trailer =

        await getMovieTrailer(movieId);

    if (!trailer) return;

    trailerKey = trailer.key;

}
/* =====================================================
   TRAILER
===================================================== */

watchTrailer?.addEventListener(

    "click",

    () => {

        if (!trailerKey) {

            showWarning(

                "Trailer not available."

            );

            return;

        }

        trailerFrame.src =

            getTrailerURL(trailerKey);

        modal.open("trailerModal");

    }

);

closeTrailer?.addEventListener(

    "click",

    () => {

        trailerFrame.src = "";

        modal.close("trailerModal");

    }

);

trailerModal?.addEventListener(

    "click",

    event => {

        if (event.target === trailerModal) {

            trailerFrame.src = "";

            modal.close("trailerModal");

        }

    }

);

/* =====================================================
   WATCHLIST
===================================================== */

addWatchlist?.addEventListener(

    "click",

    () => {

        if (!currentMovie) return;

        const added =

            storage.addToWatchlist(currentMovie);

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

        if (

            event.key === "Escape"

        ) {

            trailerFrame.src = "";

            modal.close("trailerModal");

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

        loadMovie();

    }

);

/* =====================================================
   READY
===================================================== */

console.log(

    "%c🎬 Movie Page Ready",

    "color:#22c55e;font-size:16px;font-weight:bold;"

);