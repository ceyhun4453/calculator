const display = document.querySelector("span.display");
const div0Error = "Can't divide by 0!";
display.textContent = "";
let currentValue;
let operator;
let newInputMode = true;
document.querySelectorAll("button[data-value]").forEach(element => {
    element.addEventListener("click", () => {
        if (newInputMode || display.textContent === div0Error) {
            display.textContent = "";
            newInputMode = false;
        }
        display.textContent += element.getAttribute("data-value");
    })
})

document.querySelector("button#button-delete").addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
})

document.querySelector("button#button-clear").addEventListener("click", () => {
    display.textContent = "";
    currentValue = null;
    operator = null;
    newInputMode = true;
})

document.querySelectorAll("button[data-operator]").forEach(element => {
    element.addEventListener("click", () => {
        newInputMode = true;
        if (!operator) {
            operator = element.getAttribute("data-operator");
        }

        if (!currentValue) {
            currentValue = display.textContent;
            return;
        }

        currentValue = operate(currentValue, display.textContent, operator);
        display.textContent = currentValue;
        operator = element.getAttribute("data-operator");
    })
});

document.querySelector("button#button-equals").addEventListener("click", element => {
    if (!operator) {
        return;
    }

    currentValue = operate(currentValue, display.textContent, operator);
    display.textContent = currentValue;
    currentValue = null;
    operator = null;
});

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

    return (dividend / divisor).toFixed(2);
}

function operate(number1, number2, operator) {
    const n1 = parseFloat(number1);
    const n2 = parseFloat(number2);
    switch (operator) {
        case "+":
            return add(n1, n2);
        case "-":
            return subtract(n1, n2);
        case "*":
            return multiply(n1, n2);
        case "/":
            return divide(n1, n2);
    }
}

function getDefaultValue(operator) {
    if (operator === "+" || operator === "-") {
        return 0;
    }

    if (operator === "*" || operator === "/") {
        return 1;
    }
}