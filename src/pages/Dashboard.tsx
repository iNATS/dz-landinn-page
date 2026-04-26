import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Package, ShoppingBag, Settings as SettingsIcon, LayoutGrid, TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard, AppleButton } from "../components/ui/AppleUI";
import { getProducts, getProfile } from "../store";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../types";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();
  const profile = getProfile();
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="min-h-screen pb-24 safe-top bg-[#F2F2F7]">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
            مرحباً، {user?.user_metadata?.company_name || profile?.firstName} 👋
          </h1>
          <p className="text-[#8E8E93] text-[11px] uppercase font-bold tracking-wider">
            لوحة التحكم الخاصة بك
          </p>
        </div>
        <Link to="/settings" className="relative group">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-black/5 bg-white p-0.5 ring-2 ring-emerald-500/0 group-active:ring-emerald-500/20 transition-all">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.email}&background=10B981&color=fff`} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </Link>
      </header>

      <main className="px-6 space-y-6 mt-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="bg-emerald-50/50 border-emerald-500/10 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-100/50">
                <Package className="text-emerald-600" size={18} />
              </div>
              <span className="text-[11px] text-black/40 font-bold uppercase tracking-wider">المنتجات</span>
            </div>
            <div className="text-2xl font-black text-[#1C1C1E]">{products.length}</div>
          </GlassCard>
          <GlassCard className="bg-[#E5E5EA]/30 border-black/5 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-black/5">
                <TrendingUp className="text-[#8E8E93]" size={18} />
              </div>
              <span className="text-[11px] text-black/40 font-bold uppercase tracking-wider">الزيارات</span>
            </div>
            <div className="text-2xl font-black text-[#1C1C1E]">120</div>
          </GlassCard>
        </div>

        {/* Action Button */}
        <AppleButton 
          className="w-full py-6 rounded-[20px] text-lg active-green shadow-none"
          onClick={() => navigate("/product/new")}
        >
          <Plus size={24} />
          إضافة منتج جديد
        </AppleButton>

        {/* Product List */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              منتجاتك
            </h2>
            <Link to="/products" className="text-black/40 font-bold text-[10px] uppercase hover:text-emerald-600 transition-colors">عرض الكل</Link>
          </div>
          
          <div className="space-y-3">
            {products.length === 0 ? (
              <GlassCard className="text-center py-12 flex flex-col items-center border-dashed border-2 border-black/5">
                <LayoutGrid size={48} className="text-[#C7C7CC] mb-4" />
                <p className="text-[#8E8E93] font-semibold">لا توجد منتجات حالياً</p>
                <p className="text-[11px] text-[#AEAEB2] uppercase tracking-wide mt-1">ابدأ بإنشاء أول منتج لك</p>
              </GlassCard>
            ) : (
              products.map((product) => (
                <div key={product.id}>
                  <div 
                    className="flex items-center gap-4 p-3 bg-white rounded-[18px] border border-black/5 active:scale-[0.98] transition-all cursor-pointer"
                    onClick={() => navigate(`/product/edit/${product.id}`)}
                  >
                  <div className="w-16 h-16 rounded-xl bg-[#F2F2F7] flex-shrink-0 overflow-hidden border border-black/5">
                    {product.photos[0] ? (
                      <img src={product.photos[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-full h-full p-4 text-[#C7C7CC]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1C1C1E] truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[17px] font-black text-emerald-600 tabular-nums">{product.price} <small className="text-[10px]">DZD</small></span>
                      {product.isActive ? (
                        <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-black uppercase tracking-tight">نشط</div>
                      ) : (
                        <div className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-[9px] font-black uppercase tracking-tight">مسودة</div>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#C7C7CC] flex-shrink-0" />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-black/5 px-6 py-2.5 flex justify-between items-center safe-bottom z-50">
        <Link to="/dashboard" className="flex-1 flex flex-col items-center gap-1 text-emerald-600">
          <LayoutGrid size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-bold">المنتجات</span>
        </Link>
        <Link to="/products" className="flex-1 flex flex-col items-center gap-1 text-[#8E8E93]">
          <ShoppingBag size={24} strokeWidth={2.2} />
          <span className="text-[10px] font-bold">الطلبات</span>
        </Link>
        <Link to="/analytics" className="flex-1 flex flex-col items-center gap-1 text-[#8E8E93]">
          <TrendingUp size={24} strokeWidth={2.2} />
          <span className="text-[10px] font-bold">الرؤى</span>
        </Link>
        <Link to="/settings" className="flex-1 flex flex-col items-center gap-1 text-[#8E8E93]">
          <SettingsIcon size={24} strokeWidth={2.2} />
          <span className="text-[10px] font-bold">المتجر</span>
        </Link>
      </nav>
    </div>
  );
}
