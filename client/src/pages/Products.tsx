import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Search, Filter } from "lucide-react";

export default function Products() {
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data
  const { data: products, isLoading: productsLoading } = trpc.products.list.useQuery({
    brandId: selectedBrand,
    categoryId: selectedCategory,
    search: searchTerm,
    minPrice,
    maxPrice,
    limit: 50,
  });

  const { data: brands } = trpc.products.getBrands.useQuery();
  const { data: categories } = trpc.products.getCategories.useQuery();

  const filteredProducts = useMemo(() => {
    return products || [];
  }, [products]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="container py-4">
          <h1 className="text-2xl font-bold mb-4">Ayakkabı Koleksiyonu</h1>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ayakkabı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtreler
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 border-b border-border">
          <div className="container py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Brand Filter */}
              <div>
                <h3 className="font-semibold mb-3">Markalar</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!selectedBrand}
                      onChange={() => setSelectedBrand(undefined)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Tümü</span>
                  </label>
                  {brands?.map((brand) => (
                    <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedBrand === brand.id}
                        onChange={() => setSelectedBrand(brand.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{brand.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Kategoriler</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory(undefined)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Tümü</span>
                  </label>
                  {categories?.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold mb-3">Fiyat Aralığı</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Min. Fiyat</label>
                    <input
                      type="number"
                      value={minPrice || ""}
                      onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-input rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Max. Fiyat</label>
                    <input
                      type="number"
                      value={maxPrice || ""}
                      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="10000"
                      className="w-full px-3 py-2 border border-input rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedBrand(undefined);
                    setSelectedCategory(undefined);
                    setMinPrice(undefined);
                    setMaxPrice(undefined);
                    setSearchTerm("");
                  }}
                >
                  Filtreleri Sıfırla
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="container py-12">
        {productsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ürün bulunamadı</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="product-card overflow-hidden">
                    {/* Product Image */}                    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden group relative">
                      <img
                        src={`/products/shoe${((product.id - 1) % 6) + 1}.jpg`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>                   {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">Kategori</p>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.round(Number(product.rating))
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        {product.discountPrice ? (
                          <>
                            <span className="text-lg font-bold text-accent">
                              ₺{product.discountPrice}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₺{product.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">₺{product.price}</span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button className="w-full" size="sm">
                        Sepete Ekle
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
