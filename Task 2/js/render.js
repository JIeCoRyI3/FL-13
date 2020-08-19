window.onload = function() {
    renderPost();
};

function renderPost() {
    let id = new URL(location.href).hash;
    id = id.substr(1, id.length);
    const apiBase = 'http://localhost:3000';
    fetch(`${apiBase}/api/list/${id}`, {
        method: 'GET'
    })
        .then(x => x.json())
        .then(data => {
            const monthNames = ['jan', 'feb', 'mar', 'apr', 'mar', 'jun',
                'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
            ];
            let { descText, selectText, quoteText, date } = data;
            let postDate = new Date(date);
            let day = postDate.getDate() < 10? '0' + postDate.getDate() : postDate.getDate();
            document.querySelector('.bcard__flex-comments').insertAdjacentHTML('afterbegin',
                `<div class='bcard__date'>${day} ${monthNames[postDate.getMonth()]}, ${postDate.getFullYear()}</div>`);
            if(selectText === 'audio') {
                document.querySelector('.post__main-article').innerHTML = `<audio class='blog-post__audio' controls>
                <source src="#" type='audio/mpeg'>
                    Your browser does not support the audio element.
                </audio>`;
            }
            descText = decorText(descText);
            quoteText = decorText(quoteText);
            const arrayOfAllArticles = descText.split('###');
            const arrayOfParagraphs = arrayOfAllArticles[0].split('\n').filter((p) => {
                if (p.length > 0) {
                    return p;
                }
                return false;
            });
            document.querySelector('.post__title').textContent = data.titleText;
            document.querySelector('.blog-post__name').textContent = data.authorText;
            if(selectText !== 'text') {
                document.querySelector('.post__main-article').insertAdjacentHTML('beforebegin',
                    ` <img alt='img' class='post__img' src='${data.linkText}'>`);
            }
            arrayOfParagraphs.map((p) => {
                document.querySelector('.post__main-article').innerHTML+=`<p class='post__paragraph'>${p}</p>`;
                return true;
            });

            arrayOfAllArticles.map( (el, index) => {
                if(index === 0) return;
                const arrayOfSubParagraphs = arrayOfAllArticles[index].split('\n').filter((p) => {
                    if (p.length > 0) {
                        return p;
                    }
                    return false;
                });

                let art = document.createElement('article');
                art.classList.add('post__common-article');
                art.innerHTML = `<h2 class='post__art-title'>${arrayOfSubParagraphs[0]}</h2>`;
                arrayOfSubParagraphs.filter((p, index) => {
                    if(index > 0) {
                        art.innerHTML += `<p class='post__paragraph'>${p}</p>`;
                    }
                    return false;
                });
                if(document.querySelector('.post__common-article')){
                    let array = document.querySelectorAll('.post__common-article');
                    array[array.length - 1].after(art);
                } else {
                    document.querySelector('.post__main-article').after(art);
                }
            });

            let quoteArt = document.createElement('article');
            quoteArt.classList.add('post__common-article');
            quoteArt.innerHTML = `<p class='post__paragraph post__paragraph--befored'>${quoteText}</p>`;
            if(document.querySelector('.post__common-article')){
                let array = document.querySelectorAll('.post__common-article');
                array[array.length - 1].after(quoteArt);
            } else {
                document.querySelector('.post__main-article').after(quoteArt);
            }

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
