/* =====================================================
   STREAMFLIX
   STORAGE.JS
===================================================== */

class StorageManager {

    /* ===========================
       SET
    =========================== */

    set(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    }

    /* ===========================
       GET
    =========================== */

    get(key, defaultValue = null) {

        try {

            const data =
                localStorage.getItem(key);

            if (!data) {

                return defaultValue;

            }

            return JSON.parse(data);

        }

        catch (error) {

            console.error(error);

            return defaultValue;

        }

    }

    /* ===========================
       REMOVE
    =========================== */

    remove(key) {

        localStorage.removeItem(key);

    }

    /* ===========================
       CLEAR
    =========================== */

    clear() {

        localStorage.clear();

    }

    /* ===========================
       EXISTS
    =========================== */

    has(key) {

        return localStorage.getItem(key) !== null;

    }

    /* ===========================
       USERS
    =========================== */

    getUsers() {

        return this.get(

            CONFIG.STORAGE.USERS,

            []

        );

    }

    saveUsers(users) {

        this.set(

            CONFIG.STORAGE.USERS,

            users

        );

    }

    /* ===========================
       CURRENT USER
    =========================== */

    getCurrentUser() {

        return this.get(

            CONFIG.STORAGE.CURRENT_USER,

            null

        );

    }

    setCurrentUser(user) {

        this.set(

            CONFIG.STORAGE.CURRENT_USER,

            user

        );

    }

    logout() {

        this.remove(

            CONFIG.STORAGE.CURRENT_USER

        );

    }

    /* ===========================
       WATCHLIST
    =========================== */

    getWatchlist() {

        return this.get(

            CONFIG.STORAGE.WATCHLIST,

            []

        );

    }

    saveWatchlist(list) {

        this.set(

            CONFIG.STORAGE.WATCHLIST,

            list

        );

    }

    addToWatchlist(movie) {

        const list =
            this.getWatchlist();

        const exists =
            list.some(item => item.id === movie.id);

        if (exists) {

            return false;

        }

        list.push(movie);

        this.saveWatchlist(list);

        return true;

    }

    removeFromWatchlist(movieId) {

        const list = this.getWatchlist();

        const updated = list.filter(

            movie => movie.id !== Number(movieId)

        );

        this.saveWatchlist(updated);

    }

    /* ===========================
       SETTINGS
    =========================== */

    getSettings() {

        return this.get(

            CONFIG.STORAGE.SETTINGS,

            {}

        );

    }

    saveSettings(settings) {

        this.set(

            CONFIG.STORAGE.SETTINGS,

            settings

        );

    }

}

const storage = new StorageManager();

/* =====================================================
   STORAGE READY
===================================================== */

console.log(
    "%c💾 Storage Module Loaded Successfully",
    "color:#10b981;font-size:15px;font-weight:bold;"
);