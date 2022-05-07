<template>
  <div class="h-screen lg:h-full grid lg:grid-cols-auto-1fr lg:gap-10">
    <Sidebar />

    <div class="w-screen md:w-full h-full overflow-y-auto custom-scrollbar">
      <router-view v-slot="{ Component }">
        <transition name="fade" appear mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import moviesStore from "../store/moviesStore";
import seriesStore from "../store/seriesStore";

export default defineComponent({
  name: "Home",
  components: { Sidebar },

  setup() {
    onMounted(async () => {
      await moviesStore.actions.getMovies();
      await seriesStore.actions.getSeries();
    });

    return {};
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap");

body {
  margin: 0;
  padding: 0;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
</style>
