"use client";

import { useState } from "react";
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
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileDown, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { salesHistory as initialSalesHistory } from "@/lib/data";

type Sale = typeof initialSalesHistory[0];

export default function HistoryPage() {
  const [salesHistory, setSalesHistory] = useState(initialSalesHistory);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const { toast } = useToast();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Selesai": return "secondary";
      case "Tertunda": return "outline";
      case "Dikembalikan": return "destructive";
      default: return "default";
    }
  };

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
    setDetailOpen(true);
  };
  
  const handleExport = () => {
    toast({
      title: "Ekspor Data (Simulasi)",
      description: "Fitur ini akan mengekspor data penjualan ke file Excel atau PDF."
    })
  }

  const formatPaymentMethods = (payments: Sale['payments']) => {
    if (!payments || payments.length === 0) {
      return 'N/A';
    }
    if (payments.length === 1) {
      return payments[0].method;
    }
    return `Split (${payments.map(p => p.method).join(', ')})`;
  };

  const detailSubtotal = selectedSale?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Riwayat Penjualan</CardTitle>
              <CardDescription>Lihat dan kelola semua transaksi yang sudah lewat.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" />
              Ekspor Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Penjualan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead>Metode Pembayaran</TableHead>
                <TableHead className="hidden md:table-cell text-right">Produk</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesHistory.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={getStatusVariant(sale.status) as any}>{sale.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{formatPaymentMethods(sale.payments)}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">{sale.itemCount}</TableCell>
                  <TableCell className="text-right">Rp{sale.total.toLocaleString('id-ID')}</TableCell>
                  <TableCell className="text-right">
                      <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(sale)}
                      >
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          Lihat Detail
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Detail Transaksi: {selectedSale?.id}</DialogTitle>
              <DialogDescription>
                Tanggal: {selectedSale?.date}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead className="text-right">Harga Satuan</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSale?.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">Rp{item.price.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-right">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</TableCell>
                    </TableRow>
                  ))}
                   <TableRow className="font-bold bg-muted/50">
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">Rp{detailSubtotal.toLocaleString('id-ID')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
