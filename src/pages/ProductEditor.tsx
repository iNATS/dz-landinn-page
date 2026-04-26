import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Camera, Palette, FileText, CreditCard, Check, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard, AppleButton, cn } from "../components/ui/AppleUI";
import { getProducts, updateProduct, addProduct, getProfile } from "../store";
import { Product } from "../types";
import { APP_THEME_COLOR } from "../constants";

type Step = "basic" | "appearance" | "media" | "payment";

export default function ProductEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState<Step>("basic");
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    mainColor: APP_THEME_COLOR,
    photos: [],
    isActive: false,
    termsAndConditions: "يخضع شراء هذا المنتج للشروط والأحكام الخاصة بالمتجر.",
    slug: "",
  });

  useEffect(() => {
    if (id) {
      const product = getProducts().find(p => p.id === id);
      if (product) setFormData(product);
    }
  }, [id]);

  const handleSave = () => {
    const finalProduct = {
      ...formData,
      id: id || Math.random().toString(36).substr(2, 9),
      userId: "user-1",
      createdAt: new Date().toISOString(),
      slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || "product-" + Date.now(),
    } as Product;

    if (id) {
      updateProduct(finalProduct);
    } else {
      addProduct(finalProduct);
    }
    navigate("/dashboard");
  };

  const steps: { key: Step; icon: any; label: string }[] = [
    { key: "basic", icon: FileText, label: "المعلومات" },
    { key: "appearance", icon: Palette, label: "المظهر" },
    { key: "media", icon: Camera, label: "الصور" },
    { key: "payment", icon: CreditCard, label: "التفعيل" },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] safe-top pb-10">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <button onClick={() => navigate("/dashboard")} className="p-2 -mr-2 text-black active:opacity-50 transition-opacity">
          <ChevronLeft className="rotate-180" size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-[#1C1C1E]">{id ? "تعديل المنتج" : "إنشاء منتج جديد"}</h1>
        <button onClick={handleSave} className="text-black font-bold text-[17px] active:opacity-50 transition-opacity">حفظ</button>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-6 flex justify-between bg-white/30 border-b border-black/[0.05]">
        {steps.map((s, i) => (
          <div key={s.key} className="flex flex-col items-center gap-1 flex-1 relative">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all z-10",
              step === s.key ? "bg-black text-white" : "bg-white text-black/20 border border-black/[0.05]"
            )}>
              <s.icon size={14} />
            </div>
            <span className={cn("text-[9px] font-black uppercase tracking-widest mt-1", step === s.key ? "text-black" : "text-black/20")}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <main className="px-6 mt-6">
        <AnimatePresence mode="wait">
          {step === "basic" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <GlassCard className="space-y-4 border-black/[0.05]">
                <h2 className="text-sm font-bold text-black mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-black ml-2"></span> معلومات المنتج
                </h2>
                <div>
                  <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">اسم المنتج (العنوان)</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="مثال: ساعة ذكية الترا S9"
                    className="w-full h-12 bg-white border border-black/[0.05] rounded-xl px-4 outline-none font-bold text-[#1C1C1E] focus:border-black/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">السعر الأساسي (DZD)</label>
                    <input 
                      type="number" 
                      value={formData.price || ""}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full h-12 bg-white border border-black/[0.05] rounded-xl px-4 outline-none font-bold text-black focus:border-black/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">سعر التخفيض (DZD)</label>
                    <input 
                      type="number" 
                      value={formData.discountPrice || ""}
                      onChange={e => setFormData({...formData, discountPrice: Number(e.target.value)})}
                      placeholder="اختياري"
                      className="w-full h-12 bg-white border border-black/[0.05] rounded-xl px-4 outline-none font-bold text-[#1C1C1E] focus:border-black/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">الوصف المختصر</label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="اكتب وصفاً جذاباً لمنتجك..."
                    className="w-full bg-white border border-black/[0.05] rounded-xl p-4 outline-none font-medium text-[#1C1C1E] focus:border-black/50"
                  />
                </div>
              </GlassCard>
              <AppleButton className="w-full h-12" onClick={() => setStep("appearance")}>
                التالي: المظهر والستايل
              </AppleButton>
            </motion.div>
          )}

          {step === "appearance" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <GlassCard className="space-y-6 border-black/[0.05]">
                <h2 className="text-sm font-bold text-black">المظهر وتجربة المستخدم</h2>
                <div>
                  <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">لون الصفحة الرئيسي</label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {["#000000", "#1C1C1E", "#48484A", "#8E8E93", "#AEAEB2", "#C7C7CC", "#D1D1D6", "#E5E5EA", "#F2F2F7"].map(color => (
                        <button
                          key={color}
                          onClick={() => setFormData({...formData, mainColor: color})}
                          className={cn(
                            "w-10 h-10 rounded-full border-2 transition-all flex-shrink-0",
                            formData.mainColor === color ? "border-white scale-110" : "border-black/5 scale-100"
                          )}
                          style={{ backgroundColor: color }}
                        />
                    ))}
                    <button className="w-10 h-10 rounded-full border border-black/[0.05] bg-white flex items-center justify-center text-black/20 flex-shrink-0">+</button>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl border border-black/[0.05] bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#1C1C1E]">تأثير الزجاج (Glassmorphism)</span>
                    <div className="w-10 h-5 bg-black rounded-full relative p-1 cursor-pointer">
                      <div className="w-3 h-3 bg-white rounded-full mr-auto" />
                    </div>
                  </div>
                  <p className="text-[10px] text-black/40 font-medium">سيتم تطبيق تأثير شفاف وجمالي احترافي على جميع مكونات صفحة الهبوط.</p>
                </div>
              </GlassCard>
              
              <div className="flex gap-4">
                <AppleButton variant="secondary" className="flex-1" onClick={() => setStep("basic")}>السابق</AppleButton>
                <AppleButton className="flex-[2]" onClick={() => setStep("media")}>التالي: صور المنتج</AppleButton>
              </div>
            </motion.div>
          )}

          {step === "media" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <GlassCard className="space-y-4 border-black/[0.05]">
                <h2 className="text-sm font-bold text-black">معرض الصور</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(formData.photos || []).map((photo, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-black/[0.05]">
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setFormData({...formData, photos: formData.photos?.filter((_, idx) => idx !== i)})}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                        const url = prompt("أدخل رابط الصورة");
                        if(url) setFormData({...formData, photos: [...(formData.photos || []), url]});
                    }}
                    className="aspect-square rounded-2xl border-2 border-dashed border-black/[0.05] flex flex-col items-center justify-center text-black/20 gap-2 hover:bg-white transition-all"
                  >
                    <Camera size={32} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">إضافة صورة</span>
                  </button>
                </div>
                <p className="text-[10px] text-center text-black/20 font-bold uppercase tracking-widest">أقصى حد ٥ صور عالية الجودة</p>
              </GlassCard>
              
              <div className="flex gap-4">
                <AppleButton variant="secondary" className="flex-1" onClick={() => setStep("appearance")}>السابق</AppleButton>
                <AppleButton className="flex-[2]" onClick={() => setStep("payment")}>التالي: الشحن والدفع</AppleButton>
              </div>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <GlassCard className="space-y-6 border-black/[0.05]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                    <ShieldAlert size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C1E]">تفعيل صفحة المنتج</h3>
                  <p className="text-black/40 text-[10px] uppercase font-bold tracking-wider mt-1 px-4 text-center">
                    دفع رسوم رمزية لتفعيل الصفحة وربطها بخدمات الشحن في الجزائر
                  </p>
                </div>

                <div className="bg-[#F2F2F7] rounded-2xl p-6 border border-black/[0.05]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-black/60 text-xs font-bold uppercase">قيمة التفعيل</span>
                    <span className="text-2xl font-black text-black tracking-tighter">2,000 دج</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-black/60">
                      <Check size={14} className="text-black" />
                      <span>صفحة هبوط احترافية متجاوزة (RTL)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-black/60">
                      <Check size={14} className="text-black" />
                      <span>تكامل مع Yalidine / Nord-et-Sud</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-black/60">
                      <Check size={14} className="text-black" />
                      <span>تتبع التحويلات (Pixels & API)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <AppleButton className="w-full bg-[#E4001B] active:bg-[#AF0011] h-12 border-none">
                    بريدي موب (BaridiMob)
                  </AppleButton>
                  <AppleButton className="w-full bg-[#00AEEF] active:bg-[#0089bd] h-12 border-none">
                    بطاقة ذهبية / CIB (Chargily)
                  </AppleButton>
                </div>
              </GlassCard>
              
              <div className="flex gap-4">
                <AppleButton variant="secondary" className="flex-1" onClick={() => setStep("media")}>السابق</AppleButton>
                <AppleButton className="flex-[2]" onClick={handleSave}>
                  تفعيل الصفحة الآن
                </AppleButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
