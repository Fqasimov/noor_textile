<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { Minus, Plus, X } from "lucide-vue-next";
import { cartCount, cartLines, cartOpen, cartTotal, setQty } from "@/composables/cart";
import { formatPrice } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import { goToSection } from "@/router";

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
        `${i + 1}. ${l.product.name}${l.product.size ? ` (${l.product.size})` : ""} × ${l.qty}: ${
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

function browse() {
  cartOpen.value = false;
  goToSection("kataloq");
}
</script>

<template>
  <Transition name="cart" :duration="450">
    <div v-if="cartOpen" class="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div class="backdrop absolute inset-0 bg-ink/35" @click="cartOpen = false" />
      <aside
        class="panel absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-paper pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-[-24px_0_60px_rgba(0,0,0,0.12)]"
      >
        <div class="flex items-center justify-between px-7 pb-5 pt-7">
          <h2 id="cart-title" class="display text-[2rem]">
            Səbət <span class="text-base text-silver-ink tabular-nums">{{ cartCount }}</span>
          </h2>
          <button type="button" aria-label="Səbəti bağla" class="grid size-11 place-items-center text-ink-soft hover:text-ink active:scale-95" @click="cartOpen = false">
            <X class="size-5" :stroke-width="1.3" />
          </button>
        </div>
        <div class="mx-7 h-px bg-line" />

        <div v-if="cartLines.length === 0" class="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
          <p class="display text-2xl">Səbət hələ boşdur</p>
          <p class="text-ink-soft">Kataloqdan bəyəndiyiniz əsəri seçin, burada sizi gözləyəcək.</p>
          <button type="button" class="btn btn-ink" @click="browse">Kataloqa keçin</button>
        </div>

        <template v-else>
          <TransitionGroup tag="ul" name="card" class="flex-1 overflow-y-auto px-7">
            <li v-for="l in cartLines" :key="l.slug" class="flex gap-5 border-b border-line py-6">
              <div class="relative h-[104px] w-[84px] shrink-0 overflow-hidden bg-wash">
                <img
                  :src="l.product.images[0]"
                  :alt="l.product.name"
                  class="absolute inset-0 size-full"
                  :class="l.product.cutout ? 'object-contain p-1.5 mix-blend-multiply' : 'object-cover'"
                />
              </div>
              <div class="flex min-w-0 flex-1 flex-col">
                <RouterLink :to="`/kataloq/${l.slug}`" class="display truncate text-[1.3rem] hover:text-gold-deep" @click="cartOpen = false">
                  {{ l.product.name }}
                </RouterLink>
                <p class="text-[0.82rem] text-silver-ink">{{ l.product.size ?? l.product.color }}</p>
                <div class="mt-auto flex items-center justify-between">
                  <div class="flex items-center shadow-[inset_0_0_0_1px_var(--color-line)]">
                    <button type="button" :aria-label="`${l.product.name}: azalt`" class="grid size-9 place-items-center active:scale-90" @click="setQty(l.slug, l.qty - 1)">
                      <Minus class="size-3" :stroke-width="1.4" />
                    </button>
                    <span class="w-6 text-center text-sm tabular-nums">{{ l.qty }}</span>
                    <button type="button" :aria-label="`${l.product.name}: artır`" class="grid size-9 place-items-center active:scale-90" @click="setQty(l.slug, l.qty + 1)">
                      <Plus class="size-3" :stroke-width="1.4" />
                    </button>
                  </div>
                  <p class="tabular-nums text-[0.95rem]">
                    {{ l.product.price === null ? formatPrice(null) : `${l.product.price * l.qty} ₼` }}
                  </p>
                </div>
              </div>
            </li>
          </TransitionGroup>

          <form class="space-y-5 bg-wash px-7 pb-7 pt-6" @submit.prevent>
            <div class="grid gap-4">
              <label class="block">
                <span class="smallcaps text-[0.62rem] text-silver-ink">Adınız</span>
                <input id="cart-name" v-model="name" autocomplete="name" class="field" />
              </label>
              <label class="block">
                <span class="smallcaps text-[0.62rem] text-silver-ink">Telefon</span>
                <input id="cart-phone" v-model="phone" type="tel" inputmode="tel" autocomplete="tel" class="field" />
              </label>
              <label class="block">
                <span class="smallcaps text-[0.62rem] text-silver-ink">Çatdırılma ünvanı</span>
                <input id="cart-address" v-model="address" autocomplete="street-address" class="field" />
              </label>
            </div>
            <div class="flex items-baseline justify-between border-t border-line pt-5">
              <span class="text-ink-soft">Cəmi</span>
              <span class="text-[1.5rem] font-medium tabular-nums">
                {{ cartTotal }} ₼<span v-if="hasOnRequest" class="ml-2 align-middle text-xs font-normal text-silver-ink">+ sorğu ilə</span>
              </span>
            </div>
            <a :href="whatsappLink(message)" target="_blank" rel="noopener noreferrer" class="btn btn-ink w-full">
              Sifarişi WhatsApp-a göndərin
            </a>
            <p class="text-center text-[0.8rem] text-silver-ink">
              Sifarişi təsdiqləmək üçün sizə zəng edəcəyik. {{ site.phoneDisplay }}
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
  transition: opacity 0.3s ease;
}
.cart-enter-active .panel {
  transition: transform 0.45s var(--ease-drawer);
}
.cart-leave-active .panel {
  transition: transform 0.3s var(--ease-drawer);
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
