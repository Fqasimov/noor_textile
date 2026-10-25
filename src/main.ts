import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./styles.css";

// The artifact preview loads the same faces from Google Fonts instead.
if (import.meta.env.MODE !== "artifact") import("./fonts");

createApp(App).use(router).mount("#app");
