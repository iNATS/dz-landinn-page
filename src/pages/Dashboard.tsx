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
      <header className="px-6 py-8 flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-black/[0.05]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">مرحباً، {user?.user_metadata?.company_name || profile?.firstName} 👋</h1>
          <p className="text-black/40 text-[10px] uppercase font-bold tracking-wider">لوحة التحكم الخاصة بك</p>
        </div>
        <Link to="/settings">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-black/[0.05] bg-white p-0.5">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.email}&background=10B981&color=fff`} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </Link>
      </header>

      <main className="px-6 space-y-8 mt-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="bg-emerald-500/5 border-emerald-500/10">
            <div className="p-1 rounded-lg bg-emerald-500/10 w-fit mb-3">
              <Package className="text-emerald-600" size={20} />
            </div>
            <div className="text-2xl font-bold text-[#1C1C1E]">{products.length}</div>
            <div className="text-[10px] text-black/40 font-bold uppercase tracking-wider">المنتجات الكلية</div>
          </GlassCard>
          <GlassCard className="bg-white/50 border-black/[0.05]">
            <div className="p-1 rounded-lg bg-black/5 w-fit mb-3">
              <TrendingUp className="text-black/60" size={20} />
            </div>
            <div className="text-2xl font-bold text-[#1C1C1E]">120</div>
            <div className="text-[10px] text-black/40 font-bold uppercase tracking-wider">الزيارات اليوم</div>
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
          
          <div className="space-y-4">
            {products.length === 0 ? (
              <GlassCard className="text-center py-12 flex flex-col items-center">
                <LayoutGrid size={48} className="text-black/5 mb-4" />
                <p className="text-black/60 font-medium">لا توجد منتجات حالياً</p>
                <p className="text-xs text-black/20">ابدأ بإنشاء صفحة هبوط لأول منتج لك</p>
              </GlassCard>
            ) : (
              products.map((product) => (
                <div key={product.id}>
                  <GlassCard 
                    className="flex items-center gap-4 p-3 pr-4 border-black/[0.05] hover:bg-white transition-all"
                    onClick={() => navigate(`/product/edit/${product.id}`)}
                  >
                  <div className="w-16 h-16 rounded-xl bg-black/5 flex-shrink-0 overflow-hidden border border-black/[0.05]">
                    {product.photos[0] ? (
                      <img src={product.photos[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-full h-full p-4 text-black/10" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1C1C1E]">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-emerald-600">{product.price} دج</span>
                      {product.isActive ? (
                        <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[8px] font-black uppercase tracking-tighter">نشط</div>
                      ) : (
                        <div className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-[8px] font-black uppercase tracking-tighter">بانتظار الدفع</div>
                      )}
                    </div>
                    <div className="mt-2 flex gap-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/product/edit/${product.id}`); }}
                        className="text-[9px] font-bold text-black/40 uppercase tracking-wider hover:text-emerald-600 transition-colors"
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/p/${product.slug}`); }}
                        className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider hover:text-emerald-700 transition-colors"
                      >
                        معاينة الصفحة
                      </button>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-black/10 transform rotate-180" />
                </GlassCard>
              </div>
            ))
          )}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-black/[0.05] px-8 py-4 flex justify-between items-center safe-bottom z-50">
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-emerald-600">
          <LayoutGrid size={24} />
          <span className="text-[9px] font-black uppercase tracking-tighter">الرئيسية</span>
        </Link>
        <Link to="/products" className="flex flex-col items-center gap-1 text-black/20 hover:text-black/40 transition-colors">
          <ShoppingBag size={24} />
          <span className="text-[9px] font-black uppercase tracking-tighter">الطلبات</span>
        </Link>
        <Link to="/analytics" className="flex flex-col items-center gap-1 text-black/20 hover:text-black/40 transition-colors">
          <TrendingUp size={24} />
          <span className="text-[9px] font-black uppercase tracking-tighter">الإحصائيات</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center gap-1 text-black/20 hover:text-black/40 transition-colors">
          <SettingsIcon size={24} />
          <span className="text-[9px] font-black uppercase tracking-tighter">الإعدادات</span>
        </Link>
      </nav>
    </div>
  );
}
