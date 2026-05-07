import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#1A225B] p-4 overflow-hidden gap-6" dir="rtl">
      {/* Sidebar on the right (First child in RTL) */}
      <Sidebar />

      {/* Main Content Area in a white rounded container (Second child in RTL) */}
      <div className="flex-1 flex flex-col bg-white rounded-[20px] shadow-2xl overflow-hidden relative">
        <Header />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
