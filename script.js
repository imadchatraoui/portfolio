let power;
let temp;
let currentValue;
let eraseInput;
let lastOperation;
let clearAll;
let output;
let outputString;
let decimalCount;
let integerCount;
let memory = 0;
let writeDecimals;
let decimalsWritten;
let memoryShown;

window.onload = resetAll();


function resetAll() {
    temp = null;
    currentValue = 0;
    eraseInput = true;
    lastOperation = null;
    clearAll = 0;
    output = null;
    outputString = "";
    decimalCount = 0;
    integerCount = 0;
    writeDecimal = false;
    decimalsWritten = false;
    memoryShown = false;
}

// Array of Shortcuts

const shortcuts = [
    { key: " ", button: "btnOn" },
    { key: "Escape", button: "btnOff" },
    { key: "1", button: "btn1" },
    { key: "2", button: "btn2" },
    { key: "3", button: "btn3" },
    { key: "4", button: "btn4" },
    { key: "5", button: "btn5" },
    { key: "6", button: "btn6" },
    { key: "7", button: "btn7" },
    { key: "8", button: "btn8" },
    { key: "9", button: "btn9" },
    { key: "0", button: "btn0" },
    { key: ".", button: "btnDot" },
    { key: ",", button: "btnDot" },
    { key: "+", button: "btnPlus" },
    { key: "-", button: "btnMinus" },
    { key: "*", button: "btnX" },
    { key: "/", button: "btnDivide" },
    { key: "Enter", button: "btnEqual" },
    { key: "%", button: "btnPercent" },
    { key: "Control", button: "btnPlusMinus" },
    { key: "V", button: "btnRoot" },
    { key: "v", button: "btnRoot" },
    { key: "S", button: "btnSquare" },
    { key: "s", button: "btnSquare" },
    { key: "I", button: "btnFactorial" },
    { key: "i", button: "btnFactorial" },
    { key: "M", button: "btnMPlus" },
    { key: "m", button: "btnMPlus" },
    { key: "R", button: "btnRM" },
    { key: "r", button: "btnRM" },
    
];

// Disable default keyboard functions

addEvent(window, 'keydown', function( e ){
    e.preventDefault();
});

function addEvent( el, evt, fn, capture ){
    if( el.addEventListener ){
      el.addEventListener( evt, fn, capture )  
    } 
    else if( el.attachEvent ){
      el.attachEvent('on' + evt, fn );
    } 
    else {
      el['on' + evt] = fn; 
    }  
  }

// Takes keypress and activates according buttom

window.addEventListener("keydown", function(e) {
    function connect(shortcut) { return shortcut.key == e.key; }
    var result = shortcuts.find(connect);
    document.getElementById(result.button).className = 'active';
    document.getElementById(result.button).click();
}, false);

window.addEventListener("keyup", function(e) {
    function connect(shortcut) { return shortcut.key == e.key; }
    var result = shortcuts.find(connect);
    document.getElementById(result.button).className = '';
}, false);

// Output elements

display = document.getElementById("display");

sign = document.getElementById("sign");

dot = document.getElementById("dot");

memorySymbol = document.getElementById("memory");

// Buttons Event Listeners

btn1.addEventListener("click", function() {
    writeNumber(1);
});

btn2.addEventListener("click", function() {
    writeNumber(2);
});

btn3.addEventListener("click", function() {
    writeNumber(3);
});

btn4.addEventListener("click", function() {
    writeNumber(4);
});

btn5.addEventListener("click", function() {
    writeNumber(5);
});

btn6.addEventListener("click", function() {
    writeNumber(6);
});

btn7.addEventListener("click", function() {
    writeNumber(7);
});

btn8.addEventListener("click", function() {
    writeNumber(8);
});

btn9.addEventListener("click", function() {
    writeNumber(9);
});

btn0.addEventListener("click", function() {
    writeNumber(0);
});

btnDot.addEventListener("click", function() {
    writeNumber(".");
});

btnOn.addEventListener("click", function() {
    operationOn()
});

btnOff.addEventListener("click", function() {
    operationOff()
});

btnPlus.addEventListener("click", function() {
    operationAdd()
});

btnMinus.addEventListener("click", function() {
    operationSub()
});

btnX.addEventListener("click", function() {
    operationMul()
});

btnDivide.addEventListener("click", function() {
    operationDiv()
});

btnRoot.addEventListener("click", function() {
    operationRoot()
});

btnSquare.addEventListener("click", function() {
    operationSquare()
});

btnFactorial.addEventListener("click", function() {
    operationFactorial()
});

btnPlusMinus.addEventListener("click", function() {
    operationPlusMinus()
});

btnPercent.addEventListener("click", function() {
    operationPercent()
})

btnMPlus.addEventListener("click", function() {
    operationMPlus()
})

btnRM.addEventListener("click", function() {
    operationRM()
})

btnEqual.addEventListener("click", function() {
    equals("result")
});

// Slow calculation delay effect

function blink() {
    display.style.opacity = 0;
    sign.style.opacity = 0;
    dot.style.opacity = 0;
    memorySymbol.style.opacity = 0;
    setTimeout(() => {
        display.style.opacity = 1;
        sign.style.opacity = 1;
        dot.style.opacity = 1;
        if (memory != 0) {
            memorySymbol.style.opacity = 1;
        }
    }, 300);
}

// Functions

