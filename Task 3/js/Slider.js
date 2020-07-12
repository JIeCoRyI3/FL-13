class Slider {
    constructor() {
        this.sliderBlock = document.querySelector('#portfolio .block__content');
        this.counter = 0;
        this.makeChildren();
        this.addListener();
    }

    swapNext = () => {
        if(this.counter >= 2) {
            return;
        }
        this.counter++;
        this.sliderBlock.style.transition = 'transform 0.7s ease-in-out';
        this.swap();
    };

    swapPrev = () => {
        if(this.counter <= -2) {
            return;
        }
        this.counter--;
        this.sliderBlock.style.transition = 'transform 0.7s ease-in-out';
        this.swap();
    };

    makeChildren = () => {
        let firstCopy = this.sliderBlock.childNodes[1].cloneNode(true);
        let centerCopy = this.sliderBlock.childNodes[3].cloneNode(true);
        let secondCenterCopy = this.sliderBlock.childNodes[3].cloneNode(true);
        let lastCopy = this.sliderBlock.childNodes[this.sliderBlock.childNodes.length - 2].cloneNode(true);
        firstCopy.id = 'fc';
        lastCopy.id = 'lc';
        this.sliderBlock.insertBefore(firstCopy, this.sliderBlock.children[this.sliderBlock.children.length]);
        this.sliderBlock.insertBefore(lastCopy, this.sliderBlock.children[0]);
        this.sliderBlock.insertBefore(centerCopy, this.sliderBlock.children[this.sliderBlock.children.length]);
        this.sliderBlock.insertBefore(secondCenterCopy, this.sliderBlock.children[0]);
        document.querySelectorAll('.slider-card').forEach((block) => {
            block.style.transform = 'translateX(-800px)';
        });
    };

    addListener = () => {
        this.sliderBlock.addEventListener('transitionend', (e) => {
            if(e.target.tagName === 'DIV') {
                return;
            }
            let data = Array.from(document.querySelectorAll('.slider-card'));
            if(data[this.counter + 3].id === 'lc') {
                this.sliderBlock.style.transition = 'none';
                this.counter = 1;
                this.swap();
            }

            if(data[this.counter + 3].id === 'fc') {
                this.sliderBlock.style.transition = 'none';
                this.counter = -1;
                this.swap();
            }
        });
    };

    swap = () => {
        this.sliderBlock.style.transform = `translateX(${-400 * this.counter}px)`;
    };
}

class ClickableSlider extends Slider {
    constructor(){
        super();
        this.prevButton = document.querySelector('.sl-left');
        this.nextButton = document.querySelector('.sl-right');
        this.prevButton.addEventListener('click', this.swapPrev);
        this.nextButton.addEventListener('click', this.swapNext);
    }
}

class InfinitySlider extends Slider {
    constructor(){
        super();
        this.timer = null;
        this.addHoverEvent();
    }

    addHoverEvent = () => {
        this.sliderBlock.addEventListener('mouseenter', () => {
            clearInterval(this.timer);
        });

        this.sliderBlock.addEventListener('mouseleave', () => {
            this.start();
        });
    };

    start = () => {
        this.timer = setInterval(this.swapNext, 3000);
    }
}

class MultiSlider extends InfinitySlider {
    constructor(){
        super();
        this.prevButton = document.querySelector('.sl-left');
        this.nextButton = document.querySelector('.sl-right');
        this.prevButton.addEventListener('click', () => {
            clearInterval(this.timer);
            this.swapPrev();
            this.start();
        });
        this.nextButton.addEventListener('click', () => {
            clearInterval(this.timer);
            this.swapNext();
            this.start();
        });
    }
}

let slider = new MultiSlider();
slider.start();
console.log(ClickableSlider); //  for fix eslint not-used-error
//  let slider = new ClickableSlider(); for just clickable slider
//  let slider = new InfinitySlider(); for just infinity swapping slider
