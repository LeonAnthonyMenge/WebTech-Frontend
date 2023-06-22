import { createRouter, createWebHistory } from "vue-router";
import PagesHome from "../views/PageView.vue";
import NotePage from "../views/NoteView.vue";
console.log(PagesHome);

const routes = [
  {
    path: "/",
    name: "PagesHome",
    component: PagesHome,
  },
  {
    path: "/page/:pageName/:pageId",
    name: "NotePage",
    component: NotePage,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
