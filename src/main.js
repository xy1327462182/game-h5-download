import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import Vant from "vant";
import "vant/lib/index.css";
import VueI18n from "./language";

const app = createApp(App);

app.use(store).use(router).use(VueI18n).use(Vant).mount("#app");
