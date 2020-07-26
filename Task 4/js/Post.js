class Post {
    postType = 'texted';
    constructor ({ postTitle, postText, postAuthor }) {
        this.postTitle = postTitle;
        this.postText = postText;
        this.postDate = new Date();
        this.postAuthor = postAuthor;
        Post.instances.push(this);
    }

    createBaseStructure() {
        return `<div class="blog-post__corner"></div>
    <div class="blog-post__right-container">
        <div class="blog-post__head">
            <img alt="img" class="blog-post__avatar" src="${this.postAuthor.imgLink}">
            <div class="blog-post__title">
                <h2 class="blog-post__name">${this.postAuthor.name}</h2>
                <div class="bcard__flex-comments">
                    <div class="bcard__date">${this.getDate()}</div>
                    <div class="bcard__splitter">•</div>
                    <div class="bcard__reads">17 min read</div>
                    <div class="bcard__splitter">•</div>
                    <div class="bcard__comments"><img alt="comment" src="img/icon/a-icon-comment.svg">77</div>
                    <div class="blog-post__stars">
                        <img alt="img" src="img/Star.svg">
                        <img alt="img" src="img/Star.svg">
                        <img alt="img" src="img/Star.svg">
                        <img alt="img" src="img/Star-1.svg">
                        <img alt="img" src="img/Star-1.svg">
                    </div>
                </div>
            </div>

        </div>
        <h2 class="blog-post__article">${this.postTitle}</h2>
        ${this.audio || ''}
        <p class="blog-post__text">${this.postText}</p>
        <button class="blog-post__button but-1" onclick="location.href='./post.html'">Read more</button>
                </div>`;
    }

    createPost() {
        let newPost = document.createElement('div');
        newPost.classList.add('block__blog-post', 'blog-post', `blog-post--${this.postType}`, 'row');
        newPost.innerHTML = this.createBaseStructure();
        return newPost;
    }

    render() {
        document.querySelector('.block__wrapper')
            .insertBefore(this.createPost(),
            document.querySelector('.block__wrapper').children[2]);
    }

    getDate = () => {
        const monthNames = ['jan', 'feb', 'mar', 'apr', 'mar', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
        ];
        let day = this.postDate.getDate() < 10? '0' + this.postDate.getDate() : this.postDate.getDate();
        return `${day} ${monthNames[this.postDate.getMonth()]}, ${this.postDate.getFullYear()}`;
    }
}

Post.instances = [];

class VideoPost extends Post {
    postType = 'videoted';
    constructor(postData) {
        super(postData);
        this.imgLink = postData.postImgLink;
    }

    createPost() {
        let newPost = super.createPost();
        let image = document.createElement('div');
        image.classList.add('blog-post__img', 'col-6');
        image.innerHTML = `<img alt="img" src="${this.imgLink}">`;
        newPost.insertBefore(image, newPost.children[1]);
        return newPost;
    }
}

class AudioPost extends Post {
    postType = 'audioted';
    constructor(postData) {
        super(postData);
        this.imgLink = postData.postImgLink;
        this.audio = `<audio class="blog-post__audio" controls>
                                <source src="#" type="audio/mpeg">
                                Your browser does not support the audio element.
                      </audio>`;
    }

    createPost() {
        let newPost = super.createPost();
        let image = document.createElement('div');
        image.classList.add('blog-post__img', 'col-6');
        image.innerHTML = `<img alt="img" src="${this.imgLink}">`;
        newPost.insertBefore(image, newPost.children[1]);
        return newPost;
    }
}

class ImagePost extends VideoPost {
    postType = 'imgoted';
}

new AudioPost({
    postTitle: 'Gdfgd asd a asd afgdfg',
    postText: 'asdad asd a  asdas d as d as das da sd fsd sdf sdf sd fsd fsd s',
    postAuthor: {
        name: ' ASD as das',
        imgLink: 'img/Grace.png'
    },
    postImgLink: 'img/Img%20post%202.png'
});

new ImagePost({
    postTitle: 'Gdfgdfgdfgdfg',
    postText: 'ddsf sdf sd fsd sdfsd fsd fsd fsd fsd fsdf ' +
        'sd fsdf ds sdf sd fsd sdf sdf sd fsd fsd s',
    postAuthor: {
        name: 'Fdfs sdfsd',
        imgLink: 'img/Neil.png'
    },
    postImgLink: 'img/Img%20post%201.png'
});

new VideoPost({
    postTitle: 'Gdfgasd as dafg',
    postText: 'ddsf sdf as dasasd asd asadas dsa dasdsad ' +
        'asd asd sad sdfsd fsdas das  s',
    postAuthor: {
        name: 'Fdfs sdfsd',
        imgLink: 'img/Neil.png'
    },
    postImgLink: 'img/Img%20post%203.png'
});

new Post({
    postTitle: 'ASdsads fg',
    postText: 'ddsasd as asd asdsa dasdas dasdas d asd as d asdasd as das  ' +
        'das das das d asd asd as dasd sdfsd fsd fsd fsd fsd fsdf sd fsdf ' +
        'ds sdf sd fsd sdf sdf sd fsd fsd s',
    postAuthor: {
        name: 'Fdfs sdfsd',
        imgLink: 'img/Neil.png'
    }
});

function renderAllPosts(posts) {
    posts.forEach((post) => {
        post.render();
    });
}

renderAllPosts(Post.instances);
