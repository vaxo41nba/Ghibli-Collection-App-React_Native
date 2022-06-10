import axios from 'axios';

const MOVIE_URL =
  'https://ghibliapi.herokuapp.com/films?fields=id,title,description,rt_score,movie_banner';

export const fetchMovies = async () => {
  const data = await axios.get(MOVIE_URL);
  return data.data;
};

export const returnSearchResults = () => {};
