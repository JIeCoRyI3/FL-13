import React from 'react';
import styles from './EditPage.module.css';
import {connect} from "react-redux";
import {List} from "immutable";
import store from "../app/store";
import {Link, Redirect} from 'react-router-dom';
import {withTranslation} from "../../hocs/withTranslation";
import { Form, Field } from 'react-final-form';

class EditPage extends React.Component {
    editMovie = (values) => () => {
        const {title, director, description} = values;
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
        const {labels} = this.props;
        const { title, director, description } = this.props.movies.toJS()[this.props.selectedMovie];

      if(this.props.selectedMovie === 'non-movie' || !this.props.movies.size) {
          return <Redirect to='/homepage'/>;
      } else {
          return (
              <Form
                  onSubmit={this.editMovie}
                  initialValues={{
                      title,
                      director,
                      description
                  }}
                  render={({ handleSubmit, values }) => (
                      <form className={styles.info} onSubmit={handleSubmit}>
                          <label htmlFor='title'>{labels.TITLE}:</label>
                          <Field
                              name="title"
                              component="input"
                              type="text"
                              placeholder={labels.TITLE}
                          />
                          <label htmlFor='director'>{labels.DIRECTOR}:</label>
                          <Field
                              name="director"
                              component="input"
                              type="text"
                              placeholder={labels.DIRECTOR}
                          />
                          <label htmlFor='description'>{labels.DESCRIPTION}:</label>
                          <Field
                              name="description"
                              component="textarea"
                              type="text"
                              placeholder={labels.DESCRIPTION}
                          />
                          <Link to='/homepage'><button className='btn btn-success' onClick={this.editMovie(values)}>{labels.SAVE_CHANGES}</button></Link>
                      </form>
                  )}
              />
          )
      }
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

export default withTranslation(connect(mapStateToProps)(EditPage));
