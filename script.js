let firstNumber = "";
let secondNumber = "";
let operator = "";
let resultDisplayed = false;

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");


function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  } else if (operator === "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator === "*") {
    return multiply(firstNumber, secondNumber);
  } else if (operator === "/") {
    return divide(firstNumber, secondNumber);
  }
}

function calculate() {
  if (firstNumber === "" || operator === "" || secondNumber === "") {
    return false;
  }

  if (operator === "/" && Number(secondNumber) === 0) {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    resultDisplayed = false;

    display.textContent = "Nice try! No dividing by zero.";
    return false;
  }

  const result = operate(
    operator,
    Number(firstNumber),
    Number(secondNumber)
  );

  firstNumber = String(result);
  secondNumber = "";
  operator = "";
  resultDisplayed = true;

  display.textContent = firstNumber;
  return true;
}

clearButton.addEventListener("click", function () {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  display.textContent = "0";
  resultDisplayed = false;
});

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.dataset.value;


    if (resultDisplayed) {
        firstNumber = "";
        resultDisplayed = false;
    }

    if (operator === "") {
      if (value === "." && firstNumber.includes(".")) {
        return;
      }

      if (value === "." && firstNumber === "") {
        firstNumber = "0";
      }

      if (resultDisplayed) {
        firstNumber = "";
        resultDisplayed = false;
      }

      firstNumber += value;
      display.textContent = firstNumber;
    } else {
      if (value === "." && secondNumber.includes(".")) {
        return;
      }

      if (value === "." && secondNumber === "") {
        secondNumber = "0";
      }

      secondNumber += value;
      display.textContent =
        firstNumber + " " + operator + " " + secondNumber;
    }
  });
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedOperator = button.dataset.value;

    if (firstNumber === "") {
      return;
    }

    if (!["+", "-", "*", "/"].includes(selectedOperator)) {
      return;
    }

    if (secondNumber !== "") {
        const success = calculate();

        if (!success) {
            return;
        }
    }
    
    operator = selectedOperator;
    resultDisplayed = false;
    display.textContent = firstNumber + " " + operator;
  });
});

equalsButton.addEventListener("click", function () {
  calculate();
});
