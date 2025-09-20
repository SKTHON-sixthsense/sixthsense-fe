import type { Metadata } from "next";
import "./globals.css";
import { AIAssistant } from "@/shared/components/AIAssistant";
import Providers from "@/shared/providers";

export const metadata: Metadata = {
  title: "다시잡",
  description: "5060을 위한 커리어 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
          <AIAssistant />
        </Providers>
      </body>
    </html>
  );
}
