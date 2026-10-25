<script setup lang="ts">
import { partners } from "@/data/partners";
</script>

<template>
  <div id="terefdaslar" class="border-t border-line bg-mist/50">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:py-28">
      <div v-reveal class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p class="eyebrow text-gold-deep">Tərəfdaşlar</p>
          <h2 class="display mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)]">Bizə etibar edənlər</h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-muted">Bakının seçilmiş otel, restoran və brendləri ilə birgə işləyirik.</p>
      </div>

      <ul class="mt-12 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
        <li
          v-for="(p, i) in partners"
          :key="p.name"
          v-reveal="0.04 * i"
          class="group grid aspect-[4/3] place-items-center border-b border-r border-line px-6 sm:aspect-[3/2]"
        >
          <img
            :src="p.logo"
            :alt="p.name"
            :width="p.width"
            :height="p.height"
            loading="lazy"
            class="h-auto opacity-55 transition-opacity duration-300 group-hover:opacity-100"
            :class="p.width / p.height > 3 ? 'w-[78%] max-w-[190px]' : 'max-h-[58%] w-auto max-w-[60%]'"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
