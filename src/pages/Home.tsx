import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, Rocket, Layout, CreditCard, ChevronLeft } from "lucide-react";
import { AppleButton, GlassCard } from "../components/ui/AppleUI";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1C1C1E]" dir="rtl">
      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 bg-white overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 text-black font-bold text-[10px] uppercase tracking-widest mb-6 border border-black/10">
            <Rocket size={14} />
            <span>منصة التجارة الإلكترونية رقم ١ في الجزائر</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight leading-[1.1] mb-6">
            حول منتجاتك إلى <span className="text-black/60">مبيعات</span> بلمسة واحدة
          </h1>
          <p className="text-black/40 font-medium text-base leading-relaxed mb-10 max-w-md mx-auto">
            أنشئ صفحات هبوط احترافية لكل منتج، اربطها بخدمات الشحن، وابدأ في استقبال الطلبات اليوم.
          </p>
          
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <Link to="/register">
              <AppleButton className="w-full h-12 rounded-xl text-[16px] font-black">
                ابدأ تجربتك المجانية
              </AppleButton>
            </Link>
            <Link to="/login" className="text-[13px] font-bold text-black/60 hover:text-black transition-colors">
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
            <p className="text-[10px] text-black/20 font-black uppercase tracking-widest">بدون الحاجة لخبرة برمجية • تدعم الدفع بالدينار</p>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/5 rounded-full blur-[120px] -z-0" />
      </section>
      
      {/* Features */}
      <section className="px-6 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">كل ما تحتاجه للنجاح</h2>
          <div className="w-16 h-1 bg-black mx-auto rounded-full" />
        </div>

        <div className="grid gap-6 max-w-2xl mx-auto">
          <FeatureCard 
            icon={<Layout className="text-black" />}
            title="صفحات هبوط ذكية"
            desc="تصميمات Apple HIG عصرية تركز على التحويل وزيادة المبيعات."
          />
          <FeatureCard 
            icon={<CreditCard className="text-black" />}
            title="ادفع لكل منتج"
            desc="نظام تسعير عادل، ادفع فقط مقابل ما تستخدمه من صفحات."
          />
          <FeatureCard 
            icon={<Check className="text-black" />}
            title="تكامل مع الشحن"
            desc="ربط تلقائي مع Yalidine و Nord-et-Sud لإدارة طلباتك بسهولة."
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-6 py-8 bg-white border-y border-black/[0.05] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
        <div className="text-center">
          <div className="text-2xl font-black text-black tracking-tighter">10,000+</div>
          <div className="text-[10px] text-black/40 uppercase font-black tracking-widest mt-1">منتج مفعل</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-black tracking-tighter">50M+</div>
          <div className="text-[10px] text-black/40 uppercase font-black tracking-widest mt-1">مبيعات كلية</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-black tracking-tighter">100%</div>
          <div className="text-[10px] text-black/40 uppercase font-black tracking-widest mt-1">دعم فني جزائري</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-black/20 bg-white">
        <p className="text-[10px] font-black uppercase tracking-widest">© {new Date().getFullYear()} Dzayer SaaS. كل الحقوق محفوظة.</p>
        <p className="mt-2 text-[10px] font-bold text-black/10 uppercase tracking-widest">صنع لمساندة الشباب الجزائري في التجارة الإلكترونية 🇩🇿</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <GlassCard className="flex items-start gap-4 p-6 bg-white border-black/[0.05]">
      <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-black text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </GlassCard>
  );
}
