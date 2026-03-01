import type { Shop, ProductSection, CartItem, VendorOrder, AdminOrder, Vendor, InventoryItem } from "./types";

export const CATEGORIES = [
    { label: "All", icon: "✦" },
    { label: "Food", icon: "🍛" },
    { label: "Snacks", icon: "🧁" },
    { label: "Drinks", icon: "🥤" },
    { label: "Stationery", icon: "📚" },
    { label: "Toiletries", icon: "🧴" },
    { label: "Printing", icon: "🖨️" },
];

export const SHOPS: Shop[] = [
    {
        id: 1, name: "Mama Titi's Kitchen", cat: "Food",
        emoji: "🍛", zone: "Zone A", open: true, rt: "~7 min",
        desc: "Rice, stew, proteins and daily specials",
        rating: 4.8, totalOrders: 312, tag: "Most ordered",
    },
    {
        id: 2, name: "Chillspot Bites", cat: "Snacks",
        emoji: "🧁", zone: "Zone B", open: true, rt: "~5 min",
        desc: "Shawarma, pastries, and cold drinks",
        rating: 4.6, totalOrders: 198, tag: null,
    },
    {
        id: 3, name: "PrintZone", cat: "Printing",
        emoji: "🖨️", zone: "Zone C", open: false, rt: null,
        desc: "Printing, binding, and scanning services",
        rating: 4.4, totalOrders: 87, tag: null,
    },
    {
        id: 4, name: "Campus Mart", cat: "Stationery",
        emoji: "📚", zone: "Zone A", open: true, rt: "~4 min",
        desc: "Books, stationery, and everyday essentials",
        rating: 4.7, totalOrders: 145, tag: "Fastest response",
    },
    {
        id: 5, name: "Hydrate Bar", cat: "Drinks",
        emoji: "🥤", zone: "Zone B", open: true, rt: "~3 min",
        desc: "Bottled water, soft drinks, and juices",
        rating: 4.5, totalOrders: 220, tag: null,
    },
];

export const SHOP_DETAIL = {
    name: "Mama Titi's Kitchen",
    emoji: "🍛",
    zone: "Zone A",
    open: true,
    rt: "~7 min",
    rating: 4.8,
    totalOrders: 312,
    description: "Home-cooked Nigerian meals made fresh daily. Rice, stew, proteins and daily specials.",
};

export const PRODUCT_SECTIONS: ProductSection[] = [
    {
        title: "Rice & Mains",
        items: [
            { id: 1, name: "Jollof Rice", price: 800, status: "available", emoji: "🍚", note: "Spicy party jollof" },
            { id: 2, name: "White Rice + Stew", price: 700, status: "available", emoji: "🍲", note: null },
            { id: 3, name: "Fried Rice + Plantain", price: 900, status: "few", emoji: "🍳", note: "Only 3 portions left" },
            { id: 4, name: "Beans + Fried Yam", price: 700, status: "sold", emoji: "🫘", note: null },
        ],
    },
    {
        title: "Proteins (Add-on)",
        items: [
            { id: 5, name: "Fried Egg", price: 200, status: "available", emoji: "🍳", note: null },
            { id: 6, name: "Boiled Egg", price: 150, status: "available", emoji: "🥚", note: null },
            { id: 7, name: "Sausage (2 pieces)", price: 300, status: "few", emoji: "🌭", note: null },
        ],
    },
    {
        title: "Drinks",
        items: [
            { id: 8, name: "Bottled Water", price: 150, status: "available", emoji: "💧", note: null },
            { id: 9, name: "Zobo", price: 200, status: "available", emoji: "🧃", note: "Made this morning" },
            { id: 10, name: "Malt (Maltina)", price: 300, status: "sold", emoji: "🥤", note: null },
        ],
    },
];

export const MOCK_CART_ITEMS: CartItem[] = [
    { id: 1, name: "Jollof Rice", price: 800, qty: 1, emoji: "🍚" },
    { id: 5, name: "Fried Egg", price: 200, qty: 2, emoji: "🍳" },
    { id: 9, name: "Zobo", price: 200, qty: 1, emoji: "🧃" },
];

