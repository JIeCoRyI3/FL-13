import ApiClient from "./apiClient.js";

window.onload = function() {
    renderPost();
};

function renderPost() {
    const apiClient = new ApiClient();
    const urlHash = new URL(location.href).hash;
    const id = urlHash.substr(1, urlHash.length);
    apiClient.getPostById(id)
        .then(data => {
            const { descText, selectText, quoteText, date, titleText, authorText, linkText } = data;
            const postDate = new Date(date);
            const decoredDescText = decorText(descText);
            const decoredQuoteText = decorText(quoteText);
            const arrayOfAllArticles = decoredDescText.split('###');

            renderDate(postDate);
            renderAudio(selectText);
            renderPostHeader(titleText, authorText);
            renderImage(selectText, linkText);
            renderParagraphs(arrayOfAllArticles);
            renderArticles(arrayOfAllArticles);
            renderQuote(decoredQuoteText);
        });
}

function decorText(text) {
    while (~text.indexOf('+*')) {
        text = text.replace('+*', '<b class="post__bold">');
    }
    while (~text.indexOf('*+')) {
        text = text.replace('*+', '</b>');
    }
    while (~text.indexOf('-*')) {
        text = text.replace('-*', '<del>');
    }
    while (~text.indexOf('*-')) {
        text = text.replace('*-', '</del>');
    }
    return text;
}

function renderDate(date) {
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'mar', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ];
    const day = date.getDate() < 10? '0' + date.getDate() : date.getDate();
    document.querySelector('.bcard__flex-comments').insertAdjacentHTML(
        'afterbegin',
        `<div class='bcard__date'>${day} ${monthNames[date.getMonth()]}, ${date.getFullYear()}</div>`);
}

function renderAudio(selectText) {
    if(selectText === 'audio') {
        document.querySelector('.post__main-article')
            .innerHTML = `<audio class='blog-post__audio' controls>
                                    <source src="#" type='audio/mpeg'>
                                        Your browser does not support the audio element.
                                    </audio>`;
    }
}

function renderPostHeader(titleText, authorText) {
    document.querySelector('.post__title').textContent = titleText;
    document.querySelector('.blog-post__name').textContent = authorText;
}

function renderImage(selectText, linkText) {
    if(selectText !== 'text') {
        document.querySelector('.post__main-article').insertAdjacentHTML(
            'beforebegin',
            ` <img alt='img' class='post__img' src='${linkText}'>`);
    }
}

function renderParagraphs(arrayOfAllArticles) {
    const arrayOfParagraphs = arrayOfAllArticles[0]
        .split('\n')
        .filter((p) => {
            if (p.length > 0) {
                return p;
            }
            return false;
        });
    arrayOfParagraphs.map((p) => {
        document.querySelector('.post__main-article').innerHTML+=`<p class='post__paragraph'>${p}</p>`;
        return true;
    });
}

function renderArticles(arrayOfAllArticles) {
    arrayOfAllArticles.map( (el, index) => {
        if(index === 0) return;
        const arrayOfSubParagraphs = arrayOfAllArticles[index]
            .split('\n')
            .filter((p) => {
                if (p.length > 0) {
                    return p;
                }
                return false;
            });

        renderSubParagraphs(arrayOfSubParagraphs);
    });
}

function renderSubParagraphs(arrayOfSubParagraphs) {
    const art = document.createElement('article');
    art.classList.add('post__common-article');
    art.innerHTML = `<h2 class='post__art-title'>${arrayOfSubParagraphs[0]}</h2>`;
    arrayOfSubParagraphs.filter((p, index) => {
        if(index > 0) {
            art.innerHTML += `<p class='post__paragraph'>${p}</p>`;
        }
        return false;
    });
    if(document.querySelector('.post__common-article')){
        const array = document.querySelectorAll('.post__common-article');
        array[array.length - 1].after(art);
    } else {
        document.querySelector('.post__main-article').after(art);
    }
}

function renderQuote(decoredQuoteText) {
    const quoteArt = document.createElement('article');
    quoteArt.classList.add('post__common-article');
    quoteArt.innerHTML = `<p class='post__paragraph post__paragraph--befored'>${decoredQuoteText}</p>`;
    if(document.querySelector('.post__common-article')){
        let array = document.querySelectorAll('.post__common-article');
        array[array.length - 1].after(quoteArt);
    } else {
        document.querySelector('.post__main-article').after(quoteArt);
    }
}
