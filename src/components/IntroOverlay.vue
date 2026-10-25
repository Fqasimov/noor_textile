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

/*
 * White page. NOOR is laid in gold (frames draw, N and R slide in), TEXTILE appears in
 * black inside the O's, then the camera flies through the first O and the site opens
 * through it. Timings mirror video/src/LogoReveal.tsx.
 */
const emit = defineEmits<{ done: [] }>();

const ZOOM_AT = 2350; // ms: when the fly-through begins
const ZOOM_MS = 1350;
const MAX_SCALE = 90;
// The fly-through aims at the gap between E and X, dead centre of the first O.
const TARGET = { x: RING_CENTERS[0], y: RING_CY };
const HOLE = 5.5; // radius in logo units of the window that opens inside the O

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sheet = ref<HTMLElement>();
const logo = ref<SVGSVGElement>();
const zooming = ref(false);
let timer: number | undefined;
let raf = 0;
let finished = false;

// Strong in-out (quart): the camera gathers speed, then rushes through.
const ease = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - 8 * (1 - t) ** 4);

function finish() {
  if (finished) return;
  finished = true;
  document.documentElement.classList.remove("intro-playing");
  emit("done");
}

function flyThrough() {
  if (zooming.value || !logo.value || !sheet.value) return;
  clearTimeout(timer);
  zooming.value = true;
  if (reduce) {
    sheet.value.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" }).finished.then(finish);
    logo.value.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" });
    return;
  }
  const box = logo.value.getBoundingClientRect();
  const ppu = box.width / V.width;
  const ox = box.left + (TARGET.x - V.x) * ppu;
  const oy = box.top + (TARGET.y - V.y) * ppu;
  logo.value.style.transformOrigin = `${(TARGET.x - V.x) * ppu}px ${(TARGET.y - V.y) * ppu}px`;
  const start = performance.now();
  const sheetEl = sheet.value;
  const logoEl = logo.value;

  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / ZOOM_MS);
    const e = ease(t);
    const scale = Math.exp(Math.log(MAX_SCALE) * e);
    const r = HOLE * ppu * (scale - 1);
    logoEl.style.transform = `scale(${scale})`;
    const mask = `radial-gradient(circle at ${ox}px ${oy}px, transparent ${r}px, #000 ${r + 1}px)`;
    sheetEl.style.maskImage = mask;
    sheetEl.style.webkitMaskImage = mask;
    if (t < 1) raf = requestAnimationFrame(frame);
    else finish();
  };
  raf = requestAnimationFrame(frame);
}

onMounted(() => {
  document.documentElement.classList.add("intro-playing");
  timer = window.setTimeout(flyThrough, reduce ? 700 : ZOOM_AT);
});
onBeforeUnmount(() => {
  clearTimeout(timer);
  cancelAnimationFrame(raf);
  document.documentElement.classList.remove("intro-playing");
});

const f = (ms: number) => `${ms}ms`;
</script>

<template>
  <div class="intro" role="presentation" @click="flyThrough">
    <div ref="sheet" class="sheet" />
    <svg ref="logo" class="logo" :viewBox="`${V.x} ${V.y} ${V.width} ${V.height}`" aria-label="Noor Textile">
      <defs>
        <linearGradient id="intro-foil" x1="20" y1="30" x2="316" y2="114" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#8a6a26" />
          <stop offset="0.22" stop-color="#c9a24e" />
          <stop offset="0.4" stop-color="#f3dfa0" />
          <stop offset="0.58" stop-color="#b38b3a" />
          <stop offset="0.78" stop-color="#e9cf8c" />
          <stop offset="1" stop-color="#7d5d1e" />
        </linearGradient>
        <linearGradient id="intro-foil-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#9c7a2e" />
          <stop offset="0.45" stop-color="#f0d998" />
          <stop offset="1" stop-color="#a8822f" />
        </linearGradient>
        <linearGradient id="intro-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fff" stop-opacity="0" />
          <stop offset="0.5" stop-color="#fff" stop-opacity="0.75" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <mask id="intro-gold-mask">
          <g fill="#fff">
            <path :d="LETTER_N" />
            <path :d="LETTER_R" />
          </g>
        </mask>
      </defs>

      <g v-for="(cx, ring) in RING_CENTERS" :key="cx" :transform="`translate(${cx} ${RING_CY})`">
        <g v-for="t in QUARTERS" :key="t" :transform="t">
          <path
            v-for="(s, i) in ORNAMENT_STROKES"
            :key="i"
            class="draw"
            :style="{ animationDelay: f(80 + ring * 90 + i * 55) }"
            :d="s.d"
            pathLength="1"
            fill="none"
            stroke="url(#intro-foil-b)"
            :stroke-width="s.w"
            stroke-linecap="round"
          />
          <path
            v-for="(d, i) in ORNAMENT_FILLS"
            :key="'f' + i"
            class="appear"
            :style="{ animationDelay: f(820 + ring * 90 + i * 70) }"
            :d="d"
            fill="url(#intro-foil-b)"
          />
        </g>
      </g>

      <path class="slide-n" :d="LETTER_N" fill="url(#intro-foil)" />
      <path class="slide-r" :d="LETTER_R" fill="url(#intro-foil)" />
      <g mask="url(#intro-gold-mask)">
        <rect class="sheen" :x="V.x - 90" :y="V.y" width="90" :height="V.height" fill="url(#intro-sheen)" />
      </g>

      <path
        v-for="(d, i) in TEXTILE"
        :key="'t' + i"
        class="rise"
        :style="{ animationDelay: f(1250 + Math.abs(i - 3) * 70) }"
        :d="d"
        fill="#0d0c0a"
      />
    </svg>
    <button type="button" class="skip" @click.stop="flyThrough">Keç</button>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  overflow: hidden;
  cursor: pointer;
}
.sheet {
  position: absolute;
  inset: 0;
  background: #fff;
}
.logo {
  position: relative;
  width: min(68vw, 920px);
  overflow: visible;
}
.draw {
  stroke-dasharray: 1 1;
  stroke-dashoffset: 1;
  animation: draw 950ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
}
.appear {
  opacity: 0;
  animation: appear 500ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
.slide-n,
.slide-r {
  opacity: 0;
}
.slide-n {
  animation: slide-n 900ms cubic-bezier(0.23, 1, 0.32, 1) 420ms forwards;
}
.slide-r {
  animation: slide-r 900ms cubic-bezier(0.23, 1, 0.32, 1) 420ms forwards;
}
.sheen {
  animation: sheen 1000ms cubic-bezier(0.45, 0, 0.55, 1) 1250ms both;
}
.rise {
  opacity: 0;
  transform-box: fill-box;
  animation: rise 650ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
.skip {
  position: absolute;
  right: max(1.5rem, env(safe-area-inset-right, 0px));
  bottom: calc(1.75rem + env(safe-area-inset-bottom, 0px));
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8a8b8f;
  transition: color 200ms ease;
}
.skip:hover {
  color: #0d0c0a;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes appear {
  to {
    opacity: 1;
  }
}
@keyframes slide-n {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes slide-r {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes sheen {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(480px);
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(4px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}
</style>
