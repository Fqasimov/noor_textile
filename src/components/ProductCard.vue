<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { Check, Plus } from "lucide-vue-next";
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
  <article class="card flex h-full flex-col">
    <RouterLink :to="`/kataloq/${product.slug}`" class="block" :aria-label="`${product.name}, ${formatPrice(product.price)}`">
      <div class="plate relative aspect-[4/5] overflow-hidden bg-wash">
        <img
          :src="product.images[0]"
          :alt="product.name"
          :loading="eager ? 'eager' : 'lazy'"
          class="primary absolute inset-0 size-full"
          :class="[product.cutout ? 'object-contain p-[9%] mix-blend-multiply' : 'object-cover', { 'has-alt': product.images[1] }]"
        />
        <img
          v-if="product.images[1]"
          :src="product.images[1]"
          alt=""
          aria-hidden="true"
          loading="lazy"
          class="alt absolute inset-0 size-full object-cover opacity-0"
        />
        <span v-if="product.badge" class="smallcaps absolute bottom-3 left-3 bg-paper px-2.5 py-1 text-[0.62rem] text-ink">
          {{ product.badge }}
        </span>
      </div>
      <h3 class="display mt-5 text-[1.4rem] leading-tight sm:text-[1.55rem]">{{ product.name }}</h3>
      <p class="mt-1.5 text-[0.82rem] text-silver-ink">{{ meta }}</p>
    </RouterLink>

    <div class="mt-auto flex items-center justify-between gap-3 pt-5">
      <p class="tabular-nums text-[0.95rem]" :class="onRequest ? 'text-silver-ink' : 'font-medium text-ink'">
        {{ onRequest ? "Qiymət sorğu ilə" : formatPrice(product.price) }}
      </p>
      <a
        v-if="onRequest"
        :href="whatsappLink(`Salam! «${product.name}» haqqında məlumat almaq istəyirəm.`)"
        target="_blank"
        rel="noopener noreferrer"
        class="action smallcaps min-h-11 border-b border-gold text-[0.66rem] text-ink-soft"
      >
        Soruşun
      </a>
      <button
        v-else
        type="button"
        class="action smallcaps relative flex min-h-11 items-center gap-1.5 text-[0.66rem] text-ink"
        :aria-label="`${product.name} səbətə əlavə et`"
        @click="quickAdd"
      >
        <Transition name="swap" mode="out-in">
          <span v-if="added" key="done" class="flex items-center gap-1.5 text-gold-deep"><Check class="size-3.5" :stroke-width="1.6" /> Səbətdə</span>
          <span v-else key="add" class="flex items-center gap-1.5 border-b border-gold"><Plus class="size-3.5" :stroke-width="1.6" /> Səbətə</span>
        </Transition>
      </button>
    </div>
  </article>
</template>

<style scoped>
.primary,
.alt {
  transition:
    transform 900ms var(--ease-out-strong),
    opacity 500ms ease;
}
.action {
  transition:
    transform 150ms var(--ease-out-strong),
    color 200ms ease;
}
.action:active {
  transform: scale(0.96);
}
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 180ms var(--ease-out-strong),
    filter 180ms var(--ease-out-strong);
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  filter: blur(2px);
}
@media (hover: hover) and (pointer: fine) {
  .card:hover .primary {
    transform: scale(1.03);
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
