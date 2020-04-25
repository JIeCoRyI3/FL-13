const _POW = 2, _MAXATTEMPTS = 3, _MINRANGE = 5, _MP = 25;
let totalPrize = 0;
let totalAttempts;

function onStartGame() {
	if(totalPrize === 0){
		totalAttempts = 1;
		const input = confirm('Do you want to play a game?');
		input? onPlayGame() : alert('You did not become a billionaire, but can.');
	} else {
		totalAttempts++;
		onPlayGame();
	}
}

function onPlayGame() {
	const randomNumber = Math.round(Math.random() * _MINRANGE * totalAttempts);
	let attempts = _MAXATTEMPTS;
	while(attempts) {
		const possiblePrize = attempts === _MAXATTEMPTS? Math.pow(_POW, totalAttempts - 1) * (attempts + 1) * _MP 
														: Math.pow(_POW, totalAttempts - 1) * attempts * _MP;
		const attemptNumber = prompt(`Choose a roulette pocket number from ${0} to ${_MINRANGE * totalAttempts}` +
									`\nAttempts left: ${attempts}` + 
									`\nTotal prize: ${totalPrize}` +
									`\nPossible prize at current attempt: ${possiblePrize}`);
		if(attemptNumber && attemptNumber.trim() && +attemptNumber === randomNumber) {
			return onWinner(possiblePrize);
		}
		attempts--;
	}
	return onEndGame();
}

function onWinner(prize) {
	const input = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);
	totalPrize += prize;
	input? onStartGame() : onEndGame();
}

function onEndGame() {
	alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
	totalPrize = 0;
	onStartGame();
}

 onStartGame();