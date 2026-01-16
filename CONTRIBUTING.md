# 🤝 Katkıda Bulunma Kılavuzu

ShoeHub projesine katkıda bulunmak için teşekkürler! Bu belge, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 📋 İçindekiler

1. [Davranış Kuralları](#davranış-kuralları)
2. [Başlamadan Önce](#başlamadan-önce)
3. [Geliştirme Kurulumu](#geliştirme-kurulumu)
4. [Değişiklik Yapma](#değişiklik-yapma)
5. [Pull Request Gönderme](#pull-request-gönderme)
6. [Stil Rehberi](#stil-rehberi)
7. [Commit Mesajları](#commit-mesajları)

## 📜 Davranış Kuralları

Bu proje ve katılımcıları, [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md) tarafından yönetilir. Katılımcı olarak, bu kodun uyulmasını bekliyoruz.

## 🚀 Başlamadan Önce

1. **GitHub Hesabı**: Henüz yoksa bir GitHub hesabı oluşturun
2. **Git Bilgisi**: Temel Git komutlarını bilin
3. **Proje Bilgisi**: README.md dosyasını okuyun
4. **Issue Kontrol**: Benzer issue'lar olup olmadığını kontrol edin

## 💻 Geliştirme Kurulumu

### 1. Projeyi Fork Edin
```bash
# GitHub web arayüzünde "Fork" düğmesine tıklayın
```

### 2. Klonlayın
```bash
git clone https://github.com/yourusername/shoehub.git
cd shoehub
```

### 3. Upstream Ekleyin
```bash
git remote add upstream https://github.com/original-owner/shoehub.git
```

### 4. Bağımlılıkları Yükleyin
```bash
pnpm install
```

### 5. Ortam Değişkenlerini Ayarlayın
```bash
cp .env.example .env.local
# .env.local dosyasını düzenleyin
```

### 6. Veritabanını Ayarlayın
```bash
pnpm db:push
npx tsx seed-db.mjs
```

### 7. Geliştirme Sunucusunu Başlatın
```bash
pnpm dev
```

## 🔧 Değişiklik Yapma

### 1. Yeni Branch Oluşturun
```bash
git checkout -b feature/AmazingFeature
# veya
git checkout -b fix/BugFix
# veya
git checkout -b docs/UpdateDocumentation
```

### 2. Değişiklikleri Yapın
```bash
# Kodunuzu yazın
# Testleri çalıştırın
pnpm test

# Kodu formatla
pnpm format

# TypeScript hatalarını kontrol et
pnpm check
```

### 3. Değişiklikleri Commit Edin
```bash
git add .
git commit -m "feat: Add amazing feature"
```

### 4. Upstream ile Senkronize Edin
```bash
git fetch upstream
git rebase upstream/main
```

### 5. Push Edin
```bash
git push origin feature/AmazingFeature
```

## 📤 Pull Request Gönderme

### 1. Pull Request Oluşturun
- GitHub web arayüzünde "New Pull Request" düğmesine tıklayın
- Base branch: `main`
- Compare branch: `feature/AmazingFeature`

### 2. PR Açıklaması
```markdown
## Açıklama
Bu PR, [özelliği/hatayı] ekler/düzeltir.

## Türü
- [ ] Yeni Özellik
- [ ] Hata Düzeltmesi
- [ ] Dokümantasyon Güncelleme
- [ ] Performans İyileştirmesi
- [ ] Refactoring

## İlgili Issue
Closes #123

## Değişiklikler
- Değişiklik 1
- Değişiklik 2
- Değişiklik 3

## Test Edilmiş
- [ ] Yerel ortamda test edildi
- [ ] Tüm testler geçti
- [ ] Yeni testler eklendi

## Kontrol Listesi
- [ ] Kodun stil rehberine uyduğu kontrol edildi
- [ ] Yeni bağımlılıklar eklenmedi
- [ ] Dokümantasyon güncellendi
- [ ] Commit mesajları açık ve tanımlayıcı
```

### 3. Gözden Geçirilmesi
- Maintainer'lar kodunuzu gözden geçirecek
- Geri bildirim alabilirsiniz
- Gerekli değişiklikleri yapın
- PR onaylandığında merge edilecek

## 📝 Stil Rehberi

### TypeScript
```typescript
// ✅ İyi
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ Kötü
const calculateTotal = (items) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
};
```

### React
```typescript
// ✅ İyi
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
    </div>
  );
}

// ❌ Kötü
export default function ProductCard(props) {
  return (
    <div>
      <img src={props.product.image} />
      <h3>{props.product.name}</h3>
    </div>
  );
}
```

### Tailwind CSS
```jsx
// ✅ İyi
<button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
  Ekle
</button>

// ❌ Kötü
<button style={{ padding: '8px 16px', backgroundColor: '#FF6B35', color: 'white' }}>
  Ekle
</button>
```

## 💬 Commit Mesajları

Conventional Commits formatını kullanın:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Türler
- `feat`: Yeni özellik
- `fix`: Hata düzeltmesi
- `docs`: Dokümantasyon
- `style`: Kod stili (formatting, missing semicolons, etc)
- `refactor`: Kod refactoring
- `perf`: Performans iyileştirmesi
- `test`: Test ekleme/güncelleme
- `chore`: Build process, dependencies, etc

### Örnekler
```bash
git commit -m "feat(products): Add product filtering by brand"
git commit -m "fix(cart): Fix price calculation bug"
git commit -m "docs(readme): Update installation instructions"
git commit -m "refactor(auth): Simplify authentication logic"
git commit -m "test(checkout): Add checkout flow tests"
```

## 🧪 Test Etme

### Unit Testler
```bash
pnpm test
```

### Belirli Test Dosyasını Çalıştır
```bash
pnpm test server/products.test.ts
```

### Coverage Raporu
```bash
pnpm test -- --coverage
```

## 📚 Dokümantasyon

- Yeni özellikler için README.md'yi güncelleyin
- Kod yorumları ekleyin (özellikle karmaşık mantık için)
- TypeScript type tanımlarını belirtin
- API endpoint'lerini belgelendirin

## 🐛 Hata Raporlama

### Issue Oluşturmadan Önce
1. Benzer issue'lar olup olmadığını kontrol edin
2. En son sürümü kullandığınızdan emin olun
3. Hatayı tekrarlanabilir şekilde açıklayın

### Issue Şablonu
```markdown
## Hata Açıklaması
Hatanın açık ve kısa açıklaması.

## Adımları Tekrarla
1. ...
2. ...
3. ...

## Beklenen Davranış
Neler olması gerekiyordu?

## Gerçek Davranış
Aslında ne oldu?

## Ortam
- OS: [örn. macOS 12.1]
- Node.js: [örn. 22.13.0]
- Browser: [örn. Chrome 120]

## Ekran Görüntüsü
[Varsa ekran görüntüsü ekleyin]
```

## 🎯 Katkı Türleri

### Kod Katkıları
- Yeni özellikler
- Hata düzeltmeleri
- Performans iyileştirmeleri
- Refactoring

### Dokümantasyon Katkıları
- README güncellemeleri
- Kod örnekleri
- API dokümantasyonu
- Kurulum rehberi

### Test Katkıları
- Unit testler
- Integration testler
- E2E testler

### Tasarım Katkıları
- UI/UX iyileştirmeleri
- Erişilebilirlik iyileştirmeleri
- Responsive tasarım düzeltmeleri

## ❓ Sorular?

- **GitHub Discussions**: Genel sorular için
- **GitHub Issues**: Hata raporları ve özellik istekleri için
- **Email**: baspinar.halil.4343@gmail.com

## 🙏 Teşekkürler

ShoeHub projesine katkıda bulunduğunuz için teşekkürler! Sizin gibi geliştiriciler olmadan bu proje mümkün olmazdı.

---

**Happy Contributing!** 🚀
