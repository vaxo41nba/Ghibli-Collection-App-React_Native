export const actionTypes = {
  SAVE_MOVIES: 'SAVE_MOVIES',
  SEARCH_RESULTS: 'SEARCH_RESULTS',
  SET_CURRENT_MOVIE: 'SET_CURRENT_MOVIE',
  SET_FAVOURITES: 'SET_FAVOURITES',
  SET_HIDDENS: 'SET_HIDDENS',
  SET_CONNECTION_STATE: 'SET_CONNECTION_STATE',
};

export const saveMovies = (allMovies) => ({
  type: actionTypes.SAVE_MOVIES,
  allMovies,
});
export const setSearchResults = (results) => ({
  type: actionTypes.SEARCH_RESULTS,
  results,
});
export const setCurrentMovie = (current) => ({
  type: actionTypes.SET_CURRENT_MOVIE,
  current,
});
export const setFavourites = (favourites) => ({
  type: actionTypes.SET_FAVOURITES,
  favourites,
});
export const setHiddens = (hiddens) => ({
  type: actionTypes.SET_HIDDENS,
  hiddens,
});
export const setConnectionState = (connectionState) => ({
  type: actionTypes.SET_CONNECTION_STATE,
  connectionState,
});
