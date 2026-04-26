import React from "react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={onClick ? { scale: 0.98 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={cn("glass rounded-[20px] p-4 border border-black/5", className)}
    >
      {children}
    </motion.div>
  );
}

export function AppleButton({ 
  children, 
  variant = "primary", 
  className, 
  onClick,
  type = "button",
  disabled = false
}: { 
  children: React.ReactNode; 
  variant?: "primary" | "secondary" | "danger" | "ghost"; 
  className?: string; 
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const variants = {
    primary: "active-green text-white disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-black/5 text-black border border-black/5 hover:bg-black/10 disabled:opacity-50",
    danger: "bg-red-500/10 text-red-500 border border-red-500/10 disabled:opacity-50",
    ghost: "bg-transparent text-emerald-600 disabled:opacity-50",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-12 px-6 rounded-[14px] font-semibold text-center transition-all flex items-center justify-center gap-2 border-none",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}
