"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { inventoryItems } from "@/lib/data";


const generateInitialCategories = () => {
    const categoriesMap: { [key: string]: { id: string; name: string; subCategories: Set<string>; itemCount: number } } = {};

    inventoryItems.forEach(item => {
        if (!categoriesMap[item.category]) {
            categoriesMap[item.category] = {
                id: `cat-${item.category.toLowerCase().replace(/\s/g, '-')}`,
                name: item.category,
                subCategories: new Set(),
                itemCount: 0,
            };
        }
        categoriesMap[item.category].itemCount++;
        categoriesMap[item.category].subCategories.add(item.subCategory);
    });

    return Object.values(categoriesMap).map(cat => ({ ...cat, subCategories: Array.from(cat.subCategories)}));
}


type Category = {
    id: string;
    name: string;
    subCategories: string[];
    itemCount: number;
};

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>(generateInitialCategories());
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
    const { toast } = useToast();

    const handleOpenDialog = (category: Category | null = null) => {
        setEditingCategory(category);
        setDialogOpen(true);
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        
        if (editingCategory) {
            // Edit
            setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, name } : c));
            toast({ title: "Kategori Diperbarui", description: `Kategori "${name}" telah diperbarui.` });
        } else {
            // Add
            const newCategory: Category = {
                id: `cat-${Date.now()}`,
                name,
                subCategories: [],
                itemCount: 0,
            };
            setCategories([newCategory, ...categories]);
            toast({ title: "Kategori Ditambahkan", description: `Kategori "${name}" telah ditambahkan.` });
        }
        setDialogOpen(false);
        setEditingCategory(null);
    };

    const handleOpenDeleteDialog = (id: string) => {
        setDeletingCategoryId(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (deletingCategoryId) {
            const categoryToDelete = categories.find(c => c.id === deletingCategoryId);
            setCategories(categories.filter(c => c.id !== deletingCategoryId));
            setDeleteDialogOpen(false);
            setDeletingCategoryId(null);
            toast({ title: "Kategori Dihapus", description: `Kategori "${categoryToDelete?.name}" telah dihapus.` });
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Master Kategori Produk</CardTitle>
                            <CardDescription>Kelola kategori dan sub-kategori untuk produk Anda.</CardDescription>
                        </div>
                        <Button size="sm" className="gap-1" onClick={() => handleOpenDialog()}>
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
                            {categories.map((category) => (
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
                                            <DropdownMenuItem onClick={() => handleOpenDialog(category)}>Ubah</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast({title: "Fitur Belum Tersedia", description: "Pengelolaan sub-kategori akan ditambahkan segera."})}>Kelola Sub-Kategori</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => handleOpenDeleteDialog(category.id)}>Hapus</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog Tambah/Ubah Kategori */}
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? 'Ubah Kategori' : 'Tambah Kategori Baru'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nama Kategori</Label>
                                <Input id="name" name="name" defaultValue={editingCategory?.name} className="col-span-3" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Dialog Konfirmasi Hapus */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus kategori secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
