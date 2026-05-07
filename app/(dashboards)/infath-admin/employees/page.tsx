"use client";
import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  Plus, 
  EllipsisVertical,
  ChevronRight,
  ChevronLeft,
  FileText,
  Download,
  X
} from "lucide-react";
import Image from "next/image";

interface Employee {
  id: number;
  name: string;
  email: string;
  job: string;
  auctions: number;
}

const initialEmployees: Employee[] = [
  { id: 1, name: "مصطفي محمود علي", email: "abdulrhman21@gmail.com", job: "مدير", auctions: 120 },
  { id: 2, name: "مصطفي محمود علي", email: "abdulrhman21@gmail.com", job: "مفوض", auctions: 120 },
  { id: 3, name: "مصطفي محمود علي", email: "abdulrhman21@gmail.com", job: "مدير", auctions: 120 },
  { id: 4, name: "مصطفي محمود علي", email: "abdulrhman21@gmail.com", job: "مدير", auctions: 120 },
  { id: 5, name: "مصطفي محمود علي", email: "abdulrhman21@gmail.com", job: "مدير", auctions: 120 },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  
  const currentEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fatherName: "",
    grandfatherName: "",
    idNumber: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      fatherName: "",
      grandfatherName: "",
      idNumber: "",
      phone: "",
      birthDate: "",
      password: "",
      confirmPassword: ""
    });
  };

  const handleAddEmployee = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      job: "موظف جديد",
      auctions: 0
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    resetForm();
    setIsModalOpen(false);
    
    // Navigate to the last page to see the new entry
    const newTotalPages = Math.ceil(updatedEmployees.length / itemsPerPage);
    setCurrentPage(newTotalPages);
  };

  const openEditModal = (emp: Employee) => {
    setSelectedEmployee(emp);
    const names = emp.name.split(" ");
    setFormData({
      ...formData,
      firstName: names[0] || "",
      lastName: names.slice(1).join(" ") || "",
      email: emp.email,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateEmployee = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? { 
            ...emp, 
            name: `${formData.firstName} ${formData.lastName}`, 
            email: formData.email 
          } 
        : emp
    ));
    resetForm();
    setIsEditModalOpen(false);
  };
  return (
    <div className="p-8 flex flex-col h-full min-h-0">
      {/* Search and Filter Row */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-2 w-full max-w-xl gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <ChevronDown size={20} />
            <span className="text-sm font-medium">معطل</span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <div className="flex-1 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="بحث..." 
              className="w-full outline-none text-right text-sm text-gray-600"
              dir="rtl"
            />
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table Header Row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">تفاصيل الفاتورة</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Plus size={18} />
            <span>اضافة مستخدم</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors shadow-sm">
            <span className="text-[10px] font-bold">XLS</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm">
            <span className="text-[10px] font-bold">PDF</span>
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="flex-1 min-h-0">
        <table className="w-full">
          <thead>
            <tr className="text-right border-b border-gray-100">
              <th className="pb-4 font-medium text-gray-400 text-sm">الاسم</th>
              <th className="pb-4 font-medium text-gray-400 text-sm text-center">الايميل</th>
              <th className="pb-4 font-medium text-gray-400 text-sm text-center">الوظيفة</th>
              <th className="pb-4 font-medium text-gray-400 text-sm text-center">عدد المزادات المسندة</th>
              <th className="pb-4 font-medium text-gray-400 text-sm"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-5 text-right font-bold text-gray-800 text-sm">{emp.name}</td>
                <td className="py-5 text-center text-gray-600 text-sm font-mono">{emp.email}</td>
                <td className="py-5 text-center text-gray-600 text-sm">{emp.job}</td>
                <td className="py-5 text-center font-bold text-gray-800 text-sm">{emp.auctions}</td>
                <td className="py-5 text-left text-gray-400 relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === emp.id ? null : emp.id)}
                    className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                  >
                    <EllipsisVertical size={18} />
                  </button>
                  
                  {activeDropdown === emp.id && (
                    <div className="absolute left-0 top-12 z-10 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button 
                        onClick={() => {
                          openEditModal(emp);
                          setActiveDropdown(null);
                        }}
                        className="w-full px-4 py-2 text-right text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-brand-gold transition-colors cursor-pointer"
                      >
                        تعديل
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* Pagination */}
      <div className="mt-auto pt-6 flex justify-between items-center" dir="ltr">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>السابق</span>
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <span 
              key={page} 
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center text-sm cursor-pointer transition-colors rounded-lg font-bold shadow-sm border ${
                currentPage === page 
                  ? "bg-orange-50 text-orange-600 border-orange-100" 
                  : "text-gray-400 hover:text-gray-800 border-transparent"
              }`}
            >
              {page}
            </span>
          ))}
          {totalPages > 5 && <span className="text-gray-400 px-2">...</span>}
        </div>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>التالي</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">إضافة مستخدم</h2>
              
              <form className="space-y-4" onSubmit={handleAddEmployee}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {/* First Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">الاسم الاول</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="ادخل الاسم" 
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اسم الاب</label>
                    <input 
                      type="text" 
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="ادخل رقم الجوال" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Second Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اسم الجد</label>
                    <input 
                      type="text" 
                      name="grandfatherName"
                      value={formData.grandfatherName}
                      onChange={handleInputChange}
                      placeholder="ادخل الايميل" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اسم العائلة</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="ادخل رقم السجل التجاري" 
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Third Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">البريد الالكتروني</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ادخل الايميل" 
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">رقم بطاقة الأحوال / الإقامة</label>
                    <input 
                      type="text" 
                      placeholder="ادخل رقم السجل التجاري" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Fourth Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">رقم الجوال</label>
                    <input 
                      type="text" 
                      placeholder="ادخل الايميل" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">تاريخ الميلاد</label>
                    <input 
                      type="text" 
                      placeholder="ادخل رقم السجل التجاري" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Fifth Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">كلمة المرور</label>
                    <input 
                      type="password" 
                      placeholder="ادخل الايميل" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اعادة كلمة المرور</label>
                    <input 
                      type="password" 
                      placeholder="ادخل رقم السجل التجاري" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-start gap-4 pt-4" dir="ltr">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-12 py-4 border border-gray-200 rounded-2xl text-gray-400 font-bold hover:bg-gray-300 transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button 
                    type="submit"
                    className=" py-4 bg-brand-gold text-white rounded-2xl font-bold shadow-lg shadow-brand-gold/20 hover:bg-brand-gold/90 transition-all px-24 cursor-pointer"
                  >
                    اضافة
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Edit Employee Modal */}
      {isEditModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">تعديل البيانات</h2>
              
              <form className="space-y-4" onSubmit={handleUpdateEmployee}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {/* First Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">الاسم الاول</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اسم الاب</label>
                    <input 
                      type="text" 
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Second Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اسم الجد</label>
                    <input 
                      type="text" 
                      name="grandfatherName"
                      value={formData.grandfatherName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اسم العائلة</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Third Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">البريد الالكتروني</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">رقم بطاقة الأحوال / الإقامة</label>
                    <input 
                      type="text" 
                      defaultValue="827520332335334" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Fourth Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">رقم الجوال</label>
                    <input 
                      type="text" 
                      placeholder="ادخل الايميل" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">تاريخ الميلاد</label>
                    <input 
                      type="text" 
                      defaultValue="8/9/2000" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>

                  {/* Fifth Row */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">كلمة المرور</label>
                    <input 
                      type="password" 
                      defaultValue="A2421N235352" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700 text-right">اعادة كلمة المرور</label>
                    <input 
                      type="password" 
                      defaultValue="A2421N235352" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-right text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-start gap-4 pt-4" dir="ltr">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-12 py-4 border border-gray-200 rounded-2xl text-gray-400 font-bold hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button 
                    type="submit"
                    className=" py-4 bg-brand-gold text-white rounded-2xl font-bold shadow-lg shadow-brand-gold/20 hover:bg-brand-gold/90 transition-all px-24 cursor-pointer"
                  >
                    اضافة
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
