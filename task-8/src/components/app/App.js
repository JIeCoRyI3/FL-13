import React from 'react';
import styles from './App.module.css';
import StarMark from "../star-mark";
import MoviePage from "../movie-page";
import store from './store.js';
import { connect } from 'react-redux';

class App extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  api = 'https://gist.githubusercontent.com/Yuriy1988/d2d2f23467f12f43d0128718bdd7c9ab/raw/75f10839adcb3605e2af7563b8351bb277997b26/moviesForStudents.json';

  fetchData = () => {
    fetch(this.api).then((res) => {
        return res.json();
    }).then(body => {
        store.dispatch({ type: 'LOAD_DATA', payload: body });
    })
  };

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
    return (
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <h3 onClick={this.filterByRating}>filter by rating</h3>
            <h3 onClick={this.filterByLikes}>filter by likes</h3>
            <input id="search" onChange={this.search}/>
          </div>
          <div className={styles.grid}>
         {this.props.movies.map((movie, index) => {
           return (
               <div key={index+'cardId'} className={styles.card}>
                 <div className={styles.movieShortInfo}>
                   <div className={styles.title} onClick={this.detailInfo(index)}>{movie.title}</div>
                   <div className={styles.likeBar}>
                     <i className="fas fa-thumbs-up" onClick={this.like(movie)} style={{color: "green"}}></i>
                     <i className="fas fa-thumbs-down" onClick={this.dislike(movie)} style={{color: "red"}}></i>
                     <p>Likes: {movie.likes}</p>
                   </div>
                   <div className={styles.image} style={{backgroundImage: `url(${movie.posterUrl})`}} />
                 </div>
                 <StarMark unique={index}  key={index+"starID"}/>
               </div>
               );
         })}
          </div>
          <MoviePage/>
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
    movies: searchData,
    selectedMovie: state.selectedMovie,
    byRating: state.byRating,
    byLikes: state.byLikes,
    filter: state.filter
  };
};

export default connect(mapStateToProps)(App);
