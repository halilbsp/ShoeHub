import { drizzle } from "drizzle-orm/mysql2";
import {
  brands,
  categories,
  colors,
  sizes,
  products,
  productImages,
  productVariants,
  shippingOptions,
  paymentMethods,
} from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL || "");

// Seed data
const brandsData = [
  { name: "Adidas", slug: "adidas", description: "Adidas - Spor ayakkabılarında dünya lideri", logo: "/brands/adidas.png" },
  { name: "Nike", slug: "nike", description: "Nike - Yüksek performans ve stil", logo: "/brands/nike.png" },
  { name: "Puma", slug: "puma", description: "Puma - Hızlı ve dinamik tasarımlar", logo: "/brands/puma.png" },
  { name: "New Balance", slug: "new-balance", description: "New Balance - Konfor ve teknoloji", logo: "/brands/new-balance.png" },
  { name: "Reebok", slug: "reebok", description: "Reebok - Fitness ve spor ayakkabıları", logo: "/brands/reebok.png" },
];

const categoriesData = [
  { name: "Koşu Ayakkabıları", slug: "kosу-ayakkabilari", description: "Koşu için tasarlanmış ayakkabılar", icon: "🏃" },
  { name: "Basketbol Ayakkabıları", slug: "basketbol-ayakkabilari", description: "Basketbol oyunculuları için", icon: "🏀" },
  { name: "Günlük Ayakkabılar", slug: "gunluk-ayakkabilar", description: "Günlük kullanım için rahat ayakkabılar", icon: "👟" },
  { name: "Futsal Ayakkabıları", slug: "futsal-ayakkabilari", description: "Futsal ve salon sporları için", icon: "⚽" },
  { name: "Trekking Ayakkabıları", slug: "trekking-ayakkabilari", description: "Dağ ve doğa sporları için", icon: "🥾" },
];

const colorsData = [
  { name: "Siyah", code: "#000000" },
  { name: "Beyaz", code: "#FFFFFF" },
  { name: "Kırmızı", code: "#FF0000" },
  { name: "Mavi", code: "#0000FF" },
  { name: "Gri", code: "#808080" },
  { name: "Yeşil", code: "#008000" },
  { name: "Sarı", code: "#FFFF00" },
  { name: "Turuncu", code: "#FFA500" },
];

const sizesData = [
  { size: "36" },
  { size: "37" },
  { size: "38" },
  { size: "39" },
  { size: "40" },
  { size: "41" },
  { size: "42" },
  { size: "43" },
  { size: "44" },
  { size: "45" },
  { size: "46" },
];

const productsData = [
  {
    name: "Adidas Ultraboost 22",
    slug: "adidas-ultraboost-22",
    description: "Yüksek performanslı koşu ayakkabısı. Ultraboost teknolojisi ile maksimum konfor ve enerji geri dönüşü sağlar.",
    brandId: 1,
    categoryId: 1,
    price: "2499.99",
    discountPrice: "1999.99",
    rating: "4.8",
    reviewCount: 45,
  },
  {
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    description: "İkonik Nike Air Max 90. Klasik tasarım ve modern konfor teknolojisinin mükemmel birleşimi.",
    brandId: 2,
    categoryId: 3,
    price: "2299.99",
    discountPrice: "1799.99",
    rating: "4.9",
    reviewCount: 128,
  },
  {
    name: "Puma RS-X",
    slug: "puma-rs-x",
    description: "Retro stil ile modern teknolojinin buluşması. Günlük kullanım için ideal.",
    brandId: 3,
    categoryId: 3,
    price: "1899.99",
    discountPrice: "1499.99",
    rating: "4.6",
    reviewCount: 32,
  },
  {
    name: "New Balance 990v5",
    slug: "new-balance-990v5",
    description: "Konfor ve stil bir arada. Premium malzemelerle üretilmiş ayakkabı.",
    brandId: 4,
    categoryId: 3,
    price: "2799.99",
    discountPrice: "2199.99",
    rating: "4.7",
    reviewCount: 67,
  },
  {
    name: "Reebok Nano X2",
    slug: "reebok-nano-x2",
    description: "Fitness ve crossfit için tasarlanmış profesyonel ayakkabı.",
    brandId: 5,
    categoryId: 1,
    price: "2199.99",
    discountPrice: "1699.99",
    rating: "4.5",
    reviewCount: 54,
  },
  {
    name: "Nike LeBron 20",
    slug: "nike-lebron-20",
    description: "NBA profesyonellerinin seçimi. Basketbol için maksimum performans.",
    brandId: 2,
    categoryId: 2,
    price: "3499.99",
    discountPrice: "2799.99",
    rating: "4.9",
    reviewCount: 89,
  },
  {
    name: "Adidas Copa Mundial",
    slug: "adidas-copa-mundial",
    description: "Futsal ve salon sporları için efsanevi ayakkabı. Profesyonel oyuncuların tercih ettiği model.",
    brandId: 1,
    categoryId: 4,
    price: "1999.99",
    discountPrice: "1499.99",
    rating: "4.8",
    reviewCount: 76,
  },
  {
    name: "Puma Voyage Nitro",
    slug: "puma-voyage-nitro",
    description: "Hafif ve hızlı. Koşu performansını maksimize eden teknoloji.",
    brandId: 3,
    categoryId: 1,
    price: "2099.99",
    discountPrice: "1599.99",
    rating: "4.7",
    reviewCount: 43,
  },
  {
    name: "New Balance Hierro v8",
    slug: "new-balance-hierro-v8",
    description: "Trekking ve dağ sporları için güçlü ve dayanıklı ayakkabı.",
    brandId: 4,
    categoryId: 5,
    price: "2399.99",
    discountPrice: "1899.99",
    rating: "4.6",
    reviewCount: 38,
  },
  {
    name: "Reebok Floatride Energy",
    slug: "reebok-floatride-energy",
    description: "Koşu performansı için geliştirilmiş enerji geri dönüşü teknolojisi.",
    brandId: 5,
    categoryId: 1,
    price: "1899.99",
    discountPrice: "1399.99",
    rating: "4.5",
    reviewCount: 29,
  },
];

