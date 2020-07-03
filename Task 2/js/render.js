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
            const dataObj = data;
            let dataArr = dataObj.descText;
            const type = dataObj.selectText;
            let quote = dataObj.quoteText;
            let date = new Date(dataObj.date);
            let day = date.getDate() < 10? '0' + date.getDate() : date.getDate();
            document.querySelector('.bcard__flex-comments').insertAdjacentHTML('afterbegin',
                `<div class='bcard__date'>${day} ${monthNames[date.getMonth()]}, ${date.getFullYear()}</div>`);
            if(type === 'audio') {
                document.querySelector('.post__main-article').innerHTML = `<audio class='blog-post__audio' controls>
                <source src="#" type='audio/mpeg'>
                    Your browser does not support the audio element.
                </audio>`;
            }
            dataArr = decorText(dataArr);
            quote = decorText(quote);
            const arrayOfAllArticles = dataArr.split('###');
            const arrayOfParagraphs = arrayOfAllArticles[0].split('\n').filter((p) => {
                if (p.length > 0) {
                    return p;
                }
                return false;
            });
            document.querySelector('.post__title').textContent = dataObj.titleText;
            document.querySelector('.blog-post__name').textContent = dataObj.authorText;
            if(type !== 'text') {
                document.querySelector('.post__main-article').insertAdjacentHTML('beforebegin',
                    ` <img alt='img' class='post__img' src='${dataObj.linkText}'>`);
            }
            arrayOfParagraphs.map((p) => {
                document.querySelector('.post__main-article').innerHTML+=`<p class='post__paragraph'>${p}</p>`;
                return true;
            });

            for(let i = 1; i < arrayOfAllArticles.length; i++){
                const arrayOfSubParagraphs = arrayOfAllArticles[i].split('\n').filter((p) => {
                    if (p.length > 0) {
                        return p;
                    }
                    return false;
                });

                let art = document.createElement('article');
                art.classList.add('post__common-article');
                art.innerHTML = `<h2 class='post__art-title'>${arrayOfSubParagraphs[0]}</h2>`;
                arrayOfSubParagraphs.filter((p, ind) => {
                    if(ind > 0) {
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
            }

            let quoteArt = document.createElement('article');
            quoteArt.classList.add('post__common-article');
            quoteArt.innerHTML = `<p class='post__paragraph post__paragraph--befored'>${quote}</p>`;
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
