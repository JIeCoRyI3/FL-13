const root = document.getElementById('root');
let data;

window.addEventListener('popstate', render);
window.onload = render;

function renderPage() {
	data = JSON.parse(localStorage.getItem('data'));
	const ul = document.createElement('ul');
	root.innerHTML = '';
	for(let i = 0; i < data.length; i++) {
		const li = document.createElement('li');
		const liDiv = document.createElement('div');
		liDiv.textContent = data[i].title;
		liDiv.id = data[i].id;
		liDiv.addEventListener('click', () => showItem(liDiv));
		const editButton = document.createElement('button');
		editButton.addEventListener('click', () => editView(data[i]));
		editButton.textContent = 'Edit';
		li.appendChild(liDiv);
		li.appendChild(editButton);
		ul.appendChild(li);
	}
	const addButton = document.createElement('button');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', addView);
	ul.appendChild(addButton);
	root.appendChild(ul);
	const dynamicDiv = document.createElement('div');
	dynamicDiv.id = 'dynamic';
	root.appendChild(dynamicDiv);
}

function showItem(item) {
	history.pushState({page: item.id}, `title${item.id}`, `?id=${item.id}#preview`);
	render();
}

function render(flag = true) {
	const div = document.getElementById('dynamic');
	div.innerHTML = '';
	
	const hash = location.hash;
	let id;

	if(location.search) {
		id = +location.search.match(/\d/)[0];
		if(!data[id]) {
			history.pushState({page: 'main'}, `Main`, `./index.html`);
			render(false);
			return;
		} 
	}

	if(hash === '#preview' && flag) {
		preview(div, id);
	} else if (hash === '#add') {
		createForm(div);
	} else if (hash === '#edit'){
		createForm(div, true, data[id]);
	} else if (hash){
		history.pushState({page: 'main'}, `Main`, `./index.html`);
		render(false);
		return;
	} else {
		nothing(div);
	}
}

function preview(element, id) {
	element.textContent = data[id].title + ', ' + data[id].author;
	const plot = document.createElement('div');
	plot.textContent = data[id].plot;
	const bg = document.createElement('div');
	bg.style.width = '400px';
	bg.style.height = '400px';
	bg.style.backgroundImage = `url(${data[id].img})`;
	bg.style.backgroundSize = 'cover';
	element.appendChild(bg);
	element.appendChild(plot);
}

function nothing(element) {
	element.textContent = 'Please choose a book';
}

function addView() {
	history.pushState({page: 'add'}, `Add Page`, `./index.html#add`);
	render();
}

function editView(item) {
	history.pushState({page: item.id}, `Edit Page ${item.id}`, `?id=${item.id}#edit`);
	render();
}

function canceled() {
	const choice = confirm('Discard changes?');
	if(choice) {
		history.back();
	} 
}

function createForm(element, edit = false, item = null) {
	const titleInput = document.createElement('input');
	const authorInput = document.createElement('input');
	const plotInput = document.createElement('input');
	const imgURLInput = document.createElement('input');
	const errorDiv = document.createElement('div');
	const button = document.createElement('button');
	const cancel = document.createElement('button');
	cancel.textContent = 'Cancel';
	cancel.addEventListener('click', canceled);
	button.textContent = 'Save';
	authorInput.placeholder = 'Enter author of a book';
	authorInput.value = item? item.author : null;
	authorInput.id = 'author';
	titleInput.placeholder = 'Enter title of a book';
	titleInput.value = item? item.title : null;
	titleInput.id = 'title';
	plotInput.placeholder = 'Enter plot of a book';
	plotInput.value = item? item.plot : null;
	plotInput.id = 'plot';
	errorDiv.id = 'err';
	imgURLInput.placeholder = 'Enter URL of a image of the book';
	imgURLInput.value = item? item.img : null;
	imgURLInput.id = 'url';
	if(edit) {
		button.addEventListener('click', () => addBook(true, item));
	} else {
		button.addEventListener('click', () => addBook(false));
	}
	element.appendChild(titleInput);
	element.appendChild(authorInput);
	element.appendChild(plotInput);
	element.appendChild(imgURLInput);
	element.appendChild(errorDiv);
	element.appendChild(cancel);
	element.appendChild(button);
}

function addBook(isEdit, item = null) {
	const title = document.getElementById('title').value;
	const url = document.getElementById('url').value;
	const author = document.getElementById('author').value;
	const plot = document.getElementById('plot').value;
	if(!title) {
		document.getElementById('title').focus();
		document.getElementById('err').textContent = 'Enter title';
	} else if(!url){
		document.getElementById('url').focus();
		document.getElementById('err').textContent = 'Enter URL';
	} else if(!author){
		document.getElementById('author').focus();
		document.getElementById('err').textContent = 'Enter author';
	} else if(!plot){
		document.getElementById('plot').focus();
		document.getElementById('err').textContent = 'Enter plot';
	} else {
		const isUrl = /(http(s)?:\/\/.)[-a-zA-Z0-9%:._]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9_.?&/]*)/gm.test(url);
		if(isUrl) {
			let newId;
			if(isEdit) {
				newId = item.id;
			} else {
				newId = data.length;
			}
			const newDataItem = {
				id: newId,
				title: title,
				img: url,
				author: author,
				plot: plot
			};
			if(isEdit) {
				data[item.id] = newDataItem;
			} else {
				data.push(newDataItem);
			}
			localStorage.setItem('data', JSON.stringify(data));
			renderPage();

			if(isEdit) {
				history.pushState({page: item.id}, `title${item.id}`, `?id=${item.id}#preview`);
				render();
				const delay = 300;
				setTimeout( () => alert('Book successfully updated'), delay);
			} else {
				history.pushState({page: 'main'}, `Main`, `./index.html`);
				render();
			}
			
		} else {
			document.getElementById('err').textContent = 'Wrong URL';
		}
	}
	
}

renderPage();