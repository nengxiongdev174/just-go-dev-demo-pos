import { type Product, type Currency, type ProductCategory } from "@/types/pos";

export interface InventoryManagerProps {
  products: Product[];
  currency: Currency;
  onUpdateProducts: (updated: Product[]) => void;
}

export interface InventoryTableProps {
  products: Product[];
  currency: Currency;
  onOpenEdit: (product: Product) => void;
  onOpenAdd: () => void;
}

export interface InventoryEditModalProps {
  editingProduct: Product | null;
  currency: Currency;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
  onDelete: (productId: string) => void;
}

export interface InventoryAddModalProps {
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  onAdd: (newProduct: Product) => void;
}

export interface ProductFormValues {
  nameEn: string;
  nameTh: string;
  nameLo: string;
  category: ProductCategory;
  priceLAK: number;
  stock: number;
  barcode: string;
}

