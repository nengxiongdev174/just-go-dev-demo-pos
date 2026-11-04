"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Product, type ProductCategory } from "@/types/pos";
import { type InventoryAddModalProps } from "@/types/inventory";
import { useLanguage } from "@/context/LanguageContext";

export function InventoryAddModal({
  isOpen,
  onClose,
  onAdd,
}: InventoryAddModalProps) {
  const { dictionary } = useLanguage();

  const [nameEn, setNameEn] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [nameLo, setNameLo] = useState("");
  const [category, setCategory] = useState<ProductCategory>("drinks");
  const [priceLAK, setPriceLAK] = useState("");
  const [stock, setStock] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() && !nameTh.trim() && !nameLo.trim()) return;

    const parsedPrice = Number(priceLAK) || 0;
    const parsedStock = Number(stock) || 0;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: {
        en: nameEn.trim() || nameTh.trim() || nameLo.trim(),
        th: nameTh.trim() || nameEn.trim() || nameLo.trim(),
        lo: nameLo.trim() || nameEn.trim() || nameTh.trim(),
      },
      category,
      priceLAK: parsedPrice,
      priceTHB: Math.round(parsedPrice / 667.26),
      priceUSD: Number((parsedPrice / 22526.17).toFixed(2)),
      stock: parsedStock,
      barcode: `885${Math.floor(100000 + Math.random() * 900000)}`,
      icon: category === "drinks" ? "Coffee" : category === "food" ? "Soup" : "ShoppingBag",
      color: "from-purple-600 to-indigo-700",
    };

    onAdd(newProd);
    setNameEn("");
    setNameTh("");
    setNameLo("");
    setPriceLAK("");
    setStock("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-bold mb-1">{dictionary.common.addProduct}</h3>
        <p className="text-xs text-muted-foreground mb-4">
          {dictionary.common.addItemDesc}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-muted-foreground block mb-1">{dictionary.common.productNameEn}:</label>
            <Input
              required
              placeholder="e.g. Avocado Toast"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="text-xs rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1">{dictionary.common.productNameLo}:</label>
              <Input
                placeholder="e.g. ເຂົ້າຈີ່ອະໂວກາໂດ"
                value={nameLo}
                onChange={(e) => setNameLo(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>
            <div>
              <label className="text-muted-foreground block mb-1">{dictionary.common.productNameTh}:</label>
              <Input
                placeholder="e.g. ขนมปังอะโวคาโด"
                value={nameTh}
                onChange={(e) => setNameTh(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-muted-foreground block mb-1">{dictionary.common.category}:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="drinks">{dictionary.common.categoryDrinks}</option>
                <option value="food">{dictionary.common.categoryFood}</option>
                <option value="retail">{dictionary.common.categoryRetail}</option>
                <option value="electronics">{dictionary.common.categoryElectronics}</option>
              </select>
            </div>
            <div>
              <label className="text-muted-foreground block mb-1">{dictionary.common.stock}:</label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground block mb-1">{dictionary.common.priceLAK}:</label>
            <Input
              type="number"
              step="1000"
              min="0"
              placeholder="0"
              value={priceLAK}
              onChange={(e) => setPriceLAK(e.target.value)}
              className="text-xs font-mono rounded-xl"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border mt-4">
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
              <Plus className="w-3.5 h-3.5" />
              <span>{dictionary.common.save}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

