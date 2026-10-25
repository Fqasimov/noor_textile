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
  setTimeout(() => (added.value = false), 1600);
}
</script>

<template>
  <article class="card relative">
    <RouterLink :to="`/kataloq/${product.slug}`" class="block" :aria-label="`${product.name}, ${formatPrice(product.price)}`">
      <div class="relative aspect-[4/5] overflow-hidden bg-wash">
        <img
          :src="product.images[0]"
          :alt="product.name"
          :loading="eager ? 'eager' : 'lazy'"
          class="primary absolute inset-0 size-full"
          :class="[product.cutout ? 'object-contain p-[10%] mix-blend-multiply' : 'object-cover', { 'has-alt': product.images[1] }]"
        />
        <img
          v-if="product.images[1]"
          :src="product.images[1]"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="alt absolute inset-0 size-full object-cover opacity-0"
        />
        <span v-if="product.badge" class="smallcaps absolute left-3 top-3 bg-paper px-2.5 py-1.5 text-[0.6rem] text-ink">{{ product.badge }}</span>
      </div>
      <div class="mt-4 pr-14">
        <h3 class="display text-[1.3rem] leading-tight sm:text-[1.5rem]">{{ product.name }}</h3>
        <p class="mt-1 truncate text-[0.82rem] text-silver-ink">{{ meta }}</p>
        <p class="mt-2 tabular-nums text-[0.95rem]" :class="onRequest ? 'text-silver-ink' : 'text-ink'">
          {{ onRequest ? "Qiymət sorğu ilə" : formatPrice(product.price) }}
        </p>
      </div>
    </RouterLink>

    <!-- One clear action per card, always visible (touch has no hover). -->
    <a
      v-if="onRequest"
      :href="whatsappLink(`Salam! «${product.name}» haqqında məlumat almaq istəyirəm.`)"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${product.name}: qiyməti soruşun`"
      class="action absolute bottom-0 right-0 grid size-11 place-items-center text-ink shadow-[inset_0_0_0_1px_var(--color-ink)]"
    >
      <MessageCircle class="size-4" :stroke-width="1.5" />
    </a>
    <button
      v-else
      type="button"
      class="action absolute bottom-0 right-0 grid size-11 place-items-center"
      :class="added ? 'foil-fill text-ink' : 'bg-ink text-paper'"
      :aria-label="`${product.name} səbətə əlavə et`"
      @click="quickAdd"
    >
      <Transition name="swap" mode="out-in">
        <Check v-if="added" class="size-4" :stroke-width="1.8" />
        <Plus v-else class="size-4" :stroke-width="1.6" />
      </Transition>
    </button>
  </article>
</template>

<style scoped>
.primary,
.alt {
  transition:
    transform 1s var(--ease-out-strong),
    opacity 600ms ease;
}
.action {
  transition:
    transform 150ms var(--ease-out-strong),
    background-color 200ms ease;
}
.action:active {
  transform: scale(0.92);
}
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 160ms ease,
    transform 160ms var(--ease-out-strong),
    filter 160ms ease;
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: scale(0.7);
  filter: blur(2px);
}
@media (hover: hover) and (pointer: fine) {
  .card:hover .primary {
    transform: scale(1.04);
  }
  .card:hover .primary.has-alt {
    opacity: 0;
  }
  .card:hover .alt {
    opacity: 1;
  }
}
@media not ((hover: hover) and (pointer: fine)) {
  .alt {
    display: none;
  }
}
</style>
