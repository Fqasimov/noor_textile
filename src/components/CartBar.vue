<script setup lang="ts">
import { computed } from "vue";
import { cartCount, cartLines, cartOpen, cartTotal } from "@/composables/cart";

/** A quiet bar that rises once something is in the bag, so the order is always one tap away. */
const show = computed(() => cartCount.value > 0 && !cartOpen.value);
const onRequest = computed(() => cartLines.value.some((l) => l.product.price === null));
</script>

<template>
  <Transition name="bar">
    <button
      v-if="show"
      type="button"
      class="bar fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 mx-auto flex h-14 w-[min(520px,calc(100%-2rem))] items-center justify-between bg-ink pl-6 pr-2 text-paper shadow-[0_18px_40px_rgb(13_12_10/0.28)]"
      @click="cartOpen = true"
    >
      <span class="text-[0.95rem]">
        <span class="tabular-nums">{{ cartCount }}</span> məhsul
        <span class="mx-2 text-white/35">·</span>
        <span class="tabular-nums">{{ cartTotal }} ₼</span><span v-if="onRequest" class="text-white/55"> +</span>
      </span>
      <span class="smallcaps foil-fill flex h-10 items-center px-5 text-ink">Sifariş</span>
    </button>
  </Transition>
</template>

<style scoped>
.bar {
  transition: transform 160ms var(--ease-out-strong);
}
.bar:active {
  transform: scale(0.98);
}
.bar-enter-active {
  transition:
    opacity 400ms var(--ease-out-strong),
    translate 400ms var(--ease-out-strong);
}
.bar-leave-active {
  transition:
    opacity 200ms ease,
    translate 200ms ease;
}
.bar-enter-from,
.bar-leave-to {
  opacity: 0;
  translate: 0 24px;
}
</style>
