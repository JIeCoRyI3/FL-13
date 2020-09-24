import {DELETE_MOVIE, SELECT_MOVIE} from "../../actions/actionsForApp";


export const deleteMovie = (index) => ({
    type: DELETE_MOVIE,
    payload: { index }
});

export const selectNonMovie = () => ({
    type: SELECT_MOVIE,
    payload: { selectedMovie: 'non-movie' }
});

