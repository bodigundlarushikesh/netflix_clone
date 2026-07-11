/* =====================================================
   STREAMFLIX
   PROFILE.JS
===================================================== */

/* =====================================================
   DOM ELEMENTS
===================================================== */

const profileImage =
    document.getElementById("profileImage");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const watchlistCount =
    document.getElementById("watchlistCount");

const memberSince =
    document.getElementById("memberSince");

const logoutBtn =
    document.getElementById("logoutBtn");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const editProfileModal =
    document.getElementById("editProfileModal");

const cancelEdit =
    document.getElementById("cancelEdit");

const profileForm =
    document.getElementById("profileForm");

const editName =
    document.getElementById("editName");

const editEmail =
    document.getElementById("editEmail");

/* =====================================================
   USER
===================================================== */

let currentUser =
    storage.getCurrentUser();

let users =
    storage.getUsers();

let watchlist =
    storage.getWatchlist();

/* =====================================================
   AUTH
===================================================== */

if (!currentUser) {

    redirect("login.html");

}

/* =====================================================
   LOAD PROFILE
===================================================== */

function loadProfile() {

    profileName.textContent =
        currentUser.name;

    profileEmail.textContent =
        currentUser.email;

    profileImage.src =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=E50914&color=ffffff&size=256`;

    watchlistCount.textContent =
        watchlist.length;

    memberSince.textContent =
        formatDate(currentUser.joined);

}

/* =====================================================
   EDIT PROFILE
===================================================== */

editProfileBtn?.addEventListener(

    "click",

    () => {

        editName.value =
            currentUser.name;

        editEmail.value =
            currentUser.email;

        modal.open("editProfileModal");

    }

);

cancelEdit?.addEventListener(

    "click",

    () => {

        modal.close("editProfileModal");

    }

);

window.addEventListener(

    "click",

    event => {

        if (

            event.target === editProfileModal

        ) {

            modal.close("editProfileModal");

        }

    }

);
/* =====================================================
   SAVE PROFILE
===================================================== */

profileForm?.addEventListener(

    "submit",

    event => {

        event.preventDefault();

        const name =
            editName.value.trim();

        const email =
            editEmail.value.trim().toLowerCase();

        if (

            !validator.required(name) ||

            !validator.required(email)

        ) {

            showWarning(

                "Please fill all fields."

            );

            return;

        }

        if (

            !validator.email(email)

        ) {

            showError(

                "Please enter a valid email."

            );

            return;

        }

        const exists = users.some(

            user =>

                user.email === email &&

                user.id !== currentUser.id

        );

        if (exists) {

            showWarning(

                "Email already exists."

            );

            return;

        }

        currentUser.name = name;

        currentUser.email = email;

        users = users.map(user =>

            user.id === currentUser.id

                ? currentUser

                : user

        );

        storage.saveUsers(users);

        storage.setCurrentUser(currentUser);

        modal.close("editProfileModal");

        loadProfile();

        showSuccess(

            "Profile updated successfully."

        );

    }

);

/* =====================================================
   LOGOUT
===================================================== */

logoutBtn?.addEventListener(

    "click",

    () => {

        storage.logout();

        showSuccess(

            "Logged out successfully."

        );

        setTimeout(() => {

            redirect("login.html");

        }, 700);

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

            modal.close("editProfileModal");

        }

    }

);

/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadProfile();

    }

);

/* =====================================================
   READY
===================================================== */

console.log(

    "%c👤 Profile Ready",

    "color:#22c55e;font-size:16px;font-weight:bold;"

);