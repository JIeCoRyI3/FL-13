import React from 'react';
import styles from './StarMark.module.css';
import { connect } from "react-redux";
import { rate } from "./actions";

class StarMark extends React.Component {

    componentDidMount() {
        this.addLogic();
    }

    rate = (rating) => {
        this.props.rate(rating, this.props.index);
        const uniqueStars = document.querySelector(`.k${this.props.index}`);
        const stars = uniqueStars.querySelectorAll('.fa-star');
        stars.forEach((star, index) => {
            if(index < this.props.stars) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
        this.addLogic();
    };

    addLogic = () => {
        const uniqueStars = document.querySelector(`.k${this.props.index}`);
        const stars = uniqueStars.querySelectorAll('.fa-star');
        stars.forEach((star, index) => {
            const handler = () => {
                if(index > uniqueStars.querySelectorAll('.fas').length - 1) {
                    for(let i = 0; i < index + 1; i++) {
                        stars[i].classList.remove('far');
                        stars[i].classList.add('fas');}
                } else {
                    for(let i = index + 1; i < stars.length; i++) {
                        stars[i].classList.remove('fas');
                        stars[i].classList.add('far');}
                }
                const rating = index + 1;
                this.rate(rating);
            };
            star.onclick = null;
            star.onclick = handler;
        })
    };

    renderFieldStars = () => {
        return [...new Array(this.props.stars)].map((star, i) => {
            return <i className='fas fa-star' key={i}></i>
        });
    };

    renderEmptyStars = () => {
        return [...new Array(5 - this.props.stars)].map((star, i) => {
            return <i className='far fa-star' key={i}></i>
        });
    };

    render() {
        return (
            <div className={styles.starContainer + ` k${this.props.index}`}>
                {this.renderFieldStars()}
                {this.renderEmptyStars()}
            </div>
        )
  }
}

const mapDispatchToProps = {
    rate,
};

const withStore = connect(null, mapDispatchToProps);

export default withStore(StarMark);
