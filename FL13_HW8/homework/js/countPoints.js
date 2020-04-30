let isBigger = (a, b) => a > b;

function getDifference(a, b) {
	if(isBigger(a, b)) {
		return a - b;
	} else {
		return b - a;
	}
}

function countPoints(array) {
	let score = 0;
	for (let i = 0; i < array.length; i++) {
		const scoreTeam1 = array[i].split(':')[0];
		const scoreTeam2 = array[i].split(':')[1];
		if(isBigger(scoreTeam1, scoreTeam2)){
			score += 3;
		} else if (getDifference(scoreTeam1, scoreTeam2) === 0) {
			score += 1;
		}
	}
	return score;
}

console.log(countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']));