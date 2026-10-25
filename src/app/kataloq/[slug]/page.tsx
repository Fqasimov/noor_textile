import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductView } from "@/components/product/ProductView";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getProduct, products } from "@/data/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} — Noor Textile`,
    description: product.description,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-8 sm:pt-28">
        <Link
          href="/#kataloq"
          className="eyebrow mb-8 inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" /> Kataloq
        </Link>
        <ProductView product={product} />

        {related.length > 0 && (
          <section className="mt-28 border-t border-line pt-14">
            <h2 className="display text-4xl">Bunlar da xoşunuza gələ bilər</h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 xl:gap-x-6">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
