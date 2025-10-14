import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { purchaseOrders } from "@/lib/data"
import { PlusCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function OrdersPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Selesai": return "secondary";
      case "Tertunda": return "outline";
      case "Dibatalkan": return "destructive";
      default: return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Pesanan Pembelian</CardTitle>
            <CardDescription>Buat dan lacak pesanan pembelian untuk inventaris Anda.</CardDescription>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Buat Pesanan
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Buat Pesanan Pembelian</SheetTitle>
                <SheetDescription>Isi detail untuk membuat pesanan pembelian baru.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Pemasok</Label>
                  <Input id="supplier" placeholder="cth. PT Pemasok Jaya" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="items">Produk</Label>
                  <Textarea id="items" placeholder="Tulis produk dan jumlah, satu per baris." />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Buat Pesanan</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">ID Pesanan</TableHead>
              <TableHead>Pemasok</TableHead>
              <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="hidden sm:table-cell font-medium">{order.id}</TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">Rp{order.total.toFixed(0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
