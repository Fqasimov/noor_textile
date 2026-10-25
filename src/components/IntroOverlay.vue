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

// Corner tooling reuses one quarter of the logo's ornament, mirrored into each corner.
const corners = [
  { flip: "scale(1 1)", style: { left: "3.4%", top: "5%" } },
  { flip: "scale(-1 1) translate(32 0)", style: { right: "3.4%", top: "5%" } },
  { flip: "scale(1 -1) translate(0 50)", style: { left: "3.4%", bottom: "5%" } },
  { flip: "scale(-1 -1) translate(32 50)", style: { right: "3.4%", bottom: "5%" } },
];
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
  <Transition :name="reduce ? 'fade' : 'cover'" @after-leave="onAfterLeave">
    <div v-if="visible" class="intro" role="presentation" @click="leave">
      <!-- Tooled gold frame of a lacquer binding. -->
      <svg class="tooling" aria-hidden="true">
        <rect class="tool tool-outer" x="1.5%" y="2.4%" width="97%" height="95.2%" pathLength="1" />
        <rect class="tool tool-inner" x="2.3%" y="3.6%" width="95.4%" height="92.8%" pathLength="1" />
      </svg>
      <svg
        v-for="(c, i) in corners"
        :key="i"
        class="corner"
        :style="c.style"
        viewBox="-36 -40 40 30"
        aria-hidden="true"
      >
        <g :transform="c.flip">
          <path
            v-for="(s, j) in ORNAMENT_STROKES"
            :key="j"
            :d="s.d"
            fill="none"
            stroke="#b08d3e"
            :stroke-width="s.w"
            stroke-linecap="round"
          />
        </g>
      </svg>
      <div class="stage">
        <div v-if="reduce" class="mx-auto w-[62%] text-silver">
          <NoorLogo ornament-color="#c8a868" />
        </div>
        <template v-else>
          <div class="glow" />
          <svg class="logo" :viewBox="`${V.x} ${V.y} ${V.width} ${V.height}`" aria-label="Noor Textile">
            <defs>
              <linearGradient id="intro-silver" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#9a9da1" />
                <stop offset="0.5" stop-color="#e2e3e5" />
                <stop offset="1" stop-color="#9a9da1" />
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
      <button type="button" class="smallcaps skip" @click.stop="leave">Keç</button>
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
  /* Black lacquer with the faint sheen of a polished binding. */
  background:
    radial-gradient(55% 60% at 50% 46%, #1b1a18 0%, #0d0d0c 62%, #070707 100%);
  transform-origin: left center;
  backface-visibility: hidden;
}
.tooling {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.tool {
  fill: none;
  stroke: #b08d3e;
  stroke-dasharray: 1 1;
  stroke-dashoffset: 1;
  animation: draw 1.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}
.tool-outer {
  stroke-width: 1;
}
.tool-inner {
  stroke: #6f6a60;
  stroke-width: 1;
  animation-delay: 0.15s;
}
.corner {
  position: absolute;
  width: clamp(44px, 6vw, 84px);
  opacity: 0;
  animation: appear 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.9s forwards;
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
  background: radial-gradient(closest-side, rgba(220, 195, 134, 0.1), rgba(220, 195, 134, 0));
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
  color: #8f8a80;
  transition: color 0.2s ease;
}
.skip:hover {
  color: #dcc386;
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

/* The cover swings open on its left hinge, revealing the first folio. */
.cover-leave-active {
  transition:
    transform 1.15s cubic-bezier(0.77, 0, 0.175, 1),
    box-shadow 1.15s ease,
    filter 1.15s ease;
}
.cover-leave-to {
  transform: perspective(2200px) rotateY(-96deg);
  box-shadow: 60px 0 120px rgba(0, 0, 0, 0.35);
  filter: brightness(0.6);
}
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
