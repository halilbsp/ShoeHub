import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingBag, Zap, Award, Truck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md border-b border-border" : "bg-background"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <span className="text-2xl font-bold text-foreground hover:text-accent transition-colors cursor-pointer">
              👟 ShoeHub
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/products">
              <span className="text-sm font-medium hover:text-accent transition-colors cursor-pointer">Ürünler</span>
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link href="/admin">
                    <span className="text-sm font-medium hover:text-accent transition-colors cursor-pointer">Admin</span>
                  </Link>
                )}
                <Link href="/account">
                  <span className="text-sm font-medium hover:text-accent transition-colors cursor-pointer">Hesabım</span>
                </Link>
                <Link href="/cart">
                  <span className="relative cursor-pointer">
                    <ShoppingBag className="w-5 h-5 hover:text-accent transition-colors" />
                  </span>
                </Link>
              </>
            ) : (
              <Button variant="default" size="sm">
                Giriş Yap
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-32">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ayakkabıda Yeni Standart
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Adidas, Nike, Puma, New Balance ve Reebok'un en iyi koleksiyonunu keşfedin. Kalite, konfor ve stil bir arada.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button className="bg-white text-black hover:bg-gray-100">
                  Alışverişe Başla
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Daha Fazla Bilgi
              </Button>
            </div>
          </div>

          <div className="animate-slide-down">
            <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="w-24 h-24 mx-auto text-accent mb-4" />
                <p className="text-gray-400">Premium Ayakkabı Koleksiyonu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Neden Biz?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Markalar", desc: "Dünya çapında tanınmış markalar" },
              { icon: Zap, title: "Hızlı Teslimat", desc: "1-5 iş günü içinde kapınıza" },
              { icon: Truck, title: "Güvenli Kargo", desc: "Sigortalı ve izlenebilir kargo" },
              { icon: ShoppingBag, title: "Kolay İade", desc: "30 gün içinde ücretsiz iade" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Kategoriler</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "🏃", name: "Koşu Ayakkabıları", href: "/products?category=1" },
              { emoji: "🏀", name: "Basketbol Ayakkabıları", href: "/products?category=2" },
              { emoji: "⚽", name: "Futsal Ayakkabıları", href: "/products?category=4" },
            ].map((cat, idx) => (
              <Link key={idx} href={cat.href}>
                <div className="group cursor-pointer">
                  <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className="text-5xl mb-4">{cat.emoji}</div>
                    <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Markalarımız</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["Adidas", "Nike", "Puma", "New Balance", "Reebok"].map((brand, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-lg p-6 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <p className="font-semibold text-gray-700">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Harika Fırsatları Kaçırmayın</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Yeni koleksiyonlar ve özel indirimler için bültenimize abone olun.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <Button className="bg-accent text-black hover:bg-accent/90">Abone Ol</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">ShoeHub</h4>
              <p className="text-sm">Premium ayakkabı alışveriş platformu</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products">
                    <span className="hover:text-white transition-colors cursor-pointer">Ürünler</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <span className="hover:text-white transition-colors cursor-pointer">Hakkımızda</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Müşteri Hizmetleri</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:info@shoehub.com" className="hover:text-white transition-colors">
                    info@shoehub.com
                  </a>
                </li>
                <li>
                  <a href="tel:+905551234567" className="hover:text-white transition-colors">
                    +90 555 123 45 67
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Sosyal Medya</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 ShoeHub. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
