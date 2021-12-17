// var math = require('mathjs');

// import { sqrt } from 'mathjs'

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
let grey = "rgb(0, 0, 0)";

let errormsg = "too many operators my feeble mind cannot keep up";


// TOP told me to do this, I don't see why
const add = function(a, b) {
    return a+b;
}

const subtract = function(a, b) {
    return a-b;
}

const multiply = function(a, b) {

    // this works
    console.log("from multiply: "+Number.parseFloat(a).toPrecision(2)*Number.parseFloat(b).toPrecision(2));
    return Number.parseFloat(a).toPrecision(2)*Number.parseFloat(b).toPrecision(2);

}

const divide= function(a, b) {
    return a/b;
}


// input: digit of button or result
// output: color coded span
let list_of_dots = []
const makeSpans = function(number) {
    let dot = document.createElement("span");
    list_of_dots.push(dot);
    winh = window.screen.availHeight;
    winw = window.screen.width;



    // for random placement all over background
    let x = Math.floor(Math.random()*(winh-200)+0);
//    y = Math.floor(Math.random()*(1400-100)-100);
    let y = 0;
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

// deletes all spans and clears the list
function removeSpans() {

    list_of_dots.forEach(d => d.remove());
    list_of_dots = [];
}

function clearEL() {

    removeSpans();
    stored = [];
    textbox.value = "";

}

function plusEL() {
    if (stored.length == 3 && stored[0] != "-") {
        enter();
    } else if (stored.length == 0){
        return;
    } else {
    stored.push("+");
    textbox.value += "+";
    }
}

function subtractEL() {
    if (stored.length == 3 && stored[0] != "-") {
        enter();
   
    }else {
    stored.push("-");
    textbox.value += "-";
    }
}

function multiplyEL() {
    if (stored.length == 3) {
        enter();
    } else if (stored.length == 0){
        return;
    } else {
    stored.push("*");
    textbox.value += "*";
    }
}

function divideEL() {
    if (stored.length == 3) {
        enter();
    } else if (stored.length == 0){
        return;   
    } else {

    stored.push("/");
    textbox.value += "/";
    }
}

const operate = function(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b).toFixed(2);
        case "-":
            return subtract((a).toPrecision(2), (b).toPrecision(2)).toPrecision(2);
        case "*":
            return Number.parseFloat(a).toPrecision(2)*Number.parseFloat(b).toPrecision(2);
        case "/":
            console.log("a: "+a);
            console.log("b: "+b);        
            return parseFloat(divide(a, b).toPrecision(2));
    }
}

const enter = function() {
    removeSpans();

    result = operate(stored[1], Number.parseFloat(stored[0]).toPrecision(2), Number.parseFloat(stored[2]).toPrecision(2));
    console.log("prelim res "+ result);

    textbox.value = result;

    stored = [];
    stored[0] = result;

    String(result).split("").map((x) => makeSpans(x));

}

const enterNegative = function() {
    result = operate(stored[1], parseFloat(stored[0]), parseFloat(stored[2]));

    textbox.value = result;

    stored = [];
    // stored[0] = "-";
    stored[1] = result;

    String(result).split("").map((x) => makeSpans(x));
}


