"use client";

import { CustomLink } from "@/components/ui/custom-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [tableCount, setTableCount] = useState<number | string>("");

  useEffect(() => {
    const savedTableCount = localStorage.getItem('tableCount');
    if (savedTableCount) {
      setTableCount(parseInt(savedTableCount, 10));
    } else {
      setTableCount(12); // Default value
    }
  }, []);

  const handleStartShift = () => {
     toast({
      title: "Fitur Dalam Pengembangan",
      description: "Manajemen shift akan segera diimplementasikan.",
    });
  }

  const handleSaveChanges = () => {
    toast({
      title: "Perubahan Disimpan",
      description: "Pengaturan toko telah berhasil diperbarui (simulasi).",
    });
  }
  
  const handleSaveTableCount = () => {
    const count = Number(tableCount);
    if (Number.isInteger(count) && count > 0) {
      localStorage.setItem('tableCount', String(count));
      toast({
        title: "Pengaturan Disimpan",
        description: `Jumlah meja berhasil diatur menjadi ${count}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Input Tidak Valid",
        description: "Harap masukkan angka positif yang valid.",
      });
    }
  };


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Toko</CardTitle>
          <CardDescription>Kelola pengaturan dan preferensi dasar toko Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Nama Toko</Label>
            <Input id="store-name" defaultValue="Creative Software Solution" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Input id="address" defaultValue="alamat bandung" />
          </div>
           <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Denah Meja</CardTitle>
          <CardDescription>Atur jumlah meja yang ditampilkan di denah penjualan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="table-count">Jumlah Meja</Label>
            <Input 
              id="table-count" 
              type="number" 
              value={tableCount}
              onChange={(e) => setTableCount(e.target.value)}
              placeholder="Contoh: 12" 
            />
          </div>
           <Button onClick={handleSaveTableCount}>Simpan Pengaturan Meja</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Peran & Izin</CardTitle>
          <CardDescription>
            Tentukan peran dan kelola apa yang dapat dilihat dan dilakukan pengguna.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                <div>
                    <h4 className="font-medium">Manajemen Peran</h4>
                    <p className="text-sm text-muted-foreground">Buat, ubah, dan hapus peran untuk pengguna Anda.</p>
                </div>
                <Button asChild>
                    <CustomLink href="/settings/roles">Kelola Peran</CustomLink>
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Shift</CardTitle>
          <CardDescription>
            Kelola shift kasir dan lihat laporan kas harian.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground">Antarmuka manajemen shift akan ada di sini.</p>
           <Button className="mt-4" onClick={handleStartShift}>Mulai Shift Baru</Button>
        </CardContent>
      </Card>

    </div>
  )
}
