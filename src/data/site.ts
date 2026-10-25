// Contact details come from the previous noortextile.az site and must be confirmed by the client
// before launch (see BRAND_BRIEF.md → Open questions).
export const site = {
  name: "Noor Textile",
  tagline: "Premium ev tekstili",
  since: "8 ildir sizinlə",
  phoneDisplay: "+994 77 597 47 87",
  phoneHref: "tel:+994775974787",
  whatsapp: "994775974787",
  email: "info@noortextile.az",
  address: "Cəlil Məmmədquluzadə küç. 85, Bakı",
  instagram: "https://www.instagram.com/noor_textile/",
  instagramHandle: "@noor_textile",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
