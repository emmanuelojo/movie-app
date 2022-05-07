<template>
  <div class="h-screen overflow-auto custom-scrollbar pt-5 px-5 lg:px-1">
    <div v-if="bookmarked.length || bookmarkedSeries.length">
      <p class="text-white">
        <span class="font-bold">Bookmarked: </span
        ><span class="ml-1">
          {{ filteredMovies.length + filteredSeries.length }}</span
        >
      </p>
      <div class="h-10 flex items-center gap-2 z-10">
        <i class="fa fa-search text-white ml-3"></i>
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search"
          class="mr-3 font-medium border-0 outline-none bg-transparent text-white placeholder:text-n-text-sec placeholder:font-bold"
        />
      </div>

      <div v-if="filteredMovies.length" class="mt-5 grid gap-4 mb-10">
        <p class="text-xl font-bold text-white">Movies</p>

        <div class="flex justify-center lg:justify-start flex-wrap gap-6">
          <div
            v-for="movie in filteredMovies"
            :key="movie.id"
            class="cursor-pointer"
          >
            <div
              class="w-[85vw] md:w-80 h-40 p-4 rounded-md relative"
              :style="{
                backgroundImage: `url(${movie.large_cover_image})`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
              }"
            >
              <div
                @click="addToBookmark(movie)"
                :class="isBookmarked(movie.id) ? 'bg-green-500' : 'bg-n-modal'"
                class="w-6 h-6 text-white text-sm rounded-full pt-1.5 absolute top-3 right-3"
              >
                <div class="flex items-center justify-center">
                  <i class="fa fa-bookmark"></i>
                </div>
              </div>
            </div>

            <div @click="seeDetails(movie)" class="mt-2 text-white">
              <div class="flex text-xs mb-1">
                <p :class="movie.mpa_rating ? 'mr-0' : 'mr-1'">
                  {{ movie.year }} |
                </p>
                <p v-if="movie.mpa_rating" class="ml-[2px]">
                  <span> <i class="text-xs"></i> </span>
                  {{ movie.mpa_rating }} |
                </p>
                <p>{{ movie.genres.join(", ") }}</p>
              </div>
              <p class="w-72 md:w-80 font-bold text-base">
                {{ movie.title }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="filteredSeries.length"
        :class="searchTerm.length > 0 ? 'mt-8' : 'mt-16'"
        class="mb-10 grid gap-4"
      >
        <p class="text-xl font-bold text-white">Series</p>
        <div class="flex justify-center lg:justify-start flex-wrap gap-6">
          <div
            v-for="series in filteredSeries"
            :key="series.id"
            class="cursor-pointer mb-5"
          >
            <div class="w-80 h-40 p-4 rounded-md relative">
              <img
                :src="series.serial.poster.original"
                :alt="series.serial.title"
                class="w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0 rounded-md"
              />
              <div
                @click="addToBookmarkedSeries(series)"
                :class="
                  isBookmarkedSeries(series.id) ? 'bg-green-500' : 'bg-n-modal'
                "
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
                <p v-if="series.serial.imdb_rating" class="mx-[5px]">
                  <span> <i class="text-xs"></i> </span>
                  {{ series.serial.imdb_rating }}
                </p>
              </div>
              <p class="font-bold text-base">{{ series.serial.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="
          searchTerm.length > 0 &&
          !filteredMovies.length &&
          !filteredSeries.length
        "
      >
        <p class="mt-10 text-xl text-center font-semibold text-white">
          No match found
        </p>
      </div>
    </div>

    <div v-else>
      <p class="mt-10 md:mt-40 text-2xl text-center font-semibold text-white">
        Empty Bookmarks
      </p>
      <p class="mt-5 text-xl text-center font-semibold text-white">
        Bookmarks added will be displayed here
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { Movie } from "../models/Movie";
import { Ep } from "../models/Series";
import router from "../router";
import moviesStore from "../store/moviesStore";
import seriesStore from "../store/seriesStore";
import { truncateString } from "../utils/helpers";

export default defineComponent({
  name: "BookMarked",

  setup() {
    onMounted(async () => {
      await moviesStore.actions.getMovies();
      await seriesStore.actions.getSeries();
      checkForBookmark();
      checkForBookmarkedSeries();
    });

    const isLoading = ref(true);

    const searchTerm = ref("");

    const filteredMovies = computed(() => {
      return bookmarked.value.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          movie.cast?.forEach((actor) =>
            actor.name.toLowerCase().includes(searchTerm.value.toLowerCase())
          ) ||
          movie.mpa_rating
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          movie.year
            .toString()
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase())
      );
    });

    const filteredSeries = computed(() => {
      return bookmarkedSeries.value.filter((s) =>
        s.serial.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const bookmarkedId = ref<number[]>([]);

    const bookmarkedSeriesId = ref<number[]>([]);

    const bookmarkedArray = ref<Movie[]>([]);

    const bookmarkedSeriesArray = ref<Ep[]>([]);

    const allBookmarked = ref([]);

    const bookmarked = moviesStore.getters.bookMarked;

    const bookmarkedSeries = seriesStore.getters.bookMarked;

    const checkForBookmark = () => {
      bookmarkedId.value = bookmarked.value.map((movie) => movie.id);

      bookmarkedArray.value = bookmarked.value.map((movie) => movie);
    };

    const checkForBookmarkedSeries = () => {
      bookmarkedSeriesId.value = bookmarkedSeries.value.map(
        (series) => series.id
      );

      bookmarkedSeriesArray.value = bookmarkedSeries.value.map(
        (series) => series
      );
    };

    const addToBookmark = (movie: Movie) => {
      moviesStore.mutations.appendBookMarkedMovies(movie);

      checkForBookmark();
    };

    const addToBookmarkedSeries = (series: Ep) => {
      seriesStore.mutations.appendBookMarkedSeries(series);

      checkForBookmarkedSeries();
    };

    const isBookmarked = (id: number) => {
      return bookmarkedArray.value.findIndex((movie) => movie.id === id) !== -1;
    };

    const isBookmarkedSeries = (id: number) => {
      return (
        bookmarkedSeriesArray.value.findIndex((movie) => movie.id === id) !== -1
      );
    };

    const seeDetails = (movie: Movie) => {
      router.push(`/movies/${movie.id}`);
    };

    return {
      truncateString,
      searchTerm,
      bookmarked,
      bookmarkedSeries,
      filteredMovies,
      filteredSeries,
      addToBookmark,
      addToBookmarkedSeries,
      seeDetails,
      isBookmarked,
      isBookmarkedSeries,
      allBookmarked,
    };
  },
});
</script>
