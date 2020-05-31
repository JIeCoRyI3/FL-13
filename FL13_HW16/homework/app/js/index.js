const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

const _CODE = 4, _MINSTATUS = 200, _MAXSTATUS = 300;
const h1 = document.createElement('h1');
h1.textContent = 'Manage User App';
const h2 = document.createElement('h2');
h2.textContent = 'Loading...';
const btn = document.createElement('button');
const in1 = document.createElement('input');
const in2 = document.createElement('input');
in1.placeholder = 'Name';
in2.placeholder = 'UserName';
in1.id = 'in1';
in2.id = 'in2';
btn.id = 'addButton';
btn.onclick = addUser;
btn.textContent = 'Add User';
appContainer.appendChild(h1);
appContainer.appendChild(h2);
appContainer.appendChild(in1);
appContainer.appendChild(in2);
appContainer.appendChild(btn);
const table = document.createElement('table');
let xhttp = new XMLHttpRequest();

function getData() {
  xhttp.open('GET', 'http://localhost:3000/users');
  xhttp.send();
  xhttp.onload = function() {
	h2.textContent = '';
	if (xhttp.status !== _MINSTATUS) { 
		if(xhttp.status > _MINSTATUS && xhttp.status < _MAXSTATUS) {
			location.reload();
		}
	} else { 
		const data = JSON.parse(xhttp.response);
		for (let i = 0; i < data.length; i++) {
			const tr = document.createElement('tr');
			const tdid = document.createElement('td');
			const tdname = document.createElement('td');
			const in1 = document.createElement('input');
			const in2 = document.createElement('input');
			const tduser = document.createElement('td');
			const tdbtns = document.createElement('td');
			const update = document.createElement('button');
			const del = document.createElement('button');
			update.textContent = 'Update';
			del.textContent = 'Delete';
			del.onclick = deleteUser(data[i].id);
			tdbtns.appendChild(update);
			tdbtns.appendChild(del);
			tdid.className += 'id';
			tdid.textContent = data[i].id;
			in1.value = data[i].name;
			in2.value = data[i].username;
			in1.id = `in1%${data[i].id}`;
			in2.id = `in2%${data[i].id}`;
			update.onclick = updateUser(data[i].id);
			tdname.appendChild(in1);
			tduser.appendChild(in2);
			tr.appendChild(tdid);
			tr.appendChild(tdname);
			tr.appendChild(tduser);
			tr.appendChild(tdbtns);
			table.appendChild(tr);
		}
		}
	};
}

function addUser() {
	const btns = Array.from(document.getElementsByTagName('button'));
	btns.forEach((btn) => {
		btn.style.visibility = 'hidden';
	});
	const name = document.getElementById('in1').value;
	const fname = document.getElementById('in2').value;
	const data = JSON.stringify({
		name: name,
		username: fname
	});

	xhttp.open('POST', 'http://localhost:3000/users');
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(data);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === _CODE) {
			btns.forEach((btn) => {
			btn.style.visibility = 'visible';
		});
		}
	};
}

function deleteUser(id) {
	return () => {
		const btns = Array.from(document.getElementsByTagName('button'));
		btns.forEach((btn) => {
			btn.style.visibility = 'hidden';
		});
		xhttp.open('DELETE', `http://localhost:3000/users/${id}`);
		xhttp.setRequestHeader('Authorization', 'admin');
		xhttp.send();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === _CODE) {
			btns.forEach((btn) => {
				btn.style.visibility = 'visible';
			});
			}
		};
	}
}

function updateUser(id) {
	return () => {
		const btns = Array.from(document.getElementsByTagName('button'));
		btns.forEach((btn) => {
			btn.style.visibility = 'hidden';
		});
		const name = document.getElementById(`in1%${id}`).value;
		const fname = document.getElementById(`in2%${id}`).value;
		xhttp.open('PUT', `http://localhost:3000/users/${id}`);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		const data = JSON.stringify({
			name: name,
			username: fname
		});
		xhttp.send(data);
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === _CODE) {
			btns.forEach((btn) => {
				btn.style.visibility = 'visible';
			});
		}
		};
	}
}

getData();
appContainer.appendChild(table);