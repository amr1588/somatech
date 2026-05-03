"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ActiveAuctionCard({ id = 1, imageSrc = "/maa2_dor.png" }: { id?: string | number, imageSrc?: string }) {
  const [totalSeconds, setTotalSeconds] = useState(6 * 86400 + 14 * 3600 + 12 * 60 + 40);

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
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image src={imageSrc} alt="Auction" layout="fill" objectFit="cover" />
        {/* Location Overlay */}
        <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs py-1.5 px-3 flex justify-end items-center gap-1 backdrop-blur-sm">
          <span>شارع الاخلاص - الدمام</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-4">
        {/* Title and Logo */}
        <div className="flex justify-between items-start">
          <div className="w-1/2">
            <Image src="/Fortune_Reality.png" alt="Fortune Reality" width={80} height={30} objectFit="contain" />
          </div>
          <div className="flex flex-col items-end">
            <h4 className="font-bold text-brand-blue text-sm">فيلا الاخلاص</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <span>325.22 م²</span>
              <div className="w-2 h-2 bg-brand-gold"></div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100"></div>

        {/* Timer and Assets Count */}
        <div className="flex justify-between items-center">
          {/* Timer Section */}
          <div className="flex flex-col gap-1 w-[65%]">
            <div className="flex justify-between text-brand-blue font-bold text-lg leading-none" dir="ltr">
              <div className="flex flex-col items-center"><span className="text-[10px] font-normal text-gray-500 mb-0.5">يوم</span><span>{formatNumber(days)}</span></div>
              <span>:</span>
              <div className="flex flex-col items-center"><span className="text-[10px] font-normal text-gray-500 mb-0.5">ساعة</span><span>{formatNumber(hours)}</span></div>
              <span>:</span>
              <div className="flex flex-col items-center"><span className="text-[10px] font-normal text-gray-500 mb-0.5">دقيقة</span><span>{formatNumber(minutes)}</span></div>
              <span>:</span>
              <div className="flex flex-col items-center"><span className="text-[10px] font-normal text-gray-500 mb-0.5">ثانية</span><span>{formatNumber(seconds)}</span></div>
            </div>
          </div>
          
          {/* Assets Count Section */}
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-brand-blue">عدد الاصول</span>
            <span className="text-brand-orange font-bold text-xl">71</span>
          </div>
        </div>

        {/* Button */}
        <Link href={`/auction/${id}?image=${encodeURIComponent(imageSrc)}&type=active`} className="w-full bg-brand-gold text-white font-bold py-2.5 rounded-lg text-sm hover:bg-yellow-500 transition-colors cursor-pointer text-center block">
          تفاصيل المزاد
        </Link>
      </div>
    </div>
  );
}
