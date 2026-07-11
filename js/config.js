/* =====================================================
   STREAMFLIX
   CONFIG.JS
===================================================== */

const CONFIG = {

    APP_NAME: "StreamFlix",

    VERSION: "1.0.0",

    TMDB_API_KEY:"12ce361157532a78f0f4cb51243846e1",

    TMDB_BASE_URL: "https://api.themoviedb.org/3",

    IMAGE_URL: "https://image.tmdb.org/t/p/w500",

    BACKDROP_URL: "https://image.tmdb.org/t/p/original",

    YOUTUBE_URL: "https://www.youtube.com/embed/",

    PLACEHOLDER_IMAGE:
        "https://via.placeholder.com/500x750?text=No+Image",

    PLACEHOLDER_BACKDROP:
        "https://via.placeholder.com/1280x720?text=No+Backdrop",

    STORAGE: {

        USERS: "users",

        CURRENT_USER: "currentUser",

        WATCHLIST: "watchlist",

        REMEMBER_EMAIL: "rememberEmail",

        SETTINGS: "settings"

    },

    TOAST_DURATION: 2500,

    HERO_SLIDER_INTERVAL: 8000,

    SEARCH_DELAY: 500,

    MAX_SEARCH_RESULTS: 20,

    MAX_CAST: 12,

    MAX_SIMILAR_MOVIES: 10

};

Object.freeze(CONFIG);

console.log(
    "%c⚙️ Config Loaded",
    "color:#22c55e;font-size:15px;font-weight:bold;"
);