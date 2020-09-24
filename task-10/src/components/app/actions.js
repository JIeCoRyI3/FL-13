import { LOAD_DATA } from "../../actions/actions";
import axios from 'axios'

const loadMovies = (body) => ({
    type: LOAD_DATA,
    payload: {
        movies: body
    }
});

const loadActors = (body) => ({
    type: LOAD_DATA,
    payload: {
        actors: body
    }
});

const loadUsersData = (body) => ({
    type: LOAD_DATA,
    payload: {
        users: body
    }
});

export const loadData = () => {
    return (dispatch, _, api) => {
        axios
            .get(`${api}/movies`)
            .then(res => {
                dispatch(loadMovies(res.data));
            });
        axios
            .get(`${api}/actors`)
            .then(res => {
                dispatch(loadActors(res.data));
            })
    };
};

export const loadUsers = () => {
    return (dispatch, _, api) => {
        axios
            .get(`${api}/users`)
            .then(res => {
                dispatch(loadUsersData(res.data));
            });
    };
};


