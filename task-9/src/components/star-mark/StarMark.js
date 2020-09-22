import React from 'react';
import styles from './StarMark.module.css';
import store from "../app/store";
import {connect} from "react-redux";
import {List} from "immutable";

class StarMark extends React.Component {

    componentDidMount() {
        this.addLogic();
    }

    rate = (rating) => {
        store.dispatch({
            type: 'RATE',
            payload: {
                index: this.props.unique,
                stars: rating
            }
        });
        const uniqueStars = document.querySelector(`.k${this.props.unique}`);
        const stars = uniqueStars.querySelectorAll('.fa-star');
        stars.forEach((star, index) => {
            if(index < this.props.movies._tail.array[this.props.unique].stars) {
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
        const uniqueStars = document.querySelector(`.k${this.props.unique}`);
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

    render() {
      let fieldStars = [];
      let emptyStars = [];

      for(let i = 0; i < this.props.movies._tail.array[this.props.unique].stars; i++){
          fieldStars.push(<i className='fas fa-star' key={i}></i>);
      }

      for(let i = 0; i < 5 - this.props.movies._tail.array[this.props.unique].stars; i++){
          emptyStars.push(<i className='far fa-star' key={i}></i>);
      }
    return (
        <div className={styles.starContainer + ` k${this.props.unique}`}>
            {fieldStars.map(star => star)}
            {emptyStars.map(star => star)}
        </div>
    )
  }
}

const filterSelector = (state) => {
    return state.movies.filter(movie => {
        return movie.title.toLowerCase().includes(state.filter.toLowerCase());
    });
};

const mapStateToProps = (state) => {
    const searchData = filterSelector(state);
    return {
        movies: List(searchData)
    };
};

export default connect(mapStateToProps)(StarMark);
