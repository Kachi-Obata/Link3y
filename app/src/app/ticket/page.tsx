"use client";

import { useState } from "react";
import { MOCK_CART_ITEMS, MOCK_CART_TOTAL, SHOP_NAME, TICKET_NUM } from "@/lib/mock-data";

const STEPS = [
    { key: "pending_vendor", label: "Order placed", sub: "Waiting for vendor to accept" },
    { key: "accepted", label: "Vendor accepted", sub: "Your order is being prepared" },
    { key: "ready_for_pickup", label: "Ready for pickup", sub: "Head to the shop now" },
    { key: "picked_up", label: "Collected", sub: "Enjoy your meal!" },
];

const STATUS_MESSAGES: Record<string, { emoji: string; text: string; color: string; bg: string }> = {
    pending_vendor: { emoji: "⏳", text: "Waiting for vendor…", color: "#D97706", bg: "#FEF3C7" },
    accepted: { emoji: "👨‍🍳", text: "Vendor is preparing your order", color: "#C17D2F", bg: "#FDF3E3" },
    ready_for_pickup: { emoji: "✅", text: "Ready! Head to the shop", color: "#16A34A", bg: "#DCFCE7" },
    picked_up: { emoji: "🎉", text: "Order complete. Enjoy!", color: "#16A34A", bg: "#DCFCE7" },
};

export default function TicketPage() {
    const [orderStatus, setOrderStatus] = useState("pending_vendor");
    const currentIdx = STEPS.findIndex(s => s.key === orderStatus);
    const msg = STATUS_MESSAGES[orderStatus];

    const advance = () => {
        const keys = STEPS.map(s => s.key);
        const idx = keys.indexOf(orderStatus);
        if (idx < keys.length - 1) setOrderStatus(keys[idx + 1]);
    };

    return (
        <div className="min-h-screen overflow-y-auto" style={{ background: "#FAF8F4", padding: "16px 16px 32px" }}>
            {/* Live status banner */}
            <div className="fade-in flex items-center gap-[10px] rounded-[14px] py-3 px-4 mb-[18px]" style={{ background: msg.bg }}>
                <div className={orderStatus === "pending_vendor" || orderStatus === "accepted" ? "pulse" : ""} style={{ fontSize: 20 }}>
                    {msg.emoji}
                </div>
                <div>
                    <p className="text-[13px] font-semibold" style={{ color: msg.color }}>{msg.text}</p>
                    {orderStatus === "pending_vendor" && (
                        <p className="text-[11px] mt-[1px]" style={{ color: "#6B6560" }}>Vendor has 7 min to respond</p>
                    )}
                </div>
            </div>

            {/* The ticket */}
            <div className="ticket-enter bg-bg-card border border-border-default rounded-[20px] overflow-hidden mb-4" style={{ boxShadow: "0 6px 28px rgba(0,0,0,0.08)" }}>
                {/* Ticket header */}
                <div style={{ background: "#C17D2F", padding: "20px 20px 18px" }}>
                    <p className="text-[10px] font-bold uppercase mb-[6px]" style={{ color: "rgba(255,255,255,0.65)", letterSpacing: 1.2 }}>
                        Order Ticket · {SHOP_NAME}
                    </p>
                    <div className="font-sora text-[56px] font-[800] text-white" style={{ letterSpacing: -2, lineHeight: 1 }}>
                        #{TICKET_NUM}
                    </div>
                    <p className="text-[12px] mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                        Show this number at the shop counter
                    </p>
                </div>

                {/* Dashed tear line */}
                <div className="mx-4 relative" style={{ borderTop: "2px dashed #EAE7E1" }}>
                    <div className="absolute rounded-full" style={{ width: 16, height: 16, background: "#FAF8F4", top: -8, left: -24, border: "1px solid #EAE7E1" }} />
                    <div className="absolute rounded-full" style={{ width: 16, height: 16, background: "#FAF8F4", top: -8, right: -24, border: "1px solid #EAE7E1" }} />
                </div>

                {/* Ticket body */}
                <div className="py-4 px-5">
                    {/* Meta row */}
                    <div className="flex justify-between mb-[14px]">
                        <div>
                            <p className="text-[10px] font-semibold mb-[2px]" style={{ color: "#A8A49E", letterSpacing: 0.6 }}>ORDER ID</p>
                            <p className="text-[13px] font-semibold" style={{ color: "#1C1A17" }}>LK-{TICKET_NUM}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-semibold mb-[2px]" style={{ color: "#A8A49E", letterSpacing: 0.6 }}>PLACED</p>
                            <p className="text-[13px] font-semibold" style={{ color: "#1C1A17" }}>12:41 PM</p>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mb-[14px]">
                        <p className="text-[10px] font-semibold mb-[6px]" style={{ color: "#A8A49E", letterSpacing: 0.6 }}>ITEMS</p>
                        {MOCK_CART_ITEMS.map((item, i) => (
                            <div key={i} className="flex justify-between mb-[3px]">
                                <span className="text-[13px]" style={{ color: "#6B6560" }}>{item.emoji} {item.name} × {item.qty}</span>
                                <span className="text-[13px] font-medium" style={{ color: "#1C1A17" }}>₦{(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid #EAE7E1" }}>
                        <span className="font-semibold text-[14px]">Total paid</span>
                        <span className="font-sora font-[800] text-[16px]" style={{ color: "#C17D2F" }}>₦{MOCK_CART_TOTAL.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Status timeline */}
            <div className="bg-bg-card border border-border-default rounded-[16px] py-4 px-4 mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.9px] mb-[14px]" style={{ color: "#A8A49E" }}>Order status</p>
                {STEPS.map((step, i) => {
                    const done = i <= currentIdx;
                    const active = i === currentIdx;
                    return (
                        <div key={step.key}>
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${active && orderStatus !== "picked_up" ? "pulse" : ""}`}
                                    style={{ background: done ? "#C17D2F" : "#EAE7E1", border: active ? "2px solid #A66A22" : "none" }}>
                                    {done && <span className="text-white text-[10px]">✓</span>}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[13px]" style={{ fontWeight: done ? 600 : 400, color: done ? "#1C1A17" : "#A8A49E" }}>{step.label}</p>
                                    {active && <p className="text-[11px] mt-[1px]" style={{ color: "#6B6560" }}>{step.sub}</p>}
                                </div>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className="ml-[9px] my-[2px]" style={{ width: 2, height: 16, background: i < currentIdx ? "#C17D2F" : "#EAE7E1" }} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Help button */}
            <button className="w-full bg-bg-card border border-border-default rounded-[12px] py-3 font-dm text-[14px] cursor-pointer transition-all hover:border-border-strong flex items-center justify-center gap-[6px] mb-[10px]" style={{ color: "#6B6560" }}>
                💬 Need help with this order?
            </button>

            {/* Demo control */}
            {orderStatus !== "picked_up" && (
                <button onClick={advance} className="w-full rounded-[12px] py-[10px] cursor-pointer font-dm text-[12px] border-none" style={{ background: "#F4F4F5", color: "#A8A49E" }}>
                    ↓ Demo: advance order status
                </button>
            )}
        </div>
    );
}
