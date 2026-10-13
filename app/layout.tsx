import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realtor Debbie — Access Gate Estate, APO WASSA",
  description: "C of O verified land at APO WASSA. Buy & Build. Book inspection today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
