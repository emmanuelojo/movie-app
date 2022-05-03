<template>
  <div class="mt-4">
    <div class="w-full h-60 flex justify-center mx-auto rounded-lg">
      <img
        class="w-full h-full object-cover rounded-lg"
        :src="car.img"
        :alt="car.model"
      />
    </div>

    <div class="mt-4">
      <div>
        <p class="text-xl font-semibold text-n-text-black">{{ car.make }}</p>

        <div class="flex items-center gap-4">
          <p class="text-base font-medium text-n-text-black">{{ car.model }}</p>

          <p class="text-base font-medium text-n-text-black">
            {{ car.type }}
          </p>

          <p class="text-base font-medium text-n-text-black">
            {{ car.year }}
          </p>
        </div>
      </div>

      <div class="mt-4">
        <p class="font-semibold text-n-text-black">Fun fact</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat,
          error rem unde quasi voluptates quia. Iure minus eligendi iusto?
          Exercitationem aspernatur nesciunt nostrum. Obcaecati modi delectus
          nihil nam ipsam! Quibusdam.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Car } from "../models/Car";

export default defineComponent({
  name: "CarDetails",

  props: {
    car: {
      type: Object as PropType<Car>,
      required: true,
    },
  },
});
</script>
