<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
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
import NoorLogo from "./NoorLogo.vue";

/*
 * The logo reveal. Timings mirror the Remotion composition in video/src/LogoReveal.tsx
 * (60 fps frame numbers ÷ 60), so the site intro and the exported MP4 match.
 */
const emit = defineEmits<{ done: [] }>();

const f = (frame: number) => `${(frame / 60).toFixed(3)}s`;
const TOTAL_MS = (216 / 60) * 1000;
const HOLD_MS = 350;

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const visible = ref(true);
let timer: number | undefined;

function leave() {
  visible.value = false;
}

onMounted(() => {
  document.documentElement.classList.add("intro-playing");
  timer = window.setTimeout(leave, reduce ? 900 : TOTAL_MS + HOLD_MS);
});
onBeforeUnmount(() => {
  clearTimeout(timer);
  document.documentElement.classList.remove("intro-playing");
});

function onAfterLeave() {
  document.documentElement.classList.remove("intro-playing");
  emit("done");
}
</script>

<template>
  <Transition name="curtain" @after-leave="onAfterLeave">
    <div v-if="visible" class="intro" role="presentation" @click="leave">
      <div class="stage">
        <div v-if="reduce" class="mx-auto w-[62%] text-silver-soft">
          <NoorLogo ornament-color="#c8a868" />
        </div>
        <template v-else>
          <div class="glow" />
          <svg class="logo" :viewBox="`${V.x} ${V.y} ${V.width} ${V.height}`" aria-label="Noor Textile">
            <defs>
              <linearGradient id="intro-silver" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#8d9094" />
                <stop offset="0.5" stop-color="#c9cbce" />
                <stop offset="1" stop-color="#8d9094" />
              </linearGradient>
              <linearGradient id="intro-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#c8a868" />
                <stop offset="1" stop-color="#8f7238" />
              </linearGradient>
              <linearGradient id="intro-sheen" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#fff" stop-opacity="0" />
                <stop offset="0.5" stop-color="#fff" stop-opacity="0.85" />
                <stop offset="1" stop-color="#fff" stop-opacity="0" />
              </linearGradient>
              <mask id="intro-letters">
                <g fill="#fff">
                  <path :d="LETTER_N" />
                  <path :d="LETTER_R" />
                  <path v-for="(d, i) in TEXTILE" :key="i" :d="d" />
                </g>
              </mask>
            </defs>

            <g v-for="(cx, ring) in RING_CENTERS" :key="cx" :transform="`translate(${cx} ${RING_CY})`">
              <g v-for="t in QUARTERS" :key="t" :transform="t">
                <path
                  v-for="(s, i) in ORNAMENT_STROKES"
                  :key="i"
                  class="draw"
                  :style="{ animationDelay: f(4 + ring * 6 + i * 4) }"
                  :d="s.d"
                  pathLength="1"
                  fill="none"
                  stroke="url(#intro-gold)"
                  :stroke-width="s.w"
                  stroke-linecap="round"
                />
                <path
                  v-for="(d, i) in ORNAMENT_FILLS"
                  :key="'f' + i"
                  class="appear"
                  :style="{ animationDelay: f(50 + ring * 6 + i * 5) }"
                  :d="d"
                  fill="url(#intro-gold)"
                />
              </g>
            </g>

            <path
              v-for="(d, i) in TEXTILE"
              :key="'t' + i"
              class="rise"
              :style="{ animationDelay: f(34 + Math.abs(i - 3) * 5) }"
              :d="d"
              fill="url(#intro-silver)"
            />
            <path class="slide-n" :d="LETTER_N" fill="url(#intro-silver)" />
            <path class="slide-r" :d="LETTER_R" fill="url(#intro-silver)" />

            <g mask="url(#intro-letters)">
              <rect class="sheen" :x="V.x - 110" :y="V.y" width="110" :height="V.height" fill="url(#intro-sheen)" />
            </g>
          </svg>
        </template>
      </div>
      <button type="button" class="eyebrow skip" @click.stop="leave">Keç</button>
    </div>
  </Transition>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: radial-gradient(60% 70% at 50% 50%, #18213b 0%, #0a0f1d 100%);
  clip-path: inset(0 0 0 0);
}
.stage {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  max-width: 1600px;
}
.logo {
  width: 62%;
  overflow: visible;
  animation: settle 3.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.glow {
  position: absolute;
  width: 56%;
  aspect-ratio: 2 / 1;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(200, 168, 104, 0.16), rgba(200, 168, 104, 0));
  filter: blur(30px);
  animation: appear 1.8s cubic-bezier(0.23, 1, 0.32, 1) both;
}
.draw {
  stroke-dasharray: 1 1;
  stroke-dashoffset: 1;
  animation: draw 0.967s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}
.appear {
  opacity: 0;
  animation: appear 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
.rise {
  opacity: 0;
  transform-box: fill-box;
  animation: rise 0.733s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
.slide-n {
  opacity: 0;
  animation: slide-n 0.9s cubic-bezier(0.23, 1, 0.32, 1) 1.033s forwards;
}
.slide-r {
  opacity: 0;
  animation: slide-r 0.9s cubic-bezier(0.23, 1, 0.32, 1) 1.033s forwards;
}
.sheen {
  animation: sheen 1.067s cubic-bezier(0.45, 0, 0.55, 1) 1.867s both;
}
.skip {
  position: absolute;
  right: max(1.5rem, env(safe-area-inset-right, 0px));
  bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
  color: color-mix(in oklab, var(--color-silver) 70%, transparent);
  transition: color 0.2s ease;
}
.skip:hover {
  color: var(--color-gold-soft);
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes slide-n {
  from {
    opacity: 0;
    transform: translateX(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes slide-r {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes sheen {
  from {
    transform: translateX(0);
    opacity: 0.9;
  }
  to {
    transform: translateX(520px);
    opacity: 0.9;
  }
}
@keyframes settle {
  from {
    transform: scale(0.965);
  }
  to {
    transform: scale(1);
  }
}

.curtain-leave-active {
  transition: clip-path 0.9s cubic-bezier(0.77, 0, 0.175, 1);
}
.curtain-leave-active .stage {
  transition:
    opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.curtain-leave-to {
  clip-path: inset(0 0 100% 0);
}
.curtain-leave-to .stage {
  opacity: 0;
  transform: translateY(-24px) scale(0.98);
}
</style>
