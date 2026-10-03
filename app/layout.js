import "@/styles/globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/data/site";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata = {
  metadataBase: new URL(base),
  icons: { icon: "/logo/my-logo.jpeg" },
  title: { default: `${site.title} | ${site.author}`, template: "%s | Muhammad Yasir" },
  description: site.description,
  authors: [{ name: site.author }],
  alternates: { canonical: "/" },
  openGraph: { title: `${site.title} | ${site.author}`, description: site.description, type: "website", siteName: site.shortTitle, images: [{ url: "/images/profile.jpg", alt: "Muhammad Yasir" }] },
  twitter: { card: "summary_large_image", title: `${site.title} | ${site.author}`, description: site.description },
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2545" };

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded focus:bg-gold-500 focus:px-3 focus:py-2 focus:text-navy-950">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
