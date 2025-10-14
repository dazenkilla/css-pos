import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const salesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+Rp1.999.000",
    avatar: "OM",
    avatarUrl: "https://picsum.photos/seed/1/40/40"
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+Rp39.000",
    avatar: "JL",
    avatarUrl: "https://picsum.photos/seed/2/40/40"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+Rp299.000",
    avatar: "IN",
    avatarUrl: "https://picsum.photos/seed/3/40/40"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+Rp99.000",
    avatar: "WK",
    avatarUrl: "https://picsum.photos/seed/4/40/40"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+Rp39.000",
    avatar: "SD",
    avatarUrl: "https://picsum.photos/seed/5/40/40"
  },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {salesData.map((sale) => (
        <div className="flex items-center" key={sale.email}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatarUrl} alt="Avatar" />
            <AvatarFallback>{sale.avatar}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}
