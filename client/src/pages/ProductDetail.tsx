import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, ChevronLeft, ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id ? Number(params.id) : 0;

  const [selectedGender, setSelectedGender] = useState<"kadın" | "erkek">("kadın");
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product
  const { data: product, isLoading } = trpc.products.getById.useQuery(productId, {
    enabled: productId > 0,
  });

  // Cart mutation
  const addToCartMutation = trpc.cart.addItem.useMutation({
    onSuccess: () => {
      toast.success("Ürün sepete eklendi!");
    },
    onError: (error) => {
      toast.error(error.message || "Hata oluştu");
    },
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Lütfen beden seçiniz");
      return;
    }

    addToCartMutation.mutate({
      productId,
      variantId: 1,
      quantity,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Ürün bulunamadı</p>
        <Link href="/products">
          <span className="cursor-pointer">
            <Button>Ürünlere Dön</Button>
          </span>
        </Link>
      </div>
    );
  }

  const kadınBedenler = ["36", "37", "38", "39", "40"];
  const erkekBedenler = ["40", "41", "42", "43", "44", "45"];
  const mevcutBedenler = selectedGender === "kadın" ? kadınBedenler : erkekBedenler;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container py-6">
        <Link href="/products">
          <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            Ürünlere Dön
          </span>
        </Link>
      </div>

      {/* Product Detail */}
      <div className="container pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-4 overflow-hidden">
              <img
                src={`/products/shoe${(product.id % 6) + 1}.jpg`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((idx: number) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-accent transition-all overflow-hidden"
                >
                  <img
                    src={`/products/shoe${((product.id + idx) % 6) + 1}.jpg`}
                    alt={`${product.name} - Görsel ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Marka</p>
                  <h1 className="text-4xl font-bold">{product.name}</h1>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full border-2 transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-300 text-red-600"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <Heart
                    className="w-6 h-6"
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.round(Number(product.rating))
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} yorum)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                {product.discountPrice ? (
                  <>
                    <span className="text-4xl font-bold text-accent">
                      ₺{product.discountPrice}
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      ₺{product.price}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(
                        ((Number(product.price) - Number(product.discountPrice)) /
                          Number(product.price)) *
                          100
                      )}
                      % İndirim
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">₺{product.price}</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8 pb-8 border-b border-border">
                  <h3 className="font-semibold mb-3">Ürün Açıklaması</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>

            {/* Selections */}
            <div className="space-y-6 mb-8">
              {/* Gender Selection */}
              <div>
                <h3 className="font-semibold mb-3">Cinsiyet</h3>
                <div className="flex gap-3">
                  {["kadın", "erkek"].map((gender: any) => (
                    <button
                      key={gender}
                      onClick={() => {
                        setSelectedGender(gender);
                        setSelectedSize(undefined);
                      }}
                      className={`px-6 py-2 rounded-lg border-2 transition-all font-medium ${
                        selectedGender === gender
                          ? "border-accent bg-accent text-white"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Beden Seçimi</h3>
                <div className="grid grid-cols-5 gap-2">
                  {mevcutBedenler.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "border-accent bg-accent text-white"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <h3 className="font-semibold mb-3">Miktar</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              className="w-full py-6 text-lg font-semibold flex items-center justify-center gap-2"
            >
              {addToCartMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Ekleniyor...
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Sepete Ekle
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
