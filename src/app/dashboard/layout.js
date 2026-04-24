"use client";

import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-[#e4e9ee]">
                <Sidebar />
                <main className="flex-1 ml-72">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
