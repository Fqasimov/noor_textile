<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { ArrowLeft, Check, Minus, Plus } from "lucide-vue-next";
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import ProductCard from "@/components/ProductCard.vue";
import { categories, formatPrice, getProduct, products } from "@/data/products";
import { addToCart, cartOpen } from "@/composables/cart";
import { whatsappLink } from "@/data/site";

const route = useRoute();
const product = computed(() => getProduct(String(route.params.slug))!);
const category = computed(() => categories.find((c) => c.id === product.value.category));
const related = computed(() =>
  products.filter((p) => p.category === product.value.category && p.slug !== product.value.slug).slice(0, 4),
);
const onRequest = computed(() => product.value.price === null);

const active = ref(0);
const qty = ref(1);
const added = ref(false);
watch(
  () => route.params.slug,
  () => {
    active.value = 0;
    qty.value = 1;
    document.title = `${product.value.name} — Noor Textile`;
  },
  { immediate: true },
);

const ask = computed(() =>
  whatsappLink(
    onRequest.value
      ? `Salam! «${product.value.name}» haqqında məlumat və qiymət almaq istəyirəm.`
      : `Salam! «${product.value.name}»${product.value.size ? ` (${product.value.size})` : ""} × ${qty.value} sifariş etmək istəyirəm.`,
  ),
);

function add() {
  addToCart(product.value.slug, qty.value);
  added.value = true;
  setTimeout(() => {
    added.value = false;
    cartOpen.value = true;
  }, 650);
}

const imgClass = (i: number) =>
  product.value.cutout && i === 0 ? "object-contain p-[10%] mix-blend-multiply" : "object-cover";
</script>

<template>
  <SiteHeader />
  <main class="mx-auto max-w-7xl px-4 pb-24 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-8 sm:pt-[calc(7rem+env(safe-area-inset-top))]">
    <RouterLink
      :to="{ name: 'home' }"
      class="eyebrow mb-8 inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
    >
      <ArrowLeft class="size-3.5" /> Kataloq
    </RouterLink>

    <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div class="min-w-0 lg:col-span-7">
        <div class="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
          <Transition name="fade">
            <img
              :key="product.images[active]"
              :src="product.images[active]"
              :alt="product.name"
              class="absolute inset-0 size-full"
              :class="imgClass(active)"
            />
          </Transition>
        </div>
        <div v-if="product.images.length > 1" class="mt-3 flex gap-3">
          <button
            v-for="(src, i) in product.images"
            :key="src"
            type="button"
            :aria-label="`Şəkil ${i + 1}`"
            :aria-pressed="active === i"
            class="relative aspect-[4/5] w-20 overflow-hidden rounded-sm bg-mist transition-[opacity,box-shadow] duration-200"
            :class="active === i ? 'ring-1 ring-ink ring-offset-2 ring-offset-paper' : 'opacity-60 hover:opacity-100'"
            @click="active = i"
          >
            <img :src="src" alt="" class="absolute inset-0 size-full" :class="i === 0 && product.cutout ? 'object-contain p-1 mix-blend-multiply' : 'object-cover'" />
          </button>
        </div>
      </div>

      <div class="min-w-0 lg:col-span-5">
        <div class="lg:sticky lg:top-28">
          <p class="eyebrow text-gold-deep">{{ category?.label }}</p>
          <h1 class="display mt-4 text-[clamp(2.6rem,5vw,4rem)]">{{ product.name }}</h1>
          <p class="mt-4 text-2xl font-semibold tabular-nums" :class="{ 'text-gold-deep': onRequest }">
            {{ formatPrice(product.price) }}
          </p>
          <p class="mt-8 text-[15px] leading-relaxed text-muted">{{ product.description }}</p>

          <dl class="mt-8 divide-y divide-line border-y border-line text-sm">
            <div v-if="product.size" class="flex justify-between gap-4 py-3.5">
              <dt class="text-muted">Ölçü</dt>
              <dd>{{ product.size }}</dd>
            </div>
            <div v-if="product.color" class="flex justify-between gap-4 py-3.5">
              <dt class="text-muted">Rəng</dt>
              <dd class="text-right">{{ product.color }}</dd>
            </div>
            <div class="flex justify-between gap-4 py-3.5">
              <dt class="text-muted">Çatdırılma və ödəniş</dt>
              <dd class="text-right">Sifarişdə razılaşdırılır</dd>
            </div>
          </dl>

          <a v-if="onRequest" :href="ask" target="_blank" rel="noopener noreferrer" class="btn btn-dark mt-8 w-full">
            Qiyməti soruş
          </a>
          <template v-else>
            <div class="mt-8 flex gap-3">
              <div class="flex h-12 items-center rounded-full border border-line bg-white">
                <button type="button" aria-label="Azalt" class="grid size-12 place-items-center active:scale-90" @click="qty = Math.max(1, qty - 1)">
                  <Minus class="size-3.5" />
                </button>
                <span class="w-6 text-center tabular-nums">{{ qty }}</span>
                <button type="button" aria-label="Artır" class="grid size-12 place-items-center active:scale-90" @click="qty++">
                  <Plus class="size-3.5" />
                </button>
              </div>
              <button type="button" class="btn btn-dark relative flex-1 overflow-hidden" @click="add">
                <Transition name="label" mode="out-in">
                  <span v-if="added" key="added" class="flex items-center gap-2"><Check class="size-4" /> Əlavə olundu</span>
                  <span v-else key="add">Səbətə əlavə et</span>
                </Transition>
              </button>
            </div>
            <a :href="ask" target="_blank" rel="noopener noreferrer" class="btn btn-outline mt-3 w-full">WhatsApp ilə dərhal sifariş</a>
          </template>
        </div>
      </div>
    </div>

    <section v-if="related.length" class="mt-28 border-t border-line pt-14">
      <h2 class="display text-4xl">Bunlar da xoşunuza gələ bilər</h2>
      <ul class="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 xl:gap-x-6">
        <li v-for="p in related" :key="p.slug" class="min-w-0"><ProductCard :product="p" /></li>
      </ul>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.label-enter-active,
.label-leave-active {
  transition:
    opacity 0.2s var(--ease-out-strong),
    transform 0.2s var(--ease-out-strong),
    filter 0.2s var(--ease-out-strong);
}
.label-enter-from {
  opacity: 0;
  transform: translateY(14px);
  filter: blur(4px);
}
.label-leave-to {
  opacity: 0;
  transform: translateY(-14px);
  filter: blur(4px);
}
</style>
