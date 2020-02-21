const display = document.querySelector(".display__readout");
const allButtons = document.querySelectorAll(".button");
const printBtns = document.querySelectorAll(".print");
const operatorBtns = document.querySelectorAll(".operator");
const backBtn = document.querySelector(".backspace");
const clearBtn = document.querySelector(".clear");
const swapBtn = document.querySelector(".swap");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");
const subtractBtn = document.querySelector(".subtract");
const addBtn = document.querySelector(".add");
const equalsBtn = document.querySelector(".equals");

// operator functions
const add = (a, b) => {
  return a + b;
};
const subtract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};

const logs = () => {
  console.log(numbers);
  console.log(operators);
  console.log(display.innerHTML);
};

// operate function
const operate = (operator, a, b) => {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "x") return multiply(a, b);
  if (operator === "/") return divide(a, b);
};

// resolve function
const resolve = () => {};

// back function
const backspace = () => {
  let current = [...display.innerHTML];
  current.pop();
  display.innerHTML = current.join("");
};

// clear functions
const clearDisplay = () => {
  display.innerHTML = "";
};
const clearData = () => {
  numbers = [];
  operators = [];
};

// round number
const roundResult = () => {
  return (
    Math.round(operate(operators[0], numbers[0], numbers[1]) * 100000) / 100000
  );
};

let numbers = [];
let operators = [];

// printing buttons
printBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    if (e.target.classList.contains("decimal")) {
      if (display.innerHTML.slice(-1) == ".") return;
    }
    display.innerHTML += e.target.innerHTML;
    logs();
  });
});

// operator buttons
operatorBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    if (display.innerHTML.slice(-1) == "") return;
    if (
      display.innerHTML.slice(-1) == "+" ||
      display.innerHTML.slice(-1) == "-" ||
      display.innerHTML.slice(-1) == "x" ||
      display.innerHTML.slice(-1) == "/"
    ) {
      operators.pop();
      backspace();
    }
    if (operators.length === 0) {
      operators.push(e.target.innerHTML);
      let firstNum = parseFloat(display.innerHTML);
      numbers.push(firstNum);
      display.innerHTML += e.target.innerHTML;
    } else {
      let secNum = parseFloat(
        display.innerHTML.slice(display.innerHTML.indexOf(operators[0]) + 1)
      );
      numbers.push(secNum);
      let result = roundResult();
      display.innerHTML = result;
      let firstNum = parseFloat(display.innerHTML);
      clearData();
      numbers.push(firstNum);
      operators.push(e.target.innerHTML);
      display.innerHTML += e.target.innerHTML;
    }
    logs();
  });
});

// clear button
clearBtn.addEventListener("click", () => {
  clearDisplay();
  clearData();
  // logs();
});

// backspace button
backBtn.addEventListener("click", () => {
  backspace();
  // logs();
});

// equals button
equalsBtn.addEventListener("click", () => {
  if (
    display.innerHTML === "" ||
    display.innerHTML.slice(-1) == "+" ||
    display.innerHTML.slice(-1) == "-" ||
    display.innerHTML.slice(-1) == "x" ||
    display.innerHTML.slice(-1) == "/" ||
    operators.length == 0
  )
    return;
  let secNum = parseFloat(
    display.innerHTML.slice(display.innerHTML.indexOf(operators[0]) + 1)
  );
  numbers.push(secNum);
  let result = roundResult();
  display.innerHTML = result;
  clearData();
  // logs();
});

// swap button
swapBtn.addEventListener("click", e => {
  if (operators.length == 0) {
    let numberToSwap = parseFloat(display.innerHTML);
    console.log(numberToSwap);
    display.innerHTML = -numberToSwap;
  } else {
  }
});

// keystroke bindings
document.addEventListener("keydown", e => {
  // console.log(e.key);
  allButtons.forEach(btn => {
    if (e.key == btn.innerHTML) {
      if (e.key == "x" || e.key == "=") return;
      btn.click();
    }
  });
  if (e.key == "Enter") {
    equalsBtn.click();
  }
  if (e.key == "*") {
    multiplyBtn.click();
  }
  if (e.key == "Backspace") {
    backBtn.click();
  }
});
