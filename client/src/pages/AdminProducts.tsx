import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    brandId: "",
    categoryId: "",
    stock: "",
  });

  // Fetch data
  const { data: products, isLoading } = trpc.products.list.useQuery({ limit: 100 });
  const { data: brands } = trpc.products.getBrands.useQuery();
  const { data: categories } = trpc.products.getCategories.useQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.brandId || !formData.categoryId) {
      toast.error("Lütfen zorunlu alanları doldurunuz");
      return;
    }

    toast.success(editingId ? "Ürün güncellendi" : "Ürün eklendi");
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      brandId: "",
      categoryId: "",
      stock: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Ürün Yönetimi</h2>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({
              name: "",
              description: "",
              price: "",
              discountPrice: "",
              brandId: "",
              categoryId: "",
              stock: "",
            });
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Ürün Ekle
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-border p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ürün Adı */}
              <div>
                <label className="block text-sm font-medium mb-2">Ürün Adı *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ürün adı"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Marka */}
              <div>
                <label className="block text-sm font-medium mb-2">Marka *</label>
                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Marka Seçin</option>
                  {brands?.map((brand: any) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium mb-2">Kategori *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Kategori Seçin</option>
                  {categories?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fiyat */}
              <div>
                <label className="block text-sm font-medium mb-2">Fiyat (₺) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* İndirimli Fiyat */}
              <div>
                <label className="block text-sm font-medium mb-2">İndirimli Fiyat (₺)</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Stok */}
              <div>
                <label className="block text-sm font-medium mb-2">Stok Miktarı</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Açıklama */}
            <div>
              <label className="block text-sm font-medium mb-2">Ürün Açıklaması</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ürün açıklaması"
                rows={4}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                İptal
              </Button>
              <Button type="submit">
                {editingId ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
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
                  <th className="px-6 py-3 text-left text-sm font-semibold">Kategori</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Fiyat</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Stok</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {products?.slice(0, 10).map((product: any) => (
                  <tr key={product.id} className="border-b border-border hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm">Marka</td>
                    <td className="px-6 py-4 text-sm">Kategori</td>
                    <td className="px-6 py-4 text-sm">₺{product.price}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
