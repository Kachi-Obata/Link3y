import { useState } from "react";

// ─── SAVANNA TOKENS ───────────────────────────────────────────────────────────
const t = {
  brand: "#C17D2F", brandDim: "#A66A22", brandLight: "#FDF3E3",
  brandLighter: "#FEF9F0", accentText: "#7A4E18",
  bg: "#FAF8F4", bgCard: "#FFFFFF",
  text: "#1C1A17", textMuted: "#6B6560", textFaint: "#A8A49E",
  border: "#EAE7E1", borderStrong: "#D6D1CA",
  statusGreen: "#16A34A", statusGreenBg: "#DCFCE7",
  statusAmber: "#D97706", statusAmberBg: "#FEF3C7",
  statusRed: "#DC2626", statusRedBg: "#FEE2E2",
  statusGrey: "#71717A", statusGreyBg: "#F4F4F5",
};

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root { background: #E8E5DF; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .sora { font-family: 'Sora', sans-serif; }
    ::-webkit-scrollbar { display: none; }

    .admin-card {
      background: ${t.bgCard}; border-radius: 14px;
      border: 1.5px solid ${t.border};
      transition: border-color 0.15s;
    }
    .admin-card.stuck { border-color: ${t.statusRed}; }
    .admin-card.ready { border-color: ${t.statusGreen}; }

    .micro-btn {
      padding: 5px 10px; border-radius: 8px; border: none;
      font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
      cursor: pointer; transition: opacity 0.12s, transform 0.1s;
      display: inline-flex; align-items: center; gap: 4px;
    }
    .micro-btn:active { transform: scale(0.95); }

    .tab-btn {
      flex: 1; padding: 9px 0; background: none; border: none;
      font-family: 'DM Sans', sans-serif; font-size: 12px;
      cursor: pointer; transition: all 0.12s; border-bottom: 2px solid transparent;
    }

    .vendor-row {
      display: flex; align-items: center; padding: 12px 14px;
      border-bottom: 1px solid ${t.border}; gap: 10px;
    }
    .vendor-row:last-child { border-bottom: none; }

    .toggle-track {
      width: 38px; height: 21px; border-radius: 11px; border: none;
      cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0;
    }
    .toggle-thumb {
      width: 15px; height: 15px; background: #fff; border-radius: 50%;
      position: absolute; top: 3px; transition: left 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    .fade-in { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INIT_ORDERS = [
  { id: "5051", shop: "Mama Titi's Kitchen", student: "Ngozi A.", status: "pending_vendor", stuckMins: 9,  total: 1400, items: "Jollof Rice, Fried Egg ×2" },
  { id: "5049", shop: "Chillspot Bites",     student: "Chidi B.", status: "pending_vendor", stuckMins: 3,  total: 1500, items: "Chicken Shawarma" },
  { id: "5047", shop: "Mama Titi's Kitchen", student: "Adaeze O.", status: "ready_for_pickup", stuckMins: null, total: 1200, items: "Jollof Rice, Fried Egg ×2" },
  { id: "5046", shop: "Campus Mart",         student: "Emeka C.", status: "accepted",        stuckMins: null, total: 600,  items: "A4 Writing Pad, Biro ×2" },
  { id: "5044", shop: "Chillspot Bites",     student: "Funmi B.", status: "picked_up",       stuckMins: null, total: 900,  items: "Shawarma, Chapman" },
];

const INIT_VENDORS = [
  { id: 1, name: "Mama Titi's Kitchen", emoji: "🍛", zone: "Zone A", open: true,  responseRate: "94%", ordersToday: 12 },
  { id: 2, name: "Chillspot Bites",     emoji: "🧁", zone: "Zone B", open: true,  responseRate: "88%", ordersToday: 8  },
  { id: 3, name: "PrintZone",           emoji: "🖨️", zone: "Zone C", open: false, responseRate: "72%", ordersToday: 2  },
  { id: 4, name: "Campus Mart",         emoji: "📚", zone: "Zone A", open: true,  responseRate: "97%", ordersToday: 6  },
  { id: 5, name: "Hydrate Bar",         emoji: "🥤", zone: "Zone B", open: true,  responseRate: "91%", ordersToday: 14 },
];

const STATUS_MAP = {
  pending_vendor:   { label: "Pending",  bg: t.statusAmberBg, color: t.statusAmber },
  accepted:         { label: "Accepted", bg: t.brandLight,    color: t.brand       },
  ready_for_pickup: { label: "Ready ✓",  bg: t.statusGreenBg, color: t.statusGreen },
  picked_up:        { label: "Collected",bg: t.statusGreyBg,  color: t.statusGrey  },
  cancelled:        { label: "Cancelled",bg: t.statusRedBg,   color: t.statusRed   },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_MAP[status] || STATUS_MAP.cancelled;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: cfg.bg, color: cfg.color, flexShrink: 0,
    }}>{cfg.label}</span>
  );
};

