"use client";

import React, { useState } from "react";
import { 
  Lock,
  User,
  Pencil
} from "lucide-react";
import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";

export default function InfathSettingsPage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const userEmail = "Hatem97@Gmail.com";

  return (
    <div className="flex flex-col h-full bg-[#F8F9FB] rounded-[24px] overflow-hidden shadow-sm relative" dir="rtl">
      {/* Header with Title */}
      <div className="px-10 py-4 flex justify-end items-center border-b border-gray-100 bg-white shadow-sm z-10">
        <h2 className="text-lg font-bold text-brand-blue">الملف الشخصي</h2>
      </div>

      <div className="flex-1 scrollbar-hide px-10 py-6">
        {/* Profile Section */}
        <div className="relative mb-14">
          {/* Banner */}
          <div className="h-36 w-full rounded-[20px] overflow-hidden relative shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-r from-[#0A1629] to-[#1A2B45] opacity-90"></div>
          </div>
          
          {/* Profile Picture Overlay */}
          <div className="absolute -bottom-10 right-20">
             <div className="relative group">
                <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-xl relative bg-white">
                   <div className="w-full h-full bg-[#E85D2A] flex items-center justify-center">
                      <User size={56} className="text-white stroke-[1.5]" />
                   </div>
                </div>
                <button className="absolute -bottom-1 -left-0 w-8 h-8 bg-[#E85D2A] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white hover:scale-110 transition-all cursor-pointer">
                   <Pencil size={15} fill="white" className="text-white" />
                </button>
             </div>
          </div>
        </div>

        {/* Settings Form Card */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-50 p-8">
           <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              {/* Row 1 */}
              <div className="flex items-center justify-end gap-4">
                 <input 
                   type="email" 
                   defaultValue="Abdo129@Gmail.com"
                   className="flex-1 bg-[#F8F9FB] border border-gray-100 rounded-lg px-4 py-3 text-center text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                 />
                 <label className="text-gray-900 font-bold text-sm min-w-[120px] text-right">البريد الالكتروني</label>
              </div>

              <div className="flex items-center justify-end gap-4">
                 <input 
                   type="text" 
                   defaultValue="0amr123456$"
                   className="flex-1 bg-[#F8F9FB] border border-gray-100 rounded-lg px-4 py-3 text-center text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                 />
                 <label className="text-gray-900 font-bold text-sm min-w-[120px] text-right">كلمة المرور</label>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-end gap-4">
                 <input 
                   type="text" 
                   defaultValue="محمد خالد"
                   className="flex-1 bg-[#F8F9FB] border border-gray-100 rounded-lg px-4 py-3 text-center text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                 />
                 <label className="text-gray-900 font-bold text-sm min-w-[120px] text-right">الاسم الاول</label>
              </div>

              <div className="flex items-center justify-end gap-4">
                 <input 
                   type="text" 
                   defaultValue="يوسف علي"
                   className="flex-1 bg-[#F8F9FB] border border-gray-100 rounded-lg px-4 py-3 text-center text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                 />
                 <label className="text-gray-900 font-bold text-sm min-w-[120px] text-right">الاسم الثاني</label>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-end gap-4">
                 <input 
                   type="text" 
                   defaultValue="31289123223"
                   className="flex-1 bg-[#F8F9FB] border border-gray-100 rounded-lg px-4 py-3 text-center text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                 />
                 <label className="text-gray-900 font-bold text-sm min-w-[120px] text-right">رقم البريد</label>
              </div>

              <div className="flex items-center justify-end gap-4">
                 <input 
                   type="text" 
                   defaultValue="82378121821"
                   className="flex-1 bg-[#F8F9FB] border border-gray-100 rounded-lg px-4 py-3 text-center text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                 />
                 <label className="text-gray-900 font-bold text-sm min-w-[120px] text-right">كود المزاد</label>
              </div>
           </div>

           {/* Submit Button */}
           <div className="mt-12 flex justify-end">
              <button className="bg-[#F2A925] hover:bg-orange-500 text-white font-bold px-12 py-3 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer text-lg">
                 حفظ
              </button>
           </div>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        email={userEmail}
      />
    </div>
  );
}
