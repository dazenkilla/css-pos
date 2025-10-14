import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { CreditCard } from "lucide-react"

const salesData = [
  {
    id: "SALE-001",
    amount: "+Rp1.999.000",
    time: "5 menit lalu"
  },
  {
    id: "SALE-002",
    amount: "+Rp39.000",
    time: "10 menit lalu"
  },
  {
    id: "SALE-003",
    amount: "+Rp299.000",
    time: "12 menit lalu"
  },
  {
    id: "SALE-004",
    amount: "+Rp99.000",
    time: "15 menit lalu"
  },
  {
    id: "SALE-005",
    amount: "+Rp39.000",
    time: "20 menit lalu"
  },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {salesData.map((sale) => (
        <div className="flex items-center" key={sale.id}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>
                <CreditCard className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.id}</p>
            <p className="text-sm text-muted-foreground">{sale.time}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}
