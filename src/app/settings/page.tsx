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
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan</CardTitle>
          <CardDescription>Kelola pengaturan dan preferensi toko Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nama Toko</Label>
              <Input id="store-name" defaultValue="Nova POS" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input id="address" defaultValue="Jl. Kopi No. 123, Jakarta" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Peran & Izin</CardTitle>
          <CardDescription>
            Tentukan peran dan kelola apa yang dapat dilihat dan dilakukan pengguna. (UI Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                    <h4 className="font-medium">Administrator</h4>
                    <p className="text-sm text-muted-foreground">Akses penuh ke semua fitur.</p>
                </div>
                <Button variant="outline" size="sm">Kelola</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                    <h4 className="font-medium">Kasir</h4>
                    <p className="text-sm text-muted-foreground">Hanya akses ke modul Penjualan dan Riwayat.</p>
                </div>
                <Button variant="outline" size="sm">Kelola</Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Shift</CardTitle>
          <CardDescription>
            Kelola shift kasir. (UI Placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground">Antarmuka manajemen shift akan ada di sini.</p>
           <Button className="mt-4">Mulai Shift Baru</Button>
        </CardContent>
      </Card>

    </div>
  )
}