const Toggle = ({ on, onChange }) => (
  <button className="toggle-track" onClick={onChange}
    style={{ background: on ? t.statusGreen : t.borderStrong }}>
    <div className="toggle-thumb" style={{ left: on ? 20 : 3 }} />
  </button>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, sub }) => (
  <div style={{
    background: t.bgCard, border: `1px solid ${t.border}`,
    borderRadius: 12, padding: "11px 13px", flex: 1
  }}>
    <p className="sora" style={{ fontSize: 22, fontWeight: 800, color: color || t.text, lineHeight: 1, marginBottom: 3 }}>
      {value}
    </p>
    <p style={{ fontSize: 11, color: t.textFaint, fontWeight: 500 }}>{label}</p>
    {sub && <p style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>{sub}</p>}
  </div>
);

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
const OrdersTab = ({ orders, setOrders }) => {
  const forceComplete = (id) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "picked_up", stuckMins: null } : o));
  const forceCancel   = (id) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "cancelled",  stuckMins: null } : o));
  const resend        = (id) => {}; // mock

  const stuck = orders.filter(o => o.status === "pending_vendor" && o.stuckMins >= 5);

  return (
    <div style={{ padding: "14px 14px 90px", overflowY: "auto", maxHeight: 530 }}>

      {/* Stuck alert */}
      {stuck.length > 0 && (
        <div className="fade-in" style={{
          background: t.statusRedBg, border: `1px solid #FCA5A5`,
          borderRadius: 12, padding: "11px 14px", marginBottom: 14,
          display: "flex", gap: 10, alignItems: "flex-start"
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: t.statusRed, marginBottom: 1 }}>
              {stuck.length} order{stuck.length > 1 ? "s" : ""} stuck — vendor not responding
            </p>
            <p style={{ fontSize: 11, color: t.textMuted }}>
              Intervene manually or resend vendor notification
            </p>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {orders.map(order => {
          const isStuck = order.status === "pending_vendor" && order.stuckMins >= 5;
          const isDone  = order.status === "picked_up" || order.status === "cancelled";
          return (
            <div key={order.id}
              className={`admin-card ${isStuck ? "stuck" : order.status === "ready_for_pickup" ? "ready" : ""}`}
              style={{ padding: "12px 14px", opacity: isDone ? 0.55 : 1 }}>

              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                    <p className="sora" style={{ fontSize: 14, fontWeight: 800, color: t.text }}>LK-{order.id}</p>
                    <StatusBadge status={order.status} />
                    {isStuck && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 20,
                        background: t.statusRedBg, color: t.statusRed
                      }}>
                        Stuck {order.stuckMins}m
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: t.textMuted }}>
                    {order.shop} · {order.student}
                  </p>
                </div>
                <span className="sora" style={{ fontSize: 13, fontWeight: 700, color: t.brand }}>
                  ₦{order.total.toLocaleString()}
                </span>
              </div>

              {/* Items */}
              <p style={{ fontSize: 12, color: t.textFaint, marginBottom: isDone ? 0 : 10, lineHeight: 1.4 }}>
                {order.items}
              </p>

              {/* Actions */}
              {!isDone && (
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="micro-btn" onClick={() => forceComplete(order.id)}
                    style={{ background: t.statusGreenBg, color: t.statusGreen }}>
                    ✓ Force complete
                  </button>
                  <button className="micro-btn" onClick={() => forceCancel(order.id)}
                    style={{ background: t.statusRedBg, color: t.statusRed }}>
                    ✕ Cancel
                  </button>
                  <button className="micro-btn" onClick={() => resend(order.id)}
                    style={{ background: t.statusGreyBg, color: t.statusGrey }}>
                    📣 Resend
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── VENDORS TAB ─────────────────────────────────────────────────────────────
const VendorsTab = ({ vendors, setVendors }) => {
  const toggleVendor = (id) =>
    setVendors(prev => prev.map(v => v.id === id ? { ...v, open: !v.open } : v));

  return (
    <div style={{ padding: "14px 14px 90px", overflowY: "auto", maxHeight: 530 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: t.textFaint, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
        All vendors
      </p>
      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden" }}>
        {vendors.map((vendor, i) => (
          <div key={vendor.id} className="vendor-row">
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: vendor.open ? t.brandLight : t.statusGreyBg,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
            }}>
              {vendor.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 2 }}>{vendor.name}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 11, color: t.textFaint }}>📍 {vendor.zone}</span>
                <span style={{ fontSize: 11, color: t.textFaint }}>
                  Response: <span style={{
                    color: parseInt(vendor.responseRate) >= 90 ? t.statusGreen : t.statusAmber,
                    fontWeight: 600
                  }}>{vendor.responseRate}</span>
                </span>
                <span style={{ fontSize: 11, color: t.textFaint }}>{vendor.ordersToday} orders</span>
              </div>
            </div>
            <Toggle on={vendor.open} onChange={() => toggleVendor(vendor.id)} />
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: t.textFaint, marginTop: 10, lineHeight: 1.5, textAlign: "center" }}>
        Toggling a vendor offline immediately stops new orders to their shop
      </p>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AdminConsole() {
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [vendors, setVendors] = useState(INIT_VENDORS);

  const liveOrders   = orders.filter(o => !["picked_up","cancelled"].includes(o.status));
  const stuckOrders  = orders.filter(o => o.status === "pending_vendor" && o.stuckMins >= 5);
  const readyOrders  = orders.filter(o => o.status === "ready_for_pickup");
  const doneOrders   = orders.filter(o => o.status === "picked_up");
  const openVendors  = vendors.filter(v => v.open).length;
  const totalRevenue = orders.filter(o => o.status === "picked_up").reduce((s, o) => s + o.total, 0);

  return (
    <>
      <G />
      <div style={{
        minHeight: "100vh", background: "#E8E5DF",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "32px 16px 48px", gap: 32
      }}>
        {/* Phone */}
        <div style={{
          width: "100%", maxWidth: 390, background: t.bg,
          borderRadius: 36, overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: "6px solid #1A1A18", minHeight: 720, position: "relative"
        }}>

          {/* Status bar */}
          <div style={{ background: "#1C1A17", padding: "12px 20px 6px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>9:41</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>●●●● WiFi 🔋</span>
          </div>

          {/* Admin header */}
          <div style={{ background: "#1C1A17", padding: "8px 16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <div style={{
                    width: 26, height: 26, background: t.brand, borderRadius: 7,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "Sora" }}>L</span>
                  </div>
                  <p className="sora" style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Ops Console</p>
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                  {openVendors}/{vendors.length} vendors online · Babcock Campus
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: 0.8, marginBottom: 2 }}>TODAY'S GMV</p>
                <p className="sora" style={{ fontSize: 18, fontWeight: 800, color: t.brand }}>
                  ₦{totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Live",   value: liveOrders.length,  color: "#fff" },
                { label: "Stuck",  value: stuckOrders.length, color: stuckOrders.length > 0 ? "#fca5a5" : "#fff" },
                { label: "Ready",  value: readyOrders.length, color: "#86efac" },
                { label: "Done",   value: doneOrders.length,  color: "rgba(255,255,255,0.5)" },
              ].map(stat => (
                <div key={stat.label} style={{
                  flex: 1, background: "rgba(255,255,255,0.07)",
                  borderRadius: 10, padding: "8px 10px",
                  border: stat.label === "Stuck" && stuckOrders.length > 0
                    ? "1px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.08)"
                }}>
                  <p className="sora" style={{ fontSize: 18, fontWeight: 800, color: stat.color, lineHeight: 1, marginBottom: 2 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: t.bgCard, borderBottom: `1px solid ${t.border}` }}>
            {[
              { key: "orders", label: "Orders", badge: stuckOrders.length },
              { key: "vendors", label: "Vendors" },
            ].map(tb => (
              <button key={tb.key} className="tab-btn" onClick={() => setTab(tb.key)} style={{
                fontWeight: tab === tb.key ? 600 : 400,
                color: tab === tb.key ? t.brand : t.textMuted,
                borderBottom: `2px solid ${tab === tb.key ? t.brand : "transparent"}`,
              }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {tb.label}
                  {tb.badge > 0 && (
                    <span style={{
                      background: t.statusRed, color: "#fff",
                      fontSize: 9, fontWeight: 700, padding: "1px 5px",
                      borderRadius: 10, lineHeight: 1.4
                    }}>{tb.badge}</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {tab === "orders"
            ? <OrdersTab orders={orders} setOrders={setOrders} />
            : <VendorsTab vendors={vendors} setVendors={setVendors} />
          }
        </div>

        {/* Annotations */}
        <div style={{ maxWidth: 260, paddingTop: 8, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p className="sora" style={{ fontWeight: 700, fontSize: 15, color: "#1C1A17", marginBottom: 4 }}>
              Admin Console
            </p>
            <p style={{ fontSize: 13, color: "#6B6560", lineHeight: 1.6 }}>
              The ops nerve centre. Intentionally dark header to feel distinct from the student and vendor views — this is a different kind of screen.
            </p>
          </div>
          {[
            { label: "Dark header — deliberate", note: "The admin console uses a near-black header to visually signal 'this is a control room, not a customer app'. It's a different level of access and should feel that way." },
            { label: "GMV at a glance", note: "Gross Merchandise Value — the total value of fulfilled orders today. This is the number that matters for your investor story. It's in the header so it's always visible." },
            { label: "Stuck orders alert", note: "If a vendor hasn't responded past the threshold, a red alert appears automatically. The tab badge also shows the count. Nothing gets missed silently." },
            { label: "Force complete / Cancel / Resend", note: "Three levers for every live order. Force complete for when a vendor fulfils offline. Cancel for dead orders. Resend fires the notification again without a backend redeploy." },
            { label: "Vendors tab — response rate", note: "Each vendor's response rate is visible. Below 90% turns amber. Admin can toggle any vendor offline instantly — useful if a shop goes unresponsive mid-day." },
            { label: "No complex charts yet", note: "Metrics and graphs come later when there's real data. For MVP the admin just needs to see what's happening right now and be able to intervene. Keep it operational." },
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "11px 14px", border: "1px solid #EAE7E1" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1A17", marginBottom: 3 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: "#6B6560", lineHeight: 1.5 }}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
