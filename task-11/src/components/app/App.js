import React from 'react';
import styles from './App.module.css';
import MoviePage from "../movie-page";
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
import Homepage from "../homepage";
import ActorPage from "../actor-page";
import EditPage from "../edit-movie/EditPage";
import { loadData, loadUsers } from './actions';
import {withTranslation} from "../../hocs/withTranslation";

class App extends React.Component {

  componentDidMount() {
    this.props.loadData();
    this.props.loadUsers();
    if(!window.localStorage.getItem('isLogin')) {
      window.localStorage.setItem('isLogin', JSON.stringify(false));
    }
  }

  logOut = () => {
    window.localStorage.setItem('isLogin', JSON.stringify(false));
    window.location.href = '/login';
  };

  translate = (lang) => () => {
    window.localStorage.setItem('lang', lang);
    window.location.reload();
  };

  render() {
    const { labels } = this.props;
    const isLogin = JSON.parse(window.localStorage.getItem('isLogin'));
    return (
        <Router>
          <header>
            <nav className={styles.navBar}>
              {isLogin ? <Link className='btn btn-primary' to='/homepage'>{labels.homepage}</Link> : null}
              {isLogin ? null : <Link className='btn btn-primary' to='/login'>{labels.login}</Link>}
              {isLogin ? null : <Link className='btn btn-primary' to='/register'>{labels.register}</Link>}
              {isLogin ? <button className='btn btn-primary' onClick={this.logOut}>{labels.logOut}</button> : null}
              <div className={styles.ua} onClick={this.translate('ua')}/>
              <div className={styles.en} onClick={this.translate('en')}/>
            </nav>
          </header>
          <Switch>
            {
              isLogin && (
                  <>
                    <Route exact path="/homepage" component={Homepage}/>
                    <Route exact path="/movie" component={MoviePage}/>
                    <Route exact path="/actor/:id" component={ActorPage}/>
                    <Route exact path="/edit-movie" component={EditPage}/>
                  </>
              )
            }
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/register" component={RegisterForm}/>
            <Redirect to='/'/>
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

const mapDispatchToProps = {
    loadData,
    loadUsers
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withTranslation(withStore(App));
