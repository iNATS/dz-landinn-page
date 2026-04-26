import React from "react";
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, BarChart3, PieChart, Activity } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { GlassCard } from "../components/ui/AppleUI";
import { cn } from "../lib/utils";

export default function Analytics() {
  const stats = [
    { label: "إجمالي المبيعات", value: "٢٥٠,٠٠٠ دج", delta: "+١٢٪", icon: DollarSign, color: "text-black", bg: "bg-black/5" },
    { label: "زيارات المتجر", value: "١,٢٤٠", delta: "+٥٪", icon: Users, color: "text-black", bg: "bg-black/5" },
    { label: "معدل التحويل", value: "٤.٥٪", delta: "+٢٪", icon: Activity, color: "text-black", bg: "bg-black/5" },
    { label: "عدد الطلبات", value: "٨٦", delta: "+٨٪", icon: ShoppingCart, color: "text-black", bg: "bg-black/5" },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-32 safe-top">
      {/* Header */}
      <header className="px-6 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <h1 className="text-2xl font-black text-[#1C1C1E]">الإحصائيات</h1>
        <p className="text-[#8E8E93] text-[11px] font-bold uppercase tracking-wider mt-0.5">أداء مشروعك بالأرقام</p>
      </header>

      <main className="px-6 mt-6 space-y-6">
        {/* Main Chart Card */}
        <div className="bg-white rounded-[32px] p-6 text-[#1C1C1E] border border-black/5">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[#8E8E93] text-[11px] font-bold uppercase tracking-widest leading-none mb-2">أرباح اليوم</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black">١٢,٥٠٠ دج</span>
                <span className="text-black/40 text-xs font-bold">+١٠٪</span>
              </div>
            </div>
            <div className="p-3 bg-black/5 rounded-2xl">
              <TrendingUp size={24} className="text-black" />
            </div>
          </div>
          
          <div className="h-32 flex items-end gap-1.5 px-2">
            {[35, 65, 45, 85, 55, 95, 75, 45, 65, 85, 75, 95].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-black/10 rounded-t-lg transition-all hover:bg-black cursor-pointer group relative"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  {h}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-[24px] p-4 border border-black/5">
              <div className="flex justify-between items-start mb-3">
                <div className={cn("p-2 rounded-xl", s.bg)}>
                  <s.icon size={18} className={s.color} />
                </div>
                <div className="flex items-center text-[10px] font-bold text-black bg-black/5 px-1.5 py-0.5 rounded-full">
                  <ArrowUpRight size={10} />
                  {s.delta}
                </div>
              </div>
              <p className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">{s.label}</p>
              <h3 className="text-lg font-black text-[#1C1C1E] mt-1">{s.value}</h3>
            </div>
          ))}
        </div>

        {/* Insights Card */}
        <div className="bg-white rounded-[24px] p-6 border border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-5 bg-black rounded-full" />
            <h3 className="text-lg font-bold">المنتجات الأكثر مبيعاً</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { name: "ساعة ذكية Ultra", sales: "٤٥ مبيعة", share: "٧٠٪" },
              { name: "سماعات Pro", sales: "٢٢ مبيعة", share: "٢٥٪" },
              { name: "شاحن مغناطيسي", sales: "٥ مبيعات", share: "٥٪" },
            ].map((prod) => (
              <div key={prod.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-[13px] font-bold mb-1.5">
                    <span>{prod.name}</span>
                    <span className="text-[#8E8E93]">{prod.sales}</span>
                  </div>
                  <div className="h-1.5 bg-[#F2F2F7] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1C1C1E] rounded-full" 
                      style={{ width: prod.share }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
