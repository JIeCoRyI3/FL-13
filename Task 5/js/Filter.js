const data = [
    {
        name: 'Roman Jion',
        articles: [
            {
                title: 'S sada asdasd a',
                text: 'asdas asd as d adasdasd asd asdasd asdasd a ' +
                    'asd as da ds asdas d asd asd as das adas das da das das ' +
                    'das da sdasd asd asd asd a das da'
            },
            {
                title: 'D sadas ad as',
                text: 'aasdaasdassd asdasd as dasd as a a ' +
                    'das zs asdas das asas  d sdsa das asdasasdsad sad ' +
                    'dsd sdasdsad daasdassadsadas  dasd asd asdasd asd asdaa'
            },
            {
                title: 'Ffdf dfs sf',
                text: 'aasdasd asdasd asdasd a ' +
                    'asd as da ds asasdassd as das adas das da das das ' +
                    'das da sdasasdad asd a das da'
            }
        ]
    },
    {
        name: 'Egor Shalin',
        articles: [
            {
                title: 'Dasd asd a asd da d asd a',
                text: 'asdaasdasdad asdasd asdasd a ' +
                    'asd as da ds asdasasdasd asd as das adas das da das das ' +
                    'das da sdaasdsd asd asd a das da'
            },
            {
                title: 'Trte er er ertert re ',
                text: 'aasdasdasdqwewqsdasd as dasd as a a ' +
                    'das zs d gjfdg sdsa das asdasasdsad sad ' +
                    'dsd sdasdsad dgfd sad as dsadsadas  dasd asd asdasd asd asdaa'
            },
            {
                title: 'Ffds df  dhfddsf ',
                text: 'asdas asd asqweasdasd asd asdasd asdasd a ' +
                    'asd as da ds asdas d asd asd as das adas das da das das ' +
                    'das da sdasd asd kjhas da'
            }
        ]
    },
    {
        name: 'Kirill Shelipov',
        articles: [
            {
                title: 'Dsad as da sdasda ',
                text: 'asdas asd as d adasdasd asd asdasd asdasd a ' +
                    'asd as da ds aqwed asd asd as das adas das da das das ' +
                    'das da sdasd asd asd asd a das da'
            },
            {
                title: 'Fggf df df as asd  f',
                text: 'aasdasdasdafghasas  d sdsa das asdasasdsad sad ' +
                    'dsd sdasdsad da sd sad as dsadsadas  dasd asd asdasd asd asdaa'
            },
            {
                title: 'Wof  asd gasd dqw',
                text: 'asdas asd as d adasdasd asd asdasd asdasd a ' +
                    'asd as da ds awre asd asd as das adas das da das das ' +
                    'das da sdasd asd asd asd a das da'
            }
        ]
    }
];

const bar1 = document.querySelector('.horizontal-bar');
const bar2 = document.querySelector('.right-side');

data.forEach((author) => {
    let postNames = '';
    author.articles.forEach(article => {
        postNames += `<div class="side__article">${article.title}</div>`;
    });
    bar1.innerHTML += `<div class="horizontal-bar__author non-active-article">
                            ${author.name}
                             <nav class="left-side__articles">
                                ${postNames}
                            </nav>
                        </div>`;
    bar2.innerHTML += `<div class="right-side__author non-active-article">
                            ${author.name}
                            <nav class="right-side__articles">
                                ${postNames}
                            </nav>
                        </div>`;
});

