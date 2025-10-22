import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const servicesData = {
  grocery: [
    { id: 1, name: "ماء معدني", price: 5, stock: 100, category: "مشروبات" },
    { id: 2, name: "شيبسي", price: 8, stock: 50, category: "وجبات خفيفة" },
  ],
  qat: [
    { id: 3, name: "قات يافعي", price: 150, stock: 20, category: "قات" },
    { id: 4, name: "قات حريجي", price: 200, stock: 15, category: "قات" },
  ],
  shisha: [
    { id: 5, name: "شيشة تفاح", price: 50, stock: 30, category: "شيش" },
    { id: 6, name: "شيشة نعناع", price: 50, stock: 25, category: "شيش" },
  ],
  cards: [
    { id: 7, name: "كرت 50 جيجا", price: 100, stock: 40, category: "كروت" },
    { id: 8, name: "كرت 100 جيجا", price: 180, stock: 30, category: "كروت" },
  ],
};

const AdminServices = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("grocery");

  const ServiceTable = ({ data }: { data: typeof servicesData.grocery }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>اسم المنتج</TableHead>
          <TableHead>السعر</TableHead>
          <TableHead>الكمية</TableHead>
          <TableHead>الفئة</TableHead>
          <TableHead className="text-right">العمليات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} className="hover:bg-accent/5">
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.price} ريال</TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>{item.category}</TableCell>
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
  );

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">إدارة الخدمات</h1>
            <p className="text-muted-foreground">التحكم بعرض المنتجات والخدمات</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-elegant">
                <Plus className="w-4 h-4" />
                إضافة منتج جديد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة منتج جديد</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="productName">اسم المنتج</Label>
                  <Input id="productName" placeholder="مثال: ماء معدني" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">السعر (ريال)</Label>
                    <Input id="price" type="number" placeholder="50" />
                  </div>
                  <div>
                    <Label htmlFor="stock">الكمية</Label>
                    <Input id="stock" type="number" placeholder="100" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <Input id="category" placeholder="مشروبات" />
                </div>
                <div>
                  <Label htmlFor="productImage">رابط الصورة</Label>
                  <Input id="productImage" placeholder="https://..." />
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
            <CardTitle>قائمة الخدمات</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="grocery">البقالة</TabsTrigger>
                <TabsTrigger value="qat">القات</TabsTrigger>
                <TabsTrigger value="shisha">الشيش</TabsTrigger>
                <TabsTrigger value="cards">الكروت</TabsTrigger>
              </TabsList>
              <TabsContent value="grocery" className="mt-6">
                <ServiceTable data={servicesData.grocery} />
              </TabsContent>
              <TabsContent value="qat" className="mt-6">
                <ServiceTable data={servicesData.qat} />
              </TabsContent>
              <TabsContent value="shisha" className="mt-6">
                <ServiceTable data={servicesData.shisha} />
              </TabsContent>
              <TabsContent value="cards" className="mt-6">
                <ServiceTable data={servicesData.cards} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
