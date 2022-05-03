import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Bookmarked from "../pages/Bookmarked.vue";
import CarDetails from "../pages/CarDetails.vue";
import Home from "../pages/Home.vue";
import MovieDetail from "../pages/MovieDetail.vue";
import Movies from "../pages/Movies.vue";
import Series from "../pages/Series.vue";
import Trending from "../pages/Trending.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Trending",
        component: Trending,
        meta: {
          title: "Trending",
        },
      },
      {
        path: "/bookmark",
        name: "Bookmarked",
        component: Bookmarked,
        meta: {
          title: "Bookmarked",
        },
      },
      {
        path: "/movies",
        name: "Movies",
        component: Movies,
        meta: {
          title: "Movies",
        },
      },
      {
        path: "/movies/:id",
        name: "MovieDetail",
        component: MovieDetail,
        meta: {
          title: "Movie Detail",
        },
      },
      {
        path: "/series",
        name: "Series",
        component: Series,
        meta: {
          title: "Series",
        },
      },
      {
        path: "/cars/:id",
        name: "CarDetails",
        component: CarDetails,
        meta: {
          title: "Car Details",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
