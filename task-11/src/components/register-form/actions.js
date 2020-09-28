import {ADD_USER} from "../../actions/actions";

export const addUser = (user) => ({
    type: ADD_USER,
    payload: {
        user
    }
});
