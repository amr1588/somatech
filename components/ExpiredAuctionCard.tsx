import Image from "next/image";
import Link from "next/link";

export default function ExpiredAuctionCard({ id = 1, imageSrc = "/mazad_Closed.png" }: { id?: string | number, imageSrc?: string }) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image src={imageSrc} alt="Closed Auction" layout="fill" objectFit="cover" />
        {/* Location Overlay */}
        <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs py-1.5 px-3 flex justify-end items-center gap-1 backdrop-blur-sm">
          <span>شارع الاخلاص - الدمام</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title and Logo */}
        <div className="flex justify-between items-start">
          <div className="w-1/2">
            <Image src="/Fortune_Reality.png" alt="Fortune Reality" width={80} height={30} objectFit="contain" />
          </div>
          <div className="flex flex-col items-end">
            <h4 className="font-bold text-brand-blue text-sm">مزاد الاسراء</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <span>325.22 م²</span>
              <div className="w-2 h-2 bg-brand-gold"></div>
            </div>
          </div>
        </div>

        {/* Closed Banner */}
        <div className="w-full bg-[#E54D2E] text-white text-center py-3 rounded text-xs font-bold mt-1">
          تم اغلاق المزاد
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-1">
          <Link href={`/auction/${id}?image=${encodeURIComponent(imageSrc)}&type=expired`} className="bg-brand-gold text-white font-bold py-2 px-6 rounded-lg text-sm hover:bg-yellow-500 transition-colors cursor-pointer text-center inline-block">
            تفاصيل المزاد
          </Link>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-brand-blue">سعر السوم الحالي</span>
            <div className="flex items-baseline gap-1 text-brand-orange">
              <span className="text-[10px]">ر.س</span>
              <span className="font-bold text-lg">500,000,000</span>
            </div>
            <span className="text-[8px] text-gray-400">(20 ر.س للمتر)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
