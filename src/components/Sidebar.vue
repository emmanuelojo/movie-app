<template>
  <div
    class="bg-n-bg-sec sticky top-0 w-full md:left-0 md:right-0 lg:w-16 h-12 lg:h-full py-2 rounded-lg flex md:justify-between lg:flex-col lg:justify-between"
  >
    <div
      class="flex w-full md:w-max lg:relative lg:grid lg:gap-10 lg:place-content-center mx-3 lg:mx-auto"
    >
      <div
        class="flex w-full md:w-max justify-between md:justify-start lg:grid lg:place-content-center lg:gap-5 lg:mt-10"
      >
        <router-link
          to="/"
          class="text-n-purple active:text-white flex items-center relative"
        >
          <i class="fa fa-th-large"></i>
          <p
            class="hidden hover:block hover:absolute hover:top-5 hover-left-0 md:hover:left-10 hover:text-xs hover:bg-white hover:rounded shadow p-1 text-n-black z-20"
          >
            Home
          </p>
        </router-link>
        <router-link
          to="/movies"
          class="text-n-purple active:text-white flex items-center relative"
        >
          <i class="fa fa-film"></i>
          <p
            class="hidden hover:block absolute left-10 text-xs bg-white rounded shadow p-1 text-n-black z-20"
          >
            Movies
          </p>
        </router-link>
        <router-link
          to="/series"
          class="text-n-purple active:text-white flex items-center relative"
        >
          <i class="fa fa-television"></i>
          <p
            class="hidden hover:block absolute left-10 text-xs bg-white rounded shadow p-1 text-n-black z-20"
          >
            Series
          </p>
        </router-link>
        <router-link
          to="/bookmark"
          class="text-n-purple active:text-white flex items-center relative"
        >
          <i class="fa fa-bookmark"></i>
          <p
            class="hidden hover:block absolute left-10 text-xs bg-white rounded shadow p-1 text-n-black z-50"
          >
            Bookmark
          </p>
        </router-link>
      </div>
    </div>

    <!-- <div
      class="w-10 h-10 rounded-full p-1 mb-10 hidden md:grid place-content-center mx-auto"
    > -->
    <div
      class="w-10 h-10 rounded-full p-1 mb-10 hidden md:grid place-content-center mx-auto md:mr-10"
    >
      <p class="text-white">S.A</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Sidebar",
});
</script>

<style scoped>
a {
  padding: 7px 12px;
}

a:hover {
  width: max-content;
  background: #10141f;
  color: #f7f7f7;
  border-radius: 10px;
  line-height: 20px;
  cursor: pointer;
}

a:hover p {
  position: absolute;
  display: block;
  color: black;
  left: 2.5rem;
  font-size: 0.75rem;
  background-color: white;
  border-radius: 0.25rem;
  padding: 0.25rem;
  z-index: 10;
}

a.router-link-exact-active {
  width: max-content;
  background: #10141f;
  color: #f7f7f7;
  border-radius: 10px;
  line-height: 20px;
  cursor: pointer;
  padding: 7px 12px;
}

a.router-link-exact-active i {
  color: #f7f7f7;
}
</style>
