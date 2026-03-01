"use client";

import { useState, useEffect } from "react";
import { INIT_VENDOR_ORDERS, INIT_INVENTORY } from "@/lib/mock-data";
import type { VendorOrder, InventoryItem } from "@/lib/types";

/* ─── Countdown hook ─── */
function useCountdown(orders: VendorOrder[]) {
    const [timers, setTimers] = useState<Record<string, number>>(() =>
        Object.fromEntries(orders.filter(o => o.timeLeft !== null).map(o => [o.id, o.timeLeft!]))
    );
    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prev => {
                const next = { ...prev };
                Object.keys(next).forEach(id => { if (next[id] > 0) next[id]--; });
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return timers;
}

const formatTime = (secs: number) => {
    if (secs <= 0) return "00:00";
    return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
};

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: "Pending", bg: "#FEF3C7", color: "#D97706" },
    accepted: { label: "Accepted", bg: "#FDF3E3", color: "#C17D2F" },
    ready: { label: "Ready ✓", bg: "#DCFCE7", color: "#16A34A" },
    fulfilled: { label: "Fulfilled", bg: "#F4F4F5", color: "#71717A" },
};

/* ─── Toggle ─── */
function Toggle({ on, onChange, green }: { on: boolean; onChange: () => void; green?: boolean }) {
    return (
        <button onClick={onChange} className="relative flex-shrink-0 border-none cursor-pointer transition-colors duration-200"
            style={{ width: 44, height: 24, borderRadius: 12, background: on ? (green ? "#16A34A" : "#C17D2F") : "#D6D1CA" }}>
            <div className="absolute rounded-full bg-white transition-all duration-200"
                style={{ width: 18, height: 18, top: 3, left: on ? 23 : 3, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
        </button>
    );
}

export default function VendorPage() {
    const [tab, setTab] = useState("orders");
    const [orders, setOrders] = useState(INIT_VENDOR_ORDERS);
    const [inventory, setInventory] = useState(INIT_INVENTORY);
    const [shopOpen, setShopOpen] = useState(true);
    const timers = useCountdown(orders);

    const pendingCount = orders.filter(o => o.status === "pending").length;
    const todayTotal = orders.filter(o => o.status === "fulfilled").reduce((s, o) => s + o.total, 0);

    const updateOrder = (id: string, status: VendorOrder["status"]) =>
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

    return (
        <div className="min-h-screen" style={{ background: "#FAF8F4" }}>
            {/* Vendor header */}
            <div style={{ background: "#C17D2F", padding: "12px 16px 18px" }}>
                <div className="flex items-center justify-between mb-[14px]">
                    <div className="flex items-center gap-[10px]">
                        <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[20px]"
                            style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.25)" }}>🍛</div>
                        <div>
                            <p className="font-sora text-[15px] font-bold text-white">Mama Titi&apos;s Kitchen</p>
                            <div className="flex items-center gap-[6px]">
                                <div className="w-[6px] h-[6px] rounded-full" style={{ background: shopOpen ? "#4ade80" : "#94a3b8" }} />
                                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.75)" }}>{shopOpen ? "Open" : "Closed"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] mb-[2px]" style={{ color: "rgba(255,255,255,0.6)" }}>TODAY&apos;S REVENUE</p>
                        <p className="font-sora text-[18px] font-[800] text-white">₦{todayTotal.toLocaleString()}</p>
                    </div>
                </div>

                {/* Stat pills */}
                <div className="flex gap-2">
                    {[
                        { label: "Pending", value: pendingCount, urgent: pendingCount > 0 },
                        { label: "Active", value: orders.filter(o => ["accepted", "ready"].includes(o.status)).length, urgent: false },
                        { label: "Done today", value: orders.filter(o => o.status === "fulfilled").length, urgent: false },
                    ].map(stat => (
                        <div key={stat.label} className="flex-1 rounded-[10px] py-[7px] px-[10px]"
                            style={{ background: stat.urgent ? "rgba(220,38,38,0.2)" : "rgba(255,255,255,0.15)", border: stat.urgent ? "1px solid rgba(220,38,38,0.4)" : "none" }}>
                            <p className="font-sora text-[17px] font-[800]" style={{ color: stat.urgent ? "#fca5a5" : "#fff" }}>{stat.value}</p>
                            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.65)" }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-bg-card border-b border-border-default">
                {[
                    { key: "orders", label: "Orders", badge: pendingCount },
                    { key: "inventory", label: "Inventory", badge: 0 },
                ].map(tb => (
                    <button key={tb.key} onClick={() => setTab(tb.key)} className="flex-1 py-[9px] bg-none border-none font-dm text-[13px] cursor-pointer transition-all"
                        style={{ fontWeight: tab === tb.key ? 600 : 400, color: tab === tb.key ? "#C17D2F" : "#6B6560", borderBottom: `2px solid ${tab === tb.key ? "#C17D2F" : "transparent"}` }}>
                        <span className="relative inline-flex items-center gap-[6px]">
                            {tb.label}
                            {tb.badge > 0 && (
                                <span className="text-[9px] font-bold py-[1px] px-[5px] rounded-full leading-[1.4]" style={{ background: "#DC2626", color: "#fff" }}>{tb.badge}</span>
                            )}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            {tab === "orders" ? (
                <OrdersTab orders={orders} setOrders={setOrders} timers={timers} updateOrder={updateOrder} />
            ) : (
                <InventoryTab inventory={inventory} setInventory={setInventory} shopOpen={shopOpen} setShopOpen={setShopOpen} />
            )}
        </div>
    );
}

/* ─── ORDERS TAB ─── */
function OrdersTab({ orders, timers, updateOrder, setOrders }: { orders: VendorOrder[]; timers: Record<string, number>; updateOrder: (id: string, status: VendorOrder["status"]) => void; setOrders: React.Dispatch<React.SetStateAction<VendorOrder[]>> }) {
    const active = orders.filter(o => o.status !== "fulfilled");
    const done = orders.filter(o => o.status === "fulfilled");

    return (
        <div className="overflow-y-auto py-[14px] px-[14px] pb-[90px]" style={{ maxHeight: "calc(100vh - 260px)" }}>
            {active.length === 0 && (
                <div className="text-center py-10 px-5" style={{ color: "#A8A49E" }}>
                    <p className="text-[28px] mb-2">🎉</p>
                    <p className="text-[14px]">All caught up — no active orders</p>
                </div>
            )}
            {active.map(order => {
                const isUrgent = order.status === "pending" && timers[order.id] !== undefined && timers[order.id] < 120;
                return (
                    <div key={order.id} className="fade-in bg-bg-card rounded-[14px] mb-[10px] transition-all"
                        style={{
                            padding: "14px 14px 12px",
                            border: order.status === "pending" ? (isUrgent ? "1.5px solid #DC2626" : "1.5px solid #D97706") : "1.5px solid #EAE7E1",
                            boxShadow: order.status === "pending" ? (isUrgent ? "0 0 0 3px #FEE2E2" : "0 0 0 3px #FEF3C7") : "none",
                        }}>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-[10px]">
                            <div>
                                <div className="flex items-center gap-2 mb-[3px]">
                                    <p className="font-sora text-[16px] font-[800]" style={{ color: "#1C1A17" }}>#{order.id}</p>
                                    <span className="text-[10px] font-bold py-[2px] px-2 rounded-full" style={{ background: STATUS_LABELS[order.status].bg, color: STATUS_LABELS[order.status].color, letterSpacing: 0.2 }}>{STATUS_LABELS[order.status].label}</span>
                                </div>
                                <p className="text-[12px]" style={{ color: "#6B6560" }}>{order.studentName}</p>
                            </div>
                            {order.status === "pending" && timers[order.id] !== undefined && (
                                <div className="text-right">
                                    <p className="text-[9px] font-semibold mb-[2px]" style={{ color: "#A8A49E", letterSpacing: 0.8 }}>RESPOND IN</p>
                                    <p className={`font-sora text-[22px] font-[800] leading-none ${isUrgent ? "urgent-pulse" : ""}`} style={{ color: isUrgent ? "#DC2626" : "#D97706" }}>
                                        {formatTime(timers[order.id])}
                                    </p>
                                </div>
                            )}
                        </div>
                        {/* Items */}
                        <div className="rounded-[10px] py-[9px] px-3 mb-[10px]" style={{ background: "#FAF8F4" }}>
                            {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between">
                                    <span className="text-[13px]" style={{ color: "#1C1A17" }}>{item.name}</span>
                                    <span className="text-[13px]" style={{ color: "#6B6560" }}>× {item.qty}</span>
                                </div>
                            ))}
                            {order.note && <p className="text-[12px] mt-[6px] italic" style={{ color: "#D97706" }}>💬 &quot;{order.note}&quot;</p>}
                        </div>
                        {/* Total + actions */}
                        <div className="flex items-center gap-[10px]">
                            <span className="font-sora text-[14px] font-bold mr-1" style={{ color: "#C17D2F" }}>₦{order.total.toLocaleString()}</span>
                            {order.status === "pending" && (
                                <>
                                    <button onClick={() => updateOrder(order.id, "accepted")} className="flex-1 py-[9px] rounded-[10px] border-none font-dm text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-[6px] active:scale-[0.97] transition-transform" style={{ background: "#DCFCE7", color: "#16A34A" }}>✓ Accept</button>
                                    <button onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))} className="flex-1 py-[9px] rounded-[10px] border-none font-dm text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-[6px] active:scale-[0.97] transition-transform" style={{ background: "#FEE2E2", color: "#DC2626" }}>✕ Decline</button>
                                </>
                            )}
                            {order.status === "accepted" && (
                                <button onClick={() => updateOrder(order.id, "ready")} className="flex-1 py-[9px] rounded-[10px] border-none font-dm text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-[6px] active:scale-[0.97] transition-transform" style={{ background: "#FDF3E3", color: "#C17D2F" }}>Mark as Ready →</button>
                            )}
                            {order.status === "ready" && (
                                <button onClick={() => updateOrder(order.id, "fulfilled")} className="flex-1 py-[9px] rounded-[10px] border-none font-dm text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-[6px] active:scale-[0.97] transition-transform" style={{ background: "#DCFCE7", color: "#16A34A" }}>✓ Confirm Pickup</button>
                            )}
                        </div>
                    </div>
                );
            })}
            {done.length > 0 && (
                <>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.8px] mt-[14px] mb-[10px]" style={{ color: "#A8A49E" }}>Completed today</p>
                    {done.map(order => (
                        <div key={order.id} className="bg-bg-card rounded-[14px] mb-[10px] opacity-60" style={{ padding: "14px 14px 12px", border: "1.5px solid #EAE7E1" }}>
                            <div className="flex items-center gap-2 mb-[3px]">
                                <p className="font-sora text-[16px] font-[800]" style={{ color: "#1C1A17" }}>#{order.id}</p>
                                <span className="text-[10px] font-bold py-[2px] px-2 rounded-full" style={{ background: "#F4F4F5", color: "#71717A" }}>Fulfilled</span>
                            </div>
                            <p className="text-[12px] mb-2" style={{ color: "#6B6560" }}>{order.studentName}</p>
                            <div className="flex items-center gap-[10px]">
                                <span className="font-sora text-[14px] font-bold" style={{ color: "#C17D2F" }}>₦{order.total.toLocaleString()}</span>
                                <span className="text-[12px] font-medium" style={{ color: "#71717A" }}>Complete</span>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

/* ─── INVENTORY TAB ─── */
function InventoryTab({ inventory, setInventory, shopOpen, setShopOpen }: { inventory: InventoryItem[]; setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>; shopOpen: boolean; setShopOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const toggleItem = (id: number) => setInventory(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
    const pauseAll = () => setInventory(prev => prev.map(i => ({ ...i, available: false })));
    const resumeAll = () => setInventory(prev => prev.map(i => ({ ...i, available: true })));

    return (
        <div className="overflow-y-auto py-[14px] px-[14px] pb-[90px]" style={{ maxHeight: "calc(100vh - 260px)" }}>
            {/* Shop open/close */}
            <div className="flex items-center justify-between rounded-[14px] py-[14px] px-4 mb-4"
                style={{ background: shopOpen ? "#DCFCE7" : "#F4F4F5", border: `1px solid ${shopOpen ? "#BBF7D0" : "#EAE7E1"}` }}>
                <div>
                    <p className="text-[14px] font-semibold mb-[2px]" style={{ color: "#1C1A17" }}>Shop status</p>
                    <p className="text-[12px] font-medium" style={{ color: shopOpen ? "#16A34A" : "#71717A" }}>
                        {shopOpen ? "Open — students can order" : "Closed — no new orders"}
                    </p>
                </div>
                <Toggle on={shopOpen} onChange={() => setShopOpen(!shopOpen)} />
            </div>

            {/* Bulk actions */}
            <div className="flex gap-2 mb-[14px]">
                <button onClick={pauseAll} className="flex-1 py-2 rounded-[10px] bg-bg-card cursor-pointer font-dm text-[12px] font-medium" style={{ border: "1px solid #EAE7E1", color: "#DC2626" }}>Pause all items</button>
                <button onClick={resumeAll} className="flex-1 py-2 rounded-[10px] bg-bg-card cursor-pointer font-dm text-[12px] font-medium" style={{ border: "1px solid #EAE7E1", color: "#16A34A" }}>Resume all</button>
            </div>

            {/* Item list */}
            <div className="bg-bg-card border border-border-default rounded-[14px] overflow-hidden">
                {inventory.map((item, i) => (
                    <div key={item.id} className="flex items-center justify-between py-3 px-[14px]" style={{ borderBottom: i < inventory.length - 1 ? "1px solid #EAE7E1" : "none" }}>
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium" style={{ color: item.available ? "#1C1A17" : "#A8A49E" }}>{item.name}</p>
                            <p className="text-[12px]" style={{ color: "#A8A49E" }}>₦{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <span className="text-[10px] font-bold py-[2px] px-2 rounded-full" style={{ background: item.available ? "#DCFCE7" : "#F4F4F5", color: item.available ? "#16A34A" : "#71717A" }}>
                                {item.available ? "Available" : "Paused"}
                            </span>
                            <Toggle on={item.available} onChange={() => toggleItem(item.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
