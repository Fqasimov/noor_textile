<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { Check, MessageCircle, Plus } from "lucide-vue-next";
import { formatPrice, type Product } from "@/data/products";
import { addToCart } from "@/composables/cart";
import { whatsappLink } from "@/data/site";

const props = defineProps<{ product: Product; eager?: boolean }>();

const added = ref(false);
const onRequest = computed(() => props.product.price === null);
const meta = computed(() => [props.product.size, props.product.color].filter(Boolean).join(" · "));

function quickAdd() {
  addToCart(props.product.slug);
  added.value = true;
  setTimeout(() => (added.value = false), 1400);
}
</script>

<template>
  <div class="group relative">
    <RouterLink :to="`/kataloq/${product.slug}`" class="block" :aria-label="`${product.name}, ${formatPrice(product.price)}`">
      <div class="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
        <img
          :src="product.images[0]"
          :alt="product.name"
          :loading="eager ? 'eager' : 'lazy'"
          class="primary absolute inset-0 size-full transition-[transform,opacity] duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
          :class="[product.cutout ? 'object-contain p-[8%] mix-blend-multiply' : 'object-cover', { 'has-alt': product.images[1] }]"
        />
        <img
          v-if="product.images[1]"
          :src="product.images[1]"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="alt absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500"
        />
        <span
          v-if="product.badge"
          class="eyebrow absolute left-3 top-3 whitespace-nowrap rounded-full bg-paper/90 px-3 py-1.5 text-[9px] text-ink backdrop-blur"
        >
          {{ product.badge }}
        </span>
      </div>
      <div class="mt-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div class="min-w-0">
          <h3 class="display line-clamp-2 text-[1.3rem] leading-tight sm:text-[1.45rem]">{{ product.name }}</h3>
          <p class="mt-1 truncate text-xs text-muted">{{ meta }}</p>
        </div>
        <p class="shrink-0 text-sm font-semibold tabular-nums sm:pt-1" :class="{ 'text-gold-deep': onRequest }">
          {{ onRequest ? "Sorğu ilə" : formatPrice(product.price) }}
        </p>
      </div>
    </RouterLink>

    <div class="pointer-events-none absolute inset-x-0 top-0 aspect-[4/5]">
      <a
        v-if="onRequest"
        :href="whatsappLink(`Salam! «${product.name}» haqqında məlumat almaq istəyirəm.`)"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${product.name} — qiyməti soruş`"
        class="action pointer-events-auto absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-paper text-ink shadow-lg"
      >
        <MessageCircle class="size-[18px]" :stroke-width="1.6" />
      </a>
      <button
        v-else
        type="button"
        :aria-label="`${product.name} səbətə əlavə et`"
        class="action pointer-events-auto absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-paper text-ink shadow-lg hover:bg-ink hover:text-paper"
        @click="quickAdd"
      >
        <Transition name="swap" mode="out-in">
          <Check v-if="added" class="size-[18px]" :stroke-width="2" />
          <Plus v-else class="size-[18px]" :stroke-width="1.6" />
        </Transition>
      </button>
    </div>
  </div>
</template>

<style scoped>
.action {
  transition:
    transform 150ms var(--ease-out-strong),
    background-color 150ms ease,
    color 150ms ease;
}
.action:active {
  transform: scale(0.9);
}
@media (hover: hover) and (pointer: fine) {
  .group:hover .primary.has-alt {
    opacity: 0;
  }
  .group:hover .alt {
    opacity: 1;
  }
}
@media not ((hover: hover) and (pointer: fine)) {
  .alt {
    display: none;
  }
}
</style>
