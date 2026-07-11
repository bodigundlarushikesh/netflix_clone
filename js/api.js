/* =====================================================
   STREAMFLIX
   API.JS
===================================================== */

/* =====================================================
   CONFIG
===================================================== */

const API_KEY = CONFIG.TMDB_API_KEY;

const BASE_URL = CONFIG.TMDB_BASE_URL;

/* =====================================================
   FETCH
===================================================== */

async function fetchData(endpoint) {

    try {

        const separator =
            endpoint.includes("?") ? "&" : "?";

        const response = await fetch(

            `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`

        );

        if (!response.ok) {

            throw new Error(

                `HTTP ${response.status}`

            );

        }

        return await response.json();

    }

    catch (error) {

        console.error(

            "TMDB Error:",

            error

        );

        showError(

            "Unable to fetch movies."

        );

        return null;

    }

}

/* =====================================================
   TRENDING
===================================================== */

async function getTrendingMovies() {

    const data = await fetchData(

        "/trending/movie/week"

    );

    return data?.results || [];

}

/* =====================================================
   POPULAR
===================================================== */

async function getPopularMovies() {

    const data = await fetchData(

        "/movie/popular"

    );

    return data?.results || [];

}

/* =====================================================
   TOP RATED
===================================================== */

async function getTopRatedMovies() {

    const data = await fetchData(

        "/movie/top_rated"

    );

    return data?.results || [];

}

/* =====================================================
   UPCOMING
===================================================== */

async function getUpcomingMovies() {

    const data = await fetchData(

        "/movie/upcoming"

    );

    return data?.results || [];

}

/* =====================================================
   NOW PLAYING
===================================================== */

async function getNowPlayingMovies() {

    const data = await fetchData(

        "/movie/now_playing"

    );

    return data?.results || [];

}

/* =====================================================
   TV SHOWS
===================================================== */

async function getTVShows() {

    const data = await fetchData(

        "/tv/popular"

    );

    return data?.results || [];

}
/* =====================================================
   MOVIE DETAILS
===================================================== */

async function getMovieDetails(movieId) {

    return await fetchData(

        `/movie/${movieId}`

    );

}

/* =====================================================
   MOVIE VIDEOS
===================================================== */

async function getMovieVideos(movieId) {

    const data = await fetchData(

        `/movie/${movieId}/videos`

    );

    return data?.results || [];

}

/* =====================================================
   MOVIE TRAILER
===================================================== */

async function getMovieTrailer(movieId) {

    const videos = await getMovieVideos(movieId);

    return videos.find(video =>

        video.site === "YouTube" &&
        video.type === "Trailer"

    ) || null;

}

/* =====================================================
   SIMILAR MOVIES
===================================================== */

async function getSimilarMovies(movieId) {

    const data = await fetchData(

        `/movie/${movieId}/similar`

    );

    return data?.results || [];

}

/* =====================================================
   MOVIE CAST
===================================================== */

async function getMovieCast(movieId) {

    const data = await fetchData(

        `/movie/${movieId}/credits`

    );

    return data?.cast || [];

}

/* =====================================================
   SEARCH MOVIES
===================================================== */

async function searchMovies(query) {

    if (!query) return [];

    const data = await fetchData(

        `/search/movie?query=${encodeURIComponent(query)}`

    );

    return data?.results || [];

}

/* =====================================================
   MOVIES BY GENRE
===================================================== */

async function getMoviesByGenre(genreId) {

    const data = await fetchData(

        `/discover/movie?with_genres=${genreId}`

    );

    return data?.results || [];

}

/* =====================================================
   GENRES
===================================================== */

async function getGenres() {

    const data = await fetchData(

        "/genre/movie/list"

    );

    return data?.genres || [];

}

/* =====================================================
   MULTI SEARCH
===================================================== */

async function multiSearch(query) {

    if (!query) return [];

    const data = await fetchData(

        `/search/multi?query=${encodeURIComponent(query)}`

    );

    return data?.results || [];

}

/* =====================================================
   PERSON DETAILS
===================================================== */

async function getPersonDetails(personId) {

    return await fetchData(

        `/person/${personId}`

    );

}

/* =====================================================
   TRAILER URL
===================================================== */

function getTrailerURL(videoKey) {

    return `${CONFIG.YOUTUBE_URL}${videoKey}`;

}

/* =====================================================
   API READY
===================================================== */

console.log(

    "%c🎬 TMDB API Ready",

    "color:#22c55e;font-size:16px;font-weight:bold;"

);