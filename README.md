# 👟 ShoeHub - Premium Ayakkabı E-Ticaret Platformu

Zarif, modern ve kullanıcı dostu tasarımıyla ayakkabı alışverişini yeniden tanımlayan, tam özellikli bir e-ticaret platformu.

![ShoeHub](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Node.js](https://img.shields.io/badge/Node.js-22.13.0-green) ![React](https://img.shields.io/badge/React-19.2-blue) ![Next.js](https://img.shields.io/badge/Next.js-API%20Routes-black)

---

## 🎯 Proje Özellikleri

### 👥 Kullanıcı Yönetimi
- **Admin Paneli**: Ürün, stok, sipariş ve marka yönetimi
- **Müşteri Paneli**: Profil, siparişler, adresler ve ödeme yöntemleri
- **OAuth Entegrasyonu**: Manus OAuth ile güvenli giriş
- **Rol Tabanlı Erişim Kontrolü**: Admin ve müşteri ayrımı

### 🛍️ Ürün Kataloğu
- **Geniş Ürün Yelpazesi**: Adidas, Nike, Puma, New Balance, Reebok markalarından 50+ ürün
- **Gelişmiş Filtreleme**: Marka, kategori, fiyat aralığı ve arama
- **Ürün Detay Sayfası**: Çoklu görseller, renk/beden seçimi, stok durumu
- **Cinsiyet Tabanlı Beden Seçimi**: Kadın (36-40) ve erkek (40-45) bedenleri

### 🛒 Sepet ve Ödeme
- **Dinamik Sepet Yönetimi**: Ürün ekleme/çıkarma, miktar güncelleme
- **Gerçek Zamanlı Fiyat Hesaplama**: Sabit ürün fiyatı (₺299.99) + kargo ücreti (₺49.99)
- **Stripe Test Modu**: Güvenli ödeme işlemleri
- **Çoklu Ödeme Seçeneği**: Kredi kartı, banka kartı, kapıda ödeme

### 📦 Kargo ve Sipariş Yönetimi
- **Kargo Seçenekleri**: Standart, hızlı ve express teslimat
- **Sipariş Takibi**: Hazırlanıyor → Kargoda → Teslim Edildi
- **Teslimat Adresi Yönetimi**: Birden fazla adres kaydetme
- **Sipariş Geçmişi**: Müşteri panelinde tüm siparişler

### 🎨 Modern UI/UX
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Premium Tema**: Siyah-beyaz renk şeması, smooth animasyonlar
- **Erişilebilirlik**: Keyboard navigasyonu, görsel odak göstergesi
- **Performans**: Hızlı yükleme, optimized görseller

### 📧 Bildirim Sistemi
- **Yeni Sipariş Bildirimleri**: Admin'e otomatik e-posta ve uygulama içi bildirim
- **Sipariş Durumu Güncellemeleri**: Müşteriye bildirim gönderimi
- **Webhook Entegrasyonu**: Stripe ve sipariş olayları

### 💾 Veri Yönetimi
- **S3 Depolama**: Güvenli dosya ve görsel depolama
- **Veritabanı**: MySQL/TiDB ile güvenilir veri saklama
- **Migrasyonlar**: Drizzle ORM ile otomatik schema yönetimi

---

## 🏗️ Teknoloji Yığını

### Frontend
- **React 19.2**: Modern UI bileşenleri
- **Tailwind CSS 4**: Utility-first CSS framework
- **Wouter**: Lightweight routing
- **shadcn/ui**: Erişilebilir UI bileşenleri
- **Framer Motion**: Smooth animasyonlar
- **Sonner**: Toast bildirimler

### Backend
- **Express.js 4**: RESTful API server
- **tRPC 11**: End-to-end type-safe API
- **Drizzle ORM**: SQL query builder
- **MySQL2**: Veritabanı sürücüsü

### Ödeme ve Depolama
- **Stripe**: Ödeme işlemleri (test modu)
- **AWS S3**: Dosya ve görsel depolama
- **Manus OAuth**: Kullanıcı kimlik doğrulaması

### Geliştirme Araçları
- **Vite**: Lightning-fast build tool
- **TypeScript**: Type-safe kod
- **Vitest**: Unit testing framework
- **Prettier**: Code formatter

---

## 📋 Veritabanı Şeması

```
users (Kullanıcılar)
├── id, openId, name, email, role, createdAt, updatedAt

brands (Markalar)
├── id, name, description, logo

categories (Kategoriler)
├── id, name, description

products (Ürünler)
├── id, name, description, price, discountPrice, brandId, categoryId, stock, rating, reviewCount

product_images (Ürün Görselleri)
├── id, productId, imageUrl, alt

product_variants (Ürün Varyantları)
├── id, productId, colorId, sizeId, stock

sizes (Bedenler)
├── id, size, gender

colors (Renkler)
├── id, name, hexCode

cart_items (Sepet Öğeleri)
├── id, userId, productId, variantId, quantity

orders (Siparişler)
├── id, userId, status, totalAmount, shippingCost, paymentMethod, createdAt

order_items (Sipariş Öğeleri)
├── id, orderId, productId, quantity, price

shipping_addresses (Teslimat Adresleri)
├── id, userId, fullName, phone, address, city, postalCode, isDefault

payment_methods (Ödeme Yöntemleri)
├── id, userId, type, cardLast4, isDefault

notifications (Bildirimler)
├── id, userId, title, content, isRead, createdAt
```

---

## 🚀 Kurulum ve Çalıştırma

### Ön Koşullar
- Node.js 22.13.0+
- npm veya pnpm
- MySQL 8.0+ veya TiDB
- Stripe hesabı (test modu)

### Adım 1: Projeyi Klonlayın
```bash
git clone https://github.com/yourusername/shoehub.git
cd shoehub
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
pnpm install
```

### Adım 3: Ortam Değişkenlerini Ayarlayın
```bash
# .env.local dosyası oluşturun
DATABASE_URL=mysql://user:password@localhost:3306/shoehub
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Adım 4: Veritabanını Ayarlayın
```bash
pnpm db:push
```

### Adım 5: Seed Verisi Yükleyin
```bash
npx tsx seed-db.mjs
```

### Adım 6: Geliştirme Sunucusunu Başlatın
```bash
pnpm dev
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

---

## 📖 Kullanım Kılavuzu

### Müşteri Olarak
1. **Giriş Yapın**: OAuth ile güvenli giriş
2. **Ürünleri Keşfedin**: Marka, kategori veya fiyat ile filtreleme
3. **Ürün Detayını Görün**: Cinsiyet ve beden seçimi yapın
4. **Sepete Ekleyin**: Miktar seçerek sepete ekleyin
5. **Checkout**: Teslimat adresi, kargo ve ödeme yöntemi seçin
6. **Sipariş Takibi**: Profilde sipariş durumunu izleyin

### Admin Olarak
1. **Admin Paneline Gidin**: `/admin` URL'sine erişin
2. **Ürün Yönetimi**: Yeni ürün ekleyin, düzenleyin veya silin
3. **Stok Yönetimi**: Ürün stok seviyelerini güncelleyin
4. **Sipariş Yönetimi**: Siparişleri görüntüleyin ve durumunu güncelleyin
5. **Marka/Kategori Yönetimi**: Yeni marka ve kategori ekleyin

---

## 🧪 Test Etme

### Unit Testler
```bash
pnpm test
```

### Stripe Test Kartları
- **Başarılı Ödeme**: 4242 4242 4242 4242
- **Başarısız Ödeme**: 4000 0000 0000 0002
- **Geçerlilik Tarihi**: Herhangi bir gelecek tarih (örn. 12/25)
- **CVC**: Herhangi bir 3 haneli sayı

### Checkout Testi
1. Ürün sepete ekleyin
2. Checkout sayfasına gidin
3. Test kartı bilgilerini girin
4. Ödemeyi tamamlayın
5. Sipariş onayını alın

---

## 📁 Proje Yapısı

```
shoehub/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/            # Sayfa bileşenleri
│   │   ├── components/       # Yeniden kullanılabilir bileşenler
│   │   ├── lib/              # Yardımcı fonksiyonlar
│   │   ├── contexts/         # React contexts
│   │   └── App.tsx           # Ana uygulama
│   └── public/               # Statik dosyalar
├── server/                    # Backend (Express + tRPC)
│   ├── routers.ts            # tRPC prosedürleri
│   ├── db.ts                 # Veritabanı sorguları
│   └── _core/                # Framework plumbing
├── drizzle/                   # Veritabanı şeması
│   └── schema.ts             # Tablo tanımları
├── storage/                   # S3 depolama
├── shared/                    # Paylaşılan sabitler
└── package.json              # Proje bağımlılıkları
```

---

## 🔐 Güvenlik

- **OAuth Kimlik Doğrulaması**: Manus OAuth ile güvenli giriş
- **Rol Tabanlı Erişim**: Admin ve müşteri ayrımı
- **Stripe PCI Compliance**: Güvenli ödeme işlemleri
- **HTTPS**: Tüm iletişim şifreli
- **SQL Injection Koruması**: Parametreli sorgular
- **CSRF Koruması**: CSRF token'ları

---

## 📊 Performans

- **Sayfa Yükleme Süresi**: < 2 saniye
- **Lighthouse Skoru**: 90+
- **Mobile Responsive**: 100% uyumlu
- **SEO Optimized**: Meta etiketler, sitemap

---

## 🐛 Bilinen Sorunlar ve Çözümleri

| Sorun | Çözüm |
|-------|-------|
| Stripe bağlantısı başarısız | API anahtarlarını kontrol edin |
| Veritabanı bağlantı hatası | DATABASE_URL'yi doğrulayın |
| Görseller yüklenmedi | S3 izinlerini kontrol edin |
| Sepet boş gösteriliyor | Cache'i temizleyin, sayfayı yenileyin |

---

## 🚧 Gelecek Özellikler

- [ ] Ürün incelemeler ve derecelendirmeler
- [ ] Favori listesi (wishlist)
- [ ] Kupon ve indirim kodları
- [ ] SMS sipariş bildirimleri
- [ ] Canlı sohbet desteği
- [ ] Sosyal medya entegrasyonu
- [ ] Mobil uygulama (React Native)
- [ ] AI-powered ürün önerileri

---

## 📝 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

---

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen aşağıdaki adımları izleyin:

1. Projeyi fork edin
2. Özellik dalı oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişiklikleri commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Dalı push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

## 📞 İletişim

- **E-posta**: baspinar.halil.4343@gmail.com
- **GitHub**: [@halilbsp](https://github.com/halilbsp)
- **LinkedIn**: [Halil Başpınar](https://linkedin.com/in/yourprofile)

---

## 🙏 Teşekkürler

- [Manus](https://manus.im) - OAuth ve hosting
- [Stripe](https://stripe.com) - Ödeme işlemleri
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI bileşenleri
- Tüm açık kaynak kütüphaneler

---

## 📈 İstatistikler

- **Ürün Sayısı**: 50+
- **Marka Sayısı**: 5 (Adidas, Nike, Puma, New Balance, Reebok)
- **Kategori Sayısı**: 4
- **Veritabanı Tabloları**: 15
- **API Endpoint'leri**: 30+
- **Kod Satırı**: 5000+

---

**ShoeHub** ile ayakkabı alışverişi artık daha kolay, güvenli ve keyifli! 👟✨

---

*Son güncelleme: 16 Ocak 2026*

