
"use client";

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
import { Badge } from "@/components/ui/badge"

// Data placeholder untuk rincian transaksi
const transactionDetailsData = {
  tunai: [
    { id: "SALE-001", date: "2023-11-20", amount: 150000 },
    { id: "SALE-002", date: "2023-11-20", amount: 49990 },
    { id: "SALE-005", date: "2023-11-21", amount: 75000 },
  ],
  kartu: [
    { id: "SALE-003", date: "2023-11-20", amount: 299000 },
    { id: "SALE-008", date: "2023-11-22", amount: 550000 },
  ],
  qr: [
    { id: "SALE-004", date: "2023-11-21", amount: 39000 },
    { id: "SALE-006", date: "2023-11-21", amount: 125000 },
    { id: "SALE-007", date: "2023-11-22", amount: 89000 },
  ],
  transfer: [
    { id: "SALE-009", date: "2023-11-23", amount: 1200000 },
  ],
};

type TransactionDetail = {
    id: string;
    date: string;
    amount: number;
}

export default function PaymentMethodDetailPage() {
  const params = useParams();
  const method = params.method as keyof typeof transactionDetailsData;

  const transactions = transactionDetailsData[method] || [];
  const methodName = method.charAt(0).toUpperCase() + method.slice(1);

  return (
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
                <TableRow key={tx.id}>
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
  )
}

    