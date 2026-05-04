"use client";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Validation Schema
const ForgotPasswordSchema = Yup.object().shape({
  identifier: Yup.string()
    .required("رقم الجوال او الايميل مطلوب"),
});

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex items-center justify-center font-cairo overflow-hidden" dir="rtl">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/tower-buildings.png" 
          alt="Recovery Background" 
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
              <span className="absolute top-1 right-[17.5px] w-3.5 h-3.5 bg-brand-gold rounded-sm rotate-45 border-2 border-[#171D5B]"></span>
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

        {/* Recovery Card */}
        <div className="w-full max-w-[500px] bg-white rounded-md p-10 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-blue mb-3">استعادة كلمة المرور</h1>
            <p className="text-gray-400 text-sm font-bold leading-relaxed px-4">
              ادخل رقم الجوال او الايميل لارسال رمز استعادة كلمة المرور
            </p>
          </div>

          <Formik
            initialValues={{ identifier: "" }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => {
              console.log(values);
              router.push(`/verify-otp?identifier=${encodeURIComponent(values.identifier)}`);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-8">
                
                {/* Identifier Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#171D5B] font-bold text-sm pr-1">رقم الجوال او الايميل</label>
                  <Field 
                    name="identifier"
                    type="text"
                    placeholder="ادخل رقم الجوال او الايميل"
                    className={`w-full bg-[#F8F9FA] rounded-xl py-4 px-6 text-brand-blue font-bold placeholder:text-gray-300 focus:outline-none focus:ring-2 transition-all ${errors.identifier && touched.identifier ? 'ring-red-500' : 'focus:ring-brand-gold'}`}
                  />
                  <ErrorMessage name="identifier" component="div" className="text-red-500 text-xs font-bold pr-1" />
                </div>

                {/* Buttons Row */}
                <div className="flex flex-row-reverse gap-4 pt-4" dir="ltr">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-brand-gold hover:bg-yellow-500 text-white font-black py-4 rounded-lg shadow-lg shadow-brand-gold/20 transition-all cursor-pointer text-sm active:scale-95"
                  >
                    استمرار
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
