"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Bell, Save } from "lucide-react";

export default function SettingsPage() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!user?.id) return;
        setSaving(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, displayName: name })
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 md:p-12 lg:p-16">
            <header className="mb-16">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#0F352E] tracking-tight">Settings</h1>
                <p className="text-[#0F352E]/40 font-bold text-sm mt-3 tracking-widest uppercase">Manage your profile and clubhouse preferences</p>
            </header>

            <div className="max-w-4xl space-y-10">
                {/* Profile Section */}
                <div className="bg-white rounded-[48px] p-12 shadow-sm border border-[#0F352E]/5">
                    <div className="flex items-center gap-4 mb-10">
                        <User className="text-[#0F352E]/20" size={24} />
                        <h3 className="text-2xl font-serif font-bold text-[#0F352E]">Profile Identity</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[0.65rem] font-bold text-[#0F352E]/40 uppercase tracking-widest block ml-1">Full Name</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#0F352E]/5 rounded-2xl px-6 py-4 text-sm font-bold text-[#0F352E] focus:outline-none focus:ring-2 ring-[#0F352E]/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[0.65rem] font-bold text-[#0F352E]/40 uppercase tracking-widest block ml-1">Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                disabled
                                className="w-full bg-[#0F352E]/5 rounded-2xl px-6 py-4 text-sm font-bold text-[#0F352E]/40 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#0F352E]/5">
                        <button 
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-[#0F352E] text-white px-10 py-4 rounded-2xl text-[0.65rem] font-bold uppercase tracking-widest hover:bg-[#1a4a42] transition-all flex items-center gap-3 disabled:opacity-50"
                        >
                            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white rounded-[48px] p-12 shadow-sm border border-[#0F352E]/5">
                    <div className="flex items-center gap-4 mb-10">
                        <Shield className="text-[#0F352E]/20" size={24} />
                        <h3 className="text-2xl font-serif font-bold text-[#0F352E]">Security</h3>
                    </div>
                    <div className="flex items-center justify-between p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10">
                        <div className="flex items-center gap-4">
                            <Shield className="text-amber-600" size={20} />
                            <div>
                                <p className="text-sm font-bold text-[#0F352E]">Two-Factor Authentication</p>
                                <p className="text-xs text-[#0F352E]/40 font-medium">Add an extra layer of security to your account.</p>
                            </div>
                        </div>
                        <button className="text-amber-600 font-bold text-[0.65rem] uppercase tracking-widest">Enable</button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-[48px] p-12 shadow-sm border border-[#0F352E]/5">
                    <div className="flex items-center gap-4 mb-10">
                        <Bell className="text-[#0F352E]/20" size={24} />
                        <h3 className="text-2xl font-serif font-bold text-[#0F352E]">Notifications</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Monthly Draw Results", desc: "Get notified as soon as draw results are published." },
                            { name: "Charity Updates", desc: "Stay informed about the impact of your contributions." },
                            { name: "New Features", desc: "Be the first to know about new clubhouse capabilities." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-sm font-bold text-[#0F352E]">{item.name}</p>
                                    <p className="text-xs text-[#0F352E]/40 font-medium">{item.desc}</p>
                                </div>
                                <div className="w-12 h-6 bg-[#0F352E] rounded-full relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
