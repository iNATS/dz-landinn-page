import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, Filter, ChevronLeft, Package, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { GlassCard } from "../components/ui/AppleUI";
import { cn } from "../lib/utils";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  wilaya: string;
}

export default function Orders() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("ezzy_orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeFilter === "all") return true;
    if (activeFilter === "جديد") return order.status === "pending" || order.status === "جديد";
    return order.status === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-32 safe-top">
      {/* Header */}
      <header className="px-6 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <h1 className="text-xl font-black text-[#1C1C1E]">الطلبات</h1>
        <p className="text-[#8E8E93] text-[10px] font-bold uppercase tracking-wider mt-0.5">إدارة مبيعاتك</p>
      </header>

      <main className="px-6 mt-6 space-y-6">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {["الكل", "جديد", "قيد التوصيل", "مكتمل"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter === "الكل" ? "all" : filter)}
              className={cn(
                "px-5 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all",
                (activeFilter === "all" && filter === "الكل") || activeFilter === filter
                  ? "bg-[#1C1C1E] text-white border border-black/5"
                  : "bg-white text-[#8E8E93] border border-black/5"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C7C7CC]" size={18} />
          <input 
            type="text" 
            placeholder="البحث عن طلب، عميل..." 
            className="w-full h-12 bg-white rounded-2xl pr-12 pl-4 outline-none border border-black/5 font-medium text-[15px]"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-black/5">
                <ShoppingBag className="text-black/10" size={32} />
              </div>
              <p className="text-[#8E8E93] font-bold">لا يوجد طلبات حالياً</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-[24px] p-5 border border-black/5 active:scale-[0.98] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-[#1C1C1E]">{order.customerName}</h3>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter",
                        (order.status === "pending" || order.status === "جديد") ? "bg-emerald-500/10 text-emerald-600" :
                        order.status === "قيد التوصيل" ? "bg-blue-500/10 text-blue-600" :
                        "bg-gray-100 text-gray-400"
                      )}>
                        {order.status === "pending" ? "جديد" : order.status}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#8E8E93] font-bold truncate max-w-[150px]">
                      {order.productName} • {new Date(order.createdAt).toLocaleDateString("ar-DZ")}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black text-[#1C1C1E]">{order.totalPrice.toLocaleString()} دج</p>
                    <p className="text-[10px] text-[#AEAEB2] font-bold">ولاية: {order.wilaya}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-black/5">
                  <button className="flex-1 h-10 bg-[#1C1C1E] text-white rounded-xl text-[13px] font-bold active:opacity-50 transition-opacity">تأكيد الطلب</button>
                  <button className="w-10 h-10 bg-[#F2F2F7] flex items-center justify-center rounded-xl text-[#8E8E93]">
                    <ChevronLeft size={18} className="rotate-180" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
