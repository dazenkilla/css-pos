"use client";

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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Di aplikasi nyata, data ini akan berasal dari database.
const initialSalesHistory = [
  { id: "SALE-001", date: "2023-11-20", customer: "Olivia Martin", total: 199990, status: "Selesai", items: 3 },
  { id: "SALE-002", date: "2023-11-21", customer: "Jackson Lee", total: 39000, status: "Selesai", items: 1 },
  { id: "SALE-003", date: "2023-11-22", customer: "William Kim", total: 99000, status: "Selesai", items: 1 },
  { id: "SALE-004", date: "2023-11-23", customer: "Sofia Davis", total: 299000, status: "Selesai", items: 2 },
];

export default function HistoryPage() {
  const [salesHistory, setSalesHistory] = useState(initialSalesHistory);
  const { toast } = useToast();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Selesai": return "secondary";
      case "Tertunda": return "outline";
      case "Dikembalikan": return "destructive";
      default: return "default";
    }
  };

  const handleReturn = (saleId: string) => {
    setSalesHistory(salesHistory.map(sale => 
        sale.id === saleId ? { ...sale, status: "Dikembalikan" } : sale
    ));
    toast({
        title: "Transaksi Dikembalikan",
        description: `Transaksi ${saleId} telah ditandai sebagai dikembalikan.`,
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Ekspor Data (Simulasi)",
      description: "Fitur ini akan mengekspor data penjualan ke file Excel atau PDF."
    })
  }

  return (
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
              <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell text-right">Produk</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesHistory.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell className="hidden sm:table-cell">{sale.date}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={getStatusVariant(sale.status) as any}>{sale.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-right">{sale.items}</TableCell>
                <TableCell className="text-right">Rp{sale.total.toFixed(0)}</TableCell>
                <TableCell className="text-right">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={sale.status === 'Dikembalikan'}
                        onClick={() => handleReturn(sale.id)}
                    >
                        {sale.status === 'Dikembalikan' ? 'Dikembalikan' : 'Batalkan/Kembalikan'}
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
