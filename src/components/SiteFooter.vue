<script setup lang="ts">
import NoorLogo from "./NoorLogo.vue";
import { site } from "@/data/site";
import { goToSection } from "@/router";

const year = new Date().getFullYear();
</script>

<template>
  <!-- The back cover: black lacquer, tooled frame, and a colophon tapering like a manuscript's last page. -->
  <footer id="elaqe" class="bg-lacquer px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 text-[#c9c6bf] sm:px-5 sm:pb-5 sm:pt-5">
    <div class="tooled relative px-6 pb-12 pt-16 sm:px-12 sm:pt-24">
      <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
        <NoorLogo class="h-10 w-auto text-[#e2e3e5] sm:h-14" ornament-color="var(--color-gold)" />

        <div class="colophon mt-14 flex flex-col items-center gap-3">
          <p class="display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight text-[#f2efe8]">
            Sifariş, korporativ əməkdaşlıq və fərdi tikmə üçün bizə yazın
          </p>
          <p class="max-w-[30rem] text-[0.95rem]">{{ site.address }}</p>
          <p class="max-w-[24rem] text-[0.95rem]">
            <a :href="site.phoneHref" class="select-all hover:text-gold-light">{{ site.phoneDisplay }}</a>
            <span class="mx-3 text-gold">·</span>
            <a :href="`mailto:${site.email}`" class="select-all hover:text-gold-light">{{ site.email }}</a>
          </p>
          <p class="max-w-[16rem] text-[0.95rem]">
            <a :href="site.instagram" target="_blank" rel="noopener noreferrer" class="hover:text-gold-light">
              Instagram {{ site.instagramHandle }}
            </a>
          </p>
          <svg viewBox="-10 -10 20 20" class="mt-2 size-4 text-gold" aria-hidden="true">
            <g fill="currentColor">
              <ellipse v-for="a in [0, 45, 90, 135]" :key="a" rx="2.2" ry="8.6" :transform="`rotate(${a})`" opacity="0.85" />
            </g>
            <circle r="3" fill="#0a0a0a" />
            <circle r="1.6" fill="currentColor" />
          </svg>
        </div>

        <a
          :href="`https://wa.me/${site.whatsapp}`"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-gold-line mt-12"
        >
          WhatsApp ilə yazın
        </a>

        <nav class="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3" aria-label="Alt menyu">
          <a
            v-for="l in [
              ['haqqimizda', 'Haqqımızda'],
              ['terefdaslar', 'Tərəfdaşlar'],
              ['kataloq', 'Kataloq'],
            ]"
            :key="l[0]"
            :href="`#${l[0]}`"
            class="smallcaps text-[#8f8a80] transition-colors hover:text-gold-light"
            @click.prevent="goToSection(l[0])"
          >
            {{ l[1] }}
          </a>
        </nav>
        <p class="mt-8 text-xs text-[#8f8a80]">© {{ year }} Noor Textile · {{ site.since }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.tooled {
  box-shadow:
    inset 0 0 0 1px var(--color-gold),
    inset 0 0 0 6px #0a0a0a,
    inset 0 0 0 7px #4a463e;
}
</style>
