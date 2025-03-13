let expression = '';
let lastResult = 0;
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        
        if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.id === 'clear') {
            clear();
        } else if (button.id === 'del') {
            deleteLast();
        } else if (button.id === 'ans') {
            insertAns();
        } else if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else {
            appendToExpression(value);
        }
        
        updateDisplay();
    });
});

function handleOperator(value) {
    switch(value) {
        case '√':
            handleSquareRoot();
            break;
        case '±':
            toggleSign();
            break;
        case '%':
            convertToPercentage();
            break;
        case 'ENTER':
            calculate();
            break;
        default:
            appendToExpression(value);
    }
}

function appendNumber(num) {
    if (resultDiv.textContent !== '0') {
        clear();
    }
    expression += num;
}

function appendToExpression(value) {
    const operators = ['x', '÷', '+', '-', '%'];
    expression += operators.includes(value) ? ` ${value} ` : value;
}

function calculate() {
    try {
        let expr = expression
            .replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/-/g, '-')
            .replace(/(\d)(\()/g, '$1*$2')
            .replace(/√(\d+)/g, 'Math.sqrt($1)')
            .replace(/(\d+)%/g, '($1/100)');
        
        lastResult = eval(expr);
        resultDiv.textContent = lastResult;
        expressionDiv.textContent = expression + ' =';
        expression = '';
    } catch (error) {
        resultDiv.textContent = 'Error';
        expression = '';
    }
}

function clear() {
    expression = '';
    resultDiv.textContent = '0';
    expressionDiv.textContent = '';
}

function deleteLast() {
    expression = expression.slice(0, -1);
}

function insertAns() {
    expression += lastResult;
}

function toggleSign() {
    const numbers = expression.match(/-?\d+\.?\d*$/);
    if (numbers) {
        const lastNumber = numbers[0];
        expression = expression.slice(0, -lastNumber.length) + 
                     (-parseFloat(lastNumber));
    }
}

function convertToPercentage() {
    const numbers = expression.match(/-?\d+\.?\d*$/);
    if (numbers) {
        const lastNumber = numbers[0];
        expression = expression.slice(0, -lastNumber.length) + 
                    `(${lastNumber}/100)`;
    }
}

function handleSquareRoot() {
    const numbers = expression.match(/-?\d+\.?\d*$/);
    if (numbers) {
        const lastNumber = numbers[0];
        expression = expression.slice(0, -lastNumber.length) + 
                    `√${lastNumber}`;
    }
}

function updateDisplay() {
    expressionDiv.textContent = expression;
}