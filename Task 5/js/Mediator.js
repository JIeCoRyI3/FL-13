class Mediator { // Mediator class
    events = {}; // Events object

    addEvent(eventName, target) { //    addEvent function 'subscribe' target on event
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(target);
    }

    triggerEvent(eventName, callback) { //  triggerEvent function 'broadcast' event to all 'subscribers'
        this.events[eventName].forEach((element) => {
            callback(element);
        });
    }

    //  removeEvent function 'unsubscribe' target on event
    /* removeEvent(eventName, target) {
        this.events[eventName].splice(this.events[eventName].indexOf(target), 1);
    } */
}

let mediator = new Mediator(); //   instance of our mediator

//  author-elements from horizontal bar
let horizontalBarAuthors = Array.from(document.querySelectorAll('.horizontal-bar__author'));
//  author-elements from vertical bar
let rightSideAuthors = Array.from(document.querySelectorAll('.right-side__author'));

//  adding all listeners to elements
addListeners(horizontalBarAuthors);
addListeners(rightSideAuthors);

//  function, that make author style 'active' and shows posts titles
function renderPosts(element) {
    element.classList.add('active-article');
    element.classList.remove('non-active-article');
}

//  function, that make post style 'active'
function renderPostsPage(element) {
    element.style.color = 'green';
}

//  function, that make author style 'common'
function defaultRender(element) {
    element.classList.add('non-active-article');
    element.classList.remove('active-article');
}

//  function, that make post style 'common'
function defaultRenderPage(element) {
    element.style.color = 'black';
}

//  function, that add eventListeners to our elements
function addListeners (array) {
    array.forEach((author, authorIndex) => {
        mediator.addEvent('click-on-author' + authorIndex, author);
        mediator.addEvent('default-state', author);
        author.addEventListener('click', () => {
            mediator.triggerEvent('default-state', defaultRender);
            mediator.triggerEvent('click-on-author' + authorIndex, renderPosts);
        });

        Array.from(author.childNodes[1].children).forEach((post, postIndex) => {
            mediator.addEvent('click-on-post' + authorIndex + postIndex, post);
            mediator.addEvent('default-state-of-post', post);
            post.addEventListener('click', () => {
                mediator.triggerEvent('default-state-of-post', defaultRenderPage);
                mediator.triggerEvent('click-on-post' + authorIndex + postIndex, renderPostsPage);
                renderPost(authorIndex, postIndex);
            });
        });
    });
}

//  function, that render post to page from data
function renderPost(authorIndex, postIndex) {
    document.querySelector('.post__title').textContent = data[authorIndex].articles[postIndex].title;
    document.querySelector('.post__text').textContent = data[authorIndex].articles[postIndex].text;
}
