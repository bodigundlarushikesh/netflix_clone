/* =====================================================
   STREAMFLIX
   MODAL.JS
===================================================== */

class Modal {

    constructor() {

        this.activeModal = null;

        this.initialize();

    }

    initialize() {

        document.addEventListener("click", (event) => {

            const closeButton =
                event.target.closest("[data-modal-close]");

            if (closeButton) {

                const modalId =
                    closeButton.dataset.modalClose;

                this.close(modalId);

            }

        });

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                this.closeCurrent();

            }

        });

    }

    open(modalId) {

        const modal =
            document.getElementById(modalId);

        if (!modal) return;

        modal.classList.remove("hidden");

        modal.classList.add("flex");

        document.body.style.overflow = "hidden";

        this.activeModal = modal;

    }

    close(modalId) {

        const modal =
            document.getElementById(modalId);

        if (!modal) return;

        modal.classList.remove("flex");

        modal.classList.add("hidden");

        document.body.style.overflow = "auto";

        this.activeModal = null;

    }

    closeCurrent() {

        if (!this.activeModal) return;

        this.activeModal.classList.remove("flex");

        this.activeModal.classList.add("hidden");

        document.body.style.overflow = "auto";

        this.activeModal = null;

    }

    toggle(modalId) {

        const modal =
            document.getElementById(modalId);

        if (!modal) return;

        if (modal.classList.contains("hidden")) {

            this.open(modalId);

        } else {

            this.close(modalId);

        }

    }

}

const modal = new Modal();

/* =====================================================
   BACKDROP CLOSE
===================================================== */

document.addEventListener("click", (event) => {

    const target = event.target;

    if (
        target.classList.contains("modal-backdrop") ||
        target.dataset.modalBackdrop !== undefined
    ) {

        target.classList.add("hidden");

        target.classList.remove("flex");

        document.body.style.overflow = "auto";

    }

});

/* =====================================================
   CONFIRM MODAL
===================================================== */

function confirmModal({

    title = "Confirm",

    message = "Are you sure?",

    onConfirm = () => {}

}) {

    const confirmed = window.confirm(

        `${title}\n\n${message}`

    );

    if (confirmed) {

        onConfirm();

    }

}

/* =====================================================
   ALERT MODAL
===================================================== */

function alertModal(message) {

    window.alert(message);

}

/* =====================================================
   MODAL READY
===================================================== */

console.log(
    "%c🪟 Modal Module Loaded Successfully",
    "color:#8b5cf6;font-size:15px;font-weight:bold;"
);