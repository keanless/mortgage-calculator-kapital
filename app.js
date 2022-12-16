function calculate(
  buildingArea,
  buildingPrice,
  paymentPeriod,
  firstPayment,
  minimumPaymentPercent,
  percentValue
) {
  // Define the function for calculating the monthly payment
  function pmt(interestRate, term, principal) {
    // Calculate the monthly interest rate
    const monthlyInterestRate = interestRate / 12;

    // Calculate the number of monthly payments
    const numberOfPayments = term * 12;

    // Calculate the monthly payment
    const payment =
      (principal *
        (monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments)) /
      ((1 + monthlyInterestRate) ** numberOfPayments - 1);

    // Return the result
    return payment;
  };

  // Calculate the minimum payment amount
  // Calculate the monthly payment
  const interestRate = percentValue;
  const term = paymentPeriod / 12;

  function difference(buildingPrice, firstPayment) {
    //  if (
    //    buildingPrice - firstPayment >= 20000 &&
    //    buildingPrice - firstPayment <= 50000
    //  ) {
    //    return buildingPrice - firstPayment;
    //  }
    //  return false;
    return buildingPrice - firstPayment;
  }

  const principal = difference(buildingPrice, firstPayment);
  const payment = pmt(interestRate, term, principal);
  // Return the result
  document.querySelector(".monthly-payment").innerHTML = payment.toFixed(3);
  document.querySelector(".loan-pay").innerHTML = principal.toFixed(3);
  displayPercentRange(buildingPrice);
}
// Get the div element with the "calculator-buildingarea-select" class
let calculatorBuildingareaSelect = document.querySelector(
  ".calculator-buldingarea-select"
);
// Create an array to store the unique and asc order  values

const values = [
  54.83, 57.73, 78.19, 78.28, 101.73, 105.91, 107.06, 52.26, 55.99, 79.24,
  79.31, 101.17, 101.82, 101.94, 83.8, 89.15, 105.39, 52.84, 54.99, 59.43,
  62.61, 68.53, 52.84, 54.99, 59.43, 62.61, 68.53, 52.84, 54.99, 59.43, 61.38,
  68.53, 83.3, 89.15, 105.39, 52.99, 54.96, 56.84, 61.37, 82.94, 83.06, 102.79,
  103.99, 52.99, 54.96, 56.84, 61.37, 82.94, 83.06, 102.79, 103.99,
];

// Sort the values in ascending order
const sortedValues = values.sort((a, b) => a - b);
const uniqueValues = sortedValues.filter((value, index) => values.indexOf(value) === index);
// Iterate over the unique values
for (let i = 0; i < uniqueValues.length; i++) {
  // Create an option element
  let option = document.createElement("option");

  // Set the option value to the unique value
  option.value = uniqueValues[i];

  // Set the option text to the unique value
  option.text = uniqueValues[i];

  // Add the option to the select element
  calculatorBuildingareaSelect.appendChild(option);
}
let calculatorButton = document.querySelector("#calculator-btn");

calculatorButton.onclick = () => {
  // Get the input values
  const buildingArea = document.querySelector(
    ".calculator-buldingarea-select"
  ).value;
  const buildingPrice = buildingArea * 890;
  const paymentPeriod = document.querySelector("#js-period-input").value;
  const firstPayment = document.querySelector("#js-first-payment-input").value;
  // Set the percent value based on the payment period
  let percentValue;
  if (paymentPeriod <= 36) {
    percentValue = 0.07;
  } else if (paymentPeriod <= 60) {
    percentValue = 0.075;
  } else if (paymentPeriod <= 120) {
    percentValue = 0.09;
  } else if (paymentPeriod <= 180) {
    percentValue = 0.1;
  } else {
    percentValue = 0.11;
  }

  function calculatePercent(incomeType) {
    if (incomeType === "Rəsmi gəlir") {
      return 0.2;
    } else if (incomeType === "Digər gəlir mənbələri") {
      return 0.3;
    } else {
      return false;
    }
  }
  let minimumPaymentPercent = calculatePercent(
    document.querySelector(".income-select").value
  );

  // Call the calculate function

  document.querySelector(".building-price-flat").value =
    buildingPrice.toFixed(3) + " AZN";

  calculate(
    +buildingArea,
    +buildingPrice,
    +paymentPeriod,
    +firstPayment,
    +minimumPaymentPercent,
    +percentValue
  );
};

