import { LOAD_DATA, SELECT_MOVIE, FILTER_BY_SEARCH, LIKE, DISLIKE, FILTER_BY_RATING, FILTER_BY_LIKES, RATE } from "../actions/actionsForApp";
import {List} from "immutable";
const initialState = {
    movies: [],
    selectedMovie: null,
    byRating: null,
    byLikes: null,
    filter: ""
};
function reducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_DATA:
            return {...state, ...action.payload};
        case SELECT_MOVIE:
            return {...state, ...action.payload};
        case FILTER_BY_SEARCH:
            return {...state, ...action.payload};
        case LIKE:
            return {
                ...state,
                movies: state.movies.map((movie, index) =>
                    index === action.payload.index ? {...movie, likes: movie.likes+1}
                                                    : movie),
            };
        case DISLIKE:
            return {
                ...state,
                movies: state.movies.map((movie, index) =>
                    index === action.payload.index ? {...movie, likes: movie.likes-1}
                        : movie),
            };
        case FILTER_BY_RATING:
            let filteredMoviesByRating, byR;
            if(!state.byRating){
                filteredMoviesByRating = List(state.movies.sort((a, b) => {
                    return a.stars - b.stars;
                }));
                byR = true;
            } else {
                filteredMoviesByRating = List(state.movies.sort((a, b) => {
                    return b.stars - a.stars;
                }));
                byR = false;
            }


            return {
                ...state,
                movies: filteredMoviesByRating,
                byRating: byR,
            };
        case FILTER_BY_LIKES:
            let filteredMoviesByLikes, byL;
            if(!state.byLikes){
                filteredMoviesByLikes = List(state.movies.sort((a, b) => {
                    return a.likes - b.likes;
                }));
                byL = true;
            } else {
                filteredMoviesByLikes = List(state.movies.sort((a, b) => {
                    return b.likes - a.likes;
                }));
                byL = false;
            }


            return {
                ...state,
                movies: filteredMoviesByLikes,
                byLikes: byL,
            };
        case RATE:
            return {
                ...state,
                movies: state.movies.map((movie, index) =>
                    index === action.payload.index ? {...movie, stars: action.payload.stars}
                        : movie),
            };
        default:
            return state;
    }
}
export default reducer;
