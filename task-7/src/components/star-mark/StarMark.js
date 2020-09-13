import React from 'react';
import styles from './StarMark.module.css';

class StarMark extends React.Component {

    componentDidMount() {
        if (this.props.canChange) this.addLogic();
        this.rate(this.props.rating);
    }

    componentDidUpdate(prevProps) {
        if (this.props.rating !== prevProps.rating) {
            this.rate(this.props.rating);
        }
    }

    rate = (rating) => {
        const uniqueStars = document.querySelector(`.k${this.props.unique}`);
        const stars = uniqueStars.querySelectorAll('.fa-star');
        for(let i = 0; i < rating; i++) {
            stars[i].classList.remove('far');
            stars[i].classList.add('fas');
        }
        if(this.props.rate) this.props.rate(rating, this.props.unique);
    };

    addLogic = () => {
        const uniqueStars = document.querySelector(`.k${this.props.unique}`);
        const stars = uniqueStars.querySelectorAll('.fa-star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                if(index > uniqueStars.querySelectorAll('.fas').length - 1) {
                    for(let i = 0; i < index + 1; i++) {
                        stars[i].classList.remove('far');
                        stars[i].classList.add('fas');}
                } else {
                    for(let i = index + 1; i < stars.length; i++) {
                        stars[i].classList.remove('fas');
                        stars[i].classList.add('far');}
                }
                const rating = uniqueStars.querySelectorAll('.fas').length;
                this.rate(rating);
            })
        })
    };

  render() {
    return (
        <div className={styles.starContainer + ` k${this.props.unique}`}>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='far fa-star'></i>
            <i className='far fa-star'></i>
            <i className='far fa-star'></i>
        </div>
    )
  }
}

export default StarMark;
