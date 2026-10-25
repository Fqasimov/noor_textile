import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NoorLogo } from "@/components/logo/NoorLogo";
import { categories } from "@/data/products";
import { site } from "@/data/site";

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="elaqe" className="bg-ink text-silver-soft">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-8 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <NoorLogo className="h-12 w-auto text-paper" ornamentColor="var(--color-gold)" />
            <p className="display mt-8 max-w-sm text-3xl leading-tight text-paper">
              Sifariş, korporativ əməkdaşlıq və fərdi tikmə üçün bizə yazın.
            </p>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-8"
            >
              WhatsApp-a yaz
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow text-gold-soft">Kataloq</p>
              <ul className="mt-5 space-y-3 text-sm">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href="/#kataloq" className="transition-colors hover:text-paper">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-gold-soft">Brend</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="/#haqqimizda" className="transition-colors hover:text-paper">
                    Haqqımızda
                  </Link>
                </li>
                <li>
                  <Link href="/#terefdaslar" className="transition-colors hover:text-paper">
                    Tərəfdaşlar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-gold-soft">Əlaqə</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href={site.phoneHref} className="flex items-center gap-3 transition-colors hover:text-paper">
                    <Phone className="size-4 text-gold" strokeWidth={1.5} /> {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-paper">
                    <Mail className="size-4 text-gold" strokeWidth={1.5} /> {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-colors hover:text-paper"
                  >
                    <Instagram className="size-4 text-gold" /> {site.instagramHandle}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} /> {site.address}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline-gold mt-20 opacity-40" />
        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-silver sm:flex-row">
          <p>© {new Date().getFullYear()} Noor Textile. Bütün hüquqlar qorunur.</p>
          <p>{site.since}</p>
        </div>
      </div>
    </footer>
  );
}
