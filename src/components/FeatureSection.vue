<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import RingWindow from "./RingWindow.vue";
import { addToCart } from "@/composables/cart";
import { asset } from "@/asset";

const images = [asset("images/products/xosrov-ve-sirin.jpg"), asset("images/lifestyle/xosrov.jpg")];
const active = ref(0);
const added = ref(false);
let timer: number | undefined;

onMounted(() => {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    timer = window.setInterval(() => (active.value = (active.value + 1) % images.length), 5000);
});
onBeforeUnmount(() => clearInterval(timer));

function add() {
  addToCart("xosrov-ve-sirin");
  added.value = true;
  setTimeout(() => (added.value = false), 1800);
}
</script>

<template>
  <section class="bg-wash">
    <div class="mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:py-32">
      <div class="mx-auto w-full max-w-[560px]">
        <RingWindow :images="images" :active="active" alt="«Xosrov və Şirin» yastığı, loqonun O pəncərəsindən" />
      </div>
      <div class="max-w-[560px]">
        <h2 class="display text-[clamp(2.8rem,5.4vw,5rem)]">Xosrov və Şirin</h2>
        <p class="mt-8 text-[1.06rem] leading-[1.8] text-ink-soft">
          Nizami Gəncəvinin XII əsrdə yazdığı poemadan bir səhnə: bağda, gül kolunun yanında iki sevgili. Miniatür
          ustalarının qızılı haşiyəsi göy kətanın üzərində tikmə ilə yenidən doğulur.
        </p>
        <dl class="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 text-[0.95rem]">
          <div>
            <dt class="text-silver-ink">Ölçü</dt>
            <dd class="mt-1">40 × 50 sm</dd>
          </div>
          <div>
            <dt class="text-silver-ink">Qiymət</dt>
            <dd class="mt-1 tabular-nums">100 ₼</dd>
          </div>
        </dl>
        <div class="mt-10 flex flex-wrap gap-3">
          <button type="button" class="btn btn-ink min-w-[220px]" @click="add">
            <Transition name="swap" mode="out-in">
              <span :key="String(added)">{{ added ? "Səbətdədir" : "Səbətə əlavə et" }}</span>
            </Transition>
          </button>
          <RouterLink to="/kataloq/xosrov-ve-sirin" class="btn btn-line">Ətraflı</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 180ms ease,
    filter 180ms ease;
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  filter: blur(2px);
}
</style>
