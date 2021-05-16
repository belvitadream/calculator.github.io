let result = document.querySelector('#result');
const numbers = document.querySelectorAll("[data-number]");
const ac = document.querySelector('.ac');
const del = document.querySelector('.del');
const actionsBtn = document.querySelectorAll("[data-action]");
const equal = document.querySelector('.equal');
const dot = document.querySelector('.dot');

let data = {
    currentValue: undefined,
    action: undefined,
}

function updateData () {
    if (data.action) {
        data.newValue = parseFloat(result.textContent)
    } else {
        data.currentValue = parseFloat(result.textContent)
    }
    console.log(data); 
}

function handleAction (e) {
    console.log(e.target.dataset.action)
    data.action = e.target.dataset.action
    data.newValue = undefined;
    console.log(data);
}

function handleNumber (e) {
    const value = e.target.dataset.number;
    
    if (result.textContent == '0.') {
        result.textContent +=value;
    } else if (result.textContent == 0) {
        result.textContent = value;
    } else {
        if (data.action && !data.newValue) {
            result.textContent = value;
            data.newValue = value
        } else {
            result.textContent +=value;
        }
    }

    updateData();
}

function handleDot () {
    console.log("DOT");
    result.textContent = `${result.textContent}.`
    updateData();
}

function clearResult () {
    result.textContent = 0;
    data.currentValue = undefined;
    data.newValue = undefined;
    data.action = undefined;
    updateData();
}

function deleteLastNumber () {
    if (result.textContent.length <=1) {
        result.textContent = 0;
    }
    else {
        result.textContent = parseInt(result.textContent.slice(0,-1)); 
    }
    updateData();
}

function handleEqual() {
    let answer;
    switch (data.action) {
        case "*":
            answer = data.currentValue * data.newValue;
            break;
        case "/":
            answer = data.currentValue / data.newValue;
            break;
        case "+":
            answer = data.currentValue + data.newValue;
            break;
        case "-":
            answer = data.currentValue - data.newValue;
            break;
        default:
            console.log("Cannot do EQUAL");
    }

    if(answer>9999999999) {
        answer = parseInt(answer.toString().split('').slice(0,10).join(''))
    }

    if (answer.toString().split('').includes('.')) {
        const first = answer.toString().split('.')[0].split('').slice(0,10).join('')
        const last = answer.toString().split('.')[1].split('').slice(0,5).join('')
        answer = parseFloat(`${first}.${last}`)
        console.log(answer);
    }

    result.textContent = answer;
    data.currentValue = answer;
    console.log(data); 
}

numbers.forEach(number => number.addEventListener('click', handleNumber))
ac.addEventListener('click', clearResult)
del.addEventListener('click', deleteLastNumber)
actionsBtn.forEach(btn => btn.addEventListener('click', handleAction))
equal.addEventListener('click', handleEqual)
dot.addEventListener('click', handleDot)