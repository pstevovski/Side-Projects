/* To-do's
- Get values from loan, interest and return years fields
- Listen to an event listener on the calculate button
- When clicked on the button - trigger the spinner animation for 1 second
- After that, hide spinner and show results section
- Display error message if user clicks "Calculate" without filling the required fields
*/

const loanAmmount = document.querySelector("#ammount");
const interestPercent = document.querySelector("#interest");
const paymentYears = document.querySelector("#paymentYears");
const loader = document.querySelector("#loader");
const results = document.querySelector("#results");
const error = document.querySelector("#error");
const calculateBtn = document.querySelector("#calculate");
const monthlyPayment = document.querySelector("#monthlyPayment");
const totalPayment = document.querySelector("#totalPayment");
const totalInterest = document.querySelector("#totalInterest");


// Calculate
function calculate() {
    results.style.display = "none";
    // If theres no value in the fields, show error message and end the function
    if(!loanAmmount.value || !interestPercent.value || !paymentYears.value) {
        errorMsg();
        return;
    }
    
    // Display and hide the loader after set timeout
    loader.style.display = "block";
    setTimeout(() => {
        // Display the results
        results.style.display = "block";
        
        loader.style.display = "none";

        [loanAmmount.value, interestPercent.value, paymentYears.value] = "";
    }, 2000);
    
    const principal = parseFloat(loanAmmount.value);
    const calculatedInterest = parseFloat(interestPercent.value) / 100 / 12;
    const calculatedPayment = parseFloat(paymentYears.value) * 12;

    // Monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
    }
}

// Error message
function errorMsg () {
    error.style.display = "flex";

    setTimeout(() => {
        error.style.display = "none";
    }, 3500);
}

calculateBtn.addEventListener("click", calculate);

