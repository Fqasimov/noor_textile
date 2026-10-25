import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import ProductView from "./views/ProductView.vue";
import NotFoundView from "./views/NotFoundView.vue";
import { getProduct } from "./data/products";

const HEADER_OFFSET = 80;

export const router = createRouter({
  // The artifact preview can't change its URL, so it routes in memory.
  history: import.meta.env.MODE === "artifact" ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/kataloq/:slug",
      name: "product",
      component: ProductView,
      beforeEnter: (to) => (getProduct(String(to.params.slug)) ? true : { name: "not-found", params: { path: [] } }),
    },
    { path: "/:path(.*)*", name: "not-found", component: NotFoundView },
  ],
});

let homeScroll = 0;

router.beforeEach((_to, from) => {
  if (from.name === "home") homeScroll = window.scrollY;
});

/** Runs `fn` once the new view has rendered enough to scroll to its target (page transitions are async). */
function whenRendered(ready: () => boolean, fn: () => void, tries = 30) {
  if (ready() || tries === 0) fn();
  else requestAnimationFrame(() => whenRendered(ready, fn, tries - 1));
}

router.afterEach((to, from) => {
  if (to.hash) {
    const id = to.hash.slice(1);
    whenRendered(
      () => !!document.getElementById(id),
      () => scrollToSection(id, from.name === "home" ? "smooth" : "instant"),
    );
  } else if (to.name === "home" && from.name === "product") {
    const top = homeScroll;
    whenRendered(
      () => document.documentElement.scrollHeight >= top + window.innerHeight,
      () => window.scrollTo({ top, behavior: "instant" }),
    );
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
});

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, behavior });
}

/** Navigates to a home-page section from anywhere, scrolling smoothly when already home. */
export function goToSection(id: string) {
  if (router.currentRoute.value.name === "home") scrollToSection(id);
  else router.push({ name: "home", hash: `#${id}` });
}

