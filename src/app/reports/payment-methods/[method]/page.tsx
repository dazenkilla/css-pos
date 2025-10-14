
"use client";

import { useState, useEffect } from 'react';
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
import { salesHistory } from '@/lib/data';

type Sale = typeof salesHistory[0];

const paymentMethodMap: { [key: string]: string } = {
  tunai: 'Tunai',
  kartu: 'Kartu',
  qr: 'QR',
  transfer: 'Transfer Bank',
};

export default function PaymentMethodDetailPage() {
  const params = useParams();
  const methodKey = params.method as string;
  const [transactions, setTransactions] = useState<Sale[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  
  const methodName = paymentMethodMap[methodKey] || methodKey.charAt(0).toUpperCase() + methodKey.slice(1);

  useEffect(() => {
    // Filter transactions based on the payment method in the URL
    // This also handles split payments correctly by checking if the method is in the payments array
    const filteredTransactions = salesHistory.filter(sale => 
        sale.payments.some(p => p.method.toLowerCase().replace(' ', '-') === methodName.toLowerCase().replace(' ', '-'))
    );
    setTransactions(filteredTransactions);
  }, [methodKey, methodName]);
  
  const handleViewDetails = (sale: Sale) => {
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
                  transactions.map((tx) => (
                  <TableRow key={tx.id} onClick={() => handleViewDetails(tx)} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{tx.id}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell className="text-right">Rp{tx.total.toLocaleString('id-ID')}</TableCell>
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
    
