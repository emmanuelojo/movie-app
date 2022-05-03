import { computed, reactive } from "vue";
import { Ep } from "../models/Series";
import seriesApi from "../network/seriesApi";

interface ISeriesStoreState {
  series: Ep[];
  bookMarkedSeries: Ep[];
}

const state = reactive<ISeriesStoreState>({
  series: [],
  bookMarkedSeries: [],
});

const setSeries = (payload: Ep[]) => {
  state.series = payload;
};

const appendBookMarkedSeries = (payload: Ep) => {
  const seriesExists = state.bookMarkedSeries.find(
    (series) => series.id === payload.id
  );

  if (seriesExists) {
    const index = state.bookMarkedSeries.indexOf(seriesExists);

    state.bookMarkedSeries.splice(index, 1);
  } else {
    state.bookMarkedSeries.unshift(payload);
  }
};

const getSeries = async () => {
  const apiCall = await seriesApi.getSeries();

  const result = apiCall.data.data.eps;

  if (result) {
    setSeries(result);

    return {
      sucess: true,
    };
  } else {
    return {
      success: false,
    };
  }
};

export default {
  getters: {
    series: computed(() => state.series),
    bookMarked: computed(() => state.bookMarkedSeries),
  },
  actions: {
    getSeries,
  },
  mutations: {
    appendBookMarkedSeries,
  },
};
