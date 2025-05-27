import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "分析員阿P | 面試問題與答案 | 履歷分析及優化",
  description: "超過10個不同行業的面試問題及答案從金融到科技，從市場營銷到工程，我們涵蓋了各行各業的精選面試問題。每個問題都附帶了專家級的答案，幫助您展現專業知識和技能。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  );
}
