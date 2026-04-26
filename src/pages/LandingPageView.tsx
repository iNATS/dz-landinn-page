import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Share2, MapPin, Truck, RotateCcw, ShieldCheck, Heart, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getProducts, getProfile } from "../store";
import { Product, UserProfile } from "../types";
import { GlassCard, AppleButton, cn } from "../components/ui/AppleUI";
import { ALGERIAN_WILAYAS } from "../constants";

export default function LandingPageView() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [showPolicies, setShowPolicies] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const p = getProducts().find(item => item.slug === slug);
    if (p) setProduct(p);
    setProfile(getProfile());
    
    // Set theme color if product permits
    if (p?.mainColor) {
      document.documentElement.style.setProperty('--color-apple-green', p.mainColor);
    }
  }, [slug]);

  const handleOrderSubmit = () => {
    setShowSuccess(true);
    // In a real app, this would send an API request
  };

  if (!product || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const discountAmount = product.discountPrice ? product.price - product.discountPrice : 0;
  const discountPercent = product.discountPrice ? Math.round((discountAmount / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-[#1C1C1E] safe-bottom" dir="rtl">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[32px] p-8 w-full max-w-sm text-center shadow-none border border-black/[0.05]"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Check size={40} />
              </div>
              <h2 className="text-2xl font-black mb-2">تم استلام طلبك!</h2>
              <p className="text-black/40 font-medium mb-8">سنتصل بك قريباً للتأكيد على رقم هاتفك.</p>
              <AppleButton className="w-full shadow-none" onClick={() => setShowSuccess(false)}>حسناً</AppleButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Product Image Slider */}
      <div className="relative w-full aspect-square bg-[#F2F2F7]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={product.photos[activeImage] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>
        
        {/* Slider Controls */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
          <button 
            onClick={() => setActiveImage(prev => (prev > 0 ? prev - 1 : product.photos.length - 1))}
            className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-black border border-black/[0.05]"
          >
            <ChevronRight />
          </button>
          <button 
            onClick={() => setActiveImage(prev => (prev < product.photos.length - 1 ? prev + 1 : 0))}
            className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-black border border-black/[0.05]"
          >
            <ChevronLeft />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
          {product.photos.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all",
                activeImage === i ? "w-6 bg-emerald-500" : "w-1.5 bg-black/20"
              )} 
            />
          ))}
        </div>

        {/* Top Actions */}
        <div className="absolute top-6 inset-x-6 flex justify-between">
          <button onClick={() => window.history.back()} className="p-3 bg-white/80 backdrop-blur-md rounded-full border border-black/[0.05]">
            <ChevronRight />
          </button>
          <div className="flex gap-2">
            <button className="p-3 bg-white/80 backdrop-blur-md rounded-full border border-black/[0.05]">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-md rounded-full border border-black/[0.05]">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="px-6 py-8 space-y-6">
        <section>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-black leading-tight flex-1">{product.name}</h1>
            {discountPercent > 0 && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold leading-none mt-1">
                تخفيض {discountPercent}%
              </span>
            )}
          </div>
          
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-emerald-600">
              {product.discountPrice || product.price} <small className="text-sm font-bold">دج</small>
            </span>
            {product.discountPrice > 0 && (
              <span className="text-lg text-black/20 line-through font-bold">
                {product.price} دج
              </span>
            )}
          </div>
        </section>

        {/* Brand Info */}
        <GlassCard className="flex items-center gap-3 p-3 bg-[#F2F2F7] border-black/[0.05]">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
            {profile.companyName[0]}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold">{profile.companyName}</h3>
            <p className="text-[10px] text-black/40 font-medium">{profile.location} • شحن لجميع الولايات</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold">متجر موثوق</span>
          </div>
        </GlassCard>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-[#F2F2F7] rounded-2xl border border-black/[0.05]">
            <Truck size={20} className="text-emerald-600" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold">توصيل سريع</span>
              <span className="text-[8px] text-black/40">لجميع الولايات</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-[#F2F2F7] rounded-2xl border border-black/[0.05]">
            <RotateCcw size={20} className="text-emerald-600" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold">إرجاع سهل</span>
              <span className="text-[8px] text-black/40">حسب سياسة المتجر</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <section>
          <h2 className="text-lg font-bold mb-3">وصف المنتج</h2>
          <p className="text-black/60 leading-relaxed text-sm">
            {product.description}
          </p>
        </section>

        {/* Ordering Form */}
        <section className="bg-black/5 rounded-[32px] p-8 space-y-6 border border-black/[0.05]">
          <h2 className="text-xl font-bold text-center">أطلب الآن والدفع عند الاستلام</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-1.5 block">الاسم الكامل</label>
              <input type="text" className="w-full h-14 bg-white border border-black/[0.05] rounded-2xl px-4 outline-none font-bold focus:border-emerald-500/50" placeholder="أدخل اسمك الكامل" />
            </div>
            <div>
              <label className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-1.5 block">رقم الهاتف</label>
              <input type="tel" className="w-full h-14 bg-white border border-black/[0.05] rounded-2xl px-4 outline-none font-bold text-left focus:border-emerald-500/50" placeholder="0XXXXX XXXX" dir="ltr" />
            </div>
            <div>
              <label className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-1.5 block">الولاية</label>
              <select 
                value={selectedWilaya}
                onChange={(e) => setSelectedWilaya(e.target.value)}
                className="w-full h-14 bg-white border border-black/[0.05] rounded-2xl px-4 outline-none font-bold appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat focus:border-emerald-500/50"
              >
                <option value="">اختر ولايتك</option>
                {ALGERIAN_WILAYAS.map(w => (
                  <option key={w.code} value={w.code}>{w.code} - {w.nameAr}</option>
                ))}
              </select>
            </div>
          </div>

          <AppleButton className="w-full py-10 rounded-[28px] text-2xl shadow-none" onClick={handleOrderSubmit}>
            <ShoppingCart size={24} />
            أطلب الآن - اضغط هنا
          </AppleButton>
          
          <p className="text-[10px] text-center text-black/20 font-black uppercase tracking-widest">سنتصل بك لتأكيد طلبك قبل الشحن</p>
        </section>

        {/* Policies Footer */}
        <footer className="pt-8 border-t border-black/[0.05] flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <button onClick={() => setShowPolicies(true)} className="text-xs font-bold text-black/40">سياسة الإرجاع</button>
            <span className="text-black/10">|</span>
            <button onClick={() => setShowPolicies(true)} className="text-xs font-bold text-black/40">الشروط والأحكام</button>
          </div>
          
          <div className="flex items-center gap-2 grayscale opacity-50">
             {/* Simple icons for partners */}
             <div className="w-12 h-6 bg-black/5 rounded" />
             <div className="w-12 h-6 bg-black/5 rounded" />
             <div className="w-12 h-6 bg-black/5 rounded" />
          </div>
          
          <p className="text-[10px] text-black/20 font-medium">© {new Date().getFullYear()} {profile.companyName} - صنع بكل حب في الجزائر 🇩🇿</p>
        </footer>
      </div>

      {/* Floating Checkout Header (On Scroll) */}
      {/* This would be implemented with framer motion scroll progress */}
    </div>
  );
}
