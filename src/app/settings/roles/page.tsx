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
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const allPermissions = [
  { id: "sales:create", label: "Buat Penjualan" },
  { id: "sales:read", label: "Lihat Riwayat Penjualan" },
  { id: "inventory:manage", label: "Kelola Inventaris" },
  { id: "reports:view", label: "Lihat Laporan" },
  { id: "users:manage", label: "Kelola Pengguna" },
  { id: "settings:manage", label: "Kelola Pengaturan Toko" },
  { id: "accounting:view", label: "Lihat Data Akuntansi" },
  { id: "accounting:manage", label: "Kelola Data Akuntansi" },
];

const initialRoles = [
  {
    id: "role-admin",
    name: "Admin",
    description: "Akses penuh ke semua fitur sistem.",
    permissions: allPermissions.map(p => p.id),
  },
  {
    id: "role-kasir",
    name: "Kasir",
    description: "Akses terbatas untuk operasi penjualan harian.",
    permissions: ["sales:create", "sales:read"],
  },
];

type Role = typeof initialRoles[0];
type Permission = typeof allPermissions[0];

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRoleId, setDeletingRoleId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleOpenDialog = (role: Role | null = null) => {
    setEditingRole(role);
    setDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (id: string) => {
      setDeletingRoleId(id);
      setDeleteDialogOpen(true);
  };

  const handleSaveRole = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const permissions = allPermissions.filter(p => formData.has(p.id)).map(p => p.id);

    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name, description, permissions } : r));
      toast({ title: "Peran Diperbarui", description: `Peran "${name}" telah berhasil diperbarui.` });
    } else {
      const newRole: Role = {
        id: `role-${Date.now()}`,
        name,
        description,
        permissions,
      };
      setRoles([...roles, newRole]);
      toast({ title: "Peran Ditambahkan", description: `Peran "${name}" telah berhasil ditambahkan.` });
    }

    setDialogOpen(false);
    setEditingRole(null);
  };
  
  const handleDelete = () => {
      if (deletingRoleId) {
          const roleToDelete = roles.find(r => r.id === deletingRoleId);
          setRoles(roles.filter(r => r.id !== deletingRoleId));
          setDeleteDialogOpen(false);
          setDeletingRoleId(null);
          toast({ title: "Peran Dihapus", description: `Peran "${roleToDelete?.name}" telah dihapus.` });
      }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manajemen Peran</CardTitle>
              <CardDescription>
                Buat dan kelola peran untuk memberikan izin akses kepada pengguna.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={() => handleOpenDialog()}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Tambah Peran
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Peran</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-muted-foreground">{role.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(role)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Ubah Peran</span>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleOpenDeleteDialog(role.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Hapus Peran</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialog Tambah/Ubah Peran */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRole ? "Ubah Peran" : "Tambah Peran Baru"}</DialogTitle>
            <DialogDescription>
              Isi detail peran dan pilih izin yang sesuai.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveRole}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role-name" className="text-right">Nama</Label>
                <Input id="role-name" name="name" defaultValue={editingRole?.name} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role-description" className="text-right">Deskripsi</Label>
                <Input id="role-description" name="description" defaultValue={editingRole?.description} className="col-span-3" required />
              </div>
              <div>
                <Label className="font-medium">Izin (Permissions)</Label>
                <div className="mt-2 grid grid-cols-2 gap-4 rounded-lg border p-4">
                  {allPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={permission.id}
                        name={permission.id}
                        defaultChecked={editingRole?.permissions.includes(permission.id)}
                      />
                      <Label htmlFor={permission.id} className="font-normal text-sm">{permission.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan Peran</Button>
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
                      Tindakan ini tidak dapat dibatalkan. Ini akan menghapus peran secara permanen.
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
