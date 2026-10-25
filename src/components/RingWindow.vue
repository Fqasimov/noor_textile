<script setup lang="ts">
import { useId } from "vue";
import { ORNAMENT_FILLS, ORNAMENT_STROKES, QUARTERS } from "@/logo/logo-paths";

/**
 * The O of the logo used as a window: a photograph seen through the ring, with the gold
 * crown above and below exactly as in the wordmark. Several images cross-fade in place.
 */
const props = withDefaults(defineProps<{ images: string[]; alt: string; active?: number }>(), { active: 0 });
const id = useId();
// The ring's inner opening in logo units (see logo-paths: band arc sits at radius ~24).
const R = 21.5;
</script>

<template>
  <svg viewBox="-35 -42 70 84" class="ring-window block" role="img" :aria-label="alt">
    <defs>
      <clipPath :id="`ring-${id}`">
        <circle :r="R" />
      </clipPath>
      <linearGradient :id="`ring-foil-${id}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#9c7a2e" />
        <stop offset="0.45" stop-color="#f0d998" />
        <stop offset="1" stop-color="#a8822f" />
      </linearGradient>
    </defs>
    <g :clip-path="`url(#ring-${id})`">
      <rect :x="-R" :y="-R" :width="R * 2" :height="R * 2" fill="var(--color-wash)" />
      <image
        v-for="(src, i) in props.images"
        :key="src"
        :href="src"
        :x="-R"
        :y="-R"
        :width="R * 2"
        :height="R * 2"
        preserveAspectRatio="xMidYMid slice"
        class="frame"
        :class="{ on: i === props.active }"
      />
    </g>
    <circle :r="R + 0.35" fill="none" stroke="var(--color-gold)" stroke-width="0.25" />
    <g v-for="t in QUARTERS" :key="t" :transform="t">
      <path
        v-for="(s, i) in ORNAMENT_STROKES"
        :key="i"
        :d="s.d"
        fill="none"
        :stroke="`url(#ring-foil-${id})`"
        :stroke-width="s.w * 0.55"
        stroke-linecap="round"
      />
      <path v-for="(d, i) in ORNAMENT_FILLS" :key="'f' + i" :d="d" :fill="`url(#ring-foil-${id})`" />
    </g>
  </svg>
</template>

<style scoped>
.frame {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  transform: scale(1.06);
  transition:
    opacity 1.2s ease,
    transform 6s linear;
}
.frame.on {
  opacity: 1;
  transform: scale(1);
}
@media (prefers-reduced-motion: reduce) {
  .frame {
    transition: opacity 0.3s ease;
    transform: none;
  }
}
</style>
