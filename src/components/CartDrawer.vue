<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-vue-next";
import { cartCount, cartLines, cartOpen, cartTotal, setQty } from "@/composables/cart";
import { formatPrice } from "@/data/products";
import { site, whatsappLink } from "@/data/site";

const name = ref("");
const phone = ref("");
const address = ref("");

const hasOnRequest = computed(() => cartLines.value.some((l) => l.product.price === null));

const message = computed(() =>
  [
    "Salam! Noor Textile saytından sifariş:",
    "",
    ...cartLines.value.map(
      (l, i) =>
        `${i + 1}. ${l.product.name}${l.product.size ? ` (${l.product.size})` : ""} × ${l.qty} — ${
          l.product.price === null ? "qiymət sorğu ilə" : `${l.product.price * l.qty} ₼`
        }`,
    ),
    "",
    `Cəmi: ${cartTotal.value} ₼${hasOnRequest.value ? " + sorğu ilə olan məhsullar" : ""}`,
    name.value ? `Ad: ${name.value}` : null,
    phone.value ? `Telefon: ${phone.value}` : null,
    address.value ? `Ünvan: ${address.value}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n"),
);

const onKey = (e: KeyboardEvent) => e.key === "Escape" && (cartOpen.value = false);
watch(cartOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
  if (open) document.addEventListener("keydown", onKey);
  else document.removeEventListener("keydown", onKey);
});
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));

const field =
  "h-11 rounded-md border border-line bg-white px-4 text-sm outline-none transition-colors focus:border-gold";
</script>

<template>
  <Transition name="cart" :duration="450">
  <div v-if="cartOpen" class="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Səbət">
      <div class="backdrop absolute inset-0 bg-ink/40 backdrop-blur-[2px]" @click="cartOpen = false" />
      <aside
        class="panel absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-2xl"
      >
        <div class="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p class="eyebrow text-gold-deep">Səbət</p>
            <p class="display text-2xl">{{ cartCount ? `${cartCount} məhsul` : "Səbət boşdur" }}</p>
          </div>
          <button
            type="button"
            aria-label="Bağla"
            class="grid size-10 place-items-center rounded-full border border-line transition-transform active:scale-95"
            @click="cartOpen = false"
          >
            <X class="size-4" />
          </button>
        </div>

        <div v-if="cartLines.length === 0" class="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
          <div class="grid size-16 place-items-center rounded-full bg-mist">
            <ShoppingBag class="size-6 text-gold-deep" :stroke-width="1.4" />
          </div>
          <p class="text-sm text-muted">Kataloqdan bəyəndiyiniz məhsulları əlavə edin.</p>
          <RouterLink :to="{ name: 'home', hash: '#kataloq' }" class="btn btn-dark" @click="cartOpen = false">
            Kataloqa bax
          </RouterLink>
        </div>

        <template v-else>
          <TransitionGroup tag="ul" name="card" class="flex-1 divide-y divide-line overflow-y-auto px-6">
            <li v-for="l in cartLines" :key="l.slug" class="flex gap-4 py-5">
              <div class="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-mist">
                <img
                  :src="l.product.images[0]"
                  :alt="l.product.name"
                  class="absolute inset-0 size-full"
                  :class="l.product.cutout ? 'object-contain p-1 mix-blend-multiply' : 'object-cover'"
                />
              </div>
              <div class="flex min-w-0 flex-1 flex-col">
                <RouterLink :to="`/kataloq/${l.slug}`" class="display truncate text-xl" @click="cartOpen = false">
                  {{ l.product.name }}
                </RouterLink>
                <p class="text-xs text-muted">{{ l.product.size ?? l.product.color }}</p>
                <div class="mt-auto flex items-center justify-between">
                  <div class="flex items-center rounded-full border border-line">
                    <button type="button" aria-label="Azalt" class="grid size-8 place-items-center active:scale-90" @click="setQty(l.slug, l.qty - 1)">
                      <Minus class="size-3" />
                    </button>
                    <span class="w-6 text-center text-sm tabular-nums">{{ l.qty }}</span>
                    <button type="button" aria-label="Artır" class="grid size-8 place-items-center active:scale-90" @click="setQty(l.slug, l.qty + 1)">
                      <Plus class="size-3" />
                    </button>
                  </div>
                  <p class="text-sm font-semibold tabular-nums">
                    {{ l.product.price === null ? formatPrice(null) : `${l.product.price * l.qty} ₼` }}
                  </p>
                </div>
              </div>
            </li>
          </TransitionGroup>

          <form class="space-y-4 border-t border-line bg-mist/60 px-6 py-5" @submit.prevent>
            <div class="grid gap-2">
              <input id="cart-name" v-model="name" placeholder="Adınız" autocomplete="name" :class="field" />
              <input id="cart-phone" v-model="phone" placeholder="Telefon" type="tel" inputmode="tel" autocomplete="tel" :class="field" />
              <input id="cart-address" v-model="address" placeholder="Çatdırılma ünvanı" autocomplete="street-address" :class="field" />
            </div>
            <div class="flex items-baseline justify-between">
              <span class="eyebrow text-muted">Cəmi</span>
              <span class="display text-3xl tabular-nums">
                {{ cartTotal }} ₼<span v-if="hasOnRequest" class="ml-1 align-middle text-xs text-muted">+ sorğu</span>
              </span>
            </div>
            <a :href="whatsappLink(message)" target="_blank" rel="noopener noreferrer" class="btn btn-gold w-full">
              WhatsApp ilə sifariş et
            </a>
            <p class="text-center text-xs text-muted">
              Sifarişi təsdiqləmək üçün sizinlə əlaqə saxlayacağıq · {{ site.phoneDisplay }}
            </p>
          </form>
        </template>
      </aside>
  </div>
  </Transition>
</template>

<style scoped>
.cart-enter-active .backdrop,
.cart-leave-active .backdrop {
  transition: opacity 0.25s ease;
}
.cart-enter-active .panel,
.cart-leave-active .panel {
  transition: transform 0.45s var(--ease-drawer);
}
.cart-enter-from .backdrop,
.cart-leave-to .backdrop {
  opacity: 0;
}
.cart-enter-from .panel,
.cart-leave-to .panel {
  transform: translateX(100%);
}
</style>
