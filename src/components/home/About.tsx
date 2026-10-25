import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Partners } from "./Partners";

const values = [
  {
    title: "Milli naxışlar",
    text: "Hər dizayn Şirvan, Qarabağ, Muğan xalçalarından və Nizami miniatürlərindən ilhamlanır.",
  },
  {
    title: "İncə tikmə",
    text: "Qızılı haşiyələrdən kiçik qotazlara qədər hər detal diqqətlə işlənir.",
  },
  {
    title: "Korporativ sifarişlər",
    text: "Otel, restoran və kafelər üçün süfrə, salfet və dekorativ tekstil həlləri.",
  },
];

export function About() {
  return (
    <section id="haqqimizda" className="relative bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold-deep">Haqqımızda</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.4vw,4.6rem)]">
              «Noor» — <em className="italic text-gold-deep">işıq</em> deməkdir
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                Noor Textile 8 ildir ki, premium ev tekstili yaradır. Hər yastıqda, süfrədə və salfetdə Şirvan
                kilimlərinin həndəsəsi, Qarabağ xalçalarının rəngləri və miniatür sənətinin zərifliyi yaşayır.
              </p>
              <p>
                Ənənəni muzey eksponatı kimi yox, gündəlik həyatın bir parçası kimi görürük — çay süfrəsində, qonaq
                otağında, uşaq otağında.
              </p>
            </div>
          </Reveal>

          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-5 gap-4">
              <Reveal className="col-span-3" delay={0.05}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
                  <Image
                    src="/images/lifestyle/garden-table.jpg"
                    alt="Bağda qurulmuş süfrə, Gül Qabı süfrəsi və Göllü yastıqları"
                    fill
                    sizes="(min-width: 1024px) 35vw, 60vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal className="col-span-2 mt-16" delay={0.15}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-mist">
                  <Image
                    src="/images/lifestyle/terracotta.jpg"
                    alt="Terrakota rəngli etnik naxışlı yastıqlar"
                    fill
                    sizes="(min-width: 1024px) 23vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3 lg:mt-28">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={0.06 * i} className="bg-paper p-8 lg:p-10">
              <span className="display text-sm text-gold-deep">0{i + 1}</span>
              <h3 className="display mt-3 text-3xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Partners />
    </section>
  );
}
