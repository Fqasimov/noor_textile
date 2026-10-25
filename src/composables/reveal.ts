import type { Directive } from "vue";

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades an element up once it scrolls into view. Anything already on screen at mount is left
 * untouched, so the first frame of the page is always complete.
 */
export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (reduce() || el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transitionDelay = `${binding.value ?? 0}s`;
        el.classList.add("reveal-in");
        el.classList.remove("reveal-pending");
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
  },
};
