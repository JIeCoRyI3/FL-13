function Slider(sliderBlockSelector, leftBtnSelector, rightBtnSelector, cardSelector) {
    this._sliderBlock = document.querySelector(sliderBlockSelector);
    this._counter = 0;
    this._timer = null;
    this._prevButton = document.querySelector(leftBtnSelector);
    this._nextButton = document.querySelector(rightBtnSelector);
    this._elementWidth = this._sliderBlock.childNodes[1].offsetWidth;
    this._countOfElements = Array.from(document.querySelectorAll(cardSelector)).length;
    this._x = null;

    this.addHoverEvent = () => {
        this._sliderBlock.addEventListener('mouseenter', () => {
            clearInterval(this._timer);
        });

        this._sliderBlock.addEventListener('mouseleave', () => {
            this.start();
        });

        this._sliderBlock.addEventListener('mousedown', (e) => {
            clearInterval(this._timer);
            this._x = e.clientX;
        });

        this._sliderBlock.addEventListener('mouseup', (e) => {
            if(this._x > e.clientX) {
                this.swapNext();
            } else {
                this.swapPrev();
            }
        });
    };

    this.start = () => {
        this._timer = setInterval(this.swapNext, 3000);
    };

    this.swapNext = () => {
        if(this._counter >= this._countOfElements - 1) {
            return;
        }
        this._counter++;
        this._sliderBlock.style.transition = 'transform 0.7s ease-in-out';
        this.swap();
    };

    this.swapPrev = () => {
        if(this._counter <= -2) {
            return;
        }
        this._counter--;
        this._sliderBlock.style.transition = 'transform 0.7s ease-in-out';
        this.swap();
    };

    this.makeChildren = () => {
        let firstCopy = this._sliderBlock.childNodes[1].cloneNode(true);
        let centerCopy = this._sliderBlock.childNodes[3].cloneNode(true);
        let secondCenterCopy = this._sliderBlock.childNodes[this._sliderBlock.childNodes.length - 4].cloneNode(true);
        let lastCopy = this._sliderBlock.childNodes[this._sliderBlock.childNodes.length - 2].cloneNode(true);
        firstCopy.id = 'fc';
        lastCopy.id = 'lc';
        this._sliderBlock.insertBefore(firstCopy, this._sliderBlock.children[this._sliderBlock.children.length]);
        this._sliderBlock.insertBefore(lastCopy, this._sliderBlock.children[0]);
        this._sliderBlock.insertBefore(centerCopy, this._sliderBlock.children[this._sliderBlock.children.length]);
        this._sliderBlock.insertBefore(secondCenterCopy, this._sliderBlock.children[0]);
        document.querySelectorAll(cardSelector).forEach((block) => {
            block.style.transform = `translateX(-${this._elementWidth*2}px)`;
        });
    };

    this.addListener = () => {
        this._sliderBlock.addEventListener('transitionend', (e) => {
            if(e.target.tagName === 'DIV') {
                return;
            }
            let data = Array.from(document.querySelectorAll(cardSelector));
            if(data[this._counter + 3].id === 'lc') {
                this._sliderBlock.style.transition = 'none';
                this._counter = this._countOfElements - 2;
                this.swap();
            }

            if(data[this._counter + 3].id === 'fc') {
                this._sliderBlock.style.transition = 'none';
                this._counter = -1;
                this.swap();
            }
        });
    };

    this.swap = () => {
        this._sliderBlock.style.transform = `translateX(${-this._elementWidth * this._counter}px)`;
    };

    this._prevButton.addEventListener('click', () => {
        clearInterval(this._timer);
        this.swapPrev();
        this.start();
    });
    this._nextButton.addEventListener('click', () => {
        clearInterval(this._timer);
        this.swapNext();
        this.start();
    });
    this.addHoverEvent();
}

function MonoSlider(sliderBlockSelector, leftBtnSelector, rightBtnSelector, cardSelector) {
    Slider.apply(this, arguments);

    this.makeChildren = () => {
        let firstCopy = this._sliderBlock.childNodes[1].cloneNode(true);
        let lastCopy = this._sliderBlock.childNodes[this._sliderBlock.childNodes.length - 2].cloneNode(true);
        firstCopy.id = 'fc';
        lastCopy.id = 'lc';
        this._sliderBlock.insertBefore(firstCopy, this._sliderBlock.children[this._sliderBlock.children.length]);
        this._sliderBlock.insertBefore(lastCopy, this._sliderBlock.children[0]);
        document.querySelectorAll(cardSelector).forEach((block) => {
            block.style.transform = `translateX(-${this._elementWidth}px)`;
        });
    };

    this.swapNext = () => {
        if(this._counter >= this._countOfElements) {
            return;
        }
        this._counter++;
        this._sliderBlock.style.transition = 'transform 1s ease-in-out';
        this.swap();
    };

    this.swapPrev = () => {
        if(this._counter <= -1) {
            return;
        }
        this._counter--;
        this._sliderBlock.style.transition = 'transform 1s ease-in-out';
        this.swap();
    };

    this.addListener = () => {
        this._sliderBlock.addEventListener('transitionend', () => {
            let data = Array.from(document.querySelectorAll(cardSelector));
            if(data[this._counter + 1].id === 'lc') {
                this._sliderBlock.style.transition = 'none';
                this._counter = this._countOfElements - 1;
                this.swap();
            }

            if(data[this._counter + 1].id === 'fc') {
                this._sliderBlock.style.transition = 'none';
                this._counter = 0;
                this.swap();
            }
        });
    };
}

let slider = new Slider('#portfolio .block__content', '.sl-left', '.sl-right', '.slider-card');
let slider2 = new MonoSlider('.block__ph-slider-child', '.sl-left-2', '.sl-right-2', '.mono-slider-card');
slider.makeChildren();
slider.addListener();
slider.start();
slider2.makeChildren();
slider2.addListener();
slider2.start();
