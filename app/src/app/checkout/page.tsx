"use client";

import Link from "next/link";
import { MOCK_CART_ITEMS, MOCK_CART_TOTAL, SHOP_NAME } from "@/lib/mock-data";

export default function CheckoutPage() {
    return (
        <div className="fade-in min-h-screen overflow-y-auto" style={{ background: "#FAF8F4", padding: "16px 16px 32px" }}>
            {/* Back */}
            <Link href="/shop" className="inline-flex items-center gap-[5px] py-1 mb-[18px] font-dm text-[13px] font-medium no-underline" style={{ color: "#6B6560" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Back to menu
            </Link>

            <h2 className="font-sora text-[20px] font-[800] mb-[2px]" style={{ color: "#1C1A17", letterSpacing: -0.3 }}>Review Order</h2>
            <p className="text-[13px] mb-[22px]" style={{ color: "#6B6560" }}>{SHOP_NAME}</p>

            {/* Order items */}
            <div className="stagger-1 mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.9px] mb-[10px]" style={{ color: "#A8A49E" }}>Your items</p>
                <div className="bg-bg-card border border-border-default rounded-[16px] overflow-hidden">
                    {MOCK_CART_ITEMS.map((item, i) => (
                        <div key={item.id} className="py-[13px] px-4 flex items-center justify-between" style={{ borderBottom: i < MOCK_CART_ITEMS.length - 1 ? "1px solid #EAE7E1" : "none" }}>
                            <div className="flex items-center gap-[10px]">
                                <span className="text-[18px]">{item.emoji}</span>
                                <div>
                                    <p className="text-[14px] font-medium" style={{ color: "#1C1A17" }}>{item.name}</p>
                                    <p className="text-[12px]" style={{ color: "#A8A49E" }}>× {item.qty}</p>
                                </div>
                            </div>
                            <span className="font-sora text-[14px] font-bold" style={{ color: "#C17D2F" }}>₦{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="py-[13px] px-4 flex items-center justify-between" style={{ background: "#FEF9F0", borderTop: "1px solid #EAE7E1" }}>
                        <span className="text-[14px] font-semibold" style={{ color: "#1C1A17" }}>Total</span>
                        <span className="font-sora text-[16px] font-[800]" style={{ color: "#C17D2F" }}>₦{MOCK_CART_TOTAL.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Fulfilment selector */}
            <div className="stagger-2 mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.9px] mb-[10px]" style={{ color: "#A8A49E" }}>How do you want to receive it?</p>
                <div className="flex gap-2">
                    {/* Pickup — active */}
                    <div className="flex-1 bg-bg-card rounded-[14px] cursor-pointer" style={{ border: "2px solid #C17D2F", padding: "13px 14px", boxShadow: "0 0 0 3px #FDF3E3" }}>
                        <div className="text-[22px] mb-[6px]">🏃</div>
                        <p className="text-[13px] font-bold mb-[2px]" style={{ color: "#1C1A17" }}>Pick up</p>
                        <p className="text-[11px] leading-[1.4]" style={{ color: "#6B6560" }}>Go to the shop when ready</p>
                        <div className="mt-2 inline-block text-[10px] font-bold py-[2px] px-2 rounded-full" style={{ background: "#DCFCE7", color: "#16A34A" }}>Available</div>
                    </div>
                    {/* Delivery — coming soon */}
                    <div className="flex-1 rounded-[14px] relative" style={{ background: "#F4F4F5", border: "1.5px solid #EAE7E1", padding: "13px 14px", opacity: 0.75, cursor: "not-allowed" }}>
                        <div className="text-[22px] mb-[6px]">🛵</div>
                        <p className="text-[13px] font-bold mb-[2px]" style={{ color: "#6B6560" }}>Delivery</p>
                        <p className="text-[11px] leading-[1.4]" style={{ color: "#A8A49E" }}>Runner brings it to you</p>
                        <div className="mt-2 inline-block text-[10px] font-bold py-[2px] px-2 rounded-full" style={{ background: "#FEF3C7", color: "#D97706" }}>Coming soon</div>
                    </div>
                </div>
                {/* Delivery explainer */}
                <div className="bg-bg-card border border-border-default rounded-[12px] py-[11px] px-[14px] mt-[10px] flex gap-[10px] items-start">
                    <span className="text-[15px] flex-shrink-0">ℹ️</span>
                    <p className="text-[12px] leading-[1.55]" style={{ color: "#6B6560" }}>Delivery by student runners is launching soon. Runners set their own fee — you&apos;ll see the rate and confirm before paying.</p>
                </div>
            </div>

            {/* How pickup works */}
            <div className="stagger-3 mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.9px] mb-[10px]" style={{ color: "#A8A49E" }}>How pickup works</p>
                <div className="bg-bg-card border border-border-default rounded-[16px] overflow-hidden py-[14px] px-4">
                    {[
                        { icon: "🎟️", title: "You'll get a ticket number", sub: "Generated instantly when you confirm" },
                        { icon: "⚡", title: "Vendor has 7 min to accept", sub: "You'll be notified when they do" },
                        { icon: "🏃", title: "Head to the shop when it's ready", sub: "Show your ticket number to collect" },
                    ].map((step, i) => (
                        <div key={i} className="flex gap-3" style={{ marginBottom: i < 2 ? 14 : 0 }}>
                            <div className="w-9 h-9 rounded-[10px] flex-shrink-0 flex items-center justify-center text-[17px]" style={{ background: "#FDF3E3" }}>{step.icon}</div>
                            <div>
                                <p className="text-[13px] font-semibold mb-[1px]" style={{ color: "#1C1A17" }}>{step.title}</p>
                                <p className="text-[12px]" style={{ color: "#6B6560" }}>{step.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment notice */}
            <div className="stagger-4 flex gap-[10px] items-start mb-6 rounded-[12px] py-[11px] px-[14px]" style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}>
                <span className="text-[16px] flex-shrink-0">💳</span>
                <p className="text-[12px] leading-[1.5]" style={{ color: "#1C1A17" }}>
                    <strong>Payment is required to confirm your order.</strong> This reserves the vendor&apos;s time and stock — no-shows affect other students.
                </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-[10px]">
                <Link href="/ticket" className="w-full py-[15px] rounded-[14px] font-dm text-[15px] font-semibold text-white text-center cursor-pointer transition-all hover:bg-brand-dim active:scale-[0.99] block" style={{ background: "#C17D2F", boxShadow: "0 6px 20px rgba(193,125,47,0.35)" }}>
                    Confirm & Pay ₦{MOCK_CART_TOTAL.toLocaleString()} →
                </Link>
                <Link href="/shop" className="w-full py-[13px] rounded-[14px] font-dm text-[14px] font-medium text-center cursor-pointer transition-all hover:border-border-strong hover:bg-bg-card flex items-center justify-center gap-2 no-underline" style={{ background: "transparent", color: "#6B6560", border: "1.5px solid #EAE7E1" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Edit order
                </Link>
            </div>
        </div>
    );
}
