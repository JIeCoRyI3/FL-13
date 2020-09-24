import { createStore } from 'redux';
import reducer from "../../reducers/reducerForApp";

const store = createStore(reducer);

export default store;
