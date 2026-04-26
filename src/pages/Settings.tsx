import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Building, Phone, Truck, Shield, Globe, Share2, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard, AppleButton, cn } from "../components/ui/AppleUI";
import { getProfile, saveProfile } from "../store";
import { UserProfile } from "../types";
import { ALGERIAN_WILAYAS } from "../constants";
import { useAuth } from "../contexts/AuthContext";

export default function Settings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "shipping" | "marketing">("profile");

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const handleSave = () => {
    if (profile) {
      saveProfile(profile);
      alert("تم حفظ الإعدادات بنجاح");
      navigate("/dashboard");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#F2F2F7] safe-top pb-10">
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/[0.05]">
        <button onClick={() => navigate("/dashboard")} className="p-2 -mr-2">
          <ChevronLeft className="text-emerald-600 rotate-180" />
        </button>
        <h1 className="text-lg font-bold text-[#1C1C1E]">الإعدادات</h1>
        <button onClick={handleSave} className="text-emerald-600 font-bold uppercase text-xs tracking-widest">حفظ</button>
      </header>

      {/* Tabs */}
      <div className="px-6 py-6 flex gap-2 overflow-x-auto no-scrollbar bg-white/30">
        {[
          { id: "profile", label: "الملف الشخصي", icon: User },
          { id: "shipping", label: "الشحن والسياسات", icon: Truck },
          { id: "marketing", label: "التسويق", icon: Globe },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-emerald-500 text-white shadow-none" : "bg-white text-black/40 border border-black/[0.05]"
            )}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <main className="px-6 space-y-6 mt-6">
        {activeTab === "profile" && (
          <section className="space-y-6">
            <GlassCard className="space-y-4 border-black/[0.05]">
              <div className="flex items-center gap-3 pb-2 border-b border-black/[0.05] mb-2">
                <Building className="text-emerald-600" size={20} />
                <h2 className="text-sm font-bold text-[#1C1C1E]">معلومات المتجر</h2>
              </div>
              <div className="space-y-4">
                <InputGroup label="اسم الشركة / المتجر" value={profile.companyName} onChange={v => setProfile({...profile, companyName: v})} />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="الاسم الأول" value={profile.firstName} onChange={v => setProfile({...profile, firstName: v})} />
                  <InputGroup label="اللقب" value={profile.lastName} onChange={v => setProfile({...profile, lastName: v})} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="space-y-4 border-black/[0.05]">
              <div className="flex items-center gap-3 pb-2 border-b border-black/[0.05] mb-2">
                <Phone className="text-emerald-600" size={20} />
                <h2 className="text-sm font-bold text-[#1C1C1E]">التواصل والتفعيل</h2>
              </div>
              <div className="space-y-4">
                <InputGroup label="رقم الهاتف الأساسي" value={profile.phone} onChange={v => setProfile({...profile, phone: v})} />
                <InputGroup label="البريد الإلكتروني للتفعيل" value={profile.email} onChange={v => setProfile({...profile, email: v})} />
                <InputGroup label="الموقع / المدينة" value={profile.location} onChange={v => setProfile({...profile, location: v})} />
                <InputGroup label="العنوان الكامل" value={profile.address} onChange={v => setProfile({...profile, address: v})} />
              </div>
            </GlassCard>
          </section>
        )}

        {activeTab === "shipping" && (
          <section className="space-y-6">
            <GlassCard className="space-y-4 border-black/[0.05]">
              <div className="flex items-center gap-3 pb-2 border-b border-black/[0.05] mb-2">
                <Truck className="text-emerald-600" size={20} />
                <h2 className="text-sm font-bold text-[#1C1C1E]">خيارات التوصيل</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">ولاية الشحن الأساسية</label>
                  <select 
                    value={profile.deliverWilaya}
                    onChange={(e) => setProfile({...profile, deliverWilaya: e.target.value})}
                    className="w-full h-12 bg-white border border-black/[0.05] rounded-xl px-4 outline-none font-bold text-[#1C1C1E] appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:10px] bg-[left_16px_center] bg-no-repeat"
                  >
                    {ALGERIAN_WILAYAS.map(w => (
                      <option key={w.code} value={w.code}>{w.code} - {w.nameAr}</option>
                    ))}
                  </select>
                </div>
                <InputGroup label="رسوم التوصيل الافتراضية (دج)" value={profile.deliverFees.toString()} type="number" onChange={v => setProfile({...profile, deliverFees: Number(v)})} />
              </div>
            </GlassCard>

            <GlassCard className="space-y-4 border-black/[0.05]">
              <div className="flex items-center gap-3 pb-2 border-b border-black/[0.05] mb-2">
                <Shield className="text-emerald-600" size={20} />
                <h2 className="text-sm font-bold text-[#1C1C1E]">السياسات والضمان</h2>
              </div>
              <div className="space-y-4">
                <TextAreaGroup label="سياسة الاسترجاع" value={profile.returnPolicy} onChange={v => setProfile({...profile, returnPolicy: v})} />
                <TextAreaGroup label="سياسة الاستبدال" value={profile.replacePolicy} onChange={v => setProfile({...profile, replacePolicy: v})} />
                <TextAreaGroup label="سياسة استرداد الأموال" value={profile.refundPolicy} onChange={v => setProfile({...profile, refundPolicy: v})} />
              </div>
            </GlassCard>
          </section>
        )}

        {activeTab === "marketing" && (
          <section className="space-y-6">
            <GlassCard className="space-y-4 border-black/[0.05]">
              <div className="flex items-center gap-3 pb-2 border-b border-black/[0.05] mb-2">
                <Share2 className="text-emerald-600" size={20} />
                <h2 className="text-sm font-bold text-[#1C1C1E]">أدوات التتبع (Pixels)</h2>
              </div>
              <div className="space-y-4">
                <InputGroup label="Google Analytics ID" placeholder="UA-XXXXX or G-XXXXX" value={""} onChange={() => {}} />
                <InputGroup label="Meta Pixel ID" placeholder="123456789" value={""} onChange={() => {}} />
                <InputGroup label="TikTok Pixel ID" placeholder="ABCDEFG" value={""} onChange={() => {}} />
              </div>
            </GlassCard>

            <GlassCard className="space-y-4 border-black/[0.05]">
              <div className="flex items-center gap-3 pb-2 border-b border-black/[0.05] mb-2">
                <Globe className="text-emerald-600" size={20} />
                <h2 className="text-sm font-bold text-[#1C1C1E]">اسم النطاق الخاص</h2>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider leading-relaxed">
                  يمكنك ربط دومين خاص بك (مثلاً: shop.dz) بصفحات الهبوط الخاصة بك. تواصل مع الدعم الفني للمساعدة.
                </p>
              </div>
              <AppleButton className="w-full bg-blue-500/10 text-blue-600 border border-blue-500/10 shadow-none hover:bg-blue-500/20">تفعيل الدومين المخصص</AppleButton>
            </GlassCard>
          </section>
        )}
      </main>

      <div className="px-6 mt-8">
        <AppleButton variant="danger" className="w-full" onClick={handleSignOut}>
          تسجيل الخروج
          <LogOut size={18} />
        </AppleButton>
        <p className="text-center text-black/20 text-[10px] font-black uppercase tracking-widest mt-4">
          Dzayer SaaS v1.0.0
        </p>
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">{label}</label>
      <input 
        type={type} 
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 bg-white border border-black/[0.05] rounded-xl px-4 outline-none font-bold text-[#1C1C1E] focus:border-emerald-500/50 transition-all"
      />
    </div>
  );
}

function TextAreaGroup({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-black/40 mb-1 uppercase tracking-wider">{label}</label>
      <textarea 
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white border border-black/[0.05] rounded-xl p-4 outline-none font-medium text-[#1C1C1E] focus:border-emerald-500/50 transition-all"
      />
    </div>
  );
}
