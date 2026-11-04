import { useState } from "react";
import { type Product } from "@/types/pos";

export function useInventoryManager(
  products: Product[],
  onUpdateProducts: (updated: Product[]) => void
) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    onUpdateProducts(updated);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    onUpdateProducts(updated);
    setEditingProduct(null);
  };

  const handleAddProduct = (newProduct: Product) => {
    onUpdateProducts([newProduct, ...products]);
    setShowAddModal(false);
  };

  return {
    showAddModal,
    setShowAddModal,
    editingProduct,
    handleOpenEdit,
    handleCloseEdit,
    handleSaveEdit,
    handleDeleteProduct,
    handleAddProduct,
  };
}

