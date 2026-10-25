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
    document.title = `${product.value.name} · Noor Textile`;
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
  }, 700);
}

const fit = (i: number) => (product.value.cutout && i === 0 ? "object-contain p-[10%] mix-blend-multiply" : "object-cover");
</script>

<template>
  <SiteHeader />
  <main class="mx-auto max-w-[1440px] px-4 pb-24 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-10 sm:pt-[calc(7.5rem+env(safe-area-inset-top))]">
    <RouterLink :to="{ name: 'home' }" class="smallcaps inline-flex min-h-11 items-center gap-2 text-silver-ink transition-colors hover:text-ink">
      <ArrowLeft class="size-3.5" :stroke-width="1.4" /> Kataloq
    </RouterLink>

    <div class="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="min-w-0 lg:col-span-7">
        <div class="relative aspect-[4/5] overflow-hidden bg-wash">
          <Transition name="fade">
            <img
              :key="product.images[active]"
              :src="product.images[active]"
              :alt="product.name"
              class="absolute inset-0 size-full"
              :class="fit(active)"
            />
          </Transition>
        </div>
        <div v-if="product.images.length > 1" class="mt-6 flex gap-4">
          <button
            v-for="(src, i) in product.images"
            :key="src"
            type="button"
            :aria-label="`Şəkil ${i + 1}`"
            :aria-pressed="active === i"
            class="relative aspect-[4/5] w-20 overflow-hidden bg-wash transition-[opacity,box-shadow] duration-200"
            :class="active === i ? 'shadow-[0_0_0_1px_var(--color-ink)]' : 'opacity-55 hover:opacity-100'"
            @click="active = i"
          >
            <img :src="src" alt="" class="absolute inset-0 size-full" :class="i === 0 && product.cutout ? 'object-contain p-1 mix-blend-multiply' : 'object-cover'" />
          </button>
        </div>
      </div>

      <div class="min-w-0 lg:col-span-5">
        <div class="lg:sticky lg:top-32">
          <h1 class="display text-[clamp(2.6rem,4.6vw,4.2rem)]">{{ product.name }}</h1>
          <p class="mt-3 text-silver-ink">{{ category?.label }}</p>
          <p class="mt-8 text-2xl tabular-nums" :class="onRequest ? 'text-silver-ink' : 'text-ink'">{{ formatPrice(product.price) }}</p>
          <div class="foil-fill mt-8 h-px w-16" />
          <p class="mt-8 max-w-[52ch] text-[1.02rem] leading-[1.8] text-ink-soft">{{ product.description }}</p>

          <dl class="mt-10 border-t border-line text-[0.95rem]">
            <div v-if="product.size" class="flex justify-between gap-6 border-b border-line py-4">
              <dt class="text-silver-ink">Ölçü</dt>
              <dd class="tabular-nums">{{ product.size }}</dd>
            </div>
            <div v-if="product.color" class="flex justify-between gap-6 border-b border-line py-4">
              <dt class="text-silver-ink">Rəng</dt>
              <dd class="text-right">{{ product.color }}</dd>
            </div>
            <div class="flex justify-between gap-6 border-b border-line py-4">
              <dt class="text-silver-ink">Çatdırılma və ödəniş</dt>
              <dd class="text-right">Sifariş zamanı razılaşdırılır</dd>
            </div>
          </dl>

          <a v-if="onRequest" :href="ask" target="_blank" rel="noopener noreferrer" class="btn btn-ink mt-10 w-full">
            Qiyməti WhatsApp-da soruşun
          </a>
          <template v-else>
            <div class="mt-10 flex gap-3">
              <div class="flex min-h-[3.25rem] items-center shadow-[inset_0_0_0_1px_var(--color-line)]">
                <button type="button" aria-label="Azalt" class="grid size-12 place-items-center active:scale-90" @click="qty = Math.max(1, qty - 1)">
                  <Minus class="size-3.5" :stroke-width="1.4" />
                </button>
                <span class="w-7 text-center tabular-nums" aria-live="polite">{{ qty }}</span>
                <button type="button" aria-label="Artır" class="grid size-12 place-items-center active:scale-90" @click="qty++">
                  <Plus class="size-3.5" :stroke-width="1.4" />
                </button>
              </div>
              <button type="button" class="btn btn-ink relative flex-1 overflow-hidden" @click="add">
                <Transition name="label" mode="out-in">
                  <span v-if="added" key="added" class="flex items-center gap-2"><Check class="size-4" :stroke-width="1.6" /> Səbətə əlavə olundu</span>
                  <span v-else key="add">Səbətə əlavə et</span>
                </Transition>
              </button>
            </div>
            <a :href="ask" target="_blank" rel="noopener noreferrer" class="btn btn-line mt-3 w-full">WhatsApp ilə dərhal sifariş</a>
          </template>
        </div>
      </div>
    </div>

    <section v-if="related.length" class="mt-28 border-t border-line pt-16 lg:mt-36">
      <h2 class="display text-[clamp(2rem,3.6vw,3rem)]">Eyni kolleksiyadan</h2>
      <ul class="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 md:grid-cols-4">
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
  transform: translateY(12px);
  filter: blur(3px);
}
.label-leave-to {
  opacity: 0;
  transform: translateY(-12px);
  filter: blur(3px);
}
</style>
