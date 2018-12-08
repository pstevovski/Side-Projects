// User name
const name = document.querySelector("#name");
const zip = document.querySelector("#zip");
const email = document.querySelector("#email");
const number = document.querySelector("#number");
const errors = document.querySelectorAll(".error");
const inputs = document.querySelectorAll(`input[type="text"]`);
const btn = document.querySelector("#btn");

name.addEventListener("blur", () => {
    const nameValue = name.value;
    console.log(nameValue)

    // Check if the name contains only letters and its at least 3 to 12 characters long
    const regex = /^[a-zA-Z]{3,12}$/;

    errors.forEach(error => {
        if(name.id === error.dataset.name) {
            if (!nameValue) {
                name.classList.add("invalid");
                error.innerHTML = `<p>Please fill this field.</p>`;
            } else if(!regex.test(nameValue)) {
                name.classList.add("invalid");
                error.innerHTML = `<p>Please enter a name 3 to 12 characters long. </p>`;
            } else {
                name.classList.remove("invalid");
                error.innerHTML = ``;
            }
        }
    })
    checkInputs();
})

// ZIP code
zip.addEventListener("blur", () => {
    const zipCode = zip.value;

    // Check if its a proper US ZIP code
    const regex = /^[0-9]{5}(-[0-9]{4})?/; // Start with a number, 5 numbers required, optional - and 4 other numbers
    errors.forEach(error => {
        if(zip.id === error.dataset.name) {
            if(!zipCode) {
                zip.classList.add("invalid");
                error.innerHTML = `<p>Please fill this field.</p>`;
            } else if(!regex.test(zipCode)) {
                zip.classList.add("invalid");
                error.innerHTML = `<p>Please enter a valid ZIP code</p>`;
            } else {
                zip.classList.remove("invalid");
                error.innerHTML = ``;
            }      
        }
    }) 
    checkInputs();
})

// Email addres
email.addEventListener("blur", () => {
    const address = email.value;

    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,5})$/;

    errors.forEach(error => {
        if(email.id === error.dataset.name) {
            if(!address) {
                email.classList.add("invalid");
                error.innerHTML = `<p>Please fill this field.</p>`;
            } else if(!regex.test(address)) {
                email.classList.add("invalid");
                error.innerHTML = `<p>Please enter a valid email address.</p>`;
            } else {
                email.classList.remove("invalid");
                error.innerHTML = ``;
            }
        }
    })
    checkInputs();
})

// Phone number
number.addEventListener("blur", () => {
    const phoneNumber = number.value;

    const regex = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

    errors.forEach(error => {
        if(number.id === error.dataset.name) {
            if(!phoneNumber) {
                number.classList.add("invalid");
                error.innerHTML = `<p>Please fill this field.</p>`;
            } else if(!regex.test(phoneNumber)) {
                number.classList.add("invalid");
                error.innerHTML = `<p>Please enter a valid phone number.</p>`;
            } else {
                number.classList.remove("invalid");
                error.innerHTML = ``;
            }
        }
    })
    checkInputs();
})

// If any of the input fields have an invalid class, don't enable SUBMIT button, if none of them has it, enable the button.
function checkInputs() {
    // inputs.forEach(input => {
    //     if(input.classList.contains("invalid") || !input.value) {
    //         console.log("button disabled")
    //         btn.disabled = true;
    //     } else {
    //         console.log("button enabled");
    //         btn.disabled = false;
    //     }
    // });

    // Shorter variant
    inputs.forEach(input => (input.classList.contains("invalid") || !input.value) ? btn.disabled = true : btn.disabled = false);
}