import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Role {
  id: number;
  name: string;
  permissions: string[];
  usersCount: number;
  createdAt: string;
}

const availablePermissions = [
  { id: "users_view", label: "عرض المستخدمين" },
  { id: "users_edit", label: "تعديل المستخدمين" },
  { id: "users_delete", label: "حذف المستخدمين" },
  { id: "rooms_view", label: "عرض الغرف" },
  { id: "rooms_edit", label: "تعديل الغرف" },
  { id: "rooms_delete", label: "حذف الغرف" },
  { id: "bookings_view", label: "عرض الحجوزات" },
  { id: "bookings_manage", label: "إدارة الحجوزات" },
  { id: "services_view", label: "عرض الخدمات" },
  { id: "services_edit", label: "تعديل الخدمات" },
  { id: "orders_view", label: "عرض الطلبات" },
  { id: "orders_manage", label: "إدارة الطلبات" },
  { id: "matches_view", label: "عرض المباريات" },
  { id: "matches_edit", label: "تعديل المباريات" },
  { id: "settings_view", label: "عرض الإعدادات" },
  { id: "settings_edit", label: "تعديل الإعدادات" },
];

const rolesData: Role[] = [
  {
    id: 1,
    name: "مدير النظام",
    permissions: availablePermissions.map(p => p.id),
    usersCount: 2,
    createdAt: "2025-01-15",
  },
  {
    id: 2,
    name: "موظف الاستقبال",
    permissions: ["rooms_view", "bookings_view", "bookings_manage", "users_view"],
    usersCount: 5,
    createdAt: "2025-02-10",
  },
  {
    id: 3,
    name: "مدير الخدمات",
    permissions: ["services_view", "services_edit", "orders_view", "orders_manage"],
    usersCount: 3,
    createdAt: "2025-03-05",
  },
  {
    id: 4,
    name: "عميل",
    permissions: ["rooms_view", "services_view", "matches_view"],
    usersCount: 150,
    createdAt: "2025-01-01",
  },
];

const AdminRoles = () => {
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setRoleName(role.name);
      setSelectedPermissions(role.permissions);
    } else {
      setEditingRole(null);
      setRoleName("");
      setSelectedPermissions([]);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRole(null);
    setRoleName("");
    setSelectedPermissions([]);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSaveRole = () => {
    if (!roleName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم الدور",
        variant: "destructive",
      });
      return;
    }

    if (selectedPermissions.length === 0) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار صلاحية واحدة على الأقل",
        variant: "destructive",
      });
      return;
    }

    if (editingRole) {
      setRoles(prev =>
        prev.map(r =>
          r.id === editingRole.id
            ? { ...r, name: roleName, permissions: selectedPermissions }
            : r
        )
      );
      toast({
        title: "تم التحديث",
        description: "تم تحديث الدور بنجاح",
      });
    } else {
      const newRole: Role = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        name: roleName,
        permissions: selectedPermissions,
        usersCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setRoles(prev => [...prev, newRole]);
      toast({
        title: "تم الإنشاء",
        description: "تم إنشاء الدور بنجاح",
      });
    }

    handleCloseDialog();
  };

  const handleDeleteRole = (roleId: number) => {
    const role = roles.find(r => r.id === roleId);
    if (role && role.usersCount > 0) {
      toast({
        title: "لا يمكن الحذف",
        description: `لا يمكن حذف دور مرتبط بـ ${role.usersCount} مستخدم`,
        variant: "destructive",
      });
      return;
    }

    setRoles(prev => prev.filter(r => r.id !== roleId));
    toast({
      title: "تم الحذف",
      description: "تم حذف الدور بنجاح",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الأدوار والصلاحيات</h1>
            <p className="text-muted-foreground">تخصيص الأدوار وتعيين الصلاحيات</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2 shadow-elegant">
                <Plus className="w-4 h-4" />
                إضافة دور جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingRole ? "تعديل الدور" : "إضافة دور جديد"}
                </DialogTitle>
                <DialogDescription>
                  قم بتحديد اسم الدور والصلاحيات المرتبطة به
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">اسم الدور</Label>
                  <Input
                    id="role-name"
                    placeholder="مثال: مدير الحجوزات"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>الصلاحيات</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
                    {availablePermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <Checkbox
                          id={permission.id}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => handlePermissionToggle(permission.id)}
                        />
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog}>
                  إلغاء
                </Button>
                <Button onClick={handleSaveRole}>
                  {editingRole ? "حفظ التعديلات" : "إنشاء الدور"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>قائمة الأدوار</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الدور</TableHead>
                  <TableHead>عدد الصلاحيات</TableHead>
                  <TableHead>عدد المستخدمين</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead className="text-right">العمليات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id} className="hover:bg-accent/5">
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {role.permissions.length} صلاحية
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {role.usersCount} مستخدم
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {role.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-primary/10"
                          onClick={() => handleOpenDialog(role)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminRoles;
