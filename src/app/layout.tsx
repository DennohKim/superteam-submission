import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Solana Data",
  description: "Metrics, charts, and data for Solana Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
