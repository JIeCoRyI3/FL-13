const _2 = 2;
const inputData = prompt('Enter a word');
let isValid;
if(inputData) {
	if (inputData.replace(/\s/g, '').length) {
		isValid = true;
	} else{
		isValid = false;
	}
} else {
	isValid = false;
}
if(isValid){
	const word = inputData;
	const startMiddleChar = word.length % _2 === 0 ? word.length / _2 - 1 : Math.floor(word.length / _2);
	const countMiddleChar = word.length % _2 === 0 ? _2 : 1;
	const middleChar = word.substring(startMiddleChar, startMiddleChar + countMiddleChar);
	alert(`"${middleChar}"`);
} else {
	alert('Invalid value');
}