import {List} from "immutable";

const filterSelector = (state) => {
    return state.movies.filter(movie => {
        return movie.title.toLowerCase().includes(state.filter.toLowerCase());
    });
};

const mapStateToProps = (state) => {
    const searchData = filterSelector(state);
    return {
        movies: List(searchData)
    };
};

export default mapStateToProps;
