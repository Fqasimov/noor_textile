<!-- The gold verse-end rosette that separates couplets in a manuscript. -->
<template>
  <svg viewBox="-10 -10 20 20" class="inline-block size-3.5 text-gold" aria-hidden="true">
    <g fill="currentColor">
      <ellipse v-for="a in [0, 45, 90, 135]" :key="a" rx="2.2" ry="8.6" :transform="`rotate(${a})`" opacity="0.85" />
    </g>
    <circle r="3" fill="var(--color-paper)" />
    <circle r="1.6" fill="currentColor" />
  </svg>
</template>
