import { useState } from "react";

// ─── SAVANNA TOKENS ───────────────────────────────────────────────────────────
const t = {
  brand: "#C17D2F",
  brandDim: "#A66A22",
  brandLight: "#FDF3E3",
  brandLighter: "#FEF9F0",
  accentText: "#7A4E18",
  bg: "#FAF8F4",
  bgCard: "#FFFFFF",
  text: "#1C1A17",
  textMuted: "#6B6560",
  textFaint: "#A8A49E",
  border: "#EAE7E1",
  borderStrong: "#D6D1CA",
  pill: "#F5ECD8",
  pillText: "#7A4E18",
  statusGreen: "#16A34A", statusGreenBg: "#DCFCE7",
  statusAmber: "#D97706", statusAmberBg: "#FEF3C7",
  statusRed: "#DC2626",   statusRedBg: "#FEE2E2",
  statusGrey: "#71717A",  statusGreyBg: "#F4F4F5",
};

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root { background: ${t.bg}; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .sora { font-family: 'Sora', sans-serif; }
    ::-webkit-scrollbar { display: none; }

    .shop-card {
      background: ${t.bgCard};
      border: 1px solid ${t.border};
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .shop-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(193,125,47,0.12);
      border-color: ${t.borderStrong};
    }
    .shop-card:active { transform: translateY(0); }

    .cat-btn {
      white-space: nowrap;
      border: none;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.13s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .cat-btn:active { transform: scale(0.96); }

    .bottom-icon {
      display: flex; flex-direction: column; align-items: center;
      gap: 3px; cursor: pointer; transition: opacity 0.12s;
      background: none; border: none;
    }
    .bottom-icon:active { opacity: 0.6; }

    .search-bar {
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .search-bar:hover {
      border-color: ${t.borderStrong} !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
    }

    .fade-in { animation: fadeIn 0.22s ease-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .stagger-1 { animation: fadeIn 0.22s ease-out 0.04s both; }
    .stagger-2 { animation: fadeIn 0.22s ease-out 0.08s both; }
    .stagger-3 { animation: fadeIn 0.22s ease-out 0.12s both; }
    .stagger-4 { animation: fadeIn 0.22s ease-out 0.16s both; }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: "All",         icon: "✦" },
  { label: "Food",        icon: "🍛" },
  { label: "Snacks",      icon: "🧁" },
  { label: "Drinks",      icon: "🥤" },
  { label: "Stationery",  icon: "📚" },
  { label: "Toiletries",  icon: "🧴" },
  { label: "Printing",    icon: "🖨️" },
];

const SHOPS = [
  {
    id: 1, name: "Mama Titi's Kitchen", cat: "Food",
    emoji: "🍛", zone: "Zone A", open: true, rt: "~7 min",
    desc: "Rice, stew, proteins and daily specials",
    rating: 4.8, totalOrders: 312,
    tag: "Most ordered",
  },
  {
    id: 2, name: "Chillspot Bites", cat: "Snacks",
    emoji: "🧁", zone: "Zone B", open: true, rt: "~5 min",
    desc: "Shawarma, pastries, and cold drinks",
    rating: 4.6, totalOrders: 198,
    tag: null,
  },
  {
    id: 3, name: "PrintZone", cat: "Printing",
    emoji: "🖨️", zone: "Zone C", open: false, rt: null,
    desc: "Printing, binding, and scanning services",
    rating: 4.4, totalOrders: 87,
    tag: null,
  },
  {
    id: 4, name: "Campus Mart", cat: "Stationery",
    emoji: "📚", zone: "Zone A", open: true, rt: "~4 min",
    desc: "Books, stationery, and everyday essentials",
    rating: 4.7, totalOrders: 145,
    tag: "Fastest response",
  },
  {
    id: 5, name: "Hydrate Bar", cat: "Drinks",
    emoji: "🥤", zone: "Zone B", open: true, rt: "~3 min",
    desc: "Bottled water, soft drinks, and juices",
    rating: 4.5, totalOrders: 220,
    tag: null,
  },
];

// ─── MICRO COMPONENTS ─────────────────────────────────────────────────────────
const OpenBadge = ({ open }) => (
  <span style={{
    fontSize: 10, fontWeight: 700, padding: "2px 8px",
    borderRadius: 20, letterSpacing: 0.2, flexShrink: 0,
    background: open ? t.statusGreenBg : t.statusGreyBg,
    color: open ? t.statusGreen : t.statusGrey,
  }}>
    {open ? "Open" : "Closed"}
  </span>
);

const Tag = ({ label }) => (
  <span style={{
    fontSize: 10, fontWeight: 600, padding: "2px 8px",
    borderRadius: 20, background: t.pill, color: t.pillText,
    letterSpacing: 0.2
  }}>
    {label}
  </span>
);

// ─── SHOP CARD ────────────────────────────────────────────────────────────────
const ShopCard = ({ shop, onClick }) => (
  <div className="shop-card" onClick={onClick}>
    <div style={{ display: "flex" }}>
      {/* Left: emoji */}
      <div style={{
        width: 80, flexShrink: 0, minHeight: 90,
        background: shop.open ? t.brandLight : t.statusGreyBg,
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 32,
        position: "relative"
      }}>
        {shop.emoji}
        {!shop.open && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(255,255,255,0.45)"
          }} />
        )}
      </div>

      {/* Right: info */}
      <div style={{ padding: "12px 14px 12px", flex: 1, minWidth: 0 }}>
        {/* Name row */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", gap: 8, marginBottom: 4
        }}>
          <p className="sora" style={{
            fontWeight: 600, fontSize: 14, color: shop.open ? t.text : t.textMuted,
            lineHeight: 1.3
          }}>
            {shop.name}
          </p>
          <OpenBadge open={shop.open} />
        </div>

        {/* Description */}
        <p style={{
          fontSize: 12, color: t.textMuted, lineHeight: 1.5,
          marginBottom: 8,
          opacity: shop.open ? 1 : 0.6
        }}>
          {shop.desc}
        </p>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: t.textFaint }}>📍 {shop.zone}</span>
          {shop.open && shop.rt && (
            <span style={{ fontSize: 11, color: t.brand, fontWeight: 600 }}>⚡ {shop.rt}</span>
          )}
          <span style={{ fontSize: 11, color: t.textFaint }}>⭐ {shop.rating}</span>
          {shop.tag && <Tag label={shop.tag} />}
        </div>
      </div>
    </div>
  </div>
);

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────
export default function StudentHome() {
  const [activeCat, setActiveCat] = useState("All");
  const [activeNav, setActiveNav] = useState("home");

  const filtered = activeCat === "All"
    ? SHOPS
    : SHOPS.filter(s => s.cat === activeCat);

  const openShops   = filtered.filter(s => s.open);
  const closedShops = filtered.filter(s => !s.open);

  return (
    <>
      <G />

      {/* Phone frame (desktop preview) */}
      <div style={{
        minHeight: "100vh", background: "#E8E5DF",
        display: "flex", alignItems: "flex-start",
        justifyContent: "center", padding: "32px 16px 48px"
      }}>
        <div style={{
          width: "100%", maxWidth: 390,
          background: t.bg, borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: "6px solid #1A1A18",
          position: "relative"
        }}>

          {/* ── STATUS BAR ── */}
          <div style={{
            background: t.bg, padding: "12px 20px 4px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>9:41</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ fontSize: 11 }}>●●●●</span>
              <span style={{ fontSize: 11 }}>WiFi</span>
              <span style={{ fontSize: 11 }}>🔋</span>
            </div>
          </div>

          {/* ── TOP BAR ── */}
          <div style={{
            padding: "6px 18px 10px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: t.bg
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, background: t.brand, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "Sora" }}>L</span>
              </div>
              <span className="sora" style={{ fontWeight: 700, fontSize: 17, color: t.text, letterSpacing: -0.3 }}>
                link3y
              </span>
            </div>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: t.bgCard, border: `1px solid ${t.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, cursor: "pointer"
            }}>
              🔔
            </div>
          </div>

          {/* ── SCROLL AREA ── */}
          <div style={{ overflowY: "auto", maxHeight: 680, paddingBottom: 72 }}>

            {/* Greeting + headline */}
            <div className="fade-in" style={{ padding: "4px 18px 18px" }}>
              <p style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>
                Good afternoon, Kachi 👋
              </p>
              <h1 className="sora" style={{
                fontSize: 22, fontWeight: 800, color: t.text,
                lineHeight: 1.2, letterSpacing: -0.4
              }}>
                What do you need<br />right now?
              </h1>
            </div>

            {/* Search bar */}
            <div className="stagger-1" style={{ padding: "0 18px 18px" }}>
              <div className="search-bar" style={{
                display: "flex", alignItems: "center", gap: 10,
                background: t.bgCard, border: `1px solid ${t.border}`,
                borderRadius: 13, padding: "12px 14px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke={t.textFaint} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <span style={{ fontSize: 14, color: t.textFaint }}>
                  Search shops or items…
                </span>
              </div>
            </div>

            {/* Categories */}
            <div className="stagger-2" style={{
              display: "flex", gap: 7, overflowX: "auto",
              padding: "0 18px 20px", scrollbarWidth: "none"
            }}>
              {CATEGORIES.map(cat => {
                const active = activeCat === cat.label;
                return (
                  <button
                    key={cat.label}
                    className="cat-btn"
                    onClick={() => setActiveCat(cat.label)}
                    style={{
                      padding: active ? "7px 14px" : "6px 13px",
                      borderRadius: 20,
                      border: active ? "none" : `1px solid ${t.border}`,
                      fontSize: 13, fontWeight: active ? 600 : 400,
                      background: active ? t.brand : t.bgCard,
                      color: active ? "#fff" : t.textMuted,
                      display: "flex", alignItems: "center", gap: 5,
                      boxShadow: active ? `0 4px 12px rgba(193,125,47,0.3)` : "none",
                    }}
                  >
                    <span style={{ fontSize: 12 }}>{cat.icon}</span>
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Shop list */}
            <div className="stagger-3" style={{ padding: "0 18px" }}>

              {/* Open shops */}
              {openShops.length > 0 && (
                <>
                  <p style={{
                    fontSize: 11, fontWeight: 600, color: t.textFaint,
                    letterSpacing: 0.9, textTransform: "uppercase",
                    marginBottom: 10
                  }}>
                    {activeCat === "All" ? "Open now" : activeCat}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
                    {openShops.map(shop => (
                      <ShopCard key={shop.id} shop={shop} onClick={() => {}} />
                    ))}
                  </div>
                </>
              )}

              {/* Closed shops */}
              {closedShops.length > 0 && (
                <>
                  <p style={{
                    fontSize: 11, fontWeight: 600, color: t.textFaint,
                    letterSpacing: 0.9, textTransform: "uppercase",
                    marginBottom: 10
                  }}>
                    Closed now
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {closedShops.map(shop => (
                      <ShopCard key={shop.id} shop={shop} onClick={() => {}} />
                    ))}
                  </div>
                </>
              )}

              {filtered.length === 0 && (
                <div style={{
                  textAlign: "center", padding: "40px 20px",
                  color: t.textFaint
                }}>
                  <p style={{ fontSize: 32, marginBottom: 10 }}>🔍</p>
                  <p style={{ fontSize: 14 }}>No shops in this category yet</p>
                </div>
              )}
            </div>
          </div>

          {/* ── BOTTOM NAV ── */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            borderTop: `1px solid ${t.border}`,
            padding: "10px 0 16px",
            display: "flex", justifyContent: "space-around",
          }}>
            {[
              { id: "home",   icon: "home",   label: "Home"   },
              { id: "orders", icon: "bag",    label: "Orders" },
              { id: "help",   icon: "chat",   label: "Support"},
            ].map(item => {
              const active = activeNav === item.id;
              const icons = {
                home: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? t.brand : "none"}
                    stroke={active ? t.brand : t.textFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                ),
                bag: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke={active ? t.brand : t.textFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                ),
                chat: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke={active ? t.brand : t.textFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
              };
              return (
                <button key={item.id} className="bottom-icon"
                  onClick={() => setActiveNav(item.id)}>
                  {icons[item.icon]}
                  <span style={{
                    fontSize: 10, fontWeight: active ? 600 : 400,
                    color: active ? t.brand : t.textFaint,
                    transition: "color 0.12s"
                  }}>
                    {item.label}
                  </span>
                  {active && (
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: t.brand, marginTop: 1
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Annotation panel beside phone */}
        <div style={{
          marginLeft: 32, maxWidth: 260, paddingTop: 8,
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          <div>
            <p className="sora" style={{ fontWeight: 700, fontSize: 15, color: "#1C1A17", marginBottom: 4 }}>
              Student Home
            </p>
            <p style={{ fontSize: 13, color: "#6B6560", lineHeight: 1.6 }}>
              The first screen students see. Every decision here is about getting them to a shop and placing an order with minimum friction.
            </p>
          </div>

          {[
            {
              label: "Greeting + headline",
              note: "Personalised when logged in. Sets a warm, direct tone. Font is Sora 800 — confident without being loud."
            },
            {
              label: "Search bar",
              note: "Passive for now (no backend). It sets the expectation and visual anchor. Activates in Phase 2."
            },
            {
              label: "Category pills",
              note: "Horizontal scroll. Active pill gets the brand amber + shadow. Icons beside labels help skim fast on mobile."
            },
            {
              label: "Shop cards",
              note: "Open/closed split into two sections automatically. Closed shops dimmed but visible — transparency builds trust."
            },
            {
              label: "Response time",
              note: "\"⚡ ~7 min\" — the most trust-building element on the card. Sets expectation before they even tap."
            },
            {
              label: "Tags (Most ordered, Fastest)",
              note: "Social proof without ratings inflation. Earned from real order data — key for investor story."
            },
            {
              label: "Bottom nav",
              note: "Frosted glass. Three tabs only: Home, Orders, Support. No clutter. Active state = amber dot indicator."
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 12, padding: "11px 14px",
              border: "1px solid #EAE7E1"
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#1C1A17", marginBottom: 3 }}>
                {item.label}
              </p>
              <p style={{ fontSize: 12, color: "#6B6560", lineHeight: 1.5 }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
