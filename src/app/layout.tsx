import type { Metadata } from "next";

import "./page.css";
import "../components/header/Header.css";
import "../components/footer/Footer.css";

export const metadata: Metadata = {
  title: "Utility",
  description: "Simple online tools for everyday work.",
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
