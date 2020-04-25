const _HOURSMAX = 20, _HOURSMIN = 8, _LEN = 4;

function onLogin() {
	let inputData = prompt('Enter a login');
	if(inputData) {
		if(inputData.length < _LEN) {
			alert('I don\'t know any users having name length less than 4 symbols');
		} else if (inputData === 'User' || inputData === 'Admin'){
			onPassword(inputData);
		} else {
			alert('I don’t know you');
		}
	} else {
		alert('Canceled');
	}
}

function onPassword(user) {
	let password = prompt('Enter a password');
	if(password) {
		if(user === 'User') {
			if (password === 'UserPass') {
				onGreet(user);
			} else {
				alert('Wrong password');
			}
		} else {
			if (password === 'RootPass') {
				onGreet(user);
			} else {
				alert('Wrong password');
			}
		}
	} else {
		alert('Canceled');
	}
}

function onGreet(user) {
	const currentHours = new Date().getHours();
	if(currentHours < _HOURSMAX && currentHours > _HOURSMIN) {
		alert(`Good day, dear ${user}`);
	} else {
		alert(`Good evening, dear ${user}`);
	}
}

onLogin();