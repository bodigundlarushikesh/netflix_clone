/* =====================================================
   STREAMFLIX
   VALIDATION.JS
===================================================== */

class Validator {

    /* ===========================
       REQUIRED
    =========================== */

    required(value) {

        return value !== null &&
               value !== undefined &&
               value.toString().trim() !== "";

    }

    /* ===========================
       EMAIL
    =========================== */

    email(value) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(value);

    }

    /* ===========================
       PASSWORD
    =========================== */

    password(value) {

        return value.length >= 6;

    }

    /* ===========================
       NAME
    =========================== */

    name(value) {

        return value.trim().length >= 3;

    }

    /* ===========================
       PHONE
    =========================== */

    phone(value) {

        const pattern =
            /^[6-9]\d{9}$/;

        return pattern.test(value);

    }

    /* ===========================
       URL
    =========================== */

    url(value) {

        try {

            new URL(value);

            return true;

        }

        catch {

            return false;

        }

    }

    /* ===========================
       MATCH
    =========================== */

    match(firstValue, secondValue) {

        return firstValue === secondValue;

    }

    /* ===========================
       MIN LENGTH
    =========================== */

    minLength(value, length) {

        return value.length >= length;

    }

    /* ===========================
       MAX LENGTH
    =========================== */

    maxLength(value, length) {

        return value.length <= length;

    }

    /* ===========================
       NUMBER
    =========================== */

    number(value) {

        return !isNaN(value);

    }

    /* ===========================
       INTEGER
    =========================== */

    integer(value) {

        return Number.isInteger(Number(value));

    }

    /* ===========================
       POSITIVE
    =========================== */

    positive(value) {

        return Number(value) > 0;

    }

    /* ===========================
       DATE
    =========================== */

    date(value) {

        return !isNaN(Date.parse(value));

    }

    /* ===========================
       AGE
    =========================== */

    age(dateOfBirth) {

        const birth =
            new Date(dateOfBirth);

        const today =
            new Date();

        let age =
            today.getFullYear() -
            birth.getFullYear();

        const month =
            today.getMonth() -
            birth.getMonth();

        if (
            month < 0 ||
            (month === 0 &&
                today.getDate() < birth.getDate())
        ) {

            age--;

        }

        return age >= 13;

    }

    /* ===========================
       FORM VALIDATION
    =========================== */

    validateForm(form) {

        const inputs =
            form.querySelectorAll("input[required]");

        let valid = true;

        inputs.forEach(input => {

            if (!this.required(input.value)) {

                input.classList.add(
                    "border-red-500"
                );

                valid = false;

            }

            else {

                input.classList.remove(
                    "border-red-500"
                );

            }

        });

        return valid;

    }

}

const validator = new Validator();

/* =====================================================
   VALIDATION READY
===================================================== */

console.log(
    "%c✅ Validation Module Loaded Successfully",
    "color:#14b8a6;font-size:15px;font-weight:bold;"
);