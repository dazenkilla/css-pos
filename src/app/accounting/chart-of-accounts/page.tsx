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
import { PlusCircle } from "lucide-react"

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
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Bagan Akun (Chart of Accounts)</CardTitle>
                        <CardDescription>Daftar semua akun keuangan dalam sistem akuntansi Anda.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
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
    )
}
