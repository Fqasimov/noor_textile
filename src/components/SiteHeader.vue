<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import NoorLogo from "./NoorLogo.vue";
import { cartCount, cartOpen, cartPulse } from "@/composables/cart";
import { goToSection } from "@/router";
import { site } from "@/data/site";

const nav = [
  { id: "haqqimizda", label: "Haqqımızda" },
  { id: "terefdaslar", label: "Tərəfdaşlar" },
  { id: "kataloq", label: "Kataloq" },
  { id: "elaqe", label: "Əlaqə" },
];

const scrolled = ref(false);
const menu = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 8);

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  document.body.style.overflow = "";
});
watch(menu, (open) => (document.body.style.overflow = open ? "hidden" : ""));

function go(id: string) {
  menu.value = false;
  goToSection(id);
}

function openSearch() {
  go("kataloq");
  setTimeout(() => document.getElementById("catalog-search")?.focus({ preventScroll: true }), 650);
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-paper pt-[env(safe-area-inset-top)]">
    <div class="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-6 px-4 sm:h-[76px] sm:px-10">
      <RouterLink to="/" aria-label="Noor Textile, ana səhifə" class="shrink-0" @click="menu = false">
        <NoorLogo class="h-7 w-auto text-ink sm:h-8" ornament-color="var(--color-gold)" />
      </RouterLink>

      <nav class="hidden items-center gap-10 lg:flex" aria-label="Əsas menyu">
        <a
          v-for="item in nav"
          :key="item.id"
          :href="`#${item.id}`"
          class="smallcaps link-rule py-2 text-ink-soft"
          @click.prevent="go(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-5 sm:gap-8">
        <button type="button" class="smallcaps link-rule hidden py-2 text-ink-soft sm:block" @click="openSearch">Axtar</button>
        <button
          type="button"
          class="smallcaps link-rule flex items-center gap-2 py-2 text-ink"
          :aria-label="`Səbət, ${cartCount} məhsul`"
          @click="cartOpen = true"
        >
          Səbət
          <span :key="cartPulse" class="count inline-grid min-w-[1.4rem] place-items-center tabular-nums text-gold-deep">
            {{ cartCount }}
          </span>
        </button>
        <button
          type="button"
          class="smallcaps py-2 text-ink lg:hidden"
          :aria-expanded="menu"
          aria-controls="mobile-menu"
          @click="menu = !menu"
        >
          {{ menu ? "Bağla" : "Menyu" }}
        </button>
      </div>
    </div>
    <div class="rule-double transition-opacity duration-300" :class="scrolled || menu ? 'opacity-100' : 'opacity-0'" />

    <!-- Teleported: the fixed header would otherwise clip the full-screen menu. -->
    <Teleport to="body">
      <Transition name="drop">
        <div
          v-if="menu"
          id="mobile-menu"
          class="fixed inset-x-0 bottom-0 top-[calc(4rem+4px+env(safe-area-inset-top))] z-40 overflow-y-auto bg-paper px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-6 lg:hidden"
        >
          <nav class="flex flex-col" aria-label="Mobil menyu">
            <a
              v-for="(item, i) in nav"
              :key="item.id"
              :href="`#${item.id}`"
              class="menu-item display flex items-baseline justify-between border-b border-line py-5 text-[2.4rem]"
              :style="{ animationDelay: `${0.04 * i}s` }"
              @click.prevent="go(item.id)"
            >
              {{ item.label }}
            </a>
          </nav>
          <button type="button" class="smallcaps mt-8 text-ink-soft" @click="openSearch">Kataloqda axtar</button>
          <div class="mt-10 space-y-1 text-sm text-silver-ink">
            <p class="select-all">{{ site.phoneDisplay }}</p>
            <p class="select-all">{{ site.email }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.link-rule {
  background: linear-gradient(var(--color-gold), var(--color-gold)) left bottom / 0 1px no-repeat;
  transition:
    background-size 260ms var(--ease-out-strong),
    color 200ms ease;
}
@media (hover: hover) and (pointer: fine) {
  .link-rule:hover {
    background-size: 100% 1px;
    color: var(--color-ink);
  }
}
.count {
  animation: tick 0.35s var(--ease-out-strong);
}
.menu-item {
  animation: item-in 0.35s var(--ease-out-strong) both;
}
@keyframes tick {
  from {
    opacity: 0;
    transform: translateY(-6px);
    filter: blur(2px);
  }
}
@keyframes item-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
