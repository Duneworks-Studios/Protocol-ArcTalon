import type { Metadata } from "next";
import "./globals.css";
import MatrixRain from "@/components/MatrixRain";

export const metadata: Metadata = {
  title: "Protocol ArcTalon",
  description: "AI Legacy System - Duneworks Studios Archive",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <div className="matrix-bg">
          <MatrixRain />
        </div>
        {children}
      </body>
    </html>
  );
}

