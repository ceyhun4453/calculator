const display = document.querySelector("span.display");
const div0Error = "Can't divide by 0!";
display.textContent = "";
let result;
let input;
let operator;
let newInput;
let isLastInputOperator;
init();

const inputButtons = document.querySelectorAll("button[data-value]");
inputButtons.forEach((element) => element.addEventListener("click", () => {
    isLastInputOperator = false;
    if (newInput) {
        display.textContent = "";
        newInput = false;
    }

    if (element.getAttribute("data-value") === ".") {
        if (display.textContent.length != 0 && !display.textContent.includes(".")) {
            display.textContent += ".";
        }
        return;
    }
    display.textContent += element.getAttribute("data-value");
}));

const operatorButtons = document.querySelectorAll("button[data-operator]");
operatorButtons.forEach(element => element.addEventListener("click", () => {
    if (!isLastInputOperator) {
        newInput = true;
        isLastInputOperator = true;
        if (!operator) {
            operator = element.getAttribute("data-operator");
            result = display.textContent;
            return;
        }

        result = operate(result, display.textContent, operator);
        display.textContent = result;
        operator = element.getAttribute("data-operator");
    }
}));

const equalsButton = document.querySelector("button#button-equals");
equalsButton.addEventListener("click", () => {
    if (!operator || !result || !display.textContent) {
        return;
    }

    result = operate(result, display.textContent, operator);
    display.textContent = result;
    operator = null;
    isLastInputOperator = false;
});

const clearButton = document.querySelector("#button-clear");
clearButton.addEventListener("click", () => init());

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(dividend, divisor) {
    if (divisor == 0) {
        return div0Error;
    }

    return dividend / divisor;
}

function operate(number1, number2, operator) {
    const n1 = parseFloat(number1);
    const n2 = parseFloat(number2);
    let result;
    switch (operator) {
        case "+":
            result = add(n1, n2);
            break;
        case "-":
            result = subtract(n1, n2);
            break;
        case "*":
            result = multiply(n1, n2);
            break;
        case "/":
            result = divide(n1, n2);
            break;
    }
    return round(result, 2);
}

function getDefaultValue(operator) {
    if (operator === "+" || operator === "-") {
        return 0;
    }

    if (operator === "*" || operator === "/") {
        return 1;
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function init() {
    display.textContent = "";
    result = null;
    input = null;
    operator = null;
    newInput = true;
    isLastInputOperator = true;
}