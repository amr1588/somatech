"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import InfathLogo from "@/components/InfathLogo";

interface AwardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetTitle?: string;
  assetImage?: string;
  initialOpeningPrice?: string;
  initialDiffPrice?: string;
  initialHedgingValue?: string;
  onAward?: () => void;
  onReject?: () => void;
  onSave?: (opening: string, diff: string, hedging: string) => void;
}

export default function AwardingModal({ 
  isOpen, 
  onClose, 
  assetTitle = "فيلا حي الروضة", 
  assetImage = "/somaHouse.png", 
  initialOpeningPrice = "",
  initialDiffPrice = "",
  initialHedgingValue = "",
  onAward, 
  onReject,
  onSave
}: AwardingModalProps) {
  const [openingPrice, setOpeningPrice] = useState(initialOpeningPrice);
  const [diffPrice, setDiffPrice] = useState(initialDiffPrice);
  const [hedgingValue, setHedgingValue] = useState(initialHedgingValue);

  // Update local state when initial values change (when modal opens for a different row)
  React.useEffect(() => {
    setOpeningPrice(initialOpeningPrice);
    setDiffPrice(initialDiffPrice);
    setHedgingValue(initialHedgingValue);
  }, [initialOpeningPrice, initialDiffPrice, initialHedgingValue, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white rounded-l-[24px] rounded-r-none w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 hover:bg-gray-100 rounded-full transition-all z-50 text-gray-400 hover:text-brand-orange cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="flex-1 overflow-auto p-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent" dir="ltr">
          <div dir="rtl">
            {/* Header Row: Price (Left) and Title (Right) */}
            <div className="flex justify-between items-start mb-8">
               {/* Title & Location (Right) */}
               <div className="text-right">
                <h2 className="text-[28px] font-black text-[#1D2939] leading-tight">{assetTitle}</h2>
                <p className="text-[#667085] text-[16px] font-medium mt-1">الدمام - عتيقة</p>
              </div>
              {/* Price (Left) */}
              <div className="text-left" dir="ltr">
                <div className="text-[22px] font-black text-[#1D2939] mb-1">سعر السوم الحالي</div>
                <div className="text-[25px] font-black text-brand-gold flex items-baseline justify-end gap-2">
                  <span className="text-[18px] font-bold text-gray-800">ر.س</span>
                  500.000.000 
                </div>
              </div>
            </div>

            {/* Middle Row: Gallery (Right) and Awarding Controls (Left) */}
            <div className="flex gap-10 mb-10 items-start" dir="rtl">
              {/* Gallery (Right) */}
              <div className="flex-1 relative aspect-[16/11] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <Image 
                  src={assetImage} 
                  alt="Property" 
                  fill 
                  className="object-cover" 
                />
                
                {/* Navigation Arrows */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 shadow-md hover:bg-white transition-all transform hover:scale-105">
                  <ChevronLeft size={20} />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 shadow-md hover:bg-white transition-all transform hover:scale-105">
                  <ChevronRight size={20} />
                </button>
                
                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 5 ? 'bg-orange-500' : 'bg-white/70'}`} />
                  ))}
                </div>
                
                {/* Infath Logo Overlay */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm flex items-center justify-center">
                  <InfathLogo width={70} height={40} className="object-contain" />
                </div>
              </div>

              {/* Awarding Controls (Left) */}
              <div className="w-[450px] space-y-5 pt-1">
                {/* Top Action Buttons */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => onReject?.()}
                    className="flex-1 py-3.5 border-2 border-[#E02D3C] text-[#E02D3C] rounded-xl font-bold text-[18px] hover:bg-rose-50 transition-all active:scale-95 cursor-pointer"
                  >
                    عدم ترسية
                  </button>
                  <button 
                    onClick={() => onAward?.()}
                    className="flex-1 py-3.5 bg-[#4CAF50] text-white rounded-xl font-bold text-[18px] hover:bg-green-600 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    ترسية
                  </button>
                </div>

                {/* Price Inputs */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-end gap-4">
                    <div className="flex-1 bg-[#F8F9FB] px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-center">
                      <input 
                        type="text" 
                        value={openingPrice} 
                        onChange={(e) => setOpeningPrice(e.target.value)}
                        className="bg-transparent w-full text-center outline-none text-[16px] font-bold text-gray-700"
                      />
                    </div>
                    <span className="text-[16px] font-black text-gray-800 w-[140px] text-right">سعر الافتتاحي للسوم</span>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <div className="flex-1 bg-[#F8F9FB] px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-center">
                      <input 
                        type="text" 
                        value={diffPrice} 
                        onChange={(e) => setDiffPrice(e.target.value)}
                        className="bg-transparent w-full text-center outline-none text-[16px] font-bold text-gray-700"
                      />
                    </div>
                    <span className="text-[16px] font-black text-gray-800 w-[140px] text-right">سعر فرق السوم</span>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <div className="flex-1 bg-[#F8F9FB] px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-center">
                      <input 
                        type="text" 
                        value={hedgingValue} 
                        onChange={(e) => setHedgingValue(e.target.value)}
                        className="bg-transparent w-full text-center outline-none text-[16px] font-bold text-gray-700"
                      />
                    </div>
                    <span className="text-[16px] font-black text-gray-800 w-[140px] text-right">قيمة التحوط</span>
                  </div>
                </div>

                {/* Secondary Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => onSave?.(openingPrice, diffPrice, hedgingValue)}
                    className="w-full py-4 bg-[#4CAF50] text-white rounded-xl font-bold text-[20px] hover:bg-green-600 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    حفظ
                  </button>
                  <button className="w-full py-4 bg-orange-400 text-white rounded-xl font-bold text-[20px] hover:bg-orange-500 transition-all shadow-md active:scale-95 cursor-pointer">
                    تقارير مخرجات المزاد
                  </button>
                </div>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-6">
              {/* التفاصيل Header */}
              <div className="bg-[#F8F9FB]/50 rounded-2xl p-4 flex items-center justify-between border border-gray-50 mb-2" dir="ltr">
                <ChevronDown size={24} className="text-blue-900" />
                <div className="relative">
                  <h3 className="text-[18px] font-black text-gray-800">التفاصيل</h3>
                  <div className="absolute bottom-[-5px] right-0 h-[4px] bg-orange-500 rounded-full mx-auto w-1/2"></div>
                </div>
              </div>

              {/* Grid of Fields */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-5 px-4">
                {[
                  { label: "نوع العقار", value: "فيلا سكنية جديدة" },
                  { label: "نوع الصفقة", value: "للبيع" },
                  { label: "المدينة", value: "الرياض" },
                  { label: "الحي", value: "حي النسيم الغربي" },
                  { label: "شمالاً", value: "فيلا رقم 8 بطول 320 م" },
                  { label: "جنوباً", value: "فيلا رقم 8 بطول 320 م" },
                  { label: "شرقاً", value: "رصيف حديقة بطول 320 م" },
                  { label: "غرباً", value: "فيلا رقم 2 بطول 653 م" },
                  { label: "مساحة العقار", value: "3420 متر مربع" },
                  { label: "رقم الصك", value: "563 443 320" },
                  { label: "هل يوجد جار", value: "لا يوجد" },
                  { label: "هل يوجد مكيف", value: "لا يوجد" },
                  { label: "عدد دورات المياه", value: "فيلا رقم 8 بطول 320 م" },
                  { label: "اسم الشارع", value: "شارع الاخلاص" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-end gap-6 group">
                    <span className="text-[16px] font-black text-gray-800 w-[100px] text-right whitespace-nowrap">{item.label}</span>
                    <div className="flex-1 bg-[#F8F9FB] px-5 py-3 rounded-xl text-[14px] font-bold text-gray-700 border border-gray-50/50 shadow-sm text-center min-h-[44px] flex items-center justify-center">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* حركة المزاد Header */}
              <div className="bg-[#F8F9FB]/50 rounded-2xl p-4 flex items-center justify-between border border-gray-50 mt-10" dir="ltr">
                <ChevronDown size={24} className="text-blue-900" />
                <div className="relative">
                  <h3 className="text-[18px] font-black text-gray-800">حركة المزاد</h3>
                  <div className="absolute bottom-[-5px] right-0 h-[4px] bg-orange-500 rounded-full mx-auto w-1/2"></div>
                </div>
              </div>

              {/* Bottom Footer Section */}
              <div className="flex justify-between items-end mt-12 pt-4" dir="ltr">
                <div className="flex gap-4">
                  <button className="w-11 h-11 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center hover:bg-rose-50 transition-all overflow-hidden">
                    <Image src="/pdf-icon.png" alt="PDF" width={45} height={45} className="object-contain" />
                  </button>
                  <button className="w-11 h-11 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center hover:bg-emerald-50 transition-all overflow-hidden">
                    <Image src="/xls-icon.png" alt="XLS" width={45} height={45} className="object-contain" />
                  </button>
                </div>
                <div className="text-right">
                  <h4 className="text-[20px] font-black text-gray-800">
                    اعلي المزايدين <span className="text-orange-500 font-black mr-1">(3)</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