// Get the input elements
const periodInput = document.getElementById("js-period-input");
const periodRange = document.getElementById("js-period-range");
const errorMessage = document.getElementById("js-error-message");







periodInput.addEventListener("input", () => {
  if (periodInput.value < 12 || periodInput.value > 240) {
    errorMessage.innerHTML = "Müddət minimum 12, maksimum 240 ay ola bilər. ";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
});

// Get the input and range elements
const input = document.getElementById("js-period-input");
const range = document.getElementById("js-period-range");



// Listen for input event on numInput.

calculatorBuildingareaSelect.addEventListener("change", () => {
  const buildingPrice = document.querySelector(".calculator-buldingarea-select").value * 890;
  document.querySelector(".building-price-flat").value = buildingPrice.toFixed(3) + " AZN";
  const incomeType = document.querySelector(".income-select");
  displayPercentRange(incomeType.value);
  incomeType.addEventListener("change", () => {
    displayPercentRange(incomeType.value);
  });
});


function displayPercentRange(incomeType) {
  let buildingPrice =
    document.querySelector(".calculator-buldingarea-select").value * 890;
  let calculatorFirstPayment = document.querySelector(".calculator-firstpayment");
  let firstPaymentRange = document.querySelector("#js-first-payment-range ");
  let firstPaymentInput = document.querySelector("#js-first-payment-input");
  const errorMessagePayment = document.querySelector("#js-error-message-payment");
  if (incomeType === "Rəsmi gəlir") {
    firstPaymentInput.addEventListener("input", () => {
      if (firstPaymentInput.value < buildingPrice || firstPaymentInput.value > resmiPrice) {
        errorMessagePayment.innerHTML = `İlk ödəniş minimum ${resmiPrice}, maksimum ${buildingPrice} ola bilər. `;
        errorMessagePayment.style.display = "block";
      } else {
        errorMessagePayment.style.display = "none";
      }
    });
    calculatorFirstPayment.style.display = "block";
    let resmiPrice = (0.2 * buildingPrice).toFixed(3);
    firstPaymentRange.min = resmiPrice;
    firstPaymentRange.max = buildingPrice;
    firstPaymentRange.value = resmiPrice;

    firstPaymentInput.min = resmiPrice;
    firstPaymentInput.max = buildingPrice;
    firstPaymentInput.value = resmiPrice;
  } else if (incomeType === "Digər gəlir mənbələri") {
    calculatorFirstPayment.style.display = "block";
    let digerPrice = (0.3 * buildingPrice).toFixed(3);
    firstPaymentRange.min = digerPrice;
    firstPaymentRange.max = buildingPrice;
    firstPaymentRange.value = digerPrice;

    firstPaymentInput.min = digerPrice;
    firstPaymentInput.max = buildingPrice;
    firstPaymentInput.value = digerPrice;
  }
};

const firstPaymentInput = document.getElementById('js-first-payment-input');
const firstPaymentRange = document.getElementById('js-first-payment-range');

firstPaymentInput.addEventListener('input', function () {
  firstPaymentRange.value = this.value;
});

firstPaymentRange.addEventListener('input', function () {
  firstPaymentInput.value = this.value;
});

// Get the input and range elements
const rangeInput = document.querySelector('#js-period-input');
const numberInput = document.querySelector('#js-period-range');
rangeInput.addEventListener("input", updateValue);
numberInput.addEventListener("input", updateValue);

function updateValue() {
  // Get the current value of the range and number inputs
  const rangeValue = rangeInput.value;
  const numberValue = numberInput.value;
  // If the values are not the same, update one input to match the other
  if (rangeValue !== numberValue) {
    if (this === rangeInput) {
      numberInput.value = rangeValue;
    } else {
      rangeInput.value = numberValue;
    }
  }
};