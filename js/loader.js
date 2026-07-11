/* =====================================================
   STREAMFLIX
   LOADER.JS
===================================================== */

class Loader {

    constructor() {

        this.loader = document.getElementById("app-loader");

        if (!this.loader) {

            this.createLoader();

        }

    }

    createLoader() {

        this.loader = document.createElement("div");

        this.loader.id = "app-loader";

        this.loader.className =
            "fixed inset-0 bg-black/90 flex items-center justify-center z-[99999] hidden";

        this.loader.innerHTML = `

            <div class="flex flex-col items-center">

                <div
                    class="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin">
                </div>

                <h2
                    class="text-white text-xl font-semibold mt-6">

                    Loading...

                </h2>

            </div>

        `;

        if (document.body) {

            document.body.appendChild(this.loader);

        } else {

            window.addEventListener("DOMContentLoaded", () => {

                document.body.appendChild(this.loader);

            });

        }

    }

    show() {

        if (!this.loader) return;

        this.loader.classList.remove("hidden");

        if (document.body) {

            document.body.style.overflow = "hidden";

        }

    }

    hide() {

        if (!this.loader) return;

        this.loader.classList.add("hidden");

        if (document.body) {

            document.body.style.overflow = "auto";

        }

    }

}

const loader = new Loader();


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    loader.hide();

});


/* =====================================================
   FETCH WRAPPER
===================================================== */

async function fetchWithLoader(callback) {

    try {

        loader.show();

        const result = await callback();

        return result;

    }

    catch (error) {

        console.error(error);

        if (typeof showError === "function") {

            showError("Something went wrong.");

        }

        return null;

    }

    finally {

        loader.hide();

    }

}


/* =====================================================
   SKELETON CARD
===================================================== */

function createSkeletonCard() {

    return `

        <div class="animate-pulse">

            <div
                class="bg-neutral-800 rounded-xl h-[320px]">
            </div>

            <div
                class="mt-3 h-5 bg-neutral-800 rounded">
            </div>

            <div
                class="mt-2 h-4 w-1/2 bg-neutral-800 rounded">
            </div>

        </div>

    `;

}


/* =====================================================
   SKELETON GRID
===================================================== */

function showSkeleton(container, count = 10) {

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {

        container.insertAdjacentHTML(

            "beforeend",

            createSkeletonCard()

        );

    }

}


/* =====================================================
   REMOVE SKELETON
===================================================== */

function removeSkeleton(container) {

    if (!container) return;

    container.innerHTML = "";

}


/* =====================================================
   BUTTON LOADER
===================================================== */

function buttonLoading(button, state = true) {

    if (!button) return;

    if (state) {

        button.disabled = true;

        button.dataset.originalText = button.innerHTML;

        button.innerHTML = `

            <i class="fas fa-spinner fa-spin mr-2"></i>

            Loading...

        `;

    }

    else {

        button.disabled = false;

        button.innerHTML =

            button.dataset.originalText || "Submit";

    }

}


/* =====================================================
   LOADER READY
===================================================== */

console.log(

    "%c⏳ Loader Module Loaded Successfully",

    "color:#f59e0b;font-size:15px;font-weight:bold;"

);