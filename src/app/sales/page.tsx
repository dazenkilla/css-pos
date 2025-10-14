
"use client";

import { CustomLink } from '@/components/ui/custom-link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Armchair, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SalesModeSelectionPage() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pilih Mode Penjualan</CardTitle>
        <CardDescription>Pilih jenis transaksi yang ingin Anda proses.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:border-primary transition-colors">
            <CustomLink href="/sales/direct" className="block h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle>Penjualan Langsung</CardTitle>
                    <CardDescription>Untuk pesanan takeaway atau langsung bayar.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Mulai Transaksi <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </CustomLink>
          </Card>
          <Card className="hover:border-primary transition-colors">
            <CustomLink href="/sales/tables" className="block h-full">
               <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <Armchair className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle>Denah Meja</CardTitle>
                    <CardDescription>Untuk pesanan dine-in yang dicatat per meja.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                 <Button className="w-full">
                  Buka Denah Meja <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </CustomLink>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
