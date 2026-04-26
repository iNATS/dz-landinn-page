import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { AppleButton, GlassCard } from "../components/ui/AppleUI";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col justify-center px-6 safe-top py-10" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-black mb-2 tracking-tight">تسجيل الدخول</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-xs">أهلاً بك مجدداً في Dzayer SaaS</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-500 rounded-xl flex items-center gap-2 text-sm font-bold border border-red-100">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label>البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pr-12"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label>كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pr-12"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <AppleButton 
              type="submit" 
              className="w-full h-14" 
              disabled={loading}
            >
              {loading ? "جاري التحميل..." : "تسجيل الدخول"}
              {!loading && <LogIn size={18} />}
            </AppleButton>
          </form>
        </GlassCard>

        <p className="text-center text-black/40 font-bold text-sm">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-emerald-600 hover:underline">
            ابدأ الآن مجاناً
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
