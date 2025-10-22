import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Users, Wifi, Coffee, Tv, Search } from "lucide-react";
import { useState } from "react";

const allRooms = [
  {
    id: 1,
    name: "الجناح الملكي",
    description: "جناح فاخر بإطلالة رائعة ومرافق متكاملة",
    price: 500,
    capacity: 6,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    features: ["واي فاي", "تلفاز", "مطبخ", "حمام خاص"],
    status: "متاحة",
    type: "جناح",
  },
  {
    id: 2,
    name: "غرفة العائلة",
    description: "مثالية للعائلات مع مساحة واسعة ومريحة",
    price: 350,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    features: ["واي فاي", "تلفاز", "مطبخ صغير"],
    status: "متاحة",
    type: "غرفة عائلية",
  },
  {
    id: 3,
    name: "غرفة الأصدقاء",
    description: "مثالية للقاءات والاجتماعات مع الأصدقاء",
    price: 300,
    capacity: 5,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    features: ["واي فاي", "تلفاز", "قهوة"],
    status: "محجوزة",
    type: "غرفة جماعية",
  },
  {
    id: 4,
    name: "غرفة الهدوء",
    description: "غرفة هادئة مثالية للاسترخاء والراحة",
    price: 250,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    features: ["واي فاي", "تلفاز"],
    status: "متاحة",
    type: "غرفة مفردة",
  },
  {
    id: 5,
    name: "الجناح الفاخر",
    description: "جناح بمساحة كبيرة مع جميع المرافق الحديثة",
    price: 600,
    capacity: 8,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    features: ["واي فاي", "تلفاز", "مطبخ", "حمام خاص", "شرفة"],
    status: "متاحة",
    type: "جناح",
  },
  {
    id: 6,
    name: "غرفة الزوجين",
    description: "غرفة رومانسية مع إطلالة جميلة",
    price: 280,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    features: ["واي فاي", "تلفاز", "قهوة"],
    status: "متاحة",
    type: "غرفة مفردة",
  },
];

const Rooms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredRooms = allRooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;
    const matchesPrice = 
      priceFilter === "all" ||
      (priceFilter === "low" && room.price < 300) ||
      (priceFilter === "medium" && room.price >= 300 && room.price < 500) ||
      (priceFilter === "high" && room.price >= 500);

    return matchesSearch && matchesStatus && matchesPrice;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20 px-4">
          <div className="container mx-auto text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold">غرفنا الفاخرة</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اختر من بين مجموعة متنوعة من الغرف المجهزة بأفضل المرافق
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-4 border-b bg-card">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن غرفة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="متاحة">متاحة فقط</SelectItem>
                  <SelectItem value="محجوزة">محجوزة</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="السعر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأسعار</SelectItem>
                  <SelectItem value="low">أقل من 300 ريال</SelectItem>
                  <SelectItem value="medium">300 - 500 ريال</SelectItem>
                  <SelectItem value="high">أكثر من 500 ريال</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room, index) => (
                <Card
                  key={room.id}
                  className="overflow-hidden hover-lift card-gradient border-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <Badge
                      className={`absolute top-4 right-4 ${
                        room.status === "متاحة" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {room.status}
                    </Badge>
                    <Badge className="absolute bottom-4 right-4 bg-primary/90">
                      {room.type}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl">{room.name}</CardTitle>
                    <CardDescription className="text-base">{room.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{room.price}</span>
                      <span className="text-muted-foreground">ريال / ليلة</span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{room.capacity} أشخاص</span>
                      </div>
                      {room.features.includes("واي فاي") && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Wifi className="h-4 w-4" />
                          <span>واي فاي</span>
                        </div>
                      )}
                      {room.features.includes("تلفاز") && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Tv className="h-4 w-4" />
                          <span>تلفاز</span>
                        </div>
                      )}
                      {room.features.includes("قهوة") && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Coffee className="h-4 w-4" />
                          <span>قهوة</span>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Link to={`/rooms/${room.id}`} className="w-full">
                      <Button className="w-full shadow-elegant" disabled={room.status === "محجوزة"}>
                        {room.status === "متاحة" ? "عرض التفاصيل" : "غير متاحة"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">لم يتم العثور على غرف مطابقة للفلاتر المحددة</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Rooms;
