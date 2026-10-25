<script setup lang="ts">
import { goToSection } from "@/router";

/**
 * Rəkabə: the catchword written at the foot of a manuscript page, repeating the first
 * word of the next one. Here it links to the next section.
 */
defineProps<{ to: string; word: string }>();
</script>

<template>
  <div class="flex justify-end">
    <a
      :href="`#${to}`"
      class="group inline-flex items-center gap-3 text-silver-ink transition-colors duration-200 hover:text-ink"
      @click.prevent="goToSection(to)"
    >
      <span class="h-px w-10 bg-gold transition-[width] duration-300 ease-[var(--ease-out-strong)] group-hover:w-16" />
      <span class="display text-lg">{{ word }}</span>
    </a>
  </div>
</template>
