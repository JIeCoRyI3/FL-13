window.onload = function() {
    renderPosts();
};

function renderPosts() {
    const apiBase = 'http://localhost:3000';
    fetch(`${apiBase}/api/list`, {
        method: 'GET'
    })
        .then(x => x.json())
        .then(data => {
            let validArray = data.filter((post) => {
                if(post.selectText) {
                    return post;
                }
                return false;
            });
            validArray.map((post) => {
                let type;
                switch (post.selectText) {
                    case 'video':
                        type = 'videoted';
                        break;
                    case 'audio':
                        type = 'audioted';
                        break;
                    case 'text':
                        type = 'texted';
                        break;
                    case 'image':
                        type = 'imgoted';
                        break;
                    default:
                        type = 'texted';
                        break;
                }
                let desc;
                const lengthForAudio = 100, lengthForText = 380, lengthForAll = 200;
                if(type === 'audioted') {
                    desc = post.descText.substr(0, lengthForAudio);
                    if(post.descText.length > lengthForAudio) {
                        desc += ' …';
                    }
                } else if(type === 'texted'){
                    desc = post.descText.substr(0, lengthForText);
                    if(post.descText.length > lengthForText) {
                        desc += ' …';
                    }
                } else {
                    desc = post.descText.substr(0, lengthForAll);
                    if(post.descText.length > lengthForAll) {
                        desc += ' …';
                    }
                }
                desc = undecorText(desc);

                const monthNames = ['jan', 'feb', 'mar', 'apr', 'mar', 'jun',
                    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
                ];
                let date = new Date(post.date);
                let day = date.getDate() < 10? '0' + date.getDate() : date.getDate();

                document.querySelector('.block__wrapper').innerHTML += `
                    <div class='block__blog-post blog-post blog-post--${type} row'>
                        <div class='blog-post__corner'></div>
                        ${image(type, post)}
                        <div class='blog-post__right-container'>
                            <div class='blog-post__head'>
                                <img alt='img' class='blog-post__avatar' src='img/Neil.png'>
                                <div class='blog-post__title'>
                                    <h2 class='blog-post__name'>${post.authorText}</h2>
                                    <div class='bcard__flex-comments'>
                        <div class='bcard__date'>${day} ${monthNames[date.getMonth()]}, ${date.getFullYear()}</div>
                                        <div class='bcard__splitter'>•</div>
                                        <div class='bcard__reads'>7 min read</div>
                                        <div class='bcard__splitter'>•</div>
                        <div class='bcard__comments'><img alt='comment' src='img/icon/a-icon-comment.svg'>19</div>
                                        <div class='blog-post__stars'>
                                            <img alt='img' src='img/Star.svg'>
                                            <img alt='img' src='img/Star.svg'>
                                            <img alt='img' src='img/Group.svg'>
                                            <img alt='img' src='img/Star-1.svg'>
                                            <img alt='img' src='img/Star-1.svg'>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <h2 class='blog-post__article'>${post.titleText}</h2>
                            ${audio(type)}
                            <p class='blog-post__text'>${desc}</p>
                            <button class='blog-post__button but-1' 
                            onclick="location.href='./post.html#${post.id}'">Read more</button>
                        </div>
                    </div>
                `;
                return true;
            });
        });
}

function image(type, post) {
    if(type !== 'texted') {
        return `<div class='blog-post__img col-6'><img alt='img' style='height: 101%' src='${post.linkText}'></div>`;
    } else {
        return ``;
    }
}

function audio(type) {
    if(type === 'audioted') {
        return `<audio class='blog-post__audio' controls>
                                <source src='#' type='audio/mpeg'>
                                Your browser does not support the audio element.
               </audio>`;
    } else {
        return ``;
    }
}

function undecorText(text) {
    while (~text.indexOf('+*')) {
        text = text.replace('+*', '');
    }
    while (~text.indexOf('*+')) {
        text = text.replace('*+', '');
    }
    while (~text.indexOf('-*')) {
        text = text.replace('-*', '');
    }
    while (~text.indexOf('*-')) {
        text = text.replace('*-', '');
    }
    while (~text.indexOf('###')) {
        text = text.replace('###', '');
    }
    return text;
}