export const MOCK_CART_TOTAL = MOCK_CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
export const TICKET_NUM = "5047";
export const SHOP_NAME = "Mama Titi's Kitchen";

export const INIT_VENDOR_ORDERS: VendorOrder[] = [
    {
        id: "5047", status: "pending", timeLeft: 380,
        items: [{ name: "Jollof Rice", qty: 1 }, { name: "Fried Egg", qty: 2 }],
        total: 1200, note: "Extra stew please", studentName: "Adaeze O.",
    },
    {
        id: "5046", status: "accepted", timeLeft: null,
        items: [{ name: "White Rice + Stew", qty: 2 }, { name: "Zobo", qty: 2 }],
        total: 1800, note: "", studentName: "Emeka C.",
    },
    {
        id: "5044", status: "ready", timeLeft: null,
        items: [{ name: "Fried Rice + Plantain", qty: 1 }],
        total: 900, note: "", studentName: "Funmi B.",
    },
    {
        id: "5040", status: "fulfilled", timeLeft: null,
        items: [{ name: "Beans + Fried Yam", qty: 1 }, { name: "Boiled Egg", qty: 1 }],
        total: 850, note: "", studentName: "Tunde A.",
    },
];

export const INIT_INVENTORY: InventoryItem[] = [
    { id: 1, name: "Jollof Rice", price: 800, available: true },
    { id: 2, name: "White Rice + Stew", price: 700, available: true },
    { id: 3, name: "Fried Rice + Plantain", price: 900, available: true },
    { id: 4, name: "Beans + Fried Yam", price: 700, available: false },
    { id: 5, name: "Fried Egg", price: 200, available: true },
    { id: 6, name: "Boiled Egg", price: 150, available: true },
    { id: 7, name: "Sausage (2 pieces)", price: 300, available: true },
    { id: 8, name: "Bottled Water", price: 150, available: true },
    { id: 9, name: "Zobo", price: 200, available: true },
];

export const INIT_ADMIN_ORDERS: AdminOrder[] = [
    { id: "5051", shop: "Mama Titi's Kitchen", student: "Ngozi A.", status: "pending_vendor", stuckMins: 9, total: 1400, items: "Jollof Rice, Fried Egg ×2" },
    { id: "5049", shop: "Chillspot Bites", student: "Chidi B.", status: "pending_vendor", stuckMins: 3, total: 1500, items: "Chicken Shawarma" },
    { id: "5047", shop: "Mama Titi's Kitchen", student: "Adaeze O.", status: "ready_for_pickup", stuckMins: null, total: 1200, items: "Jollof Rice, Fried Egg ×2" },
    { id: "5046", shop: "Campus Mart", student: "Emeka C.", status: "accepted", stuckMins: null, total: 600, items: "A4 Writing Pad, Biro ×2" },
    { id: "5044", shop: "Chillspot Bites", student: "Funmi B.", status: "picked_up", stuckMins: null, total: 900, items: "Shawarma, Chapman" },
];

export const INIT_VENDORS: Vendor[] = [
    { id: 1, name: "Mama Titi's Kitchen", emoji: "🍛", zone: "Zone A", open: true, responseRate: "94%", ordersToday: 12 },
    { id: 2, name: "Chillspot Bites", emoji: "🧁", zone: "Zone B", open: true, responseRate: "88%", ordersToday: 8 },
    { id: 3, name: "PrintZone", emoji: "🖨️", zone: "Zone C", open: false, responseRate: "72%", ordersToday: 2 },
    { id: 4, name: "Campus Mart", emoji: "📚", zone: "Zone A", open: true, responseRate: "97%", ordersToday: 6 },
    { id: 5, name: "Hydrate Bar", emoji: "🥤", zone: "Zone B", open: true, responseRate: "91%", ordersToday: 14 },
];
