"use client";

import Link from "next/link";
import { Linkedin, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100 font-cairo" dir="rtl">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
        
        {/* Column 1: Logo & Social */}
        <div className="flex flex-col items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-start select-none mb-6">
            <div className="flex flex-col items-start gap-0">
              <span className="text-[32px] font-semibold tracking-tighter leading-[0.7] mb-1 text-[#171D5B]">سومتك</span>
              <span className="text-[#EEA820] font-bold text-[12px] tracking-[0.35em] leading-none mb-2 pr-1 mt-2">SOUMTECH</span>
              <div className="flex flex-col items-start pr-1 gap-0.5">
                <span className="text-[9px] font-medium leading-none text-gray-400">المنصة الوطنية للمزادات</span>
                <span className="text-[9px] font-medium leading-none uppercase tracking-tighter text-gray-400">National Auctioning Platform</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-[13px] leading-relaxed mb-6 max-w-[300px] text-right">
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى حيث يمكنك ن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى الموقع الالكترونى.
          </p>
          
          <div className="flex gap-3">
            <Link href="#" className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-md text-[#E4405F] hover:bg-gray-50 transition-all shadow-sm">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-md text-[#1DA1F2] hover:bg-gray-50 transition-all shadow-sm">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-md text-[#0077B5] hover:bg-gray-50 transition-all shadow-sm">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Column 2: Main Menu */}
        <div className="lg:pr-8">
          <div className="mb-8">
            <h3 className="text-[#171D5B] font-bold text-[16px] mb-2">القائمة الرئيسية</h3>
            <div className="w-10 h-[3px] bg-[#EEA820] rounded-full"></div>
          </div>
          <ul className="space-y-4 text-gray-400 font-medium text-[13px]">
            <li><Link href="#" className="hover:text-[#171D5B] transition-colors">الضوابط الإعلانية الصادرة من الهيئة</Link></li>
            <li><Link href="/terms" className="hover:text-[#171D5B] transition-colors">الشروط والأحكام</Link></li>
            <li><Link href="#" className="hover:text-[#171D5B] transition-colors">ترخيص الهيئة العامة للعقار</Link></li>
            <li><Link href="#" className="hover:text-[#171D5B] transition-colors">تواصل معنا</Link></li>
          </ul>
        </div>

        {/* Column 3: Sections */}
        <div className="lg:pr-8">
          <div className="mb-8">
            <h3 className="text-[#171D5B] font-bold text-[16px] mb-2">الأقسام</h3>
            <div className="w-10 h-[3px] bg-[#EEA820] rounded-full"></div>
          </div>
          <ul className="space-y-4 text-gray-400 font-medium text-[13px]">
            <li><Link href="#" className="hover:text-[#171D5B] transition-colors">مكتبة الدعم</Link></li>
            <li><Link href="#" className="hover:text-[#171D5B] transition-colors">الأسئلة الشائعة</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="lg:pr-2">
          <div className="mb-8">
            <h3 className="text-[#171D5B] font-bold text-[16px] mb-2">تواصل معنا</h3>
            <div className="w-10 h-[3px] bg-[#EEA820] rounded-full"></div>
          </div>
          <ul className="space-y-6 text-gray-400 font-medium text-[13px]">
            <li className="flex items-center gap-4 justify-start">
              <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full shrink-0">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <span className="text-[13px]">الرياض حي الملك فيصل، السعودية</span>
            </li>
            <li className="flex items-center gap-4 justify-start">
              <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full shrink-0">
                <Phone size={18} className="text-gray-400" />
              </div>
              <span className="text-[13px]" dir="ltr">+966 570 212 216</span>
            </li>
            <li className="flex items-center gap-4 justify-start">
              <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full shrink-0">
                <Mail size={18} className="text-gray-400" />
              </div>
              <span className="text-[13px]">info@soum.tech</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1280px] mx-auto px-6 mt-16 pt-8 border-t border-brand-gold/25 flex justify-start items-center text-gray-400 text-[12px]">
        <p dir="rtl">© جميع الحقوق محفوظة - لـ سومتك 2025</p>
      </div>
    </footer>
  );
}
