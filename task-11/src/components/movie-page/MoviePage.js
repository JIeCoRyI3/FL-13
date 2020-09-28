import React from 'react';
import styles from './MoviePage.module.css';
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
          return <h2>{labels.selectFilm}</h2>
        } else {
          return (
              <div className={styles.info}>
                  <div>
                      <div>{labels.likes}: {selectedMovie.likes}</div>
                      <div>{labels.stars}: {selectedMovie.stars}</div>
                  </div>
                  <div>
                      <h5>{labels.title}: {selectedMovie.title}</h5>
                      <img alt="film poster" src={selectedMovie.posterUrl}/>
                      <h5>{labels.director}: {selectedMovie.director}</h5>
                      <h5 className={styles.actors}>{labels.actors}: {actors}</h5>
                      <h5>{labels.description}: {selectedMovie.description}</h5>
                  </div>
                  <div className={styles.btns}>
                      <Link to='/edit-movie' className='btn btn-success'>{labels.edit}</Link>
                      <button className='btn btn-danger' onClick={this.deleteMovie}>{labels.delete}</button>
                  </div>
              </div>
          )
        }
  }
}

export default MoviePage;
