import React from 'react';
import styles from './MoviePage.module.css';
import {connect} from "react-redux";
import {List} from "immutable";
import {Link} from "react-router-dom";
import { filterActors, filterSelector } from "./selectors";
import { selectNonMovie, deleteMovie } from "./actions";

class MoviePage extends React.Component {

    deleteMovie = () => {
        const answer = window.confirm('Are you sure you want delete movie?');
        if(answer) {
            this.props.deleteMovie(this.props.selectedMovie.id);
            this.props.selectNonMovie();
            window.history.back();
        }
    };

    render() {
        const { selectedMovie } = this.props;
        const actors = this.props.actors.map((actor, i) => (
            <Link key={i} to={`/actor/${actor.id}`}>{actor.name}</Link>
        ));

        if(selectedMovie === 'non-movie' || !selectedMovie) {
          return <h2>Select a film</h2>
        } else {
          return (
              <div className={styles.info}>
                  <div>
                      <div>Likes: {selectedMovie.likes}</div>
                      <div>Stars: {selectedMovie.stars}</div>
                  </div>
                  <div>
                      <h5>Title: {selectedMovie.title}</h5>
                      <img alt="film poster" src={selectedMovie.posterUrl}/>
                      <h5>Director: {selectedMovie.director}</h5>
                      <h5 className={styles.actors}>Actors: {actors}</h5>
                      <h5>Description: {selectedMovie.description}</h5>
                  </div>
                  <div className={styles.btns}>
                      <Link to='/edit-movie' className='btn btn-success'>Edit</Link>
                      <button className='btn btn-danger' onClick={this.deleteMovie}>Delete</button>
                  </div>
              </div>
          )
        }
  }
}

const mapStateToProps = (state) => {
    const searchData = filterSelector(state);
    const movieActors = filterActors(state);
    return {
        selectedMovie: searchData.toJS()[state.selectedMovie],
        actors: List(movieActors),
    };
};

const mapDispatchToProps = {
    deleteMovie,
    selectNonMovie,
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(MoviePage);
