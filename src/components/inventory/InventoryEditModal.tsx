"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Trash2, AlertCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Product, type ProductCategory } from "@/types/pos";
import { type InventoryEditModalProps } from "@/types/inventory";
import { useLanguage } from "@/context/LanguageContext";

interface EditFormProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
  onDelete: (productId: string) => void;
}

function EditForm({ product, onClose, onSave, onDelete }: EditFormProps) {
  const { dictionary } = useLanguage();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [editNameEn, setEditNameEn] = useState(product.name.en || "");
  const [editNameTh, setEditNameTh] = useState(product.name.th || "");
  const [editNameLo, setEditNameLo] = useState(product.name.lo || "");
  const [editCategory, setEditCategory] = useState<ProductCategory>(product.category);
  const [editPriceLAK, setEditPriceLAK] = useState<number | string>(product.priceLAK);
  const [editStock, setEditStock] = useState<number | string>(product.stock);
  const [editBarcode, setEditBarcode] = useState(product.barcode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = Number(editPriceLAK) || 0;
    const parsedStock = Math.max(0, Number(editStock) || 0);

    const updated: Product = {
      ...product,
      barcode: editBarcode.trim() || product.barcode,
      name: {
        en: editNameEn.trim() || product.name.en,
        th: editNameTh.trim() || product.name.th,
        lo: editNameLo.trim() || product.name.lo,
      },
      category: editCategory,
      priceLAK: parsedPrice,
      priceTHB: Math.round(parsedPrice / 667.26),
      priceUSD: Number((parsedPrice / 22526.17).toFixed(2)),
      stock: parsedStock,
    };

    onSave(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {/* Stock Quantity Highlight */}
      <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40">
        <div className="flex items-center justify-between gap-3">
          <div>
            <label className="font-bold text-xs text-foreground block">
              {dictionary.common.stockQuantity}:
            </label>
            <span className="text-[11px] text-muted-foreground">
              {dictionary.common.stockQuantityDesc}
            </span>
          </div>
          <div className="w-28">
            <Input
              type="number"
              min="0"
              placeholder="0"
              value={editStock}
              onChange={(e) => setEditStock(e.target.value)}
              className="font-mono text-center font-bold text-sm h-10 rounded-xl bg-card border-purple-300"
            />
          </div>
        </div>
      </div>

      {/* SKU & Category */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-muted-foreground block mb-1">{dictionary.common.sku}:</label>
          <Input
            required
            value={editBarcode}
            onChange={(e) => setEditBarcode(e.target.value)}
            className="font-mono text-xs rounded-xl"
          />
        </div>

        <div>
          <label className="text-muted-foreground block mb-1">{dictionary.common.category}:</label>
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as ProductCategory)}
            className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="drinks">{dictionary.common.categoryDrinks}</option>
            <option value="food">{dictionary.common.categoryFood}</option>
            <option value="retail">{dictionary.common.categoryRetail}</option>
            <option value="electronics">{dictionary.common.categoryElectronics}</option>
          </select>
        </div>
      </div>

      {/* English Name */}
      <div>
        <label className="text-muted-foreground block mb-1">{dictionary.common.productNameEn}:</label>
        <Input
          required
          value={editNameEn}
          onChange={(e) => setEditNameEn(e.target.value)}
          className="text-xs rounded-xl"
        />
      </div>

      {/* Lao & Thai Names */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-muted-foreground block mb-1">{dictionary.common.productNameLo}:</label>
          <Input
            value={editNameLo}
            onChange={(e) => setEditNameLo(e.target.value)}
            className="text-xs rounded-xl"
          />
        </div>
        <div>
          <label className="text-muted-foreground block mb-1">{dictionary.common.productNameTh}:</label>
          <Input
            value={editNameTh}
            onChange={(e) => setEditNameTh(e.target.value)}
            className="text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="text-muted-foreground block mb-1">{dictionary.common.priceLAK}:</label>
        <Input
          type="number"
          step="1000"
          min="0"
          placeholder="0"
          value={editPriceLAK}
          onChange={(e) => setEditPriceLAK(e.target.value)}
          className="text-xs font-mono rounded-xl"
        />
        <span className="text-[10px] text-muted-foreground mt-0.5 block">
          THB ≈ {Math.round((Number(editPriceLAK) || 0) / 667.26)} ฿ | USD ≈ ${((Number(editPriceLAK) || 0) / 22526.17).toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-5">
        <div>
          {!showDeleteConfirm ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-destructive hover:bg-destructive/10 text-xs gap-1.5 rounded-xl cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{dictionary.common.deleteItem}</span>
            </Button>
          ) : (
            <div className="flex items-center gap-1.5 bg-destructive/10 p-1.5 rounded-xl border border-destructive/30">
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
              <span className="text-[11px] text-destructive font-semibold">{dictionary.common.confirmDelete}</span>
              <Button
                type="button"
                variant="destructive"
                size="xs"
                onClick={() => onDelete(product.id)}
                className="rounded-lg h-6 px-2 text-[10px]"
              >
                {dictionary.common.deleteNow}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg h-6 px-1.5 text-[10px]"
              >
                {dictionary.common.cancel}
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-xl text-xs cursor-pointer"
          >
            {dictionary.common.cancel}
          </Button>
          <Button
            type="submit"
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-xl text-xs cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{dictionary.common.saveEdit}</span>
          </Button>
        </div>
      </div>
    </form>
  );
}

export function InventoryEditModal({
  editingProduct,
  onClose,
  onSave,
  onDelete,
}: InventoryEditModalProps) {
  const { dictionary } = useLanguage();
  if (!editingProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold">{dictionary.common.editProductTitle}</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          {dictionary.common.editProductSubtitle}
        </p>

        <EditForm
          key={editingProduct.id}
          product={editingProduct}
          onClose={onClose}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
