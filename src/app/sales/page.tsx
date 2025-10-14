
"use client";

import { CustomLink } from '@/components/ui/custom-link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Armchair, Coffee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Data placeholder untuk status meja
const tables = Array.from({ length: 12 }, (_, i) => ({
  id: `T${String(i + 1).padStart(2, '0')}`,
  status: i % 4 === 0 ? 'Terisi' : i === 7 ? 'Dipesan' : 'Kosong',
  orderCount: i % 4 === 0 ? (i / 4) + 1 : 0, // Menggunakan nilai statis, bukan Math.random()
}));

export default function SalesFloorPage() {

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Terisi':
        return 'bg-blue-500 text-white';
      case 'Dipesan':
        return 'bg-yellow-500 text-white';
      case 'Kosong':
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Denah Meja Penjualan</CardTitle>
        <CardDescription>Pilih meja untuk memulai atau melanjutkan transaksi.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tables.map((table) => (
            <CustomLink href={`/sales/${table.id}`} key={table.id}>
              <Card className="hover:border-primary transition-colors cursor-pointer aspect-square flex flex-col justify-between">
                <CardHeader className="p-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{table.id}</CardTitle>
                    <Badge className={getStatusVariant(table.status)}>{table.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3 flex-1 flex flex-col items-center justify-center">
                  <Armchair className="h-12 w-12 text-muted-foreground" />
                  {table.status === 'Terisi' && (
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                       <Coffee className="h-4 w-4 mr-1" />
                       <span>{table.orderCount} pesanan</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CustomLink>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
