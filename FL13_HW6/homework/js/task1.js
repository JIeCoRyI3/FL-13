const _100 = 100, _toFixedComa = 2;
const checkNumber = Number.parseFloat(prompt('Enter check number')).toFixed(_toFixedComa);
const tip = Number.parseFloat(prompt('Enter tip percentage')).toFixed(_toFixedComa);
const tipAmount = (checkNumber * tip / _100).toFixed(_toFixedComa);
const totalSum = (checkNumber - tipAmount).toFixed(_toFixedComa);
const isValid = !isNaN(checkNumber) && !isNaN(tip) && totalSum >= 0 && tip >= 0 && tip <= _100;
isValid ? alert('Check number: ' + checkNumber +
				'\nTip: ' + tip + '%' +
				'\nTip amount: ' + tipAmount +
				'\nTotal sum to pay: ' + totalSum)
		: alert('Invalid input data');