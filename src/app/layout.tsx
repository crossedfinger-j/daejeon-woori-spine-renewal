import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, FloatingActionButton } from "@/components/layout";

export const metadata: Metadata = {
  title: "대전우리병원 | 척추·관절 전문",
  description:
    "대전 지역 최고의 척추·관절 전문 의료진이 환자분들의 건강한 삶을 위해 최선을 다합니다. 온라인 예약, 전문센터 안내, 의료진 소개",
  keywords: "대전우리병원, 척추, 관절, 디스크, 정형외과, 재활의학과, 통증의학과",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "대전우리병원 | 척추·관절 전문",
    description:
      "대전 지역 최고의 척추·관절 전문병원. 비수술 치료부터 수술까지 환자 맞춤형 치료를 제공합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: 브라우저 확장 프로그램이 html 태그에 속성을 추가하여
    // 발생하는 hydration 불일치 경고를 억제합니다 (예: 광고 차단기 등)
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen pt-16 lg:pt-20 pb-[60px] lg:pb-0">
          {children}
        </main>
        <Footer />
        <FloatingActionButton />
      </body>
    </html>
  );
}
