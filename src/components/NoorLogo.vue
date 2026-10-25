<script setup lang="ts">
import {
  LETTER_N,
  LETTER_R,
  LOGO_VIEWBOX as V,
  ORNAMENT_FILLS,
  ORNAMENT_STROKES,
  QUARTERS,
  RING_CENTERS,
  RING_CY,
  TEXTILE,
} from "@/logo/logo-paths";

withDefaults(defineProps<{ ornamentColor?: string; title?: string }>(), { title: "Noor Textile" });
</script>

<template>
  <svg :viewBox="`${V.x} ${V.y} ${V.width} ${V.height}`" role="img" :aria-label="title" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor">
      <path :d="LETTER_N" />
      <path :d="LETTER_R" />
      <path v-for="(d, i) in TEXTILE" :key="i" :d="d" />
    </g>
    <g :style="ornamentColor ? { color: ornamentColor } : undefined">
      <g v-for="cx in RING_CENTERS" :key="cx" :transform="`translate(${cx} ${RING_CY})`">
        <g v-for="t in QUARTERS" :key="t" :transform="t">
          <path
            v-for="(s, i) in ORNAMENT_STROKES"
            :key="i"
            :d="s.d"
            fill="none"
            stroke="currentColor"
            :stroke-width="s.w"
            stroke-linecap="round"
          />
          <path v-for="(d, i) in ORNAMENT_FILLS" :key="'f' + i" :d="d" fill="currentColor" />
        </g>
      </g>
    </g>
  </svg>
</template>
