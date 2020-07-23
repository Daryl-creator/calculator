/*Create the buttons*/
let calculatorButtons = [
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },,{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];
//array of objects and each object has properties for each button

/* Variables To Select elements*/
const inputElement = document.querySelector(".input");
const outputResultElement = document.querySelector(".result .value");
const outputOperationElement = document.querySelector(".operation .value");

/* Create the calculator functions*/
// Create the rows and columns, 4 rows, each with 4 buttons
function createButtons(){
const buttonsPerRow = 4;// every row has 4 buttons
let addedButtons = 0;

//loop over all the buttons in the calculator
calculatorButtons.forEach(function (button, index) {//forEach button and its index number
    if(addedButtons % buttonsPerRow == 0) {
        inputElement.innerHTML += `<div class="row"></div>`;// using modulus % if remainder is 0 (4 buttons) i/e 4/4, 8/4, 12/4, create a new row
    }

    const row = document.querySelector(".row:last-child");// this selects the last rows, last element i.e the last child

    row.innerHTML += `<button id="${button.name}"> 
                            ${button.symbol}
    </button>`// get the buttons name and assign the symbol in the innerHTML i.e style the button

    addedButtons++ //increment the addedButtons by one to go to the next button for creation/styling
})
}

console.log(createButtons())

/* Target Buttons - Click Event*/
inputElement.addEventListener("click", function (event) {
        const targetButton = event.target; //the .target identifies which button was selected, assign it to targetButton

        calculatorButtons.forEach(function (button) {
            if(button.name == targetButton.id) //check if the button name in object is the same button id you clicked on
            calculator(button);//if it is the button, run this function (button is the object of each button)
        })
})

/*Calculator Data*/
// save each button click into an array
let data = {
    operation : [],
    result : []
}

/* Calculator Functionality*/
//when the user clicks on a button it will call this function
function calculator (button) {//check each button type
    if (button.type == "operator"){//* x + -

        data.operation.push(button.symbol);//push to data.operation array and show the user the symbol of clicked button
        data.result.push(button.formula);
        
    } else if (button.type == "number") {// 0 1 2 3 4 5 6 7 8 9 . %

        data.operation.push(button.symbol);
        data.result.push(button.formula);

    } else if (button.type == "key") {// C or delete
        if (button.name == "clear") {

            data.operation = [];
            data.result = []
            updateOutputResult(0);

        }
        else if (button.name == "delete") {

            data.operation.pop();
            data.result.pop();

        }
        
    } else if (button.type == "calculate") {
        let joinResult = data.result.join('');
        

        let result;

        try{
            result = eval(joinResult)
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "Syntax Error!";
                updateOutputResult(result)
                return;
            }
        }
        
        result = formatResult(result);
        updateOutputResult(result)

        data.operation = [];
            data.result = []

            data.operation.push(result);
            data.result.push(result);

            return;
    }
    updateOutputOperation(data.operation.join(''));// show the user what they have clicked
}

function updateOutputOperation(operation){
    outputOperationElement.innerHTML = operation;
}

function updateOutputResult(result){
    outputResultElement.innerHTML = result;
}

/*format result*/
function formatResult(result) {
const maxOutputNumberLength = 10;
const outputPrecision = 5;

if (digitCounter(result) > maxOutputNumberLength) {
    if(isFloat(result)) {
        const resultInt = parseInt(result);
        const resultIntLength = digitCounter(resultInt);

        if (resultIntLength > maxOutputNumberLength){
            return result.toPrecision(outputPrecision);
        }
        else {
            const numOfDigitsAfterPoint = maxOutputNumberLength - resultIntLength;
            return result.toFixed(numOfDigitsAfterPoint)
        }
    }
    else {
        // if the number is an integer
        return result.toPrecision(outputPrecision);
    }
}
else {
    return result;
}
}

/*digit counter*/
function digitCounter(number){
    return number.toString().length;
}

/*check if the number is a float or integer*/
function isFloat(number) {
    return number % 1 != 0;
}