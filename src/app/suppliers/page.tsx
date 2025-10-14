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
import { useToast } from "@/hooks/use-toast";
import { suppliers as initialSuppliers } from "@/lib/data";

type Supplier = typeof initialSuppliers[0];

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState(initialSuppliers);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
    const [deletingSupplierId, setDeletingSupplierId] = useState<string | null>(null);
    const { toast } = useToast();

    const handleOpenDialog = (supplier: Supplier | null = null) => {
        setEditingSupplier(supplier);
        setDialogOpen(true);
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const contactName = formData.get("contactName") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        
        if (editingSupplier) {
            setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? { ...s, name, contactName, phone, email } : s));
            toast({ title: "Supplier Diperbarui", description: `Data untuk ${name} telah diperbarui.` });
        } else {
            const newSupplier: Supplier = {
                id: `SUP-${Date.now()}`,
                name,
                contactName,
                phone,
                email
            };
            setSuppliers([newSupplier, ...suppliers]);
            toast({ title: "Supplier Ditambahkan", description: `${name} telah ditambahkan.` });
        }
        setDialogOpen(false);
        setEditingSupplier(null);
    };

    const handleOpenDeleteDialog = (id: string) => {
        setDeletingSupplierId(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (deletingSupplierId) {
            const supplierToDelete = suppliers.find(s => s.id === deletingSupplierId);
            setSuppliers(suppliers.filter(s => s.id !== deletingSupplierId));
            setDeleteDialogOpen(false);
            setDeletingSupplierId(null);
            toast({ title: "Supplier Dihapus", description: `Supplier "${supplierToDelete?.name}" telah dihapus.` });
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Manajemen Supplier</CardTitle>
                            <CardDescription>Kelola daftar semua supplier Anda.</CardDescription>
                        </div>
                        <Button size="sm" className="gap-1" onClick={() => handleOpenDialog()}>
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Tambah Supplier
                            </span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Supplier</TableHead>
                                <TableHead>Kontak Person</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telepon</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell className="font-medium">{supplier.name}</TableCell>
                                <TableCell>{supplier.contactName}</TableCell>
                                <TableCell className="text-muted-foreground">{supplier.email}</TableCell>
                                <TableCell className="text-muted-foreground">{supplier.phone}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleOpenDialog(supplier)}>Ubah</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => handleOpenDeleteDialog(supplier.id)}>Hapus</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingSupplier ? 'Ubah Supplier' : 'Tambah Supplier Baru'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nama</Label>
                                <Input id="name" name="name" defaultValue={editingSupplier?.name} className="col-span-3" required />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contactName" className="text-right">Kontak Person</Label>
                                <Input id="contactName" name="contactName" defaultValue={editingSupplier?.contactName} className="col-span-3" required />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input id="email" name="email" type="email" defaultValue={editingSupplier?.email} className="col-span-3" required />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Telepon</Label>
                                <Input id="phone" name="phone" defaultValue={editingSupplier?.phone} className="col-span-3" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus supplier secara permanen.
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
