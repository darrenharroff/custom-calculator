const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display__readout");
const allButtons = document.querySelectorAll(".button");
const printBtns = document.querySelectorAll(".print");
const operatorBtns = document.querySelectorAll(".operator");
const backBtn = document.querySelector(".backspace");
const clearBtn = document.querySelector(".clear");
const swapBtn = document.querySelector(".swap");
const multiplyBtn = document.querySelector(".multiply");
const equalsBtn = document.querySelector(".equals");

// debug mode
let debug = false;
const logs = () => {
  if (debug) {
    console.log(numbers);
    console.log(operators);
    console.log(display.innerHTML);
    console.log(wipe);
  }
};

// operator functions
const operations = {
  "+": {
    operation: function(a, b) {
      return a + b;
    }
  },
  "-": {
    operation: function(a, b) {
      return a - b;
    }
  },
  x: {
    operation: function(a, b) {
      return a * b;
    }
  },
  "/": {
    operation: function(a, b) {
      return a / b;
    }
  }
};

// operate function
const operate = (operator, a, b) => {
  return operations[operator].operation(a, b);
};

// display result
const displayResult = () => {
  result = roundResult();
  // if divided by 0
  if (result == "Infinity" || result == "-Infinity" || result == "NaN") {
    display.innerHTML = "Don't do that...";
    setTimeout(() => {
      backspace();
    }, 0);
    setTimeout(() => {
      display.innerHTML = "";
    }, 1000);
  } else {
    display.innerHTML = result;
  }
};

// back function
const backspace = () => {
  if (lastIsOperator()) {
    clearData();
  }
  wipe = false;
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

// checks if last is operator
const lastIsOperator = () => {
  if (
    display.innerHTML.slice(-1) == "+" ||
    display.innerHTML.slice(-1) == "-" ||
    display.innerHTML.slice(-1) == "x" ||
    display.innerHTML.slice(-1) == "/"
  ) {
    return true;
  } else {
    return false;
  }
};

// push first number
const pushFirstNum = e => {
  let firstNum = parseFloat(display.innerHTML);
  numbers.push(firstNum);
  operators.push(e.target.innerHTML);
  display.innerHTML += e.target.innerHTML;
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

    logs();
  });
});

// operator buttons
operatorBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    if (display.innerHTML.slice(-1) == "" || display.innerHTML.slice(-1) == ".")
      return;
    if (lastIsOperator()) {
      operators.pop();
      backspace();
      pushFirstNum(e);
      //
    } else if (operators.length === 0) {
      wipe = false;
      pushFirstNum(e);
      //
    } else {
      let secNum = parseFloat(
        display.innerHTML.slice(display.innerHTML.lastIndexOf(operators[0]) + 1)
      );
      numbers.push(secNum);
      displayResult();
      clearData();
      pushFirstNum(e);
    }
    logs();
  });
});

// clear button
clearBtn.addEventListener("click", () => {
  clearDisplay();
  clearData();
  logs();
});

// backspace button
backBtn.addEventListener("click", () => {
  backspace();
  logs();
});

// equals button
equalsBtn.addEventListener("click", () => {
  if (
    display.innerHTML === "" ||
    lastIsOperator() ||
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
  logs();
});

// swap button
swapBtn.addEventListener("click", e => {
  if (display.innerHTML == "" || display.innerHTML == ".") return;
  if (operators.length == 0) {
    wipe = false;
    let numberToSwap = parseFloat(display.innerHTML);
    display.innerHTML = -numberToSwap;
    logs();
  }
});

// keystroke bindings
document.addEventListener("keydown", e => {
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

window.onload = () => {
  setTimeout(() => {
    calculator.classList.remove("hidden");
  }, 700);
};
