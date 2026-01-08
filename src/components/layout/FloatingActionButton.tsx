"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, X, ChevronUp } from "lucide-react";

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-[var(--gray-700)] text-white rounded-full shadow-xl hover:bg-[var(--gray-800)] transition-all duration-300 flex items-center justify-center hover:scale-110 animate-fade-in"
          aria-label="맨 위로 이동"
        >
          <ChevronUp className="w-7 h-7" />
        </button>
      )}

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="flex flex-col animate-slide-up" style={{ gap: '16px' }}>
          {/* 카카오톡 상담 */}
          <a
            href="https://pf.kakao.com/_xnxnxnxn"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '12px 20px', gap: '10px' }}
            className="flex items-center bg-[#FEE500] text-[#3C1E1E] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 bg-[#3C1E1E] rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-[#FEE500]" />
            </div>
            <div>
              <p className="font-bold text-lg">카카오톡 상담</p>
              <p className="text-sm opacity-80">빠른 답변을 받으세요</p>
            </div>
          </a>

          {/* 전화 연결 */}
          <a
            href="tel:1577-0052"
            style={{ padding: '12px 20px', gap: '10px' }}
            className="flex items-center bg-[var(--primary-500)] text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">전화 연결</p>
              <p className="text-xl font-bold">1577-0052</p>
            </div>
          </a>
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-20 h-20 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 ${
          isExpanded
            ? "bg-[var(--gray-700)] text-white rotate-180"
            : "bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-600)] text-white"
        }`}
        aria-label={isExpanded ? "메뉴 닫기" : "상담 메뉴 열기"}
      >
        {isExpanded ? (
          <X className="w-9 h-9" />
        ) : (
          <div className="flex flex-col items-center">
            <Phone className="w-8 h-8 mb-1" />
            <span className="text-xs font-bold">상담</span>
          </div>
        )}
      </button>
    </div>
  );
}
