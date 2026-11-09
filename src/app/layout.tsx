import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Sora } from "next/font/google";
import { site, ui } from "@content";
import { motionInitScript } from "@/lib/motionPauseScript";
import { DEFAULT_THEME, getTheme, themeCss, themeInitScript } from "@/lib/theme/themes";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Brand wordmark font (brand kit: Sora Medium, uppercase, wide tracking)
const sora = Sora({ subsets: ["latin"], weight: ["500"], variable: "--font-sora", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-inter-tight", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: site.title,
  description: site.description,
  openGraph: { title: site.title, description: site.description, url: "/", type: "website" },
};

export const viewport: Viewport = { themeColor: getTheme(DEFAULT_THEME).tokens.canvas, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} data-theme={DEFAULT_THEME} className={`${inter.variable} ${interTight.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + motionInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {ui.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
