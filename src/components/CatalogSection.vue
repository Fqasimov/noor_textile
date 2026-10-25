<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Search, X } from "lucide-vue-next";
import { categories, products, type CategoryId } from "@/data/products";
import ProductCard from "./ProductCard.vue";

type Sort = "featured" | "price-asc" | "price-desc";
const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Seçilmiş" },
  { id: "price-asc", label: "Ucuzdan bahaya" },
  { id: "price-desc", label: "Bahadan ucuza" },
];

// Azerbaijani-aware, accent-insensitive matching ("sufre" finds "Süfrə").
const fold = (s: string) =>
  s
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const category = ref<CategoryId | "all">("all");
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

// Sliding pill under the active category tab.
const tabEls = ref<HTMLElement[]>([]);
const pill = ref({ x: 0, w: 0, ready: false });
function measure() {
  const i = tabs.findIndex((t) => t.id === category.value);
  const el = tabEls.value[i];
  if (el) pill.value = { x: el.offsetLeft, w: el.offsetWidth, ready: true };
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
    <div class="mx-auto max-w-7xl px-4 pt-24 sm:px-8 lg:pt-32">
      <div v-reveal class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p class="eyebrow text-gold-deep">Kataloq</p>
          <h2 class="display mt-4 text-[clamp(2.6rem,5.4vw,4.6rem)]">Bütün kolleksiya</h2>
        </div>
        <p class="max-w-sm text-sm leading-relaxed text-muted">
          Səbətə əlavə edin və sifarişi bir toxunuşla WhatsApp-a göndərin. Qiyməti göstərilməyən məhsullar üçün bizə yazın.
        </p>
      </div>
    </div>

    <div class="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 mt-10 border-y border-line bg-paper/90 backdrop-blur-xl sm:top-[calc(5rem+env(safe-area-inset-top))]">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div class="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <div class="relative flex gap-2" role="tablist" aria-label="Kateqoriyalar">
            <span
              class="absolute inset-y-0 left-0 rounded-full bg-ink"
              :class="pill.ready ? 'transition-[transform,width] duration-[400ms] ease-[var(--ease-out-strong)]' : ''"
              :style="{ width: `${pill.w}px`, transform: `translateX(${pill.x}px)` }"
              aria-hidden="true"
            />
            <button
              v-for="t in tabs"
              :key="t.id"
              ref="tabEls"
              type="button"
              role="tab"
              :aria-selected="category === t.id"
              class="relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors duration-200"
              :class="category === t.id ? 'text-paper' : 'text-ink/70 hover:text-ink'"
              @click="category = t.id"
            >
              {{ t.short }}
              <span class="text-[11px] tabular-nums" :class="category === t.id ? 'text-gold-soft' : 'text-muted'">{{ counts[t.id] ?? 0 }}</span>
            </button>
          </div>
        </div>

        <div class="flex gap-2">
          <label class="relative flex h-10 flex-1 items-center lg:w-64 lg:flex-none">
            <Search class="pointer-events-none absolute left-3.5 size-4 text-muted" :stroke-width="1.6" />
            <input
              id="catalog-search"
              v-model="query"
              type="search"
              placeholder="Axtar: süfrə, kilim…"
              aria-label="Kataloqda axtar"
              class="h-full w-full rounded-full border border-line bg-white pl-10 pr-9 text-[13px] outline-none transition-colors placeholder:text-muted/70 focus:border-gold [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              v-if="query"
              type="button"
              aria-label="Axtarışı təmizlə"
              class="absolute right-2 grid size-6 place-items-center rounded-full text-muted hover:bg-mist"
              @click="query = ''"
            >
              <X class="size-3.5" />
            </button>
          </label>
          <select
            id="catalog-sort"
            v-model="sort"
            aria-label="Sıralama"
            class="h-10 rounded-full border border-line bg-white px-4 text-[13px] outline-none focus:border-gold"
          >
            <option v-for="s in sorts" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-8 lg:pb-36">
      <p class="mb-6 text-xs text-muted" aria-live="polite">{{ visible.length }} məhsul</p>
      <TransitionGroup tag="ul" name="card" class="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
        <li v-for="(p, i) in visible" :key="p.slug" class="min-w-0">
          <ProductCard :product="p" :eager="i < 4" />
        </li>
      </TransitionGroup>

      <div v-if="visible.length === 0" class="py-24 text-center">
        <p class="display text-3xl">Heç nə tapılmadı</p>
        <p class="mt-2 text-sm text-muted">Başqa söz yoxlayın və ya bütün kateqoriyalara baxın.</p>
        <button type="button" class="btn btn-outline mt-6" @click="reset">Filtrləri sıfırla</button>
      </div>
    </div>
  </section>
</template>
