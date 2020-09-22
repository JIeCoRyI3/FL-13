import React from 'react';
import styles from './MoviePage.module.css';
import {connect} from "react-redux";
import {List} from "immutable";

class MoviePage extends React.Component {

    render() {
      if(this.props.selectedMovie === null || !this.props.movies.size) {
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
                <h5>Description: {this.props.movies._tail.array[this.props.selectedMovie].description}</h5>
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

const mapStateToProps = (state) => {
    const searchData = filterSelector(state);
    return {
        selectedMovie: state.selectedMovie,
        movies: List(searchData),
    };
};

export default connect(mapStateToProps)(MoviePage);