function enterEventListener() {
    removeSpans();
    console.log(stored);
    // processing negative numbers
    for (let i = 0; i < stored.length; i++) {
        if (i == 0) {
            if (stored[0] == "-" && !isNaN(parseInt(stored[1]))) {
                stored[1] = stored[0] + stored[1];
                stored.shift();
                console.log(stored);

            }
        }

        if (i >= 2) {
            if (stored[i - 1] == "-" && isNaN(parseInt(stored[i - 2]))) {
                stored[i] = "-" + stored[i];
                stored.splice(i - 1, 1);
                console.log(stored);

            }

        }
    }
    // brace yourself
    switch (stored.length) {
        case 0:
            stored = [];
            textbox.value = [];
            break;
        case 1:
            if (stored.length == 0 || list_of_operators.includes(stored[0])) {
                stored = [];
                textbox.value = "";
            }

            break;

        case 2:
            if ((typeof (parseInt(stored[0])) == "number") && ((stored[1] == "+") || (stored[1] == "-") || (stored[1] == "*") || (stored[1] == "/"))) {
                // number and operator case
                let result = operate(stored[1], parseFloat(stored[0]), parseFloat(stored[0]));
                textbox.value = result;
                stored.push(result);
                makeSpans(result);
                break;
            }

        case 4:
            if (stored[1] == "+" && stored[2] == "-") {
                stored[1] = stored[2];
                stored[2] = stored[3];
                stored.pop();
                enter();

            } else if (stored[1] == "-" && stored[2] == "-") {
                stored[1] = "+";
                stored[2] = stored[3];
                stored.pop();
                console.log("stored: " + stored);
                enter();

            } else if ((stored[1] == "*" || stored[1] == "/") && stored[2] == "-") {

                stored[2] = stored[3];
                stored.pop();
                console.log("stored: " + stored);
                enterNegative();

            } else if (stored[0] = "-" && !isNaN(parseInt(stored[1])) && list_of_operators.includes(stored[2]) && !isNaN(parseInt(stored[3]))) {
                stored[0] = stored[1];
                stored[1] = stored[2];
                stored[2] = stored[3];

                enterNegative();

            } else {

                stored = [];
                textbox.value = errormsg;
            }
            break;

        case 5:
            if (stored[0] == "-" && stored[3] == "-" && (stored[2] == "+" || stored[2] == "-")) {
                console.log("here");

                stored[0] = "-" + stored[1];
                stored[1] = stored[2];
                stored[2] = "-" + stored[4];
                stored.pop();
                stored.pop();
                console.log("stored: " + stored);
                enter();
            }
            if (stored[0] == "-" && stored[3] == "-" && (stored[2] == "*" || stored[2] == "/")) {

                stored[0] = stored[1];
                stored[1] = stored[2];
                stored[2] = stored[4];
                stored.pop();
                stored.pop();
                console.log("stored: " + stored);
                enter();
            }
            break;
        default:
            enter();

            // this doesn't
            console.log(result);

    }




}

const backspaceEventListener = function() {
    if (textbox.value == errormsg) {
        textbox.value = "";
        stored = [];
    }
    if (stored) {
        stored[stored.length - 1] = (stored.at(-1) / 10 | 0);
        if (stored[stored.length - 1] == 0) {
            stored.pop();
        }
        textbox.value = textbox.value.slice(0, -1);
        if (list_of_dots.length) {
        list_of_dots.at(-1).remove();
        list_of_dots.pop();
        }
    }
}

let keyName;
let list_of_keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "/", "*"];
let list_of_operators = ["+", "-", "*", "/"];
let list_of_operators_EL = [plusEL, subtractEL, multiplyEL, divideEL];
var list_of_nums = list_of_keys.filter(f => !list_of_operators.includes(f));

document.addEventListener('keydown', (event) => {
    // prevents double characters entered
    if (event.target === textbox) {
        return;
    }
    keyName = event.key;
    if (keyName == "Enter") {
        enterEventListener();
    }

    else if (keyName == "Backspace") {
        backspaceEventListener();
    }
    
    else if (list_of_operators.includes(keyName)) {
        list_of_operators_EL[list_of_operators.indexOf(keyName)]();
    }

    else if (list_of_nums.includes(keyName)) {
        if (stored.length == 0) {
            stored.push(keyName);
        } else {

            if (isNaN(parseInt(stored[stored.length-1]))) {
                stored.push(keyName);
            } else {
                stored[stored.length-1] += keyName;
            }
        }

        makeSpans(keyName);
        textbox.value += keyName;
        
    }
});

// makes the front end
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

// takes a list of button labels and makes the buttons
function makeButtonsFromList (list, divs, buttons, colors) {
    for (let i = 0; i < list.length; i++) {
        buttons[i] = document.createElement("button");
        buttons[i].id = "x"+list[i];
        buttons[i].textContent = list[i];
        buttons[i].style.border = "solid 5px black";
        buttons[i].style.backgroundColor = colors[i];
        divs[i] = document.createElement("div");
        divs[i].id = "x"+list[i];
        divs[i].appendChild(buttons[i]);
        maindiv.appendChild(divs[i])


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

                makeSpans(list[i]);
                textbox.value += list[i];
                });
    }
    }
}

makeButtonsFromList(list, divs, buttons, colors);

// need to rename this manually because no element name can start with a /
divs[16].id = "slash";



