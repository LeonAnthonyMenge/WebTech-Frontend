import { createRouter, createWebHistory } from "vue-router";
import PagesHome from "../views/PageView.vue";
import NotePage from "../views/NoteView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import HomeView from "../views/HomeView.vue";

  const routes = [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/page/:ownerId",
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
      path: "/login",
      component: LoginView,
      props: true,
    },
    {
      path: "/signup",
      component: SignupView,
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
