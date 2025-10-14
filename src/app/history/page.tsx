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
import { Button } from "@/components/ui/button"

// In a real app, this data would come from a database.
const salesHistory = [
  { id: "SALE-001", date: "2023-11-20", customer: "Olivia Martin", total: 199.99, status: "Completed", items: 3 },
  { id: "SALE-002", date: "2023-11-21", customer: "Jackson Lee", total: 39.00, status: "Completed", items: 1 },
  { id: "SALE-003", date: "2023-11-22", customer: "William Kim", total: 99.00, status: "Refunded", items: 1 },
  { id: "SALE-004", date: "2023-11-23", customer: "Sofia Davis", total: 299.00, status: "Completed", items: 2 },
];

export default function HistoryPage() {
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed": return "secondary";
      case "Pending": return "outline";
      case "Refunded": return "destructive";
      default: return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales History</CardTitle>
        <CardDescription>View and manage all past transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale ID</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesHistory.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell className="hidden sm:table-cell">{sale.date}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={getStatusVariant(sale.status) as any}>{sale.status}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-right">{sale.items}</TableCell>
                <TableCell className="text-right">${sale.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                    <Button variant="outline" size="sm" disabled={sale.status === 'Refunded'}>
                        {sale.status === 'Refunded' ? 'Voided' : 'Void/Refund'}
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

    