function writeNumber(num) {
    blink();
    clearAll = 1;
    memoryShown = false;
    if (power) {
        if (num == "." && !decimalsWritten) {
            writeDecimals = true;
        } else {
            if (writeDecimals) {
                if (display.textContent == "0" || eraseInput == true) {
                    sign.textContent = "";
                    display.textContent = "0." + num;
                    eraseInput = false;
                } else if (display.textContent.length < 8) {
                    display.textContent = display.textContent + "." + num;
                }
                writeDecimals = false;
                displayToOutput();
                outputToDisplay();
                decimalsWritten = true;
            } else {
                if (display.textContent == "0" || eraseInput == true) {
                    sign.textContent = "";
                    output = parseFloat(num);
                    eraseInput = false; 
                } else if (display.textContent.length < 8) {
                    let temp = output.toString() + num.toString();
                    output = parseFloat(temp);
                    
                }
                outputToDisplay();
            }
        }
    }
}

function operationOn() {
    blink();
    power = true;
    display.textContent = "0";
    decimalsWritten = false;
    memoryShown = false;
    sign.textContent = "";
    dot.textContent = ".";
    output = 0;
    clearAll++;
    if (memory != 0) {
        memorySymbol.style.opacity = 1;
    }
    if (clearAll == 3) {
        resetAll();
        blink();
        display.textContent = "0";
        dot.textContent = ".";
    }
}

function operationOff() {
    resetAll();
    display.textContent = "";
    sign.textContent = "";
    dot.textContent = "";
    memorySymbol.style.opacity = 0;
    power = false;
}

function calculate(operation) {
    blink();

    clearAll = 1;
    memoryShown = false;

    if (temp === null) {
        temp = output;                   //
        lastOperation = operation;
        eraseInput = true;
    } else {
        equals(operation)
    }
    outputToDisplay;
}

function outputToDisplay() {
    
    if (output < 0) {
        sign.textContent = "–";
    } else {
        sign.textContent = "";
    }

    outputString = Math.abs(output).toString();
   
    if (outputString.indexOf(".") <= 0) {
        integerCount = outputString.length;
        decimalCount = 0;
        dot.textContent = ".";
    } else {
        integerCount = outputString.indexOf(".");
        outputString = outputString.replace('.', '').slice(0, 8);
        decimalCount = outputString.length - integerCount;
        dot.textContent = ".";
        for (let i = 0; i < decimalCount; i++) {
            dot.textContent += String.fromCharCode(160);
        }
    }

    if (integerCount > 8 || isNaN(output) || output > 99999999 ) {
        resetAll();
        sign.textContent = "";
        dot.textContent = "";
        display.textContent = "ERR";
    } else {
        display.textContent = outputString;
    }
}

function displayToOutput() {
    output = parseFloat(display.textContent);
    if (sign.textContent == "–") {
        output = Math.abs(output) * -1;
    }
    
}

function operationAdd() {
    if(power) {
        calculate("add")
    }
}

function operationSub() {
    if(power) {
        calculate("sub")
    }
}

function operationMul() {
    if(power) {
        calculate("mul")
    }
}

function operationDiv() {
    if(power) {
        calculate("div")
    }
}

function operationRoot() {
    blink();
    if(power) {
        memoryShown = false;
        output = Math.sqrt(output);
        outputToDisplay();
    }
}

function operationSquare() {
    blink();
    if(power) {
        memoryShown = false;
        output = output ** 2;
        outputToDisplay();
    }
}

function operationFactorial() {
    blink();
    if(power) {
        memoryShown = false;
        output = 1 / output;
        outputToDisplay();
    }
}

function operationPlusMinus() {
    blink();
    if(power) {
        memoryShown = false;
        output = output * (-1);
        outputToDisplay();
    }
}

function operationPercent() {
    blink();
    if(power) {
        memoryShown = false;
        if (lastOperation == "add" ||
            lastOperation == "sub") {
                calculate("pro");
        } else if (lastOperation == "mul" ||
                   lastOperation == "div") {
            output = output / 100;
            outputToDisplay();
        }
    }
}

function operationMPlus() {
    blink();
    if(power) {
        memoryShown = false;
        memory += output;
        memorySymbol.style.opacity = 1;
        eraseInput = true;
    }
}

function operationRM() {
    blink();
    if(power) {
        if (memoryShown) {
            memory = 0;
            memoryShown = false;
            memorySymbol.style.opacity = 0;
            eraseInput = true;
        } else if (memory != 0) {
            output = memory;
            outputToDisplay();
            memoryShown = true;
            eraseInput = true;
        }
    }
}



function equals(operation) {
    blink();
    if (power) {
        clearAll = 1;
        memoryShown = false;

        currentValue = output;          
        eraseInput = true;

        switch (lastOperation) {
            case "add":
                if (operation == "pro") {
                    output = temp + (temp * output / 100);
                    break;
                } else {
                    output = temp + output;
                    break;
                }
            
            case "sub":
                if (operation == "pro") {
                    output = temp - (temp * output / 100);
                    break;
                } else {
                    output = temp - output;
                    break;
                }

            case "mul":
                output = temp * output;
                break;

            case "div":
                output = temp / output;
                break;
        }

        if (operation == "result") {
            blink();
            lastOperation = null;
            temp = null;
        } else {
            lastOperation = operation;
            temp = output;              
        }

        outputToDisplay();
    }
}
