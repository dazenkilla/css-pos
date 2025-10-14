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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast";

// Data placeholder untuk entri jurnal
const journalEntriesData = [
    { id: "JE-001", date: "2023-11-28", description: "Mencatat penjualan harian", status: "Posted" },
    { id: "JE-002", date: "2023-11-28", description: "Pembayaran gaji staf November", status: "Posted" },
    { id: "JE-003", date: "2023-11-29", description: "Pembelian bahan baku dari Pemasok A", status: "Draft" },
];

const journalEntryDetails = [
    { account: "1010 - Kas", debit: 45231890, credit: 0 },
    { account: "4010 - Pendapatan Penjualan", debit: 0, credit: 45231890 },
]

export default function JournalEntriesPage() {
    const [isJournalEntryOpen, setJournalEntryOpen] = useState(false);
    const { toast } = useToast();

    const handleCreateEntry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const description = formData.get('description');

        setJournalEntryOpen(false);
        toast({
            title: "Entri Jurnal Dibuat (Simulasi)",
            description: `Entri jurnal untuk "${description}" telah dibuat sebagai draf.`
        });
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Entri Jurnal</CardTitle>
                            <CardDescription>Kelola dan lacak semua entri jurnal akuntansi.</CardDescription>
                        </div>
                        <Button size="sm" className="gap-1" onClick={() => setJournalEntryOpen(true)}>
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Buat Entri Jurnal
                            </span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Jurnal</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {journalEntriesData.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell className="font-medium">{entry.id}</TableCell>
                                <TableCell>{entry.date}</TableCell>
                                <TableCell>{entry.description}</TableCell>
                                <TableCell><Badge variant={entry.status === 'Posted' ? 'secondary' : 'outline'}>{entry.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">Lihat Detail</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Detail Entri Jurnal: JE-001</CardTitle>
                    <CardDescription>Detail transaksi untuk jurnal yang dipilih.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Akun</TableHead>
                                <TableHead className="text-right">Debit</TableHead>
                                <TableHead className="text-right">Kredit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {journalEntryDetails.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell>{detail.account}</TableCell>
                                    <TableCell className="text-right font-mono">Rp{detail.debit.toLocaleString('id-ID')}</TableCell>
                                    <TableCell className="text-right font-mono">Rp{detail.credit.toLocaleString('id-ID')}</TableCell>
                                </TableRow>
                            ))}
                             <TableRow className="font-bold bg-muted/50">
                                <TableCell>Total</TableCell>
                                <TableCell className="text-right font-mono">Rp45.231.890</TableCell>
                                <TableCell className="text-right font-mono">Rp45.231.890</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isJournalEntryOpen} onOpenChange={setJournalEntryOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Buat Entri Jurnal Baru</DialogTitle>
                        <DialogDescription>Masukkan detail transaksi manual.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateEntry}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="entry-date">Tanggal</Label>
                            <Input id="entry-date" name="date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="entry-description">Deskripsi</Label>
                            <Textarea id="entry-description" name="description" placeholder="Contoh: Pembelian aset kantor" required/>
                        </div>
                        <div className="border rounded-lg p-2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Akun</TableHead>
                                        <TableHead className="text-right">Debit</TableHead>
                                        <TableHead className="text-right">Kredit</TableHead>
                                        <TableHead />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Placeholder row */}
                                    <TableRow>
                                        <TableCell><Input placeholder="Pilih Akun" /></TableCell>
                                        <TableCell><Input type="number" placeholder="0" className="text-right" /></TableCell>
                                        <TableCell><Input type="number" placeholder="0" className="text-right" /></TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableBody>
                            </Table>
                             <Button variant="outline" size="sm" className="mt-2 w-full">Tambah Baris</Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Simpan Draf</Button>
                    </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
