import type { Metadata, Viewport } from "next";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";
import { IntroProvider, introBootScript } from "@/components/intro/IntroProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://noortextile.az"),
  title: "Noor Textile — Premium ev tekstili",
  description:
    "Azərbaycan naxışları ilə tikməli dekorativ yastıqlar, süfrələr, salfetlər və uşaq otağı tekstili. 8 ildir sizinlə.",
  openGraph: {
    title: "Noor Textile — Premium ev tekstili",
    description: "Azərbaycan naxışları ilə tikməli ev tekstili.",
    images: ["/images/lifestyle/xosrov.jpg"],
    locale: "az_AZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        <noscript>
          <style>{"[data-intro-overlay]{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <IntroProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
