import React from 'react';
import styles from './EditPage.module.css';
import {connect} from "react-redux";
import {List} from "immutable";
import store from "../app/store";
import {Link, Redirect} from 'react-router-dom';

class EditPage extends React.Component {
    editMovie = () => {
        const title = document.getElementById('title').value;
        const director = document.getElementById('director').value;
        const description = document.getElementById('description').value;
        store.dispatch({
            type: 'EDIT_MOVIE',
            payload: {
                index: this.props.movies._tail.array[this.props.selectedMovie].id,
                data: {
                    title,
                    director,
                    description
                }
            }})
    };

    render() {
      if(this.props.selectedMovie === 'non-movie' || !this.props.movies.size) {
          return <Redirect to='/homepage'/>;
      }
    return (
        <div className={styles.info}>
            <label htmlFor='title'>Title:</label>
            <input id='title' defaultValue={this.props.movies._tail.array[this.props.selectedMovie].title}/>
            <label htmlFor='director'>Director:</label>
            <input id='director' defaultValue={this.props.movies._tail.array[this.props.selectedMovie].director}/>
            <label htmlFor='description'>Description:</label>
            <textarea id='description' defaultValue={this.props.movies._tail.array[this.props.selectedMovie].description}/>
            <Link to='/homepage'><button className='btn btn-success' onClick={this.editMovie}>Save changes</button></Link>
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

export default connect(mapStateToProps)(EditPage);
