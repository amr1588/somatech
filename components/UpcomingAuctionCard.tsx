import Image from "next/image";
import Link from "next/link";

export default function UpcomingAuctionCard({ id = 1, imageSrc = "/mazad_wagha_shark_ryad.png" }: { id?: string | number, imageSrc?: string }) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image src={imageSrc} alt="Upcoming Auction" layout="fill" objectFit="cover" />
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
            <h4 className="font-bold text-brand-blue text-sm">عمارة سكنية الاندلس</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <span>325.22 م²</span>
              <div className="w-2 h-2 bg-brand-gold"></div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100"></div>

        {/* Date and Assets Count */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
             <div className="flex flex-col text-right">
                <span className="text-[10px] text-gray-500">وقت فتح المزاد</span>
                <span className="text-xs font-bold text-brand-blue">01:45 pm</span>
             </div>
             <div className="flex flex-col text-right">
                <span className="text-[10px] text-gray-500">تاريخ فتح المزاد</span>
                <span className="text-xs font-bold text-brand-blue">19/2/2023</span>
             </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-brand-blue">عدد الاصول</span>
            <span className="text-brand-orange font-bold text-xl">71</span>
          </div>
        </div>

        {/* Button */}
        <Link href={`/auction/${id}?image=${encodeURIComponent(imageSrc)}&type=upcoming`} className="w-full bg-brand-gold text-white font-bold py-2.5 rounded-lg text-sm hover:bg-yellow-500 transition-colors cursor-pointer text-center block">
          تفاصيل المزاد
        </Link>
      </div>
    </div>
  );
}
