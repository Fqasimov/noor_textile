<script setup lang="ts">
import { catalogCategory } from "@/composables/catalog";
import { goToSection } from "@/router";
import { products, type CategoryId } from "@/data/products";
import { asset } from "@/asset";

const tiles: { id: CategoryId; title: string; line: string; img: string; pos?: string }[] = [
  { id: "yastiq", title: "Yastıqlar", line: "Kilim, göl, miniatür", img: asset("images/products/gollu.jpg") },
  { id: "sufre", title: "Süfrələr", line: "Ranner və süfrə-xalça", img: asset("images/products/gul-qabi.jpg"), pos: "50% 60%" },
  { id: "usaq", title: "Uşaq otağı", line: "Yumşaq, zərif, tikməli", img: asset("images/products/usaq-otagi-desti.jpg"), pos: "35% 50%" },
  { id: "salfet", title: "Salfetlər", line: "Süfrəni tamamlayan detal", img: asset("images/products/salfet-tund-sari.jpg") },
];
const count = (id: CategoryId) => products.filter((p) => p.category === id).length;

function open(id: CategoryId) {
  catalogCategory.value = id;
  goToSection("kataloq");
}
</script>

<template>
  <section id="kolleksiyalar" class="bg-paper">
    <div class="mx-auto max-w-[1440px] px-4 py-24 sm:px-10 lg:py-36">
      <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <h2 class="display text-[clamp(2.6rem,5.6vw,5rem)]">Kolleksiyalar</h2>
        <p class="max-w-[34ch] text-[1.02rem] leading-relaxed text-ink-soft">
          Hər kolleksiya bir Azərbaycan naxışından başlayır və evin bir guşəsinə gedir.
        </p>
      </div>

      <ul class="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        <li v-for="(t, i) in tiles" :key="t.id" :class="{ 'lg:mt-20': i % 2 === 1 }">
          <button type="button" class="tile group block w-full text-left" @click="open(t.id)">
            <span class="relative block aspect-[3/4] overflow-hidden bg-wash">
              <img :src="t.img" :alt="t.title" loading="lazy" class="tile-img absolute inset-0 size-full object-cover" :style="{ objectPosition: t.pos ?? '50% 50%' }" />
            </span>
            <span class="mt-5 flex items-baseline justify-between gap-3">
              <span class="display text-[clamp(1.5rem,2.4vw,2.1rem)]">{{ t.title }}</span>
              <span class="text-sm tabular-nums text-silver-ink">{{ count(t.id) }}</span>
            </span>
            <span class="mt-1 flex items-center justify-between gap-3 text-[0.92rem] text-ink-soft">
              {{ t.line }}
              <span class="arrow text-gold" aria-hidden="true">→</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.tile-img {
  transition: transform 1.1s var(--ease-out-strong);
}
.arrow {
  transition: transform 300ms var(--ease-out-strong);
}
.tile:active {
  transform: scale(0.99);
}
@media (hover: hover) and (pointer: fine) {
  .tile:hover .tile-img {
    transform: scale(1.05);
  }
  .tile:hover .arrow {
    transform: translateX(6px);
  }
}
</style>
