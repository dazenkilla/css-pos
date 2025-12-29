
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { inventoryItems as initialInventoryItems } from "@/lib/data";

type StockItem = {
  sku: string;
  name: string;
  systemStock: number;
  physicalStock: number | "";
};

const transformInventoryToStockItems = (
  items: typeof initialInventoryItems
): StockItem[] => {
  return items.map((item) => ({
    sku: item.sku,
    name: item.name,
    systemStock: item.stock,
    physicalStock: "",
  }));
};

export default function StockOpnamePage() {
  const [stockItems, setStockItems] = useState<StockItem[]>(
    transformInventoryToStockItems(initialInventoryItems)
  );
  const { toast } = useToast();

  const handlePhysicalStockChange = (sku: string, value: string) => {
    const newStockItems = stockItems.map((item) => {
      if (item.sku === sku) {
        return { ...item, physicalStock: value === "" ? "" : Number(value) };
      }
      return item;
    });
    setStockItems(newStockItems);
  };

  const calculateDifference = (system: number, physical: number | "") => {
    if (physical === "") return null;
    return physical - system;
  };

  const getDifferenceBadge = (difference: number | null) => {
    if (difference === null) return null;
    if (difference > 0) return <Badge variant="secondary" className="bg-green-100 text-green-800">+{difference}</Badge>;
    if (difference < 0) return <Badge variant="destructive">{difference}</Badge>;
    return <Badge variant="outline">0</Badge>;
  };

  const handleSaveChanges = () => {
    toast({
      title: "Penyesuaian Stok Disimpan (Simulasi)",
      description:
        "Stok sistem telah diperbarui sesuai dengan stok fisik yang diinput.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Stok Opname</CardTitle>
            <CardDescription>
              Hitung dan sesuaikan stok fisik produk Anda.
            </CardDescription>
          </div>
          <Button size="sm" className="gap-1" onClick={handleSaveChanges}>
            <Save className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Simpan Penyesuaian
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead className="text-center">Stok Sistem</TableHead>
              <TableHead className="w-[150px] text-center">Stok Fisik</TableHead>
              <TableHead className="text-center">Selisih</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockItems.map((item) => {
              const difference = calculateDifference(
                item.systemStock,
                item.physicalStock
              );
              return (
                <TableRow key={item.sku}>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.sku}</div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {item.systemStock}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.physicalStock}
                      onChange={(e) =>
                        handlePhysicalStockChange(item.sku, e.target.value)
                      }
                      className="text-center"
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {getDifferenceBadge(difference)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
