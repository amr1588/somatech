"use client";

import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  MapPin,
  X,
  Pencil,
  Gavel,
  XCircle,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import Image from "next/image";
import AssetDetailModal from "./AssetDetailModal";

interface Auction {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: "approved" | "ended" | "rejected";
  assetCount: number;
  chairman: string;
}

const initialAuctions: Auction[] = [
  { id: "1", title: "عقار انفاذ", startDate: "2023-03-24", endDate: "2023-03-24", status: "rejected", assetCount: 12, chairman: "عقار انفاذ" },
  { id: "2", title: "الاخلاص", startDate: "2023-03-24", endDate: "2023-03-24", status: "approved", assetCount: 43, chairman: "عقار انفاذ" },
  { id: "3", title: "العجوزة", startDate: "2023-03-24", endDate: "2023-03-24", status: "ended", assetCount: 22, chairman: "عقار انفاذ" },
  { id: "4", title: "الصفا", startDate: "2023-03-24", endDate: "2023-03-24", status: "approved", assetCount: 85, chairman: "عقار انفاذ" },
  { id: "5", title: "الصفا", startDate: "2023-03-24", endDate: "2023-03-24", status: "approved", assetCount: 85, chairman: "عقار انفاذ" },
  { id: "6", title: "الصفا", startDate: "2023-03-24", endDate: "2023-03-24", status: "approved", assetCount: 85, chairman: "عقار انفاذ" },
  { id: "7", title: "المروة", startDate: "2023-03-24", endDate: "2023-03-24", status: "approved", assetCount: 11, chairman: "عقار انفاذ" },
];

