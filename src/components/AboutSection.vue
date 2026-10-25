<script setup lang="ts">
import SerlovheBand from "./ornament/SerlovheBand.vue";
import GoldRosette from "./ornament/GoldRosette.vue";
import CatchWord from "./ornament/CatchWord.vue";
import { partners } from "@/data/partners";
import { asset } from "@/asset";

const values = [
  { title: "Milli naxışlar", text: "Hər dizayn Şirvan, Qarabağ, Muğan xalçalarından və Nizami miniatürlərindən ilhamlanır." },
  { title: "İncə tikmə", text: "Qızılı haşiyələrdən kiçik qotazlara qədər hər detal diqqətlə işlənir." },
  { title: "Korporativ sifarişlər", text: "Otel, restoran və kafelər üçün süfrə, salfet və dekorativ tekstil." },
];
</script>

<template>
  <section id="haqqimizda" class="bg-paper">
    <div class="mx-auto max-w-[1360px] px-4 pt-20 sm:px-10 lg:pt-28">
      <SerlovheBand title="Haqqımızda" />

      <p class="display mx-auto mt-16 max-w-[22ch] text-center text-[clamp(2.1rem,4.4vw,3.8rem)] lg:mt-24">
        «Noor» <span class="gold-text">işıq</span> deməkdir. Biz o işığı naxışla toxuyuruq.
      </p>

      <!-- Two columns divided by a gold rule, the way a masnavi is set on the page. -->
      <div class="masnavi mx-auto mt-14 grid max-w-[1000px] gap-10 text-[1.02rem] leading-[1.8] text-ink-soft md:grid-cols-2 md:gap-0">
        <p class="md:pr-12">
          Noor Textile səkkiz ildir premium ev tekstili yaradır. Hər yastıqda, süfrədə və salfetdə Azərbaycan xalça
          məktəblərinin həndəsəsi və miniatür sənətinin incəliyi yaşayır.
          <GoldRosette class="ml-1 align-[-0.1em]" />
        </p>
        <p class="md:pl-12">
          Ənənəni muzey vitrinində deyil, gündəlik həyatda görürük: çay süfrəsində, qonaq otağında, uşaq otağında. Hər
          parça evin ən çox baxılan yerinə yaraşsın deyə hazırlanır.
          <GoldRosette class="ml-1 align-[-0.1em]" />
        </p>
      </div>

      <div class="mt-20 grid grid-cols-12 items-start gap-4 sm:gap-8 lg:mt-28">
        <figure class="col-span-12 sm:col-span-7">
          <div class="cedvel relative aspect-[5/4] overflow-hidden bg-wash">
            <img
              :src="asset('images/lifestyle/garden-table.jpg')"
              alt="Bağda qurulmuş süfrə: Gül Qabı süfrəsi və Göllü yastıqları"
              loading="lazy"
              class="absolute inset-0 size-full object-cover"
            />
          </div>
          <figcaption class="mt-5 text-sm text-silver-ink">Gül Qabı süfrəsi və Göllü yastıqları</figcaption>
        </figure>
        <figure class="col-span-10 col-start-3 sm:col-span-5 sm:col-start-auto sm:mt-28">
          <div class="cedvel relative aspect-[4/5] overflow-hidden bg-wash">
            <img
              :src="asset('images/lifestyle/terracotta.jpg')"
              alt="Terrakota rəngli, heyvan və kilim naxışlı yastıqlar"
              loading="lazy"
              class="absolute inset-0 size-full object-cover"
            />
          </div>
          <figcaption class="mt-5 text-sm text-silver-ink">Kilim panelləri, quş və keçi təsvirləri</figcaption>
        </figure>
      </div>

      <dl class="mt-24 grid border-t border-gold sm:grid-cols-3 lg:mt-32">
        <div
          v-for="(v, i) in values"
          :key="v.title"
          class="border-b border-line py-9 sm:border-b-0 sm:px-8 sm:py-12"
          :class="{ 'sm:border-l sm:border-l-gold/60': i > 0, 'sm:pl-0': i === 0 }"
        >
          <dt class="display flex items-center gap-3 text-[1.7rem]">
            <GoldRosette />
            {{ v.title }}
          </dt>
          <dd class="mt-4 max-w-[30ch] text-[0.98rem] leading-relaxed text-ink-soft">{{ v.text }}</dd>
        </div>
      </dl>
    </div>

    <div id="terefdaslar" class="mx-auto max-w-[1360px] px-4 pt-24 sm:px-10 lg:pt-32">
      <SerlovheBand title="Tərəfdaşlar" />
      <p class="mx-auto mt-12 max-w-[46ch] text-center text-[1.02rem] text-ink-soft">
        Bakının seçilmiş otelləri, restoranları və brendləri ilə birgə işləyirik.
      </p>
      <ul class="partners mt-14 grid grid-cols-2 sm:grid-cols-4">
        <li v-for="p in partners" :key="p.name" class="grid aspect-[3/2] place-items-center px-6">
          <img
            :src="p.logo"
            :alt="p.name"
            :width="p.width"
            :height="p.height"
            loading="lazy"
            class="h-auto opacity-50 transition-opacity duration-300 hover:opacity-90"
            :class="p.width / p.height > 3 ? 'w-[64%] max-w-[160px]' : 'max-h-[46%] w-auto max-w-[48%]'"
          />
        </li>
      </ul>
      <CatchWord class="mt-16" to="kataloq" word="Kataloq" />
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 768px) {
  .masnavi {
    background: linear-gradient(var(--color-gold), var(--color-gold)) center / 1px 100% no-repeat;
  }
}
/* Silver rules only between logos, never around the outside. */
.partners {
  overflow: hidden;
}
.partners li {
  box-shadow:
    -1px 0 0 var(--color-line),
    0 -1px 0 var(--color-line);
}
</style>
