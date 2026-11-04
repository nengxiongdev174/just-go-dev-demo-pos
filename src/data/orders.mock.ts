import { type Order } from "@/types/pos";

export const CENTRAL_INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "ORD-9021",
    items: [
      { id: "prod-1", name: "Traditional Lao Iced Coffee", price: 25000, quantity: 2, subtotal: 50000 },
      { id: "prod-6", name: "French Artisan Butter Croissant", price: 32000, quantity: 2, subtotal: 64000 },
    ],
    subtotal: 114000,
    tax: 7980,
    discount: 5000,
    total: 116980,
    currency: "LAK",
    paymentMethod: "qr",
    cashierName: "Khamla (Cashier)",
    createdAt: "10:24 AM",
    timestamp: Date.now() - 1000 * 60 * 45,
  },
  {
    id: "ord-102",
    orderNumber: "ORD-9022",
    items: [
      { id: "prod-2", name: "Beerlao Gold Premium 330ml", price: 30000, quantity: 4, subtotal: 120000 },
      { id: "prod-5", name: "Luang Prabang Spicy Papaya Salad", price: 35000, quantity: 1, subtotal: 35000 },
    ],
    subtotal: 155000,
    tax: 10850,
    discount: 0,
    total: 165850,
    currency: "LAK",
    paymentMethod: "cash",
    cashierName: "Khamla (Cashier)",
    createdAt: "11:15 AM",
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    id: "ord-103",
    orderNumber: "ORD-9023",
    items: [
      { id: "prod-9", name: "GaN 65W Dual Type-C Fast Charger", price: 380000, quantity: 1, subtotal: 380000 },
    ],
    subtotal: 380000,
    tax: 26600,
    discount: 20000,
    total: 386600,
    currency: "LAK",
    paymentMethod: "card",
    cashierName: "Nengxiong (Manager)",
    createdAt: "11:42 AM",
    timestamp: Date.now() - 1000 * 60 * 5,
  },
];

