import React from 'react';
import styles from './MoviePage.module.css';
import {connect} from "react-redux";
import {List} from "immutable";
import store from "../app/store";
import {Link} from "react-router-dom";

class MoviePage extends React.Component {

    deleteMovie = () => {
        const answer = window.confirm('Are you sure you want delete movie?');
        if(answer) {
            store.dispatch( { type: 'DELETE_MOVIE', payload: { index: this.props.movies._tail.array[this.props.selectedMovie].id }});
            store.dispatch({ type: 'SELECT_MOVIE', payload: { selectedMovie: 'non-movie' } });
            window.history.back();
        }
    };

    render() {
      if(this.props.selectedMovie === 'non-movie' || !this.props.movies.size) {
          return <h2>Select a film</h2>
      }
    return (
        <div className={styles.info}>
            <div>
                <div>Likes: {this.props.movies._tail.array[this.props.selectedMovie].likes}</div>
                <div>Stars: {this.props.movies._tail.array[this.props.selectedMovie].stars}</div>
            </div>
            <div>
                <h5>Title: {this.props.movies._tail.array[this.props.selectedMovie].title}</h5>
                <img alt="film poster" src={this.props.movies._tail.array[this.props.selectedMovie].posterUrl}/>
                <h5>Director: {this.props.movies._tail.array[this.props.selectedMovie].director}</h5>
                <h5 className={styles.actors}>Actors: {this.props.actors.map((actor, i) => (<Link key={i} to={`/actor${actor.id}`}>{actor.name}</Link>))}</h5>
                <h5>Description: {this.props.movies._tail.array[this.props.selectedMovie].description}</h5>
            </div>
            <div className={styles.btns}>
                <Link to='/edit-movie' className='btn btn-success'>Edit</Link>
                <button className='btn btn-danger' onClick={this.deleteMovie}>Delete</button>
            </div>
        </div>
    )
  }
}

const filterSelector = (state) => {
    return state.movies.filter(movie => {
        return movie.title.toLowerCase().includes(state.filter.toLowerCase());
    });
};

const filterActors = (state) => {
    if(state.selectedMovie === 'non-movie') return;
    const searchData = List(filterSelector(state));
    return state.actors.filter(actor => {
        return searchData._tail.array[state.selectedMovie].actorsIds.includes(actor.id);
    });
};

const mapStateToProps = (state) => {
    const searchData = filterSelector(state);
    const movieActors = filterActors(state);
    return {
        selectedMovie: state.selectedMovie,
        movies: List(searchData),
        actors: List(movieActors),
    };
};

export default connect(mapStateToProps)(MoviePage);
