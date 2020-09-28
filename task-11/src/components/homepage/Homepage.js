import React from 'react';
import styles from './Homepage.module.css';
import StarMark from "../star-mark";
import store from "../app/store";
import { Link } from "react-router-dom";

class Homepage extends React.Component {

  detailInfo = (index) => () => {
    store.dispatch({ type: 'SELECT_MOVIE', payload: { selectedMovie: index } });
  };

  like = (movie) => () => {
    const index = store.getState().movies.findIndex((movies) => movies === movie);
    store.dispatch({ type: 'LIKE', payload: { index: index } });
  };

  dislike = (movie) => () => {
    const index = store.getState().movies.findIndex((movies) => movies === movie);
    store.dispatch({ type: 'DISLIKE', payload: { index: index } });
  };

  filterByRating = () => {
    store.dispatch({ type: 'FILTER_BY_RATING'});
  };

  filterByLikes = () => {
    store.dispatch({ type: 'FILTER_BY_LIKES'});
  };

  search = () => {
    store.dispatch({ type: 'FILTER_BY_SEARCH', payload: { filter: document.getElementById('search').value } });
  };

  render() {
    const {labels} = this.props;
    return (
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <h3 onClick={this.filterByRating}>{labels.filterByRating}</h3>
            <h3 onClick={this.filterByLikes}>{labels.filterByLikes}</h3>
            <input className={styles.search} id="search" placeholder={`${labels.search}...`} onChange={this.search}/>
          </div>
          <div className={styles.grid}>
            {this.props.movies.map((movie, index) => {
              return (
                  <div key={index+'cardId'} className={styles.card}>
                    <div className={styles.movieShortInfo}>
                      <Link to='movie'><div className={styles.title} onClick={this.detailInfo(index)}>{movie.title}</div></Link>
                      <div className={styles.likeBar}>
                        <i className="fas fa-thumbs-up" onClick={this.like(movie)} style={{color: "green"}}></i>
                        <i className="fas fa-thumbs-down" onClick={this.dislike(movie)} style={{color: "red"}}></i>
                        <p>{labels.likes}: {movie.likes}</p>
                      </div>
                      <div className={styles.image} style={{backgroundImage: `url(${movie.posterUrl})`}} />
                    </div>
                    <StarMark index={movie.id} stars={movie.stars} key={index}/>
                  </div>
              );
            })}
          </div>
        </div>
    )
  }
}

export default Homepage;
