<script setup lang="ts">
import PartnersGrid from "./PartnersGrid.vue";
import { asset } from "@/asset";

const values = [
  { title: "Milli naxışlar", text: "Hər dizayn Şirvan, Qarabağ, Muğan xalçalarından və Nizami miniatürlərindən ilhamlanır." },
  { title: "İncə tikmə", text: "Qızılı haşiyələrdən kiçik qotazlara qədər hər detal diqqətlə işlənir." },
  { title: "Korporativ sifarişlər", text: "Otel, restoran və kafelər üçün süfrə, salfet və dekorativ tekstil həlləri." },
];
</script>

<template>
  <section id="haqqimizda" class="relative bg-paper">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:py-36">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div v-reveal class="lg:col-span-5">
          <p class="eyebrow text-gold-deep">Haqqımızda</p>
          <h2 class="display mt-5 text-[clamp(2.6rem,5.4vw,4.6rem)]">
            «Noor» — <em class="italic text-gold-deep">işıq</em> deməkdir
          </h2>
          <div class="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
            <p>
              Noor Textile 8 ildir ki, premium ev tekstili yaradır. Hər yastıqda, süfrədə və salfetdə Şirvan kilimlərinin
              həndəsəsi, Qarabağ xalçalarının rəngləri və miniatür sənətinin zərifliyi yaşayır.
            </p>
            <p>
              Ənənəni muzey eksponatı kimi yox, gündəlik həyatın bir parçası kimi görürük — çay süfrəsində, qonaq otağında,
              uşaq otağında.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-4 lg:col-span-7">
          <div v-reveal="0.05" class="col-span-3">
            <div class="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
              <img
                :src="asset('images/lifestyle/garden-table.jpg')"
                alt="Bağda qurulmuş süfrə, Gül Qabı süfrəsi və Göllü yastıqları"
                loading="lazy"
                class="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
          <div v-reveal="0.15" class="col-span-2 mt-16">
            <div class="relative aspect-[3/4] overflow-hidden rounded-sm bg-mist">
              <img
                :src="asset('images/lifestyle/terracotta.jpg')"
                alt="Terrakota rəngli etnik naxışlı yastıqlar"
                loading="lazy"
                class="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3 lg:mt-28">
        <div v-for="(v, i) in values" :key="v.title" v-reveal="0.06 * i" class="bg-paper p-8 lg:p-10">
          <h3 class="display text-3xl">{{ v.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted">{{ v.text }}</p>
        </div>
      </div>
    </div>

    <PartnersGrid />
  </section>
</template>
