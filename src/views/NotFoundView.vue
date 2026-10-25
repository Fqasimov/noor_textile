<script setup lang="ts">
import { RouterLink } from "vue-router";
import SiteHeader from "@/components/SiteHeader.vue";
</script>

<template>
  <SiteHeader />
  <main class="grid min-h-[80svh] place-items-center px-6 text-center">
    <div>
      <p class="eyebrow text-gold-deep">404</p>
      <h1 class="display mt-4 text-5xl">Səhifə tapılmadı</h1>
      <RouterLink to="/" class="btn btn-dark mt-8">Ana səhifə</RouterLink>
    </div>
  </main>
</template>
