import { createRouter, createWebHistory } from "vue-router";
import PagesHome from "../views/PageView.vue";
import NotePage from "../views/NoteView.vue";
console.log(PagesHome);
import LoginView from "../views/LoginView.vue";
import {LoginCallback, navigationGuard} from "@okta/okta-vue";

const routes = [
  {
    path: "/",
    name: "PagesHome",
    component: PagesHome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/login/callback",
    component: LoginCallback,
  },
  {
    path: "/page/:pageName/:pageId",
    name: "NotePage",
    component: NotePage,
    props: true,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach(navigationGuard);

export default router;
