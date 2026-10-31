"use client";

import React, { useState } from "react";
import { Plus, Boxes, Trash2, Check, X, SlidersHorizontal, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Product, type Currency, type ProductCategory } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";

interface InventoryManagerProps {
  products: Product[];
  currency: Currency;
  onUpdateProducts: (updated: Product[]) => void;
}

export function InventoryManager({
  products,
  currency,
  onUpdateProducts,
}: InventoryManagerProps) {
  const { dictionary } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Add Form State
  const [nameEn, setNameEn] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [nameLo, setNameLo] = useState("");
  const [category, setCategory] = useState<ProductCategory>("drinks");
  const [priceLAK, setPriceLAK] = useState(30000);
  const [stock, setStock] = useState(20);

  // Edit Form State
  const [editNameEn, setEditNameEn] = useState("");
  const [editNameTh, setEditNameTh] = useState("");
  const [editNameLo, setEditNameLo] = useState("");
  const [editCategory, setEditCategory] = useState<ProductCategory>("drinks");
  const [editPriceLAK, setEditPriceLAK] = useState(30000);
  const [editStock, setEditStock] = useState(20);
  const [editBarcode, setEditBarcode] = useState("");

  const formatPrice = (amount: number): string => {
    if (currency === "LAK") {
      return `₭ ${Math.round(amount).toLocaleString()}`;
    } else if (currency === "THB") {
      return `฿ ${amount.toFixed(2)}`;
    }
    return `$ ${amount.toFixed(2)}`;
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setEditNameEn(product.name.en || "");
    setEditNameTh(product.name.th || "");
    setEditNameLo(product.name.lo || "");
    setEditCategory(product.category);
    setEditPriceLAK(product.priceLAK);
    setEditStock(product.stock);
    setEditBarcode(product.barcode);
    setShowDeleteConfirm(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updated = products.map((p) => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          barcode: editBarcode.trim() || p.barcode,
          name: {
            en: editNameEn.trim() || p.name.en,
            th: editNameTh.trim() || p.name.th,
            lo: editNameLo.trim() || p.name.lo,
          },
          category: editCategory,
          priceLAK: Number(editPriceLAK) || p.priceLAK,
          priceTHB: Math.round((Number(editPriceLAK) || p.priceLAK) / 600),
          priceUSD: Number(((Number(editPriceLAK) || p.priceLAK) / 21000).toFixed(2)),
          stock: Math.max(0, Number(editStock) || 0),
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    onUpdateProducts(updated);
    setEditingProduct(null);
    setShowDeleteConfirm(false);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() && !nameTh.trim() && !nameLo.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: {
        en: nameEn.trim() || nameTh.trim() || nameLo.trim(),
        th: nameTh.trim() || nameEn.trim() || nameLo.trim(),
        lo: nameLo.trim() || nameEn.trim() || nameTh.trim(),
      },
      category,
      priceLAK: Number(priceLAK) || 20000,
      priceTHB: Math.round((Number(priceLAK) || 20000) / 600),
      priceUSD: Number(((Number(priceLAK) || 20000) / 21000).toFixed(2)),
      stock: Number(stock) || 10,
      barcode: `885${Math.floor(100000 + Math.random() * 900000)}`,
      icon: category === "drinks" ? "Coffee" : category === "food" ? "Soup" : "ShoppingBag",
      color: "from-purple-600 to-indigo-700",
    };

    onUpdateProducts([newProd, ...products]);
    setShowAddModal(false);
    setNameEn("");
    setNameTh("");
    setNameLo("");
    setPriceLAK(30000);
    setStock(20);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {dictionary.common.inventoryTitle}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your items, adjust stock levels, or create new products
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs shadow-md shadow-primary/20 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          <span>{dictionary.common.addProduct}</span>
        </Button>
      </div>

      {/* Catalog Table Card */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs">
        <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-bold">Catalog Items</CardTitle>
          </div>
          <Badge variant="secondary" className="text-[10px] rounded-lg">
            {products.length} items
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">SKU</TableHead>
                <TableHead className="text-xs">{dictionary.common.productName}</TableHead>
                <TableHead className="text-xs">{dictionary.common.category}</TableHead>
                <TableHead className="text-xs text-right">{dictionary.common.price}</TableHead>
                <TableHead className="text-xs text-center">{dictionary.common.stock}</TableHead>
                <TableHead className="text-xs text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => {
                const price =
                  currency === "LAK"
                    ? p.priceLAK
                    : currency === "THB"
                      ? p.priceTHB
                      : p.priceUSD;

                return (
                  <TableRow key={p.id} className="text-xs">
                    <TableCell className="font-mono text-muted-foreground text-[11px]">
                      {p.barcode}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="font-semibold text-foreground">
                        {p.name.en || p.name.th || p.name.lo}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {p.name.lo} • {p.name.th}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase font-mono py-0 rounded-md">
                        {p.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold">
                      {formatPrice(price)}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      <Badge
                        variant={p.stock <= 0 ? "destructive" : p.stock <= 5 ? "warning" : "secondary"}
                        className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg"
                      >
                        {p.stock}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* Single Action Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(p)}
                        className="h-8 px-3 rounded-xl gap-1.5 text-xs border-border hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>ลายละเอียด</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Unified Edit / Stock / Delete Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold">แก้ไขและจัดการสินค้า</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              แก้ไขจำนวนสต็อก, ข้อมูลสินค้าทุกฟิลด์ หรือลบรายการนี้ออกจากระบบ
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Stock Quantity Highlight */}
              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <label className="font-bold text-xs text-foreground block">
                      จำนวนสินค้าในสต็อก (Stock Quantity):
                    </label>
                    <span className="text-[11px] text-muted-foreground">
                      ปรับยอดคงเหลือสำหรับขายใน POS ทันที
                    </span>
                  </div>
                  <div className="w-28">
                    <Input
                      type="number"
                      min="0"
                      required
                      value={editStock}
                      onChange={(e) => setEditStock(Number(e.target.value))}
                      className="font-mono text-center font-bold text-sm h-10 rounded-xl bg-card border-purple-300"
                    />
                  </div>
                </div>
              </div>

              {/* SKU & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted-foreground block mb-1">บาร์โค้ด / SKU:</label>
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
                    <option value="drinks">Drinks</option>
                    <option value="food">Food</option>
                    <option value="retail">Retail</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>
              </div>

              {/* English Name */}
              <div>
                <label className="text-muted-foreground block mb-1">ชื่อสินค้า (English):</label>
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
                  <label className="text-muted-foreground block mb-1">ຊື່ສິນຄ້າ (ພາສາລາວ):</label>
                  <Input
                    value={editNameLo}
                    onChange={(e) => setEditNameLo(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-muted-foreground block mb-1">ชื่อสินค้า (ภาษาไทย):</label>
                  <Input
                    value={editNameTh}
                    onChange={(e) => setEditNameTh(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-muted-foreground block mb-1">ราคาขาย (LAK ₭):</label>
                <Input
                  type="number"
                  step="1000"
                  min="0"
                  required
                  value={editPriceLAK}
                  onChange={(e) => setEditPriceLAK(Number(e.target.value))}
                  className="text-xs font-mono rounded-xl"
                />
                <span className="text-[10px] text-muted-foreground mt-0.5 block">
                  คำนวณเป็น THB ≈ {Math.round(editPriceLAK / 600)} ฿ | USD ≈ ${(editPriceLAK / 21000).toFixed(2)}
                </span>
              </div>

              {/* Footer Actions: Delete (Left) | Cancel & Save (Right) */}
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
                      <span>ลบสินค้านี้</span>
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-destructive/10 p-1.5 rounded-xl border border-destructive/30">
                      <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                      <span className="text-[11px] text-destructive font-semibold">ยืนยันลบ?</span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="xs"
                        onClick={() => handleDeleteProduct(editingProduct.id)}
                        className="rounded-lg h-6 px-2 text-[10px]"
                      >
                        ลบทันที
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="rounded-lg h-6 px-1.5 text-[10px]"
                      >
                        ยกเลิก
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProduct(null)}
                    className="rounded-xl text-xs"
                  >
                    {dictionary.common.cancel}
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-xl text-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>บันทึกการแก้ไข</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold mb-1">{dictionary.common.addProduct}</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Add a new item to test in the POS terminal.
            </p>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">Name (English):</label>
                <Input
                  required
                  placeholder="e.g. Avocado Toast"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="text-muted-foreground block mb-1">Name (Lao / Thai):</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="ຊື່ພາສາລາວ"
                    value={nameLo}
                    onChange={(e) => setNameLo(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                  <Input
                    placeholder="ชื่อภาษาไทย"
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
                    <option value="drinks">Drinks</option>
                    <option value="food">Food</option>
                    <option value="retail">Retail</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground block mb-1">Initial Stock:</label>
                  <Input
                    type="number"
                    min="1"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="text-xs font-mono rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground block mb-1">Price (LAK ₭):</label>
                <Input
                  type="number"
                  step="1000"
                  value={priceLAK}
                  onChange={(e) => setPriceLAK(Number(e.target.value))}
                  className="text-xs font-mono rounded-xl"
                />
                <span className="text-[10px] text-muted-foreground mt-0.5 block">
                  Auto-calculates THB ≈ {Math.round(priceLAK / 600)} ฿ | USD ≈ ${(priceLAK / 21000).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-4">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)} className="rounded-xl">
                  {dictionary.common.cancel}
                </Button>
                <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1 rounded-xl">
                  <Check className="w-3.5 h-3.5" />
                  <span>{dictionary.common.save}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
