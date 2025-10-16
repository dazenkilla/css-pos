
"use client";

import { useState, useEffect } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';

type CartItem = {
  price: number;
  quantity: number;
};
type TableStatus = 'Terisi' | 'Dipesan' | 'Kosong';
type Table = {
  id: string;
  status: TableStatus;
  orderCount: number;
  totalBill: number;
};

export default function SalesFloorPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTableCount = localStorage.getItem('tableCount');
    const count = savedTableCount ? parseInt(savedTableCount, 10) : 12;

    const generateTables = (tableCount: number): Table[] => {
      return Array.from({ length: tableCount }, (_, i) => {
        const tableId = `T${String(i + 1).padStart(2, '0')}`;
        const savedCart = localStorage.getItem(`cart-${tableId}`);
        const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
        const savedDiscount = localStorage.getItem(`discount-${tableId}`);
        const discount = savedDiscount ? JSON.parse(savedDiscount) : 0;
        
        let status: TableStatus;
        if (cart.length > 0) {
            status = 'Terisi';
        } else {
            status = 'Kosong'
        }
        
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalDiscount = (subtotal * discount) / 100;
        const taxableAmount = subtotal - totalDiscount;
        const tax = taxableAmount * 0.11;
        const total = taxableAmount + tax;

        return {
          id: tableId,
          status,
          orderCount: cart.reduce((sum, item) => sum + item.quantity, 0),
          totalBill: total,
        };
      });
    };

    setTables(generateTables(count));
    setIsLoading(false);
  }, []);

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
          {isLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))
          ) : (
            tables.map((table) => (
              <CustomLink href={`/sales/${table.id}`} key={table.id}>
                <Card className="hover:border-primary transition-colors cursor-pointer aspect-square flex flex-col justify-between">
                  <CardHeader className="p-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{table.id}</CardTitle>
                      <Badge className={getStatusVariant(table.status)}>{table.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 flex-1 flex flex-col items-center justify-center">
                    <Armchair className="h-10 w-10 text-muted-foreground" />
                    {table.status === 'Terisi' && (
                      <div className="flex flex-col items-center text-xs text-muted-foreground mt-1">
                         <div className='flex items-center'>
                            <Coffee className="h-3 w-3 mr-1" />
                            <span>{table.orderCount} item</span>
                         </div>
                         <div className='flex items-center font-semibold'>
                             <span className="mr-1">Rp</span>
                             <span>{table.totalBill.toLocaleString('id-ID')}</span>
                         </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CustomLink>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
