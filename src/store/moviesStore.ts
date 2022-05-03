import { computed, reactive } from "vue";
import { Movie } from "../models/Movie";
import movieApi from "../network/movieApi";

interface IMoviesStoreState {
  movies: Movie[];
  movie: Movie | null;
  bookMarkedMovies: Movie[];
}

const state = reactive<IMoviesStoreState>({
  movies: [],
  movie: null,
  bookMarkedMovies: [],
});

const setMovies = (payload: Movie[]) => {
  state.movies = payload;
};

const setSingleMovie = (payload: Movie) => {
  state.movie = payload;
};

const appendBookMarkedMovies = (payload: Movie) => {
  const movieExists = state.bookMarkedMovies.find(
    (movie) => movie.id === payload.id
  );

  if (movieExists) {
    const index = state.bookMarkedMovies.indexOf(movieExists);

    state.bookMarkedMovies.splice(index, 1);
  } else {
    state.bookMarkedMovies.unshift(payload);
  }
};

const getMovies = async () => {
  const apiCall = await movieApi.getMovies();

  const result = apiCall.data.data.movies;

  if (result) {
    setMovies(result);

    return {
      success: true,
    };
  } else {
    return {
      success: false,
    };
  }
};

const getSingleMovie = async (id: number) => {
  const apiCall = await movieApi.getSingleMovie(id);

  const result = apiCall.data.data.movie;

  if (result) {
    setSingleMovie(result);

    return {
      success: true,
    };
  } else {
    return {
      success: false,
    };
  }
};

export default {
  getters: {
    movies: computed(() => state.movies),
    movie: computed(() => state.movie),
    bookMarked: computed(() => state.bookMarkedMovies),
  },
  actions: {
    getMovies,
    getSingleMovie,
  },
  mutations: {
    appendBookMarkedMovies,
  },
};
