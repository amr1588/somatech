"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier") || "+966 50 *** **44";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    if (otp.some(digit => digit === "")) {
      alert("يرجى إدخال رمز التحقق كاملاً (4 أرقام)");
      return;
    }
    console.log("OTP:", otp.join(""));
    router.replace("/reset-password");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-cairo overflow-hidden" dir="rtl">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/tower-buildings.png" 
          alt="Verify Background" 
          layout="fill" 
          objectFit="cover"
          className="brightness-50 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-[#171D5B]/70"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center py-12 px-6">
        
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center">
            <div className="relative flex items-end">
              <span className="text-5xl font-black tracking-tight leading-[0.8] mb-1 text-white">سومتك</span>
              <span className="absolute top-1 right-[70px] w-3.5 h-3.5 bg-brand-gold rounded-sm rotate-45 border-2 border-[#171D5B]"></span>
            </div>
            <div className="flex flex-col items-center gap-1 mt-3">
              <span className="text-brand-gold font-bold text-2xl tracking-[0.3em] leading-none mb-1">SOUMTECH</span>
              <div className="flex flex-col items-center opacity-90">
                <span className="text-sm font-medium leading-tight text-white/90">المنصة الوطنية للمزادات</span>
                <span className="text-xs font-light leading-tight uppercase tracking-tight text-white/70">National Auctioning Platform</span>
              </div>
            </div>
            <div className="w-12 h-px bg-white/20 mt-6"></div>
        </div>

        {/* Verification Card */}
        <div className="w-full max-w-[500px] bg-white rounded-md p-10 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-blue mb-3">استعادة كلمة المرور</h1>
            <p className="text-gray-400 text-sm font-bold leading-relaxed">
              تم إرسال رمز التحقق إلى <span className="text-brand-blue" dir="ltr">{identifier}</span>
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* OTP Input Row */}
            <div className="flex justify-center gap-9" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-16 h-16 bg-gray-200 rounded-2xl text-center text-2xl font-black text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                />
              ))}
            </div>

            {/* Resend Timer */}
            <div className="text-center">
              <button 
                disabled={timer > 0}
                className={`text-sm font-bold transition-colors ${timer > 0 ? 'text-gray-400 cursor-default' : 'text-brand-orange hover:underline cursor-pointer'}`}
              >
                إعادة إرسال رمز التحقق في <span className="text-brand-blue font-black" dir="ltr">00:{timer.toString().padStart(2, '0')}</span>
              </button>
            </div>

            {/* Confirm Button */}
            <div className="pt-4">
              <button 
                onClick={handleConfirm}
                className="w-full bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-gold/20 transition-all cursor-pointer text-lg active:scale-95"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16 flex items-center gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <Image src="/elhy2aEl3ama.png" alt="REGA" width={180} height={90} className="object-contain" />
           <Image src="/mazaya_Alfedhiyah.png" alt="Infath" width={180} height={90} className="object-contain" />
        </div>

      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-cairo" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          <span className="text-brand-blue font-bold">جاري التحميل...</span>
        </div>
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
