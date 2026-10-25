import { computed, reactive, ref, watch } from "vue";
import { getProduct } from "@/data/products";

type Line = { slug: string; qty: number };
const KEY = "noor-cart";

function load(): Line[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((l) => getProduct(l.slug) && l.qty > 0) : [];
  } catch {
    return [];
  }
}

const state = reactive({ lines: load() });
export const cartOpen = ref(false);
/** Bumps on every add so the header badge can pop. */
export const cartPulse = ref(0);

watch(
  () => state.lines,
  (lines) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  },
  { deep: true },
);

export const cartLines = computed(() =>
  state.lines.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ ...l, product }] : [];
  }),
);
export const cartCount = computed(() => cartLines.value.reduce((n, l) => n + l.qty, 0));
export const cartTotal = computed(() => cartLines.value.reduce((n, l) => n + (l.product.price ?? 0) * l.qty, 0));

export function addToCart(slug: string, qty = 1) {
  const hit = state.lines.find((l) => l.slug === slug);
  if (hit) hit.qty += qty;
  else state.lines.push({ slug, qty });
  cartPulse.value++;
}

export function setQty(slug: string, qty: number) {
  if (qty <= 0) state.lines = state.lines.filter((l) => l.slug !== slug);
  else {
    const hit = state.lines.find((l) => l.slug === slug);
    if (hit) hit.qty = qty;
  }
}
