import Homepage from './Homepage.js';
import {connect} from "react-redux";
import {compose} from "redux";
import {withTranslation} from "../../hocs/withTranslation";

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

const withStore = connect(mapStateToProps);

export default compose(
    withStore,
    withTranslation
)(Homepage);
