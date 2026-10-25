<script setup lang="ts">
import NoorLogo from "./NoorLogo.vue";
import { site } from "@/data/site";
import { goToSection } from "@/router";

const year = new Date().getFullYear();
</script>

<template>
  <footer id="elaqe" class="overflow-hidden bg-night pb-[env(safe-area-inset-bottom)] text-white/75">
    <div class="mx-auto max-w-[1440px] px-4 pt-24 sm:px-10 lg:pt-32">
      <div class="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p class="display max-w-[16ch] text-[clamp(2.2rem,4vw,3.6rem)] text-paper">Sifariş, əməkdaşlıq və fərdi tikmə</p>
          <a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener noreferrer" class="btn btn-paper mt-10">
            WhatsApp ilə yazın
          </a>
        </div>
        <div class="space-y-2 text-[1rem]">
          <p class="text-white/45">Əlaqə</p>
          <p><a :href="site.phoneHref" class="select-all transition-colors hover:text-gold-light">{{ site.phoneDisplay }}</a></p>
          <p><a :href="`mailto:${site.email}`" class="select-all transition-colors hover:text-gold-light">{{ site.email }}</a></p>
          <p>
            <a :href="site.instagram" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-gold-light">
              Instagram {{ site.instagramHandle }}
            </a>
          </p>
        </div>
        <div class="space-y-2 text-[1rem]">
          <p class="text-white/45">Ünvan</p>
          <p>{{ site.address }}</p>
          <nav class="flex flex-col gap-2 pt-6" aria-label="Alt menyu">
            <a
              v-for="l in [
                ['kolleksiyalar', 'Kolleksiyalar'],
                ['kataloq', 'Kataloq'],
                ['haqqimizda', 'Haqqımızda'],
              ]"
              :key="l[0]"
              :href="`#${l[0]}`"
              class="w-fit transition-colors hover:text-gold-light"
              @click.prevent="goToSection(l[0])"
            >
              {{ l[1] }}
            </a>
          </nav>
        </div>
      </div>

      <div class="mt-24 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-[0.8rem] text-white/40 sm:flex-row">
        <p>© {{ year }} Noor Textile</p>
        <p>{{ site.since }}</p>
      </div>
    </div>
    <!-- The wordmark closes the page, set in foil across the full width. -->
    <NoorLogo class="mx-auto -mb-[3%] mt-10 block w-[96%] max-w-[1400px] text-white/90" aria-hidden="true" />
  </footer>
</template>
