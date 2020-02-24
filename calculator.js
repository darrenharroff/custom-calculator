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
  console.log(wipe);
};

// operate function
const operate = (operator, a, b) => {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "x") return multiply(a, b);
  if (operator === "/") return divide(a, b);
};

// display result
const displayResult = () => {
  result = roundResult();
  if (result == "Infinity" || result == "-Infinity" || result == "NaN") {
    display.innerHTML = "Don't do that...";
    setTimeout(() => {
      display.innerHTML = "";
    }, 1000);
  } else {
    display.innerHTML = result;
  }
};

// back function
const backspace = () => {
  if (
    display.innerHTML.slice(-1) == "+" ||
    display.innerHTML.slice(-1) == "-" ||
    display.innerHTML.slice(-1) == "x" ||
    display.innerHTML.slice(-1) == "/"
  ) {
    clearData();
  }
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
const wipeData = () => {
  if (wipe) {
    clearDisplay();
    clearData();
    wipe = false;
  }
};

// round number
const roundResult = () => {
  return (
    Math.round(operate(operators[0], numbers[0], numbers[1]) * 100000) / 100000
  );
};

let numbers = [];
let operators = [];
let wipe = false;

const ops = ["+", "-", "/", "x"];

// printing buttons
printBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    wipeData();

    // decimal functionality
    if (e.target.classList.contains("decimal")) {
      if (operators.length == 0 && display.innerHTML.includes(".")) {
        return;
      } else if (
        operators.length > 0 &&
        display.innerHTML.substring(numbers[0].toString().length).includes(".")
      ) {
        console.log(display.innerHTML.substring(numbers[0].toString().length));
        return;
      }
    }

    display.innerHTML += e.target.innerHTML;

    // logs();
  });
});

// operator buttons
operatorBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    if (display.innerHTML.slice(-1) == "" || display.innerHTML.slice(-1) == ".")
      return;
    if (
      display.innerHTML.slice(-1) == "+" ||
      display.innerHTML.slice(-1) == "-" ||
      display.innerHTML.slice(-1) == "x" ||
      display.innerHTML.slice(-1) == "/"
    ) {
      operators.pop();
      backspace();
      let firstNum = parseFloat(display.innerHTML);
      numbers.push(firstNum);
      operators.push(e.target.innerHTML);
      display.innerHTML += e.target.innerHTML;
    } else if (operators.length === 0) {
      wipe = false;
      operators.push(e.target.innerHTML);
      let firstNum = parseFloat(display.innerHTML);
      numbers.push(firstNum);
      display.innerHTML += e.target.innerHTML;
    } else {
      let secNum = parseFloat(
        display.innerHTML.slice(display.innerHTML.lastIndexOf(operators[0]) + 1)
      );
      numbers.push(secNum);
      displayResult();
      let firstNum = parseFloat(display.innerHTML);
      clearData();
      numbers.push(firstNum);
      operators.push(e.target.innerHTML);
      display.innerHTML += e.target.innerHTML;
    }
    // logs();
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
    operators.length == 0 ||
    display.innerHTML.slice(-1) == "."
  )
    return;
  let secNum = parseFloat(
    display.innerHTML.slice(display.innerHTML.lastIndexOf(operators[0]) + 1)
  );
  numbers.push(secNum);
  displayResult();
  wipe = true;
  clearData();
  // logs();
});

// swap button
swapBtn.addEventListener("click", e => {
  if (operators.length == 0) {
    wipe = false;
    let numberToSwap = parseFloat(display.innerHTML);
    display.innerHTML = -numberToSwap;
    // logs();
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
