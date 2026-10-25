<script setup lang="ts">
import { RouterLink } from "vue-router";
import SiteHeader from "@/components/SiteHeader.vue";
</script>

<template>
  <SiteHeader />
  <main class="grid min-h-[80svh] place-items-center px-6 text-center">
    <div>
      <h1 class="display text-5xl">Bu səhifə tapılmadı</h1>
      <p class="mt-4 text-ink-soft">Ünvan dəyişmiş ola bilər. Ana səhifədən davam edin.</p>
      <RouterLink to="/" class="btn btn-ink mt-10">Ana səhifə</RouterLink>
    </div>
  </main>
</template>
