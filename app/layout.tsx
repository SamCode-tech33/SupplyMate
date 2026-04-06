import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";

export const metadata: Metadata = {
  title: "SupplyMate",
  description: "Internal supplies purchase request application",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
