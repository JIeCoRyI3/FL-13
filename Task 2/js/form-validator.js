let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

let id = Math.round(Math.random() * Math.random() * 2000);

function validate() {
    const selectText = document.querySelector('.form-server__list').value;
    const titleText = document.querySelector('.form-server__title-in').value;
    const authorText = document.querySelector('.form-server__author-in').value;
    const descText = document.querySelector('.form-server__desc-in').value;
    const quoteText = document.querySelector('.form-server__quote-in').value;
    const linkText = document.querySelector('.form-server__img-in').value;

    if(titleText.length <= 2 || titleText.length >= 20) {
        alert('Incorrect title length');
    } else if(!/[A-Z]/.test(titleText[0])) {
        alert('Title have to start with uppercase letter!');
    } else if (!/^[a-zA-Z?!. ,:-]+$/.test(titleText)) {
        alert('You can use only letters and !, ., ,, -, ?, :');
    } else if (authorText.length === 0 || descText.length === 0 || linkText.length === 0) {
        alert('Missing some fields');
    } else if (!pattern.test(linkText)) {
        alert('Wrong URL');
    } else {
        connect({
            id,
            selectText,
            titleText,
            authorText,
            descText,
            quoteText,
            linkText,
            date: new Date()
        });
    }
}

function connect(data) {
    const apiBase = 'http://localhost:3000';
    fetch(`${apiBase}/api/create-article`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(() => {
        location.href = `./post.html#${id}`;
    });
}
