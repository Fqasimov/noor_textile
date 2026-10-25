<script setup lang="ts">
import { Mail, MapPin, Phone } from "lucide-vue-next";
import NoorLogo from "./NoorLogo.vue";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { goToSection } from "@/router";

const year = new Date().getFullYear();
</script>

<template>
  <footer id="elaqe" class="bg-ink pb-[env(safe-area-inset-bottom)] text-silver-soft">
    <div class="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-8 lg:pt-28">
      <div class="grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <NoorLogo class="h-12 w-auto text-paper" ornament-color="var(--color-gold)" />
          <p class="display mt-8 max-w-sm text-3xl leading-tight text-paper">
            Sifariş, korporativ əməkdaşlıq və fərdi tikmə üçün bizə yazın.
          </p>
          <a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener noreferrer" class="btn btn-gold mt-8">
            WhatsApp-a yaz
          </a>
        </div>

        <div class="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <p class="eyebrow text-gold-soft">Kataloq</p>
            <ul class="mt-5 space-y-3 text-sm">
              <li v-for="c in categories" :key="c.id">
                <a href="#kataloq" class="transition-colors hover:text-paper" @click.prevent="goToSection('kataloq')">{{ c.label }}</a>
              </li>
            </ul>
          </div>
          <div>
            <p class="eyebrow text-gold-soft">Brend</p>
            <ul class="mt-5 space-y-3 text-sm">
              <li><a href="#haqqimizda" class="transition-colors hover:text-paper" @click.prevent="goToSection('haqqimizda')">Haqqımızda</a></li>
              <li><a href="#terefdaslar" class="transition-colors hover:text-paper" @click.prevent="goToSection('terefdaslar')">Tərəfdaşlar</a></li>
            </ul>
          </div>
          <div>
            <p class="eyebrow text-gold-soft">Əlaqə</p>
            <ul class="mt-5 space-y-4 text-sm">
              <li class="flex items-center gap-3">
                <Phone class="size-4 shrink-0 text-gold" :stroke-width="1.5" />
                <a :href="site.phoneHref" class="select-all transition-colors hover:text-paper">{{ site.phoneDisplay }}</a>
              </li>
              <li class="flex items-center gap-3">
                <Mail class="size-4 shrink-0 text-gold" :stroke-width="1.5" />
                <a :href="`mailto:${site.email}`" class="select-all transition-colors hover:text-paper">{{ site.email }}</a>
              </li>
              <li>
                <a :href="site.instagram" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 transition-colors hover:text-paper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-4 shrink-0 text-gold" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                  </svg>
                  {{ site.instagramHandle }}
                </a>
              </li>
              <li class="flex items-start gap-3">
                <MapPin class="mt-0.5 size-4 shrink-0 text-gold" :stroke-width="1.5" /> {{ site.address }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="hairline-gold mt-20 opacity-40" />
      <div class="mt-6 flex flex-col justify-between gap-2 text-xs text-silver sm:flex-row">
        <p>© {{ year }} Noor Textile. Bütün hüquqlar qorunur.</p>
        <p>{{ site.since }}</p>
      </div>
    </div>
  </footer>
</template>
