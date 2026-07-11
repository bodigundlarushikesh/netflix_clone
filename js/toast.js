/* =====================================================
   STREAMFLIX
   TOAST.JS
===================================================== */

class Toast {

    constructor() {

        this.container = document.getElementById("toast-container");

        if (!this.container) {

            this.container = document.createElement("div");

            this.container.id = "toast-container";

            this.container.className =
                "fixed bottom-6 right-6 z-[9999] flex flex-col gap-3";

            // Wait until body exists
            if (document.body) {

                document.body.appendChild(this.container);

            } else {

                window.addEventListener("DOMContentLoaded", () => {

                    document.body.appendChild(this.container);

                });

            }

        }

    }

    show(message, type = "success") {

        if (!this.container) return;

        const toast = document.createElement("div");

        let bgColor = "bg-green-600";
        let icon = "fa-circle-check";

        switch (type) {

            case "error":
                bgColor = "bg-red-600";
                icon = "fa-circle-xmark";
                break;

            case "warning":
                bgColor = "bg-yellow-500";
                icon = "fa-triangle-exclamation";
                break;

            case "info":
                bgColor = "bg-blue-600";
                icon = "fa-circle-info";
                break;

        }

        toast.className = `
            ${bgColor}
            text-white
            px-5
            py-4
            rounded-lg
            shadow-xl
            flex
            items-center
            gap-3
            opacity-0
            translate-x-10
            transition-all
            duration-300
            min-w-[300px]
            max-w-sm
        `;

        toast.innerHTML = `
            <i class="fas ${icon} text-lg"></i>

            <span class="flex-1">${message}</span>

            <button class="toast-close">
                <i class="fas fa-xmark"></i>
            </button>
        `;

        this.container.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.remove("opacity-0", "translate-x-10");

        });

        const timeout = setTimeout(() => {

            this.remove(toast);

        }, CONFIG.TOAST_DURATION);

        const closeBtn = toast.querySelector(".toast-close");

        if (closeBtn) {

            closeBtn.addEventListener("click", () => {

                clearTimeout(timeout);

                this.remove(toast);

            });

        }

    }

    remove(toast) {

        if (!toast) return;

        toast.classList.add(
            "opacity-0",
            "translate-x-10"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }

}

const toast = new Toast();

/* =====================================================
   SHORTCUT FUNCTIONS
===================================================== */

function showSuccess(message) {

    toast.show(message, "success");

}

function showError(message) {

    toast.show(message, "error");

}

function showWarning(message) {

    toast.show(message, "warning");

}

function showInfo(message) {

    toast.show(message, "info");

}

console.log(
    "%c🍞 Toast Module Loaded Successfully",
    "color:#22c55e;font-size:15px;font-weight:bold;"
);