<script setup lang="ts">
import { useId } from "vue";
import { ORNAMENT_FILLS, ORNAMENT_STROKES } from "@/logo/logo-paths";

/**
 * Sərlövhə: the illuminated headpiece that opens a manuscript chapter. A band of the
 * brand's own scroll ornament between gold and silver rules, with an optional cartouche
 * holding the section title.
 */
defineProps<{ title?: string; as?: "h1" | "h2" }>();
const id = useId();
</script>

<template>
  <div class="serlovhe relative flex items-center justify-center">
    <svg class="band absolute inset-x-0 top-1/2 w-full -translate-y-1/2 text-gold" height="58" aria-hidden="true">
      <defs>
        <pattern :id="`orn-${id}`" width="66" height="58" patternUnits="userSpaceOnUse">
          <g transform="translate(33 52) scale(0.92)">
            <g v-for="t in ['scale(1 1)', 'scale(-1 1)']" :key="t" :transform="t">
              <path
                v-for="(s, i) in ORNAMENT_STROKES"
                :key="i"
                :d="s.d"
                fill="none"
                stroke="currentColor"
                :stroke-width="s.w * 0.9"
                stroke-linecap="round"
              />
              <path v-for="(d, i) in ORNAMENT_FILLS" :key="'f' + i" :d="d" fill="currentColor" />
            </g>
          </g>
        </pattern>
      </defs>
      <line x1="0" x2="100%" y1="0.5" y2="0.5" stroke="var(--color-gold)" />
      <line x1="0" x2="100%" y1="3.5" y2="3.5" stroke="var(--color-silver)" />
      <rect x="0" y="6" width="100%" height="46" :fill="`url(#orn-${id})`" />
      <line x1="0" x2="100%" y1="54.5" y2="54.5" stroke="var(--color-silver)" />
      <line x1="0" x2="100%" y1="57.5" y2="57.5" stroke="var(--color-gold)" />
    </svg>

    <div v-if="title" class="cartouche relative flex items-stretch">
      <svg class="cap" viewBox="0 0 26 72" aria-hidden="true">
        <path
          d="M26 0.5H19C12 0.5 13 9 6.5 11.5C0.5 14 0.5 24 0.5 36C0.5 48 0.5 58 6.5 60.5C13 63 12 71.5 19 71.5H26"
          fill="var(--color-paper)"
          stroke="var(--color-gold)"
        />
        <path d="M26 4H20C15 4 15.5 11 10 13.5C4.5 16 4.5 25 4.5 36C4.5 47 4.5 56 10 58.5C15.5 61 15 68 20 68H26" fill="none" stroke="var(--color-silver)" />
      </svg>
      <component
        :is="as ?? 'h2'"
        class="display flex items-center whitespace-nowrap border-y border-gold bg-paper px-5 text-[1.55rem] shadow-[inset_0_3px_0_var(--color-paper),inset_0_4px_0_var(--color-silver),inset_0_-3px_0_var(--color-paper),inset_0_-4px_0_var(--color-silver)] sm:px-8 sm:text-[2rem]"
      >
        {{ title }}
      </component>
      <svg class="cap -scale-x-100" viewBox="0 0 26 72" aria-hidden="true">
        <path
          d="M26 0.5H19C12 0.5 13 9 6.5 11.5C0.5 14 0.5 24 0.5 36C0.5 48 0.5 58 6.5 60.5C13 63 12 71.5 19 71.5H26"
          fill="var(--color-paper)"
          stroke="var(--color-gold)"
        />
        <path d="M26 4H20C15 4 15.5 11 10 13.5C4.5 16 4.5 25 4.5 36C4.5 47 4.5 56 10 58.5C15.5 61 15 68 20 68H26" fill="none" stroke="var(--color-silver)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.serlovhe {
  min-height: 72px;
}
.cartouche {
  height: 72px;
}
.cap {
  width: 26px;
  height: 72px;
  flex: none;
}
</style>
