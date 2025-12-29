
import { CustomLink } from '@/components/ui/custom-link';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AccountingPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Dasbor Akuntansi</CardTitle>
                    <CardDescription>Pusat untuk semua fitur dan laporan akuntansi Anda.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Bagan Akun</CardTitle>
                                <CardDescription>Kelola semua akun keuangan.</CardDescription>
                            </div>
                             <Button variant="outline" size="icon" asChild>
                                <CustomLink href="/accounting/chart-of-accounts">
                                    <ArrowRight className="h-4 w-4" />
                                </CustomLink>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Lihat dan atur daftar lengkap akun seperti aset, liabilitas, ekuitas, pendapatan, dan biaya.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Entri Jurnal</CardTitle>
                                <CardDescription>Catat semua transaksi keuangan.</CardDescription>
                            </div>
                            <Button variant="outline" size="icon" asChild>
                                <CustomLink href="/accounting/journal-entries">
                                    <ArrowRight className="h-4 w-4" />
                                </CustomLink>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-muted-foreground">Buat dan kelola entri jurnal manual untuk mencatat transaksi yang tidak otomatis diposting.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                         <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Buku Besar</CardTitle>
                                <CardDescription>Lacak semua transaksi per akun.</CardDescription>
                            </div>
                            <Button variant="outline" size="icon" asChild>
                                <CustomLink href="/accounting/general-ledger">
                                    <ArrowRight className="h-4 w-4" />
                                </CustomLink>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-muted-foreground">Lihat riwayat transaksi terperinci untuk setiap akun dalam bagan akun Anda.</p>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Laporan Keuangan</CardTitle>
                                <CardDescription>Akses laporan laba rugi, neraca, dan lainnya.</CardDescription>
                            </div>
                            <Button variant="default" size="sm" asChild>
                                <CustomLink href="/reports">Buka Laporan</CustomLink>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">Hasilkan laporan keuangan penting untuk menganalisis kesehatan finansial bisnis Anda.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
