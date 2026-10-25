<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Search, X } from "lucide-vue-next";
import { categories, products } from "@/data/products";
import { catalogCategory as category } from "@/composables/catalog";
import ProductCard from "./ProductCard.vue";
import SerlovheBand from "./ornament/SerlovheBand.vue";
import CatchWord from "./ornament/CatchWord.vue";

type Sort = "featured" | "price-asc" | "price-desc";
const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Seçilmiş sıra" },
  { id: "price-asc", label: "Qiymət: artan" },
  { id: "price-desc", label: "Qiymət: azalan" },
];

// Azerbaijani-aware, accent-insensitive matching ("sufre" finds "Süfrə").
const fold = (s: string) =>
  s
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const query = ref("");
const sort = ref<Sort>("featured");

const tabs = [{ id: "all" as const, short: "Hamısı" }, ...categories];
const counts = products.reduce<Record<string, number>>(
  (c, p) => ((c[p.category] = (c[p.category] ?? 0) + 1), c),
  { all: products.length },
);

const visible = computed(() => {
  const q = fold(query.value.trim());
  const list = products.filter(
    (p) =>
      (category.value === "all" || p.category === category.value) &&
      (!q || fold(`${p.name} ${p.color ?? ""} ${p.description}`).includes(q)),
  );
  if (sort.value === "featured") return list;
  // Price-on-request items always sit at the end.
  return [...list].sort((a, b) => {
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return sort.value === "price-asc" ? a.price - b.price : b.price - a.price;
  });
});

// A gold rule slides under the active tab.
const tabEls = ref<HTMLElement[]>([]);
const rule = ref({ x: 0, w: 0, ready: false });
function measure() {
  const el = tabEls.value[tabs.findIndex((t) => t.id === category.value)];
  if (el) rule.value = { x: el.offsetLeft, w: el.offsetWidth, ready: true };
}
watch(category, () => nextTick(measure));
onMounted(() => {
  measure();
  document.fonts?.ready.then(measure);
  window.addEventListener("resize", measure);
});
onBeforeUnmount(() => window.removeEventListener("resize", measure));

function reset() {
  query.value = "";
  category.value = "all";
}
</script>

<template>
  <section id="kataloq" class="bg-paper">
    <div class="mx-auto max-w-[1360px] px-4 pt-24 sm:px-10 lg:pt-32">
      <SerlovheBand title="Kataloq" />
      <p class="mx-auto mt-12 max-w-[50ch] text-center text-[1.02rem] text-ink-soft">
        {{ products.length }} əsər. Səbətə əlavə edin, sifarişi bir toxunuşla WhatsApp-a göndərin.
      </p>
    </div>

    <div class="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 mt-12 bg-paper/95 backdrop-blur-sm sm:top-[calc(76px+env(safe-area-inset-top))]">
      <div class="rule-double" />
      <div class="mx-auto flex max-w-[1360px] flex-col gap-2 px-4 py-2 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div class="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <div class="relative flex gap-7" role="tablist" aria-label="Kateqoriyalar">
            <button
              v-for="t in tabs"
              :key="t.id"
              ref="tabEls"
              type="button"
              role="tab"
              :aria-selected="category === t.id"
              class="flex min-h-12 shrink-0 items-baseline gap-1.5 text-[0.98rem] transition-colors duration-200"
              :class="category === t.id ? 'text-ink' : 'text-silver-ink hover:text-ink'"
              @click="category = t.id"
            >
              {{ t.short }}
              <sup class="tabular-nums text-[0.68rem]" :class="category === t.id ? 'text-gold-deep' : ''">{{ counts[t.id] ?? 0 }}</sup>
            </button>
            <span
              class="absolute bottom-2 left-0 h-px bg-gold"
              :class="rule.ready ? 'transition-[transform,width] duration-300 ease-[var(--ease-out-strong)]' : ''"
              :style="{ width: `${rule.w}px`, transform: `translateX(${rule.x}px)` }"
              aria-hidden="true"
            />
          </div>
        </div>

        <div class="flex items-center gap-6 pb-2 lg:pb-0">
          <label class="relative flex flex-1 items-center lg:w-64 lg:flex-none">
            <Search class="pointer-events-none absolute left-0 size-4 text-silver-ink" :stroke-width="1.4" />
            <input
              id="catalog-search"
              v-model="query"
              type="search"
              placeholder="Axtar: süfrə, kilim, nar…"
              aria-label="Kataloqda axtar"
              class="field pl-7 pr-8 [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              v-if="query"
              type="button"
              aria-label="Axtarışı təmizlə"
              class="absolute right-0 grid size-8 place-items-center text-silver-ink hover:text-ink"
              @click="query = ''"
            >
              <X class="size-3.5" />
            </button>
          </label>
          <select id="catalog-sort" v-model="sort" aria-label="Sıralama" class="field w-auto shrink-0 pr-2 text-[0.9rem]">
            <option v-for="s in sorts" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
        </div>
      </div>
      <div class="h-px bg-line" />
    </div>

    <div class="mx-auto max-w-[1360px] px-4 pb-24 pt-2 sm:px-10 lg:pb-32">
      <!-- Ruled like verse columns: gold hairlines between items, no boxes. -->
      <TransitionGroup tag="ul" name="card" class="ruled grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <li v-for="(p, i) in visible" :key="p.slug" class="min-w-0 px-3 py-8 sm:px-6 sm:py-10">
          <ProductCard :product="p" :eager="i < 4" />
        </li>
      </TransitionGroup>

      <div v-if="visible.length === 0" class="py-24 text-center">
        <p class="display text-3xl">Bu axtarışa uyğun əsər yoxdur</p>
        <p class="mt-3 text-ink-soft">Başqa söz yazın və ya bütün kateqoriyalara qayıdın.</p>
        <button type="button" class="btn btn-line mt-8" @click="reset">Hamısını göstər</button>
      </div>

      <p class="sr-only" aria-live="polite">{{ visible.length }} məhsul göstərilir</p>
      <CatchWord class="mt-16" to="elaqe" word="Əlaqə" />
    </div>
  </section>
</template>

<style scoped>
.ruled {
  overflow: hidden;
}
.ruled > li {
  box-shadow:
    -1px 0 0 color-mix(in oklab, var(--color-gold) 55%, transparent),
    0 -1px 0 var(--color-line);
}
</style>
