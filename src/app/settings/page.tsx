"use client";

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

export default function SettingsPage() {
  const { toast } = useToast();

  const handleManageRole = (role: string) => {
    toast({
      title: "Fitur Dalam Pengembangan",
      description: `Pengelolaan untuk peran "${role}" akan segera tersedia.`,
    });
  }

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
            <Input id="store-name" defaultValue="Nova POS" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Input id="address" defaultValue="Jl. Kopi No. 123, Jakarta" />
          </div>
           <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Peran & Izin</CardTitle>
          <CardDescription>
            Tentukan peran dan kelola apa yang dapat dilihat dan dilakukan pengguna.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                    <h4 className="font-medium">Administrator</h4>
                    <p className="text-sm text-muted-foreground">Akses penuh ke semua fitur.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleManageRole('Administrator')}>Kelola</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                    <h4 className="font-medium">Kasir</h4>
                    <p className="text-sm text-muted-foreground">Hanya akses ke modul Penjualan dan Riwayat.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleManageRole('Kasir')}>Kelola</Button>
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
