import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, ShoppingBag, TrendingUp, Settings as SettingsIcon } from "lucide-react";
import { cn } from "../lib/utils";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { label: "المنتجات", icon: LayoutGrid, path: "/dashboard" },
    { label: "الطلبات", icon: ShoppingBag, path: "/orders" },
    { label: "الإحصائيات", icon: TrendingUp, path: "/analytics" },
    { label: "المتجر", icon: SettingsIcon, path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-black/5 px-6 py-2.5 flex justify-between items-center safe-bottom z-50">
      {navItems.map((item) => {
        const isActive = path === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.path}
            to={item.path} 
            className={cn(
              "flex-1 flex flex-col items-center gap-1 transition-all active:scale-90",
              isActive ? "text-emerald-600" : "text-[#8E8E93]"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2.2} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
