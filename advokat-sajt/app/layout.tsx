import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maja Mrđen | Advokat",
  description:
    "Profesionalna pravna zastupanja i savetovanje. Krivično, porodično i privredno pravo. Vaša pravna sigurnost je naš prioritet.",
  keywords:
    "advokat, pravne usluge, krivično pravo, porodično pravo, privredno pravo, Srbija",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
