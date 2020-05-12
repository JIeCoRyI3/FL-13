const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

window.addEventListener('contextmenu', function (e) { 
  e.preventDefault();
}, false);

window.addEventListener('click', function () { 
  let context = Array.from(document.getElementsByClassName('contextMenuContainer'));
  context.map((el) => el.parentNode.removeChild(el));
}, false);

function createDOM(DOMdata) {
  let arrDiv = [];
  for(let i = 0; i < DOMdata.length; i++) {
    let div = document.createElement('div');
    let span = document.createElement('span');
    let name = document.createElement('span');
    let container = document.createElement('div');
    container.classList.add('span');
    span.classList.add('material-icons');
    span.textContent = DOMdata[i]['folder']? 'folder' : 'note';
    span.style.color = DOMdata[i]['folder']? 'yellow' : 'gray';
    name.textContent = DOMdata[i]['title'];
    span.style.float = 'left';
    name.style.display = 'flex';
    name.style.alignItems = 'center';
    name.style.height = '25px';
    container.appendChild(span);
    container.appendChild(name);
    container.addEventListener('click', showChild(div));
    container.addEventListener('contextmenu', contextMenu(div));
    div.appendChild(container);
    div.style.display = 'none';
    div.style.flexDirection = 'column';
    div.style.position = 'relative';
    arrDiv.push(div);
    if(DOMdata[i]['folder'] && DOMdata[i]['children']) {
      let arr = createDOM( DOMdata[i]['children'] );
      arr.map((node) => div.appendChild(node));
    }

    if(DOMdata[i]['folder'] && !DOMdata[i]['children']) {
      let empty = document.createElement('div');
      empty.textContent = 'Folder Empty';
      empty.style.fontStyle = 'italic';
      empty.style.display = 'none';
      div.appendChild(empty);
    }
  }
  return arrDiv;
}

function showChild(element) {
  return function () {
    let context = Array.from(document.getElementsByClassName('contextMenuContainer'));
    context.map((el) => el.parentNode.removeChild(el));
    let arr = element.childNodes; 
    if(arr[0].childNodes[0].textContent === 'folder') {
      arr[0].childNodes[0].textContent = 'folder_open';
    } else if (arr[0].childNodes[0].textContent === 'folder_open') {
      arr[0].childNodes[0].textContent = 'folder';
    }
    
    for(let i = 1; i < arr.length; i++){
      if(arr[i].style.display === 'flex') {
        arr[i].style.display = 'none';
      } else {
        arr[i].style.display = 'flex';
      }
    }
  }
}

function contextMenu(element) {
  return function () {
    let context = Array.from(document.getElementsByClassName('contextMenuContainer'));
    context.map((el) => el.parentNode.removeChild(el));
    let unclosedInput = document.getElementById('in');
    if(unclosedInput) {
      submitRename(unclosedInput.parentNode.parentNode);
    }
    const button = document.createElement('button');
    button.textContent = 'Rename';
    button.onclick = renameNode(element);
    const button2 = document.createElement('button');
    button2.textContent = 'Delete';
    button2.onclick = deleteNode(element);
    const div = document.createElement('div');
    div.classList.add('contextMenuContainer');
    div.appendChild(button);
    div.appendChild(button2);
    element.appendChild(div);
  }
}

const _2 = 2;

function deleteNode(element) {
  return function () {
    if(element.parentNode.childNodes.length === _2) {
      let empty = document.createElement('div');
      empty.textContent = 'Folder Empty';
      empty.style.fontStyle = 'italic';
      empty.style.display = 'flex';
      element.parentNode.appendChild(empty);
    }
    element.parentNode.removeChild(element);
  }
}

function renameNode(element) {
  return function () {
    let context = Array.from(document.getElementsByClassName('contextMenuContainer'));
    context.map((el) => el.parentNode.removeChild(el));
    let arr = element.childNodes;
    const prevName = arr[0].childNodes[1].textContent;
    arr[0].removeChild(arr[0].childNodes[1]);
    let input = document.createElement('input');
    input.style.backgroundColor = 'transparent';
    input.id = 'in';
    input.value = prevName;
    input.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
         submitRename(element);
      }
    });

    input.addEventListener('click', function() {
      submitRename(element);
    });

    arr[0].appendChild(input);
    input.focus();
  }
}

function submitRename(element){
  let arr = element.childNodes;
  let newName = document.getElementById('in').value;
  arr[0].removeChild(arr[0].childNodes[1]);
  let name = document.createElement('span');
  name.textContent = newName;
  name.style.display = 'flex';
  name.style.alignItems = 'center';
  name.style.height = '25px';
  arr[0].appendChild(name);
}

const dataArray = createDOM(data);
dataArray.map((elem) => { 
	elem.style.display = 'flex';
	return elem;
});
dataArray.map((elem) => rootNode.appendChild(elem));