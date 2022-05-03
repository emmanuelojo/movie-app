import axios, { AxiosResponse } from "axios";
import {
  getMovieDetailsResponse,
  getMoviesResponse,
} from "../types/movieApiResponses";

export default {
  getMovies() {
    return axios.get(
      "https://movies-and-serials-torrent.p.rapidapi.com/movies/latest",
      {
        headers: {
          "X-RapidAPI-Host": "movies-and-serials-torrent.p.rapidapi.com",
          "X-RapidAPI-Key":
            "5494c23066msh2e4a29f162d2b19p1ea474jsn6eb9f1dfb917",
        },
      }
    ) as Promise<AxiosResponse<getMoviesResponse>>;
  },

  getSingleMovie(movieId: number) {
    return axios.get(
      `https://movies-and-serials-torrent.p.rapidapi.com/movies/detail/${movieId}`,
      {
        headers: {
          "X-RapidAPI-Host": "movies-and-serials-torrent.p.rapidapi.com",
          "X-RapidAPI-Key":
            "5494c23066msh2e4a29f162d2b19p1ea474jsn6eb9f1dfb917",
        },
      }
    ) as Promise<AxiosResponse<getMovieDetailsResponse>>;
  },

  searchMovie(movieName: string) {
    return axios.get(
      `https://movies-and-serials-torrent.p.rapidapi.com/movies/search/${movieName}`,
      {
        headers: {
          "X-RapidAPI-Host": "movies-and-serials-torrent.p.rapidapi.com",
          "X-RapidAPI-Key":
            "5494c23066msh2e4a29f162d2b19p1ea474jsn6eb9f1dfb917",
        },
      }
    ) as Promise<AxiosResponse<getMoviesResponse>>;
  },
};
