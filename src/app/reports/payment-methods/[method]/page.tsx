
"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
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
import { inventoryItems } from '@/lib/data';

// Helper function to create mock transactions
const createMockTransactions = (prefix: string, count: number) => {
  const transactions = [];
  for (let i = 1; i <= count; i++) {
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let totalAmount = 0;
    const usedIndexes = new Set();

    for (let j = 0; j < itemCount; j++) {
      let itemIndex;
      do {
        itemIndex = Math.floor(Math.random() * inventoryItems.length);
      } while (usedIndexes.has(itemIndex));
      usedIndexes.add(itemIndex);
      
      const product = inventoryItems[itemIndex];
      const quantity = Math.floor(Math.random() * 2) + 1;
      items.push({
        name: product.name,
        price: product.price,
        quantity: quantity
      });
      totalAmount += product.price * quantity;
    }

    transactions.push({
      id: `${prefix}-${String(i).padStart(3, '0')}`,
      date: `2023-11-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}`,
      amount: totalAmount,
      items: items,
    });
  }
  return transactions;
};


const transactionDetailsData = {
  tunai: createMockTransactions('SALE-T', 20),
  kartu: createMockTransactions('SALE-K', 20),
  qr: createMockTransactions('SALE-Q', 20),
  transfer: createMockTransactions('SALE-B', 20)
};

type TransactionDetail = {
    id: string;
    date: string;
    amount: number;
    items: { name: string; price: number; quantity: number }[];
}

export default function PaymentMethodDetailPage() {
  const params = useParams();
  const method = params.method as keyof typeof transactionDetailsData;
  const [selectedSale, setSelectedSale] = useState<TransactionDetail | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);

  const transactions = transactionDetailsData[method] || [];
  const methodName = method.charAt(0).toUpperCase() + method.slice(1);
  
  const handleViewDetails = (sale: TransactionDetail) => {
    setSelectedSale(sale);
    setDetailOpen(true);
  };
  
  const detailSubtotal = selectedSale?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Detail Transaksi: {methodName}</CardTitle>
          <CardDescription>
            Menampilkan semua transaksi yang dilakukan menggunakan metode pembayaran {methodName}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                  transactions.map((tx: TransactionDetail) => (
                  <TableRow key={tx.id} onClick={() => handleViewDetails(tx)} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{tx.id}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell className="text-right">Rp{tx.amount.toLocaleString('id-ID')}</TableCell>
                  </TableRow>
                  ))
              ) : (
                  <TableRow>
                      <TableCell colSpan={3} className="text-center h-24">
                          Tidak ada transaksi ditemukan untuk metode ini.
                      </TableCell>
                  </TableRow>
              )}
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
    
