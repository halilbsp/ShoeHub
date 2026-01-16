import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Trash2, ChevronLeft } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  // Fetch cart items
  const { data: cartItems, isLoading } = trpc.cart.getItems.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Mutations
  const updateItemMutation = trpc.cart.updateItem.useMutation({
    onSuccess: () => {
      utils.cart.getItems.invalidate();
    },
  });

  const removeItemMutation = trpc.cart.removeItem.useMutation({
    onSuccess: () => {
      toast.success("Ürün sepetten kaldırıldı");
      utils.cart.getItems.invalidate();
    },
  });

  const clearCartMutation = trpc.cart.clear.useMutation({
    onSuccess: () => {
      toast.success("Sepet temizlendi");
      utils.cart.getItems.invalidate();
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Sepeti görmek için giriş yapmalısınız</p>
        <Button>Giriş Yap</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const items = cartItems || [];
  const MOCK_PRICE = 299.99; // Sabit fiyat
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * MOCK_PRICE), 0);
  const shippingCost = items.length > 0 ? 49.99 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container py-6">
                <Link href="/">
          <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            Alışverişe Devam Et
          </span>
        </Link>
        <h1 className="text-3xl font-bold">Sepetim</h1>
      </div>

      {/* Cart Content */}
      <div className="container pb-12">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Sepetiniz boş</p>
            <Link href="/products">
              <Button>Alışverişe Başla</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-border">
                {items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 p-6 border-b border-border last:border-b-0">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0" />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Ürün Adı</h3>
                      <p className="text-sm text-muted-foreground mb-3">Renk: Siyah | Beden: 42</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateItemMutation.mutate({
                              cartItemId: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateItemMutation.mutate({
                              cartItemId: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right">
                      <p className="font-semibold mb-3">₺{(item.quantity * MOCK_PRICE).toFixed(2)}</p>
                      <button
                        onClick={() => removeItemMutation.mutate(item.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <Button
                variant="outline"
                className="mt-4 text-red-600 hover:text-red-700"
                onClick={() => clearCartMutation.mutate()}
              >
                Sepeti Temizle
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ara Toplam</span>
                    <span>₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Kargo</span>
                    <span>₺{shippingCost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Toplam</span>
                  <span>₺{total.toFixed(2)}</span>
                </div>

              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Ödemeye Geç
                </Button>
              </Link>

                {/* Shipping Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    ✓ Ücretsiz iade<br />
                    ✓ Güvenli ödeme<br />
                    ✓ Hızlı teslimat
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
