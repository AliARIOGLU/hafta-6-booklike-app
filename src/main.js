import "@/assets/style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";

import appHeader from "@/components/shared/appHeader";
import appBookmarkList from "@/components/shared/appBookmarkList";
import { appAxios } from "@/utils/appAxios";

const socket = io("http://localhost:2018");

const app = createApp(App);

app.component("AppHeader", appHeader);
app.component("appBookmarkList", appBookmarkList);

app.use(router);
app.use(store);

app.config.globalProperties.$appAxios = appAxios;
app.config.globalProperties.$socket = socket;

app.mount("#app");
