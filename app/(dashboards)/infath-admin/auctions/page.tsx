"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  ChevronDown, 
  Gavel, 
  ChevronRight, 
  ChevronLeft, 
  Filter,
  Eye,
  Calendar,
  Clock,
  MapPin,
  X,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import Image from "next/image";
import InfathLogo from "@/components/InfathLogo";

interface Auction {
  id: string;
  title: string;
  status: "approved" | "ended" | "rejected";
  price: string;
  deposit: string;
  biddingPrice: string;
  commission: string;
  image: string;
}

const initialAuctions: Auction[] = [
  { id: "#30944266", title: "فيلا حي النسيم", status: "approved", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "16,540", commission: "576", image: "/tower-buildings.png" },
  { id: "#30944266", title: "أرض القادسية", status: "approved", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "16,540", commission: "576", image: "/house.png" },
  { id: "#30944266", title: "أرض القادسية", status: "approved", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "16,540", commission: "576", image: "/house.png" },
  { id: "#30944266", title: "أرض القادسية", status: "approved", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "16,540", commission: "576", image: "/house.png" },
  { id: "#30944266", title: "أرض القادسية", status: "approved", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "16,540", commission: "576", image: "/house.png" },
  { id: "#30944266", title: "محل تجاري", status: "approved", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "25,467.00", commission: "576", image: "/tower-buildings.png" },
  { id: "#30944266", title: "أرض القادسية 2", status: "ended", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "25,467.00", commission: "576", image: "/house.png" },
  { id: "#30944266", title: "أرض الشمال", status: "ended", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "25,467.00", commission: "576", image: "/house.png" },
  { id: "#30944266", title: "أرض الديرة", status: "ended", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "25,467.00", commission: "576", image: "/house.png" },
  { id: "#30944266", title: "عمارة الديرة", status: "rejected", price: "86,742.62 ر.س", deposit: "25,467.00", biddingPrice: "25,467.00", commission: "576", image: "/house.png" },
];

