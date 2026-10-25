import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { reveal } from "./composables/reveal";
import "./styles.css";

// The artifact preview loads the same faces from Google Fonts instead.
if (import.meta.env.MODE !== "artifact") import("./fonts");

createApp(App).use(router).directive("reveal", reveal).mount("#app");
