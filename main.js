const header = document.querySelector("header");
const numberButton = document.querySelectorAll(".numbers");
const decimalButton = document.querySelector(".decimal");
const operatorButton = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operation = [];
let currentResult = 0;

numberButton.forEach(number => {
    number.addEventListener("click", () => {
        if (operation.length === 0) {
            operation.push(number.value);
            header.textContent = number.value;
        } else if (operation.length === 1) {
            if (currentResult === 0) {
                if (operation[0].length != 9) {
                    operation[0] += number.value;
                    header.textContent += number.value;
                }
            } else if (currentResult !== 0) {
                operation[0] = number.value;
                currentResult = 0;
                header.textContent = number.value;
            }
        } else if (operation.length === 2) {
            operation.push(number.value);
            header.textContent = number.value;
        } else if (operation.length === 3) {
            if (operation[2].length != 9) {
                operation[2] += number.value;
                header.textContent += number.value;
            }
        }
    })
})

decimalButton.addEventListener("click", () => { 
    if (!header.textContent.includes(".")) {
        if (operation.length === 0) {
            operation.push("0");
            operation[0] += ".";
            header.textContent = operation[0];
        } else if (operation.length === 1) {
            if (operation[0].length != 9) {
                operation[0] += ".";
                header.textContent = operation[0];
            }
        }  else if (operation.length === 3) {
            if (operation[2].length != 9) {
                operation[2] += ".";
                header.textContent = operation[2];
            }
        }
    }
})

operatorButton.forEach(operator => {
    operator.addEventListener("click", () => {
        if (operation.length === 1) {
            operation.push(operator.value);
        } else if (operation.length === 2) {
            operation[1] == operator.value;
        } else if (operation.length === 3) {
            getResult();
            operation.push(operator.value);
        }
    })
})

equalSign.addEventListener("click", () => {
    console.log(getResult());
})

function getResult() {
    if (operation.length === 3) {
        if (typeof operation[0] === 'string') operation[0] = Number(operation[0]);
        if (typeof operation[2] === 'string') operation[2] = Number(operation[2]);
        if (operation[1] === "+") {
            currentResult = operation[0] + operation[2];
        } else if (operation[1] === "-") {
            currentResult = operation[0] - operation[2];
        } else if (operation[1] === "x") {
            currentResult = operation[0] * operation[2];
        } else if (operation[1] === "÷") {
            if (operation[2] === 0) {
                emptyArray();
                return header.textContent = "Really?";
            }
            currentResult = operation[0] / operation[2];
        }
        emptyArray();
        operation.push(String(currentResult));
        currentResult = checkResultLen(currentResult);
        header.textContent = currentResult;
    }
}

clearButton.addEventListener("click", () => {
    header.textContent = "0";
    emptyArray()
})

deleteButton.addEventListener("click", () => {
    if (operation.length === 1) {
        if (currentResult !== 0) {
            currentResult = 0;
            emptyArray();
            return header.textContent = "0";
        }
        if (operation[0].length === 1 || operation[0].length === 0) {
            emptyArray();
            return header.textContent = "0";
        } 
        operation[0] = operation[0].slice(0, operation[0].length - 1);
        header.textContent = operation[0];
    } else if (operation.length === 3) {
        if (operation[2].length === 1 || operation[2].length === 0) {
            operation.splice(2, operation.length)
            return header.textContent = "0";
        } 
        operation[2] = operation[2].slice(0, operation[2].length - 1);
        header.textContent = operation[2];
    }
})

function emptyArray() {
    operation.splice(0, operation.length)
}

function checkResultLen(result) {
    if (String(result).length > 9) {
        result = result.toExponential();
        result = Number(result).toPrecision(2);
        return result;
    } else {
        return result;
    }
} 