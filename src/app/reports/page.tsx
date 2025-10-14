
"use client";

import { CustomLink } from '@/components/ui/custom-link';
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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Users, FileText, FileDown, Wallet, CreditCard, QrCode, Landmark } from 'lucide-react';

const cashierPerformanceData = [
  { name: "David", sales: 45, transactions: 15 },
  { name: "Brenda", sales: 38, transactions: 12 },
  { name: "James", sales: 52, transactions: 20 },
];

const paymentMethodData = [
    { name: "Tunai", total: 15250000, transactions: 120, icon: Wallet },
    { name: "Kartu", total: 22500000, transactions: 95, icon: CreditCard },
    { name: "QR", total: 18750000, transactions: 150, icon: QrCode },
    { name: "Transfer", total: 8500000, transactions: 30, icon: Landmark },
];

export default function ReportsPage() {
    const { toast } = useToast();
    
    const handleExport = () => {
      toast({
        title: "Ekspor Data (Simulasi)",
        description: "Fitur ini akan mengekspor data ke file Excel atau PDF."
      })
    }

    const handleViewReport = (reportName: string) => {
        toast({
            title: `Laporan ${reportName}`,
            description: `Ini adalah placeholder untuk menampilkan ${reportName}.`,
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Laporan Kinerja Kasir</CardTitle>
                                <CardDescription>Analisis penjualan dan transaksi per kasir.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleExport}>
                                <FileDown className="mr-2 h-4 w-4"/>
                                Ekspor
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
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
                                     <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted))' }}
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Kasir
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                        {label}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Penjualan
                                                        </span>
                                                        <span className="font-bold">
                                                        Rp{payload[0].value} Jt
                                                        </span>
                                                    </div>
                                                    </div>
                                                </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar
                                    dataKey="sales"
                                    fill="hsl(var(--primary))"
                                    radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Laporan Pemasukan per Metode Pembayaran</CardTitle>
                                <CardDescription>Rincian pendapatan dari berbagai metode pembayaran.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <div className="mb-6">
                            <h3 className="text-lg font-medium mb-4">Total Pemasukan</h3>
                             <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={paymentMethodData}>
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
                                    tickFormatter={(value) => `Rp${value / 1000000} Jt`}
                                    />
                                     <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted))' }}
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            {label}
                                                        </span>
                                                        <span className="font-bold">
                                                            Rp{(payload[0].value as number).toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar dataKey="total" fill="hsl(var(--accent-foreground))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Metode</TableHead>
                                    <TableHead className="text-right">Total Transaksi</TableHead>
                                    <TableHead className="text-right">Total Pemasukan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paymentMethodData.map((method) => (
                                <TableRow key={method.name}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <method.icon className="h-4 w-4 text-muted-foreground" />
                                        {method.name}
                                    </TableCell>
                                    <TableCell className="text-right">{method.transactions}</TableCell>
                                    <TableCell className="text-right">Rp{method.total.toLocaleString('id-ID')}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                     <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Analitik Pelanggan</CardTitle>
                            <CardDescription>Pahami perilaku dan demografi pelanggan Anda.</CardDescription>
                        </div>
                         <Button variant="outline" size="sm" onClick={() => handleViewReport('Analitik Pelanggan')}>Lihat Detail</Button>
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
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => handleViewReport('Laba & Rugi')}>
                            <FileText className="h-4 w-4"/>
                            Laporan Laba & Rugi
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => handleViewReport('Pajak')}>
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
                                <CustomLink href="/reports/audit-trail">Lihat Semua</CustomLink>
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

    