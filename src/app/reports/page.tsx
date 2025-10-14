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
                        <Button variant="outline" size="sm">Lihat Detail</Button>
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
                                tickFormatter={(value) => `${value}`}
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
                                        <TableCell className="text-right">Rp{cashier.sales * 10000}</TableCell>
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
                            <CardTitle>Jejak Audit</CardTitle>
                            <CardDescription>Lacak semua aktivitas dan perubahan penting dalam sistem.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/reports/audit-trail">Lihat Semua Aktivitas</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Pratinjau jejak audit akan ditampilkan di sini...</p>
                </CardContent>
            </Card>

        </div>
    )
}
