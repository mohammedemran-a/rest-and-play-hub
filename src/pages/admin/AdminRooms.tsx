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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const privateRooms = [
  { id: 1, name: "جناح VIP", price: 800, status: "متاح", capacity: 6, image: "/placeholder.svg", category: "private" },
  { id: 2, name: "غرفة عائلية", price: 500, status: "محجوز", capacity: 8, image: "/placeholder.svg", category: "private" },
  { id: 3, name: "غرفة ديلوكس", price: 600, status: "متاح", capacity: 4, image: "/placeholder.svg", category: "private" },
];

const publicRooms = [
  { id: 4, name: "غرفة مشتركة A", price: 200, status: "متاح", capacity: 10, image: "/placeholder.svg", category: "public" },
  { id: 5, name: "غرفة مشتركة B", price: 250, status: "متاح", capacity: 12, image: "/placeholder.svg", category: "public" },
];

const eventHalls = [
  { id: 6, name: "صالة المناسبات الكبرى", price: 2000, status: "متاح", capacity: 100, image: "/placeholder.svg", category: "events" },
  { id: 7, name: "صالة الاحتفالات", price: 1500, status: "محجوز", capacity: 80, image: "/placeholder.svg", category: "events" },
];

const playstationRooms = [
  { id: 8, name: "غرفة بلايستيشن VIP", price: 150, status: "متاح", capacity: 4, image: "/placeholder.svg", category: "playstation" },
  { id: 9, name: "غرفة بلايستيشن عادية", price: 100, status: "متاح", capacity: 4, image: "/placeholder.svg", category: "playstation" },
];

const billiardRooms = [
  { id: 10, name: "صالة البلياردو الفاخرة", price: 200, status: "متاح", capacity: 6, image: "/placeholder.svg", category: "billiard" },
  { id: 11, name: "صالة البلياردو العادية", price: 120, status: "متاح", capacity: 6, image: "/placeholder.svg", category: "billiard" },
];

const AdminRooms = () => {
  const [allRooms] = useState([...privateRooms, ...publicRooms, ...eventHalls, ...playstationRooms, ...billiardRooms]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("private");

  const RoomDialog = () => (
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
            <Label htmlFor="category">التصنيف</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="اختر التصنيف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">غرف خاصة</SelectItem>
                <SelectItem value="public">غرف عامة</SelectItem>
                <SelectItem value="events">صالات المناسبات</SelectItem>
                <SelectItem value="playstation">غرف البلايستيشن</SelectItem>
                <SelectItem value="billiard">صالات البلياردو</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          <div className="flex gap-2 justify-start">
            <Button type="submit">حفظ</Button>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  const RoomsTable = ({ rooms }: { rooms: typeof allRooms }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الصورة</TableHead>
          <TableHead>الاسم</TableHead>
          <TableHead>السعر</TableHead>
          <TableHead>السعة</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>العمليات</TableHead>
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
            <TableCell>
              <div className="flex gap-2 justify-start">
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
  );

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الغرف</h1>
            <p className="text-muted-foreground">التحكم الكامل بجميع الغرف والتصنيفات</p>
          </div>
          <RoomDialog />
        </div>

        <Tabs defaultValue="private" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="private">غرف خاصة</TabsTrigger>
            <TabsTrigger value="public">غرف عامة</TabsTrigger>
            <TabsTrigger value="events">صالات المناسبات</TabsTrigger>
            <TabsTrigger value="playstation">بلايستيشن</TabsTrigger>
            <TabsTrigger value="billiard">بلياردو</TabsTrigger>
          </TabsList>

          <TabsContent value="private">
            <Card>
              <CardHeader>
                <CardTitle>الغرف الخاصة</CardTitle>
              </CardHeader>
              <CardContent>
                <RoomsTable rooms={privateRooms} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="public">
            <Card>
              <CardHeader>
                <CardTitle>الغرف العامة</CardTitle>
              </CardHeader>
              <CardContent>
                <RoomsTable rooms={publicRooms} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>صالات المناسبات</CardTitle>
              </CardHeader>
              <CardContent>
                <RoomsTable rooms={eventHalls} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playstation">
            <Card>
              <CardHeader>
                <CardTitle>غرف البلايستيشن</CardTitle>
              </CardHeader>
              <CardContent>
                <RoomsTable rooms={playstationRooms} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billiard">
            <Card>
              <CardHeader>
                <CardTitle>صالات البلياردو</CardTitle>
              </CardHeader>
              <CardContent>
                <RoomsTable rooms={billiardRooms} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminRooms;
