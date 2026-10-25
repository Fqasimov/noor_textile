<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ArrowDown } from "lucide-vue-next";
import { introDone } from "@/composables/intro";
import { goToSection } from "@/router";
import { asset } from "@/asset";
import { site } from "@/data/site";

const section = ref<HTMLElement>();
const parallax = ref(0);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function onScroll() {
  const el = section.value;
  if (!el || reduce) return;
  parallax.value = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
}
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <section
    ref="section"
    class="relative overflow-hidden text-paper"
    :class="{ 'is-in': introDone }"
    style="background: radial-gradient(80% 70% at 70% 40%, #1a2441 0%, #0b1020 70%)"
  >
    <div
      class="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-32"
    >
      <div class="relative z-10 max-w-xl">
        <p class="enter eyebrow mb-6 flex items-center gap-3 text-gold-soft" style="--i: 0">
          <span class="h-px w-8 bg-gold" />
          {{ site.since }}
        </p>
        <h1 class="enter display text-[clamp(3rem,8vw,6.2rem)]" style="--i: 1">
          Evinizə <em class="font-normal italic text-gold-soft">işıq</em> gətirən tikmələr
        </h1>
        <p class="enter mt-7 max-w-md text-[15px] leading-relaxed text-silver-soft/80" style="--i: 2">
          Azərbaycan xalçalarının, miniatürlərinin və naxışlarının ruhunu müasir ev tekstilinə köçürürük — yastıqlar,
          süfrələr və uşaq otağı üçün.
        </p>
        <div class="enter mt-10 flex flex-wrap gap-3" style="--i: 3">
          <a href="#kataloq" class="btn btn-gold" @click.prevent="goToSection('kataloq')">Kataloqa bax</a>
          <a href="#haqqimizda" class="btn btn-ghost-light" @click.prevent="goToSection('haqqimizda')">Haqqımızda</a>
        </div>
      </div>

      <div class="enter-media relative mx-auto w-full max-w-[460px] lg:max-w-none">
        <div class="relative aspect-[4/5] w-[84%] lg:ml-auto">
          <div class="absolute -inset-3 rounded-t-[999px] border border-gold/40" aria-hidden="true" />
          <div class="absolute inset-0 overflow-hidden rounded-t-[999px] bg-navy">
            <img
              :src="asset('images/lifestyle/xosrov.jpg')"
              alt="«Xosrov və Şirin» tikməli yastıq"
              fetchpriority="high"
              class="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-[50%_30%] will-change-transform"
              :style="{ transform: `translateY(${parallax * 12}%)` }"
            />
          </div>
        </div>
        <div
          class="absolute -bottom-6 left-0 w-[42%] overflow-hidden rounded-t-[999px] border-4 border-ink shadow-2xl will-change-transform lg:-left-6"
          :style="{ transform: `translateY(${parallax * -18}%)` }"
        >
          <div class="relative aspect-[3/4]">
            <img :src="asset('images/products/gollu.jpg')" alt="«Göllü» məxmər yastıq" class="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <a
      href="#haqqimizda"
      aria-label="Aşağı keç"
      class="enter absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-silver/60 transition-colors hover:text-gold-soft lg:block"
      style="--i: 6"
      @click.prevent="goToSection('haqqimizda')"
    >
      <ArrowDown class="size-5 animate-bounce [animation-duration:2.4s]" :stroke-width="1.4" />
    </a>
  </section>
</template>

<style scoped>
/* Entrance plays once the intro curtain lifts; before that the hero sits fully composed underneath. */
.is-in .enter {
  animation: hero-in 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation-delay: calc(var(--i) * 80ms);
}
.is-in .enter-media {
  animation: media-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.15s both;
}
@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(6px);
  }
}
@keyframes media-in {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
}
@media (prefers-reduced-motion: reduce) {
  .is-in .enter,
  .is-in .enter-media {
    animation: none;
  }
}
</style>
