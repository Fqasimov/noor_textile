<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { introDone } from "@/composables/intro";
import { goToSection } from "@/router";
import { asset } from "@/asset";
import { site } from "@/data/site";

// The intro flies through the O of the logo and lands here: the house seen through it.
const slides = [
  { src: asset("images/lifestyle/xosrov.jpg"), pos: "50% 38%", name: "Xosrov və Şirin", slug: "xosrov-ve-sirin", note: "40 × 50 sm · 100 ₼" },
  { src: asset("images/lifestyle/garden-table.jpg"), pos: "50% 55%", name: "Gül Qabı", slug: "gul-qabi", note: "160 × 250 sm · 280 ₼" },
  { src: asset("images/lifestyle/terracotta.jpg"), pos: "50% 40%", name: "Uzun yastıq, narıncı", slug: "uzun-narinci", note: "90 ₼" },
];

const active = ref(0);
let timer: number | undefined;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

onMounted(() => {
  if (!reduce) timer = window.setInterval(() => (active.value = (active.value + 1) % slides.length), 6500);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <section class="hero relative h-[100svh] min-h-[620px] overflow-hidden bg-night text-paper" :class="{ 'is-in': introDone }">
    <div
      v-for="(s, i) in slides"
      :key="s.src"
      class="slide absolute inset-0"
      :class="{ on: i === active }"
      :aria-hidden="i !== active"
    >
      <img :src="s.src" alt="" :fetchpriority="i === 0 ? 'high' : 'low'" class="absolute inset-0 size-full object-cover" :style="{ objectPosition: s.pos }" />
    </div>
    <div class="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_10_8/0.45)_0%,rgb(11_10_8/0)_28%,rgb(11_10_8/0.1)_42%,rgb(11_10_8/0.86)_100%)] lg:bg-[linear-gradient(180deg,rgb(11_10_8/0.45)_0%,rgb(11_10_8/0)_28%,rgb(11_10_8/0)_45%,rgb(11_10_8/0.78)_100%)]" />

    <div class="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:px-10 sm:pb-14">
      <div class="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <h1 class="enter display max-w-[13ch] text-[clamp(3rem,7.4vw,7.2rem)] leading-[0.98]" style="--i: 0">
            Evinizə <span class="foil">işıq</span> gətirən tikmələr
          </h1>
          <div class="enter mt-9 flex flex-wrap gap-3" style="--i: 1">
            <a href="#kolleksiyalar" class="btn btn-paper" @click.prevent="goToSection('kolleksiyalar')">Kolleksiyalara baxın</a>
            <a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener noreferrer" class="btn btn-line-light">WhatsApp</a>
          </div>
        </div>

        <!-- Shoppable credit for the photograph on screen. -->
        <RouterLink
          :to="`/kataloq/${slides[active].slug}`"
          class="enter group flex items-center gap-4 self-end border-t border-white/30 pt-4 lg:min-w-[300px]"
          style="--i: 2"
        >
          <Transition name="credit" mode="out-in">
            <span :key="active" class="flex-1">
              <span class="display block text-[1.35rem]">{{ slides[active].name }}</span>
              <span class="mt-1 block text-[0.85rem] text-white/70">{{ slides[active].note }}</span>
            </span>
          </Transition>
          <span class="smallcaps text-gold-light transition-transform duration-300 group-hover:translate-x-1">Bax →</span>
        </RouterLink>
      </div>

      <div class="enter mt-8 flex gap-2" style="--i: 3" role="tablist" aria-label="Şəkillər">
        <button
          v-for="(s, i) in slides"
          :key="s.src"
          type="button"
          role="tab"
          :aria-selected="i === active"
          :aria-label="s.name"
          class="relative h-11 w-10"
          @click="active = i"
        >
          <span class="absolute inset-x-0 top-1/2 h-px bg-white/30" />
          <span class="progress absolute left-0 top-1/2 h-px bg-gold-light" :class="{ run: i === active }" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide {
  opacity: 0;
  transition: opacity 1.4s ease;
}
.slide.on {
  opacity: 1;
}
.slide img {
  transform: scale(1.08);
  transition: transform 8s linear;
}
.slide.on img {
  transform: scale(1);
}
.progress {
  width: 0;
}
.progress.run {
  animation: progress 6.5s linear forwards;
}
@keyframes progress {
  to {
    width: 100%;
  }
}
.is-in .enter {
  animation: settle 1s var(--ease-out-strong) both;
  animation-delay: calc(250ms + var(--i) * 90ms);
}
@keyframes settle {
  from {
    opacity: 0;
    transform: translateY(22px);
    filter: blur(4px);
  }
}
.credit-enter-active,
.credit-leave-active {
  transition:
    opacity 300ms ease,
    filter 300ms ease;
}
.credit-enter-from,
.credit-leave-to {
  opacity: 0;
  filter: blur(3px);
}
@media (prefers-reduced-motion: reduce) {
  .is-in .enter {
    animation: none;
  }
  .slide img {
    transform: none;
    transition: none;
  }
}
</style>
