import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [shippingData, setShippingData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Türkiye",
  });
  const [selectedShipping, setSelectedShipping] = useState<number>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("credit_card");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Fetch shipping and payment options
  const { data: shippingOptions } = trpc.shipping.getOptions.useQuery();
  const { data: paymentMethods } = trpc.payment.getMethods.useQuery();

  // Get cart items
  const { data: cartItems } = trpc.cart.getItems.useQuery();

  const subtotal = cartItems?.reduce((sum, item) => sum + (item.quantity * 100), 0) || 0;
  const shippingCost = shippingOptions?.find((s: any) => s.id === selectedShipping)?.basePrice || 0;
  const total = subtotal + Number(shippingCost);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (step === 1) {
      // Validate shipping data
      if (
        !shippingData.fullName ||
        !shippingData.phone ||
        !shippingData.address ||
        !shippingData.city ||
        !shippingData.postalCode
      ) {
        toast.error("Lütfen tüm alanları doldurunuz");
        return;
      }
      setStep(2);
    } else {
      // Validate payment data
      if (selectedPayment === "credit_card") {
        if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
          toast.error("Lütfen kart bilgilerini doldurunuz");
          return;
        }
      }

      // Simulate order creation
      toast.success("Sipariş oluşturuldu!");
      // In real app, call mutation to create order
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container py-6">
        <Link href="/cart">
          <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
            Sepete Dön
          </span>
        </Link>
        <h1 className="text-3xl font-bold">Ödeme</h1>
      </div>

      {/* Checkout Content */}
      <div className="container pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex gap-4 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s}
                  </div>
                  <span className="text-sm font-medium">
                    {s === 1 ? "Teslimat" : "Ödeme"}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">Teslimat Adresi</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingData.fullName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="+90 555 123 45 67"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Adres</label>
                    <textarea
                      name="address"
                      value={shippingData.address}
                      onChange={(e) => setShippingData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Sokak, Mahalle, Bina No..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Şehir</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="İstanbul"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Posta Kodu</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingData.postalCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="34000"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold mb-4">Kargo Seçimi</h3>
                  <div className="space-y-3">
                    {shippingOptions?.map((option: any) => (
                      <label key={option.id} className="flex items-center gap-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={(e) => setSelectedShipping(parseInt(e.target.value))}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <p className="font-semibold">₺{option.basePrice}</p>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">Ödeme Yöntemi</h2>

                <div className="space-y-4 mb-8">
                  {paymentMethods?.map((method: any) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.type}
                        checked={selectedPayment === method.type}
                        onChange={(e: any) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>

                {/* Credit Card Form */}
                {selectedPayment === "credit_card" && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Kart Bilgileri</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Kart Numarası</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                          maxLength={19}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Kart Sahibinin Adı</label>
                        <input
                          type="text"
                          name="cardName"
                          value={cardData.cardName}
                          onChange={handleCardChange}
                          placeholder="Ad Soyad"
                          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Son Kullanma Tarihi</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={cardData.expiryDate}
                            onChange={handleCardChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                            maxLength={5}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-6">Sipariş Özeti</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {cartItems?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Ürün x{item.quantity}
                    </span>
                    <span>₺{(item.quantity * 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ara Toplam</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kargo</span>
                  <span>₺{Number(shippingCost).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Toplam</span>
                <span>₺{total.toFixed(2)}</span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
              >
                {step === 1 ? "Ödemeye Geç" : "Siparişi Tamamla"}
              </Button>

              {step === 2 && (
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setStep(1)}
                >
                  Geri Dön
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
