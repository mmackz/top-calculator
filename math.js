function calculate(a, b, operator) {
   switch (operator) {
      case "+":
         return +parseFloat(+a + +b).toFixed(8);
      case "-":
         return +parseFloat(+a - +b).toFixed(8);
      case "*":
         return +parseFloat(+a * +b).toFixed(8);
      case "/":
         return +parseFloat(+a / +b).toFixed(8);
   }
}