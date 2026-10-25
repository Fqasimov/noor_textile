import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="grid min-h-[80svh] place-items-center px-6 text-center">
        <div>
          <p className="eyebrow text-gold-deep">404</p>
          <h1 className="display mt-4 text-5xl">Səhifə tapılmadı</h1>
          <Link href="/" className="btn btn-dark mt-8">
            Ana səhifə
          </Link>
        </div>
      </main>
    </>
  );
}
