import MoviePage from './MoviePage.js';
import {withTranslation} from "../../hocs/withTranslation";
import {compose} from "redux";
import mapStateToProps from "./selectors";
import {deleteMovie, selectNonMovie} from "./actions";
import {connect} from "react-redux";

const withStore = connect(mapStateToProps, {
    deleteMovie,
    selectNonMovie,
});

export default compose(
    withTranslation,
    withStore
)(MoviePage);
