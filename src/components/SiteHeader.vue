<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import NoorLogo from "./NoorLogo.vue";
import { cartCount, cartOpen, cartPulse } from "@/composables/cart";
import { goToSection } from "@/router";
import { site } from "@/data/site";

/** `overlay` sits transparent over the full-bleed hero photograph until the page scrolls. */
const props = withDefaults(defineProps<{ variant?: "overlay" | "solid" }>(), { variant: "solid" });

const nav = [
  { id: "kolleksiyalar", label: "Kolleksiyalar" },
  { id: "kataloq", label: "Kataloq" },
  { id: "haqqimizda", label: "Haqqımızda" },
  { id: "elaqe", label: "Əlaqə" },
];

const scrolled = ref(false);
const menu = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > window.innerHeight * 0.6);

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  document.body.style.overflow = "";
});
watch(menu, (open) => (document.body.style.overflow = open ? "hidden" : ""));

const clear = computed(() => props.variant === "overlay" && !scrolled.value && !menu.value);

function go(id: string) {
  menu.value = false;
  goToSection(id);
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,color,box-shadow] duration-500"
    :class="clear ? 'bg-transparent text-paper' : 'bg-paper/92 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md'"
  >
    <div class="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-10">
      <div class="flex items-center gap-9">
        <button
          type="button"
          class="smallcaps flex min-h-11 items-center gap-3"
          :aria-expanded="menu"
          aria-controls="site-menu"
          @click="menu = !menu"
        >
          <span class="relative block h-[9px] w-6" aria-hidden="true">
            <span class="bar absolute left-0 top-0 h-px w-full bg-current" :class="{ 'translate-y-[4px] rotate-45': menu }" />
            <span class="bar absolute bottom-0 left-0 h-px w-full bg-current" :class="{ '-translate-y-[4px] -rotate-45': menu }" />
          </span>
          <span class="hidden sm:inline">{{ menu ? "Bağla" : "Menyu" }}</span>
        </button>
        <a href="#kataloq" class="smallcaps hidden min-h-11 items-center opacity-80 transition-opacity hover:opacity-100 lg:flex" @click.prevent="go('kataloq')">
          Kataloq
        </a>
      </div>

      <RouterLink to="/" aria-label="Noor Textile, ana səhifə" class="justify-self-center" @click="menu = false">
        <NoorLogo class="h-7 w-auto sm:h-9" />
      </RouterLink>

      <div class="flex justify-end">
        <button
          type="button"
          class="smallcaps flex min-h-11 items-center gap-2"
          :aria-label="`Səbət, ${cartCount} məhsul`"
          @click="cartOpen = true"
        >
          <span class="hidden sm:inline">Səbət</span>
          <span
            :key="cartPulse"
            class="count grid size-7 place-items-center rounded-full text-[0.68rem] tracking-normal tabular-nums"
            :class="cartCount ? 'foil-fill text-ink' : 'shadow-[inset_0_0_0_1px_currentColor] opacity-70'"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="menu"
          id="site-menu"
          class="fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-40 overflow-y-auto bg-paper sm:top-[calc(5rem+env(safe-area-inset-top))]"
        >
          <div class="mx-auto grid max-w-[1440px] gap-12 px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-10 sm:px-10 lg:grid-cols-[1.3fr_1fr] lg:pt-16">
            <nav aria-label="Əsas menyu" class="flex flex-col">
              <a
                v-for="(item, i) in nav"
                :key="item.id"
                :href="`#${item.id}`"
                class="menu-item display group flex items-baseline gap-5 py-2 text-[clamp(2.6rem,7vw,5.2rem)]"
                :style="{ animationDelay: `${60 + i * 45}ms` }"
                @click.prevent="go(item.id)"
              >
                <span class="transition-colors duration-200 group-hover:text-gold">{{ item.label }}</span>
              </a>
            </nav>
            <div class="menu-item self-end space-y-1 text-ink-soft" style="animation-delay: 260ms">
              <p class="select-all">{{ site.phoneDisplay }}</p>
              <p class="select-all">{{ site.email }}</p>
              <p>{{ site.address }}</p>
              <a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener noreferrer" class="btn btn-ink mt-8">
                WhatsApp ilə yazın
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.bar {
  transition: transform 300ms var(--ease-out-strong);
}
.count {
  animation: pop 400ms var(--ease-out-strong);
}
.menu-item {
  animation: item-in 500ms var(--ease-out-strong) both;
}
.menu-enter-active,
.menu-leave-active {
  transition:
    clip-path 500ms var(--ease-in-out-strong),
    opacity 300ms ease;
}
.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}
.menu-leave-to {
  opacity: 0;
}
@keyframes pop {
  from {
    transform: scale(0.8);
    opacity: 0.4;
  }
}
@keyframes item-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}
</style>
