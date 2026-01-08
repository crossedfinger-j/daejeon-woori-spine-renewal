"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navigation } from "./Navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="header-container">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[var(--primary-500)] rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-lg text-[var(--gray-900)]">대전우리병원</p>
              <p className="text-sm text-[var(--gray-500)]">척추·관절 전문</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <Navigation />
          </nav>

          {/* Desktop Actions - 전화번호와 예약 버튼 간격 확대 */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:1577-0052"
              className="flex items-center gap-3 text-[var(--primary-600)] font-semibold hover:text-[var(--primary-700)] transition-colors py-3 px-5 rounded-xl hover:bg-[var(--primary-50)]"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg">1577-0052</span>
            </a>
            {/* 온라인 예약 버튼 */}
            <Link
              href="/booking"
              style={{ padding: '10px 20px' }}
              className="bg-[var(--primary-500)] text-white text-base font-semibold rounded-xl hover:bg-[var(--primary-600)] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center"
            >
              온라인 예약
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl hover:bg-[var(--gray-100)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[var(--gray-700)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--gray-700)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            zIndex: 50,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
          className="lg:hidden"
        >
          <nav style={{ padding: '24px 20px', paddingBottom: '120px' }}>
            <Navigation isMobile onItemClick={() => setIsMobileMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
}
