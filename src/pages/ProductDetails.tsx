import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  BarChart3, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Edit3, 
  Globe,
  Share2,
  Package,
  Clock,
  CheckCircle2
} from "lucide-react";
import { GlassCard, AppleButton } from "../components/ui/AppleUI";
import BottomNav from "../components/BottomNav";
import { getProducts } from "../store";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { cn } from "../lib/utils";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const products = getProducts();
    const found = products.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-32 safe-top">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <button onClick={() => navigate("/dashboard")} className="p-2 -mr-2 text-emerald-600 active:opacity-50 transition-opacity">
          <ChevronLeft className="rotate-180" size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-[#1C1C1E] truncate max-w-[200px]">{product.name}</h1>
        <button 
          onClick={() => navigate(`/product/edit/${product.id}`)}
          className="text-emerald-600 active:opacity-50 transition-opacity"
        >
          <Edit3 size={22} />
        </button>
      </header>

      <main className="px-6 mt-6 space-y-6">
        {/* Product Preview Card */}
        <div className="bg-white rounded-[28px] p-4 border border-black/5 flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-[#F2F2F7] overflow-hidden border border-black/5">
            {product.photos[0] ? (
              <img src={product.photos[0]} className="w-full h-full object-cover" />
            ) : (
              <Package className="w-full h-full p-5 text-[#C7C7CC]" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-black text-[#1C1C1E] text-lg leading-tight">{product.name}</h2>
            <p className="text-emerald-600 font-black text-xl mt-1">{product.price.toLocaleString()} <small className="text-xs uppercase font-bold text-emerald-600/50">DZD</small></p>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => navigate(`/p/${product.slug}`)}
              className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"
            >
              <Globe size={20} />
            </button>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-[20px] p-3 border border-black/5 text-center">
            <Users size={16} className="mx-auto mb-1 text-blue-500" />
            <p className="text-[10px] font-bold text-[#8E8E93] uppercase">زيارات</p>
            <p className="text-lg font-black text-[#1C1C1E]">٤٥٠</p>
          </div>
          <div className="bg-white rounded-[20px] p-3 border border-black/5 text-center">
            <ShoppingBag size={16} className="mx-auto mb-1 text-emerald-500" />
            <p className="text-[10px] font-bold text-[#8E8E93] uppercase">مبيعات</p>
            <p className="text-lg font-black text-[#1C1C1E]">١٢</p>
          </div>
          <div className="bg-white rounded-[20px] p-3 border border-black/5 text-center">
            <TrendingUp size={16} className="mx-auto mb-1 text-purple-500" />
            <p className="text-[10px] font-bold text-[#8E8E93] uppercase">تحويل</p>
            <p className="text-lg font-black text-[#1C1C1E]">٢.٦٪</p>
          </div>
        </div>

        {/* Analytics Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[13px] font-bold text-[#8E8E93] uppercase tracking-wider">تحليل الأداء</h3>
            <span className="text-[11px] font-black text-emerald-600">آخر ٧ أيام</span>
          </div>
          <div className="p-6 bg-[#1C1C1E] border border-white/5 rounded-[28px]">
            <div className="h-32 flex items-end gap-2 px-1">
              {[40, 70, 50, 90, 60, 100, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-lg transition-all duration-700"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {['أ', 'إ', 'ث', 'ر', 'خ', 'ج', 'س'].map(d => (
                <span key={d} className="text-[10px] font-black text-white/30">{d}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[13px] font-bold text-[#8E8E93] uppercase tracking-wider">الطلبات الأخيرة</h3>
            <button onClick={() => navigate('/orders')} className="text-[11px] font-black text-emerald-600">عرض الكل</button>
          </div>
          
          <div className="space-y-2">
            {[
              { id: '9281', name: 'أحمد مراد', status: 'جديد', date: 'منذ ١٠ دقائق' },
              { id: '9245', name: 'سارة خالد', status: 'مكتمل', date: 'أمس' },
            ].map(order => (
              <div key={order.id} className="bg-white rounded-[20px] p-4 border border-black/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    order.status === 'جديد' ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"
                  )}>
                    {order.status === 'جديد' ? <Clock size={18} /> : <CheckCircle2 size={18} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C1C1E] text-[15px]">{order.name}</h4>
                    <p className="text-[11px] text-[#8E8E93] font-medium">#{order.id} • {order.date}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                  order.status === 'جديد' ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-100 text-gray-400"
                )}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
