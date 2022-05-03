<template>
  <div class="overflow-auto grid gap-5">
    <div class="h-10 fixed flex items-center gap-2">
      <i class="fa fa-search text-white ml-3"></i>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search for cars"
        class="mr-3 font-medium border-0 outline-none bg-transparent text-white placeholder:text-n-text-sec placeholder:font-bold"
      />
    </div>

    <div v-if="searchTerm.length > 1" class="mt-16">
      <p class="text-xl font-bold text-white">
        Found {{ filteredCars.length }} results for '{{ searchTerm }}'
      </p>
    </div>

    <div :class="searchTerm.length > 1 ? '' : 'mt-16'" class="grid gap-4">
      <p class="text-xl font-bold text-white">All Cars</p>
      <div class="flex justify-start flex-wrap gap-6">
        <div v-for="car in filteredCars" :key="car.id" class="cursor-pointer">
          <div class="w-80 h-40 p-4 rounded-md relative">
            <img
              :src="car.img"
              alt="car"
              class="w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0 rounded-md"
            />
            <div
              @click="addToBookmark"
              class="w-6 h-6 bg-n-bg-gray text-white text-sm rounded-full pt-1.5 absolute top-3 right-3"
            >
              <div class="flex items-center justify-center">
                <i class="fa fa-bookmark"></i>
              </div>
            </div>
          </div>
          <div class="mt-2 text-white">
            <div class="flex text-xs mb-1">
              <p>{{ car.year }} |</p>
              <p class="mx-1">
                <span> <i class="fa fa-home text-xs"></i> </span>
                {{ car.model }}
              </p>
              <p>| {{ car.type }}</p>
            </div>
            <p class="font-bold text-base">{{ car.make }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import carsStore from "../store/carsStore";

export default defineComponent({
  name: "Movies",

  setup() {
    const searchTerm = ref("");

    const cars = carsStore.getters.cars;

    const filteredCars = computed(() => {
      return cars.value.filter(
        (car) =>
          car.model.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          car.make.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          car.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          car.year
            .toString()
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase())
      );
    });

    const addToBookmark = () => {};

    return {
      searchTerm,
      filteredCars,
      addToBookmark,
    };
  },
});
</script>
