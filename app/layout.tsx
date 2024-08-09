import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Taskero With AI",
  description: "Made by Reho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f5f6f8]">{children}</body>
    </html>
  );
}
