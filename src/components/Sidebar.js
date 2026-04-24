"use client";

import { useAuth } from "@/context/AuthContext";
import { 
    LayoutDashboard, 
    Calendar, 
    Users, 
    BarChart3, 
    Settings, 
    LogOut,
    GolfCourse // This won't exist in Lucide, I'll use placeholders or icons from Lucide
} from "lucide-react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Using Lucide icons for simplicity and a modern look
import { 
    Home, 
    Trophy, 
    UserCircle, 
    CreditCard,
    Heart,
    Dices,
    ShieldCheck
} from "lucide-react";

export default function Sidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const menuItems = [
        { name: "Overview", icon: Home, path: "/dashboard" },
        { name: "Charity", icon: Heart, path: "/dashboard/charity" },
        { name: "Membership", icon: CreditCard, path: "/dashboard/membership" },
        { name: "Monthly Draw", icon: Trophy, path: "/dashboard/draws" },
        { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 bg-white/40 backdrop-blur-3xl border-r border-white flex flex-col p-8 z-50">
            {/* Logo area */}
            <Link href="/" className="flex items-center gap-3 mb-16 px-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0F352E]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#0F352E]" />
                </div>
                <span className="font-serif text-2xl font-bold text-[#0F352E] tracking-tight">Pargive</span>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                                isActive 
                                ? "bg-[#0F352E] text-white shadow-xl shadow-[#0F352E]/10" 
                                : "text-[#0F352E]/50 hover:bg-white/60 hover:text-[#0F352E]"
                            }`}
                        >
                            <item.icon size={20} className={isActive ? "text-white" : "text-[#0F352E]/40 group-hover:text-[#0F352E]"} />
                            <span className="text-sm font-bold tracking-wide">{item.name}</span>
                        </Link>
                    );
                })}

                {user?.isAdmin && (
                    <Link
                        href="/admin"
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group mt-10 border border-[#0F352E]/10 ${
                            pathname === "/admin" 
                            ? "bg-emerald-600 text-white shadow-xl shadow-emerald-500/10" 
                            : "text-emerald-700 hover:bg-emerald-50"
                        }`}
                    >
                        <ShieldCheck size={20} className={pathname === "/admin" ? "text-white" : "text-emerald-600"} />
                        <span className="text-sm font-bold tracking-wide uppercase tracking-[0.1em]">System Admin</span>
                    </Link>
                )}
            </nav>

            {/* Profile footer */}
            <div className="mt-auto pt-8 border-t border-[#0F352E]/5">
                <div className="flex items-center gap-4 mb-6 px-2">
                    <div className="relative h-11 w-11 rounded-full overflow-hidden bg-[#0F352E] flex-shrink-0">
                        {user?.photoBase64 ? (
                            <Image
                                src={user.photoBase64}
                                alt={user.displayName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-white text-lg font-serif">
                                {user?.displayName?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-[#0F352E] truncate">{user?.displayName}</span>
                        <span className="text-[0.65rem] font-bold text-[#0F352E]/30 uppercase tracking-[0.1em]">Pro Member</span>
                    </div>
                </div>
                
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
