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
import { Badge } from "@/components/ui/badge"

const auditLogData = [
    { id: 1, user: "Samantha", action: "CREATE_PRODUCT", details: "Menambahkan produk 'Kopi Luwak'", timestamp: "2023-11-28 10:05:12" },
    { id: 2, user: "David", action: "PROCESS_SALE", details: "Penjualan #SALE-005, Total: Rp150.000", timestamp: "2023-11-28 10:15:34" },
    { id: 3, user: "Samantha", action: "UPDATE_USER_ROLE", details: "Mengubah peran 'James' menjadi 'Admin'", timestamp: "2023-11-28 11:30:00" },
    { id: 4, user: "Brenda", action: "VOID_TRANSACTION", details: "Membatalkan penjualan #SALE-003", timestamp: "2023-11-28 12:01:45" },
];


export default function AuditTrailPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Jejak Audit Sistem</CardTitle>
                <CardDescription>Log terperinci dari semua aktivitas pengguna dalam sistem.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Waktu</TableHead>
                            <TableHead>Pengguna</TableHead>
                            <TableHead>Aksi</TableHead>
                            <TableHead>Detail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {auditLogData.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell className="text-xs text-muted-foreground">{log.timestamp}</TableCell>
                            <TableCell className="font-medium">{log.user}</TableCell>
                            <TableCell><Badge variant="outline">{log.action}</Badge></TableCell>
                            <TableCell>{log.details}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
