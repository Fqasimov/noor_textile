import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/data/partners";

export function Partners() {
  return (
    <div id="terefdaslar" className="border-t border-line bg-mist/50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:py-28">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-gold-deep">Tərəfdaşlar</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)]">Bizə etibar edənlər</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Bakının seçilmiş otel, restoran və brendləri ilə birgə işləyirik.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
          {partners.map((p, i) => {
            const wide = p.width / p.height > 3;
            return (
              <Reveal
                as="li"
                key={p.name}
                delay={0.04 * i}
                className="group grid aspect-[4/3] place-items-center border-b border-r border-line px-6 sm:aspect-[3/2]"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  sizes="200px"
                  className={`h-auto opacity-55 transition-opacity duration-300 group-hover:opacity-100 ${
                    wide ? "w-[78%] max-w-[190px]" : "w-auto max-h-[58%] max-w-[60%]"
                  }`}
                />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
