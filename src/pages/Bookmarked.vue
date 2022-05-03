<template>
  <div class="h-screen overflow-auto custom-scrollbar pt-5">
    <!-- <div v-if="isLoading" class="mt-64 flex justify-center items-center">
      <Loader />
    </div>

    <div v-else> -->
    <p class="text-white">{{ allBookmarked.length }}</p>
    <div class="h-10 flex items-center gap-2 z-10">
      <i class="fa fa-search text-white ml-3"></i>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search"
        class="mr-3 font-medium border-0 outline-none bg-transparent text-white placeholder:text-n-text-sec placeholder:font-bold"
      />
    </div>

    <div v-if="allBookmarked.length" class="flex justify-start flex-wrap gap-6">
      <div
        v-for="(movie, idx) in allBookmarked"
        :key="idx"
        class="cursor-pointer"
      >
        <div class="w-80 h-40 p-4 rounded-md relative">
          <img
            :src="
              movie.background_image_original
                ? movie.background_image_original
                : movie.serial.poster.original
            "
            alt="movie"
            class="w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0 rounded-md"
          />
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
            <p
              :class="
                movie.mpa_rating || movie.serial.imdb_rating ? 'mr-0' : 'mr-1'
              "
            >
              {{ movie.year }} |
            </p>
            <p v-if="movie.genres" class="ml-[2px]">
              {{ movie.genres.join(", ") }} |
            </p>
            <p v-else>{{ "S" + movie.season }}</p>
          </div>
          <p class="font-bold text-base">
            {{
              truncateString(
                movie.title ? movie.title : movies.serial.title,
                30
              )
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- <div class="mt-5 grid gap-4 mb-10">
      <p class="text-xl font-bold text-white">Bookmarked Movies</p>

      <div
        v-if="filteredMovies.length"
        class="flex justify-start flex-wrap gap-6"
      >
        <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="cursor-pointer"
        >
          <div class="w-80 h-40 p-4 rounded-md relative">
            <img
              :src="movie.background_image_original"
              alt="movie"
              class="w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0 rounded-md"
            />
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
            <p class="font-bold text-base">{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div
      :class="searchTerm.length > 0 ? 'mt-8' : 'mt-16'"
      class="mb-10 grid gap-4"
    >
      <p class="text-xl font-bold text-white">All Series</p>
      <div
        v-if="filteredSeries.length"
        class="flex justify-start flex-wrap gap-6"
      >
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
    </div> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { Movie } from "../models/Movie";
import { Ep } from "../models/Series";
import router from "../router";
import moviesStore from "../store/moviesStore";
import seriesStore from "../store/seriesStore";
// import Loader from "../components/Loader.vue";
import { truncateString } from "../utils/helpers";

export default defineComponent({
  name: "BookMarked",
  // components: { Loader },

  setup() {
    onMounted(async () => {
      await moviesStore.actions.getMovies();
      await seriesStore.actions.getSeries();
      // hasLoaded();
      mergeBookmark();
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

    // const filteredBookmarks = computed(() => {
    //   const mergedArray = [...bookmarked.value] + [...bookmarkedSeries.value];

    //   console.log(mergedArray, "merged array");

    //   return mergedArray.filter(
    //     (movie) =>
    //       movie.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    //       movie.cast?.forEach((actor) =>
    //         actor.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    //       ) ||
    //       movie.mpa_rating
    //         .toLowerCase()
    //         .includes(searchTerm.value.toLowerCase()) ||
    //       movie.year
    //         .toString()
    //         .toLowerCase()
    //         .includes(searchTerm.value.toLowerCase()) ||
    //       movie.serial.title
    //         .toLowerCase()
    //         .includes(searchTerm.value.toLowerCase())
    //   );

    //   // return (
    //   //   bookmarked.value.filter(
    //   //     (movie) =>
    //   //       movie.title
    //   //         .toLowerCase()
    //   //         .includes(searchTerm.value.toLowerCase()) ||
    //   //       movie.cast?.forEach((actor) =>
    //   //         actor.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    //   //       ) ||
    //   //       movie.mpa_rating
    //   //         .toLowerCase()
    //   //         .includes(searchTerm.value.toLowerCase()) ||
    //   //       movie.year
    //   //         .toString()
    //   //         .toLowerCase()
    //   //         .includes(searchTerm.value.toLowerCase())
    //   //   ) ||
    //   //   bookmarkedSeries.value.filter((s) =>
    //   //     s.serial.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    //   //   )
    //   // );
    //   // );
    // });

    const bookmarkedId = ref<number[]>([]);

    const bookmarkedSeriesId = ref<number[]>([]);

    const bookmarkedArray = ref<Movie[]>([]);

    const bookmarkedSeriesArray = ref<Ep[]>([]);

    const allBookmarked = ref([]);

    const bookmarked = moviesStore.getters.bookMarked;

    const bookmarkedSeries = seriesStore.getters.bookMarked;

    const mergeBookmark = () => {
      bookmarked.value.forEach((movie) => allBookmarked.value.push(movie));

      bookmarkedSeries.value.forEach((movie) =>
        allBookmarked.value.push(movie)
      );
    };

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
      mergeBookmark();
    };

    const addToBookmarkedSeries = (series: Ep) => {
      seriesStore.mutations.appendBookMarkedSeries(series);

      checkForBookmarkedSeries();
      mergeBookmark();
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
      filteredMovies,
      filteredSeries,
      // filteredBookmarks,
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
