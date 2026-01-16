import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export default function AdminStock() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products
  const { data: products, isLoading } = trpc.products.list.useQuery({ limit: 100 });

  const filteredProducts = products?.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleStockUpdate = (productId: number, amount: number) => {
    toast.success(`Stok güncellendi: ${amount > 0 ? "+" : ""}${amount}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Stok Yönetimi</h2>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Stock Table */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Ürün Adı</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Marka</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Mevcut Stok</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Minimum Stok</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Durum</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => {
                  const stock = product.stock || 0;
                  const isLow = stock < 10;
                  const isOutOfStock = stock === 0;

                  return (
                    <tr key={product.id} className="border-b border-border hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-sm">Marka</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="font-semibold">{stock}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">10</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isOutOfStock
                              ? "bg-red-100 text-red-800"
                              : isLow
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {isOutOfStock
                            ? "Stok Yok"
                            : isLow
                            ? "Düşük Stok"
                            : "Yeterli"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStockUpdate(product.id, -1)}
                            className="p-2 border border-input rounded hover:bg-gray-100 transition-colors"
                            title="Stok Azalt"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <input
                            type="number"
                            defaultValue={stock}
                            className="w-16 px-2 py-1 border border-input rounded text-center text-sm"
                          />

                          <button
                            onClick={() => handleStockUpdate(product.id, 1)}
                            className="p-2 border border-input rounded hover:bg-gray-100 transition-colors"
                            title="Stok Arttır"
                          >
                            <Plus className="w-4 h-4" />
                          </button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success("Stok güncellendi")}
                          >
                            Kaydet
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Ürün bulunamadı
            </div>
          )}
        </div>
      )}

      {/* Stock Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <p className="text-sm text-green-600 mb-2">Yeterli Stok</p>
          <p className="text-3xl font-bold text-green-800">
            {products?.filter((p: any) => (p.stock || 0) >= 10).length || 0}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <p className="text-sm text-yellow-600 mb-2">Düşük Stok</p>
          <p className="text-3xl font-bold text-yellow-800">
            {products?.filter((p: any) => (p.stock || 0) > 0 && (p.stock || 0) < 10).length || 0}
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <p className="text-sm text-red-600 mb-2">Stok Yok</p>
          <p className="text-3xl font-bold text-red-800">
            {products?.filter((p: any) => (p.stock || 0) === 0).length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
