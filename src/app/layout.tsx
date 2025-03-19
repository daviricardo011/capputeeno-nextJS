import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StyledComponentsRegistry from "../../lib/registry";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capputeeno",
  description:
    "Reprodução do teste de front-end da Rocketseat para aplicar conceitos do next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${saira.className}`}>
        <StyledComponentsRegistry>
          <Header />
          <div className="headerSpacing">{children}</div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
