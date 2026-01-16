# Ayakkabı E-Ticaret Platformu - TODO

## Veritabanı ve Şema
- [x] Marka tablosu oluştur (Adidas, Nike, Puma, New Balance, Reebok)
- [x] Kategori tablosu oluştur
- [x] Ürün tablosu oluştur (fiyat, açıklama, stok)
- [x] Ürün görselleri tablosu oluştur (her ürün için 2+ resim)
- [x] Renk ve beden seçenekleri tablosu
- [x] Stok yönetimi tablosu
- [x] Sipariş tablosu
- [x] Sipariş detayları tablosu
- [x] Kargo seçenekleri tablosu
- [x] Ödeme bilgileri tablosu

## Kimlik Doğrulama ve Yetkilendirme
- [x] Admin/müşteri rol ayrımı kontrol et
- [x] Admin paneli erişim kontrolü
- [x] Müşteri paneli erişim kontrolü

## Admin Paneli
- [ ] Ürün yönetimi (ekleme, düzenleme, silme)
- [ ] Marka yönetimi
- [ ] Kategori yönetimi
- [ ] Stok yönetimi ve güncelleme
- [ ] Sipariş takibi ve durumu güncelleme
- [ ] Kargo seçenekleri yönetimi
- [x] Admin dashboard (temel)

## Müşteri Arayüzü - Ürün Kataloğu
- [x] Ana sayfa tasarımı
- [x] Ürün listeleme sayfası
- [x] Marka filtreleme
- [x] Kategori filtreleme
- [x] Fiyat aralığı filtreleme
- [ ] Renk filtreleme
- [x] Arama işlevi
- [ ] Ürün sıralama (fiyat, yeni, popüler)

## Müşteri Arayüzü - Ürün Detayı
- [x] Ürün detay sayfası
- [x] Birden fazla ürün görseli (galeri)
- [x] Renk seçimi
- [x] Beden seçimi
- [x] Stok durumu gösterimi
- [x] Ürün açıklaması
- [ ] İlgili ürünler önerisi

## Sepet Yönetimi
- [x] Sepete ürün ekleme
- [x] Sepetten ürün çıkarma
- [x] Miktar güncelleme
- [x] Sepet toplamı hesaplama
- [x] Sepet state yönetimi
- [x] Sepet sayfası

## Checkout ve Ödeme
- [x] Teslimat adresi formu
- [x] Kargo seçenekleri ve ücret hesaplama
- [x] Ödeme yöntemi seçimi (Stripe, banka kartı, kapıda ödeme)
- [ ] Stripe test modu entegrasyonu
- [ ] Kredi kartı ödeme işlemi
- [ ] Banka kartı ödeme işlemi
- [ ] Kapıda ödeme seçeneği
- [x] Sipariş özeti

## Sipariş Yönetimi
- [ ] Sipariş oluşturma
- [ ] Sipariş numarası oluşturma
- [ ] Sipariş durumu (hazırlanıyor, kargoda, teslim edildi)
- [ ] Sipariş geçmişi
- [ ] Sipariş takibi
- [ ] Müşteri sipariş detayı sayfası

## Bildirimler ve E-posta
- [ ] Yeni sipariş bildirimi (admin)
- [ ] Sipariş durumu güncelleme bildirimi (müşteri)
- [ ] Otomatik e-posta gönderimi
- [ ] Uygulama içi bildirim sistemi

## Görsel Oluşturma ve Depolama
- [ ] Ürün açıklamalarından banner tasarımı oluşturma (LLM)
- [ ] S3 depolama entegrasyonu
- [ ] Ürün görselleri S3'e yükleme
- [ ] Katalog ve fatura belgeleri S3'e yükleme

## Tasarım ve UI
- [ ] Zarif ve mükemmel stil tasarımı
- [ ] Responsive tasarım
- [ ] Kolay navigasyon
- [ ] Görsel açıdan çekici ürün kartları
- [ ] Smooth animasyonlar
- [ ] Dark/Light tema desteği

## Test ve Optimizasyon
- [ ] Vitest birim testleri
- [ ] Admin işlevleri test
- [ ] Müşteri işlevleri test
- [ ] Ödeme akışı test
- [ ] Performans optimizasyonu
- [ ] Responsive test

## Yayınlama
- [ ] Checkpoint oluştur
- [ ] Yayınla


## Hata Düzeltmeleri ve İyileştirmeler
- [x] Ürün görselleri ekle (placeholder'ları gerçek görsellere dönüştür)
- [x] "Ayakkabı Koleksiyonu" başlığını sticky yap
- [x] Admin panelinde ürün ekleme formu oluştur
- [x] Admin panelinde stok yönetimi arayüzü oluştur
- [ ] Stripe test modu entegrasyonu tamamla (API anahtarları bekleniyor)
- [x] Müşteri girişi özelliklerini detaylandır
- [x] Sepet yönetimi özelliklerini detaylandır
- [ ] Ödeme akışı testini tamamla


## Hata Düzeltmeleri - Ürün Yönetimi
- [x] Ürün fiyatlarının sepete eklenince değişmesini düzült
- [x] Ürün detay sayfasında renk seçeneğini kaldır
- [x] Bedenleri kadın/erkek olarak ikiye ayır
- [x] Ürün resimlerini farklılaştır
