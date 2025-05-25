import type { Metadata } from "next";
import type { Viewport } from "next";

import OpDefaultImage from "@images/OPDefaultImage.png";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Echoes from the Journey",
  description: "A Blog about IT, Software Development, and Life",
  openGraph: {
    title: "Echoes from the Journey",
    description: "A Blog about IT, Software Development, and Life",
    images: [
      {
        url: OpDefaultImage.src,
        alt: "Blog default image",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`bg-background text-foreground font-sans antialiased flex flex-col gap-10 min-h-screen text-gray-200`}
      >
        <Header />
        <div className="flex-grow px-4 max-w-3xl mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
