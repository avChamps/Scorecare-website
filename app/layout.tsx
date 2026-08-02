import type { Metadata } from "next";
import { Geist_Mono, Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleAnalyticsId = "G-YR04K22CHY";
const googleAdsId = "AW-18267974947";
const googleTagLoaderId = googleAnalyticsId;

export const metadata: Metadata = {
  metadataBase: new URL("https://scorecareapp.com"),
  title: "ScoreCare - Know Your Score. Own Your Future.",
  description:
    "Free credit score monitoring and personalised improvement plans by Scoresathi Technologies.",
  alternates: {
    canonical: "https://scorecareapp.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {googleTagLoaderId ? (
          <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagLoaderId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
              gtag('config', '${googleAdsId}');
            `}
          </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
