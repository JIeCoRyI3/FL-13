import React from 'react';
import styles from './App.module.css';
import MoviePage from "../movie-page";
import store from './store.js';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import LoginForm from "../login-form";
import RegisterForm from "../register-form";
import PrivateRoute from "../../helpers/private-route";
import Homepage from "../homepage/Homepage";
import ActorPage from "../actor-page";
import EditPage from "../edit-movie/EditPage";

class App extends React.Component {

  componentDidMount() {
    this.fetchData();
    if(!localStorage.getItem('isLogin')) {
      localStorage.setItem('isLogin', '0');
    }
  }

  api = 'https://gist.githubusercontent.com/JIeCoRyI3/d000d1bed0632ebae4707fd3b5e0e2ad/raw/88ac5f11885582310457df09270ad8570123ffc3/movies-with-actors.json';

  fetchData = () => {
    fetch(this.api).then((res) => {
        return res.json();
    }).then(body => {
        store.dispatch({ type: 'LOAD_DATA', payload: body });
    })
  };

  logOut = () => {
    localStorage.setItem('isLogin', '0');
    window.location.href = '/login';
  };

  render() {
    const isLogin = +localStorage.getItem('isLogin');
    return (
        <Router>
          <header>
            <nav className={styles.navBar}>
              {isLogin ? <Link className='btn btn-primary' to='/homepage'>Homepage</Link> : null}
              {isLogin ? null : <Link to='/login'>Login</Link>}
              {isLogin ? null : <Link to='/register'>Register</Link>}
              {isLogin ? <button className='btn btn-primary' onClick={this.logOut}>Log out</button> : null}
            </nav>
          </header>
          <Switch>
            <PrivateRoute exact path="/homepage" component={Homepage}/>
            <PrivateRoute exact path="/movie" component={MoviePage}/>
            <PrivateRoute exact path="/actor:id" component={ActorPage}/>
            <PrivateRoute exact path="/edit-movie" component={EditPage}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/register" component={RegisterForm}/>
            <Route path='/'>
              <Redirect to='/homepage'/>
            </Route>
          </Switch>
        </Router>
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
