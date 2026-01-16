import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { BarChart3, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminStock from "./AdminStock";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch orders
  const { data: orders } = trpc.orders.getAllOrders.useQuery({
    limit: 10,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Bu sayfaya erişim yetkiniz yok</p>
          <Link href="/">
            <a>
              <Button>Ana Sayfaya Dön</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-border p-6">
        <h1 className="text-2xl font-bold mb-8">👟 Admin Panel</h1>

        <nav className="space-y-2 mb-8">
            {[
              { id: "overview", label: "Genel Bakış", icon: BarChart3 },
              { id: "products", label: "Ürün Yönetimi", icon: Package },
              { id: "orders", label: "Stok Yönetimi", icon: ShoppingCart },
              { id: "settings", label: "Ayarlar", icon: Settings },
            ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-100 text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border pt-6">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Hoş geldiniz</p>
            <p className="font-semibold">{user?.name}</p>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Genel Bakış</h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Toplam Siparişler", value: orders?.length || 0, color: "bg-blue-100" },
                { label: "Hazırlanıyor", value: orders?.filter((o: any) => o.status === "preparing").length || 0, color: "bg-yellow-100" },
                { label: "Kargoda", value: orders?.filter((o: any) => o.status === "shipped").length || 0, color: "bg-purple-100" },
                { label: "Teslim Edildi", value: orders?.filter((o: any) => o.status === "delivered").length || 0, color: "bg-green-100" },
              ].map((stat, idx) => (
                <div key={idx} className={`${stat.color} rounded-lg p-6`}>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">Son Siparişler</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Sipariş No</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Müşteri</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Tutar</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Durum</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.slice(0, 5).map((order: any) => (
                      <tr key={order.id} className="border-b border-border hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{order.orderNumber}</td>
                        <td className="px-6 py-4 text-sm">Müşteri Adı</td>
                        <td className="px-6 py-4 text-sm font-semibold">₺{order.totalAmount}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "preparing"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "shipped"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status === "preparing"
                              ? "Hazırlanıyor"
                              : order.status === "shipped"
                              ? "Kargoda"
                              : "Teslim Edildi"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Button variant="outline" size="sm">
                            Detay
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && <AdminProducts />}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Stok Yönetimi</h2>
            <AdminStock />
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Ayarlar</h2>
            <div className="bg-white rounded-lg border border-border p-6 text-center text-muted-foreground">
              Ayarlar sayfası (yakında)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
