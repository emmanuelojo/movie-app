<template>
  <div class="h-screen pt-5">
    <div v-if="isLoading" class="mt-64 flex justify-center items-center">
      <Loader />
    </div>

    <div v-else>
      <div class="h-10 flex items-center gap-2 z-10 md:ml-2">
        <i class="fa fa-search text-white ml-3"></i>
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search for movies"
          class="mr-3 font-medium border-0 outline-none bg-transparent text-white placeholder:text-n-text-sec placeholder:font-bold"
        />
      </div>

      <div
        v-if="searchTerm.length > 0"
        class="ml-4 lg:ml-0 mt-5 h-min mb-0 pb-0"
      >
        <p class="text-sm font-semibold text-white">
          Found {{ filteredMovies.length }}
          {{ filteredMovies.length > 1 ? "results" : "result" }} for '{{
            searchTerm
          }}'
        </p>
      </div>

      <div v-if="!searchTerm.length" class="mt-5 grid gap-4">
        <p class="ml-4 lg:ml-0 text-xl font-bold text-white">Trending</p>
        <div
          class="grid place-content-center lg:place-content-start lg:ml-0 md:grid-cols-2 md:mx-auto gap-8 md:gap-6 lg:flex lg:flex-wrap"
        >
          <div
            v-for="movie in filteredMovies.slice(-3)"
            :key="movie.id"
            class="cursor-pointer mb-5 mx-auto"
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
                :class="
                  isBookmarked(movie.id)
                    ? 'bg-green-500'
                    : 'bg-[rgba(0,0,0,0.3)]'
                "
                class="w-6 h-6 text-white text-sm rounded-full pt-1.5 absolute top-3 right-3"
              >
                <div class="grid place-content-center pt-[1px]">
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

      <div class="mt-16 grid gap-4">
        <p
          v-if="!searchTerm.length"
          class="ml-4 md:ml-4 lg:ml-0 text-xl font-bold text-white"
        >
          Recommended for you
        </p>

        <div
          v-if="filteredMovies.length"
          class="mx-auto lg:mx-0 md:grid md:grid-cols-2 lg:grid-cols-n-auto md:gap-5"
        >
          <div
            v-for="movie in filteredMovies"
            :key="movie.id"
            class="cursor-pointer mb-5"
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
                :class="
                  isBookmarked(movie.id)
                    ? 'bg-green-500'
                    : 'bg-[rgba(0,0,0,0.3)]'
                "
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
              <p class="w-72 md:w-80 font-bold text-base">{{ movie.title }}</p>
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
import Modal from "../components/Modal.vue";
import { Movie } from "../models/Movie";
import router from "../router";
import moviesStore from "../store/moviesStore";

export default defineComponent({
  name: "Trending",

  components: {
    Modal,
    Loader,
  },

  setup() {
    onMounted(async () => {
      await moviesStore.actions.getMovies();
      hasLoaded();
      checkForBookmark();
    });

    const isLoading = ref(true);

    const searchTerm = ref("");

    const showMovieDetailsModal = ref(false);

    const movies = moviesStore.getters.movies;

    const hasLoaded = () => {
      if (movies.value.length) isLoading.value = false;
    };

    const filteredMovies = computed(() => {
      return movies.value.filter(
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

    const selectedMovie = ref<Movie>();

    const bookmarkedId = ref<number[]>([]);

    const bookmarkedArray = ref<Movie[]>([]);

    const bookmarked = moviesStore.getters.bookMarked;

    const checkForBookmark = () => {
      bookmarkedId.value = bookmarked.value.map((movie) => movie.id);

      bookmarkedArray.value = bookmarked.value.map((movie) => movie);
    };

    const addToBookmark = (movie: Movie) => {
      moviesStore.mutations.appendBookMarkedMovies(movie);

      checkForBookmark();
    };

    const isBookmarked = (id: number) => {
      return bookmarkedArray.value.findIndex((movie) => movie.id === id) !== -1;
    };

    const seeDetails = (movie: Movie) => {
      router.push(`/movies/${movie.id}`);
    };

    return {
      isLoading,
      searchTerm,
      movies,
      filteredMovies,
      selectedMovie,
      showMovieDetailsModal,

      addToBookmark,
      seeDetails,
      isBookmarked,
    };
  },
});
</script>
