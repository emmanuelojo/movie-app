import { Movie } from "../models/Movie";
import { apiResponse } from "./apiResponse";

export interface getMoviesResponse extends apiResponse {
  data: {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: Movie[];
  };
}

export interface getMovieDetailsResponse extends apiResponse {
  data: {
    movie: Movie;
  };
}
