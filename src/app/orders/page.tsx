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
      case "Fulfilled": return "secondary";
      case "Pending": return "outline";
      case "Cancelled": return "destructive";
      default: return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Purchase Orders</CardTitle>
            <CardDescription>Create and track purchase orders for your inventory.</CardDescription>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Create Order
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create Purchase Order</SheetTitle>
                <SheetDescription>Fill in the details to create a new purchase order.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="e.g. Acme Inc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="items">Items</Label>
                  <Textarea id="items" placeholder="List items and quantities, one per line." />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Create Order</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Order ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
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
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
