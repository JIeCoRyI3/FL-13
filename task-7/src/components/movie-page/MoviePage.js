import React from 'react';
import styles from './MoviePage.module.css';

class MoviePage extends React.Component {

    state = {
        movie: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            this.updateItem();
        }
    }

    updateItem = () => {
        this.setState({
            movie: this.props.item
        });
    };

    render() {
      if(!this.state.movie) {
          return <h2>Select a film</h2>
      }

    return (
        <div className={styles.info}>
            <div>
                <div>Likes: {this.state.movie.likes}</div>
                <div>Stars: {this.state.movie.stars}</div>
            </div>
            <div>
                <h5>Title: {this.state.movie.title}</h5>
                <img alt="film poster" src={this.state.movie.posterUrl}/>
                <h5>Director: {this.state.movie.director}</h5>
                <h5>Description: {this.state.movie.description}</h5>
            </div>
        </div>
    )
  }
}

export default MoviePage;
