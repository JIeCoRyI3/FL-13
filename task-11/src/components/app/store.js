import { createStore, applyMiddleware } from 'redux';
import reducer from "../../reducers/reducerForApp";
import thunk from 'redux-thunk';

const api = 'http://localhost:3001';
const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));

export default store;