const productImagesData = [
  // Adidas Ultraboost 22
  { productId: 1, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Adidas Ultraboost 22 - Ön görünüş", displayOrder: 0 },
  { productId: 1, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Adidas Ultraboost 22 - Yan görünüş", displayOrder: 1 },
  // Nike Air Max 90
  { productId: 2, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Nike Air Max 90 - Ön görünüş", displayOrder: 0 },
  { productId: 2, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Nike Air Max 90 - Yan görünüş", displayOrder: 1 },
  // Puma RS-X
  { productId: 3, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Puma RS-X - Ön görünüş", displayOrder: 0 },
  { productId: 3, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Puma RS-X - Yan görünüş", displayOrder: 1 },
  // New Balance 990v5
  { productId: 4, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "New Balance 990v5 - Ön görünüş", displayOrder: 0 },
  { productId: 4, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "New Balance 990v5 - Yan görünüş", displayOrder: 1 },
  // Reebok Nano X2
  { productId: 5, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Reebok Nano X2 - Ön görünüş", displayOrder: 0 },
  { productId: 5, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Reebok Nano X2 - Yan görünüş", displayOrder: 1 },
  // Nike LeBron 20
  { productId: 6, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Nike LeBron 20 - Ön görünüş", displayOrder: 0 },
  { productId: 6, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Nike LeBron 20 - Yan görünüş", displayOrder: 1 },
  // Adidas Copa Mundial
  { productId: 7, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Adidas Copa Mundial - Ön görünüş", displayOrder: 0 },
  { productId: 7, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Adidas Copa Mundial - Yan görünüş", displayOrder: 1 },
  // Puma Voyage Nitro
  { productId: 8, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Puma Voyage Nitro - Ön görünüş", displayOrder: 0 },
  { productId: 8, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Puma Voyage Nitro - Yan görünüş", displayOrder: 1 },
  // New Balance Hierro v8
  { productId: 9, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "New Balance Hierro v8 - Ön görünüş", displayOrder: 0 },
  { productId: 9, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "New Balance Hierro v8 - Yan görünüş", displayOrder: 1 },
  // Reebok Floatride Energy
  { productId: 10, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", altText: "Reebok Floatride Energy - Ön görünüş", displayOrder: 0 },
  { productId: 10, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", altText: "Reebok Floatride Energy - Yan görünüş", displayOrder: 1 },
];

const shippingOptionsData = [
  { name: "Standart Kargo", description: "3-5 iş günü içinde teslimat", basePrice: "29.99", estimatedDays: 4 },
  { name: "Express Kargo", description: "1-2 iş günü içinde teslimat", basePrice: "79.99", estimatedDays: 2 },
  { name: "Aynı Gün Kargo", description: "Aynı gün teslimat (İstanbul)", basePrice: "149.99", estimatedDays: 0 },
  { name: "Kapıda Ödeme", description: "Kargo ücreti + kapıda ödeme", basePrice: "39.99", estimatedDays: 4 },
];

const paymentMethodsData = [
  { name: "Kredi Kartı", type: "credit_card" },
  { name: "Banka Kartı", type: "credit_card" },
  { name: "Banka Transferi", type: "bank_transfer" },
  { name: "Kapıda Ödeme", type: "cash_on_delivery" },
];

async function seed() {
  try {
    console.log("Seeding database...");

    // Insert brands
    console.log("Inserting brands...");
    await db.insert(brands).values(brandsData);

    // Insert categories
    console.log("Inserting categories...");
    await db.insert(categories).values(categoriesData);

    // Insert colors
    console.log("Inserting colors...");
    await db.insert(colors).values(colorsData);

    // Insert sizes
    console.log("Inserting sizes...");
    await db.insert(sizes).values(sizesData);

    // Insert products
    console.log("Inserting products...");
    await db.insert(products).values(productsData);

    // Insert product images
    console.log("Inserting product images...");
    await db.insert(productImages).values(productImagesData);

    // Insert product variants (all combinations of colors and sizes for each product)
    console.log("Inserting product variants...");
    const variants = [];
    for (let productId = 1; productId <= 10; productId++) {
      for (let colorId = 1; colorId <= 4; colorId++) {
        for (let sizeId = 1; sizeId <= 11; sizeId++) {
          variants.push({
            productId,
            colorId,
            sizeId,
            sku: `SKU-${productId}-${colorId}-${sizeId}`,
            stock: Math.floor(Math.random() * 50) + 5,
          });
        }
      }
    }
    await db.insert(productVariants).values(variants);

    // Insert shipping options
    console.log("Inserting shipping options...");
    await db.insert(shippingOptions).values(shippingOptionsData);

    // Insert payment methods
    console.log("Inserting payment methods...");
    await db.insert(paymentMethods).values(paymentMethodsData);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
