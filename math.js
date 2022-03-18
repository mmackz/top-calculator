function calculate(a, b, operator) {
   switch (operator) {
      case "+":
         return +parseFloat(+a + +b).toFixed(12);
      case "-":
         return +parseFloat(+a - +b).toFixed(12);
      case "*":
         return +parseFloat(+a * +b).toFixed(12);
      case "/":
         return +parseFloat(+a / +b).toFixed(12);
   }
}