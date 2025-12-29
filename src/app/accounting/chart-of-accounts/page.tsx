
"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast";


// Data placeholder untuk bagan akun
const chartOfAccountsData = [
    { code: "1010", name: "Kas", type: "Aset Lancar", balance: 75250000 },
    { code: "1210", name: "Peralatan", type: "Aset Tetap", balance: 150000000 },
    { code: "2010", name: "Utang Usaha", type: "Liabilitas", balance: 25500000 },
    { code: "3010", name: "Modal Disetor", type: "Ekuitas", balance: 200000000 },
    { code: "4010", name: "Pendapatan Penjualan", type: "Pendapatan", balance: 45231890 },
    { code: "5010", name: "Harga Pokok Penjualan (HPP)", type: "Biaya", balance: 22000000 },
    { code: "6010", name: "Biaya Gaji", type: "Biaya Operasional", balance: 15000000 },
];

export default function ChartOfAccountsPage() {
    const [isAddAccountOpen, setAddAccountOpen] = useState(false);
    const { toast } = useToast();

    const handleAddAccount = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const accountName = formData.get('account-name');

        setAddAccountOpen(false);
        toast({
            title: "Akun Ditambahkan (Simulasi)",
            description: `Akun "${accountName}" telah ditambahkan ke bagan akun.`
        });
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Bagan Akun (Chart of Accounts)</CardTitle>
                            <CardDescription>Daftar semua akun keuangan dalam sistem akuntansi Anda.</CardDescription>
                        </div>
                        <Button size="sm" className="gap-1" onClick={() => setAddAccountOpen(true)}>
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Tambah Akun
                            </span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kode Akun</TableHead>
                                <TableHead>Nama Akun</TableHead>
                                <TableHead>Tipe Akun</TableHead>
                                <TableHead className="text-right">Saldo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chartOfAccountsData.map((account) => (
                            <TableRow key={account.code}>
                                <TableCell className="font-medium">{account.code}</TableCell>
                                <TableCell>{account.name}</TableCell>
                                <TableCell className="text-muted-foreground">{account.type}</TableCell>
                                <TableCell className="text-right">Rp{account.balance.toLocaleString('id-ID')}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isAddAccountOpen} onOpenChange={setAddAccountOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Akun Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddAccount}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="account-code" className="text-right">Kode Akun</Label>
                                <Input id="account-code" name="account-code" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="account-name" className="text-right">Nama Akun</Label>
                                <Input id="account-name" name="account-name" className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="account-type" className="text-right">Tipe Akun</Label>
                                <div className="col-span-3">
                                <Select name="account-type" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe akun" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asset">Aset</SelectItem>
                                        <SelectItem value="liability">Liabilitas</SelectItem>
                                        <SelectItem value="equity">Ekuitas</SelectItem>
                                        <SelectItem value="revenue">Pendapatan</SelectItem>
                                        <SelectItem value="expense">Biaya</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Simpan Akun</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
