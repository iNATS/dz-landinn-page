import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Building, Phone, Truck, Shield, Globe, Share2, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard, AppleButton, cn } from "../components/ui/AppleUI";
import { getProfile, saveProfile } from "../store";
import { UserProfile } from "../types";
import { ALGERIAN_WILAYAS } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";

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
    <div className="min-h-screen bg-[#F2F2F7] safe-top pb-32">
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <button onClick={() => navigate("/dashboard")} className="p-2 -mr-2 text-black active:opacity-50 transition-opacity">
          <ChevronLeft className="rotate-180" size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-[#1C1C1E]">إعدادات المتجر</h1>
        <button onClick={handleSave} className="text-black font-bold text-[17px] active:opacity-50 transition-opacity">حفظ</button>
      </header>

      {/* Profile Header */}
      <div className="px-6 py-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white border border-black/5 shadow-sm p-1 mb-4">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-3xl font-black">
            {profile.companyName[0]}
          </div>
        </div>
        <h2 className="text-xl font-black text-[#1C1C1E]">{profile.companyName}</h2>
        <p className="text-[#8E8E93] text-[13px] font-medium mt-1">{profile.email}</p>
      </div>

      {/* Tabs / Segmented Control */}
      <div className="px-6 pb-6">
        <div className="bg-[#E3E3E8] p-1 rounded-xl flex">
          {[
            { id: "profile", label: "الملف", icon: User },
            { id: "shipping", label: "الشحن", icon: Truck },
            { id: "marketing", label: "التسويق", icon: Globe },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-[10px] text-[13px] font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-white text-[#1C1C1E] shadow-sm" 
                  : "text-[#8E8E93]"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-6 space-y-6">
        {activeTab === "profile" && (
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="px-4 text-[13px] font-medium text-[#8E8E93] uppercase tracking-tight">معلومات المتجر</label>
              <div className="bg-white rounded-[20px] overflow-hidden border border-black/5 divide-y divide-black/[0.05]">
                <div className="p-4"><InputGroup label="اسم المتجر" value={profile.companyName} onChange={v => setProfile({...profile, companyName: v})} /></div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <InputGroup label="الاسم الأول" value={profile.firstName} onChange={v => setProfile({...profile, firstName: v})} />
                  <InputGroup label="اللقب" value={profile.lastName} onChange={v => setProfile({...profile, lastName: v})} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="px-4 text-[13px] font-medium text-[#8E8E93] uppercase tracking-tight">الاتصال والموقع</label>
              <div className="bg-white rounded-[20px] overflow-hidden border border-black/5 divide-y divide-black/[0.05]">
                <div className="p-4"><InputGroup label="الهاتف" value={profile.phone} onChange={v => setProfile({...profile, phone: v})} /></div>
                <div className="p-4"><InputGroup label="الموقع" value={profile.location} onChange={v => setProfile({...profile, location: v})} /></div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "shipping" && (
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="px-4 text-[13px] font-medium text-[#8E8E93] uppercase tracking-tight">إعدادات الشحن</label>
              <div className="bg-white rounded-[20px] overflow-hidden border border-black/5 divide-y divide-black/[0.05]">
                <div className="p-4">
                  <label className="block text-[11px] font-bold text-black/30 mb-1.5 uppercase">الولاية الأساسية</label>
                  <select 
                    value={profile.deliverWilaya}
                    onChange={(e) => setProfile({...profile, deliverWilaya: e.target.value})}
                    className="w-full h-12 bg-[#F2F2F7] rounded-xl px-4 outline-none font-bold text-[#1C1C1E] appearance-none"
                  >
                    {ALGERIAN_WILAYAS.map(w => (
                      <option key={w.code} value={w.code}>{w.code} - {w.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div className="p-4"><InputGroup label="رسوم التوصيل (دج)" value={profile.deliverFees.toString()} type="number" onChange={v => setProfile({...profile, deliverFees: Number(v)})} /></div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "marketing" && (
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="px-4 text-[13px] font-medium text-[#8E8E93] uppercase tracking-tight">أدوات الربط</label>
              <div className="bg-white rounded-[20px] overflow-hidden border border-black/5 divide-y divide-black/[0.05]">
                <div className="p-4"><InputGroup label="Google Analytics ID" placeholder="UA-XXXXX" value={""} onChange={() => {}} /></div>
                <div className="p-4"><InputGroup label="Meta Pixel ID" placeholder="123456789" value={""} onChange={() => {}} /></div>
              </div>
            </div>
          </section>
        )}
      </main>

      <div className="px-6 mt-12 space-y-4">
        <AppleButton variant="danger" className="w-full py-4 text-[17px]" onClick={handleSignOut}>
          تسجيل الخروج
          <LogOut size={20} />
        </AppleButton>
        <p className="text-center text-[#AEAEB2] text-[11px] font-bold uppercase tracking-widest">
          Ezzy Store Manager v1.2.0
        </p>
      </div>
      <BottomNav />
    </div>
  );
}

function InputGroup({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="flex items-center">
      <label className="w-24 flex-shrink-0 text-[15px] font-bold text-[#1C1C1E]">{label}</label>
      <input 
        type={type} 
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 h-8 bg-transparent outline-none font-medium text-[#8E8E93] text-left focus:text-black transition-all placeholder:text-[#C7C7CC]"
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
        className="w-full bg-white border border-black/[0.05] rounded-xl p-4 outline-none font-medium text-[#1C1C1E] focus:border-black/50 transition-all"
      />
    </div>
  );
}
