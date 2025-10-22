import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Coffee, Wifi, CreditCard } from "lucide-react";

const groceryItems = [
  { id: 1, name: "ماء معدني", price: 5, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80" },
  { id: 2, name: "عصير طبيعي", price: 15, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80" },
  { id: 3, name: "شوكولاتة", price: 20, image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80" },
  { id: 4, name: "بسكويت", price: 10, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80" },
];

const qatItems = [
  { id: 1, name: "قات يمني ممتاز", price: 150, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
  { id: 2, name: "قات درجة أولى", price: 120, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80" },
];

const shishaItems = [
  { id: 1, name: "شيشة تفاح", price: 50, image: "https://images.unsplash.com/photo-1599485146935-ee8eb35e6ad5?w=400&q=80" },
  { id: 2, name: "شيشة نعناع", price: 50, image: "https://images.unsplash.com/photo-1599485146935-ee8eb35e6ad5?w=400&q=80" },
  { id: 3, name: "شيشة توت", price: 55, image: "https://images.unsplash.com/photo-1599485146935-ee8eb35e6ad5?w=400&q=80" },
];

const networkCards = [
  { id: 1, name: "كرت 50 جيجا", price: 50, image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80" },
  { id: 2, name: "كرت 100 جيجا", price: 90, image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80" },
  { id: 3, name: "كرت مفتوح 24 ساعة", price: 40, image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80" },
];

const ServiceCard = ({ item }: { item: any }) => (
  <Card className="overflow-hidden hover-lift card-gradient border-2">
    <div className="h-48 overflow-hidden">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
    </div>
    <CardHeader>
      <CardTitle>{item.name}</CardTitle>
      <CardDescription className="text-2xl font-bold text-primary">{item.price} ريال</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button className="w-full shadow-elegant">اطلب الآن</Button>
    </CardFooter>
  </Card>
);

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-20 px-4">
          <div className="container mx-auto text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold">خدماتنا المتميزة</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اطلب ما تحتاجه من خدمات متنوعة بكل سهولة
            </p>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="grocery" className="w-full" dir="rtl">
              <TabsList className="grid w-full grid-cols-4 mb-8 h-auto">
                <TabsTrigger value="grocery" className="gap-2 py-3">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden sm:inline">البقالة</span>
                </TabsTrigger>
                <TabsTrigger value="qat" className="gap-2 py-3">
                  <Coffee className="h-5 w-5" />
                  <span className="hidden sm:inline">القات والشيشة</span>
                </TabsTrigger>
                <TabsTrigger value="shisha" className="gap-2 py-3">
                  <Coffee className="h-5 w-5" />
                  <span className="hidden sm:inline">الشيشة</span>
                </TabsTrigger>
                <TabsTrigger value="network" className="gap-2 py-3">
                  <Wifi className="h-5 w-5" />
                  <span className="hidden sm:inline">كروت الشبكة</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grocery" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {groceryItems.map((item, index) => (
                    <div key={item.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <ServiceCard item={item} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="qat" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {qatItems.map((item, index) => (
                    <div key={item.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <ServiceCard item={item} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shisha" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {shishaItems.map((item, index) => (
                    <div key={item.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <ServiceCard item={item} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="network" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {networkCards.map((item, index) => (
                    <div key={item.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <ServiceCard item={item} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
