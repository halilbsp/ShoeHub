# 🚀 Dağıtım Rehberi

ShoeHub'ı üretim ortamına dağıtmak için adım adım rehber.

## 📋 İçindekiler

1. [Ön Koşullar](#ön-koşullar)
2. [Manus Platformu](#manus-platformu)
3. [Kendi Sunucunuza Dağıtım](#kendi-sunucunuza-dağıtım)
4. [Çevre Değişkenleri](#çevre-değişkenleri)
5. [Veritabanı Migrasyonu](#veritabanı-migrasyonu)
6. [SSL/HTTPS](#ssltls)
7. [Performans Optimizasyonu](#performans-optimizasyonu)
8. [Monitoring ve Logging](#monitoring-ve-logging)
9. [Yedekleme Stratejisi](#yedekleme-stratejisi)

---

## ✅ Ön Koşullar

- Node.js 22.13.0+
- npm veya pnpm
- MySQL 8.0+ veya TiDB
- Stripe üretim hesabı
- AWS S3 hesabı
- Domain adı

---

## 🌐 Manus Platformu (Önerilen)

Manus platformu, ShoeHub için en kolay dağıtım seçeneğidir.

### Avantajlar
- ✅ Otomatik SSL/HTTPS
- ✅ Özel domain desteği
- ✅ Otomatik yedekleme
- ✅ CDN entegrasyonu
- ✅ Monitoring ve analytics
- ✅ Skalabilite

### Adımlar

1. **Manus Hesabı Oluşturun**: https://manus.im

2. **Projeyi Bağlayın**:
   - Manus Dashboard'da "Publish" düğmesine tıklayın
   - GitHub repository'nizi seçin
   - Otomatik dağıtım yapılandırılacak

3. **Çevre Değişkenlerini Ayarlayın**:
   - Settings → Secrets
   - Tüm üretim API anahtarlarını girin

4. **Domain Ayarlayın**:
   - Settings → Domains
   - Kendi domain'inizi bağlayın veya Manus domain'i kullanın

5. **Yayınlayın**:
   - "Publish" düğmesine tıklayın
   - Dağıtım başlayacak

---

## 🖥️ Kendi Sunucunuza Dağıtım

### Seçenek 1: VPS (DigitalOcean, Linode, AWS EC2)

#### 1. Sunucu Kurulumu
```bash
# Ubuntu 22.04 LTS sunucusu oluşturun
# SSH ile bağlanın

# Sistem güncellemeleri
sudo apt update && sudo apt upgrade -y

# Node.js yükleyin
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# pnpm yükleyin
npm install -g pnpm

# Git yükleyin
sudo apt install -y git

# MySQL yükleyin
sudo apt install -y mysql-server
sudo mysql_secure_installation

# Nginx yükleyin
sudo apt install -y nginx

# SSL (Certbot)
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. Projeyi Klonlayın
```bash
cd /var/www
sudo git clone https://github.com/yourusername/shoehub.git
sudo chown -R $USER:$USER shoehub
cd shoehub
```

#### 3. Bağımlılıkları Yükleyin
```bash
pnpm install --prod
```

#### 4. Ortam Değişkenlerini Ayarlayın
```bash
nano .env.production
# Tüm üretim değişkenlerini girin
```

#### 5. Veritabanını Ayarlayın
```bash
pnpm db:push
npx tsx seed-db.mjs
```

#### 6. Uygulamayı Derleyin
```bash
pnpm build
```

#### 7. PM2 ile Başlatın
```bash
npm install -g pm2
pm2 start dist/index.js --name "shoehub"
pm2 startup
pm2 save
```

#### 8. Nginx Yapılandırması
```bash
sudo nano /etc/nginx/sites-available/shoehub
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/shoehub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 9. SSL Sertifikası Ayarlayın
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Seçenek 2: Docker

#### Dockerfile
```dockerfile
FROM node:22-alpine

WORKDIR /app

# Bağımlılıkları kopyala
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

# Kodu kopyala
COPY . .

# Derle
RUN pnpm build

# Başlat
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/shoehub
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=shoehub
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

```bash
docker-compose up -d
```

---

## 🔐 Çevre Değişkenleri

### Üretim Ortamında
```bash
# Veritabanı (Production)
DATABASE_URL=mysql://prod_user:strong_password@prod-db.example.com:3306/shoehub

# JWT (Güçlü anahtar)
JWT_SECRET=generate-with-openssl-rand-hex-32

# Stripe (Live Keys)
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# AWS S3
AWS_REGION=eu-west-1
AWS_S3_BUCKET=shoehub-prod

# Node Ortamı
NODE_ENV=production
```

### Güvenlik İpuçları
- ✅ Güçlü parolalar kullanın
- ✅ API anahtarlarını döndürün
- ✅ Çevre değişkenlerini version control'de saklamayın
- ✅ HTTPS kullanın
- ✅ CORS'u kısıtlayın

---

## 🗄️ Veritabanı Migrasyonu

### Üretim Veritabanına Geçiş

```bash
# 1. Yerel veritabanını dışa aktarın
mysqldump -u root -p shoehub > backup.sql

# 2. Üretim veritabanını oluşturun
mysql -h prod-db.example.com -u admin -p -e "CREATE DATABASE shoehub;"

# 3. Verileri içe aktarın
mysql -h prod-db.example.com -u admin -p shoehub < backup.sql

# 4. Migrasyonları çalıştırın
DATABASE_URL=mysql://... pnpm db:push

# 5. Seed verilerini yükleyin
DATABASE_URL=mysql://... npx tsx seed-db.mjs
```

### Yedekleme Planı
```bash
# Günlük yedekleme (cron job)
0 2 * * * mysqldump -u root -p shoehub | gzip > /backups/shoehub-$(date +\%Y\%m\%d).sql.gz
```

---

## 🔒 SSL/TLS

### Let's Encrypt ile Otomatik Yenileme
```bash
sudo certbot renew --dry-run
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### HTTPS Yönlendirmesi
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
}
```

---

## ⚡ Performans Optimizasyonu

### 1. Caching Stratejisi
```nginx
# Statik dosyalar
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML (no cache)
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 2. Compression
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json;
gzip_min_length 1000;
```

### 3. CDN Entegrasyonu
```bash
# CloudFlare veya Bunny CDN ile domain'i yapılandırın
```

### 4. Database Optimizasyonu
```sql
-- İndeksler oluşturun
CREATE INDEX idx_products_brand ON products(brandId);
CREATE INDEX idx_orders_user ON orders(userId);
CREATE INDEX idx_cart_user ON cart_items(userId);
```

---

## 📊 Monitoring ve Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs shoehub
```

### Nginx Logs
```bash
# Error logs
tail -f /var/log/nginx/error.log

# Access logs
tail -f /var/log/nginx/access.log
```

### Application Logging
```typescript
// server/index.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

logger.info('Application started');
```

### Monitoring Tools
- **Uptime Robot**: Uptime monitoring
- **New Relic**: Performance monitoring
- **Sentry**: Error tracking
- **DataDog**: Infrastructure monitoring

---

## 💾 Yedekleme Stratejisi

### Otomatik Yedekleme
```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups"
DB_NAME="shoehub"
DATE=$(date +%Y%m%d_%H%M%S)

# Veritabanı yedekle
mysqldump -u root -p$DB_PASSWORD $DB_NAME | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# S3'e yükle
aws s3 cp $BACKUP_DIR/db_$DATE.sql.gz s3://shoehub-backups/

# Eski yedekleri sil (30 günden eski)
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
```

### Cron Job
```bash
0 3 * * * /home/ubuntu/backup.sh
```

---

## 🔄 Continuous Deployment

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/shoehub
            git pull origin main
            pnpm install
            pnpm build
            pm2 restart shoehub
```

---

## ✅ Dağıtım Kontrol Listesi

- [ ] Tüm çevre değişkenleri ayarlandı
- [ ] Veritabanı migrasyonları çalıştırıldı
- [ ] SSL sertifikası yüklendi
- [ ] Backup sistemi kuruldu
- [ ] Monitoring ayarlandı
- [ ] Logging yapılandırıldı
- [ ] Performans testi yapıldı
- [ ] Güvenlik taraması yapıldı
- [ ] DNS kayıtları güncellendi
- [ ] Smoke testler geçti

---

## 🆘 Sorun Giderme

### Uygulama başlamıyor
```bash
pm2 logs shoehub
# Hataları kontrol edin
```

### Veritabanı bağlantısı başarısız
```bash
mysql -h host -u user -p -e "SELECT 1;"
# Bağlantıyı test edin
```

### Yüksek CPU kullanımı
```bash
pm2 monit
# PM2 monitoring'i kontrol edin
```

---

**Başarılı dağıtımlar için iyi şanslar!** 🚀
