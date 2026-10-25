<script setup lang="ts">
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import HeroSection from "@/components/HeroSection.vue";
import CollectionsSection from "@/components/CollectionsSection.vue";
import FeatureSection from "@/components/FeatureSection.vue";
import LightSection from "@/components/LightSection.vue";
import CatalogSection from "@/components/CatalogSection.vue";
</script>

<template>
  <SiteHeader variant="overlay" />
  <main>
    <HeroSection />
    <CollectionsSection />
    <FeatureSection />
    <LightSection />
    <CatalogSection />
  </main>
  <SiteFooter />
</template>
