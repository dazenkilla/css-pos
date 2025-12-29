
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Data placeholder untuk bagan akun
const chartOfAccountsData = [
    { code: "1010", name: "Kas", type: "Aset Lancar" },
    { code: "1210", name: "Peralatan", type: "Aset Tetap" },
    { code: "2010", name: "Utang Usaha", type: "Liabilitas" },
    { code: "3010", name: "Modal Disetor", type: "Ekuitas" },
    { code: "4010", name: "Pendapatan Penjualan", type: "Pendapatan" },
    { code: "5010", name: "Harga Pokok Penjualan (HPP)", type: "Biaya" },
    { code: "6010", name: "Biaya Gaji", type: "Biaya Operasional" },
];

// Data placeholder untuk transaksi buku besar
const generalLedgerTransactions = [
    { date: "2023-11-01", description: "Saldo Awal", debit: 0, credit: 0, balance: 50000000 },
    { date: "2023-11-20", description: "Penjualan Tunai #SALE-001", debit: 199990, credit: 0, balance: 50199990 },
    { date: "2023-11-21", description: "Penjualan Tunai #SALE-002", debit: 39000, credit: 0, balance: 50238990 },
    { date: "2023-11-28", description: "Pembayaran gaji staf November", debit: 0, credit: 15000000, balance: 35238990 },
    { date: "2023-11-29", description: "Penerimaan piutang dari Pelanggan X", debit: 5000000, credit: 0, balance: 40238990 },
];


export default function GeneralLedgerPage() {
    const [selectedAccount, setSelectedAccount] = useState("1010");
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    const accountName = chartOfAccountsData.find(acc => acc.code === selectedAccount)?.name;

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                     <div>
                        <CardTitle>Buku Besar (General Ledger)</CardTitle>
                        <CardDescription>Lihat riwayat transaksi terperinci untuk setiap akun.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Pilih Akun" />
                            </SelectTrigger>
                            <SelectContent>
                                {chartOfAccountsData.map(account => (
                                    <SelectItem key={account.code} value={account.code}>{account.code} - {account.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className="w-[200px] justify-start text-left font-normal"
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <h3 className="font-bold text-lg">Akun: {selectedAccount} - {accountName}</h3>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead className="text-right">Debit</TableHead>
                            <TableHead className="text-right">Kredit</TableHead>
                            <TableHead className="text-right">Saldo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {generalLedgerTransactions.map((tx, index) => (
                        <TableRow key={index}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell className="text-right font-mono">Rp{tx.debit.toLocaleString('id-ID')}</TableCell>
                            <TableCell className="text-right font-mono">Rp{tx.credit.toLocaleString('id-ID')}</TableCell>
                            <TableCell className="text-right font-mono">Rp{tx.balance.toLocaleString('id-ID')}</TableCell>
                        </TableRow>
                        ))}
                         <TableRow className="font-bold bg-muted/50">
                            <TableCell colSpan={4}>Saldo Akhir per {format(new Date(), "dd MMMM yyyy", { locale: id })}</TableCell>
                            <TableCell className="text-right font-mono">Rp{generalLedgerTransactions.at(-1)?.balance.toLocaleString('id-ID')}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
