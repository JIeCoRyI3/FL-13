function positiveSum(inArray) {
	return inArray.reduce((acc, el) => { 
		if(el > 0) {
			return acc + el;
		} else {
			return acc;
		}
	});
}

console.log(positiveSum([1, 4, 5, -6, 5, -2]));