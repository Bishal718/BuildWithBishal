
/* =====================================
   1. SELECT WEBSITE SECTIONS
===================================== */

const sections = document.querySelectorAll(
    ".top-section, .middle-section, .bottom-section"
);


/* =====================================
   2. INTERSECTION OBSERVER
===================================== */

const observerOptions = {
    root: null,
    threshold: 0.35
};


/* =====================================
   3. OBSERVE EACH SECTION
===================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        const section = entry.target;

        if (entry.isIntersecting) {

            // Make the section visible
            section.classList.add("fade-in");
            section.classList.remove("fade-out");

        } else {

            // Make the section transparent
            section.classList.add("fade-out");
            section.classList.remove("fade-in");

        }

    });

}, observerOptions);


/* =====================================
   4. START OBSERVING SECTIONS
===================================== */

sections.forEach((section) => {

    observer.observe(section);

});

/* =====================================
   5. FEEDBACK FORM SUBMISSION
===================================== */

// Select the form elements

const feedbackForm = document.getElementById("feedback-form");

const formStatus = document.getElementById("form-status");

const sendButton = document.getElementById("send-feedback");


// Replace this with your actual Formspree endpoint

const formEndpoint = "https://formspree.io/f/xdeggdkk";


// Listen for form submission

feedbackForm.addEventListener("submit", async function(event) {

    // Prevent the default page reload

    event.preventDefault();

    // Check whether all required fields are valid

    if (!feedbackForm.checkValidity()) {
        feedbackForm.reportValidity();
        return;
    }

    // Show sending message

    formStatus.textContent = "Sending your feedback...";

    formStatus.className = "";

    sendButton.disabled = true;

    sendButton.textContent = "Sending...";


    try {

        // Send feedback to Formspree

        const response = await fetch(formEndpoint, {

            method: "POST",

            body: new FormData(feedbackForm),

            headers: {
                "Accept": "application/json"
            }

        });


        // Check server response

        if (response.ok) {

            formStatus.textContent =
                "Thank you! Your feedback has been sent successfully.";

            formStatus.className = "success";

            // Clear the form

            feedbackForm.reset();

        } else {

            formStatus.textContent =
                "Unable to send feedback. Please try again.";

            formStatus.className = "error";

        }

    } catch (error) {

        formStatus.textContent =
            "Network error. Please check your internet connection.";

        formStatus.className = "error";

    }


    // Restore the button

    sendButton.disabled = false;

    sendButton.textContent = "Send Feedback";

});
