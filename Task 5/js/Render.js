import Mediator from "./Mediator.js";
const mediator = new Mediator();

const horizontalBarAuthors = Array.from(document.querySelectorAll('.horizontal-bar__author'));
const rightSideAuthors = Array.from(document.querySelectorAll('.right-side__author'));

addListeners(horizontalBarAuthors);
addListeners(rightSideAuthors);

function renderPosts(element) {
    element.classList.add('active-article');
    element.classList.remove('non-active-article');
}

function renderPostsPage(element) {
    element.style.color = 'green';
}

function defaultRender(element) {
    element.classList.add('non-active-article');
    element.classList.remove('active-article');
}

function defaultRenderPage(element) {
    element.style.color = 'black';
}

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

function renderPost(authorIndex, postIndex) {
    document.querySelector('.post__title')
        .textContent = data[authorIndex].articles[postIndex].title;
    document.querySelector('.post__text')
        .textContent = data[authorIndex].articles[postIndex].text;
}
