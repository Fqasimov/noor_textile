<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import IntroOverlay from "@/components/IntroOverlay.vue";
import CartDrawer from "@/components/CartDrawer.vue";
import { finishIntro, introDone, introPlaying } from "@/composables/intro";

const router = useRouter();

// The intro opens the home page only; deep links to a product skip it.
router.isReady().then(() => {
  if (router.currentRoute.value.name !== "home" && introPlaying.value) {
    finishIntro();
    introDone.value = true;
  }
});

function onIntroDone() {
  finishIntro();
  introDone.value = true;
}
</script>

<template>
  <IntroOverlay v-if="introPlaying" @done="onIntroDone" />
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <div :key="route.name === 'product' ? route.fullPath : String(route.name)">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
  <CartDrawer />
</template>
