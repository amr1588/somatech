"use client";
import { useState } from "react";
import ActiveAuctionCard from "@/components/ActiveAuctionCard";
import UpcomingAuctionCard from "@/components/UpcomingAuctionCard";
import ExpiredAuctionCard from "@/components/ExpiredAuctionCard";

const activeImages = [
  "/Alnakheel.png",
  "/maa2_dor.png",
  "/mazad_wagha_shark_ryad.png",
  "/osoul_AlRiyadh.png",
  "/jenan-taiba.jpg",
  "/Ramah_Future.png",
  "/maa2_dor.png",
  "/mazad_wagha_shark_ryad.png",
  "/Alnakheel.png",
  "/jenan-taiba.jpg",
  "/osoul_AlRiyadh.png",
  "/Ramah_Future.png"
];

const upcomingImages = [
  "/Ramah_Future.png",
  "/manarat_gharbya.jpg",
  "/osoul_AlRiyadh.png",
  "/mazad_wagha_shark_ryad.png",
  "/Alnakheel.png",
  "/mazad_wagha_shark_ryad.png",
  "/manarat_gharbya.jpg",
  "/jenan-taiba.jpg",
  "/Ramah_Future.png",
  "/osoul_AlRiyadh.png",
  "/Alnakheel.png",
  "/jenan-taiba.jpg"
];

const expiredImages = [
  "/manarat_gharbya.jpg",
  "/maa2_dor.png",
  "/mazad_wagha_shark_ryad.png",
  "/osoul_AlRiyadh.png",
  "/Ramah_Future.png",
  "/mazad_wagha_shark_ryad.png",
  "/manarat_gharbya.jpg",
  "/Alnakheel.png",
  "/maa2_dor.png",
  "/jenan-taiba.jpg",
  "/osoul_AlRiyadh.png",
  "/Ramah_Future.png"
];

export default function AuctionsPage() {
  const [activeTab, setActiveTab] = useState("القائمة");

  const tabs = ["المنتهي", "القادمة", "القائمة"];

  const getTabLabel = () => {
    if (activeTab === "القائمة") return "القائمة";
    if (activeTab === "القادمة") return "القادمة";
    return "المنتهيه";
  };

  const getTabCount = () => {
    if (activeTab === "القائمة") return "34";
    if (activeTab === "القادمة") return "58";
    return "22";
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F9FAFB] pb-20 font-cairo w-full overflow-x-hidden">
      
      <div className="w-full bg-[#F1F3F5] py-12 mb-12 flex justify-center border-y border-gray-200">
        <div className="w-full max-w-[1400px] px-4 flex justify-end">
          <div className="flex flex-col items-end gap-3">
            <h2 className="text-4xl font-extrabold text-brand-blue">كل المزادات</h2>
            <div className="flex items-center gap-2 text-brand-orange font-bold text-xl mt-2">
              <span>عدد المزادات {getTabLabel()} ({getTabCount()})</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4.636 10.778l4.95-4.95a2.121 2.121 0 013 0l6.364 6.364a2.121 2.121 0 010 3l-4.95 4.95a2.121 2.121 0 01-3 0L4.636 13.778a2.121 2.121 0 010-3zM2.864 19.364l4.243-4.243 1.414 1.414-4.243 4.243a1 1 0 01-1.414-1.414z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-[800px] px-4 mb-14">
        <div className="flex justify-between items-center bg-white rounded-full p-2 shadow-sm border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center text-lg rounded-full transition-all duration-300 font-bold cursor-pointer ${
                activeTab === tab
                  ? "bg-brand-orange text-white shadow-md"
                  : "text-gray-700 hover:bg-brand-orange/20 hover:text-brand-blue"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTab === "القائمة" &&
          Array.from({ length: 12 }).map((_, i) => (
            <ActiveAuctionCard key={i} id={i + 1} imageSrc={activeImages[i]} />
          ))}
        {activeTab === "القادمة" &&
          Array.from({ length: 12 }).map((_, i) => (
            <UpcomingAuctionCard key={i} id={i + 1} imageSrc={upcomingImages[i]} />
          ))}
        {activeTab === "المنتهي" &&
          Array.from({ length: 12 }).map((_, i) => (
            <ExpiredAuctionCard key={i} id={i + 1} imageSrc={expiredImages[i]} />
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-between items-center w-full max-w-[800px] px-4">
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
    </div>
  );
}
