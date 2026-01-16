import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router, adminProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { getDb } from "./db";
import {
  products,
  productImages,
  productVariants,
  brands,
  categories,
  colors,
  sizes,
  orders,
  orderItems,
  cartItems,
  shippingOptions,
  paymentMethods,
  notifications,
} from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Product routes
  products: router({
    list: publicProcedure
      .input(
        z.object({
          brandId: z.number().optional(),
          categoryId: z.number().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          search: z.string().optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        const result = await db.getProducts({
          brandId: input.brandId,
          categoryId: input.categoryId,
          minPrice: input.minPrice,
          maxPrice: input.maxPrice,
          search: input.search,
          limit: input.limit,
          offset: input.offset,
        });
        return result;
      }),

    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      const product = await db.getProductById(input);
      if (!product) throw new TRPCError({ code: "NOT_FOUND" });

      const images = await db.getProductImages(input);
      const variants = await db.getProductVariants(input);

      return {
        ...product,
        images,
        variants,
      };
    }),

    getBrands: publicProcedure.query(() => db.getBrands()),
    getCategories: publicProcedure.query(() => db.getCategories()),
    getColors: publicProcedure.query(() => db.getColors()),
    getSizes: publicProcedure.query(() => db.getSizes()),

    // Admin: Create product
    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          slug: z.string(),
          description: z.string().optional(),
          brandId: z.number(),
          categoryId: z.number(),
          price: z.string(),
          discountPrice: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const result = await database.insert(products).values(input);
        return result;
      }),

    // Admin: Update product
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          price: z.string().optional(),
          discountPrice: z.string().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const { id, ...updateData } = input;
        await database.update(products).set(updateData).where(eq(products.id, id));
        return { success: true };
      }),

    // Admin: Delete product
    delete: adminProcedure.input(z.number()).mutation(async ({ input }) => {
      const database = await getDb();
      if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await database.update(products).set({ isActive: false }).where(eq(products.id, input));
      return { success: true };
    }),
  }),

  // Cart routes
  cart: router({
    getItems: protectedProcedure.query(async ({ ctx }) => {
      const items = await db.getUserCart(ctx.user.id);
      return items;
    }),

    addItem: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          variantId: z.number().optional(),
          quantity: z.number().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        // Check if item already exists
        const existing = await database
          .select()
          .from(cartItems)
          .where(
            and(
              eq(cartItems.userId, ctx.user.id),
              eq(cartItems.productId, input.productId),
              input.variantId ? eq(cartItems.variantId, input.variantId) : undefined
            )
          );

        if (existing.length > 0) {
          // Update quantity
          await database
            .update(cartItems)
            .set({ quantity: existing[0].quantity + input.quantity })
            .where(eq(cartItems.id, existing[0].id));
        } else {
          // Add new item
          await database.insert(cartItems).values({
            userId: ctx.user.id,
            productId: input.productId,
            variantId: input.variantId,
            quantity: input.quantity,
          });
        }

        return { success: true };
      }),

    updateItem: protectedProcedure
      .input(
        z.object({
          cartItemId: z.number(),
          quantity: z.number().min(0),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const item = await db.getCartItemById(input.cartItemId);
        if (!item || item.userId !== ctx.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        if (input.quantity === 0) {
          await database.delete(cartItems).where(eq(cartItems.id, input.cartItemId));
        } else {
          await database
            .update(cartItems)
            .set({ quantity: input.quantity })
            .where(eq(cartItems.id, input.cartItemId));
        }

        return { success: true };
      }),

    removeItem: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
      const database = await getDb();
      if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const item = await db.getCartItemById(input);
      if (!item || item.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await database.delete(cartItems).where(eq(cartItems.id, input));
      return { success: true };
    }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      const database = await getDb();
      if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await database.delete(cartItems).where(eq(cartItems.userId, ctx.user.id));
      return { success: true };
    }),
  }),

  // Order routes
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserOrders(ctx.user.id);
    }),

    getById: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
      const order = await db.getOrderById(input);
      if (!order || order.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const items = await db.getOrderItems(input);
      return { ...order, items };
    }),

    // Admin: Get all orders
    getAllOrders: adminProcedure
      .input(
        z.object({
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return db.getAllOrders(input.limit, input.offset);
      }),

    // Admin: Update order status
    updateStatus: adminProcedure
      .input(
        z.object({
          orderId: z.number(),
          status: z.enum(["preparing", "shipped", "delivered", "cancelled"]),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const order = await db.getOrderById(input.orderId);
        if (!order) throw new TRPCError({ code: "NOT_FOUND" });

        const updateData: any = { status: input.status };
        if (input.status === "shipped") {
          updateData.shippedAt = new Date();
        } else if (input.status === "delivered") {
          updateData.deliveredAt = new Date();
        }

        await database.update(orders).set(updateData).where(eq(orders.id, input.orderId));

        // Send notification to customer
        await database.insert(notifications).values({
          userId: order.userId,
          title: `Siparişiniz ${input.status === "preparing" ? "hazırlanıyor" : input.status === "shipped" ? "kargoda" : "teslim edildi"}`,
          message: `Sipariş #${order.orderNumber} durumu güncellendi.`,
          type: "order",
          relatedOrderId: input.orderId,
        });

        return { success: true };
      }),
  }),

  // Shipping routes
  shipping: router({
    getOptions: publicProcedure.query(() => db.getShippingOptions()),
  }),

  // Payment routes
  payment: router({
    getMethods: publicProcedure.query(() => db.getPaymentMethods()),
  }),

  // Notifications
  notifications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserNotifications(ctx.user.id);
    }),

    getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
      return db.getUnreadNotificationCount(ctx.user.id);
    }),

    markAsRead: protectedProcedure.input(z.number()).mutation(async ({ input }) => {
      const database = await getDb();
      if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await database
        .update(notifications)
        .set({ isRead: true })
        .where(eq(notifications.id, input));

      return { success: true };
    }),
  }),

  // Admin: Brands management
  brands: router({
    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          slug: z.string(),
          description: z.string().optional(),
          logo: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        await database.insert(brands).values(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          logo: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const { id, ...updateData } = input;
        await database.update(brands).set(updateData).where(eq(brands.id, id));
        return { success: true };
      }),
  }),

  // Admin: Categories management
  categories: router({
    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          slug: z.string(),
          description: z.string().optional(),
          icon: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        await database.insert(categories).values(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          icon: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const { id, ...updateData } = input;
        await database.update(categories).set(updateData).where(eq(categories.id, id));
        return { success: true };
      }),
  }),

  // Admin: Stock management
  stock: router({
    updateVariantStock: adminProcedure
      .input(
        z.object({
          variantId: z.number(),
          stock: z.number().min(0),
        })
      )
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        await database
          .update(productVariants)
          .set({ stock: input.stock })
          .where(eq(productVariants.id, input.variantId));

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
