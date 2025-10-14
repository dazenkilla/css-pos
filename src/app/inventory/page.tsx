"use client";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inventoryItems } from "@/lib/data"
import { PlusCircle, ArrowRightLeft } from "lucide-react"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function InventoryPage() {
  const [isTransferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferItem, setTransferItem] = useState<typeof inventoryItems[0] | null>(null);
  const { toast } = useToast();

  const getStatus = (stock: number) => {
    if (stock > 20) return { text: "In Stock", variant: "secondary" as const };
    if (stock > 0) return { text: "Low Stock", variant: "outline" as const };
    return { text: "Out of Stock", variant: "destructive" as const };
  };

  const handleOpenTransferDialog = (item: typeof inventoryItems[0]) => {
    setTransferItem(item);
    setTransferDialogOpen(true);
  };

  const handleTransfer = () => {
    toast({
      title: "Transfer Initiated",
      description: `Stock transfer for ${transferItem?.name} has been processed.`,
    });
    setTransferDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>Manage your products and view their stock levels.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-1" onClick={() => alert('Stock Opname process initiated. (This is a placeholder)')}>
                Stock Opname
              </Button>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
                <TableHead className="hidden md:table-cell text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => {
                const status = getStatus(item.stock);
                const isLowStock = status.variant === 'outline';
                const isOutOfStock = status.variant === 'destructive';
                return (
                  <TableRow key={item.sku} className={isOutOfStock ? 'bg-destructive/10' : isLowStock ? 'bg-yellow-500/10' : ''}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground hidden sm:inline">{item.sku}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>{item.category}</div>
                      <div className="text-xs text-muted-foreground">{item.subCategory}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.text}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{item.expiryDate || 'N/A'}</TableCell>
                    <TableCell className="hidden md:table-cell text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">{item.stock}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenTransferDialog(item)}>
                        <ArrowRightLeft className="h-4 w-4" />
                        <span className="sr-only">Transfer Stock</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transfer Stock Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Stock: {transferItem?.name}</DialogTitle>
            <DialogDescription>
              Simulate transferring stock to another branch. This is a placeholder and does not affect real data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                defaultValue="1"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branch" className="text-right">
                To Branch
              </Label>
              <Input
                id="branch"
                defaultValue="Main Warehouse"
                className="col-span-3"
                placeholder="e.g. Branch B"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleTransfer}>Confirm Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
