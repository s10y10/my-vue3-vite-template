import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "virtual:svg-icons-register";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
