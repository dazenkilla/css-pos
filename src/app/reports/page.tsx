"use client";

import Link from 'next/link';
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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Button } from '@/components/ui/button';
import { Users, FileText, FileDown } from 'lucide-react';

const cashierPerformanceData = [
  { name: "David", sales: 45, transactions: 15 },
  { name: "Brenda", sales: 38, transactions: 12 },
  { name: "James", sales: 52, transactions: 20 },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Laporan Kinerja Kasir</CardTitle>
                            <CardDescription>Analisis penjualan dan transaksi per kasir.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => alert('Fitur ekspor belum tersedia.')}>
                            <FileDown className="mr-2 h-4 w-4"/>
                            Ekspor
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-lg font-medium mb-4">Total Penjualan per Kasir</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={cashierPerformanceData}>
                                <XAxis
                                dataKey="name"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                />
                                <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `Rp${value} Jt`}
                                />
                                <Bar
                                dataKey="sales"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                     <div>
                        <h3 className="text-lg font-medium mb-4">Statistik Kinerja</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Kasir</TableHead>
                                <TableHead className="text-right">Total Transaksi</TableHead>
                                <TableHead className="text-right">Total Penjualan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cashierPerformanceData.map(cashier => (
                                    <TableRow key={cashier.name}>
                                        <TableCell className="font-medium">{cashier.name}</TableCell>
                                        <TableCell className="text-right">{cashier.transactions}</TableCell>
                                        <TableCell className="text-right">Rp{(cashier.sales * 1000000).toLocaleString('id-ID')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                     <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Analitik Pelanggan</CardTitle>
                            <CardDescription>Pahami perilaku dan demografi pelanggan Anda.</CardDescription>
                        </div>
                         <Button variant="outline" size="sm">Lihat Detail</Button>
                    </div>
                </CardHeader>
                <CardContent>
                   <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                        <div className="text-center text-muted-foreground">
                            <Users className="mx-auto h-8 w-8 mb-2" />
                            <p>Komponen Analitik Pelanggan akan ditampilkan di sini.</p>
                        </div>
                   </div>
                </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Laporan Keuangan</CardTitle>
                                <CardDescription>Laporan laba rugi dan pajak.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4"/>
                            Laporan Laba & Rugi
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4"/>
                            Laporan Pajak
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Jejak Audit</CardTitle>
                                <CardDescription>Lacak semua aktivitas dan perubahan penting.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/reports/audit-trail">Lihat Semua</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">Lihat log terperinci dari semua aktivitas pengguna untuk keamanan dan akuntabilitas.</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
