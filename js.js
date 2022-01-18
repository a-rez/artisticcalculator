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

let errormsg = "Error";




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

function dotEL() {

    stored[stored.length-1] += ".";
    textbox.value += ".";
}

function plusEL() {
    
    if (stored.length == 3 && stored[0] != "-") {
        enter();
    } else if (stored.length == 0){
        return;
    } else {
    stored.push("+");
    }
    
}

function subtractEL() {
    if (stored.length == 3 && stored[0] != "-") {
        enter();
   
    }else {
    stored.push("-");
    }
}

function multiplyEL() {
    if (stored.length == 3) {
        enter();
    } else if (stored.length == 0){
        return;
    } else {
    stored.push("*");
    }
}

function divideEL() {
    if (stored.length == 3) {
        enter();
    } else if (stored.length == 0){
        return;   
    } else {

    stored.push("/");
    }
}

function processInput(keyName) {
    if (keyName == "Enter") {
        enterEventListener();
    }

    else if (keyName == "Backspace") {
        backspaceEventListener();
    }
    else if (keyName == ".") {
        dotEL();
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
    
  }

}

function processTextbox() {
    input = textbox.value;
    stored = [];

    for (let i = 0;i < input.length; i++) {

        processInput(input[i])


    }
}

const operate = function(operator, a, b) {
    switch(operator) {
        case "+":
            return round22(parseFloat(a) + parseFloat(b));
        case "-":
            // return subtract((a).toPrecision(2), (b).toPrecision(2)).toPrecision(2);
            return round22(parseFloat(a) - parseFloat(b));
        case "*":
            // return Number.parseFloat(a).toPrecision(2)*Number.parseFloat(b).toPrecision(2);
            return round22(parseFloat(a)*parseFloat(b));
        case "/":
            return round22(parseFloat(a)/parseFloat(b));
            // return parseFloat(divide(a, b).toPrecision(2));
    }
}


function round22(number) {
    return Math.round(((number+Number.EPSILON)*100))/100;
}

const enter = function() {



    removeSpans();

    

    if (stored.length > 4) {
        textbox.value = errormsg;
        stored = [];
        return;
    }

    result = operate(stored[1], stored[0], stored[2]);

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
    if (stored.length == 1 || stored.length == 0 || stored.length == 2 /*&& list_of_nums.includes(parseInt(stored[0]))*/) {
        return;
    }

    removeSpans();

    // processing negative numbers
    for (let i = 0; i < stored.length; i++) {
        if (i == 0) {
            if (stored[0] == "-" && !isNaN(parseInt(stored[1]))) {
                stored[1] = stored[0] + stored[1];
                stored.shift();

            }
        }

        if (i >= 2) {
            if (stored[i - 1] == "-" && isNaN(parseInt(stored[i - 2]))) {
                stored[i] = "-" + stored[i];
                stored.splice(i - 1, 1);

            }

        }
    }

    enter();
}


const backspaceEventListener = function() {
    if (textbox.value == errormsg) {
        textbox.value = "";
        stored = [];
    }
    if (stored) {
//        stored[stored.length - 1] = (stored.at(-1) / 10 | 0);
        stored[stored.length - 1] = String(stored.at(-1)).slice(0, -1);
        if (stored[stored.length - 1] == 0) {
            stored.pop();
        }
//         textbox.value = textbox.value.slice(0, -1);
        if (list_of_dots.length) {
        list_of_dots.at(-1).remove();
        list_of_dots.pop();
        }
    }
}

// let keyName;
let list_of_keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "/", "*"];
let list_of_operators = ["+", "-", "*", "/"];
let list_of_operators_EL = [plusEL, subtractEL, multiplyEL, divideEL];
var list_of_nums = list_of_keys.filter(f => !list_of_operators.includes(f));


