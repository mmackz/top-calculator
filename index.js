// screen elements
const mainDisplayEl = document.getElementById("main-display");
const subDisplayEl = document.getElementById("sub-display");

// button elements
const allButtons = document.querySelectorAll(".button");

// variables for calculations
let firstNum = "";
let operator = "";
let lastNum = "";
let lastPressed = "";

// default values for display
subDisplayEl.innerText = firstNum;
mainDisplayEl.innerText = "0";

function updateDisplay() {
   firstNum = calculate(firstNum, lastNum, operator).toString();
   lastNum = "";
   mainDisplayEl.innerText = firstNum;
}

function onButtonPress(value) {
         // if power button is pressed
         if (value === "power") {
            firstNum = "";
            operator = "";
            lastNum = "";
            mainDisplayEl.innerText = "0";
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
            if (lastPressed == "equals") {
               firstNum = value;
               operator = "";
               lastNum = "";
            } else if (lastNum && lastNum === "0") {
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
            if (lastPressed == "equals") {
               firstNum = "0.";
               operator = "";
               lastNum = "";
            } else if (operator && !lastNum.includes(".")) {
               if (!lastNum) {
                  lastNum = "0.";
               } else {
                  lastNum += ".";
               }
            } else if (!operator && !firstNum.includes(".")) {
               if (!firstNum) {
                  firstNum = "0.";
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
               updateDisplay();
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
            if (lastPressed == "equals") {
               firstNum = mainDisplayEl.innerText;
            }
            if (firstNum && lastNum && operator) {
               mainDisplayEl.innerText = calculate(firstNum, lastNum, operator);
            } else {
               mainDisplayEl.innerText = firstNum || "0";
            }
         }
   
         if (mainDisplayEl.innerText.length > 10) {
            if (!mainDisplayEl.classList.contains("small")) {
               mainDisplayEl.classList.add("small");
            }
         } else {
            mainDisplayEl.classList.remove("small");
         }
   
         if (subDisplayEl.innerText.length > 20) {
            if (!subDisplayEl.classList.contains("st-small")) {
               subDisplayEl.classList.add("st-small");
            }
         } else {
            subDisplayEl.classList.remove("st-small");
         }
   
         if (subDisplayEl.innerText.length > 32) {
            alert("Input is too long!!");
            firstNum = "";
            operator = "";
            lastNum = "";
            mainDisplayEl.innerText = "0";
         }

         // remove trailing decimal points
         if (operator && firstNum.endsWith(".")) {
            firstNum = firstNum.slice(0, -1);
         }
   
         subDisplayEl.innerText = `${firstNum} ${operator
            .replace("*", "x")
            .replace("/", "÷")} ${lastNum}`;
         lastPressed = value;

         // remove trailing decimals on enter press
         if (lastPressed == "equals" && subDisplayEl.innerText.endsWith(".")) {
            subDisplayEl.innerText = subDisplayEl.innerText.slice(0, -1);
         }
}

allButtons.forEach((button) => {
   button.addEventListener("click", (event) => {
      const btn = event.currentTarget;
      const value = btn.dataset.value;
      onButtonPress(value);
   });
});

window.addEventListener("keypress", (event) => {
   console.log(event.key)
   if (Number.isInteger(+event.key)) {
      onButtonPress(event.key);
   } else {
      switch (event.key) {
         case ".":
            onButtonPress("decimal");
            break;
         case "Enter":
            onButtonPress("equals");
            break;
      }
   }
})