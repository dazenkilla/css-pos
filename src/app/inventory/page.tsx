"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inventoryItems as initialInventoryItems } from "@/lib/data"
import { PlusCircle, ArrowRightLeft, Settings } from "lucide-react"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CustomLink } from "@/components/ui/custom-link";

type InventoryItem = typeof initialInventoryItems[0];

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [isTransferDialogOpen, setTransferDialogOpen] = useState(false);
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [transferItem, setTransferItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();

  const getStatus = (stock: number) => {
    if (stock > 20) return { text: "Stok Cukup", variant: "secondary" as const };
    if (stock > 0) return { text: "Stok Menipis", variant: "outline" as const };
    return { text: "Stok Habis", variant: "destructive" as const };
  };

  const handleOpenTransferDialog = (item: InventoryItem) => {
    setTransferItem(item);
    setTransferDialogOpen(true);
  };

  const handleTransfer = () => {
    toast({
      title: "Transfer Dimulai",
      description: `Transfer stok untuk ${transferItem?.name} telah diproses.`,
    });
    setTransferDialogOpen(false);
  };
  
  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct: InventoryItem = {
      sku: `prod-${Math.random().toString(36).substr(2, 9)}`,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      subCategory: 'Baru', // Placeholder
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string, 10),
      expiryDate: null,
    };
    setInventoryItems(prev => [newProduct, ...prev]);
    setAddProductDialogOpen(false);
    toast({
      title: "Produk Ditambahkan",
      description: `${newProduct.name} telah berhasil ditambahkan ke inventaris.`,
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Inventaris</CardTitle>
              <CardDescription>Kelola produk dan lihat tingkat stok Anda.</CardDescription>
            </div>
            <div className="flex gap-2">
               <Button size="sm" variant="outline" className="gap-1" asChild>
                <CustomLink href="/inventory/categories">
                  <Settings className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Kelola Kategori
                  </span>
                </CustomLink>
              </Button>
              <Button size="sm" className="gap-1" onClick={() => setAddProductDialogOpen(true)}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Tambah Produk
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead className="hidden md:table-cell">Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Tgl. Kedaluwarsa</TableHead>
                <TableHead className="hidden md:table-cell text-right">Harga</TableHead>
                <TableHead className="text-right">Stok</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => {
                const status = getStatus(item.stock);
                const isLowStock = status.variant === 'outline';
                const isOutOfStock = status.variant === 'destructive';
                return (
                  <TableRow key={item.sku} className={isOutOfStock ? 'bg-destructive/10' : isLowStock ? 'bg-yellow-500/10' : ''}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground hidden sm:inline">{item.sku}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>{item.category}</div>
                      <div className="text-xs text-muted-foreground">{item.subCategory}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.text}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{item.expiryDate || 'N/A'}</TableCell>
                    <TableCell className="hidden md:table-cell text-right">Rp{item.price.toFixed(0)}</TableCell>
                    <TableCell className="text-right font-medium">{item.stock}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenTransferDialog(item)}>
                        <ArrowRightLeft className="h-4 w-4" />
                        <span className="sr-only">Transfer Stok</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Transfer Stok */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Stok: {transferItem?.name}</DialogTitle>
            <DialogDescription>
              Simulasikan transfer stok ke cabang lain. Ini adalah placeholder dan tidak memengaruhi data nyata.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Jumlah
              </Label>
              <Input
                id="quantity"
                type="number"
                defaultValue="1"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branch" className="text-right">
                Ke Cabang
              </Label>
              <Input
                id="branch"
                defaultValue="Gudang Utama"
                className="col-span-3"
                placeholder="cth. Cabang B"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleTransfer}>Konfirmasi Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog Tambah Produk */}
      <Dialog open={isAddProductDialogOpen} onOpenChange={setAddProductDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Produk Baru</DialogTitle>
            <DialogDescription>
              Isi detail produk baru yang akan ditambahkan ke inventaris.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddProduct}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="add-name" className="text-right">Nama Produk</Label>
                <Input id="add-name" name="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="add-category" className="text-right">Kategori</Label>
                <div className="col-span-3">
                  <Select name="category" required>
                      <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="Minuman">Minuman</SelectItem>
                          <SelectItem value="Kue">Kue</SelectItem>
                          <SelectItem value="Merchandise">Merchandise</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="add-price" className="text-right">Harga</Label>
                <Input id="add-price" name="price" type="number" className="col-span-3" required />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="add-stock" className="text-right">Stok Awal</Label>
                <Input id="add-stock" name="stock" type="number" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Tambah Produk</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
