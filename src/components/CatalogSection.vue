<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Search, X } from "lucide-vue-next";
import { categories, products } from "@/data/products";
import { catalogCategory as category } from "@/composables/catalog";
import ProductCard from "./ProductCard.vue";

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
    <div class="mx-auto max-w-[1440px] px-4 pt-24 sm:px-10 lg:pt-36">
      <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <h2 class="display text-[clamp(2.6rem,5.6vw,5rem)]">Kataloq</h2>
        <p class="max-w-[34ch] text-[1.02rem] leading-relaxed text-ink-soft">
          Seçin, səbətə əlavə edin və sifarişi bir toxunuşla WhatsApp-a göndərin.
        </p>
      </div>
    </div>

    <div class="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 mt-12 border-y border-line bg-paper/95 backdrop-blur-md sm:top-[calc(5rem+env(safe-area-inset-top))]">
      <div class="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div class="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <div class="relative flex gap-7" role="tablist" aria-label="Kateqoriyalar">
            <button
              v-for="t in tabs"
              :key="t.id"
              ref="tabEls"
              type="button"
              role="tab"
              :aria-selected="category === t.id"
              class="flex min-h-14 shrink-0 items-center gap-1.5 text-[0.98rem] transition-colors duration-200"
              :class="category === t.id ? 'text-ink' : 'text-silver-ink hover:text-ink'"
              @click="category = t.id"
            >
              {{ t.short }}
              <sup class="tabular-nums text-[0.66rem]" :class="category === t.id ? 'text-gold-deep' : ''">{{ counts[t.id] ?? 0 }}</sup>
            </button>
            <span
              class="foil-fill absolute bottom-0 left-0 h-[2px]"
              :class="rule.ready ? 'transition-[transform,width] duration-300 ease-[var(--ease-out-strong)]' : ''"
              :style="{ width: `${rule.w}px`, transform: `translateX(${rule.x}px)` }"
              aria-hidden="true"
            />
          </div>
        </div>

        <div class="flex items-center gap-6 pb-3 lg:pb-0">
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
    </div>

    <div class="mx-auto max-w-[1440px] px-4 pb-28 pt-12 sm:px-10 lg:pb-36">
      <TransitionGroup tag="ul" name="card" class="grid grid-cols-2 gap-x-3 gap-y-14 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
        <li v-for="(p, i) in visible" :key="p.slug" class="min-w-0">
          <ProductCard :product="p" :eager="i < 4" />
        </li>
      </TransitionGroup>

      <div v-if="visible.length === 0" class="py-24 text-center">
        <p class="display text-3xl">Bu axtarışa uyğun məhsul yoxdur</p>
        <p class="mt-3 text-ink-soft">Başqa söz yazın və ya bütün kateqoriyalara qayıdın.</p>
        <button type="button" class="btn btn-line mt-8" @click="reset">Hamısını göstər</button>
      </div>

      <p class="sr-only" aria-live="polite">{{ visible.length }} məhsul göstərilir</p>
    </div>
  </section>
</template>
