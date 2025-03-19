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
      <body
        className={`${saira.className}`}
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <StyledComponentsRegistry>
          <Header />
          <div
            style={{
              marginTop: "5.625rem",
              width: "100%",
              maxWidth: "1120px",
            }}
          >
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
