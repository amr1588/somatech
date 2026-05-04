"use client";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InfathLogo from "@/components/InfathLogo";

// Validation Schema
const RegisterInfathSchema = Yup.object().shape({
  idNumber: Yup.string()
    .matches(/^[0-9]+$/, "يجب إدخال أرقام فقط")
    .min(10, "رقم الهوية/الإقامة يجب ان يكون 10 أرقام")
    .max(10, "رقم الهوية/الإقامة يجب ان يكون 10 أرقام")
    .required("رقم بطاقة الأحوال او الإقامة مطلوب"),
});

export default function RegisterInfathPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [showTimeout, setShowTimeout] = useState(false);

  // Timer logic for Step 2
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setStep(1);
      setTimer(60);
      setShowTimeout(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Hide timeout message after 5 seconds
  useEffect(() => {
    if (showTimeout) {
      const timeout = setTimeout(() => setShowTimeout(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [showTimeout]);

  return (
    <div className="min-h-screen relative flex items-center justify-center font-cairo overflow-hidden" dir="rtl">
      
      {/* Floating Timeout Message */}
      {showTimeout && (
        <div className="absolute top-10 right-10 z-50 animate-fade-in-left">
          <div className="bg-[#FF4D4D] text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 font-bold border-r-4 border-white/20">
            <span className="text-xl">!</span>
            <p>انتهت مهلة التحقق، الرجاء المحاولة من جديد</p>
          </div>
        </div>
      )}

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/tower-buildings.png" 
          alt="Infath Background" 
          layout="fill" 
          objectFit="cover"
          className="brightness-50 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-[#171D5B]/70"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center py-12 px-6">
        
        {/* Top Logo (Soumtech) */}
        <div className="mb-10 flex flex-col items-center">
            <span className="text-white font-black text-5xl leading-none">سومتك</span>
            <span className="text-brand-gold font-bold text-xl tracking-[0.3em] leading-none mt-2">SOUMTECH</span>
            <div className="flex flex-col items-center opacity-70 mt-2">
              <span className="text-xs leading-tight text-white/90">المنصة الوطنية للمزادات</span>
              <span className="text-[10px] leading-tight uppercase text-white/70">National Auctioning Platform</span>
            </div>
        </div>

        {step === 1 ? (
          /* Step 1: ID Entry */
          <div className="w-full max-w-[500px] bg-white rounded-md p-10 md:p-12 shadow-2xl animate-fade-in">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-brand-blue mb-3">تسجيل حساب من خلال إنفاذ</h1>
              <p className="text-gray-400 text-sm font-bold leading-relaxed px-2">
                ادخل رقم بطاقة الأحوال او الإقامة لتسجيل الدخول لإنفاذ
              </p>
            </div>

            <Formik
              initialValues={{ idNumber: "" }}
              validationSchema={RegisterInfathSchema}
              onSubmit={(values) => {
                setStep(2);
                setShowTimeout(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#171D5B] font-bold text-sm pr-1">رقم بطاقة الأحوال او الإقامة</label>
                    <Field 
                      name="idNumber"
                      type="text"
                      placeholder="رقم بطاقة الأحوال او الإقامة"
                      className={`w-full bg-[#F8F9FA] rounded-xl py-4 px-6 text-brand-blue font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 transition-all ${errors.idNumber && touched.idNumber ? 'ring-red-500' : 'focus:ring-brand-gold'}`}
                    />
                    <ErrorMessage name="idNumber" component="div" className="text-red-500 text-xs font-bold pr-1" />
                  </div>

                  <div className="flex flex-row gap-4 pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-lg shadow-lg shadow-brand-gold/20 transition-all cursor-pointer text-sm active:scale-95"
                    >
                      التالي
                    </button>
                    <Link 
                      href="/login"
                      className="flex-1 bg-white border-2 border-brand-gold text-brand-gold font-bold py-4 rounded-lg text-center transition-all text-sm flex items-center justify-center leading-tight relative group hover:text-white overflow-hidden"
                    >
                      <span className="relative z-10">الرجوع</span>
                      <span className="absolute top-0 right-0 bottom-0 w-0 bg-brand-gold group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          /* Step 2: Nafath Verification */
          <div className="w-full max-w-[500px] bg-white rounded-md p-10 md:p-12 shadow-2xl animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-brand-blue mb-4">تسجيل حساب من خلال نفاذ</h1>
              <p className="text-gray-400 text-sm font-bold leading-relaxed px-4">
                لتوثيق معلوماتك وانشاء حساب جديد، فضلا توجه لتطبيق نفاذ، اضغط على "قبول" ثم اختر رقم الطلب الموضح أدناه.
              </p>
            </div>

            {/* Request Number Circle */}
            <div className="flex justify-center my-10">
              <div className="w-32 h-32 rounded-3xl bg-[#FEF3F2] flex items-center justify-center border border-brand-gold/10">
                <span className="text-5xl font-black text-[#E34935]">23</span>
              </div>
            </div>

            <div className="text-center mb-10">
              <p className="text-gray-400 text-sm font-bold">
                تنتهي صلاحية الطلب خلال <span className="text-brand-blue">{timer}</span> ثوان
              </p>
            </div>

            <button 
              onClick={() => setStep(1)}
              className="w-full bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-lg shadow-lg shadow-brand-gold/20 transition-all cursor-pointer text-sm active:scale-95"
            >
              إلغاء
            </button>
          </div>
        )}

        {/* Bottom Partner Logos */}
        <div className="mt-16 flex items-center gap-16 grayscale invert opacity-80 hover:opacity-100 transition-all duration-500">
           <InfathLogo width={120} height={80} />
           <Image src="/elhy2aEl3ama.png" alt="REGA" width={160} height={80} className="object-contain" />
        </div>

      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
