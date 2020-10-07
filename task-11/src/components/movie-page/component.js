import React from 'react';
import styles from './component.module.css';
import {Link} from "react-router-dom";

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
        const { selectedMovie, labels } = this.props;
        const actors = this.props.actors.map((actor, i) => (
            <Link key={i} to={`/actor/${actor.id}`}>{actor.name}</Link>
        ));

        if(selectedMovie === 'non-movie' || !selectedMovie) {
          return <h2>{labels.SELECT_FILM}</h2>
        } else {
          return (
              <div className={styles.info}>
                  <div>
                      <div>{labels.LIKES}: {selectedMovie.likes}</div>
                      <div>{labels.STARS}: {selectedMovie.stars}</div>
                  </div>
                  <div>
                      <h5>{labels.TITLE}: {selectedMovie.title}</h5>
                      <img alt="film poster" src={selectedMovie.posterUrl}/>
                      <h5>{labels.DIRECTOR}: {selectedMovie.director}</h5>
                      <h5 className={styles.actors}>{labels.ACTORS}: {actors}</h5>
                      <h5>{labels.DESCRIPTION}: {selectedMovie.description}</h5>
                  </div>
                  <div className={styles.btns}>
                      <Link to='/edit-movie' className='btn btn-success'>{labels.EDIT}</Link>
                      <button className='btn btn-danger' onClick={this.deleteMovie}>{labels.DELETE}</button>
                  </div>
              </div>
          )
        }
  }
}

export default MoviePage;
