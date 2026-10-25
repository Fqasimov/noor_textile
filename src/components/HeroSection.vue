<script setup lang="ts">
import { RouterLink } from "vue-router";
import SerlovheBand from "./ornament/SerlovheBand.vue";
import CatchWord from "./ornament/CatchWord.vue";
import { introDone } from "@/composables/intro";
import { catalogCategory } from "@/composables/catalog";
import { categories, products, type CategoryId } from "@/data/products";
import { goToSection } from "@/router";
import { asset } from "@/asset";
import { site } from "@/data/site";

const counts = products.reduce<Record<string, number>>((c, p) => ((c[p.category] = (c[p.category] ?? 0) + 1), c), {});

function open(id: CategoryId) {
  catalogCategory.value = id;
  goToSection("kataloq");
}
</script>

<template>
  <section class="hero relative bg-paper" :class="{ 'is-in': introDone }">
    <div class="mx-auto max-w-[1360px] px-4 pb-14 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-10 sm:pt-[calc(7rem+env(safe-area-inset-top))]">
      <SerlovheBand class="unvan" />

      <div class="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-6 lg:pr-6 xl:col-span-5">
          <h1 class="enter display text-[clamp(2.9rem,6.2vw,5.6rem)]" style="--i: 0">
            Evinizə <span class="gold-text">işıq</span> gətirən tikmələr
          </h1>
          <p class="enter mt-8 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-soft" style="--i: 1">
            Şirvan kilimlərinin həndəsəsi, Qarabağ xalçalarının rəngləri və Nizami miniatürlərinin zərifliyi. {{ site.since }}
            evinizdəki yastıqda, süfrədə və salfetdə.
          </p>

          <!-- Fihrist: the manuscript's table of contents, and the way into the catalogue. -->
          <nav class="enter mt-12" style="--i: 2" aria-labelledby="fihrist-title">
            <h2 id="fihrist-title" class="display text-xl">Fihrist</h2>
            <ul class="mt-4 border-t border-gold">
              <li v-for="c in categories" :key="c.id" class="border-b border-line">
                <button
                  type="button"
                  class="group flex w-full items-baseline gap-3 py-3.5 text-left transition-colors duration-200 hover:text-gold-deep"
                  @click="open(c.id)"
                >
                  <span class="display text-[1.35rem]">{{ c.label }}</span>
                  <span class="leader mb-1.5 flex-1" aria-hidden="true" />
                  <span class="tabular-nums text-sm text-silver-ink group-hover:text-gold-deep">{{ counts[c.id] ?? 0 }}</span>
                </button>
              </li>
            </ul>
          </nav>

          <div class="enter mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style="--i: 3">
            <a href="#kataloq" class="btn btn-ink" @click.prevent="goToSection('kataloq')">Kataloqa keçin</a>
            <a
              :href="`https://wa.me/${site.whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="smallcaps border-b border-gold pb-1 text-ink-soft transition-colors hover:text-ink"
            >
              WhatsApp ilə yazın
            </a>
          </div>
        </div>

        <!-- The miniature: the photograph rises past the top of its ruled frame, as Tabriz painters let a tree break the border. -->
        <figure class="enter-media relative lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <div class="relative mx-auto max-w-[560px] pt-10 lg:ml-auto">
            <div class="cedvel absolute inset-x-0 bottom-14 top-24" aria-hidden="true" />
            <RouterLink to="/kataloq/xosrov-ve-sirin" class="relative block px-[9%]">
              <div class="relative aspect-[4/5] overflow-hidden bg-wash">
                <img
                  :src="asset('images/lifestyle/xosrov.jpg')"
                  alt="«Xosrov və Şirin» tikməli yastıq, Nizami poemasından miniatür səhnə"
                  fetchpriority="high"
                  class="absolute inset-0 size-full object-cover object-[50%_35%]"
                />
              </div>
            </RouterLink>
            <figcaption class="relative mt-6 flex items-baseline justify-between gap-4 px-[9%]">
              <RouterLink to="/kataloq/xosrov-ve-sirin" class="display text-xl hover:text-gold-deep">Xosrov və Şirin</RouterLink>
              <span class="text-sm text-silver-ink">40 × 50 sm · <span class="tabular-nums text-ink">100 ₼</span></span>
            </figcaption>
          </div>
        </figure>
      </div>

      <CatchWord class="mt-16" to="haqqimizda" word="Haqqımızda" />
    </div>
  </section>
</template>

<style scoped>
.leader {
  border-bottom: 1px dotted var(--color-silver);
}
/* The folio is fully composed under the cover; once it opens, the text settles in. */
.is-in .enter {
  animation: settle 0.9s var(--ease-out-strong) both;
  animation-delay: calc(0.25s + var(--i) * 70ms);
}
.is-in .enter-media {
  animation: settle-media 1.2s var(--ease-out-strong) 0.2s both;
}
.is-in :deep(.unvan) {
  animation: unvan 1.1s var(--ease-out-strong) both;
}
@keyframes settle {
  from {
    opacity: 0;
    transform: translateY(14px);
    filter: blur(3px);
  }
}
@keyframes settle-media {
  from {
    opacity: 0;
    transform: scale(0.985);
  }
}
@keyframes unvan {
  from {
    clip-path: inset(0 50% 0 50%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .is-in .enter,
  .is-in .enter-media,
  .is-in :deep(.unvan) {
    animation: none;
  }
}
</style>
