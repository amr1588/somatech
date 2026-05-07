"use client";

import { useState } from "react";
import { 
  FileText, 
  Download,
  ChevronDown,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import Image from "next/image";
import InfathLogo from "@/components/InfathLogo";

const stats = [
  { label: "مزادات جارية", value: "36" },
  { label: "مزادات مغلقة", value: "12" },
  { label: "مزادات بانتظار التعيين", value: "14" },
  { label: "مزادات بانتظار الموافقة", value: "17" },
  { label: "اجمالي عدد المزادات", value: "120" },
];

const auctions = [
  { id: 1, name: "عقار انفاذ", startDate: "2023-03-24", endDate: "2023-03-24", status: "مرفوض", statusColor: "text-red-500 bg-red-50", assets: 12, chairman: "عقار انفاذ" },
  { id: 2, name: "الاخلاص", startDate: "2023-03-24", endDate: "2023-03-24", status: "تم الموافقة", statusColor: "text-green-500 bg-green-50", assets: 43, chairman: "الاخلاص" },
  { id: 3, name: "العجوزة", startDate: "2023-03-24", endDate: "2023-03-24", status: "تم انتهاء المزاد", statusColor: "text-blue-600 bg-blue-50", assets: 22, chairman: "العجوزة" },
  { id: 4, name: "الصفا", startDate: "2023-03-24", endDate: "2023-03-24", status: "تم الموافقة", statusColor: "text-green-500 bg-green-50", assets: 85, chairman: "الصفا" },
];

export default function InfathDashboard() {
  const [activeTab, setActiveTab] = useState("project-manager");

  return (
    <div className="flex flex-col gap-2 p-4 h-full overflow-hidden" dir="rtl">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0A1629] h-28 flex items-center px-10 text-white shrink-0">
        {/* Background Patterns (Wavy lines) */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,100 Q250,50 500,100 T1000,100" fill="none" stroke="white" strokeWidth="1" />
            <path d="M0,130 Q250,80 500,130 T1000,130" fill="none" stroke="white" strokeWidth="1" />
            <path d="M0,160 Q250,110 500,160 T1000,160" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 flex w-full justify-between items-center">
          <div className="flex gap-4 items-center mb-6">
             <div className="bg-white p-1.5 px-3 rounded-full flex items-center justify-center shadow-sm">
               <Image 
                src="/hawyia_auctions.png" 
                alt="Hawyia Auctions" 
                width={70} 
                height={24} 
                className="object-contain"
              />
            </div>
            <div className="bg-white p-1.5 px-3 rounded-full flex items-center justify-center shadow-sm">
              <InfathLogo width={60} height={22} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-6">اهلا وسهلاً</h1>
        </div>
      </div>

      {/* Stats Cards Row (Overlapping) */}
      <div className="relative -mt-8 mx-10 shrink-0">
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-gray-50 flex p-4 divide-x divide-x-reverse divide-gray-100">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 px-2 text-center first:pr-0 last:pl-0">
              <p className="text-[10px] text-gray-400 mb-1 font-medium">{stat.label}</p>
              <p className="text-xl font-black text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="mt-2 flex justify-center shrink-0" dir="ltr">
        <div className="bg-gray-50/80 p-1 rounded-full flex items-center gap-1 border border-gray-100">
           <button 
             onClick={() => setActiveTab("committee-secretary")}
             className={`px-8 py-3 rounded-full text-xs font-bold transition-all ${
               activeTab === "committee-secretary" 
               ? "bg-[#E85D2A] text-white shadow-lg shadow-orange-200" 
               : "text-gray-500 hover:text-gray-700"
             }`}
           >
             امين اللجنة
           </button>
           <button 
             onClick={() => setActiveTab("committee-chairman")}
             className={`px-8 py-3 rounded-full text-xs font-bold transition-all ${
               activeTab === "committee-chairman" 
               ? "bg-[#E85D2A] text-white shadow-lg shadow-orange-200" 
               : "text-gray-500 hover:text-gray-700"
             }`}
           >
             رئيس اللجنة
           </button>
           <button 
             onClick={() => setActiveTab("project-manager")}
             className={`px-10 py-3 rounded-full text-xs font-bold transition-all ${
               activeTab === "project-manager" 
               ? "bg-[#E85D2A] text-white shadow-lg shadow-orange-200" 
               : "text-gray-500 hover:text-gray-700"
             }`}
           >
             مدير مشروع
           </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-2 bg-white rounded-2xl shadow-sm border border-gray-50 p-5 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex justify-between items-center mb-4 shrink-0" dir="ltr">
          <div className="flex gap-2" dir="ltr">
            <button className="w-12 h-12 rounded-lg bg-green-600/10 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all border border-green-600/20">
               <span className="text-[12px] font-black uppercase">xls</span>
            </button>
            <button className="w-12 h-12 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-red-600/20">
               <span className="text-[12px] font-black uppercase">pdf</span>
            </button>
          </div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2" dir="rtl">
            اخر المزادات <span className="text-orange-500 text-mdd">(23)</span>
          </h2>
        </div>

        <div className="flex-1 overflow-auto scrollbar-hide">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-right border-b border-gray-100">
                <th className="pb-3 font-bold text-gray-400 text-[15px] px-2">المزادات</th>
                <th className="pb-3 font-bold text-gray-400 text-[15px] px-2">تاريخ بداية المزاد</th>
                <th className="pb-3 font-bold text-gray-400 text-[15px] px-2">تاريخ نهاية المزاد</th>
                <th className="pb-3 font-bold text-gray-400 text-[15px] px-2 text-center">الحالة</th>
                <th className="pb-3 font-bold text-gray-400 text-[15px] px-2 text-center">عدد الاصول</th>
                <th className="pb-3 font-bold text-gray-400 text-[15px] px-2 text-center">رئيس اللجنة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {auctions.map((auction) => (
                <tr key={auction.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-3 px-2 font-bold text-gray-800 text-[14px]">{auction.name}</td>
                  <td className="py-3 px-2 text-gray-500 font-mono text-[14px]">{auction.startDate}</td>
                  <td className="py-3 px-2 text-gray-500 font-mono text-[14px]">{auction.endDate}</td>
                  <td className="py-3 px-2">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-[14px] font-bold flex items-center gap-1.5 ${auction.statusColor}`}>
                        <div className={`w-1 h-1 rounded-full ${auction.statusColor.split(' ')[0].replace('text', 'bg')}`}></div>
                        {auction.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-bold text-gray-700 text-[14px]">{auction.assets}</td>
                  <td className="py-3 px-2 text-center font-bold text-gray-700 text-[14px]">{auction.chairman}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