export default function ProjectManagerView() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [selectedAssetTitle, setSelectedAssetTitle] = useState("");
  const [selectedAssetImage, setSelectedAssetImage] = useState("/mazayaGarden.jpg");
  const [awardingStatuses, setAwardingStatuses] = useState<(null | "awarded" | "rejected")[]>(Array(12).fill(null));
  const [activeRowIdx, setActiveRowIdx] = useState<number | null>(null);

  const getStatusBadge = (status: Auction["status"]) => {
    switch (status) {
      case "approved":
        return <span className="bg-[#E7F7F0] text-[#00A962] px-3 py-1 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 min-w-[100px]"><div className="w-1.5 h-1.5 rounded-full bg-[#00A962]"></div>تم الموافقة</span>;
      case "ended":
        return <span className="bg-[#F2F4F7] text-[#667085] px-3 py-1 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 min-w-[100px]"><div className="w-1.5 h-1.5 rounded-full bg-[#667085]"></div>تم انتهاء المزاد</span>;
      case "rejected":
        return <span className="bg-[#FFF0F0] text-[#E02D3C] px-3 py-1 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 min-w-[100px]"><div className="w-1.5 h-1.5 rounded-full bg-[#E02D3C]"></div>مرفوض</span>;
    }
  };

  if (view === "detail") {
    return (
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden" dir="rtl">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-start gap-2 text-[13px] mb-4 font-bold shrink-0">
        <span className="text-gray-400 cursor-pointer" onClick={() => setView("list")}>الرئيسية</span>
        <ChevronLeft size={14} className="text-gray-300" />
        <span className="text-gray-400 cursor-pointer" onClick={() => setView("list")}>قائمة المزادات</span>
        <ChevronLeft size={14} className="text-gray-300" />
        <span className="text-blue-500 underline">{selectedAuction?.title || "فيلا حي الروضة"}</span>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-4 shrink-0" dir="ltr">
          <div className="col-span-8 grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-gray-700 text-right me-2">امناء اللجنة</label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8F9FB] border border-gray-100 rounded-xl text-gray-400 text-[13px] cursor-pointer hover:bg-white transition-all">
                <ChevronDown size={16} />
                <span>امناء اللجنة</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-gray-700 text-right me-2">مدير المشروع</label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8F9FB] border border-gray-100 rounded-xl text-gray-400 text-[13px] cursor-pointer hover:bg-white transition-all">
                <ChevronDown size={16} />
                <span>مدير المشروع</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-gray-700 text-right me-2">رئيس اللجنة</label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8F9FB] border border-gray-100 rounded-xl text-gray-400 text-[13px] cursor-pointer hover:bg-white transition-all">
                <ChevronDown size={16} />
                <span>رئيس اللجنة</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-gray-700 text-right me-2">حالة المزاد</label>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F8F9FB] border border-gray-100 rounded-xl text-gray-700 text-[13px] cursor-pointer hover:bg-white transition-all">
                <ChevronDown size={16} />
                <span>تم التوثيق بانتظار الموافقة</span>
              </div>
            </div>
          </div>

        <div className="col-span-4 relative rounded-2xl overflow-hidden h-28 shadow-sm border border-gray-50">
          <Image 
            src="/mazad_wagha_shark_ryad.png" 
            alt="Auction Banner" 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-2 flex justify-start items-center shrink-0">
        <h2 className="text-[17px] font-black text-gray-800">تم التوثيق بانتظار الموافقة <span className="text-orange-500">(22)</span></h2>
      </div>

        <div className="flex-1 min-h-0 overflow-auto bg-[#F8F9FB] rounded-[24px] px-5 pb-5 scrollbar-hide border border-gray-100/50">
          <table className="w-full border-separate border-spacing-y-2">
            <thead className="sticky top-0 z-10">
              <tr className="text-right text-gray-400 text-[13px] font-bold uppercase">
                <th className="pt-5 pb-3 px-6 text-right sticky top-0 bg-[#F8F9FB] z-10">رقم الصك</th>
                <th className="pt-5 pb-3 text-center sticky top-0 bg-[#F8F9FB] z-10">الحالة</th>
                <th className="pt-5 pb-3 text-center sticky top-0 bg-[#F8F9FB] z-10">سعر السوم</th>
                <th className="pt-5 pb-3 text-center sticky top-0 bg-[#F8F9FB] z-10">الترسية</th>
                <th className="pt-5 pb-3 text-center px-6 sticky top-0 bg-[#F8F9FB] z-10">تعديل</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(12)].map((_, idx) => {
                const title = idx % 2 === 0 ? "فيلا حي الروضة" : "فيلا حي النسيم";
                const assetImage = idx % 2 === 0 ? "/mazayaGarden.jpg" : "/mazayaTower.jpg";
                
                return (
                  <tr key={idx} className="hover:bg-white transition-all group">
                    <td className="py-2.5 px-6 bg-white rounded-r-2xl border-y border-r border-gray-50/50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 relative shadow-sm">
                           <Image src={assetImage} alt="Property" fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-gray-800">#30944266</div>
                          <div className="text-[11px] text-gray-400">{title}</div>
                        </div>
                      </div>
                    </td>
                  <td className="py-2.5 text-center bg-white border-y border-gray-50/50 shadow-sm">
                    <div className="flex justify-center">{getStatusBadge(idx < 6 ? "approved" : idx < 9 ? "ended" : "rejected")}</div>
                  </td>
                  <td className="py-2.5 text-center bg-white border-y border-gray-50/50 shadow-sm text-[14px] font-bold text-gray-800">
                    86.742.62 ر.س
                  </td>
                  <td className="py-2.5 text-center bg-white border-y border-gray-50/50 shadow-sm px-4">
                    <div className="flex justify-center items-center gap-4">
                      {awardingStatuses[idx] === "awarded" ? (
                        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-50 text-orange-500 rounded-lg border border-orange-100 text-[12px] font-bold hover:bg-orange-100 transition-all">
                          <Gavel size={14} />
                          تم الترسية
                        </button>
                      ) : awardingStatuses[idx] === "rejected" ? (
                        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FFF0F0] text-[#E02D3C] rounded-lg border border-rose-100 text-[12px] font-bold hover:bg-rose-100 transition-all">
                          <XCircle size={14} />
                          رفض الترسية
                        </button>
                      ) : (
                        <div 
                          className="flex items-center gap-3 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors p-2"
                          onClick={(e) => {
                            setSelectedAssetTitle(title);
                            setSelectedAssetImage(assetImage);
                            setIsAssetModalOpen(true);
                            setActiveRowIdx(idx);
                          }}
                        >
                           <X size={18} />
                           <Gavel size={18} />
                        </div>
                      )}
                    </div>
                  </td>
                    <td className="py-2.5 px-6 text-center bg-white rounded-l-2xl border-y border-l border-gray-50/50 shadow-sm">
                      <button 
                        className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAssetTitle(title);
                          setSelectedAssetImage(assetImage);
                          setIsAssetModalOpen(true);
                          setActiveRowIdx(idx);
                        }}
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between shrink-0 px-2">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl border border-gray-100/50 text-[13px] font-bold text-gray-800 hover:bg-[#F8F9FB] transition-all shadow-sm group">
            <ChevronRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
            التالي
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-50 text-orange-600 text-[13px] font-bold cursor-pointer border border-orange-100 shadow-sm">1</div>
            {[2, 3, "...", 8, 9, 10].map((page, i) => (
              <div key={i} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 text-[13px] font-medium cursor-pointer hover:bg-[#F8F9FB]">{page}</div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F8F9FB] rounded-xl border border-gray-100/50 text-[13px] font-bold text-gray-600 hover:bg-white transition-all shadow-sm group">
            السابق
            <ChevronLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <AssetDetailModal 
          isOpen={isAssetModalOpen} 
          onClose={() => setIsAssetModalOpen(false)} 
          assetTitle={selectedAssetTitle}
          assetImage={selectedAssetImage}
          onAccept={() => {
            if (activeRowIdx !== null) {
              const newStatuses = [...awardingStatuses];
              newStatuses[activeRowIdx] = "awarded";
              setAwardingStatuses(newStatuses);
              setIsAssetModalOpen(false);
            }
          }}
          onReject={() => {
            if (activeRowIdx !== null) {
              const newStatuses = [...awardingStatuses];
              newStatuses[activeRowIdx] = "rejected";
              setAwardingStatuses(newStatuses);
              setIsAssetModalOpen(false);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Search & Stats Header */}
      <div className="flex items-center justify-between mb-1 shrink-0 px-2" dir="ltr">
        <div className="flex items-center gap-4">
          <button className="p-0 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-all border border-rose-100/50 w-12 h-12 flex items-center justify-center overflow-hidden">
            <Image src="/pdf-icon.png" alt="PDF" width={36} height={36} className="object-contain" />
          </button>
          <button className="p-0 bg-emerald-50 text-emerald-500 rounded-lg hover:bg-emerald-100 transition-all border border-emerald-100/50 w-12 h-12 flex items-center justify-center overflow-hidden">
            <Image src="/xls-icon.png" alt="XLS" width={36} height={36} className="object-contain" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group w-xl me-12">
            <input 
              type="text" 
              placeholder="بحث باسم المزاد..."
              className="w-full bg-[#F8F9FB] border border-gray-100/50 rounded-xl py-2.5 pr-10 pl-4 text-[11px] outline-none focus:border-orange-200 focus:ring-2 focus:ring-orange-50 transition-all text-right"
              dir="rtl"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-400 transition-colors" size={16} />
          </div>
          <div className="text-[14px] font-bold text-gray-800" dir="rtl">
            مدير مشروع <span className="text-orange-500">(53)</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 min-h-0 bg-[#F8F9FB] rounded-[20px] px-4 pb-4 border border-gray-100/50 overflow-auto scrollbar-hide">
        <table className="w-full border-separate border-spacing-y-2" dir="rtl">
          <thead className="sticky top-0 z-10">
            <tr className="text-right text-gray-400 text-[15px] font-bold uppercase">
              <th className="pt-4 pb-2 px-6 text-right sticky top-0 bg-[#F8F9FB] z-10">المزادات</th>
              <th className="pt-4 pb-2 text-center sticky top-0 bg-[#F8F9FB] z-10">تاريخ بداية المزاد</th>
              <th className="pt-4 pb-2 text-center sticky top-0 bg-[#F8F9FB] z-10">تاريخ نهاية المزاد</th>
              <th className="pt-4 pb-2 text-center sticky top-0 bg-[#F8F9FB] z-10">الحالة</th>
              <th className="pt-4 pb-2 text-center sticky top-0 bg-[#F8F9FB] z-10">عدد الاصول</th>
              <th className="pt-4 pb-2 text-center px-6 sticky top-0 bg-[#F8F9FB] z-10">رئيس اللجنة</th>
            </tr>
          </thead>
          <tbody>
            {initialAuctions.map((auction, idx) => (
              <tr 
                key={idx} 
                onClick={() => {
                  setSelectedAuction(auction);
                  setView("detail");
                }}
                className="hover:bg-white transition-all cursor-pointer group"
              >
                <td className="py-3 px-6 bg-white rounded-r-2xl border-y border-r border-gray-50/50 shadow-sm text-[13px] font-bold text-gray-700">
                  {auction.title}
                </td>
                <td className="py-3 text-center bg-white border-y border-gray-50/50 shadow-sm text-[14px] font-medium text-gray-600">
                  {auction.startDate}
                </td>
                <td className="py-3 text-center bg-white border-y border-gray-50/50 shadow-sm text-[14px] font-medium text-gray-600">
                  {auction.endDate}
                </td>
                <td className="py-3 text-center bg-white border-y border-gray-50/50 shadow-sm">
                  <div className="flex justify-center">{getStatusBadge(auction.status)}</div>
                </td>
                <td className="py-3 text-center bg-white border-y border-gray-50/50 shadow-sm text-[14px] font-bold text-gray-800">
                  {auction.assetCount}
                </td>
                <td className="py-3 px-6 text-center bg-white rounded-l-2xl border-y border-l border-gray-50/50 shadow-sm text-[14px] font-medium text-gray-600">
                  {auction.chairman}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-2 flex items-center justify-between shrink-0 px-2" dir="rtl">
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100/50 text-[11px] font-bold text-gray-800 hover:bg-[#F8F9FB] transition-all shadow-sm group">
          <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
          التالي
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-50 text-orange-600 text-[11px] font-bold cursor-pointer border border-orange-100 shadow-sm">1</div>
          {[2, 3, "...", 8, 9, 10].map((page, i) => (
            <div key={i} className="w-8 h-8 flex items-center justify-center rounded-lg text-[11px] font-medium text-gray-400 hover:bg-[#F8F9FB] cursor-pointer">{page}</div>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FB] rounded-xl border border-gray-100/50 text-[11px] font-bold text-gray-600 hover:bg-white transition-all shadow-sm group">
          السابق
          <ChevronLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
