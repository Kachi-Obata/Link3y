"use client";

import { useState } from "react";
import Link from "next/link";
import { SHOPS, CATEGORIES } from "@/lib/mock-data";

export default function HomePage() {
    const [activeCat, setActiveCat] = useState("All");
    const [activeNav, setActiveNav] = useState("home");

    const filtered = activeCat === "All" ? SHOPS : SHOPS.filter(s => s.cat === activeCat);
    const openShops = filtered.filter(s => s.open);
    const closedShops = filtered.filter(s => !s.open);

    return (
        <div className="min-h-screen relative pb-20" style={{ background: "#FAF8F4" }}>
            {/* ── TOP BAR ── */}
            <div className="px-[18px] py-[10px] flex items-center justify-between" style={{ background: "#FAF8F4" }}>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
                        <span className="text-white text-[14px] font-bold font-sora">L</span>
                    </div>
                    <span className="font-sora font-bold text-[17px]" style={{ color: "#1C1A17", letterSpacing: -0.3 }}>link3y</span>
                </div>
                <div className="w-[34px] h-[34px] rounded-[10px] bg-bg-card border border-border-default flex items-center justify-center text-[16px] cursor-pointer">
                    🔔
                </div>
            </div>

            {/* ── SCROLL AREA ── */}
            <div className="overflow-y-auto">
                {/* Greeting + headline */}
                <div className="fade-in px-[18px] pt-1 pb-[18px]">
                    <p className="text-[12px] mb-1" style={{ color: "#6B6560" }}>Good afternoon, Kachi 👋</p>
                    <h1 className="font-sora text-[22px] font-[800] leading-[1.2]" style={{ color: "#1C1A17", letterSpacing: -0.4 }}>
                        What do you need<br />right now?
                    </h1>
                </div>

                {/* Search bar */}
                <div className="stagger-1 px-[18px] pb-[18px]">
                    <div className="flex items-center gap-[10px] bg-bg-card border border-border-default rounded-[13px] py-3 px-[14px] transition-all hover:border-border-strong hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A8A49E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        <span className="text-[14px]" style={{ color: "#A8A49E" }}>Search shops or items…</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="stagger-2 flex gap-[7px] overflow-x-auto px-[18px] pb-5" style={{ scrollbarWidth: "none" }}>
                    {CATEGORIES.map(cat => {
                        const active = activeCat === cat.label;
                        return (
                            <button key={cat.label} onClick={() => setActiveCat(cat.label)}
                                className="whitespace-nowrap border-none cursor-pointer font-dm transition-all duration-150 flex items-center gap-[5px] active:scale-[0.96]"
                                style={{
                                    padding: active ? "7px 14px" : "6px 13px",
                                    borderRadius: 20,
                                    border: active ? "none" : "1px solid #EAE7E1",
                                    fontSize: 13, fontWeight: active ? 600 : 400,
                                    background: active ? "#C17D2F" : "#FFFFFF",
                                    color: active ? "#fff" : "#6B6560",
                                    boxShadow: active ? "0 4px 12px rgba(193,125,47,0.3)" : "none",
                                }}>
                                <span className="text-[12px]">{cat.icon}</span>
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Shop list */}
                <div className="stagger-3 px-[18px]">
                    {openShops.length > 0 && (
                        <>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.9px] mb-[10px]" style={{ color: "#A8A49E" }}>
                                {activeCat === "All" ? "Open now" : activeCat}
                            </p>
                            <div className="flex flex-col gap-[10px] mb-[22px]">
                                {openShops.map(shop => (
                                    <Link href="/shop" key={shop.id} className="no-underline">
                                        <ShopCard shop={shop} />
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {closedShops.length > 0 && (
                        <>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.9px] mb-[10px]" style={{ color: "#A8A49E" }}>Closed now</p>
                            <div className="flex flex-col gap-[10px]">
                                {closedShops.map(shop => (
                                    <ShopCard key={shop.id} shop={shop} />
                                ))}
                            </div>
                        </>
                    )}

                    {filtered.length === 0 && (
                        <div className="text-center py-10 px-5" style={{ color: "#A8A49E" }}>
                            <p className="text-[32px] mb-[10px]">🔍</p>
                            <p className="text-[14px]">No shops in this category yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="fixed bottom-0 left-0 right-0 flex justify-around pt-[10px] pb-4 border-t border-border-default" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}>
                {[
                    { id: "home", label: "Home", icon: (a: boolean) => <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "#C17D2F" : "none"} stroke={a ? "#C17D2F" : "#A8A49E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
                    { id: "orders", label: "Orders", icon: (a: boolean) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? "#C17D2F" : "#A8A49E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> },
                    { id: "help", label: "Support", icon: (a: boolean) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? "#C17D2F" : "#A8A49E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
                ].map(item => {
                    const active = activeNav === item.id;
                    return (
                        <button key={item.id} onClick={() => setActiveNav(item.id)} className="flex flex-col items-center gap-[3px] cursor-pointer bg-none border-none active:opacity-60 transition-opacity">
                            {item.icon(active)}
                            <span className="text-[10px] transition-colors" style={{ fontWeight: active ? 600 : 400, color: active ? "#C17D2F" : "#A8A49E" }}>{item.label}</span>
                            {active && <div className="w-1 h-1 rounded-full bg-brand mt-[1px]" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ─── SHOP CARD ─── */
function ShopCard({ shop }: { shop: typeof SHOPS[0] }) {
    return (
        <div className="bg-bg-card border border-border-default rounded-[16px] overflow-hidden cursor-pointer transition-all duration-150 hover:-translate-y-[2px] hover:border-border-strong active:translate-y-0" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 10px 28px rgba(193,125,47,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}>
            <div className="flex">
                {/* Left: emoji */}
                <div className="w-20 flex-shrink-0 min-h-[90px] flex items-center justify-center text-[32px] relative" style={{ background: shop.open ? "#FDF3E3" : "#F4F4F5" }}>
                    {shop.emoji}
                    {!shop.open && <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.45)" }} />}
                </div>
                {/* Right: info */}
                <div className="py-3 px-[14px] flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-sora font-semibold text-[14px] leading-[1.3]" style={{ color: shop.open ? "#1C1A17" : "#6B6560" }}>{shop.name}</p>
                        <span className="text-[10px] font-bold py-[2px] px-2 rounded-full flex-shrink-0" style={{
                            letterSpacing: 0.2,
                            background: shop.open ? "#DCFCE7" : "#F4F4F5",
                            color: shop.open ? "#16A34A" : "#71717A",
                        }}>{shop.open ? "Open" : "Closed"}</span>
                    </div>
                    <p className="text-[12px] leading-[1.5] mb-2" style={{ color: "#6B6560", opacity: shop.open ? 1 : 0.6 }}>{shop.desc}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px]" style={{ color: "#A8A49E" }}>📍 {shop.zone}</span>
                        {shop.open && shop.rt && <span className="text-[11px] font-semibold" style={{ color: "#C17D2F" }}>⚡ {shop.rt}</span>}
                        <span className="text-[11px]" style={{ color: "#A8A49E" }}>⭐ {shop.rating}</span>
                        {shop.tag && <span className="text-[10px] font-semibold py-[2px] px-2 rounded-full" style={{ background: "#F5ECD8", color: "#7A4E18", letterSpacing: 0.2 }}>{shop.tag}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
