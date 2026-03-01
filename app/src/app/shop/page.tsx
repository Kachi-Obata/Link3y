"use client";

import { useState } from "react";
import Link from "next/link";
import { SHOP_DETAIL, PRODUCT_SECTIONS } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string }> = {
    available: { bg: "#DCFCE7", color: "#16A34A", label: "Available" },
    few: { bg: "#FEF3C7", color: "#D97706", label: "Few left" },
    sold: { bg: "#FEE2E2", color: "#DC2626", label: "Sold out" },
    paused: { bg: "#F4F4F5", color: "#71717A", label: "Paused" },
};

export default function ShopPage() {
    const [cart, setCart] = useState<Record<number, number>>({});

    const addItem = (id: number) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const removeItem = (id: number) => setCart(prev => {
        const next = { ...prev };
        if (next[id] > 1) next[id]--;
        else delete next[id];
        return next;
    });

    const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
    const cartTotal = PRODUCT_SECTIONS.flatMap(s => s.items)
        .reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

    return (
        <div className="min-h-screen relative" style={{ background: "#FAF8F4" }}>
            {/* Shop header */}
            <div className="fade-in relative" style={{ background: "#C17D2F", padding: "12px 16px 20px" }}>
                {/* Back */}
                <div className="mb-[14px]">
                    <Link href="/home" className="inline-flex items-center gap-[5px] py-[6px] px-3 rounded-[10px] font-dm text-[13px] font-medium no-underline" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #EAE7E1", color: "#1C1A17", backdropFilter: "blur(8px)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back
                    </Link>
                </div>

                {/* Shop identity */}
                <div className="flex items-center gap-[14px]">
                    <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[26px]" style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                        {SHOP_DETAIL.emoji}
                    </div>
                    <div>
                        <h2 className="font-sora text-[18px] font-bold text-white mb-1" style={{ letterSpacing: -0.3 }}>{SHOP_DETAIL.name}</h2>
                        <div className="flex items-center gap-[10px]">
                            <span className="text-[10px] font-bold py-[2px] px-2 rounded-full text-white" style={{ background: "rgba(255,255,255,0.25)" }}>Open</span>
                            <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>⚡ avg {SHOP_DETAIL.rt}</span>
                            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>⭐ {SHOP_DETAIL.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-[12px] mt-3 leading-[1.5]" style={{ color: "rgba(255,255,255,0.7)" }}>{SHOP_DETAIL.description}</p>

                {/* Info pills */}
                <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="inline-flex items-center gap-[5px] rounded-full py-[5px] px-[11px] text-[12px] font-medium" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>📍 {SHOP_DETAIL.zone}</span>
                    <span className="inline-flex items-center gap-[5px] rounded-full py-[5px] px-[11px] text-[12px] font-medium" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>🎟️ Ticket on order</span>
                </div>
            </div>

            {/* Scroll area */}
            <div className="overflow-y-auto" style={{ padding: "18px 14px 90px" }}>
                {PRODUCT_SECTIONS.map((section, si) => (
                    <div key={si} className={`stagger-${si + 1}`} style={{ marginBottom: 22 }}>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.9px] mb-[10px]" style={{ color: "#A8A49E" }}>{section.title}</p>
                        <div className="flex flex-col gap-2">
                            {section.items.map(item => (
                                <ProductRow key={item.id} item={item} qty={cart[item.id] || 0} onAdd={() => addItem(item.id)} onRemove={() => removeItem(item.id)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart bar */}
            {cartCount > 0 && (
                <Link href="/checkout" className="no-underline">
                    <div className="fixed bottom-4 left-3 right-3 rounded-[16px] py-[13px] px-4 flex items-center justify-between cursor-pointer transition-all hover:bg-brand-dim active:scale-[0.99]" style={{ background: "#C17D2F", boxShadow: "0 8px 28px rgba(193,125,47,0.40)" }}>
                        <div className="rounded-[9px] py-[3px] px-[9px] flex items-center justify-center" style={{ background: "rgba(255,255,255,0.25)" }}>
                            <span className="font-sora text-white font-bold text-[13px]">{cartCount}</span>
                        </div>
                        <span className="text-white font-semibold text-[15px]">Review Order</span>
                        <span className="font-sora text-white font-bold text-[15px]">₦{cartTotal.toLocaleString()}</span>
                    </div>
                </Link>
            )}
        </div>
    );
}

/* ─── PRODUCT ROW ─── */
function ProductRow({ item, qty, onAdd, onRemove }: { item: Product; qty: number; onAdd: () => void; onRemove: () => void }) {
    const canOrder = item.status === "available" || item.status === "few";
    const inCart = qty > 0;
    const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.paused;

    return (
        <div className={`bg-bg-card rounded-[14px] transition-all duration-150 ${!canOrder ? "opacity-55" : ""}`}
            style={{
                padding: "13px 14px",
                border: inCart ? "1px solid #C17D2F" : "1px solid #EAE7E1",
                boxShadow: inCart ? "0 0 0 3px #FDF3E3" : "none",
            }}>
            <div className="flex items-center gap-3">
                {/* Emoji */}
                <div className="w-[42px] h-[42px] rounded-[11px] flex-shrink-0 flex items-center justify-center text-[20px]" style={{ background: canOrder ? "#FDF3E3" : "#F4F4F5" }}>
                    {item.emoji}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-[3px]">
                        <p className="font-medium text-[14px] leading-[1.3]" style={{ color: "#1C1A17" }}>{item.name}</p>
                        <span className="text-[10px] font-bold py-[2px] px-2 rounded-full flex-shrink-0" style={{ background: cfg.bg, color: cfg.color, letterSpacing: 0.2 }}>{cfg.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-sora text-[14px] font-bold" style={{ color: "#C17D2F" }}>₦{item.price.toLocaleString()}</span>
                        {item.note && <span className="text-[11px] italic" style={{ color: "#A8A49E" }}>· {item.note}</span>}
                    </div>
                </div>
                {/* Control */}
                <div className="flex-shrink-0">
                    {!canOrder ? (
                        <span className="text-[12px]" style={{ color: "#A8A49E" }}>—</span>
                    ) : inCart ? (
                        <div className="flex items-center gap-2">
                            <button onClick={onRemove} className="w-[30px] h-[30px] rounded-[9px] border-none cursor-pointer text-[17px] font-medium flex items-center justify-center active:scale-90 transition-transform" style={{ background: "#EAE7E1", color: "#1C1A17" }}>−</button>
                            <span className="font-sora font-bold text-[15px] min-w-[18px] text-center" style={{ color: "#1C1A17" }}>{qty}</span>
                            <button onClick={onAdd} className="w-[30px] h-[30px] rounded-[9px] border-none cursor-pointer text-[17px] font-medium flex items-center justify-center active:scale-90 transition-transform" style={{ background: "#C17D2F", color: "#fff" }}>+</button>
                        </div>
                    ) : (
                        <button onClick={onAdd} className="w-[30px] h-[30px] rounded-[9px] border-none cursor-pointer text-[19px] font-light flex items-center justify-center active:scale-90 transition-all hover:bg-brand-dim" style={{ background: "#C17D2F", color: "#fff", boxShadow: "0 3px 8px rgba(193,125,47,0.3)" }}>+</button>
                    )}
                </div>
            </div>
        </div>
    );
}
