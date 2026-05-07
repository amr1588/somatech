import { 
  ChevronRight, 
  ChevronLeft, 
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
  { id: 1, name: "عقار انفاذ", date: "2023-03-24", status: "مرفوض", statusColor: "text-red-500 bg-red-50", secretary: "عمر خالد", chairman: "عمر خالد" },
  { id: 2, name: "الاخلاص", date: "2023-03-24", status: "تم الموافقة", statusColor: "text-green-500 bg-green-50", secretary: "عمر خالد", chairman: "عمر خالد" },
  { id: 3, name: "العجوزة", date: "2023-03-24", status: "تم انتهاء المزاد", statusColor: "text-gray-500 bg-gray-100", secretary: "عمر خالد", chairman: "عمر خالد" },
  { id: 4, name: "الصفا", date: "2023-03-24", status: "تم الموافقة", statusColor: "text-green-500 bg-green-50", secretary: "عمر خالد", chairman: "عمر خالد" },
  { id: 5, name: "المروة", date: "2023-03-24", status: "تم التوثيق بانتظارالموافقة", statusColor: "text-blue-600 bg-blue-50", secretary: "عمر خالد", chairman: "عمر خالد" },
];

export default function SoomInfathAdmin() {
  return (
    <div className="flex flex-col gap-3 p-3 h-full overflow-hidden">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-[#1A225B] h-32 flex items-center px-12 text-white shrink-0">
        {/* Background Patterns (Simplified) */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,150 Q250,50 500,150 T1000,150" fill="none" stroke="white" strokeWidth="2" />
            <path d="M0,170 Q250,70 500,170 T1000,170" fill="none" stroke="white" strokeWidth="1" />
            <path d="M0,190 Q250,90 500,190 T1000,190" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 flex w-full justify-between items-center" dir="ltr">
          <div className="flex gap-3 mb-12">
            {/* Actual logos */}
            <div className="bg-white p-1.5 px-3 rounded-full flex items-center justify-center shadow-sm h-12">
              <InfathLogo width={70} height={30} />
            </div>
            <div className="bg-white p-1.5 px-4 rounded-full flex items-center justify-center shadow-sm h-12">
              <Image 
                src="/hawyia_auctions.png" 
                alt="Hawyia Auctions" 
                width={85} 
                height={30} 
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-10">اهلا وسهلاً</h1>
        </div>
      </div>

      {/* Stats Cards Row (Overlapping the banner) */}
      <div className="relative -mt-10 mx-12 shrink-0">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex p-3 divide-x divide-x-reverse divide-gray-100">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 px-6 text-center first:pr-0 last:pl-0">
              <p className="text-xs text-gray-500 mb-2 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auctions Table Section */}
      <div className="mt-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-2" dir="ltr">
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors shadow-sm">
              <span className="text-[10px] font-bold">XLS</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm">
              <span className="text-[10px] font-bold">PDF</span>
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-800">اخر المزادات</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-right border-b border-gray-100">
                <th className="pb-4 font-medium text-gray-400 text-sm">المزادات</th>
                <th className="pb-4 font-medium text-gray-400 text-sm">تاريخ بداية المزاد</th>
                <th className="pb-4 font-medium text-gray-400 text-sm text-center">الحالة</th>
                <th className="pb-4 font-medium text-gray-400 text-sm">امين اللجنة</th>
                <th className="pb-4 font-medium text-gray-400 text-sm">رئيس اللجنة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {auctions.map((auction) => (
                <tr key={auction.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-2.5 font-bold text-gray-800 text-sm">{auction.name}</td>
                  <td className="py-2.5 text-gray-600 font-mono text-sm">{auction.date}</td>
                  <td className="py-2.5">
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${auction.statusColor}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${auction.statusColor.split(' ')[0].replace('text', 'bg')}`}></div>
                        {auction.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center justify-between w-[170px] px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 text-gray-700 text-xs hover:bg-white hover:border-gray-200 transition-all cursor-pointer shadow-sm">
                      <ChevronDown size={12} className="text-gray-400" />
                      <span className="font-medium">{auction.secretary}</span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center justify-between w-[170px] px-3 py-1.5 bg-gray-100 rounded-lg border border-gray-100 text-gray-700 text-xs hover:bg-white hover:border-gray-200 transition-all cursor-pointer shadow-sm">
                      <ChevronDown size={12} className="text-gray-400" />
                      <span className="font-medium">{auction.chairman}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="mt-auto pt-2 flex justify-between items-center">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors">
            <ArrowRight size={16} />
            <span>التالي</span>
          </button>

          <div className="flex items-center gap-2">
             {[10, 9, 8, '...', 3, 2].map((n, i) => (
              <span key={i} className="w-10 h-10 flex items-center justify-center text-sm text-gray-400 cursor-pointer hover:text-gray-800 transition-colors">
                {n}
              </span>
            ))}
            <span className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-600 rounded-lg font-bold text-sm shadow-sm border border-orange-100">1</span>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors">
            <span>السابق</span>
            <ArrowLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
