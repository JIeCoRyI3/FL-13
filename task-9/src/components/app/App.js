import React from 'react';
import styles from './App.module.css';
import MoviePage from "../movie-page";
import store from './store.js';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginForm from "../login-form";
import RegisterForm from "../register-form";
import PrivateRoute from "../../helpers/private-route";
import Homepage from "../homepage/Homepage";

class App extends React.Component {

  componentDidMount() {
    this.fetchData();
    if(!localStorage.getItem('isLogin')) {
      localStorage.setItem('isLogin', '0');
    }
  }

  api = 'https://gist.githubusercontent.com/Yuriy1988/d2d2f23467f12f43d0128718bdd7c9ab/raw/75f10839adcb3605e2af7563b8351bb277997b26/moviesForStudents.json';

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
              {isLogin ? <Link to='/homepage'>Homepage</Link> : null}
              {isLogin ? null : <Link to='/login'>Login</Link>}
              {isLogin ? null : <Link to='/register'>Register</Link>}
              {isLogin ? <button onClick={this.logOut}>Log out</button> : null}
            </nav>
          </header>
          <Switch>
            <PrivateRoute exact path="/homepage" component={Homepage}/>
            <PrivateRoute exact path="/movie" component={MoviePage}/>
            <Route path="/login">
              <LoginForm/>
            </Route>
            <Route path="/register">
              <RegisterForm/>
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
