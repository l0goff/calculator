/* 
TODO: 
- add key listener events
- find a good rounding function
- beautify/uglify calculator via css, possible use images for button symbols?

*/


let currNo = "0"; 
let lastVal ="";
let total = "0";
let op = "";

function evalButtons(button) {
    let btnVal = button.split("btn").pop();  

    // operator is pressed
    if (btnVal == "Sum" || btnVal == "Sub" || btnVal == "Mult" || btnVal == "Div" ) {        
        console.log("2) Operator pressed: btnVal: "+btnVal+", last OP: "+op+" and currNo: "+currNo); 

        // check if last button was also an operator; if yes, just update operator
        if (lastVal == "Sum" || lastVal == "Sub" || lastVal == "Mult" || lastVal == "Div" ) {  
            console.log("operator called two times in sequence, updating operator: "+btnVal);  
        }           
        
        // no total, only currNo
        if (total == "0" && currNo != "0") {
            total = currNo;
            currNo = "0";
            updateScreen(total);        
        }        
        // 2 numbers
        else if (total != "0" && currNo != "0") {              
            if (!op) {
                total = currNo;                 
            }  
            else {                   
                total = calculate(op, total, currNo); 
            }
            currNo = "0";
            updateScreen(total); 
        }        
        else { // should not happen
            console.log("=> ERROR? currNo: "+currNo+", total: "+total+", op: "+op+", and lastVal: "+lastVal);
        }
        // store current operator in op for next calculation
        op = btnVal;
    }
    // backspace (digit/decimal dot)
    else if (btnVal == "Del") {
        // if an operator or "=" was pressed as last button before backspace, do nothing;
       if ((lastVal != "Eq" ) &&  (lastVal != "Sum" && lastVal != "Sub" && lastVal != "Mult" && lastVal != "Div")) {
            backSpace(currNo);
        }
    }
  
    // clr -> reset calculator
    else if (btnVal == "Clr") {
        clearScreen();
    }
    // "=" -> perform final calculation 
    else if (btnVal == "Eq") {
        // pressing "=" multiple times should have not effect
        if (lastVal != "Eq") {
            // if only one number was entered and no operator, display current number as total
            if (op == "") {
                total = currNo;
            }    
            // calculate final result    
            else {
                total = calculate(op, total, currNo);
            }
            // reset variables
            op = "";
            lastVal = "";
            currNo = "0"; 
            updateScreen(total);  
        }
    }
    // if digit or decimal dot, add to current number (dot only once)
    else {
        if ((btnVal == "Dec") && (!currNo.includes("."))) { 
            addToNumber(".");
        }
        else if (btnVal != "Dec") {
            addToNumber(btnVal);
        }
        updateScreen(currNo);           
    }
    // store current value in "lastVal" for future comparisons
    lastVal = btnVal;
}


function backSpace(num) {
    if ((num.length > 0) && (num != "0")) {
        num = num.substring(0, num.length-1);
        if (num == "") {
            num = "0";
        }
        currNo = num;
        updateScreen(currNo); 
    }
}

// TODO: round number to fifth decimal <= THIS COULD BE MUCH BETTER!
function fixNumber(num) {    
    return num;
    //return String(Math.round(num * 100) / 100000);    
}

// TODO: Add Key listeners!


//  calculator functions
function calculate (operator, a, b) {    
    let dig1 = Number(a);
    let dig2 = Number(b); 
    if (operator == "Sum") {     
        return String(dig1 + dig2);
    }
    else if (operator == "Sub") {
        return String(dig1 - dig2);
    }
    else if (operator == "Mult") {
        return String(fixNumber(dig1 * dig2));
    }
    else if (operator == "Div") {
        if( dig2 == 0) {
            return("Chuck Norris can divide by zero... you can't.");
        }
        return String(fixNumber(dig1 / dig2));
    }   
    else {  // should not happen
        console.log("ERROR in calculate()); op: "+operator+", dig1: "+dig1+", dig2: "+dig2);
        return ("o_O");
    }
}

// construct number string
function addToNumber(valStrg) {      
    if (currNo == "0") {            
       if (valStrg == "."){
            currNo = "0.";
        }
        else {
            currNo = valStrg;
        }
    }
    else {
        currNo = currNo.concat(valStrg);
    }
    valStrg = lastVal;
}

// update HTML page
function updateScreen(value) {
    let screen = document.getElementById("screen");
    screen.innerText = value;
}

// reset HTML "screen" and variables
function clearScreen() {
    let screen = document.getElementById("screen");
    screen.innerText = "ready...";
    currNo = "0"; 
    lastVal ="";
    total = "0";
    op = "";
}

