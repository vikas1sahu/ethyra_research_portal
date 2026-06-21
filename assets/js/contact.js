/* ===================================
   ETHYRA GLOBAL RESEARCH
   CONTACT & CAREER FORM VALIDATION
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeContactForm();
    initializeCareerForm();

});

/* ==========================
   CONTACT FORM
========================== */

function initializeContactForm() {

    const form =
        document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();

        let isValid = true;

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const phone =
            document.getElementById("phone");

        const message =
            document.getElementById("message");

        /* Name Validation */

        if (name.value.trim().length < 3) {

            showError(
                name,
                "Please enter a valid full name."
            );

            isValid = false;

        }

        /* Email Validation */

        if (!validateEmail(email.value)) {

            showError(
                email,
                "Please enter a valid email address."
            );

            isValid = false;

        }

        /* Phone Validation */

        if (!validatePhone(phone.value)) {

            showError(
                phone,
                "Please enter a valid phone number."
            );

            isValid = false;

        }

        /* Message Validation */

        if (message.value.trim().length < 10) {

            showError(
                message,
                "Message must contain at least 10 characters."
            );

            isValid = false;

        }

        if (isValid) {

            showSuccess(
                form,
                "Thank you! Your message has been submitted successfully."
            );

            form.reset();

        }

    });

}

/* ==========================
   CAREER FORM
========================== */

function initializeCareerForm() {

    const form =
        document.getElementById("careerForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        clearErrors();

        let isValid = true;

        const name =
            document.getElementById("careerName");

        const email =
            document.getElementById("careerEmail");

        const phone =
            document.getElementById("careerPhone");

        const position =
            document.getElementById("position");

        const resume =
            document.getElementById("resume");

        /* Name */

        if (name.value.trim().length < 3) {

            showError(
                name,
                "Please enter your full name."
            );

            isValid = false;

        }

        /* Email */

        if (!validateEmail(email.value)) {

            showError(
                email,
                "Please enter a valid email."
            );

            isValid = false;

        }

        /* Phone */

        if (!validatePhone(phone.value)) {

            showError(
                phone,
                "Please enter a valid phone number."
            );

            isValid = false;

        }

        /* Position */

        if (position.value === "") {

            showError(
                position,
                "Please select a position."
            );

            isValid = false;

        }

        /* Resume */

        if (!resume.files.length) {

            showError(
                resume,
                "Please upload your resume."
            );

            isValid = false;

        } else {

            const file =
                resume.files[0];

            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if (!allowedTypes.includes(file.type)) {

                showError(
                    resume,
                    "Resume must be PDF or DOC/DOCX."
                );

                isValid = false;

            }

            const maxSize =
                5 * 1024 * 1024;

            if (file.size > maxSize) {

                showError(
                    resume,
                    "Maximum file size is 5MB."
                );

                isValid = false;

            }

        }

        if (isValid) {

            showSuccess(
                form,
                "Application submitted successfully. Our recruitment team will contact you shortly."
            );

            form.reset();

        }

    });

}

/* ==========================
   EMAIL VALIDATION
========================== */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/* ==========================
   PHONE VALIDATION
========================== */

function validatePhone(phone) {

    const pattern =
        /^[0-9+\-\s()]{10,15}$/;

    return pattern.test(phone);

}

/* ==========================
   SHOW ERROR
========================== */

function showError(element, message) {

    const error =
        document.createElement("div");

    error.className = "error";

    error.innerText = message;

    element.parentElement.appendChild(error);

    element.style.borderColor =
        "#dc3545";

}

/* ==========================
   CLEAR ERRORS
========================== */

function clearErrors() {

    document
        .querySelectorAll(".error")
        .forEach(error => error.remove());

    document
        .querySelectorAll(
            "input, textarea, select"
        )
        .forEach(field => {

            field.style.borderColor = "";

        });

}

/* ==========================
   SUCCESS MESSAGE
========================== */

function showSuccess(form, message) {

    const existing =
        form.querySelector(".success-message");

    if (existing) {

        existing.remove();

    }

    const success =
        document.createElement("div");

    success.className =
        "success-message";

    success.innerText =
        message;

    form.appendChild(success);

    setTimeout(() => {

        success.remove();

    }, 6000);

}

/* ==========================
   FILE NAME DISPLAY
========================== */

document.addEventListener(
    "change",
    function (event) {

        if (
            event.target &&
            event.target.id === "resume"
        ) {

            const file =
                event.target.files[0];

            const fileLabel =
                document.getElementById(
                    "resumeFileName"
                );

            if (
                file &&
                fileLabel
            ) {

                fileLabel.textContent =
                    file.name;

            }

        }

    }
);

/* ==========================
   REAL-TIME VALIDATION
========================== */

document.addEventListener(
    "input",
    function (event) {

        const field =
            event.target;

        if (
            field.classList.contains(
                "form-control"
            )
        ) {

            field.style.borderColor =
                "";

        }

    }
);

/* ==========================
   CHARACTER COUNTER
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const message =
            document.getElementById(
                "message"
            );

        const counter =
            document.getElementById(
                "messageCounter"
            );

        if (
            !message ||
            !counter
        ) return;

        message.addEventListener(
            "input",
            () => {

                counter.textContent =
                    `${message.value.length} Characters`;

            }
        );

    }
);

/* ==========================
   FORM SUBMISSION SIMULATION
========================== */

function simulateSubmission(button) {

    const originalText =
        button.innerHTML;

    button.disabled = true;

    button.innerHTML =
        "Submitting...";

    setTimeout(() => {

        button.disabled = false;

        button.innerHTML =
            originalText;

    }, 2000);

}