export default function AuctionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: "06", hours: "14", mins: "12", secs: "40" });

  useEffect(() => {
    if (!isDetailModalOpen || selectedAuction?.status === 'ended' || selectedAuction?.status === 'rejected') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let s = parseInt(prev.secs);
        let m = parseInt(prev.mins);
        let h = parseInt(prev.hours);
        let d = parseInt(prev.days);

        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { clearInterval(timer); return prev; }

        return {
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          mins: m.toString().padStart(2, '0'),
          secs: s.toString().padStart(2, '0')
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDetailModalOpen, selectedAuction]);

  const getStatusBadge = (status: Auction["status"]) => {
    switch (status) {
      case "approved":
        return <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>تم الموافقة</span>;
      case "ended":
        return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>تم انتهاء المزاد</span>;
      case "rejected":
        return <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div>مرفوض</span>;
    }
  };

  return (
    <div className="p-8 flex flex-col h-full min-h-0 bg-white">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-end gap-2 text-sm mb-8" dir="rtl">
        <span className="text-gray-400">الرئيسية</span>
        <ChevronLeft size={14} className="text-gray-300" />
        <span className="text-brand-blue font-bold">قائمة المزادات</span>
        <ChevronLeft size={14} className="text-gray-300" />
        <span className="text-gray-400">فيلا حي الروضة</span>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-10" dir="rtl">
        {/* Filters */}
        <div className="col-span-7 grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">امناء اللجنة</label>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 text-sm cursor-pointer hover:bg-white transition-all">
              <ChevronDown size={18} />
              <span>امناء اللجنة</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">مدير المشروع</label>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 text-sm cursor-pointer hover:bg-white transition-all">
              <ChevronDown size={18} />
              <span>مدير المشروع</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">رئيس اللجنة</label>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 text-sm cursor-pointer hover:bg-white transition-all">
              <ChevronDown size={18} />
              <span>رئيس اللجنة</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">حالة المزاد</label>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 text-sm cursor-pointer hover:bg-white transition-all">
              <ChevronDown size={18} />
              <span>كل المزادات</span>
            </div>
          </div>
        </div>

        {/* Featured Banner */}
        <div className="col-span-5 relative rounded-3xl overflow-hidden h-44 shadow-lg group">
          <Image 
            src="/mazad_wagha_shark_ryad.png" 
            alt="Auction Banner" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Header Row */}
      <div className="flex justify-end items-center mb-6" dir="rtl">
        <h2 className="text-xl font-bold text-gray-800">كل المزادات <span className="text-orange-500">(347)</span></h2>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 overflow-auto bg-[#F8F9FB] rounded-3xl p-6">
        <table className="w-full border-separate border-spacing-y-3" dir="rtl">
          <thead>
            <tr className="text-right text-gray-400 text-[10px] uppercase tracking-wider">
              <th className="pb-2 font-bold px-4">رقم الصك</th>
              <th className="pb-2 font-bold text-center">الحالة</th>
              <th className="pb-2 font-bold text-center">سعر السوم</th>
              <th className="pb-2 font-bold text-center">الترسية</th>
              <th className="pb-2 font-bold text-center">سعر الاختبار</th>
              <th className="pb-2 font-bold text-center">سعر فوق السوم</th>
              <th className="pb-2 font-bold text-center">قيمة التصنيف</th>
            </tr>
          </thead>
          <tbody className="">
            {initialAuctions.map((auction, idx) => (
              <tr 
                key={idx} 
                onClick={() => {
                  setSelectedAuction(auction);
                  setIsDetailModalOpen(true);
                }}
                className="hover:bg-white transition-all cursor-pointer group rounded-2xl"
              >
                <td className="py-2 px-4 bg-white rounded-r-2xl border-y border-r border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-100 flex-shrink-0">
                      <Image src={auction.image} alt="Prop" fill className="object-cover" />
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-bold text-gray-900 leading-tight">{auction.id}</div>
                      <div className="text-[9px] text-gray-400 leading-tight">{auction.title}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2 text-center bg-white border-y border-gray-50">
                  <div className="flex justify-center">{getStatusBadge(auction.status)}</div>
                </td>
                <td className="py-2 text-center bg-white border-y border-gray-50">
                  <span className="text-[11px] font-bold text-brand-blue">{auction.price}</span>
                </td>
                <td className="py-2 text-center bg-white border-y border-gray-50">
                  <div className="flex justify-center px-2">
                    <button className={`w-full py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 border transition-all ${
                      auction.status === 'rejected' 
                        ? 'bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-100' 
                        : 'bg-orange-50 text-orange-500 border-orange-100 hover:bg-orange-100'
                    }`}>
                      <Gavel size={12} />
                      {auction.status === 'rejected' ? 'رفض الترسية' : 'تم الترسية'}
                    </button>
                  </div>
                </td>
                <td className="py-2 text-center bg-white border-y border-gray-50">
                  <div className="bg-[#F8F9FB] rounded-lg py-1.5 px-4 inline-block text-[11px] font-bold text-gray-800 border border-gray-100 min-w-[80px]">
                    {auction.deposit}
                  </div>
                </td>
                <td className="py-2 text-center bg-white border-y border-gray-50">
                  <div className="bg-[#F8F9FB] rounded-lg py-1.5 px-4 inline-block text-[11px] font-bold text-gray-800 border border-gray-100 min-w-[80px]">
                    {auction.biddingPrice}
                  </div>
                </td>
                <td className="py-2 text-center bg-white rounded-l-2xl border-y border-l border-gray-50">
                  <div className="bg-[#F8F9FB] rounded-lg py-1.5 px-4 inline-block text-[11px] font-bold text-gray-800 border border-gray-100 min-w-[60px]">
                    {auction.commission}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-auto pt-6 flex justify-between items-center" dir="ltr">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors group cursor-pointer">
          <ChevronLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>السابق</span>
        </button>

        <div className="flex items-center gap-1">
          <span className="w-9 h-9 flex items-center justify-center bg-orange-50 text-orange-600 rounded-lg font-bold text-sm shadow-sm border border-orange-100">1</span>
          {[2, 3, '...', 8, 9, 10].map((n, i) => (
            <span key={i} className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 cursor-pointer hover:text-gray-800 transition-colors">
              {n}
            </span>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors group cursor-pointer">
          <span>التالي</span>
          <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Details Modal */}
      {isDetailModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)}></div>
          
          <div className="relative bg-[#F8F9FB] rounded-r-[24px] rounded-l-none shadow-2xl w-full max-w-6xl h-full max-h-[95%] overflow-y-auto animate-in fade-in zoom-in duration-300 scrollbar-hide">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#F8F9FB]/90 backdrop-blur-md px-10 py-6 flex justify-between items-center border-b border-gray-100 rounded-tr-[24px] rounded-tl-none">
              <div className="text-right">
                <h2 className="text-2xl font-bold text-brand-blue">فيلا حي الروضة</h2>
                <p className="text-gray-400 text-sm flex items-center justify-end gap-1">
                   الدمام - عتيقة <MapPin size={14} />
                </p>
              </div>
              <div className="flex items-center gap-8">
                 <div className="text-right">
                   <p className="text-brand-blue font-bold text-lg">سعر السوم الحالي</p>
                   <p className="text-orange-500 font-bold text-xl">500,000,000 ر.س</p>
                 </div>
                 <button onClick={() => setIsDetailModalOpen(false)} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-gray-800 transition-all">
                   <X size={20} />
                 </button>
              </div>
            </div>

            <div className="p-10">
              <div className="flex gap-10 items-start" dir="ltr">
                {/* Property Image (Left in Design, Right in RTL flow if not handled) */}
                <div className="w-[45%] flex-shrink-0">
                   <div className="relative rounded-[16px] overflow-hidden aspect-[4/3] shadow-2xl group bg-white">
                      {selectedAuction && (
                        <Image src={selectedAuction.image} alt={selectedAuction.title} fill className="object-cover" />
                      )}
                      {/* Infath Logo Overlay */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm flex items-center justify-center">
                         <InfathLogo width={40} height={25} />
                      </div>
                      {/* Navigation Arrows */}
                      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-800"><ChevronRightIcon size={24} /></button>
                         <button className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-800"><ChevronLeftIcon size={24} /></button>
                      </div>
                      {/* Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                         {[1,2,3,4,5].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i===1 ? 'bg-orange-500 w-4' : 'bg-white/50'}`}></div>)}
                      </div>
                   </div>
                </div>

                {/* Info and Timer (Left in RTL flow) */}
                <div className="flex-1 flex flex-col gap-8">
                   {/* Countdown or Ended/Rejected Status Section */}
                   <div className="flex flex-col items-end">
                      <div className="relative mb-6">
                        <p className="text-gray-900 font-bold text-lg">
                          {selectedAuction?.status === 'ended' ? 'مزاد منتهي' : 
                           selectedAuction?.status === 'rejected' ? 'مرفوض' : 'سيبدأ في خلال'}
                        </p>
                        <div className={`absolute -bottom-1 right-0 w-1/3 h-1 ${
                          selectedAuction?.status === 'ended' ? 'bg-orange-500' : 
                          selectedAuction?.status === 'rejected' ? 'bg-red-500' : 'bg-emerald-500'
                        }`}></div>
                      </div>
                      
                      {selectedAuction?.status === 'ended' || selectedAuction?.status === 'rejected' ? (
                        <div className={`rounded-[16px] p-10 w-full flex justify-center border shadow-sm ${
                          selectedAuction?.status === 'ended' ? 'bg-orange-50 border-orange-100' : 'bg-red-50 border-red-100'
                        }`}>
                           <span className={`${selectedAuction?.status === 'ended' ? 'text-orange-600' : 'text-red-600'} font-bold text-xl`}>
                             {selectedAuction?.status === 'ended' ? 'مزاد منتهي' : 'مرفوض'}
                           </span>
                        </div>
                      ) : (
                        <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 w-full flex justify-center">
                          <div className="flex items-center gap-6" dir="ltr">
                             {[
                               { label: "ثانية", val: timeLeft.secs },
                               { label: "دقيقة", val: timeLeft.mins },
                               { label: "ساعة", val: timeLeft.hours },
                               { label: "يوم", val: timeLeft.days }
                             ].map((item, i) => (
                               <div key={i} className="flex items-center gap-6">
                                 <div className="flex flex-col items-center">
                                   <div className="text-3xl font-bold text-brand-blue mb-1">{item.val}</div>
                                   <div className="text-gray-400 text-[10px]">{item.label}</div>
                                 </div>
                                 {i < 3 && <div className="text-gray-300 font-light text-2xl mb-4">:</div>}
                               </div>
                             ))}
                          </div>
                        </div>
                      )}
                   </div>
                </div>
              </div>

              {/* Accordion Container (Full Width Below) */}
              <div className="mt-10 space-y-6" dir="rtl">
                 {/* Details Accordion */}
                 <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
                    <div className="px-10 py-7 flex justify-between items-center border-b border-gray-50">
                       <div className="relative flex-1 text-right">
                          <h3 className="font-bold text-gray-900 text-lg">
                             التفا<span className="relative">صيل<div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500"></div></span>
                          </h3>
                       </div>
                       <ChevronDown size={22} className="text-gray-400 cursor-pointer hover:text-gray-800 transition-colors" />
                    </div>
                    <div className="p-10 grid grid-cols-2 gap-x-16 gap-y-8">
                       {[
                         { label: "نوع العقار", val: "فيلا سكنية جديدة" },
                         { label: "نوع الصفقة", val: "للبيع" },
                         { label: "المدينة", val: "الرياض" },
                         { label: "الحي", val: "حي النسيم الغربي" },
                         { label: "شمالاً", val: "فيلا رقم 8 بطول 320 م" },
                         { label: "جنوباً", val: "فيلا رقم 8 بطول 320 م" },
                         { label: "شرقاً", val: "رصيف حديقة بطول 320 م" },
                         { label: "غرباً", val: "فيلا رقم 2 بطول 653 م" },
                         { label: "مساحة العقار", val: "3420 متر مربع" },
                         { label: "رقم الصك", val: "320 443 543 563" },
                         { label: "هل يوجد جراج", val: "لا يوجد" },
                         { label: "هل يوجد مكيف", val: "لا يوجد" },
                         { label: "عدد دورات المياه", val: "فيلا رقم 8 بطول 320 م" },
                         { label: "اسم الشارع", val: "شارع الاخلاص" }
                       ].map((detail, i) => (
                         <div key={i} className="flex justify-between items-center group">
                           <span className="text-gray-900 font-bold text-sm order-1">{detail.label}</span>
                           <div className="bg-[#F8F9FB] rounded-xl px-6 py-3.5 min-w-[220px] text-right border border-gray-50 shadow-sm group-hover:bg-white group-hover:border-orange-100 transition-all">
                              <span className="text-gray-600 text-xs font-bold">{detail.val}</span>
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Movement Accordion */}
                 <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
                    <div className="px-10 py-7 flex justify-between items-center">
                       <div className="relative flex-1 text-right">
                          <h3 className="font-bold text-gray-900 text-lg">
                             حركة <span className="relative">المزاد<div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500"></div></span>
                          </h3>
                       </div>
                       <ChevronDown size={22} className="text-gray-400 cursor-pointer hover:text-gray-800 transition-colors" />
                    </div>
                 </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-10 flex justify-between items-center bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm" dir="ltr">
                 <div className="flex items-center gap-4 order-last">
                    <span className="text-gray-900 font-bold text-lg">اعلي المزايدين <span className="text-orange-500 font-bold ml-1">(3)</span></span>
                 </div>
                 <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-200 hover:scale-110 transition-all cursor-pointer">
                       <span className="text-xs font-bold">PDF</span>
                    </button>
                    <button className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-200 hover:scale-110 transition-all cursor-pointer">
                       <span className="text-xs font-bold">XLS</span>
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
