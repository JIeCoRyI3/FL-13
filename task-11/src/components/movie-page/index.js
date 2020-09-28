import MoviePage from './MoviePage.js';
import {withTranslation} from "../../hocs/withTranslation";
import {compose} from "redux";
import {filterActors, filterSelector} from "./selectors";
import {List} from "immutable";
import {deleteMovie, selectNonMovie} from "./actions";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    const searchData = filterSelector(state);
    const movieActors = filterActors(state);
    return {
        selectedMovie: searchData.toJS()[state.selectedMovie],
        actors: List(movieActors),
    };
};

const mapDispatchToProps = {
    deleteMovie,
    selectNonMovie,
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withTranslation,
    withStore
)(MoviePage);
