const btnDelete = document.querySelector("#delete")
const btnClear = document.querySelector("#clear-all")
const btnEquals = document.querySelector("#equals")
const btnDecimal = document.querySelector("#decimal")

let btnNumbers = document.querySelectorAll(".btn-number")
let btnOperators = document.querySelectorAll(".btn-operator")

let displayLast = document.querySelector("#display-last")
let displayCurrent = document.querySelector("#display-current")

const firstOperandText = document.querySelector("#first-operand")
const operatorText = document.querySelector("#operator")
const secondOperandText = document.querySelector("#second-operand")

btnDelete.addEventListener("click", removeLast)
btnClear.addEventListener("click", clear)
btnDecimal.addEventListener("click", checkForDecimal)

function removeLast(){
    if(secondOperandText.textContent !== ""){
        secondOperandText.textContent = secondOperandText.textContent.slice(0,-1);
    } else if (operatorText.textContent !== ""){
        operatorText.textContent = "";
    } else if (firstOperandText.textContent !== ""){
        firstOperandText.textContent = firstOperandText.textContent.slice(0,-1);
    } else {
        console.log("What you doin' son?")
    }
}

function clear(){
    firstOperandText.textContent = "";
    operatorText.textContent = "";
    secondOperandText.textContent = "";
    displayCurrent.textContent = "0";
    displayLast.textContent = "";
}

function checkForDecimal(){
    if(firstOperandText.textContent === ""){
        firstOperandText.textContent += "0.";
    } else if (firstOperandText !== "0" && operatorText.textContent === ""){
        let decimal = firstOperandText.textContent.split("");
        if (!decimal.includes(".")){
            firstOperandText.textContent += ".";
        }
    } else if (operatorText.textContent !== "" && secondOperandText.textContent === ""){
        secondOperandText.textContent += "0.";
    } else {
        let decimal = secondOperandText.textContent.split("");
        if (!decimal.includes(".")){
            secondOperandText.textContent += "."
        }
    }
}

btnNumbers.forEach(button =>
    button.addEventListener("click", () => addNumber(button.textContent))
    )

function addNumber(value){
    if (operatorText.textContent === ""){
        firstOperandText.textContent += value;
    } else {
        secondOperandText.textContent += value;
    }
}

btnOperators.forEach(button =>
    button.addEventListener("click", () => addOperator(button.textContent))
    )

function addOperator(value){
    if(firstOperandText.textContent !== "" && secondOperandText.textContent === ""){
        operatorText.textContent = value;
    } else if (firstOperandText.textContent !== "" && secondOperandText.textContent !== ""){
        let counting = roundAnswer(operate(operatorText.textContent, firstOperandText.textContent, secondOperandText.textContent));
        firstOperandText.textContent = counting;
        displayCurrent.textContent = counting;
        displayLast.textContent = counting;
        operatorText.textContent = value;
        secondOperandText.textContent = "";
    } else if (firstOperandText.textContent === "" && displayLast.textContent !== ""){
        firstOperandText.textContent = displayLast.textContent;
        operatorText.textContent = value;
    }
}    

function roundAnswer(number){
    return Math.round(number * 1000) / 1000
}

btnEquals.addEventListener("click", function(){
    if(operatorText.textContent === "/" && secondOperandText.textContent === "0"){
        alert("Basic calculus, do you know it?")
        clear()
    }
    if(firstOperandText.textContent !== "" && operator.textContent !== "" && secondOperandText.textContent !== ""){
        let answer = roundAnswer(operate(operatorText.textContent, firstOperandText.textContent, secondOperandText.textContent));
        displayCurrent.textContent = answer;
        firstOperandText.textContent = "";
        operatorText.textContent = "";
        secondOperandText.textContent = "";
        displayLast.textContent = answer;
    } else {
        console.log("C'mon man...")
    }
});

function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2)
};

function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2)
};

function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2)
};

function divide(num1, num2){
    return parseFloat(num1) / parseFloat(num2)
};

function operate(operator, num1, num2){

    switch (operator){
        case "+":
            return add(num1, num2)
            break;
        case "-":
            return subtract(num1, num2)
            break;
        case "*":
            return multiply(num1, num2)
            break;
        case "/":
            return divide(num1, num2)
            break;
    }
}