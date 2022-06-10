import { actionTypes } from './actions';

const INITIAL_STATE = {
  allMovies: [],
  results: [],
  favourites: [],
  hiddens: [],
  current: {},
  connectionState: {},
};

export default (state = INITIAL_STATE, action) => {
  const { allMovies, results, current, favourites, hiddens, connectionState } =
    action;

  switch (action.type) {
    case actionTypes.SAVE_MOVIES:
      return {
        ...state,
        allMovies,
      };
    case actionTypes.SEARCH_RESULTS:
      return {
        ...state,
        results,
      };
    case actionTypes.SET_CURRENT_MOVIE:
      return {
        ...state,
        current,
      };
    case actionTypes.SET_FAVOURITES:
      return {
        ...state,
        favourites,
      };
    case actionTypes.SET_HIDDENS:
      return {
        ...state,
        hiddens,
      };
    case actionTypes.SET_CONNECTION_STATE:
      return {
        ...state,
        connectionState,
      };
    default:
      return state;
  }
};
