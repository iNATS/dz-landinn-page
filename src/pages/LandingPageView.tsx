import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Share2, 
  MapPin, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Star, 
  Clock, 
  ShieldAlert, 
  MessageCircle,
  HelpCircle,
  ArrowDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getProducts, getProfile } from "../store";
import { Product, UserProfile } from "../types";
import { AppleButton, cn } from "../components/ui/AppleUI";
import { ALGERIAN_WILAYAS } from "../constants";

export default function LandingPageView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [visitorCount, setVisitorCount] = useState(Math.floor(Math.random() * 20) + 15);
  const [lastOrderTime, setLastOrderTime] = useState(Math.floor(Math.random() * 15) + 5);

  useEffect(() => {
    const p = getProducts().find(item => item.slug === slug);
    if (p) setProduct(p);
    setProfile(getProfile());
    
    if (p?.mainColor) {
      // Force monochrome theme
      document.documentElement.style.setProperty('--color-apple-green', '#000000');
    }

    const visitorInterval = setInterval(() => {
      setVisitorCount(prev => Math.max(10, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);

    return () => clearInterval(visitorInterval);
  }, [slug]);

  const handleOrderSubmit = () => {
    // Save order to localStorage
    const newOrder = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      productId: product.id,
      productName: product.name,
      customerName: "زبون جديد", // In a real app, from state
      customerPhone: "0123456789", // In a real app, from state
      status: "pending",
      totalPrice: product.discountPrice || product.price,
      createdAt: new Date().toISOString(),
      wilaya: selectedWilaya || "16"
    };

    const existingOrders = JSON.parse(localStorage.getItem("ezzy_orders") || "[]");
    localStorage.setItem("ezzy_orders", JSON.stringify([newOrder, ...existingOrders]));

    setShowSuccess(true);
  };

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!product || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 rounded-full border-2 border-black border-t-transparent animate-spin" />
      </div>
    );
  }

  const discountAmount = product.discountPrice ? product.price - product.discountPrice : 0;
  const discountPercent = product.discountPrice ? Math.round((discountAmount / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#1C1C1E] font-sans overflow-x-hidden selection:bg-black/10" dir="rtl">
      {/* Top Floating Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[60] px-4 py-3 bg-white/70 backdrop-blur-xl border-b border-black/5 flex justify-between items-center transition-all text-black">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm font-black">
            {profile.companyName[0]}
          </div>
          <span className="text-[15px] font-bold tracking-tight">{profile.companyName}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert("تم نسخ الرابط!");
            }}
            className="p-2.5 text-[#1C1C1E] active:scale-95 bg-black/5 rounded-full"
          >
            <Share2 size={18} />
          </button>
          <AppleButton 
            onClick={scrollToForm}
            className="h-10 px-6 py-0 rounded-full text-[13px] font-bold bg-[#1C1C1E] text-white border-none"
          >
            اطلب الآن
          </AppleButton>
        </div>
      </nav>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] p-8 w-full max-w-sm text-center border border-black/5"
            >
              <div className="w-16 h-16 bg-black/5 text-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} strokeWidth={3} />
              </div>
              <h2 className="text-xl font-black mb-2 text-[#1C1C1E]">شكراً لثقتك بنا!</h2>
              <p className="text-[#8E8E93] text-[15px] font-medium mb-8 leading-relaxed">
                لقد استلمنا طلبك بنجاح. سنقوم بالاتصال بك قريباً على الرقم الذي زودتنا به لتأكيد الطلب.
              </p>
              <AppleButton className="w-full h-12 text-[15px] font-black tracking-tight" onClick={() => setShowSuccess(false)}>حسناً، فهمت</AppleButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16 pb-24">
        {/* Banner Section / Counter */}
        <div className="bg-black/5 py-2 px-4 flex items-center justify-center gap-2 overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse shrink-0" />
          <p className="text-black text-[11px] font-bold tracking-tight whitespace-nowrap">
            {visitorCount} أشخاص يشاهدون هذا المنتج الآن • آخر طلب منذ {lastOrderTime} دقائق
          </p>
        </div>

        {/* Hero Slider */}
        <div className="relative bg-white border-b border-black/5">
          <div className="aspect-square relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.photos[activeImage] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-contain p-8"
              />
            </AnimatePresence>
            
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
              <button 
                onClick={() => setActiveImage(prev => (prev > 0 ? prev - 1 : product.photos.length - 1))}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-black/5 flex items-center justify-center text-[#1C1C1E] active:scale-95 pointer-events-auto"
              >
                <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => setActiveImage(prev => (prev < product.photos.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-black/5 flex items-center justify-center text-[#1C1C1E] active:scale-95 pointer-events-auto"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center gap-1.5 pb-6">
            {product.photos.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeImage === i ? "w-8 bg-black" : "w-1.5 bg-black/10"
                )} 
              />
            ))}
          </div>
        </div>

        {/* Main Product Details */}
        <div className="px-6 py-8 space-y-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[13px] font-bold text-[#8E8E93] underline">(١٢٠ تقييم)</span>
            </div>
            
            <h1 className="text-2xl font-black text-[#1C1C1E] leading-tight mb-2">
              {product.name}
            </h1>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-black">
                  {(product.discountPrice || product.price).toLocaleString()} <small className="text-sm font-bold">دج</small>
                </span>
                {product.discountPrice && (
                  <span className="text-lg text-[#AEAEB2] line-through font-bold">
                    {product.price.toLocaleString()} دج
                  </span>
                )}
              </div>
              {discountPercent > 0 && (
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-tight">
                    توفير {discountPercent}%
                  </div>
                  <span className="text-black/40 text-[11px] font-bold">عرض محدود ينتهي قريباً!</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Features */}
          <div className="bg-black/5 rounded-3xl p-5 border border-black/5 flex justify-between items-center">
            <div className="flex flex-col items-center gap-1 text-center">
              <ShieldCheck size={20} className="text-black" />
              <span className="text-[10px] font-black text-black uppercase tracking-tight">ضمان ١٠٠٪</span>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck size={20} className="text-black" />
              <span className="text-[10px] font-black text-black uppercase tracking-tight">توصيل سريع</span>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="flex flex-col items-center gap-1 text-center">
              <RotateCcw size={20} className="text-black" />
              <span className="text-[10px] font-black text-black uppercase tracking-tight">إرجاع سهل</span>
            </div>
          </div>

          <AppleButton 
            onClick={scrollToForm}
            className="w-full h-[54px] rounded-[18px] text-[16px] font-black bg-[#1C1C1E] text-white flex items-center justify-center gap-3 border-none hover:bg-black active:scale-95 transition-all"
          >
            اطلب الآن وادفع عند الاستلام
            <ArrowDown size={20} className="animate-bounce" />
          </AppleButton>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 opacity-40 py-4 scale-90">
             <div className="h-4 w-12 bg-black rounded" />
             <div className="h-4 w-12 bg-black rounded" />
             <div className="h-4 w-12 bg-black rounded" />
          </div>

          {/* Description Section */}
          <section className="space-y-6 pt-8 border-t border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-black rounded-full" />
              <h2 className="text-lg font-black text-[#1C1C1E]">لماذا تشتري هذا المنتج؟</h2>
            </div>
            
            <p className="text-[16px] text-[#48484A] leading-[1.8] font-medium whitespace-pre-line">
              {product.description}
            </p>

            {/* Visual Detail Points */}
            <div className="grid gap-4">
              {[
                { title: "جودة استثنائية", desc: "تم اختيار هذا المنتج بعناية فائقة لضمان أفضل جودة لمستخدمينا.", icon: Check },
                { title: "سهولة الاستخدام", desc: "تصميم مريح وبسيط يناسب جميع احتياجاتك اليومية.", icon: Check },
                { title: "توفير حقيقي", desc: "أفضل قيمة مقابل السعر في السوق الجزائري حالياً.", icon: Check }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-white border border-black/5 rounded-[24px]">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black">
                    <item.icon size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] mb-1">{item.title}</h3>
                    <p className="text-[13px] text-[#8E8E93] leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Order */}
          <section className="space-y-6 pt-12">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-black tracking-tight">طريقة الطلب سهلة جداً</h2>
              <p className="text-[13px] text-[#8E8E93] font-bold uppercase tracking-widest leading-none">٣ خطوات فقط للحصول على منتجك</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { step: "١", label: "املأ البيانات", desc: "اكتب اسمك وهاتفك" },
                { step: "٢", label: "نؤكد الطلب", desc: "نتصل بك هاتفياً" },
                { step: "٣", label: "الاستلام", desc: "الدفع عند الباب" }
              ].map(st => (
                <div key={st.step} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-black">
                    {st.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[13px] font-black">{st.label}</h4>
                    <p className="text-[10px] text-[#8E8E93] font-medium leading-tight">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 pt-12">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-black" size={24} />
              <h2 className="text-lg font-black text-[#1C1C1E]">الأسئلة الشائعة</h2>
            </div>
            <div className="space-y-3">
              {[
                { q: "متى يصل المنتج؟", a: "يستغرق التوصيل عادةً بين ٢٤ إلى ٤٨ ساعة عمل لجميع الولايات." },
                { q: "هل الدفع آمن؟", a: "نعم، الدفع يتم فقط عند استلامك للمنتج وفحصه." },
                { q: "ماذا لو لم يعجبني المنتج؟", a: "يمكنك إرجاع المنتج بكل سهولة حسب سياسة المتجر الموضحة أدناه." }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-black/5 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 list-none cursor-pointer font-bold text-[14px]">
                    {faq.q}
                    <ChevronLeft size={16} className="text-[#8E8E93] transition-transform group-open:-rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 text-[13px] text-[#8E8E93] font-medium leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 gap-4 py-8">
            <div className="text-center space-y-1">
              <p className="text-2xl font-black text-[#1C1C1E]">٥٠٠+</p>
              <p className="text-[11px] font-black text-black uppercase tracking-widest">زبون سعيد</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-2xl font-black text-[#1C1C1E]">٥٨</p>
              <p className="text-[11px] font-black text-black uppercase tracking-widest">ولاية نشحن إليها</p>
            </div>
          </div>

          {/* The Order Form */}
          <section id="order-form" className="pt-8">
            <div className="bg-white rounded-[32px] p-8 space-y-8 text-[#1C1C1E] border border-black/5 relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 blur-3xl rounded-full translate-x-12 -translate-y-12" />
              
              <div className="text-center space-y-2 relative">
                <h2 className="text-xl font-black">أدخل معلوماتك للطلب</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  <p className="text-black/40 text-[10px] font-black uppercase tracking-widest leading-none">خدمة التوصيل سريعة جداً</p>
                </div>
              </div>
              
              <div className="space-y-5 relative">
                <div className="space-y-2">
                  <label className="text-[11px] text-black/30 font-black uppercase tracking-widest mr-2">الاسم بالكامل</label>
                  <input type="text" className="w-full h-12 bg-black/5 border border-black/10 rounded-2xl px-6 outline-none font-bold text-[#1C1C1E] focus:bg-black/10 focus:border-black/50 transition-all placeholder:text-black/10" placeholder="مثال: عمر بن بوزيد" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-black/30 font-black uppercase tracking-widest mr-2">رقم الهاتف</label>
                  <input type="tel" className="w-full h-12 bg-black/5 border border-black/10 rounded-2xl px-6 outline-none font-bold text-[#1C1C1E] text-left focus:bg-black/10 focus:border-black/50 transition-all placeholder:text-black/10" placeholder="0XXXXX XXXX" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-black/30 font-black uppercase tracking-widest mr-2">الولاية</label>
                  <div className="relative">
                    <select 
                      value={selectedWilaya}
                      onChange={(e) => setSelectedWilaya(e.target.value)}
                      className="w-full h-12 bg-black/5 border border-black/10 rounded-2xl px-6 outline-none font-bold text-[#1C1C1E] appearance-none focus:bg-black/10 focus:border-black/50 transition-all cursor-pointer"
                    >
                      <option value="" className="text-black">اختر ولايتك هنا</option>
                      {ALGERIAN_WILAYAS.map(w => (
                        <option key={w.code} value={w.code} className="text-black">{w.code} - {w.nameAr}</option>
                      ))}
                    </select>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                      <ChevronLeft size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/5 p-5 rounded-2xl border border-black/5 space-y-3">
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-black/40">سعر المنتج</span>
                  <span>{(product.discountPrice || product.price).toLocaleString()} دج</span>
                </div>
                <div className="flex justify-between text-[13px] font-bold">
                  <span className="text-black/40">سعر التوصيل</span>
                  <span className="text-black">حسب الولاية</span>
                </div>
                <div className="w-full h-px bg-black/5" />
                <div className="flex justify-between text-[15px] font-black">
                  <span>المجموع</span>
                  <span className="text-black">الدفع عند الاستلام</span>
                </div>
              </div>

              <AppleButton 
                className="w-full h-[58px] rounded-[18px] text-[17px] font-black bg-black hover:bg-black/80 text-white border-none transform active:scale-95 transition-all flex items-center justify-center gap-3"
                onClick={handleOrderSubmit}
              >
                <ShoppingCart size={24} strokeWidth={3} />
                أرسل طلبي الآن
              </AppleButton>
              
              <div className="text-center space-y-1">
                 <p className="text-[10px] text-black/20 font-bold uppercase tracking-widest leading-relaxed">سنتصل بك لتأكيد طلبك قبل الشحن مباشرة</p>
                 <div className="flex items-center justify-center gap-2 opacity-20 bg-black/10 p-2 rounded-xl mt-4">
                   <ShieldAlert size={12} />
                   <span className="text-[9px] font-black uppercase tracking-tight">معلوماتك مشفرة ومحمية ١٠٠٪</span>
                 </div>
              </div>
            </div>
          </section>

          {/* Policies Footer */}
          <footer className="pt-20 border-t border-black/5 flex flex-col items-center gap-8">
            <div className="flex gap-6">
              <button className="text-[12px] font-bold text-[#8E8E93] hover:text-[#1C1C1E] transition-colors">سياسة الإرجاع</button>
              <span className="text-black/5">|</span>
              <button className="text-[12px] font-bold text-[#8E8E93] hover:text-[#1C1C1E] transition-colors">سياسة الخصوصية</button>
              <span className="text-black/5">|</span>
              <button className="text-[12px] font-bold text-[#8E8E93] hover:text-[#1C1C1E] transition-colors">اتصل بنا</button>
            </div>
            
            <div className="flex items-center gap-4 grayscale opacity-30 brightness-50">
               <div className="w-12 h-6 bg-black/10 rounded" />
               <div className="w-12 h-6 bg-black/10 rounded" />
               <div className="w-12 h-6 bg-black/10 rounded" />
               <div className="w-12 h-6 bg-black/10 rounded" />
            </div>
            
            <div className="text-center space-y-2 pb-12">
              <p className="text-[10px] text-[#AEAEB2] font-black uppercase tracking-[0.2em]">Copyright © {new Date().getFullYear()} {profile.companyName}</p>
              <div className="flex items-center justify-center gap-1.5 text-black/20">
                <span className="text-[10px] font-black uppercase tracking-widest italic">Powered by Ezzy Store</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Persistent Bottom Bar for Mobile Only */}
      <div className="sm:hidden fixed bottom-6 left-6 right-6 z-50">
        <AppleButton 
          onClick={scrollToForm}
          className="w-full h-[56px] rounded-[18px] text-[15px] font-black bg-[#1C1C1E] text-white flex items-center justify-between px-8 border-none"
        >
          <span>اطلب الآن</span>
          <div className="flex items-center gap-3">
            <span className="text-white/60">{(product.discountPrice || product.price).toLocaleString()} دج</span>
            <ArrowDown size={18} />
          </div>
        </AppleButton>
      </div>
    </div>
  );
}
