import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/HomePage"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/LoginPage"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/RegisterPage"),
  },
  {
    name: "NewBookmarkPage",
    path: "/new",
    component: () => import("@/views/NewBookmarkPage"),
  },
  {
    name: "FavoritesPage",
    path: "/favorites",
    meta: {
      componentName: "appBookmarkList",
    },
    component: () => import("@/views/AccountPage"),
  },
  {
    name: "Likes",
    path: "/likes",
    meta: {
      componentName: "appBookmarkList",
    },
    component: () => import("@/views/AccountPage"),
  },
  {
    name: "Settings",
    path: "/settings",
    meta: {
      componentName: "userSettings",
    },
    component: () => import("@/views/AccountPage"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const authRequiredRoutes = ["HomePage"];
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
  const _isAuthenticated = store.getters._isAuthenticated;

  // auth olduktan sonra login ve register pageye gitmesini engelledim.
  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

  // auth olmayanları yönlendirmek için
  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
