import {List} from "immutable";

export const filterSelector = (state) => {
    return List(state.movies.filter(movie => {
        return movie.title.toLowerCase().includes(state.filter.toLowerCase());
    }));
};

export const filterActors = (state) => {
    if(state.selectedMovie === 'non-movie') {
        return null;
    } else {
        const searchData = List(filterSelector(state));
        return state.actors.filter(actor => {
            return searchData.toJS()[state.selectedMovie].actorsIds.includes(actor.id);
        });
    }
};
