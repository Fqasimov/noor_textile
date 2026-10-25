import { ref } from "vue";
import type { CategoryId } from "@/data/products";

/** Active catalogue category, shared so the hero's table of contents can open a filtered catalogue. */
export const catalogCategory = ref<CategoryId | "all">("all");
