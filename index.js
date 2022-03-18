// screen elements
const mainDisplayEl = document.getElementById("main-display");
const subDisplayEl = document.getElementById("sub-display");

// button elements
const allButtons = document.querySelectorAll(".button");

// variables for calculations
let firstNum = "";
let operator = "";
let lastNum = "";

// default values for display
subDisplayEl.innerText = firstNum;
mainDisplayEl.innerText = firstNum;

function updateDisplay() {
   firstNum = calculate(firstNum, lastNum, operator);
   lastNum = "";
   mainDisplayEl.innerText = firstNum;
}

allButtons.forEach((button) => {
   button.addEventListener("click", (event) => {
      const btn = event.currentTarget;
      const value = btn.dataset.value;

      // if power button is pressed
      if (value === "power") {
         firstNum = "";
         operator = "";
         lastNum = "";
         mainDisplayEl.innerText = "";
      }

      // if delete button is pressed
      if (value === "delete") {
         if (lastNum) {
            lastNum = lastNum.slice(0, -1);
         } else if (operator) {
            operator = "";
         } else {
            firstNum = firstNum.slice(0, -1);
         }
      }

      // if input is a number
      if (Number.isInteger(+value)) {
         if (lastNum && lastNum === "0") {
            lastNum = value;
         } else if (!operator && firstNum === "0") {
            firstNum = value;
         } else if (operator) {
            lastNum += value;
         } else {
            firstNum += value;
         }
      }

      // if input is a decimal
      if (value === "decimal") {
         if (operator && !lastNum.includes(".")) {
            if (!lastNum) {
               lastNum = "0."
            } else {
               lastNum += ".";
            }
         } else if (!operator && !firstNum.includes(".")) {
            if (!firstNum) {
               firstNum = "0."
            } else {
               firstNum += ".";
            }
         }
      }

      // operators
      if (value === "divide") {
         if (lastNum) {
            updateDisplay();
         }
         operator = "/";
      }

      if (value === "multiply") {
         if (lastNum) {
            updateDisplay()
         }
         operator = "*";
      }

      if (value === "plus") {
         if (lastNum) {
            updateDisplay();
         }
         operator = "+";
      }

      if (value === "minus") {
         if (lastNum) {
            updateDisplay();
         }
         operator = "-";
      }

      if (value === "equals") {
         if (firstNum && lastNum && operator) {
            mainDisplayEl.innerText = calculate(firstNum, lastNum, operator);
         }
      }

      subDisplayEl.innerText = `${firstNum} ${operator} ${lastNum}`;
   });
});
