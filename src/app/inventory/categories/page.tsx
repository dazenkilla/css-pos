
import { Button } from "@/components/ui/button";
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
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Data placeholder untuk kategori dan sub-kategori
const categoriesData = [
    {
        id: "cat-1",
        name: "Minuman",
        subCategories: ["Kopi", "Teh", "Susu"],
        itemCount: 3,
    },
    {
        id: "cat-2",
        name: "Kue",
        subCategories: ["Viennoiserie", "Muffin", "Kue Kering"],
        itemCount: 3,
    },
    {
        id: "cat-3",
        name: "Merchandise",
        subCategories: ["Peralatan"],
        itemCount: 2,
    },
];

export default function CategoriesPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Master Kategori Produk</CardTitle>
                        <CardDescription>Kelola kategori dan sub-kategori untuk produk Anda.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Tambah Kategori
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Kategori</TableHead>
                            <TableHead>Sub-Kategori</TableHead>
                            <TableHead className="text-right">Jumlah Produk</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categoriesData.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {category.subCategories.map(sub => (
                                        <Badge key={sub} variant="secondary">{sub}</Badge>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">{category.itemCount}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Ubah</DropdownMenuItem>
                                        <DropdownMenuItem>Kelola Sub-Kategori</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Hapus</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
