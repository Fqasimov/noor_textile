<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { Menu, Search, ShoppingBag, X } from "lucide-vue-next";
import NoorLogo from "./NoorLogo.vue";
import { cartCount, cartOpen, cartPulse } from "@/composables/cart";
import { goToSection } from "@/router";
import { site } from "@/data/site";

/** `overlay` starts transparent over the dark hero; `solid` is used on inner pages. */
const props = withDefaults(defineProps<{ variant?: "overlay" | "solid" }>(), { variant: "solid" });

const nav = [
  { id: "haqqimizda", label: "Haqqımızda" },
  { id: "terefdaslar", label: "Tərəfdaşlar" },
  { id: "kataloq", label: "Kataloq" },
  { id: "elaqe", label: "Əlaqə" },
];

const scrolled = ref(false);
const menu = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 24);

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  document.body.style.overflow = "";
});
watch(menu, (open) => (document.body.style.overflow = open ? "hidden" : ""));

const dark = computed(() => props.variant === "overlay" && !scrolled.value && !menu.value);

function go(id: string) {
  menu.value = false;
  goToSection(id);
}

function openSearch() {
  go("kataloq");
  setTimeout(() => document.getElementById("catalog-search")?.focus({ preventScroll: true }), 600);
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow,color] duration-300"
    :class="
      dark
        ? 'bg-transparent text-paper'
        : 'bg-paper/85 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150'
    "
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-8">
      <RouterLink to="/" aria-label="Noor Textile — ana səhifə" class="shrink-0" @click="menu = false">
        <NoorLogo class="h-8 w-auto sm:h-9" ornament-color="var(--color-gold)" />
      </RouterLink>

      <nav class="hidden items-center gap-9 lg:flex" aria-label="Əsas menyu">
        <a
          v-for="item in nav"
          :key="item.id"
          :href="`#${item.id}`"
          class="eyebrow py-2 opacity-80 transition-opacity duration-200 hover:opacity-100"
          @click.prevent="go(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-1">
        <button
          type="button"
          aria-label="Axtarış"
          class="grid size-11 place-items-center rounded-full transition-colors hover:bg-current/5"
          @click="openSearch"
        >
          <Search class="size-[18px]" :stroke-width="1.6" />
        </button>
        <button
          type="button"
          :aria-label="`Səbət, ${cartCount} məhsul`"
          class="relative grid size-11 place-items-center rounded-full transition-[transform,background-color] duration-150 hover:bg-current/5 active:scale-95"
          @click="cartOpen = true"
        >
          <ShoppingBag class="size-[18px]" :stroke-width="1.6" />
          <Transition name="swap">
            <span
              v-if="cartCount > 0"
              :key="cartPulse"
              class="badge absolute right-1 top-1 grid min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold leading-[18px] text-ink tabular-nums"
            >
              {{ cartCount }}
            </span>
          </Transition>
        </button>
        <button
          type="button"
          class="grid size-11 place-items-center rounded-full lg:hidden"
          :aria-label="menu ? 'Menyunu bağla' : 'Menyunu aç'"
          :aria-expanded="menu"
          @click="menu = !menu"
        >
          <X v-if="menu" class="size-5" :stroke-width="1.6" />
          <Menu v-else class="size-5" :stroke-width="1.6" />
        </button>
      </div>
    </div>

    <!-- Teleported: the header's backdrop-filter would otherwise become the menu's containing block. -->
    <Teleport to="body">
    <Transition name="drop">
      <div v-if="menu" class="fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-40 overflow-y-auto bg-paper px-6 pb-10 pt-6 lg:hidden">
        <nav class="flex flex-col" aria-label="Mobil menyu">
          <a
            v-for="(item, i) in nav"
            :key="item.id"
            :href="`#${item.id}`"
            class="menu-item display block border-b border-line py-4 text-4xl"
            :style="{ animationDelay: `${0.04 * i}s` }"
            @click.prevent="go(item.id)"
          >
            {{ item.label }}
          </a>
        </nav>
        <div class="mt-10 space-y-2 text-sm text-muted">
          <p class="select-all">{{ site.phoneDisplay }}</p>
          <p class="select-all">{{ site.email }}</p>
        </div>
      </div>
    </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.badge {
  animation: pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.menu-item {
  animation: item-in 0.3s cubic-bezier(0.23, 1, 0.32, 1) both;
}
@keyframes pop {
  from {
    transform: scale(0.6);
  }
  to {
    transform: scale(1);
  }
}
@keyframes item-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
