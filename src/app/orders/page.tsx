"use client";

import { useState } from "react";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { purchaseOrders, suppliers } from "@/lib/data"
import { PlusCircle, Inbox } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function OrdersPage() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Selesai": return "secondary";
      case "Tertunda": return "outline";
      case "Dibatalkan": return "destructive";
      default: return "default";
    }
  };
  
  const handleReceiveGoods = (orderId: string) => {
    toast({
      title: "Penerimaan Barang Diproses (Simulasi)",
      description: `Barang untuk pesanan ${orderId} telah diterima dan stok diperbarui.`
    })
  }
  
  const handleCreateOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSheetOpen(false);
    toast({
      title: "Pesanan Dibuat (Simulasi)",
      description: `Pesanan pembelian baru telah berhasil dibuat.`
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Pesanan Pembelian</CardTitle>
            <CardDescription>Buat dan lacak pesanan pembelian untuk inventaris Anda.</CardDescription>
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Buat Pesanan
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Buat Pesanan Pembelian Baru</SheetTitle>
                <SheetDescription>Isi detail untuk membuat pesanan pembelian baru.</SheetDescription>
              </SheetHeader>
              <form onSubmit={handleCreateOrder}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">Pemasok</Label>
                    <Select name="supplier" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih pemasok" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
                          <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                      <Label>Produk</Label>
                      <div className="border rounded-lg p-4 space-y-2">
                          <div className="flex gap-2">
                              <Input placeholder="Nama Produk atau SKU" className="flex-1"/>
                              <Input type="number" placeholder="Jumlah" className="w-24"/>
                          </div>
                          <Button variant="outline" size="sm" className="w-full" type="button">Tambah Produk</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Daftar produk yang dipesan akan muncul di sini.</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Catatan</Label>
                    <Textarea id="notes" placeholder="Tinggalkan catatan untuk pemasok..." />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">Buat Pesanan</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID Pesanan</TableHead>
              <TableHead>Pemasok</TableHead>
              <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell text-right">Jumlah Item</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-right">{order.items}</TableCell>
                <TableCell className="text-right">Rp{order.total.toLocaleString('id-ID')}</TableCell>
                <TableCell className="text-center">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={order.status !== 'Tertunda'}
                        onClick={() => handleReceiveGoods(order.id)}
                    >
                        <Inbox className="mr-2 h-4 w-4" />
                        Terima Barang
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
