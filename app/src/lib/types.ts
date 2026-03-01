export type ProductStatus = "available" | "few" | "sold" | "paused";

export type OrderStatus =
    | "pending_vendor"
    | "accepted"
    | "ready_for_pickup"
    | "picked_up"
    | "expired"
    | "cancelled"
    // Future delivery states
    | "runner_assigned"
    | "in_transit"
    | "delivered";

export type PaymentStatus = "initiated" | "confirmed" | "failed" | "refunded";

export interface Shop {
    id: number;
    name: string;
    emoji: string;
    zone: string;
    open: boolean;
    rt: string | null;
    desc: string;
    rating: number;
    totalOrders: number;
    tag: string | null;
    cat: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    status: ProductStatus;
    emoji: string;
    note: string | null;
}

export interface ProductSection {
    title: string;
    items: Product[];
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
    emoji: string;
}

export interface VendorOrder {
    id: string;
    status: "pending" | "accepted" | "ready" | "fulfilled";
    timeLeft: number | null;
    items: { name: string; qty: number }[];
    total: number;
    note: string;
    studentName: string;
}

export interface AdminOrder {
    id: string;
    shop: string;
    student: string;
    status: OrderStatus;
    stuckMins: number | null;
    total: number;
    items: string;
}

export interface Vendor {
    id: number;
    name: string;
    emoji: string;
    zone: string;
    open: boolean;
    responseRate: string;
    ordersToday: number;
}

export interface InventoryItem {
    id: number;
    name: string;
    price: number;
    available: boolean;
}
