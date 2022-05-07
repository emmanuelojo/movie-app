<template>
  <div class="h-screen overflow-y-auto custom-scrollbar p-5">
    <div
      v-if="movie"
      class="pt-10 md:mx-8 lg:mx-0 grid lg:grid-cols-auto-1fr gap-10"
    >
      <div
        class="w-full h-52 lg:h-[600px] flex justify-center mx-auto rounded-lg"
      >
        <img
          class="w-full h-full object-contain rounded-lg"
          :src="movie.large_cover_image"
          :alt="movie.title"
        />
      </div>

      <div class="">
        <div>
          <div class="grid md:flex md:justify-between items-center">
            <p class="text-2xl font-bold text-white">{{ movie.title }}</p>

            <p class="text-lg font-medium text-white">
              Year: <span class="font-normal ml-1"> {{ movie.year }} </span>
            </p>
          </div>

          <div class="grid mt-4">
            <p class="text-white text-lg font-semibold">Category</p>
            <p class="text-white text-sm">{{ movie.genres.join(", ") }}</p>
          </div>
        </div>

        <div class="mt-4">
          <p class="font-semibold text-lg text-white">Details</p>
          <p class="text-white mt-2">
            {{ movie.description_full }}
          </p>
        </div>

        <div class="mt-5 grid md:grid-cols-3 gap-2 md:gap-3 items-center">
          <p class="flex items-center text-white font-semibold">
            Uploaded on:
            <span class="font-normal ml-1"
              >{{ formattedDate(movie.date_uploaded) }}
            </span>
          </p>
          <p class="text-white font-semibold">
            Parental Control:
            <span class="font-normal"> {{ movie.mpa_rating }} </span>
          </p>
          <p class="text-white font-semibold">
            Ratings: <span class="font-normal"> {{ movie.rating }} </span>
          </p>
          <p class="text-white font-semibold">
            Downloads:
            <span class="font-normal"> {{ movie.download_count }} </span>
          </p>
          <p class="text-white font-semibold">
            <i class="fa fa-heart"></i> {{ movie.like_count }}
          </p>
        </div>

        <div class="mt-5">
          <p class="font-semibold text-white">Cast</p>
          <div class="mt-2 mb-10 flex flex-wrap gap-3 md:gap-5">
            <div
              v-for="actor in movie.cast"
              class="shadow rounded-lg bg-white h-44 w-[100px] relative"
            >
              <div class="overflow-hidden relative">
                <img
                  :src="actor.url_small_image"
                  :alt="actor.name"
                  class="object-cover w-[100px] h-[100px] rounded-t-lg rounded-r-lg"
                />
              </div>

              <div class="p-2">
                <p class="text-black font-medium text-sm">{{ actor.name }}</p>
                <p
                  class="text-gray-400 text-xs w-[84px] overflow-x-hidden whitespace-nowrap text-ellipsis"
                >
                  {{ actor.character_name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="mt-40 md:mt-60 grid place-content-center">
      <Loader />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Loader from "../components/Loader.vue";
import router from "../router";
import moviesStore from "../store/moviesStore";
import { formattedDate } from "../utils/helpers";

export default defineComponent({
  name: "MovieDetails",
  components: { Loader },

  setup() {
    onMounted(async () => {
      await moviesStore.actions.getSingleMovie(+movieId);
    });

    const movieId = router.currentRoute.value.params.id;

    const movie = ref(moviesStore.getters.movie);
    const movies = moviesStore.getters.movie;

    return {
      formattedDate,
      movie,
      movies,
    };
  },
});
</script>
