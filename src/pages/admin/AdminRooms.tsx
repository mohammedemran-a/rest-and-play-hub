import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const roomsData = [
  { id: 1, name: "جناح VIP", price: 800, status: "متاح", capacity: 6, image: "/placeholder.svg" },
  { id: 2, name: "غرفة عائلية", price: 500, status: "محجوز", capacity: 8, image: "/placeholder.svg" },
  { id: 3, name: "غرفة ديلوكس", price: 600, status: "متاح", capacity: 4, image: "/placeholder.svg" },
];

const AdminRooms = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الغرف</h1>
            <p className="text-muted-foreground">التحكم الكامل بجميع الغرف</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-elegant">
                <Plus className="w-4 h-4" />
                إضافة غرفة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>إضافة غرفة جديدة</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">اسم الغرفة</Label>
                  <Input id="name" placeholder="مثال: جناح VIP" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">السعر في الليلة (ريال)</Label>
                    <Input id="price" type="number" placeholder="800" />
                  </div>
                  <div>
                    <Label htmlFor="capacity">عدد الأشخاص</Label>
                    <Input id="capacity" type="number" placeholder="6" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea id="description" placeholder="وصف تفصيلي للغرفة..." rows={4} />
                </div>
                <div>
                  <Label htmlFor="features">المرافق</Label>
                  <Input id="features" placeholder="واي فاي، تكييف، تلفاز..." />
                </div>
                <div>
                  <Label htmlFor="image">رابط الصورة</Label>
                  <Input id="image" placeholder="https://..." />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button type="submit">حفظ</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>قائمة الغرف</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الصورة</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>السعة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-right">العمليات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id} className="hover:bg-accent/5">
                    <TableCell>
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>{room.price} ريال</TableCell>
                    <TableCell>{room.capacity} أشخاص</TableCell>
                    <TableCell>
                      <Badge variant={room.status === "متاح" ? "default" : "secondary"}>
                        {room.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="ghost" className="hover:bg-primary/10">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-destructive/10 hover:text-destructive">
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

export default AdminRooms;
