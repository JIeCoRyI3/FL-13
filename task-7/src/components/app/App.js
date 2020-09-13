import React from 'react';
import styles from './App.module.css';
import StarMark from "../star-mark";
import MoviePage from "../movie-page";

class App extends React.Component {
  state = {
    movies: [],
    selectedMovie: 0,
    byRating: false,
    byLikes: false,
    filter: ""
  };

  componentDidMount() {
    this.fetchData();
  }

  api = 'https://gist.githubusercontent.com/Yuriy1988/d2d2f23467f12f43d0128718bdd7c9ab/raw/75f10839adcb3605e2af7563b8351bb277997b26/moviesForStudents.json';

  fetchData = () => {
    fetch(this.api).then((res) => {
        return res.json();
    }).then(body => {
        this.setState({
          movies: body.movies,
        });
    })
  };

  detailInfo = (movie) => () => {
    this.setState({
      selectedMovie: movie,
    })
  };

  like = (movie) => () => {
    const index = this.state.movies.findIndex((movies) => movies === movie);
    const newArray = this.state.movies;
    newArray[index].likes++;
    this.setState({
      movies: newArray,
    });
  };

  dislike = (movie) => () => {
    const index = this.state.movies.findIndex((movies) => movies === movie);
    const newArray = this.state.movies;
    newArray[index].likes--;
    this.setState({
      movies: newArray,
    });
  };

  rate = (stars, id) => {
    const newArray = this.state.movies;
    newArray[id].stars = stars;
    this.setState({
      movies: newArray,
    });
  };

  filterByRating = () => {
    let newArray = this.state.movies;
    if (this.state.byRating) {
      newArray.sort((a, b) => {
        return a.stars - b.stars;
      });
    } else {
      newArray.sort((a, b) => {
        return b.stars - a.stars;
      });
    }

    this.setState({
      movies: newArray,
      byRating: !this.state.byRating
    })
  };

  filterByLikes = () => {
    let newArray = this.state.movies;
    if (this.state.byLikes) {
      newArray.sort((a, b) => {
        return a.likes - b.likes;
      });
    } else {
      newArray.sort((a, b) => {
        return b.likes - a.likes;
      });
    }

    this.setState({
      movies: newArray,
      byLikes: !this.state.byLikes
    })
  };

  search = () => {
    this.setState({
      filter: document.getElementById('search').value
    });
  };

  render() {
    const { filter } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = this.state.movies.filter(movie => {
      return movie.title.toLowerCase().includes(lowercasedFilter);
    });

    return (
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <h3 onClick={this.filterByRating}>filter by rating</h3>
            <h3 onClick={this.filterByLikes}>filter by likes</h3>
            <input id="search" onChange={this.search}/>
          </div>
          <div className={styles.grid}>
         {filteredData.map((movie, index) => {
           return (
               <div key={index+'cardId'} className={styles.card}>
                 <div className={styles.movieShortInfo}>
                   <div className={styles.title} onClick={this.detailInfo(movie)}>{movie.title}</div>
                   <div className={styles.likeBar}>
                     <i className="fas fa-thumbs-up" onClick={this.like(movie)} style={{color: "green"}}></i>
                     <i className="fas fa-thumbs-down" onClick={this.dislike(movie)} style={{color: "red"}}></i>
                     <p>Likes: {movie.likes}</p>
                   </div>
                   <div className={styles.image} style={{backgroundImage: `url(${movie.posterUrl})`}} />
                 </div>
                 <StarMark rate={this.rate} rating={movie.stars} unique={index} key={index+"starID"} canChange={true}/>
               </div>
               );
         })}
          </div>
          <MoviePage item={this.state.selectedMovie}/>
        </div>
    )
  }
}

export default App;
