let red = "#830509";
let orange = "#b03500";
let yellow = "#b89602";
let green1 = "#858f00";
let green2 = "#027402";
let blue1 = "#00818f";
let blue2 = "#004f8f";
let blue3 = "#0913a1";
let purple = "#460354";
let white = "#ffffff";
// let grey = "rgb(83, 81, 81)";
let grey = "rgb(0, 0, 0)";



const add = function(a, b) {
    return a+b;
}

const subtract = function(a, b) {
    return a-b;
}

const multiply = function(a, b) {
    return a*b;
}

const divide= function(a, b) {
    return a/b;
}

const makeDots = function(number) {
    let dot = document.createElement("span");
    winh = window.screen.height;
    winw = window.screen.width;
    x = Math.floor(Math.random()*(winh+0)+0);
    y = Math.floor(Math.random()*(1400-100)-100);
    dot.style.bottom = x+"px";
    dot.style.left = y+"px";
    switch (parseInt(number)) {
        case 1:
            dot.style.backgroundColor = red;
            break;
        case 2: 
            dot.style.backgroundColor = orange;
            break;
        case 3: 
            dot.style.backgroundColor = yellow;
            break;
        case 4: 
            dot.style.backgroundColor = green1;
            break;
        case 5: 
            dot.style.backgroundColor = green2;
            break;
        case 6: 
            dot.style.backgroundColor = blue1;
            break;
        case 7: 
            dot.style.backgroundColor = blue2;
            break;
        case 8: 
            dot.style.backgroundColor = blue3;
            break;
        case 9: 
            dot.style.backgroundColor = purple;
            break;
        case 0:
            dot.style.backgroundColor = white;
            break;

        }
        document.body.append(dot);

}


function clearEL() {
    let spans = document.querySelectorAll("span");
                spans.forEach((x) => x.remove());

                stored = [];
                textbox.value = "";

}

function plusEL() {
    if (stored.length == 3) {
        enter();
    } else {
    stored.push("+");
    textbox.value += "+";
    }
}

function subtractEL() {
    if (stored.length == 3) {
        enter();
    } else {
    stored.push("-");
    textbox.value += "-";
    }
}

function multiplyEL() {
    if (stored.length == 3) {
        enter();
    } else {
    stored.push("*");
    textbox.value += "*";
    }
}

function divideEL() {
    if (stored.length == 3) {
        enter();
    } else {

    stored.push("/");
    textbox.value += "/";
    }
}

const operate = function(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

const enter = function() {
    result = operate(stored[1], parseInt(stored[0]), parseInt(stored[2]));

    textbox.value = result;

    stored = [];
    stored[0] = result;

    String(result).split("").map((x) => makeDots(x));
//    let spans = document.querySelectorAll("span");
//    spans.forEach(
//        function(x) {
//            x.classList.add("fun");
//        });
}

const enterEventListener = function(){
    switch(stored.length) {
        case 1:
            if (stored[0] == "+" || stored[0] == "-" || stored[0] == "/" || stored[0] == "*") {
                stored = [];
                textbox.value = "";
            }

            break;
        
        case 2:
            if ((typeof(parseInt(stored[0])) == "number") && ((stored[1] == "+") || (stored[1] == "-") || (stored[1] == "*") || (stored[1] == "/"))) 
                // number and operator case
                
                textbox.value = operate(stored[1], parseInt(stored[0]), parseInt(stored[0]));
            break;
        
        default:
            enter();

    }

};

const backspaceEventListener = function() {
    if (stored) {

        stored[stored.length - 1] = (stored.at(-1) / 10 | 0);
        if (stored[stored.length - 1] == 0) {
            stored.pop();
        }
        textbox.value = textbox.value.slice(0, -1);
    }
}

let keyName;
let list_of_keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "/", "*"];
let list_of_operators = ["+", "-", "*", "/"];
var list_of_nums = list_of_keys.filter(f => !list_of_operators.includes(f));

document.addEventListener('keydown', (event) => {
    keyName = event.key;
    if (keyName == "Enter") {
        enterEventListener();
    }

    if (keyName == "Backspace") {
        backspaceEventListener();
    }

    if (list_of_keys.includes(keyName)){
        if (stored.length == 0 || list_of_operators.includes(keyName)) {
            stored.push(keyName);
        } else {
    
            if (list_of_operators.includes(stored[stored.length-1])) {
                stored.push(keyName);

            } else {
                stored[stored.length-1] += keyName;
            }
        }
        makeDots(keyName);
        textbox.value += keyName;
    }
    
});


let maindiv = document.createElement("div");
maindiv.id = "main";
document.body.append(maindiv);

let textboxdiv = document.createElement("div");
textboxdiv.id = "textbox";
let textbox = document.createElement("input");
textboxdiv.append(textbox);
maindiv.appendChild(textboxdiv);

let buttons = [];
let divs = [];
let list = ["Clear", "Backspace", "Enter", "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", "/"];

let colors = [grey, grey, grey, red, orange, yellow, grey, green1, green2, blue1, grey, blue2, blue3, purple, grey, white, grey];

let stored = [];
let result = 0;

function makeButtonsFromList (list, divs, buttons, colors) {
    for (let i = 0; i < list.length; i++) {
        buttons[i] = document.createElement("button");
        buttons[i].id = "x"+list[i];
        buttons[i].textContent = list[i];
        buttons[i].style.border = "solid 5px"+colors[i];
        buttons[i].style.backgroundColor = "rgb(0, 0, 0)";
        divs[i] = document.createElement("div");
        divs[i].id = "x"+list[i];
        divs[i].appendChild(buttons[i]);
        maindiv.appendChild(divs[i]);


        if (list[i] === "Clear"){
            buttons[i].addEventListener("click", clearEL);
        } 

        else if (list[i] == "Enter"){
            buttons[i].addEventListener("click", enterEventListener); 

        } 

        else if (list[i] == "Backspace"){
            buttons[i].addEventListener("click", backspaceEventListener)
        }

        else if (list[i] == "+") {
            buttons[i].addEventListener("click", plusEL)
        }

        else if (list[i] == "-") {
            buttons[i].addEventListener("click", subtractEL);
        }

        else if (list[i] == "*") {
            buttons[i].addEventListener("click", multiplyEL);
        }

        else if (list[i] == "/") {
            buttons[i].addEventListener("click", divideEL);
        }

        else {
            buttons[i].addEventListener("click", function(){
                if (stored.length == 0) {
                    stored.push(list[i]);
                } else {

                    if (isNaN(parseInt(stored[stored.length-1]))) {
                        stored.push(list[i]);
                    } else {
                        stored[stored.length-1] += list[i];
                    }
                }
                console.log("stored: "+stored);

                makeDots(list[i]);
                textbox.value += list[i];
                });
    }
    }
}

makeButtonsFromList(list, divs, buttons, colors);

divs[16].id = "slash";



