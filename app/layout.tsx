import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MockProvider } from "@/components/providers/MockProvider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CargoFlow",
    template: "%s | CargoFlow",
  },
  description: "Gestão de documentos e operações de importação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} antialiased`}>
        <MockProvider>
          {children}
        </MockProvider>
      </body>
    </html>
  );
}