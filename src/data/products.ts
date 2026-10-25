import { asset } from "@/asset";

export type CategoryId = "yastiq" | "sufre" | "salfet" | "usaq";

export const categories: { id: CategoryId; label: string; short: string }[] = [
  { id: "yastiq", label: "Dekorativ yastıqlar", short: "Yastıqlar" },
  { id: "sufre", label: "Süfrə və rannerlər", short: "Süfrələr" },
  { id: "salfet", label: "Salfetlər", short: "Salfetlər" },
  { id: "usaq", label: "Uşaq otağı", short: "Uşaq otağı" },
];

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  /** AZN. `null` means price on request. */
  price: number | null;
  size?: string;
  color?: string;
  images: string[];
  /** Product shot on a white background (blended into the card surface). */
  cutout?: boolean;
  description: string;
  badge?: string;
};

const img = (file: string) => asset(`images/products/${file}`);

export const products: Product[] = [
  {
    slug: "xosrov-ve-sirin",
    name: "Xosrov və Şirin",
    category: "yastiq",
    price: 100,
    size: "40 × 50 sm",
    color: "Göy",
    images: [img("xosrov-ve-sirin.jpg")],
    description:
      "Nizami Gəncəvinin «Xosrov və Şirin» poemasından ilhamlanan miniatür səhnə. Göy kətan fonda qızılı haşiyə, bağ, gül kolu və iki qəhrəman — incə tikmə ilə.",
    badge: "Seçilmiş",
  },
  {
    slug: "gollu",
    name: "Göllü",
    category: "yastiq",
    price: 75,
    size: "45 × 50 sm",
    color: "Qəhvəyi, xardalı",
    images: [img("gollu.jpg")],
    description:
      "Azərbaycan xalçalarının «göl» medalyonu məxmər paneldə. Çiçəkli haşiyə, qızılı kontur və ucunda kiçik qotaz.",
  },
  {
    slug: "sirvan-kilim",
    name: "Şirvan Kilim",
    category: "yastiq",
    price: 60,
    size: "45 × 45 sm",
    color: "Qırmızı",
    images: [img("sirvan-kilim-cutout.jpg"), img("sirvan-kilim-lifestyle.jpg")],
    cutout: true,
    description:
      "Şirvan kilimlərinin həndəsi dili: qarmaqlı medalyonlar, romblar və «axar» haşiyə — tünd qırmızı parça üzərində.",
  },
  {
    slug: "qarabag-atlari",
    name: "Qarabağ atları",
    category: "yastiq",
    price: 55,
    size: "45 × 45 sm",
    color: "Bej",
    images: [img("qarabag-atlari.jpg")],
    cutout: true,
    description: "Romb çərçivədə şahə qalxan Qarabağ atı və künclərdə çapan atlar. Bej fonda terrakota və yaşıl tikmə.",
  },
  {
    slug: "nar-agaci",
    name: "Nar ağacı",
    category: "yastiq",
    price: 70,
    size: "45 × 45 sm",
    color: "Xardalı",
    images: [img("nar-agaci.jpg")],
    cutout: true,
    description: "Bolluq və bərəkət rəmzi olan nar ağacı — xardalı fonda qırmızı nar və yaşıl yarpaqlar.",
  },
  {
    slug: "rengberenq-zolaqli",
    name: "Rəngbərəng zolaqlı",
    category: "yastiq",
    price: 80,
    size: "45 × 50 sm",
    color: "Rəngbərəng",
    images: [img("rengbereng.jpg")],
    description: "Palaz ritmində zolaqlar, hər zolaqda öz naxışı və rəngli qotazlar. Qonaq otağına isti aksent.",
  },
  {
    slug: "heyvan-naxislari",
    name: "Heyvan naxışları",
    category: "yastiq",
    price: 65,
    size: "45 × 45 sm",
    color: "Narıncı",
    images: [img("narinci-heyvanlar.jpg")],
    cutout: true,
    description: "Qədim qayaüstü təsvirləri xatırladan quşlar, keçilər və həyat ağacı — narıncı fonda kvadrat panellərdə.",
  },
  {
    slug: "uzun-narinci",
    name: "Uzun yastıq, narıncı",
    category: "yastiq",
    price: 90,
    color: "Narıncı",
    images: [img("narinci-uzun.jpg"), asset("images/lifestyle/terracotta.jpg")],
    cutout: true,
    description: "Panellərdə növbələşən kilim medalyonları, xoruz və keçi təsvirləri. Divan və kreslo üçün uzun format.",
  },
  {
    slug: "mugan",
    name: "Muğan",
    category: "yastiq",
    price: 70,
    color: "Zeytuni",
    images: [img("mugan.jpg")],
    description: "Muğan xalçalarının ornamental haşiyəsi zeytuni fonda — xalça və məxmər yastıqlarla mükəmməl uyğunluq.",
  },
  {
    slug: "tund-sari-ornament",
    name: "Tünd sarı ornament",
    category: "yastiq",
    price: 75,
    size: "45 × 45 sm",
    color: "Tünd sarı, zeytuni",
    images: [img("tund-sari.jpg")],
    description: "Mərkəzi medalyon və zərif haşiyə — iki tonlu parça, künclərdə qotazlar.",
  },
  {
    slug: "terrakota-medalyon",
    name: "Terrakota medalyon",
    category: "yastiq",
    price: 70,
    color: "Bej",
    images: [img("bej-mandala.jpg")],
    description: "Ağ fonda terrakota rəngli dairəvi medalyon. Bağ və terras mebeli üçün yüngül, sakit aksent.",
  },
  {
    slug: "gul-celengi",
    name: "Gül çələngi",
    category: "yastiq",
    price: 70,
    size: "45 × 45 sm",
    color: "Qara",
    images: [img("qara-portret.jpg")],
    cutout: true,
    description: "Qara fonda rəngarəng gül çələngi, mərkəzdə qadın portreti olan medalyon.",
  },
  {
    slug: "palm-summer",
    name: "Palm Summer",
    category: "yastiq",
    price: null,
    color: "Bej, göy",
    images: [img("palm-summer.jpg"), asset("images/lifestyle/summer.jpg")],
    description: "Yay kolleksiyası: bej parçada göy palma yarpaqları. Bağ və terras üçün təravətli seçim.",
    badge: "Yay",
  },
  {
    slug: "palma",
    name: "Palma",
    category: "yastiq",
    price: null,
    color: "Boz kətan, tünd göy",
    images: [img("palma.jpg"), asset("images/lifestyle/summer.jpg")],
    description: "Boz kətan üzərində tək palma ağacı və tünd göy kant. Palm Summer ilə dəst kimi.",
    badge: "Yay",
  },
  {
    slug: "gul-qabi",
    name: "Gül Qabı",
    category: "sufre",
    price: 280,
    size: "160 × 250 sm",
    color: "Ağ",
    images: [img("gul-qabi.jpg")],
    description: "Böyük ailə süfrəsi üçün ağ süfrə: rəngli çiçək və ərəbüsk tikməsi. Bayram və qonaq masaları üçün.",
  },
  {
    slug: "sirvan-kilim-ranner",
    name: "Şirvan Kilim ranner",
    category: "sufre",
    price: 190,
    size: "45 × 130 sm",
    color: "Ağ, qırmızı",
    images: [img("sirvan-kilim-sufre.jpg")],
    description: "Şirvan kilim medalyonları ilə ranner süfrə, uclarında rəngli qotazlar.",
  },
  {
    slug: "qedim-gence",
    name: "Qədim Gəncə",
    category: "sufre",
    price: 450,
    size: "En 50 sm",
    color: "Bej",
    images: [img("qedim-gence.jpg")],
    description: "Qədim Gəncə naxışları ilə uzun ranner süfrə. Böyük açıq hava masaları üçün.",
  },
  {
    slug: "firuze-sufre-xalca",
    name: "Firuzə süfrə-xalça",
    category: "sufre",
    price: 250,
    size: "Ø 70 sm",
    color: "Göy",
    images: [img("novruz-goy.jpg")],
    description: "Firuzəyi parçada qızılı ornament və qotazlı kənarlar. Novruz xonçası və bayram masası üçün.",
  },
  {
    slug: "xari-bulbul",
    name: "Xarı Bülbül",
    category: "sufre",
    price: 140,
    size: "Ø 60 sm",
    color: "Bej",
    images: [img("xari-bulbul.jpg")],
    description: "Qarabağın rəmzi xarı bülbül çiçəyi bej süfrə-xalçada — dairəvi masaların mərkəzi üçün.",
  },
  {
    slug: "ag-sufre-xalcasi",
    name: "Ağ süfrə xalçası",
    category: "sufre",
    price: 120,
    color: "Ağ",
    images: [img("sufre-xalcasi-ag.jpg")],
    cutout: true,
    description: "Oval ağ süfrə xalçası, kənarı boyunca yaşıl çiçəkli çələng tikməsi.",
  },
  {
    slug: "salfet-tund-sari",
    name: "Salfet, tünd sarı",
    category: "salfet",
    price: 15,
    size: "50 × 50 sm",
    color: "Tünd sarı",
    images: [img("salfet-tund-sari.jpg")],
    description: "Tikməli parça salfet. Qiymət bir ədəd üçündür — dəstləri süfrələrlə birlikdə sifariş edin.",
  },
  {
    slug: "usaq-otagi-desti",
    name: "Uşaq otağı dəsti",
    category: "usaq",
    price: null,
    images: [img("usaq-otagi-desti.jpg")],
    description:
      "Rahatlıq, yumşaqlıq və gözəl detallar bir arada: dovşan tikməli yastıq üzü, ulduzlu mələfələr, xalat və dəsmallar.",
    badge: "Yeni",
  },
  {
    slug: "usaq-dekorativ-yastiqlar",
    name: "Uşaq dekorativ yastıqları",
    category: "usaq",
    price: null,
    images: [img("usaq-yastiqlari.jpg")],
    description: "Ulduz, fil, maşın, dovşan və nağıl qəhrəmanları — uşaq otağı üçün tikməli dekorativ yastıqlar.",
    badge: "Yeni",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number | null) {
  return price === null ? "Qiymət sorğu ilə" : `${price} ₼`;
}
