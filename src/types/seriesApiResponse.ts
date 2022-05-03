import { Ep } from "../models/Series";
import { seriesApiResponse } from "./apiResponse";

export interface getSeriesResponse extends seriesApiResponse {
  data: {
    future_eps: Ep[];
    eps: Ep[];
  };
}
