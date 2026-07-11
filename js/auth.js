/* =====================================================
   STREAMFLIX
   AUTH.JS
===================================================== */

/* =====================================================
   DOM ELEMENTS
===================================================== */

const loginForm = document.getElementById("loginForm");

const signupForm = document.getElementById("signupForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const fullName = document.getElementById("fullName");

const signupEmail = document.getElementById("signupEmail");

const signupPassword =
    document.getElementById("signupPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const rememberMe =
    document.getElementById("rememberMe");

const togglePassword =
    document.getElementById("togglePassword");

const toggleSignupPassword =
    document.getElementById("toggleSignupPassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

/* =====================================================
   USERS
===================================================== */

let users = storage.getUsers();

/* =====================================================
   PASSWORD TOGGLE
===================================================== */

function toggleInput(input, button) {

    if (!input || !button) return;

    if (input.type === "password") {

        input.type = "text";

        button.innerHTML =
            `<i class="fas fa-eye-slash"></i>`;

    }

    else {

        input.type = "password";

        button.innerHTML =
            `<i class="fas fa-eye"></i>`;

    }

}

togglePassword?.addEventListener("click", () => {

    toggleInput(password, togglePassword);

});

toggleSignupPassword?.addEventListener("click", () => {

    toggleInput(

        signupPassword,

        toggleSignupPassword

    );

});

toggleConfirmPassword?.addEventListener("click", () => {

    toggleInput(

        confirmPassword,

        toggleConfirmPassword

    );

});

/* =====================================================
   SIGNUP
===================================================== */

signupForm?.addEventListener(

    "submit",

    event => {

        event.preventDefault();

        const name =
            fullName.value.trim();

        const emailValue =
            signupEmail.value.trim().toLowerCase();

        const passwordValue =
            signupPassword.value;

        const confirmValue =
            confirmPassword.value;

        if (

            !validator.required(name) ||

            !validator.required(emailValue) ||

            !validator.required(passwordValue) ||

            !validator.required(confirmValue)

        ) {

            showWarning(

                "Please fill all fields."

            );

            return;

        }

        if (

            !validator.email(emailValue)

        ) {

            showError(

                "Invalid email address."

            );

            return;

        }

        if (

            !validator.password(passwordValue)

        ) {

            showWarning(

                "Password must be at least 6 characters."

            );

            return;

        }

        if (

            !validator.match(

                passwordValue,

                confirmValue

            )

        ) {

            showError(

                "Passwords do not match."

            );

            return;

        }

        const exists = users.some(

            user =>

                user.email === emailValue

        );

        if (exists) {

            showWarning(

                "Email already registered."

            );

            return;

        }

        const user = {

            id: uuid(),

            name,

            email: emailValue,

            password: passwordValue,

            avatar:

                "assets/images/default-avatar.png",

            joined:

                new Date().toISOString(),

            watchlist: []

        };

        users.push(user);

        storage.saveUsers(users);

        showSuccess(

            "Account created successfully!"

        );

        signupForm.reset();

        setTimeout(() => {

            redirect("login.html");

        }, 1200);

    }

);
/* =====================================================
   LOGIN
===================================================== */

loginForm?.addEventListener(

    "submit",

    event => {

        event.preventDefault();

        const emailValue =
            email.value.trim().toLowerCase();

        const passwordValue =
            password.value;

        if (

            !validator.required(emailValue) ||

            !validator.required(passwordValue)

        ) {

            showWarning(

                "Please enter your email and password."

            );

            return;

        }

        const user = users.find(

            item =>

                item.email === emailValue &&

                item.password === passwordValue

        );

        if (!user) {

            showError(

                "Invalid email or password."

            );

            return;

        }

        storage.setCurrentUser(user);

        if (

            rememberMe?.checked

        ) {

            storage.set(

                CONFIG.STORAGE.REMEMBER_EMAIL,

                emailValue

            );

        }

        else {

            storage.remove(

                CONFIG.STORAGE.REMEMBER_EMAIL

            );

        }

        showSuccess(

            `Welcome ${user.name}!`

        );

        setTimeout(() => {

            redirect("index.html");

        }, 1000);

    }

);

/* =====================================================
   REMEMBER EMAIL
===================================================== */

const rememberedEmail =

    storage.get(

        CONFIG.STORAGE.REMEMBER_EMAIL,

        ""

    );

if (

    rememberedEmail &&

    email

) {

    email.value = rememberedEmail;

    if (rememberMe) {

        rememberMe.checked = true;

    }

}

/* =====================================================
   CURRENT USER
===================================================== */

function getCurrentUser() {

    return storage.getCurrentUser();

}

/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    storage.logout();

    showSuccess(

        "Logged out successfully."

    );

    setTimeout(() => {

        redirect("login.html");

    }, 700);

}

/* =====================================================
   AUTH GUARD
===================================================== */

function requireLogin() {

    const user =

        storage.getCurrentUser();

    if (!user) {

        redirect("login.html");

    }

}

/* =====================================================
   GUEST GUARD
===================================================== */

function requireGuest() {

    const user =

        storage.getCurrentUser();

    if (user) {

        redirect("index.html");

    }

}

/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        console.log(

            "%c🔐 Authentication Loaded",

            "color:#22c55e;font-size:15px;font-weight:bold;"

        );

    }

);

/* =====================================================
   AUTH READY
===================================================== */

console.log(

    "%c✅ AUTH.JS READY",

    "color:#00ff99;font-size:16px;font-weight:bold;"

);