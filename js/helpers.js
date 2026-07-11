/* =====================================================
   STREAMFLIX
   HELPERS.JS
===================================================== */

/* ===========================
   DOM HELPERS
=========================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

const createElement = (tag) => document.createElement(tag);


/* ===========================
   TEXT HELPERS
=========================== */

function capitalize(text = "") {

    return text.charAt(0).toUpperCase() + text.slice(1);

}

function truncate(text = "", length = 150) {

    if (text.length <= length) {

        return text;

    }

    return text.substring(0, length) + "...";

}


/* ===========================
   NUMBER HELPERS
=========================== */

function formatRating(rating = 0) {

    return Number(rating).toFixed(1);

}

function formatCurrency(value = 0) {

    if (!value) {

        return "N/A";

    }

    return "$" + value.toLocaleString();

}

function formatRuntime(minutes = 0) {

    if (!minutes) {

        return "N/A";

    }

    const hours = Math.floor(minutes / 60);

    const mins = minutes % 60;

    return `${hours}h ${mins}m`;

}


/* ===========================
   DATE HELPERS
=========================== */

function getYear(date) {

    if (!date) return "N/A";

    return date.substring(0, 4);

}

function formatDate(date) {

    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();

}


/* ===========================
   IMAGE HELPERS
=========================== */

function poster(path) {

    if (!path) {

        return CONFIG.PLACEHOLDER_IMAGE;

    }

    return CONFIG.IMAGE_URL + path;

}

function backdrop(path) {

    if (!path) {

        return CONFIG.PLACEHOLDER_BACKDROP;

    }

    return CONFIG.BACKDROP_URL + path;

}


/* ===========================
   URL HELPERS
=========================== */

function movieURL(id) {

    return `movie.html?id=${id}`;

}

function profileURL() {

    return "profile.html";

}

function searchURL() {

    return "search.html";

}


/* ===========================
   LOCAL STORAGE
=========================== */

function save(key, value) {

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function load(key, defaultValue = null) {

    const data = localStorage.getItem(key);

    if (!data) {

        return defaultValue;

    }

    return JSON.parse(data);

}

function remove(key) {

    localStorage.removeItem(key);

}


/* ===========================
   REDIRECT
=========================== */

function redirect(page) {

    window.location.href = page;

}
/* =====================================================
   VALIDATION HELPERS
===================================================== */

function isValidEmail(email = "") {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

function isStrongPassword(password = "") {

    return password.length >= 6;

}


/* =====================================================
   ARRAY HELPERS
===================================================== */

function uniqueById(array = []) {

    return array.filter((item, index, self) =>

        index === self.findIndex(obj => obj.id === item.id)

    );

}

function sortByRating(array = []) {

    return [...array].sort(

        (a, b) => b.vote_average - a.vote_average

    );

}

function sortByTitle(array = []) {

    return [...array].sort((a, b) =>

        (a.title || a.name).localeCompare(b.title || b.name)

    );

}


/* =====================================================
   DEBOUNCE
===================================================== */

function debounce(callback, delay = CONFIG.SEARCH_DELAY) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}


/* =====================================================
   SLEEP
===================================================== */

function sleep(ms) {

    return new Promise(resolve =>

        setTimeout(resolve, ms)

    );

}


/* =====================================================
   RANDOM
===================================================== */

function randomItem(array = []) {

    if (!array.length) return null;

    return array[

        Math.floor(Math.random() * array.length)

    ];

}


/* =====================================================
   IMAGE FALLBACK
===================================================== */

function imageFallback(image) {

    image.onerror = function () {

        this.src = CONFIG.PLACEHOLDER_IMAGE;

    };

}


/* =====================================================
   SCROLL
===================================================== */

function scrollTopPage() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   QUERY PARAMS
===================================================== */

function getQueryParam(name) {

    const params = new URLSearchParams(

        window.location.search

    );

    return params.get(name);

}


/* =====================================================
   UUID
===================================================== */

function uuid() {

    return Date.now().toString(36) +

        Math.random().toString(36).substring(2, 10);

}


/* =====================================================
   COPY
===================================================== */

async function copyToClipboard(text) {

    try {

        await navigator.clipboard.writeText(text);

        return true;

    }

    catch {

        return false;

    }

}


/* =====================================================
   NETWORK
===================================================== */

function isOnline() {

    return navigator.onLine;

}


/* =====================================================
   DEVICE
===================================================== */

function isMobile() {

    return window.innerWidth <= 768;

}


/* =====================================================
   HELPERS READY
===================================================== */

console.log(

    "%c🛠️ Helpers Loaded Successfully",

    "color:#06b6d4;font-size:15px;font-weight:bold;"

);