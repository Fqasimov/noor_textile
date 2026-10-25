<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ORNAMENT_FILLS, ORNAMENT_STROKES } from "@/logo/logo-paths";
import { partners } from "@/data/partners";

/*
 * "Noor" is light. On black, the brand's ornament is hidden in the dark and only shows
 * where a soft gold light falls: it follows the pointer with a little lag (springy, not
 * glued to the cursor) and drifts on its own on touch screens.
 */
const section = ref<HTMLElement>();
let raf = 0;
let tx = 0.5;
let ty = 0.4;
let x = 0.5;
let y = 0.4;
let auto = true;
let t0 = performance.now();

function onMove(e: PointerEvent) {
  if (e.pointerType !== "mouse" || !section.value) return;
  const r = section.value.getBoundingClientRect();
  tx = (e.clientX - r.left) / r.width;
  ty = (e.clientY - r.top) / r.height;
  auto = false;
}
function onLeave() {
  auto = true;
  t0 = performance.now();
}

function tick(now: number) {
  if (auto) {
    const k = (now - t0) / 9000;
    tx = 0.5 + Math.sin(k * Math.PI * 2) * 0.3;
    ty = 0.42 + Math.sin(k * Math.PI * 4) * 0.12;
  }
  x += (tx - x) * 0.07;
  y += (ty - y) * 0.07;
  section.value?.style.setProperty("--lx", `${(x * 100).toFixed(2)}%`);
  section.value?.style.setProperty("--ly", `${(y * 100).toFixed(2)}%`);
  raf = requestAnimationFrame(tick);
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  raf = requestAnimationFrame(tick);
});
onBeforeUnmount(() => cancelAnimationFrame(raf));

// Inline sizes: wide wordmarks by width, compact marks by height, so all eight carry equal weight.
const logoSize = (p: { width: number; height: number }) => {
  const ratio = p.width / p.height;
  const h = ratio > 3 ? 150 / ratio : ratio > 1.6 ? 52 : 66;
  return { height: `${Math.round(h)}px`, width: "auto", maxWidth: "80%" };
};

const values = [
  { title: "Milli naxış", text: "Şirvan, Qarabağ və Muğan xalçaları, Nizami miniatürləri." },
  { title: "İncə tikmə", text: "Qızılı haşiyədən kiçik qotaza qədər hər detal diqqətlə işlənir." },
  { title: "Korporativ sifariş", text: "Otel, restoran və kafelər üçün süfrə, salfet və yastıq." },
];
</script>

<template>
  <section
    id="haqqimizda"
    ref="section"
    class="light relative overflow-hidden bg-night text-paper"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <svg class="pattern pointer-events-none absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <pattern id="light-orn" width="78" height="84" patternUnits="userSpaceOnUse">
          <g transform="translate(39 42)">
            <g v-for="t in ['scale(1 1)', 'scale(-1 1)', 'scale(1 -1)', 'scale(-1 -1)']" :key="t" :transform="t">
              <path v-for="(s, i) in ORNAMENT_STROKES" :key="i" :d="s.d" fill="none" stroke="#e9cf8c" :stroke-width="s.w * 0.8" stroke-linecap="round" />
              <path v-for="(d, i) in ORNAMENT_FILLS" :key="'f' + i" :d="d" fill="#e9cf8c" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#light-orn)" />
    </svg>
    <div class="glow pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative mx-auto max-w-[1440px] px-4 py-28 sm:px-10 lg:py-40">
      <h2 class="display mx-auto max-w-[16ch] text-center text-[clamp(2.8rem,6.6vw,6.4rem)]">
        «Noor» <span class="foil">işıq</span> deməkdir
      </h2>
      <p class="mx-auto mt-10 max-w-[54ch] text-center text-[1.08rem] leading-[1.8] text-white/75">
        Səkkiz ildir Azərbaycan xalçalarının həndəsəsini və miniatür sənətinin incəliyini evlərə gətiririk. Ənənəni
        muzey vitrinində deyil, gündəlik həyatda görürük: çay süfrəsində, qonaq otağında, uşaq otağında.
      </p>

      <dl class="mx-auto mt-20 grid max-w-[1100px] gap-10 sm:grid-cols-3 sm:gap-0">
        <div v-for="(v, i) in values" :key="v.title" class="sm:px-10" :class="{ 'sm:border-l sm:border-white/15': i > 0 }">
          <dt class="display text-[1.7rem] text-gold-light">{{ v.title }}</dt>
          <dd class="mt-3 text-[0.98rem] leading-relaxed text-white/70">{{ v.text }}</dd>
        </div>
      </dl>

      <div id="terefdaslar" class="mt-28 lg:mt-36">
        <h3 class="text-center text-[0.98rem] text-white/60">Bizə etibar edənlər</h3>
        <ul class="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-12 sm:grid-cols-4">
          <li v-for="p in partners" :key="p.name" class="grid h-20 place-items-center">
            <img
              :src="p.logo"
              :alt="p.name"
              :width="p.width"
              :height="p.height"
              loading="lazy"
              class="partner"
              :style="logoSize(p)"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.light {
  --lx: 50%;
  --ly: 40%;
}
.pattern {
  opacity: 0.55;
  -webkit-mask-image: radial-gradient(circle 340px at var(--lx) var(--ly), #000 0%, rgb(0 0 0 / 0.35) 45%, transparent 100%);
  mask-image: radial-gradient(circle 340px at var(--lx) var(--ly), #000 0%, rgb(0 0 0 / 0.35) 45%, transparent 100%);
}
.glow {
  background: radial-gradient(circle 520px at var(--lx) var(--ly), rgb(233 207 140 / 0.13), transparent 70%);
}
/* Partner marks are black artwork; on black they become silver. */
.partner {
  filter: invert(1) brightness(0.82);
  opacity: 0.6;
  transition: opacity 300ms ease;
}
.partner:hover {
  opacity: 1;
}
</style>
