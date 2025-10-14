

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
import { Users, FileText, Wallet, CreditCard, QrCode, Landmark, UserPlus, ShoppingBag, TrendingUp, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { salesHistory } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const paymentMethodData = [
    { id: "tunai", name: "Tunai", total: 15250000, transactions: 120, icon: Wallet },
    { id: "kartu", name: "Kartu", total: 22500000, transactions: 95, icon: CreditCard },
    { id: "qr", name: "QR", total: 18750000, transactions: 150, icon: QrCode },
    { id: "transfer", name: "Transfer Bank", total: 8500000, transactions: 30, icon: Landmark },
];

export default function ReportsPage() {
    const { toast } = useToast();
    const router = useRouter();

    const getImageUrl = (name: string) => {
        const image = PlaceHolderImages.find(img => img.description.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
        return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/64/64';
    };
    
    const handleViewReport = (reportName: string) => {
        toast({
            title: `Laporan ${reportName}`,
            description: `Ini adalah placeholder untuk menampilkan ${reportName}.`,
        });
    };

    // Calculate product sales analytics
    const productSales: { [key: string]: { name: string, quantity: number } } = {};
    salesHistory.forEach(sale => {
        sale.items.forEach(item => {
            if (productSales[item.name]) {
                productSales[item.name].quantity += item.quantity;
            } else {
                productSales[item.name] = { name: item.name, quantity: item.quantity };
            }
        });
    });

    const topSellingProducts = Object.values(productSales)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5); // Display top 5
    
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="lg:col-span-2">
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
                                    <TableHead className="text-right">Aksi</TableHead>
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
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <CustomLink href={`/reports/payment-methods/${method.id.toLowerCase().replace(' ', '-')}`}>
                                                Lihat Detail
                                            </CustomLink>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Analitik Produk Terlaris</CardTitle>
                                <CardDescription>Produk yang paling banyak terjual bulan ini.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => toast({title: "Fitur Belum Tersedia"})}>
                                Lihat Semua Produk
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topSellingProducts.map((product) => (
                                <div key={product.name} className="flex items-center gap-4">
                                    <Image
                                        alt={product.name}
                                        className="aspect-square rounded-md object-cover"
                                        height="40"
                                        src={getImageUrl(product.name)}
                                        width="40"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{product.name}</p>
                                    </div>
                                    <div className="font-medium text-right">
                                        <p>{product.quantity}</p>
                                        <p className="text-xs text-muted-foreground">terjual</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                     <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Analitik Pelanggan</CardTitle>
                            <CardDescription>Pahami perilaku dan demografi pelanggan Anda bulan ini.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                   <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pelanggan Bulan Ini</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">125</div>
                                <p className="text-xs text-muted-foreground">+15.3% dari bulan lalu</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pelanggan Baru</CardTitle>
                                <UserPlus className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">32</div>
                                <p className="text-xs text-muted-foreground">Pelanggan yang pertama kali transaksi</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Rata-rata Belanja</CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp124.530</div>
                                <p className="text-xs text-muted-foreground">Rata-rata nilai per transaksi</p>
                            </CardContent>
                        </Card>
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

    

    

    

}