document.addEventListener('keydown', (event) => {
    keyName = event.key;
    // prevents double characters entered
    
    if (event.target === textbox) {
        if (keyName == "Enter") {
            processTextbox();
            enterEventListener();
        }
        return;
    }


    if (keyName == "Enter") {
        enterEventListener();
    }

    else if (keyName == "Backspace") {
        backspaceEventListener();
        textbox.value = textbox.value.slice(0, -1);
        
    }

    else if (keyName == ".") {
        dotEL();
    }

    if (list_of_operators.includes(keyName)) {
        list_of_operators_EL[list_of_operators.indexOf(keyName)]();
        if (stored.length == 1) {
            return;
        }

        textbox.value += keyName;
    }

    else if (list_of_nums.includes(keyName)){

        processInput(keyName);
        textbox.value += keyName;
    }
        
    }
);

// makes the front end
/*
let containdiv = document.createElement("div");
containdiv.id = "container";
document.body.append(containdiv);
*/

let containerdiv = document.createElement('div');
containerdiv.id = "containerdiv"
document.body.append(containerdiv);

let infodiv = document.createElement('div');
infodiv.id = "infodiv"
containerdiv.append(infodiv);

infodiv.innerHTML = "Ways to use this calculator: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<p>1. Your keyboard<p>2. On screen buttons<p>3. Textbox<p>Calculator will only accept one operation at a time.";


let maindiv = document.createElement("div");
maindiv.id = "main";
containerdiv.append(maindiv);

let textboxdiv = document.createElement("div");
textboxdiv.id = "textbox";
let textbox = document.createElement("input");
textbox.addEventListener("keydown", function (e) {
    if (e.key == "Backspace") {
        backspaceEventListener();
        if (list_of_dots.length) {
            list_of_dots.at(-1).remove();
            list_of_dots.pop();
            }
    }

});

textboxdiv.append(textbox);

maindiv.appendChild(textboxdiv);

let buttons = [];
let divs = [];
let list = [".", "Backspace", "Clear", "Enter", "1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", "/"];

let colors = [grey, grey, grey, grey, red, orange, yellow, grey, green1, green2, blue1, grey, blue2, blue3, purple, grey, white, grey];

let stored = [];
let result = 0; 

// takes a list of button labels and makes the buttons
function makeButtonsFromList (list, divs, buttons, colors) {
    for (let i = 0; i < list.length; i++) {
        buttons[i] = document.createElement("button");
        buttons[i].id = "x"+list[i];
        if (list[i] != "Backspace") {
            buttons[i].textContent = list[i];

        }
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
            buttons[i].innerHTML = "Backspace";

            buttons[i].addEventListener("click", function() {
                backspaceEventListener();
                textbox.value = textbox.value.slice(0, -1);
            }
            )

        }

        else if (list[i] == "+") {
            buttons[i].addEventListener("click", function() {
                plusEL();
                if (stored.length == 1) {
                    return;
                }
                textbox.value += "+";
            });
        }

        else if (list[i] == "-") {
            buttons[i].addEventListener("click", function() {
                subtractEL();
                if (stored.length == 1) {
                    return;
                }
                textbox.value += "-";
            });
        }

        else if (list[i] == "*") {
            buttons[i].addEventListener("click", function() {
                multiplyEL();
                if (stored.length == 1) {
                    return;
                }
                textbox.value += "*";
            });
        }

        else if (list[i] == "/") {
            buttons[i].addEventListener("click", function () {
                divideEL();
                if (stored.length == 1) {
                    return;
                }
                textbox.value += "/";
            });
        }

        else if (list[i] == ".") {
            buttons[i].addEventListener("click", function() {
                dotEL();
            })
        }

        else {
            buttons[i].addEventListener("click", function(){
               
                processInput(list[i]);
                textbox.value += list[i];
                
                });
        }
    }
}

makeButtonsFromList(list, divs, buttons, colors);

// need to rename this manually because no element name can start with a /
divs[0].id = "dot";
divs[17].id = "slash";



