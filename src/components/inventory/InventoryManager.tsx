"use client";

import React from "react";
import { type InventoryManagerProps } from "@/types/inventory";
import { useInventoryManager } from "@/hooks/useInventoryManager";
import { InventoryTable } from "./InventoryTable";
import { InventoryEditModal } from "./InventoryEditModal";
import { InventoryAddModal } from "./InventoryAddModal";

export function InventoryManager({
  products,
  currency,
  onUpdateProducts,
}: InventoryManagerProps) {
  const {
    showAddModal,
    setShowAddModal,
    editingProduct,
    handleOpenEdit,
    handleCloseEdit,
    handleSaveEdit,
    handleDeleteProduct,
    handleAddProduct,
  } = useInventoryManager(products, onUpdateProducts);

  return (
    <>
      <InventoryTable
        products={products}
        currency={currency}
        onOpenEdit={handleOpenEdit}
        onOpenAdd={() => setShowAddModal(true)}
      />

      <InventoryEditModal
        editingProduct={editingProduct}
        currency={currency}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        onDelete={handleDeleteProduct}
      />

      <InventoryAddModal
        isOpen={showAddModal}
        currency={currency}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
      />
    </>
  );
}
