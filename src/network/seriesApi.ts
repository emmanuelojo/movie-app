import axios, { AxiosResponse } from "axios";
import { getSeriesResponse } from "../types/seriesApiResponse";

export default {
  getSeries() {
    return axios.get(
      "https://movies-and-serials-torrent.p.rapidapi.com/tv_shows/ep",
      {
        headers: {
          "X-RapidAPI-Host": "movies-and-serials-torrent.p.rapidapi.com",
          "X-RapidAPI-Key":
            "5494c23066msh2e4a29f162d2b19p1ea474jsn6eb9f1dfb917",
        },
      }
    ) as Promise<AxiosResponse<getSeriesResponse>>;
  },
};
