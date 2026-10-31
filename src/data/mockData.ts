import { type Product, type Order } from "@/types/pos";

export interface StoreInfo {
  name: string;
  branch: string;
  tel: string;
  address: string;
  website: string;
  taxRate: number;
}

export const CENTRAL_STORE_INFO: StoreInfo = {
  name: "JUSTGODEV CLOUD STORE",
  branch: "Vientiane Flagship",
  tel: "+856 20 77 426 238",
  address: "Phonphanao, Xaysettha, Vientiane Capital",
  website: "justgodev.com",
  taxRate: 0.07, // 7% VAT
};

export const CENTRAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: {
      lo: "ກາເຟລາວດັ້ງເດີມ (Cafe Lao Ice)",
      th: "กาแฟลาวโบราณเย็น (Cafe Lao Ice)",
      en: "Traditional Lao Iced Coffee",
    },
    category: "drinks",
    priceLAK: 25000,
    priceTHB: 40,
    priceUSD: 1.2,
    stock: 45,
    barcode: "885001001",
    icon: "Coffee",
    color: "from-amber-600 to-amber-800",
  },
  {
    id: "prod-2",
    name: {
      lo: "ເບຍລາວ ໂກລດ໌ (Beerlao Gold)",
      th: "เบียร์ลาว โกลด์ (Beerlao Gold)",
      en: "Beerlao Gold Premium 330ml",
    },
    category: "drinks",
    priceLAK: 30000,
    priceTHB: 50,
    priceUSD: 1.5,
    stock: 120,
    barcode: "885001002",
    icon: "Wine",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "prod-3",
    name: {
      lo: "ມັດຊະລາເຕ້ເຢັນ (Iced Matcha)",
      th: "มัทฉะลาเต้เย็น (Iced Matcha Latte)",
      en: "Iced Ceremonial Matcha Latte",
    },
    category: "drinks",
    priceLAK: 35000,
    priceTHB: 55,
    priceUSD: 1.6,
    stock: 28,
    barcode: "885001003",
    icon: "CupSoda",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "prod-4",
    name: {
      lo: "ເຂົ້າປຽກເສັ້ນກະດູກໝູ (Khao Piak Sen)",
      th: "ข้าวเปียกเส้นซี่โครงหมู (Khao Piak Sen)",
      en: "Traditional Lao Rice Noodle Soup",
    },
    category: "food",
    priceLAK: 40000,
    priceTHB: 65,
    priceUSD: 1.9,
    stock: 18,
    barcode: "885002001",
    icon: "Soup",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "prod-5",
    name: {
      lo: "ຕຳໝາກຮຸ່ງຫຼວງພະບາງ (Tam Mak Hoong)",
      th: "ส้มตำหลวงพระบาง (Tam Mak Hoong)",
      en: "Luang Prabang Spicy Papaya Salad",
    },
    category: "food",
    priceLAK: 35000,
    priceTHB: 55,
    priceUSD: 1.6,
    stock: 25,
    barcode: "885002002",
    icon: "Flame",
    color: "from-red-500 to-rose-600",
  },
  {
    id: "prod-6",
    name: {
      lo: "ເຂົ້າໜົມປັງຄຣົວຊອງເນີຍສົດ (Butter Croissant)",
      th: "ครัวซองต์เนยสดฝรั่งเศส (Butter Croissant)",
      en: "French Artisan Butter Croissant",
    },
    category: "food",
    priceLAK: 32000,
    priceTHB: 50,
    priceUSD: 1.5,
    stock: 4,
    barcode: "885002003",
    icon: "Croissant",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "prod-7",
    name: {
      lo: "ຜ້າໄໝລາວຫັດຖະກຳ (Handwoven Lao Silk)",
      th: "ผ้าไหมลาวทอมือแท้ (Handwoven Lao Silk)",
      en: "Handcrafted Lao Silk Scarf",
    },
    category: "retail",
    priceLAK: 250000,
    priceTHB: 390,
    priceUSD: 12.0,
    stock: 12,
    barcode: "885003001",
    icon: "Sparkles",
    color: "from-purple-600 to-indigo-700",
  },
  {
    id: "prod-8",
    name: {
      lo: "ຖົງຜ້າຝ້າຍທຳມະຊາດ (Organic Cotton Tote)",
      th: "ถุงผ้าฝ้ายธรรมชาติ (Organic Cotton Tote)",
      en: "Eco-friendly Organic Cotton Bag",
    },
    category: "retail",
    priceLAK: 65000,
    priceTHB: 99,
    priceUSD: 3.1,
    stock: 3,
    barcode: "885003002",
    icon: "ShoppingBag",
    color: "from-cyan-600 to-blue-700",
  },
  {
    id: "prod-9",
    name: {
      lo: "ຫົວສາກໄວ GaN 65W (Fast Charger 65W)",
      th: "หัวชาร์จเร็ว GaN 65W 3-Port (Fast Charger)",
      en: "GaN 65W Dual Type-C Fast Charger",
    },
    category: "electronics",
    priceLAK: 380000,
    priceTHB: 590,
    priceUSD: 18.5,
    stock: 15,
    barcode: "885004001",
    icon: "Zap",
    color: "from-violet-600 to-fuchsia-700",
  },
  {
    id: "prod-10",
    name: {
      lo: "ຫູຟັງໄຮ້ສາຍ ANC Pro (Wireless Earbuds)",
      th: "หูฟังไร้สาย ANC Pro (Wireless Earbuds)",
      en: "True Wireless ANC Bluetooth Earbuds",
    },
    category: "electronics",
    priceLAK: 620000,
    priceTHB: 990,
    priceUSD: 30.0,
    stock: 5,
    barcode: "885004002",
    icon: "Headphones",
    color: "from-slate-700 to-zinc-900",
  },
];

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

