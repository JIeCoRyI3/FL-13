import {DELETE_MOVIE, SELECT_MOVIE} from "../../actions/actions";


export const deleteMovie = (index) => ({
    type: DELETE_MOVIE,
    payload: { index }
});

export const selectNonMovie = () => ({
    type: SELECT_MOVIE,
    payload: { selectedMovie: 'non-movie' }
});

