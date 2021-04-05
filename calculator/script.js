class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    negativeOperation(operation) {
        if (this.currentOperand == '-') return
        if (this.currentOperand === '') {
            this.currentOperand = operation
            this.displayNegative()
        } else {
            this.chooseOperation(operation)
            this.updateDisplay()
        }
    }

    displayNegative() {
        this.currentOperandTextElement.innerText = `${this.currentOperand}`
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            case '^':
                computation = Math.pow(prev, current)
                break
            default:
                return
        }
        this.currentOperand = computation
        if (this.currentOperand.toString().includes('.')) {
            console.log('consist')
            this.currentOperand = computation.toFixed(10).replace(/0*$/, '')
        }
        this.operation = undefined
        this.previousOperand = ''

    }

    computeSqrt() {
        if (this.currentOperand === '') return

        if (this.currentOperand < 0) {
            this.clear()
            this.previousOperandTextElement.innerText = this.previousOperand
            this.currentOperandTextElement.innerText = `Error`
            return
        }

        if (this.previousOperand === '') {
            this.currentOperand = Math.sqrt(this.currentOperand)
            // this.operation = undefined
            this.previousOperand = ''
            this.updateDisplay()
        } else {
            this.currentOperand = Math.sqrt(this.currentOperand)
            this.compute()
            this.updateDisplay()
        }
    }

    getDisplayNumber(number) {
        if (number === '-.'){
            this.currentOperand = '-0.'
            return '-0.'
        }
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('ru', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const operationNegativeButton = document.querySelector('[data-negative]')
const operationSqrtButtons = document.querySelector('[data-operation-sqrt]')
const operationPowerButtons = document.querySelector('[data-operation-power]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

operationNegativeButton.addEventListener('click', button => {
    calculator.negativeOperation(operationNegativeButton.innerText)
    // calculator.updateDisplay()
})

operationSqrtButtons.addEventListener('click', button => {
    calculator.computeSqrt()
})

operationPowerButtons.addEventListener('click', button => {
    calculator.chooseOperation('^')
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    calculator.clear()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})