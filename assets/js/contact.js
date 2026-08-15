/* ===================================
   ETHYRA GLOBAL RESEARCH
   CONTACT & CAREER FORM VALIDATION
   FormSubmit Standard HTML POST Integration
=================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeContactForm();
    initializeCareerForm();
});

/* ==========================
   CONTACT FORM
========================== */

function initializeContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", function (e) {
        clearErrors();

        let isValid = true;

        const name   = document.getElementById("name");
        const email  = document.getElementById("email");
        const phone  = document.getElementById("phone");
        const message = document.getElementById("message");

        /* ---- Validation ---- */
        if (!name || name.value.trim().length < 3) {
            if (name) showError(name, "Please enter a valid full name (min. 3 characters).");
            isValid = false;
        }

        if (!email || !validateEmail(email.value)) {
            if (email) showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        if (!phone || !validatePhone(phone.value)) {
            if (phone) showError(phone, "Please enter a valid phone number.");
            isValid = false;
        }

        if (!message || message.value.trim().length < 10) {
            if (message) showError(message, "Please enter a message (min. 10 characters).");
            isValid = false;
        }

        if (!isValid) {
            // STOP SUBMISSION if validation fails
            e.preventDefault();
            return;
        }

        // If validation succeeds: ALLOW NORMAL FORM SUBMISSION
        // Set temporary loading state on button right before browser POST submission
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span>Sending...`;
        }
    });
}

/* ==========================
   CAREER FORM
========================== */

function initializeCareerForm() {
    const form = document.getElementById("careerForm");
    if (!form) return;

    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", function (e) {
        clearErrors();

        let isValid = true;

        const name     = document.getElementById("careerName");
        const email    = document.getElementById("careerEmail");
        const phone    = document.getElementById("careerPhone");
        const position = document.getElementById("position");
        const resume   = document.getElementById("resume");

        /* ---- Validation ---- */
        if (!name || name.value.trim().length < 3) {
            if (name) showError(name, "Please enter your full name.");
            isValid = false;
        }

        if (!email || !validateEmail(email.value)) {
            if (email) showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        if (!phone || !validatePhone(phone.value)) {
            if (phone) showError(phone, "Please enter a valid phone number.");
            isValid = false;
        }

        if (!position || position.value === "") {
            if (position) showError(position, "Please select a position.");
            isValid = false;
        }

        if (!resume || !resume.files.length) {
            if (resume) showError(resume, "Please upload your resume (PDF / DOC / DOCX, max 5 MB).");
            isValid = false;
        } else {
            const file = resume.files[0];
            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];
            if (!allowedTypes.includes(file.type)) {
                showError(resume, "Resume must be PDF or DOC/DOCX format.");
                isValid = false;
            }
            if (file.size > 5 * 1024 * 1024) {
                showError(resume, "Maximum file size is 5 MB.");
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span>Submitting...`;
        }
    });
}

/* ==========================
   HELPERS
========================== */

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[0-9+\-\s()]{10,15}$/.test(phone);
}

function showError(element, message) {
    const error = document.createElement("div");
    error.className = "error";
    error.setAttribute("role", "alert");
    error.innerText = message;
    element.parentElement.appendChild(error);
    element.style.borderColor = "#dc3545";
    element.setAttribute("aria-invalid", "true");
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.remove());
    document.querySelectorAll("input, textarea, select").forEach(f => {
        f.style.borderColor = "";
        f.removeAttribute("aria-invalid");
    });
}

document.addEventListener("input", function (e) {
    const field = e.target;
    if (field.classList.contains("form-control")) {
        field.style.borderColor = "";
        field.removeAttribute("aria-invalid");
        const errorEl = field.parentElement.querySelector(".error");
        if (errorEl) errorEl.remove();
    }
});

document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "resume") {
        const file = e.target.files[0];
        const label = document.getElementById("resumeFileName");
        if (file && label) {
            label.textContent = file.name;
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const message = document.getElementById("message");
    const counter = document.getElementById("messageCounter");
    if (!message || !counter) return;
    message.addEventListener("input", () => {
        counter.textContent = `${message.value.length} / 1000`;
    });
});