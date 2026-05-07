"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function ChangePasswordModal({ isOpen, onClose, email }: ChangePasswordModalProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", ""]);
      setTimeout(() => inputRefs[0].current?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0B1E]/60 backdrop-blur-[6px] transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-[32px] w-full max-w-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden transform transition-all animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500 ease-out">
        <div className="p-12 flex flex-col items-center text-center">
          <h2 className="text-[32px] font-black text-[#1A1A1A] mb-3">تغيير كلمة المرور</h2>
          <p className="text-[#8E8E8E] text-[16px] mb-12 max-w-[340px] leading-relaxed">
            ادخل الكود المرسل علي البريد الإلكتروني <br/>
            <span className="font-semibold text-[#4A4A4A]">{email}</span>
          </p>

          {/* OTP Inputs */}
          <div className="flex gap-4 mb-14" dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 text-2xl font-bold text-center border-[2px] border-[#F2F4F7] rounded-[16px] focus:border-[#F1A228] focus:bg-orange-50/30 outline-none transition-all duration-200"
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 w-full">
            <button 
              className="flex-1 bg-[#F1A228] hover:bg-[#E09415] text-white font-bold h-14 rounded-xl shadow-[0_10px_20px_rgba(241,162,40,0.2)] transition-all active:scale-[0.97] cursor-pointer"
              onClick={() => {
                console.log("OTP submitted:", otp.join(""));
              }}
            >
              استمرار
            </button>
            <button 
              className="flex-1 bg-white border-[1.5px] border-[#F1A228] text-[#F1A228] font-bold h-14 rounded-xl hover:bg-orange-50/50 transition-all active:scale-[0.97] cursor-pointer"
              onClick={onClose}
            >
              الرجوع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
