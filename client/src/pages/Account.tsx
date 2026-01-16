import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft, LogOut, Heart, Package, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Hesabınıza erişmek için giriş yapmalısınız</p>
        <Button>Giriş Yap</Button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    toast.success("Çıkış yapıldı");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container py-6">
        <Link href="/">
          <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </span>
        </Link>
        <h1 className="text-3xl font-bold">Hesabım</h1>
      </div>

      {/* Content */}
      <div className="container pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6">
              {/* User Info */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-3" />
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profil Bilgileri", icon: MapPin },
                  { id: "orders", label: "Siparişlerim", icon: Package },
                  { id: "wishlist", label: "İstek Listesi", icon: Heart },
                  { id: "addresses", label: "Adreslerim", icon: MapPin },
                  { id: "payments", label: "Ödeme Yöntemleri", icon: CreditCard },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === item.id
                        ? "bg-black text-white"
                        : "hover:bg-gray-100 text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış Yap
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">Profil Bilgileri</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">E-posta</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="+90 555 123 45 67"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <Button
                    onClick={() => toast.success("Profil güncellendi")}
                    className="mt-6"
                  >
                    Değişiklikleri Kaydet
                  </Button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">Siparişlerim</h2>

                <div className="space-y-4">
                  {[
                    {
                      id: "ORD-001",
                      date: "16 Ocak 2026",
                      amount: "₺599.99",
                      status: "Teslim Edildi",
                    },
                    {
                      id: "ORD-002",
                      date: "15 Ocak 2026",
                      amount: "₺399.99",
                      status: "Kargoda",
                    },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.amount}</p>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            order.status === "Teslim Edildi"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">İstek Listesi</h2>
                <p className="text-muted-foreground">İstek listeniz boş</p>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Adreslerim</h2>
                  <Button>Yeni Adres Ekle</Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      name: "Ev",
                      address: "Sokak Adı, Mahalle, İstanbul",
                      isDefault: true,
                    },
                  ].map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold">{addr.name}</p>
                        {addr.isDefault && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Varsayılan
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{addr.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Ödeme Yöntemleri</h2>
                  <Button>Yeni Kart Ekle</Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      brand: "Visa",
                      last4: "4242",
                      expiry: "12/26",
                      isDefault: true,
                    },
                  ].map((card) => (
                    <div
                      key={card.id}
                      className="p-4 border border-border rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{card.brand} •••• {card.last4}</p>
                        <p className="text-sm text-muted-foreground">Son Kullanma: {card.expiry}</p>
                      </div>
                      {card.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Varsayılan
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
