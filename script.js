function convertTemperature() {
    const temperatureInput = document.getElementById('temperature');
    const resultInput = document.getElementById('result');
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const errorMessage = document.getElementById('errorMessage');

    if (temperatureInput.value === '' || isNaN(temperatureInput.value)) {
        errorMessage.style.display = 'block';
        resultInput.value = '';
        return;
    }
    
    errorMessage.style.display = 'none';
    const temperature = parseFloat(temperatureInput.value);
    let result;

    if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') {
            result = (temperature * 9/5) + 32;
        }
        else {
            result = temperature;
        }
    } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') {
            result = (temperature - 32) * 5/9;
        }
         else {
            result = temperature;
        }
    } 
    

    resultInput.value = result.toFixed(2);
}

function clearFields() {
    document.getElementById('temperature').value = '';
    document.getElementById('result').value = '';
    document.getElementById('errorMessage').style.display = 'none';
}

document.getElementById('temperature').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});