// change color of pressed calculator button
function changeColor(event) {
    // only perform calculator functions on actual click
    if (event.type == "mousedown") {
        evalButtons(event.target.id);
    }  
    // change colors     
    if (event.target.className == "btndark") {
        event.target.setAttribute("class", "btnlight");        
    }
    else if (event.target.className == "opcolsdark") {
        event.target.setAttribute("class", "opcolslight");
    }
    else if (event.target.className == "opcolslight") {
        event.target.setAttribute("class", "opcolsdark");
    }
    else {
        event.target.setAttribute("class", "btndark");
    }
}

// leaving the calc button with mouse button pressed: reset calc button color
function resetColor(event){   
    if (event.target.id == "btnSum" || event.target.id == "btnSub" ||event.target.id == "btnMult" ||event.target.id == "btnDiv"){
        event.target.setAttribute("class", "opcolslight");
    }
    else {
        event.target.setAttribute("class", "btnlight"); 
    }
}


// calculator buttons
let btn1 = document.getElementById("btn1");
btn1.addEventListener("mousedown", changeColor);
btn1.addEventListener("mouseup", changeColor);
btn1.addEventListener("mouseout", resetColor);

let btn2 = document.getElementById("btn2");
btn2.addEventListener("mousedown", changeColor);
btn2.addEventListener("mouseup", changeColor);
btn2.addEventListener("mouseout", resetColor);

let btn3 = document.getElementById("btn3");
btn3.addEventListener("mousedown", changeColor);
btn3.addEventListener("mouseup", changeColor);
btn3.addEventListener("mouseout", resetColor);

let btn4 = document.getElementById("btn4");
btn4.addEventListener("mousedown", changeColor);
btn4.addEventListener("mouseup", changeColor);
btn4.addEventListener("mouseout", resetColor);

let btn5 = document.getElementById("btn5");
btn5.addEventListener("mousedown", changeColor);
btn5.addEventListener("mouseup", changeColor);
btn5.addEventListener("mouseout", resetColor);

let btn6 = document.getElementById("btn6");
btn6.addEventListener("mousedown", changeColor);
btn6.addEventListener("mouseup", changeColor);
btn6.addEventListener("mouseout", resetColor);

let btn7 = document.getElementById("btn7");
btn7.addEventListener("mousedown", changeColor);
btn7.addEventListener("mouseup", changeColor);
btn7.addEventListener("mouseout", resetColor);

let btn8 = document.getElementById("btn8");
btn8.addEventListener("mousedown", changeColor);
btn8.addEventListener("mouseup", changeColor);
btn8.addEventListener("mouseout", resetColor);

let btn9 = document.getElementById("btn9");
btn9.addEventListener("mousedown", changeColor);
btn9.addEventListener("mouseup", changeColor);
btn9.addEventListener("mouseout", resetColor);

let btn0 = document.getElementById("btn0");
btn0.addEventListener("mousedown", changeColor);
btn0.addEventListener("mouseup", changeColor);
btn0.addEventListener("mouseout", resetColor);

let btnEq = document.getElementById("btnEq");
btnEq.addEventListener("mousedown", changeColor);
btnEq.addEventListener("mouseup", changeColor);
btnEq.addEventListener("mouseout", resetColor);

let btnClr = document.getElementById("btnClr");
btnClr.addEventListener("mousedown", changeColor);
btnClr.addEventListener("mouseup", changeColor);
btnClr.addEventListener("mouseout", resetColor);

let btnSum = document.getElementById("btnSum");
btnSum.addEventListener("mousedown", changeColor);
btnSum.addEventListener("mouseup", changeColor);
btnSum.addEventListener("mouseout", resetColor);

let btnSub = document.getElementById("btnSub");
btnSub.addEventListener("mousedown", changeColor);
btnSub.addEventListener("mouseup", changeColor);
btnSub.addEventListener("mouseout", resetColor);

let btnMult = document.getElementById("btnMult");
btnMult.addEventListener("mousedown", changeColor);
btnMult.addEventListener("mouseup", changeColor);
btnMult.addEventListener("mouseout", resetColor);

let btnDiv = document.getElementById("btnDiv");
btnDiv.addEventListener("mousedown", changeColor);
btnDiv.addEventListener("mouseup", changeColor);
btnDiv.addEventListener("mouseout", resetColor);

let btnDec = document.getElementById("btnDec");
btnDec.addEventListener("mousedown", changeColor);
btnDec.addEventListener("mouseup", changeColor);
btnDec.addEventListener("mouseout", resetColor);

let btnDel = document.getElementById("btnDel");
btnDel.addEventListener("mousedown", changeColor);
btnDel.addEventListener("mouseup", changeColor);
btnDel.addEventListener("mouseout", resetColor);