"use client";

import { useState } from "react";
import ProjectManagerView from "./components/ProjectManagerView";
import ChairmanView from "./components/ChairmanView";
import SecretaryView from "./components/SecretaryView";

export default function InfathAuctionsPage() {
  const [activeTab, setActiveTab] = useState("project-manager");

  return (
    <div className="flex flex-col h-full overflow-hidden p-4" dir="rtl">
      {/* Role Switcher */}
      <div className="mb-4 flex justify-center shrink-0" dir="ltr">
        <div className="bg-[#F8F9FB] p-1 rounded-full flex items-center gap-1 border border-gray-100/50">
           <button 
             onClick={() => setActiveTab("committee-secretary")}
             className={`px-10 py-2.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
               activeTab === "committee-secretary" 
               ? "bg-[#E85D2A] text-white shadow-lg shadow-orange-200" 
               : "text-gray-500 hover:text-gray-700"
             }`}
           >
             امين اللجنة
           </button>
           <button 
             onClick={() => setActiveTab("committee-chairman")}
             className={`px-10 py-2.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
               activeTab === "committee-chairman" 
               ? "bg-[#E85D2A] text-white shadow-lg shadow-orange-200" 
               : "text-gray-500 hover:text-gray-700"
             }`}
           >
             رئيس اللجنة
           </button>
           <button 
             onClick={() => setActiveTab("project-manager")}
             className={`px-12 py-2.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
               activeTab === "project-manager" 
               ? "bg-[#E85D2A] text-white shadow-lg shadow-orange-200" 
               : "text-gray-500 hover:text-gray-700"
             }`}
           >
             مدير مشروع
           </button>
        </div>
      </div>

      {/* View Content */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {activeTab === "project-manager" && <ProjectManagerView />}
        {activeTab === "committee-chairman" && <ChairmanView />}
        {activeTab === "committee-secretary" && <SecretaryView />}
      </div>
    </div>
  );
}
