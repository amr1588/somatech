"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-cairo" dir="rtl">
      <main className="pb-20">
        {/* Page Title Section */}
        <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-8">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-4xl font-black text-brand-blue">تواصل معنا</h1>
            <div className="w-24 h-1.5 bg-brand-gold rounded-full"></div>
          </div>
        </div>

        {/* Hero & Form Section */}
        <div className="relative w-full max-w-[1300px] mx-auto min-h-[800px] rounded-[40px] overflow-hidden shadow-2xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image 
              src="/tower-buildings.png" 
              alt="Contact Background" 
              layout="fill" 
              objectFit="cover"
              className="brightness-50 grayscale-[0.3]"
            />
            <div className="absolute inset-0 bg-[#171D5B]/60"></div>
          </div>

          {/* Form Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full py-16 px-6">
            
            {/* Logo */}
            <div className="mb-12 flex flex-col items-center">
               <h2 className="text-white text-5xl font-black tracking-wider mb-2">سومتك</h2>
               <div className="text-brand-gold text-lg font-bold tracking-[0.3em] uppercase">SOUMTECH</div>
               <div className="w-full h-px bg-white/20 mt-4"></div>
               <p className="text-white/60 text-xs mt-2 font-bold">المنصة الوطنية للمزادات</p>
               <p className="text-white/60 text-[10px] font-bold">National Auctioning Platform</p>
            </div>

            {/* Glassmorphism Card */}
            <div className="w-full max-w-[1000px] bg-[#171D5B]/40 backdrop-blur-md rounded-[32px] p-10 md:p-16 border border-white/10 shadow-2xl">
              <form className="space-y-8">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {/* Name */}
                  <div className="flex flex-col gap-3">
                    <label className="text-white font-bold text-sm pr-2">الاسم</label>
                    <input 
                      type="text" 
                      placeholder="ادخل الاسم"
                      className="w-full bg-white rounded-xl py-4 px-6 text-brand-blue font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-3">
                    <label className="text-white font-bold text-sm pr-2">البريد الالكتروني</label>
                    <input 
                      type="email" 
                      placeholder="ادخل البريد الالكتروني"
                      className="w-full bg-white rounded-xl py-4 px-6 text-brand-blue font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-3">
                    <label className="text-white font-bold text-sm pr-2">الموضوع</label>
                    <input 
                      type="text" 
                      placeholder="ادخل كلمة المرور" 
                      className="w-full bg-white rounded-xl py-4 px-6 text-brand-blue font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                    />
                  </div>

                  {/* Issue Type */}
                  <div className="flex flex-col gap-3">
                    <label className="text-white font-bold text-sm pr-2">نوع المشكلة</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-white rounded-xl py-4 px-6 text-brand-blue font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all cursor-pointer"
                      >
                        <option value="" disabled selected>اختر نوع المشكلة</option>
                        <option>مشكلة تقنية</option>
                        <option>استفسار عن مزاد</option>
                        <option>شكوى</option>
                      </select>
                      <ChevronDown className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-blue pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-3 pt-2">
                  <label className="text-white font-bold text-sm pr-2">الوصف</label>
                  <textarea 
                    rows={6}
                    placeholder="ادخل الوصف هنا"
                    className="w-full bg-white rounded-xl py-4 px-6 text-brand-blue font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button 
                    type="submit"
                    className="w-full max-w-[400px] bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-gold/20 transition-all cursor-pointer text-xl"
                  >
                    ارسال
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Partners Logos */}
            <div className="mt-12 flex items-center gap-12 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
               <Image src="/mazaya_Alfedhiyah.png" alt="REGA" width={200} height={120} className="object-contain" />
               <Image src="/elhy2aEl3ama.png" alt="Infath" width={200} height={120} className="object-contain" />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
