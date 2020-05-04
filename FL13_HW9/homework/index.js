const _BASEYEAR = 1900, _MINNUMBER = 10, _MAXNUMBER = 20;

function convert() {
	let newArr = [];
	for (let i = 0; i < arguments.length; i++) {
		arguments[i] + 0 > arguments[i].length? newArr.push(parseInt(arguments[i])) : newArr.push(String(arguments[i]));
	}
	return newArr;
}

function executeforEach(arr, func) {
	let modArr = [];
	for(let i = 0; i < arr.length; i++) {
		modArr[i] = func(arr[i]);
	}
	return modArr;
}

function mapArray(arr, func) {
	let newArr = executeforEach(arr, (el) => { 
		return parseInt(el) 
	});
	return executeforEach(newArr, func);
}

function filterArray(arr, func) {
	let newArr = executeforEach(arr, func);
	let returnArr = [];
	for (let i = 0; i < arr.length; i++) {
		if(newArr[i]){
			returnArr.push(arr[i]);
		} else {
			continue;
		}
	}
	return returnArr;
}

function containsValue(arr, value) {
	let newArr = executeforEach(arr, (el) => el === value);
	for (let i = 0; i < newArr.length; i++) {
		if(newArr[i]) {
			return true;
		}
	}
	return false;
}

function flipOver(str) {
	let newStr = '';
	for(let i = 0; i < str.length; i++) {
		newStr += str[str.length - 1 - i];
	}
	return newStr;
}

function makeListFromRange(range) {
	let newArr = [];
	const start = range[0] > range[1]? range[1] : range[0];
	const end = range[0] > range[1]? range[0] : range[1];
	for(let i = start; i < end + 1; i++){
		newArr.push(i);
	}
	return newArr;
}

function getArrayOfKeys(arrOfObj, key) {
	return executeforEach(arrOfObj, (el) => el[key]);
}

function substitute(arr) {
	return mapArray(arr, (el) => { 
		if(el > _MINNUMBER && el < _MAXNUMBER) { 
			return '*' 
		} else {
			return el;
		}
	});
}

function getPastDay(date, daysAgo) {
	const years = date.getYear() + _BASEYEAR;
	const month = date.getMonth();
	const day = date.getDate() - daysAgo;
	const newDate = new Date(years, month, day);
	return newDate.getDate();
}

function formatDate(date) {
	const year = date.getYear() + _BASEYEAR;
	const month = date.getMonth() + 1 < _MINNUMBER? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const day = date.getDate() < _MINNUMBER? '0' + date.getDate() : date.getDate();
	const hours = date.getHours() < _MINNUMBER? '0' + date.getHours() : date.getHours();
	const min = date.getMinutes() < _MINNUMBER? '0' + date.getMinutes() : date.getMinutes();
	return `${year}/${month}/${day} ${hours}:${min}`;
}