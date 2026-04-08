import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";

export const metadata: Metadata = {
  title: "SupplyMate",
  description: "社内備品購入依頼申請書",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
