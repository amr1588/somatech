"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle, PlusCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-[#171D5B] text-white py-4 px-6 font-cairo shadow-xl border-b border-white/5" dir="rtl">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Right Section: Logo and Links */}
        <div className="flex items-center gap-12">
          {/* Logo (Reverted to Previous Version) */}
          <Link href="/" className="flex flex-col items-center text-center select-none cursor-pointer gap-2">
            <div className="relative flex items-end">
              <span className="text-3xl font-black tracking-tight leading-[0.8] mb-1 text-white">سومتك</span>
              <span className="absolute top-0 left-15 w-2.5 h-2.5 bg-brand-gold rounded-sm rotate-45 border border-[#171D5B]"></span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-brand-gold font-bold text-base tracking-[0.25em] leading-none mb-1">SOUMTECH</span>
              <div className="flex flex-col items-center opacity-90">
                <span className="text-[11px] font-medium leading-tight text-white/90">المنصة الوطنية للمزادات</span>
                <span className="text-[9px] font-light leading-tight uppercase tracking-tight text-white/70">National Auctioning Platform</span>
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-[19px]">
            <Link href="/" className="relative py-1 group">
              <span className={`font-bold transition-colors duration-300 ${pathname === "/" ? "text-brand-gold" : "text-white group-hover:text-brand-gold"}`}>الرئيسية</span>
              <span className={`absolute -bottom-1 right-0 h-1 bg-brand-gold rounded-full transition-all duration-300 w-0 ${pathname === "/" ? "w-full" : "w-1/2  group-hover:w-full"}`}></span>
            </Link>

            <Link href="/auctions" className="relative py-1 group">
              <span className={`font-medium transition-colors duration-300 ${pathname === "/auctions" ? "text-brand-gold" : "text-white/90 group-hover:text-brand-gold"}`}>المزادات</span>
              <span className={`absolute -bottom-1 right-0 h-1 bg-brand-gold rounded-full transition-all duration-300 ${pathname === "/auctions" ? "w-full" : "w-1/2 group-hover:w-full"}`}></span>
            </Link>

            <Link href="/contact" className="font-medium text-white/90 hover:text-brand-gold transition-colors">
              تواصل معنا
            </Link>

            <Link href="/faq" className="font-medium text-white/90 hover:text-brand-gold transition-colors">
              الأسئلة الشائعة
            </Link>
          </div>
        </div>

        {/* Left Section: Action Button and Login */}
        <div className="flex items-center gap-8">
          {/* Add Property Button */}
          <button className="bg-brand-gold hover:bg-brand-gold/90 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer">
            <PlusCircle size={20} strokeWidth={2.5} />
            <span>اضف عقارك</span>
          </button>

          {/* Login Section */}
          <div className="flex items-center gap-2.5 cursor-pointer group hover:text-brand-gold transition-all duration-300">
            <span className="text-lg font-medium">تسجيل الدخول</span>
            <UserCircle size={32} strokeWidth={1.5} className="text-white group-hover:text-brand-gold transition-all duration-300" />
          </div>
        </div>

      </div>
    </nav>
  );
}