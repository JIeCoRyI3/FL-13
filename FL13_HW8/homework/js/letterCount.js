function letterCount(str, char) {
	const result = str.toLowerCase().match(new RegExp(char.toLowerCase(), "g") || []);
	return result? result.length : 0;
}

console.log(letterCount('Borry', 'r'));