"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const isNewUser = searchParams.get("new") === "true";

    return (
        <div className="fade-in min-h-screen flex flex-col items-center justify-center px-6 py-8 text-center" style={{ background: "#FAF8F4" }}>
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[32px] mb-5" style={{ background: "#DCFCE7", border: "2px solid #16A34A" }}>
                ✓
            </div>
            <h2 className="font-sora text-[22px] font-[800] mb-2" style={{ color: "#1C1A17", letterSpacing: -0.3 }}>
                {isNewUser ? "You're in!" : "Welcome back!"}
            </h2>
            <p className="text-[14px] leading-[1.6] mb-8" style={{ color: "#6B6560" }}>
                {isNewUser
                    ? "Your account is set up. Start browsing shops on campus."
                    : "Picking up where you left off."
                }
            </p>
            <Link href="/home" className="max-w-[280px] w-full py-[14px] bg-brand text-white rounded-[13px] font-dm text-[15px] font-semibold text-center cursor-pointer transition-all hover:bg-brand-dim active:scale-[0.99] block" style={{ boxShadow: "0 6px 20px rgba(193,125,47,0.32)" }}>
                Browse shops →
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF8F4" }}><p style={{ color: "#A8A49E" }}>Loading...</p></div>}>
            <SuccessContent />
        </Suspense>
    );
}
