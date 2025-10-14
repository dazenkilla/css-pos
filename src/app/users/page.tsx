"use client";

import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { users as initialUsers } from "@/lib/data"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast";

type User = typeof initialUsers[0];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const getRoleVariant = (role: string) => {
    switch (role) {
      case "Admin": return "default";
      case "Kasir": return "secondary";
      default: return "outline";
    }
  };

  const handleOpenDialog = (user: User | null = null) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const role = formData.get("role") as string;

      if (editingUser) {
          setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, role } : u));
          toast({ title: "Pengguna Diperbarui", description: `Data untuk ${name} telah diperbarui.` });
      } else {
          const newUser: User = {
              id: `USR-${Date.now()}`,
              name,
              email,
              role,
              lastActive: "Baru saja",
          };
          setUsers([newUser, ...users]);
          toast({ title: "Pengguna Ditambahkan", description: `${name} telah ditambahkan sebagai pengguna baru.` });
      }
      setDialogOpen(false);
      setEditingUser(null);
  };
  
  const handleOpenDeleteDialog = (id: string) => {
      setDeletingUserId(id);
      setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
      if (deletingUserId) {
          const userToDelete = users.find(u => u.id === deletingUserId);
          setUsers(users.filter(u => u.id !== deletingUserId));
          setDeleteDialogOpen(false);
          setDeletingUserId(null);
          toast({ title: "Pengguna Dihapus", description: `Pengguna ${userToDelete?.name} telah dihapus.` });
      }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Pengguna</CardTitle>
              <CardDescription>Kelola akun staf dan peran mereka.</CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={() => handleOpenDialog()}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Tambah Pengguna
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead className="hidden sm:table-cell">Terakhir Aktif</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground hidden sm:inline">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleVariant(user.role) as any}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(user)}>Ubah</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast({ title: "Fitur Belum Tersedia" })}>Lihat Aktivitas</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleOpenDeleteDialog(user.id)}>Hapus</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Dialog Tambah/Ubah Pengguna */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{editingUser ? 'Ubah Pengguna' : 'Tambah Pengguna Baru'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave}>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-name" className="text-right">Nama</Label>
                          <Input id="user-name" name="name" defaultValue={editingUser?.name} className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-email" className="text-right">Email</Label>
                          <Input id="user-email" name="email" type="email" defaultValue={editingUser?.email} className="col-span-3" required />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-role" className="text-right">Peran</Label>
                          <div className="col-span-3">
                              <Select name="role" defaultValue={editingUser?.role || "Kasir"} required>
                                  <SelectTrigger>
                                      <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="Admin">Admin</SelectItem>
                                      <SelectItem value="Kasir">Kasir</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
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
                      Tindakan ini akan menghapus pengguna. Aksi ini tidak dapat dibatalkan.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Hapus Pengguna</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
