
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
import { CustomLink } from '@/components/ui/custom-link';

// Data placeholder untuk rincian transaksi
const transactionDetailsData = {
  tunai: [
    { id: 'SALE-T01', date: '2023-11-01', amount: 22740 },
    { id: 'SALE-T02', date: '2023-11-01', amount: 18990 },
    { id: 'SALE-T03', date: '2023-11-02', amount: 54490 },
    { id: 'SALE-T04', date: '2023-11-03', amount: 40990 },
    { id: 'SALE-T05', date: '2023-11-03', amount: 21490 },
    { id: 'SALE-T06', date: '2023-11-04', amount: 67000 },
    { id: 'SALE-T07', date: '2023-11-05', amount: 34500 },
    { id: 'SALE-T08', date: '2023-11-05', amount: 21490 },
    { id: 'SALE-T09', date: '2023-11-06', amount: 50990 },
    { id: 'SALE-T10', date: '2023-11-07', amount: 18990 },
    { id: 'SALE-T11', date: '2023-11-08', amount: 34500 },
    { id: 'SALE-T12', date: '2023-11-09', amount: 48250 },
    { id: 'SALE-T13', date: '2023-11-10', amount: 22740 },
    { id: 'SALE-T14', date: '2023-11-10', amount: 45000 },
    { id: 'SALE-T15', date: '2023-11-11', amount: 32000 },
    { id: 'SALE-T16', date: '2023-11-12', amount: 48250 },
    { id: 'SALE-T17', date: '2023-11-12', amount: 32000 },
    { id: 'SALE-T18', date: '2023-11-13', amount: 67000 },
    { id: 'SALE-T19', date: '2023-11-14', amount: 50990 },
    { id: 'SALE-T20', date: '2023-11-15', amount: 22740 }
  ],
  kartu: [
    { id: 'SALE-K01', date: '2023-11-01', amount: 22000 },
    { id: 'SALE-K02', date: '2023-11-01', amount: 40990 },
    { id: 'SALE-K03', date: '2023-11-02', amount: 21490 },
    { id: 'SALE-K04', date: '2023-11-03', amount: 54490 },
    { id: 'SALE-K05', date: '2023-11-03', amount: 21490 },
    { id: 'SALE-K06', date: '2023-11-04', amount: 67000 },
    { id: 'SALE-K07', date: '2023-11-05', amount: 34500 },
    { id: 'SALE-K08', date: '2023-11-05', amount: 48250 },
    { id: 'SALE-K09', date: '2023-11-06', amount: 2500 },
    { id: 'SALE-K10', date: '2023-11-07', amount: 18990 },
    { id: 'SALE-K11', date: '2023-11-08', amount: 34500 },
    { id: 'SALE-K12', date: '2023-11-09', amount: 48250 },
    { id: 'SALE-K13', date: '2023-11-10', amount: 22740 },
    { id: 'SALE-K14', date: '2023-11-10', amount: 45000 },
    { id: 'SALE-K15', date: '2023-11-11', amount: 2500 },
    { id: 'SALE-K16', date: '2023-11-12', amount: 50990 },
    { id: 'SALE-K17', date: '2023-11-12', amount: 32000 },
    { id: 'SALE-K18', date: '2023-11-13', amount: 67000 },
    { id: 'SALE-K19', date: '2023-11-14', amount: 50990 },
    { id: 'SALE-K20', date: '2023-11-15', amount: 45000 }
  ],
  qr: [
    { id: 'SALE-Q01', date: '2023-11-01', amount: 22740 },
    { id: 'SALE-Q02', date: '2023-11-01', amount: 21490 },
    { id: 'SALE-Q03', date: '2023-11-02', amount: 22000 },
    { id: 'SALE-Q04', date: '2023-11-03', amount: 2500 },
    { id: 'SALE-Q05', date: '2023-11-03', amount: 21490 },
    { id: 'SALE-Q06', date: '2023-11-04', amount: 34500 },
    { id: 'SALE-Q07', date: '2023-11-05', amount: 34500 },
    { id: 'SALE-Q08', date: '2023-11-05', amount: 48250 },
    { id: 'SALE-Q09', date: '2023-11-06', amount: 48250 },
    { id: 'SALE-Q10', date: '2023-11-07', amount: 2500 },
    { id: 'SALE-Q11', date: '2023-11-08', amount: 34500 },
    { id: 'SALE-Q12', date: '2023-11-09', amount: 48250 },
    { id: 'SALE-Q13', date: '2023-11-10', amount: 22740 },
    { id: 'SALE-Q14', date: '2023-11-10', amount: 45000 },
    { id: 'SALE-Q15', date: '2023-11-11', amount: 32000 },
    { id: 'SALE-Q16', date: '2023-11-12', amount: 50990 },
    { id: 'SALE-Q17', date: '2023-11-12', amount: 45000 },
    { id: 'SALE-Q18', date: '2023-11-13', amount: 67000 },
    { id: 'SALE-Q19', date: '2023-11-14', amount: 50990 },
    { id: 'SALE-Q20', date: '2023-11-15', amount: 40990 }
  ],
  transfer: [
    { id: 'SALE-B01', date: '2023-11-01', amount: 18990 },
    { id: 'SALE-B02', date: '2023-11-01', amount: 21490 },
    { id: 'SALE-B03', date: '2023-11-02', amount: 54490 },
    { id: 'SALE-B04', date: '2023-11-03', amount: 22000 },
    { id: 'SALE-B05', date: '2023-11-03', amount: 21490 },
    { id: 'SALE-B06', date: '2023-11-04', amount: 67000 },
    { id: 'SALE-B07', date: '2023-11-05', amount: 34500 },
    { id: 'SALE-B08', date: '2023-11-05', amount: 2500 },
    { id: 'SALE-B09', date: '2023-11-06', amount: 48250 },
    { id: 'SALE-B10', date: '2023-11-07', amount: 18990 },
    { id: 'SALE-B11', date: '2023-11-08', amount: 34500 },
    { id: 'SALE-B12', date: '2023-11-09', amount: 48250 },
    { id: 'SALE-B13', date: '2023-11-10', amount: 22740 },
    { id: 'SALE-B14', date: '2023-11-10', amount: 2500 },
    { id: 'SALE-B15', date: '2023-11-11', amount: 32000 },
    { id: 'SALE-B16', date: '2023-11-12', amount: 45000 },
    { id: 'SALE-B17', date: '2023-11-12', amount: 32000 },
    { id: 'SALE-B18', date: '2023-11-13', amount: 67000 },
    { id: 'SALE-B19', date: '2023-11-14', amount: 50990 },
    { id: 'SALE-B20', date: '2023-11-15', amount: 22740 }
  ]
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
                <TableRow key={tx.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                        <CustomLink href="/history" className="block w-full h-full">
                            {tx.id}
                        </CustomLink>
                    </TableCell>
                    <TableCell>
                        <CustomLink href="/history" className="block w-full h-full">
                            {tx.date}
                        </CustomLink>
                    </TableCell>
                    <TableCell className="text-right">
                        <CustomLink href="/history" className="block w-full h-full">
                            Rp{tx.amount.toLocaleString('id-ID')}
                        </CustomLink>
                    </TableCell>
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

    