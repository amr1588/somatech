"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ActiveAuctionCard from "@/components/ActiveAuctionCard";
import UpcomingAuctionCard from "@/components/UpcomingAuctionCard";
import ExpiredAuctionCard from "@/components/ExpiredAuctionCard";

const activeImages = Array(8).fill("/maa2_dor.png");

const upcomingImages = Array(8).fill("/mazad_wagha_shark_ryad.png");

const expiredImages = Array(8).fill("/mazad_Closed.png");

export default function Home() {
  const [activeTab, setActiveTab] = useState("القائمة");
  const tabs = ["المنتهي", "القادمة", "القائمة"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F9FAFB] pb-20 font-cairo w-full overflow-x-hidden">
      {/* Banner Section */}
      <div className="w-full max-w-[1400px] px-4 mt-8">
        <div className="relative w-full h-[300px] md:h-[450px] rounded-[32px] overflow-hidden shadow-lg">
          <Image
            src="/tower-buildings.png"
            alt="أضف سومتك وين ما كنت"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      {/* Logos Section */}
      <div className="w-full max-w-6xl mt-16 mb-16 px-4">
        <h3 className="text-center text-2xl font-bold text-[#1a1a1a] mb-12">
          شركات المزادات
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-80">
          <Image src="/Fortune_Reality.png" alt="Fortune Reality" width={140} height={60} objectFit="contain" />
          <Image src="/hawyia_auctions.png" alt="Hawyia Auctions" width={100} height={50} objectFit="contain" />
          <Image src="/mazaya_Alfedhiyah.png" alt="Mazaya Alfedhiyah" width={130} height={60} objectFit="contain" />
          <Image src="/Tag_El_Sahm.png" alt="Tag El Sahm" width={120} height={60} objectFit="contain" />
          <Image src="/dar_al_qias.png" alt="Dar Al Qias" width={120} height={60} objectFit="contain" />
        </div>
      </div>

      {/* Auctions Title */}
      <div className="w-full max-w-[1400px] px-4 flex justify-end mb-10 mt-8">
        <div className="flex flex-col items-end">
          <h2 className="text-4xl font-extrabold text-brand-blue mb-4">المزادات</h2>
          <div className="w-16 h-1 bg-brand-gold rounded-full"></div>
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
          Array.from({ length: 8 }).map((_, i) => (
            <ActiveAuctionCard key={i} imageSrc={activeImages[i]} />
          ))}
        {activeTab === "القادمة" &&
          Array.from({ length: 8 }).map((_, i) => (
            <UpcomingAuctionCard key={i} imageSrc={upcomingImages[i]} />
          ))}
        {activeTab === "المنتهي" &&
          Array.from({ length: 8 }).map((_, i) => (
            <ExpiredAuctionCard key={i} imageSrc={expiredImages[i]} />
          ))}
      </div>

      {/* View All Button */}
      <div className="mt-16 flex justify-center">
        <Link 
          href="/auctions"
          className="px-12 py-3 border-[1.5px] border-brand-gold text-brand-gold rounded-full font-bold text-lg hover:bg-brand-gold hover:text-white transition-colors duration-300 cursor-pointer text-center"
        >
          كل المزادات
        </Link>
      </div>
    </div>
  );
}
