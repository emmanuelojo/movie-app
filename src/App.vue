<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" appear mode="out-in">
      <div :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts"></script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap");

#app {
  font-family: "Montserrat", sans-serif;
  background: #10141f;
  height: 100vh;
}
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
