import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-transparent flex items-center justify-between px-8 ms-24 py-2" dir="ltr">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-brand-gold font-medium mb-0.5">مرحباً</p>
          <p className="text-sm font-bold text-gray-800">محمد مصطفى</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex items-center justify-center">
          {/* Placeholder for Profile Image */}
          <User className="text-gray-400" size={24} />
        </div>
      </div>
      
      {/* Search or other header elements can go here if needed */}
      <div></div>
    </header>
  );
}
