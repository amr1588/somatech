"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ChevronRight, 
  MapPin, 
  Maximize2, 
  Building2, 
  Calendar, 
  Share2, 
  Heart, 
  Phone, 
  MessageSquare,
  ArrowLeft,
  ChevronLeft,
  Plus,
  Minus,
  Download,
  FileSpreadsheet,
  Gavel
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";

function PropertyDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const imageUrl = searchParams.get("image") || "/jenan-taiba.jpg";
  const title = searchParams.get("title") || "فيلا حي الروضة";
  const price = searchParams.get("price") || "4,623,240.00";
  const auctionType = searchParams.get("type") || "active";
  
  const [bidAmount, setBidAmount] = useState(4623250);
  const [totalSeconds, setTotalSeconds] = useState(6 * 86400 + 14 * 3600 + 12 * 60 + 40);
  const [showModal, setShowModal] = useState(false);
  const [autoCloseBid, setAutoCloseBid] = useState(false);

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

  const propertyDetails = [
    { label: "نوع العقار", value: "فيلا سكنية جديدة" },
    { label: "نوع الصفقة", value: "للبيع" },
    { label: "المدينة", value: "الرياض" },
    { label: "الحي", value: "حي النسيم الغربي" },
    { label: "شمالاً", value: "فيلا رقم 8 بطول 320 م" },
    { label: "جنوباً", value: "فيلا رقم 8 بطول 320 م" },
    { label: "شرقاً", value: "رصيف حديقة بطول 320 م" },
    { label: "غرباً", value: "فيلا رقم 2 بطول 653 م" },
    { label: "مساحة العقار", value: "3420 متر مربع" },
    { label: "رقم الصك", value: "563 543 443 320" },
    { label: "هل يوجد جراج", value: "لا يوجد" },
    { label: "هل يوجد مكيف", value: "لا يوجد" },
    { label: "عدد دورات المياه", value: "فيلا رقم 8 بطول 320 م" },
    { label: "اسم الشارع", value: "شارع الإخلاص" },
  ];

  const bidders = [
    { name: "عبدالله محمد حسن", bid: "34.239.20 ر.س", time: "منذ 12 يوماً" },
    { name: "عبدالله محمد حسن", bid: "34.239.20 ر.س", time: "منذ 9 ايام" },
    { name: "عبدالله محمد حسن", bid: "34.239.20 ر.س", time: "منذ 9 ايام" },
  ];

  const upcomingProperties = Array.from({ length: 10 }).map((_, i) => ({
    name: "omar abdulrahman",
    id: "1030764169",
    phone: "+966303245323",
    hasBalance: "نعم"
  }));

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-cairo" dir="ltr">
      
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Conditional Sidebar Top Section */}
            {(auctionType === "active" || auctionType === "expired") && (
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                     <button className="w-8 h-8 flex items-center justify-center bg-red-500 rounded text-white cursor-pointer"><Download size={16} /></button>
                     <button className="w-8 h-8 flex items-center justify-center bg-green-600 rounded text-white cursor-pointer"><FileSpreadsheet size={16} /></button>
                  </div>
                  <h3 className="text-lg font-bold text-brand-blue">اعلي المزايدين <span className="text-brand-orange">(3)</span></h3>
                </div>

                <div className="overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead className="text-gray-400 border-b border-gray-50 font-bold">
                      <tr>
                        <th className="pb-3 pr-2">الوقت</th>
                        <th className="pb-3 text-center">سعر السوم</th>
                        <th className="pb-3 text-left">الاسم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {bidders.map((bidder, i) => (
                        <tr key={i}>
                          <td className="py-4 pr-2 text-gray-500 font-bold">{bidder.time}</td>
                          <td className="py-4 text-center text-brand-blue font-bold">{bidder.bid}</td>
                          <td className="py-4 text-left text-brand-blue font-bold">{bidder.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {(auctionType === "upcoming" || auctionType === "expired") && (
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100" dir="rtl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-brand-blue">المسجلين في المزاد <span className="text-brand-orange">(53)</span></h3>
                  <div className="flex items-center gap-2">
                     <button className="w-8 h-8 flex items-center justify-center bg-red-500 rounded text-white cursor-pointer shadow-sm"><Download size={16} /></button>
                     <button className="w-8 h-8 flex items-center justify-center bg-green-600 rounded text-white cursor-pointer shadow-sm"><FileSpreadsheet size={16} /></button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#F8F9FA] text-[#8C98A4] font-bold">
                      <tr>
                        <th className="py-3 px-4">الاسم</th>
                        <th className="py-3 px-4">رقم الهوية</th>
                        <th className="py-3 px-4">الهاتف</th>
                        <th className="py-3 px-4">لدية رصيد</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {upcomingProperties.map((prop, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 text-brand-blue font-bold">{prop.name}</td>
                          <td className="py-4 px-4 text-gray-500 font-bold">{prop.id}</td>
                          <td className="py-4 px-4 text-gray-500 font-bold" dir="ltr">{prop.phone}</td>
                          <td className="py-4 px-4 text-brand-blue font-bold">{prop.hasBalance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination for Table */}
                <div className="mt-6 flex justify-between items-center" dir="ltr">
                  <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-gray-400 font-bold text-[10px] hover:bg-gray-50 cursor-pointer">
                     <ChevronLeft size={20} /> التالي
                  </button>
                  <div className="flex gap-1.5 items-center text-[10px]">
                    <button className="w-6 h-6 flex items-center justify-center rounded bg-[#FFF4ED] text-brand-orange font-bold cursor-pointer text-[14px]">1</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded text-gray-400 font-bold hover:bg-gray-50 cursor-pointer text-[14px]">2</button>
                    <span className="text-gray-300 mx-1 text-base">...</span>
                    <button className="w-6 h-6 flex items-center justify-center rounded text-gray-400 font-bold hover:bg-gray-50 cursor-pointer text-[14px]">9</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded text-gray-400 font-bold hover:bg-gray-50 cursor-pointer text-[14px]">10</button>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-gray-400 font-bold text-[10px] hover:bg-gray-50 cursor-pointer">
                     السابق <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Details Section */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col items-end gap-1 mb-6">
                <h3 className="text-xl font-bold text-brand-blue">التفاصيل</h3>
                <div className="w-8 h-1 bg-brand-orange rounded-full"></div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-8 text-right font-medium">
                فيلا فاخرة في حي الزهور، الرياض. تصميم عصري ومرافق متطورة. حديقة خلابة ومسبح خاص، مؤجرة بقيمة 40 ألف ريال سنوياً، وانتهاء عقد الإيجار في تاريخ 14 نوفمبر 2023م. فرصة للاستثمار في فيلا فاخرة وتحقيق عائد استثماري، احجز الآن قبل انتهاء العقد.
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {propertyDetails.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-bold text-brand-blue whitespace-nowrap">{item.label}</span>
                    <div className="w-full bg-[#F8F9FA] rounded-md py-2 px-3 text-center text-brand-blue font-bold text-xs border border-gray-50">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Header Title & Badge */}
            <div className="flex justify-between items-start mb-2">
               <div className="bg-[#5CB85C] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                  انت اعلي مزايد
               </div>
               <div className="flex flex-col items-end gap-1">
                  <h1 className="text-2xl font-black text-brand-blue">{title} <span className="text-gray-400 text-sm font-bold">(الرياض)</span></h1>
               </div>
            </div>

            <div className="flex justify-between items-center text-sm font-bold text-brand-blue" dir="rtl">
               <div className="flex flex-col items-start">
                  <span>معرض الصور</span>
                  <div className="w-8 h-1 bg-brand-orange rounded-full mt-1"></div>
               </div>
               <div className="flex items-center gap-1">
                  <span className="text-gray-500 font-bold">رقم التواصل:</span>
                  <span>+966501759844</span>
               </div>
            </div>

            {/* Image Slider */}
            <div className="relative w-full h-[450px] rounded-[32px] overflow-hidden shadow-lg group">
              <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
              
              {/* Infath Badge on Image */}
              <div className="absolute top-6 left-6">
                 <div className="bg-white/90 p-2 rounded-xl shadow-md">
                    <Image src="/mazaya_Alfedhiyah.png" alt="Mazaya" width={60} height={30} className="object-contain" />
                 </div>
              </div>

              {/* Join Button on Image */}
              <div className="absolute top-6 right-6">
                 <button className="bg-brand-blue hover:bg-blue-900 text-white px-4 py-2 rounded-md flex items-center gap-2 text-xs font-bold shadow-lg transition-all cursor-pointer">
                    <Plus size={14} strokeWidth={3} />
                    سجل في المزاد
                 </button>
              </div>

              {/* Slider Arrows */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-brand-blue hover:bg-white transition-all cursor-pointer shadow-md">
                 <ChevronLeft size={20} />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-brand-blue hover:bg-white transition-all cursor-pointer shadow-md">
                 <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {[1,2,3,4,5,6].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-white scale-125' : 'bg-white/50'}`}></div>
                  ))}
               </div>
            </div>

            {/* Expired Auction Badge */}
            {auctionType === "expired" && (
                <div className="bg-brand-orange text-white w-full py-4 rounded-[16px] text-center font-black text-xl shadow-lg mt-4">
                  مزاد منتهي
                </div>
            )}

             {/* Upcoming Auction Details Strip */}
             {auctionType === "upcoming" && (
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center justify-between mt-4" dir="rtl">
                   <div className="flex flex-col items-center flex-1">
                      <span className="text-xl font-bold text-black">تاريخ فتح المزاد</span>
                      <span className="text-lg font-black text-brand-blue mt-1">19/2/2023</span>
                   </div>
                   <div className="w-px h-12 bg-gray-100 mx-4"></div>
                   <div className="flex flex-col items-center flex-1">
                      <span className="text-xl font-bold text-black">وقت فتح المزاد</span>
                      <span className="text-lg font-black text-brand-blue mt-1">01:45 pm</span>
                   </div>
                </div>
             )}

            {/* Timer Strip  Only for Active & Upcoming */}
            {(auctionType === "active" || auctionType === "upcoming") && (
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex justify-center gap-8 md:gap-16 items-center" dir="rtl">
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black text-brand-blue">{formatNumber(seconds)}</span>
                    <span className="text-[10px] font-bold text-gray-400">ثانية</span>
                 </div>
                 <span className="text-brand-blue font-black text-2xl mb-4">:</span>
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black text-brand-blue">{formatNumber(minutes)}</span>
                    <span className="text-[10px] font-bold text-gray-400">دقيقة</span>
                 </div>
                 <span className="text-brand-blue font-black text-2xl mb-4">:</span>
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black text-brand-blue">{formatNumber(hours)}</span>
                    <span className="text-[10px] font-bold text-gray-400">ساعة</span>
                 </div>
                 <span className="text-brand-blue font-black text-2xl mb-4">:</span>
                 <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-black text-brand-blue">{formatNumber(days)}</span>
                    <span className="text-[10px] font-bold text-gray-400">يوم</span>
                 </div>
              </div>
            )}

            {/* Price Info Grid for Active & Expired */}
            {(auctionType === "active" || auctionType === "expired") && (
               <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
                  {/* Detailed Breakdown */}
                  <div className="flex flex-col gap-2 w-full md:w-1/2">
                     <div className="flex justify-between text-sm font-bold">
                        <span className="text-brand-blue">200 ريال</span>
                        <span className="text-gray-400">سعر المتر</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold">
                        <span className="text-brand-blue">2049 ريال</span>
                        <span className="text-gray-400">الاجمالي</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold">
                        <span className="text-brand-blue">75.5 ريال</span>
                        <span className="text-gray-400">ضريبة السعي</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold">
                        <span className="text-brand-blue">2.5 ريال</span>
                        <span className="text-gray-400">السعي</span>
                     </div>
                  </div>

                  {/* Current Bid Title & Price */}
                  <div className="flex flex-col items-end gap-2 w-full md:w-1/2">
                     <h2 className="text-xl font-black text-brand-blue">سعر السوم الحالي</h2>
                     <div className="flex items-baseline gap-2">
                       <span className="text-brand-gold font-black text-lg">ر.س</span>
                        <span className="text-brand-gold text-4xl font-black">{price}</span>
                     </div>
                  </div>
               </div>
            )}

            {/* Stats & Action Section */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col gap-6 mt-4" dir="rtl">
               {/* Stats Row */}
               <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center flex-1">
                      <span className="text-[10px] text-gray-400 font-bold mb-2">عربون الدخول</span>
                      <span className="text-brand-blue font-black text-xl">450 ر.س</span>
                  </div>
                  <div className="w-px h-12 bg-gray-100"></div>
                  <div className="flex flex-col items-center flex-1">
                      <span className="text-[10px] text-gray-400 font-bold mb-2">فرق السوم</span>
                      <span className="text-brand-blue font-black text-xl">30 ر.س</span>
                  </div>
                  <div className="w-px h-12 bg-gray-100"></div>
                  <div className="flex flex-col items-center flex-1">
                      <span className="text-[10px] text-gray-400 font-bold mb-2">عدد السومات</span>
                      <span className="text-brand-blue font-black text-xl">22</span>
                  </div>
               </div>

               {/* Divider */}
               <div className="w-full h-px border-t border-dashed border-gray-200"></div>

               {/* Action Bar - Only for Active */}
               {auctionType === "active" && (
                  <div className="flex flex-col md:flex-row items-center gap-4">
                     <div className="flex-1 w-full bg-white rounded-xl border border-gray-100 p-2 flex items-center justify-between shadow-sm">
                        <button 
                          onClick={() => setBidAmount(prev => prev + 10)}
                          className="w-10 h-10 flex items-center justify-center text-brand-blue hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Plus size={20} strokeWidth={3} />
                        </button>
                        <span className="text-brand-gold font-black text-2xl">{bidAmount.toLocaleString()}</span>
                        <button 
                          onClick={() => setBidAmount(prev => prev - 10)}
                          className="w-10 h-10 flex items-center justify-center text-brand-blue hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Minus size={20} strokeWidth={3} />
                        </button>
                     </div>
                     <button 
                        onClick={() => !autoCloseBid && setShowModal(true)}
                        className={`flex-1 w-full text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg ${autoCloseBid ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-[#1D2153] hover:bg-blue-900 shadow-blue-900/20'}`}
                     >
                        {autoCloseBid ==false? <>
                        <Gavel size={22} className="rotate-[-45deg]" />
                        اضف سومتك
                        </> : <>
                         تم اغلاق السوم
                        </>}
                        
                     </button>
                  </div>
               )}

               {auctionType === "active" && (
                 <div dir="ltr">
                   <div className="w-full h-px border-t border-dashed border-gray-200 my-2"></div>
                   <div className="flex items-center justify-end gap-3 mt-2">
                     <span className="text-sm font-bold text-brand-blue">
                        ودك تغلق السوم عند <span className="text-brand-gold">( 80.500.00 ريال )</span>
                     </span>
                     <button 
                       onClick={() => setAutoCloseBid(!autoCloseBid)}
                       className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${autoCloseBid ? 'bg-brand-blue' : 'bg-gray-200'}`}
                     >
                       <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${autoCloseBid ? 'translate-x-6' : 'translate-x-0'}`}></div>
                     </button>
                   </div>

                   <p className="text-[10px] text-black text-right leading-relaxed font-bold mt-4">
                      • بالضغط على زر أضف سومتك، فإنك توافق على الشروط والأحكام الخاصة بالمزاد .<br />
                      • السعر الإجمالي لا يشمل ضريبة التصرفات العقارية ويتحملها المشتري .
                   </p>
                 </div>
               )}
            </div>

            {/* Bottom Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
               <button className="bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-gold/20 transition-all cursor-pointer">
                  الموقع
               </button>
               <button className="bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-gold/20 transition-all cursor-pointer">
                  الملف التعريفي
               </button>
            </div>

          </div>

        </div>
      </div>


      {/* Bidding Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-[450px] rounded-[32px] p-10 shadow-2xl animate-in fade-in zoom-in duration-300" dir="rtl">
            <div className="flex flex-col items-center text-center gap-6">
              <h2 className="text-2xl font-black text-brand-blue">أضف سومتك</h2>
              
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-brand-blue leading-relaxed">
                  هل ترغب في السوم بمبلغ <span className="text-brand-orange">{bidAmount.toLocaleString()}</span> ريال ؟
                </p>
              </div>

              <div className="w-full flex flex-col gap-4 mt-4">
                <h3 className="text-lg font-bold text-gray-400">تفاصيل المزايدة</h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-400">سعر المتر</span>
                    <span className="text-brand-blue">200 ريال</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-400">السعي</span>
                    <span className="text-brand-blue">2.5 ريال</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-400">ضريبة السعي</span>
                    <span className="text-brand-blue">75.5 ريال</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-400">الاجمالي</span>
                    <span className="text-brand-blue">2049 ريال</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px border-t border-dashed border-gray-200 my-2"></div>

              <div className="text-[11px] text-gray-400 text-right space-y-1 font-bold">
                <p>• بالضغط على زر أضف سومتك، فإنك توافق على الشروط والأحكام الخاصة بالمزاد .</p>
                <p>• السعر الإجمالي لا يشمل ضريبة التصرفات العقارية ويتحملها المشتري .</p>
              </div>

              <div className="w-full flex gap-4 mt-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  تأكيد
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-400 font-black py-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertyDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-cairo" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          <span className="text-brand-blue font-bold">جاري تحميل تفاصيل العقار...</span>
        </div>
      </div>
    }>
      <PropertyDetailsContent />
    </Suspense>
  );
}
