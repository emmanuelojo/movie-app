<template>
  <div class="h-screen overflow-auto custom-scrollbar pt-5">
    <div v-if="isLoading" class="mt-64 flex justify-center items-center">
      <Loader />
    </div>

    <div v-else>
      <div class="h-10 flex items-center gap-2 z-10">
        <i class="fa fa-search text-white ml-3"></i>
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search for series and tv shows"
          class="mr-3 font-medium border-0 outline-none bg-transparent text-white placeholder:text-n-text-sec placeholder:font-bold"
        />
      </div>

      <div
        v-if="searchTerm.length > 0"
        class="ml-4 lg:ml-0 mt-8 h-min mb-0 pb-0"
      >
        <p class="text-sm font-semibold text-white">
          Found {{ filteredSeries.length }}
          {{ filteredSeries.length > 1 ? "results" : "result" }} for '{{
            searchTerm
          }}'
        </p>
      </div>

      <div class="mt-8 mb-10 grid gap-4">
        <p class="ml-4 lg:ml-0 text-xl font-bold text-white">All Series</p>
        <div
          v-if="filteredSeries.length"
          class="flex justify-center lg:justify-start flex-wrap gap-6"
        >
          <div
            v-for="(series, idx) in filteredSeries"
            :key="series.id"
            class="cursor-pointer mb-5"
          >
            <div
              class="w-80 h-40 p-4 rounded-md relative"
              :style="{
                backgroundImage: `url(${series.serial.poster.original})`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
              }"
            >
              <div
                @click="addToBookmark(series)"
                :class="isBookmarked(series.id) ? 'bg-green-500' : 'bg-n-modal'"
                class="w-6 h-6 text-white text-sm rounded-full pt-1.5 absolute top-3 right-3"
              >
                <div class="flex items-center justify-center">
                  <i class="fa fa-bookmark"></i>
                </div>
              </div>
            </div>
            <div class="mt-2 text-white">
              <div class="flex text-xs mb-1">
                <p :class="series.serial.imdb_rating ? 'mr-0' : 'mr-1'">
                  {{ series.airdate }} |
                </p>
                <p class="mx-[5px]">
                  <span> {{ "S" + series.season }} </span>
                </p>
              </div>
              <p class="font-bold text-base">
                {{ truncateString(series.serial.title, 30) }}
              </p>
            </div>
          </div>
        </div>

        <div v-else>
          <p class="text-xl text-center font-semibold text-white">
            No match found
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Loader from "../components/Loader.vue";
import { Ep } from "../models/Series";
import seriesStore from "../store/seriesStore";
import { truncateString } from "../utils/helpers";

export default defineComponent({
  name: "Series",
  components: {
    Loader,
  },

  setup() {
    onMounted(async () => {
      await seriesStore.actions.getSeries();
      hasLoaded();
      checkForBookmark();
    });

    const isLoading = ref(true);

    const searchTerm = ref("");

    const series = seriesStore.getters.series;

    const hasLoaded = () => {
      if (series.value.length) isLoading.value = false;
    };

    const filteredSeries = computed(() => {
      return series.value.filter((s) =>
        s.serial.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const bookmarkedId = ref<number[]>([]);

    const bookmarkedArray = ref<Ep[]>([]);

    const bookmarked = seriesStore.getters.bookMarked;

    const checkForBookmark = () => {
      bookmarkedId.value = bookmarked.value.map((series) => series.id);

      bookmarkedArray.value = bookmarked.value.map((series) => series);
    };

    const addToBookmark = (series: Ep) => {
      seriesStore.mutations.appendBookMarkedSeries(series);

      checkForBookmark();
    };

    const isBookmarked = (id: number) => {
      return bookmarkedArray.value.findIndex((movie) => movie.id === id) !== -1;
    };

    const seeDetails = (serie: any) => {
      // router.push(`/movies/${movie.id}`);
    };

    return {
      isLoading,
      truncateString,
      searchTerm,
      series,
      filteredSeries,
      addToBookmark,
      seeDetails,
      isBookmarked,
    };
  },
});
</script>
