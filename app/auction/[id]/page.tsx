"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, List, Map, Download, FileSpreadsheet, Plus, Phone, Building2, FileText } from "lucide-react";

export default function AuctionDetailsPage() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("image") || "/jenan-taiba.jpg";
  const [totalSeconds, setTotalSeconds] = useState(6 * 86400 + 14 * 3600 + 12 * 60 + 40);
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Dummy data mapping to alternate between tower and garden images
  const rows = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    image: i % 2 === 0 ? "/mazayaTower.jpg" : "/mazayaGarden.jpg",
  }));

  const auctionType = searchParams.get("type") || "active";

  const renderTimerColumn = () => {
    if (auctionType === "upcoming") {
      return (
        <div className="flex items-center gap-4 text-right justify-center">
          <div className="flex flex-col border-r border-gray-200 pr-4">
             <span className="text-[10px] text-gray-500">تاريخ فتح المزاد</span>
             <span className="text-xs font-bold text-brand-blue">19/2/2023</span>
          </div>
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-500">وقت فتح المزاد</span>
             <span className="text-xs font-bold text-brand-blue">01:45 pm</span>
          </div>
        </div>
      );
    }
    
    if (auctionType === "expired") {
      return (
        <div className="flex justify-center w-full min-w-[160px] px-2">
          <div className="bg-[#DE5E3A] text-white font-bold text-sm py-2 px-6 rounded-full w-full text-center shadow-sm">
            مزاد منتهي
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center text-brand-blue font-bold text-sm leading-none min-w-[120px]" dir="ltr">
        <div className="flex flex-col items-center"><span className="text-[8px] font-normal text-gray-500 mb-0.5">يوم</span><span>{formatNumber(days)}</span></div>
        <span className="mx-1">:</span>
        <div className="flex flex-col items-center"><span className="text-[8px] font-normal text-gray-500 mb-0.5">ساعة</span><span>{formatNumber(hours)}</span></div>
        <span className="mx-1">:</span>
        <div className="flex flex-col items-center"><span className="text-[8px] font-normal text-gray-500 mb-0.5">دقيقة</span><span>{formatNumber(minutes)}</span></div>
        <span className="mx-1">:</span>
        <div className="flex flex-col items-center"><span className="text-[8px] font-normal text-gray-500 mb-0.5">ثانية</span><span>{formatNumber(seconds)}</span></div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F9FAFB] pb-20 font-cairo w-full overflow-x-hidden">
      
      {/* Header Container */}
      <div className="w-full bg-[#F3F4F6] py-8 mb-6 border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          
          {/* Left: Logos */}
          <div className="flex items-center gap-6">
            <div className="bg-[#1D2153] p-2 rounded-lg flex items-center justify-center w-[140px] h-[70px]">
              <Image src={imageUrl} alt="Auction Image" width={120} height={60} className="object-contain mix-blend-screen" />
            </div>
            <div className="flex items-center justify-center">
              {/* Note: since we might not have an infath.png logo directly, we can use one of the logos from public that fits best, or a placeholder */}
              <Image src="/mazaya_Alfedhiyah.png" alt="Infath" width={100} height={50} className="object-contain" />
            </div>
          </div>

          {/* Right: Title & Asset Count */}
          <div className="flex flex-col items-end gap-2">
            <h1 className="text-3xl font-extrabold text-brand-blue">مزاد نفائس حريملاء</h1>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 font-bold text-lg">
                <span className="text-brand-orange">(71)</span>
                <span className="text-brand-blue">عدد الأصول</span>
                <div className="text-brand-gold">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 21H5a1 1 0 0 1-1-1v-9H3l9-9 9 9h-1v9a1 1 0 0 1-1 1zM7 19h10v-9.354l-5-5.625-5 5.625V19z"/>
                    <rect x="9" y="12" width="2" height="2" fill="white"/>
                    <rect x="13" y="12" width="2" height="2" fill="white"/>
                    <rect x="9" y="15" width="2" height="2" fill="white"/>
                    <rect x="13" y="15" width="2" height="2" fill="white"/>
                    <rect x="11" y="18" width="2" height="3" fill="white"/>
                  </svg>
                </div>
              </div>
              
              {auctionType === "active" && (
                <div className="flex items-center gap-2 font-bold text-brand-blue">
                  <span className="text-brand-orange" dir="ltr">+966501759844</span>
                  <span className="text-gray-500">رقم التواصل :</span>
                  <Phone size={18} className="text-brand-gold fill-current" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Action Bar */}
      <div className="w-full max-w-[1400px] px-4 flex justify-between items-center mb-6">
        
        {/* Left: Export Buttons */}
        <div className="flex items-center gap-4">
          {/* PDF Button */}
          <button className="relative w-10 h-12 bg-[#E53935] rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-900/30 rounded-bl-sm"></div>
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-t-white border-l-[12px] border-l-transparent"></div>
            <span className="text-white font-black text-[10px] mt-2">PDF</span>
          </button>
          
          {/* XLS Button */}
          <button className="relative w-10 h-12 bg-[#00703C] rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-4 h-4 bg-green-900/30 rounded-bl-sm"></div>
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-t-white border-l-[12px] border-l-transparent"></div>
            <span className="text-white font-black text-[10px] mt-2">XLS</span>
          </button>
        </div>

        {/* Right: View Toggle */}
        <div className="flex bg-[#F1F3F5] rounded-lg p-1 border border-gray-200">
          <button 
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-2 px-6 py-2 rounded-md font-bold transition-colors cursor-pointer ${viewMode === "map" ? "bg-[#1D2153] text-white shadow-sm" : "text-gray-500 hover:bg-white/50"}`}
          >
            <Map size={18} />
            <span>الخريطة</span>
          </button>
          <button 
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-6 py-2 rounded-md font-bold transition-colors cursor-pointer ${viewMode === "grid" ? "bg-[#1D2153] text-white shadow-sm" : "text-gray-500 hover:bg-white/50"}`}
          >
            <Grid size={18} />
            <span>البطاقات</span>
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-2 rounded-md font-bold transition-colors cursor-pointer ${viewMode === "list" ? "bg-[#1D2153] text-white shadow-sm" : "text-gray-500 hover:bg-white/50"}`}
          >
            <List size={18} />
            <span>القائمة</span>
          </button>
        </div>

      </div>

      {/* Content View */}
      {viewMode === "list" ? (
        <div className="w-full max-w-[1400px] px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-right" dir="rtl">
              <thead className="bg-[#F8F9FA] text-[#8C98A4] text-[13px] font-bold border-b border-gray-100">
                <tr>
                  {auctionType !== "expired" && (
                    <th className="py-4 px-6 font-medium whitespace-nowrap">انضم للمزاد</th>
                  )}
                  <th className="py-4 px-6 font-medium whitespace-nowrap">اسم العقار</th>
                  <th className="py-4 px-6 font-medium whitespace-nowrap text-center">سعر السوم الحالي</th>
                  <th className="py-4 px-6 font-medium whitespace-nowrap text-center">مساحة</th>
                  <th className="py-4 px-6 font-medium whitespace-nowrap text-center">عربون الدخول</th>
                  <th className="py-4 px-6 font-medium whitespace-nowrap text-center">عدد السومات</th>
                  <th className="py-4 px-6 font-medium whitespace-nowrap text-center">المؤقت</th>
                  <th className="py-4 px-6 font-medium whitespace-nowrap text-center">تفاصيل المزاد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    
                    {/* Join Button (Hidden for expired) */}
                    {auctionType !== "expired" && (
                      <td className="py-4 px-6 whitespace-nowrap">
                        <button className="bg-[#1E2B52] hover:bg-blue-900 text-white font-bold text-xs py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer">
                          <Plus size={14} strokeWidth={3} />
                          سجل في المزاد
                        </button>
                      </td>
                    )}

                    {/* Property Name & Thumbnail */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                          <Image src={row.image} alt="Property" layout="fill" objectFit="cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-blue text-sm">عمارة جديدة</span>
                          <span className="text-gray-400 text-[10px]">الرياض</span>
                        </div>
                      </div>
                    </td>

                    {/* Current Bid */}
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-baseline gap-1 text-brand-orange font-bold">
                          <span className="text-[10px]">ر.س</span>
                          <span>500,000,000</span>
                        </div>
                        <span className="text-gray-500 text-[10px]">(300 ر.س) للمتر</span>
                      </div>
                    </td>

                    {/* Area */}
                    <td className="py-4 px-6 whitespace-nowrap text-center font-bold text-gray-700 text-sm">
                      325.22 م²
                    </td>

                    {/* Deposit */}
                    <td className="py-4 px-6 whitespace-nowrap text-center font-bold text-gray-700 text-sm">
                      2,500 ر.س
                    </td>

                    {/* Bids Count */}
                    <td className="py-4 px-6 whitespace-nowrap text-center font-bold text-gray-600 text-sm">
                      ({auctionType === "upcoming" ? "0" : "12"}) مزايد
                    </td>

                    {/* Timer */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {renderTimerColumn()}
                    </td>

                    {/* Details Button */}
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <button className="bg-brand-gold hover:bg-yellow-500 text-white font-bold text-xs py-2 px-5 rounded-md transition-colors w-full cursor-pointer">
                        تفاصيل المزاد
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((row) => (
            <div key={row.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex gap-4 hover:shadow-md transition-shadow">
              {/* Image Side (Right) */}
              <div className="relative w-[140px] h-[160px] rounded-xl overflow-hidden shrink-0">
                <Image src={row.image} alt="Property" layout="fill" objectFit="cover" />
                
                {/* Top left badge */}
                <div className="absolute top-2 left-2 bg-white/90 p-1 rounded-md shadow-sm">
                  <Image src="/mazaya_Alfedhiyah.png" alt="Logo" width={24} height={12} className="object-contain" />
                </div>
                
                {/* Bottom location badge */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] bg-black/40 backdrop-blur-md text-white text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1">
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span className="truncate">حريملاء</span>
                </div>
              </div>

              {/* Content Side (Left) */}
              <div className="flex flex-col justify-between w-full py-1">
                
                {/* Header Row */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-brand-blue text-sm">قطعة ارض رقم 1</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="text-brand-gold font-bold">◱</span>
                      <span>325.22م²</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-brand-blue">سعر السوم الحالي</span>
                    <div className="flex items-baseline gap-1 text-brand-orange">
                      <span className="text-[10px] font-bold">ر.س</span>
                      <span className="font-bold text-sm">500,000,000</span>
                    </div>
                    <span className="text-gray-400 text-[9px]">(20 ر.س للمتر)</span>
                  </div>
                </div>

                {/* Dynamic Middle Section */}
                {auctionType === "expired" ? (
                  <div className="bg-[#DF5430] text-white font-bold text-[11px] py-2 px-4 rounded-full text-center w-full my-2 shadow-sm">
                    مزاد منتهي
                  </div>
                ) : auctionType === "upcoming" ? (
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2 my-2 border border-gray-100">
                     <div className="flex flex-col text-right border-l border-gray-200 pl-2 w-1/2">
                        <span className="text-[9px] text-gray-500">تاريخ فتح المزاد</span>
                        <span className="text-[11px] font-bold text-brand-blue">19/2/2023</span>
                     </div>
                     <div className="flex flex-col text-right w-1/2 pr-2">
                        <span className="text-[9px] text-gray-500">وقت فتح المزاد</span>
                        <span className="text-[11px] font-bold text-brand-blue">01:45 pm</span>
                     </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-brand-blue font-bold text-sm leading-none my-2 px-2" dir="ltr">
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">يوم</span><span>{formatNumber(days)}</span></div>
                    <span className="mx-1 text-gray-300 pb-2">:</span>
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">ساعة</span><span>{formatNumber(hours)}</span></div>
                    <span className="mx-1 text-gray-300 pb-2">:</span>
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">دقيقة</span><span>{formatNumber(minutes)}</span></div>
                    <span className="mx-1 text-gray-300 pb-2">:</span>
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">ثانية</span><span>{formatNumber(seconds)}</span></div>
                  </div>
                )}

                {/* Dynamic Bottom Row */}
                <div className="flex justify-between items-end mt-auto pt-2 border-t border-gray-50">
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-brand-blue">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span>عدد السومات</span>
                    </div>
                    <span className="text-brand-orange font-bold text-xs mr-4">{auctionType === "upcoming" ? "0" : "71"} مزايد</span>
                  </div>
                  
                  <button className="bg-brand-gold hover:bg-yellow-500 text-white font-bold text-[11px] py-2.5 px-6 rounded-md transition-colors shrink-0 cursor-pointer">
                    تفاصيل المزاد
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-[1400px] px-4 flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar: Details */}
          <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-4">
            
            {/* Property Card (Same as Grid View but single) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex gap-4">
              {/* Image Side (Right) */}
              <div className="relative w-[130px] h-[150px] rounded-xl overflow-hidden shrink-0">
                <Image src={rows[0].image} alt="Property" layout="fill" objectFit="cover" />
                <div className="absolute top-2 left-2 bg-white/90 p-1 rounded-md shadow-sm">
                  <Image src="/mazaya_Alfedhiyah.png" alt="Logo" width={24} height={12} className="object-contain" />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] bg-black/40 backdrop-blur-md text-white text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1">
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span className="truncate">حريملاء</span>
                </div>
              </div>

              {/* Content Side (Left) */}
              <div className="flex flex-col justify-between w-full py-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-brand-blue text-sm text-right">قطعة ارض رقم 1</h4>
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                      <span>325.22م²</span>
                      <span className="text-brand-gold font-bold">◱</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-brand-blue">سعر السوم الحالي</span>
                    <div className="flex items-baseline gap-1 text-brand-orange">
                      <span className="text-[10px] font-bold">ر.س</span>
                      <span className="font-bold text-sm">500,000,000</span>
                    </div>
                    <span className="text-gray-400 text-[9px]">(20 ر.س للمتر)</span>
                  </div>
                </div>

                {auctionType === "expired" ? (
                  <div className="bg-[#DF5430] text-white font-bold text-[11px] py-2 px-4 rounded-full text-center w-full my-2 shadow-sm">
                    مزاد منتهي
                  </div>
                ) : auctionType === "upcoming" ? (
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2 my-2 border border-gray-100">
                     <div className="flex flex-col text-right border-l border-gray-200 pl-2 w-1/2">
                        <span className="text-[9px] text-gray-500">تاريخ فتح المزاد</span>
                        <span className="text-[11px] font-bold text-brand-blue">19/2/2023</span>
                     </div>
                     <div className="flex flex-col text-right w-1/2 pr-2">
                        <span className="text-[9px] text-gray-500">وقت فتح المزاد</span>
                        <span className="text-[11px] font-bold text-brand-blue">01:45 pm</span>
                     </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-brand-blue font-bold text-sm leading-none my-2 px-2" dir="ltr">
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">يوم</span><span>{formatNumber(days)}</span></div>
                    <span className="mx-1 text-gray-300 pb-2">:</span>
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">ساعة</span><span>{formatNumber(hours)}</span></div>
                    <span className="mx-1 text-gray-300 pb-2">:</span>
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">دقيقة</span><span>{formatNumber(minutes)}</span></div>
                    <span className="mx-1 text-gray-300 pb-2">:</span>
                    <div className="flex flex-col items-center"><span className="text-[9px] font-normal text-gray-500 mb-1">ثانية</span><span>{formatNumber(seconds)}</span></div>
                  </div>
                )}

                <div className="flex justify-between items-end mt-auto pt-2 border-t border-gray-50">
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-brand-blue">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span>عدد السومات</span>
                    </div>
                    <span className="text-brand-orange font-bold text-xs mr-4">{auctionType === "upcoming" ? "0" : "71"} مزايد</span>
                  </div>
                  <button className="bg-brand-gold hover:bg-yellow-500 text-white font-bold text-[11px] py-2.5 px-6 rounded-md transition-colors shrink-0">
                    تفاصيل المزاد
                  </button>
                </div>
              </div>
            </div>

            {/* Property Details Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
              <div className="flex flex-col items-end gap-1">
                <h3 className="text-xl font-bold text-brand-blue">التفاصيل</h3>
                <div className="w-8 h-1 bg-brand-orange rounded-full"></div>
              </div>
              
              <p className="text-right text-gray-600 text-sm leading-relaxed font-medium">
                فيلا فاخرة في حي الزهور، الرياض. تصميم عصري ومرافق متطورة. حديقة خلابة ومسبح خاص، مؤجرة بقيمة 40 ألف ريال سنوياً، وانتهاء عقد الإيجار في تاريخ 14 نوفمبر 2023م. فرصة للاستثمار في فيلا فاخرة وتحقيق عائد استثماري، احجز الآن قبل انتهاء العقد.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { label: "نوع العقار", value: "فيلا سكنية جديدة" },
                  { label: "المدينة", value: "الرياض" },
                  { label: "الحي", value: "حي النسيم الغربي" },
                  { label: "شمالا", value: "فيلا رقم 8 بطول 320 م" },
                  { label: "جنوبا", value: "فيلا رقم 8 بطول 320 م" },
                  { label: "شرقا", value: "فيلا رقم 8 بطول 320 م" },
                  { label: "غربا", value: "رصيف حديقة بطول 320 م" },
                  { label: "اسم الشارع", value: "شارع الاخلاص" },
                  { label: "رقم الصك", value: "322343543563" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="bg-gray-200 rounded-md py-2.5 px-4 flex-1 text-center text-brand-blue font-bold text-xs border border-gray-50">
                      {item.value}
                    </div>
                    <span className="text-brand-blue font-bold text-sm w-[80px] text-right shrink-0">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Main Section: Map Image */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[600px]">
            <Image src="/mapAdjust.png" alt="Map View" layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-700" />
          </div>

        </div>
      )}

      {/* Pagination */}
      {viewMode!="map" && <div className="mt-12 flex justify-between items-center w-full max-w-[800px] px-4">
        <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-bold text-sm cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          التالي
        </button>
        
        <div className="flex gap-2 items-center text-sm" dir="ltr">
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#FFF4ED] text-brand-orange font-bold cursor-pointer">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 font-bold cursor-pointer">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 font-bold cursor-pointer">3</button>
          <span className="w-6 flex items-center justify-center text-gray-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 font-bold cursor-pointer">8</button>
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 font-bold cursor-pointer">9</button>
          <button className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 font-bold cursor-pointer">10</button>
        </div>

        <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-bold text-sm cursor-pointer">
          السابق
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
}
      
    </div>
  );
}
