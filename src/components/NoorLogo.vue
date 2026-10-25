<script setup lang="ts">
import { useId } from "vue";
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

/**
 * The NOOR TEXTILE wordmark. By default N, R and the O-frames are metallic gold foil and
 * TEXTILE takes `currentColor`, so it reads black on white and white on a photograph.
 */
withDefaults(defineProps<{ title?: string; foil?: boolean }>(), { title: "Noor Textile", foil: true });
const id = useId();
</script>

<template>
  <svg :viewBox="`${V.x} ${V.y} ${V.width} ${V.height}`" role="img" :aria-label="title" xmlns="http://www.w3.org/2000/svg">
    <defs v-if="foil">
      <linearGradient :id="`foil-${id}`" x1="20" y1="30" x2="316" y2="114" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#8a6a26" />
        <stop offset="0.22" stop-color="#c9a24e" />
        <stop offset="0.4" stop-color="#f3dfa0" />
        <stop offset="0.58" stop-color="#b38b3a" />
        <stop offset="0.78" stop-color="#e9cf8c" />
        <stop offset="1" stop-color="#7d5d1e" />
      </linearGradient>
      <!-- Ornament quarters are mirrored, so their foil is laid per shape instead of across the artboard. -->
      <linearGradient :id="`foilb-${id}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#9c7a2e" />
        <stop offset="0.45" stop-color="#f0d998" />
        <stop offset="1" stop-color="#a8822f" />
      </linearGradient>
    </defs>
    <g :fill="foil ? `url(#foil-${id})` : 'currentColor'">
      <path :d="LETTER_N" />
      <path :d="LETTER_R" />
    </g>
    <g fill="currentColor">
      <path v-for="(d, i) in TEXTILE" :key="i" :d="d" />
    </g>
    <g v-for="cx in RING_CENTERS" :key="cx" :transform="`translate(${cx} ${RING_CY})`">
      <g v-for="t in QUARTERS" :key="t" :transform="t">
        <path
          v-for="(s, i) in ORNAMENT_STROKES"
          :key="i"
          :d="s.d"
          fill="none"
          :stroke="foil ? `url(#foilb-${id})` : 'currentColor'"
          :stroke-width="s.w"
          stroke-linecap="round"
        />
        <path v-for="(d, i) in ORNAMENT_FILLS" :key="'f' + i" :d="d" :fill="foil ? `url(#foilb-${id})` : 'currentColor'" />
      </g>
    </g>
  </svg>
</template>
