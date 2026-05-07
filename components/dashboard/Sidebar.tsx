"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Gavel, 
  Settings, 
  LogOut 
} from "lucide-react";

const adminMenuItems = [
  { name: "اللوحة الرئيسية", icon: LayoutDashboard, href: "/infath-admin" },
  { name: "قائمة الموظفين", icon: Users, href: "/infath-admin/employees" },
  { name: "قائمة المزادات", icon: Gavel, href: "/infath-admin/auctions" },
  { name: "الإعدادات", icon: Settings, href: "/infath-admin/settings" },
];

const infathMenuItems = [
  { name: "اللوحة الرئيسية", icon: LayoutDashboard, href: "/infath" },
  { name: "قائمة المزادات", icon: Gavel, href: "/infath/auctions" },
  { name: "الإعدادات", icon: Settings, href: "/infath/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/infath-admin");
  const menuItems = isAdmin ? adminMenuItems : infathMenuItems;

  return (
    <aside className="w-80 bg-transparent text-white flex flex-col h-full py-4">
      {/* Logo Section */}
      <div className="p-8 flex flex-col items-center">
        <div className="flex flex-col items-center text-center select-none gap-2">
          <div className="relative flex items-end">
            <span className="text-3xl font-black tracking-tight leading-[0.8] mb-1 text-white">سومتك</span>
            <span className="absolute top-0 left-[-12px] w-2.5 h-2.5 bg-brand-gold rounded-sm rotate-45 border border-[#171D5B]"></span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-brand-gold font-bold text-sm tracking-[0.25em] leading-none mb-1">SOUMTECH</span>
            <div className="flex flex-col items-center opacity-90">
              <span className="text-[10px] font-medium leading-tight text-white/90">المنصة الوطنية للمزادات</span>
              <span className="text-[8px] font-light leading-tight uppercase tracking-tight text-white/70">National Auctioning Platform</span>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8"></div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-6 space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? "bg-white text-[#1A225B] font-bold shadow-[0_10px_20px_-5px_rgba(255,255,255,0.2)] scale-105" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={22} className={isActive ? "text-[#1A225B]" : "text-white/40 group-hover:text-white transition-colors"} />
              <span className="text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:bg-red-500/10 hover:text-red-400 transition-all rounded-xl cursor-pointer">
          <LogOut size={22} />
          <span>تسجيل الخروج</span>
        </Link>
      </div>
    </aside>
  );
}
