let prevNumber = ''
let calculationOperator = ''
let currentNumber = ''
const calculationList = []

//mengambil element class calculator-screen
const calculatorScreen = document.querySelector('.calculator-screen')

const calculationScreen = document.querySelector('.calculation-screen')

//mengambil semua element class operator
const operators = document.querySelectorAll(".operator")

//mengambil semua element class number
const numbers = document.querySelectorAll(".number")

//mengambil element class equal-sign
const equalSign = document.querySelector('.equal-sign')

const clearBtn = document.querySelector('.all-clear')

const decimal = document.querySelector('.decimal')

const percentage = document.querySelector('.percentage')

const empty = (list) =>{
    list.length = 0;
}

//update nilai pada tag input
const updateScreen = (number) => {
    calculatorScreen.value = number
    calculationScreen.value = calculationList.join('')
}

//memasukkan value yang diinput ke variabel currentNumber
const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number
    } else {
        currentNumber += number
    }
}

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        //memindahkan data pada currentNumber ke prevNumber
        prevNumber = currentNumber
        calculationList.push(currentNumber);
        if (operator === "*") {
            calculationList.push("\u00d7")
        } else if(operator === "*"){
            calculationList.push("\u00f7")
        }else{
            calculationList.push(operator)
        }
    }
    //menyimpan value operator ke calculationOperator
    calculationOperator = operator
    //mengosongkan variabel currentNumber
    currentNumber = ''
}

inputDecimal = (dot) => {
    if (currentNumber.includes('.')) {
        return
    }
    currentNumber += dot
}

const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
    empty(calculationList)
}

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)  
    })
})

//mengambil element class number satu persatu
numbers.forEach((number)=>{
    // membaca event ketika tombol ditekan
    number.addEventListener("click",(event)=> {
        //menjalankan function input number
        inputNumber(event.target.value);
        //update nilai pada tag input
        updateScreen(currentNumber)
    })
})

equalSign.addEventListener('click', () => {
    calculate()
    updateScreen(currentNumber)
    empty(calculationList)
    console.log(currentNumber)
})

clearBtn.addEventListener('click', () => {
    clearAll()
    updateScreen(currentNumber)
})

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

percentage.addEventListener('click', () => {
    if (currentNumber !== '') {
        calculationList.push(currentNumber,"%")
        result = parseFloat(currentNumber) / 100
        currentNumber = result
        updateScreen(currentNumber)
        empty(calculationList)
    }
    console.log(currentNumber)
})

const calculate = () => {
    let result = ''
    switch (calculationOperator) {
        case "+":
            // convert string to float and save to result
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber)
            break
        case "*":
            result = parseFloat(prevNumber) * parseFloat(currentNumber)
            break
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber)
            break
        default:
            return 
    }
    calculationList.push(currentNumber)
    currentNumber = result
    calculationOperator = ''
}