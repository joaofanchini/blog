import type { Metadata } from "next";
import type { Viewport } from "next";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echoes of Journey",
  description: "A Blog about IT, Software Development, and Life",
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
    <html lang="en">
      <body className={`bg-background text-foreground font-sans antialiased`}>
        <div className="flex flex-col gap-12 min-h-screen text-gray-200">
          <Header />
          <div className="px-4 max-w-3xl mx-auto">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
