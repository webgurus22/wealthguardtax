const scriptURL = "https://script.google.com/macros/s/AKfycbxtW1BRpFNir1tYcERxLjQJW6b7TzgeRuFRNHLMKZnPIrNAouTzdrTQH1ssdu2NYsFu/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const contactNumberInput = document.getElementById("contact_number");
    const whatsappNumberInput = document.getElementById("whatsapp_number");
    const contactError = document.getElementById("contact_error");
    const whatsappError = document.getElementById("whatsapp_error");

    const contactNumber = contactNumberInput.value.trim();
    const whatsappNumber = whatsappNumberInput.value.trim();

    // Validation for 10-digit numbers
    const numberPattern = /^\d{10}$/;
    let isValid = true;

    // Contact Number Validation
    if (!numberPattern.test(contactNumber)) {
        contactError.textContent = "Invalid number.";
        contactNumberInput.style.border = "2px solid red";
        isValid = false;
    } else {
        contactError.textContent = "";
        contactNumberInput.style.border = "2px solid #ced4da"; // Reset to default
    }

    // WhatsApp Number Validation
    if (!numberPattern.test(whatsappNumber)) {
        whatsappError.textContent = "Invalid number..";
        whatsappNumberInput.style.border = "2px solid red";
        isValid = false;
    } else {
        whatsappError.textContent = "";
        whatsappNumberInput.style.border = "2px solid #ced4da"; // Reset to default
    }

    if (!isValid) return; // Stop form submission if there are validation errors

    var formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
            swal("Done", "Submitted Successfully.", "success");
            form.reset();
            contactNumberInput.style.border = "2px solid #ced4da";
            whatsappNumberInput.style.border = "2px solid #ced4da";
        })
        .catch((error) => {
            swal("Error", "Something went wrong. Please try again!", "error");
        });
});


document.addEventListener("DOMContentLoaded", function () {
    const serviceSelect = document.getElementById("service");
    const otherServiceDiv = document.getElementById("otherServiceDiv");
    const otherServiceInput = document.getElementById("other_service");

    serviceSelect.addEventListener("change", function () {
        if (this.value === "Others") {
            otherServiceDiv.style.display = "block"; // Show input box
            otherServiceInput.required = true; // Make it required
            otherServiceInput.value = ""; // Clear the value
        } else {
            otherServiceDiv.style.display = "none"; // Hide input box
            otherServiceInput.required = false; // Remove required attribute
            otherServiceInput.value = "NA"; // Default value for other options
        }
    });

    // Initialize the input field with "NA" on page load
    otherServiceInput.value = "NA";
});
