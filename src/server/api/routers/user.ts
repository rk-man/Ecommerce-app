import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getByUserID_Confidential: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUnique({
        select: {
          email: true,
          id: true,
          name: true,
          isVerified: true,
          password: true,
          verificationCode: true,
        },
        where: {
          id: input.id,
        },
      });
    }),
  getByUserID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      let user = null;
      return await ctx.db.user.findUnique({
        select: {
          email: true,
          id: true,
          name: true,
          isVerified: true,
        },
        where: {
          id: input.id,
        },
      });
    }),

  // authenticate: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(({ input }) => {
  //     setCookie(input.id);
  //     return {
  //       status: "success",
  //     };
  //   }),

  updateIsVerified: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isVerified: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.db.user.update({
        data: {
          isVerified: true,
        },
        select: {
          email: true,
          id: true,
          name: true,
          isVerified: true,
        },
        where: {
          id: input.id,
        },
      });

      return {
        status: "success",
        data: user,
      };
    }),

  getByEmail_confidential: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        select: {
          email: true,
          id: true,
          name: true,
          isVerified: true,
          password: true,
        },

        where: {
          email: input.email,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let verificationCode = String(
        Math.floor(10000000 + Math.random() * 90000000),
      );
      let user = await ctx.db.user.create({
        data: {
          ...input,
          isVerified: false,
          verificationCode,
        },
      });

      return {
        status: "success",
        data: user,
      };
    }),

  getUserAndCategories: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findMany({
        select: {
          categories: true,
          id: true,
          name: true,
          email: true,
          isVerified: true,
        },

        where: {
          id: input.id,
        },
      });
    }),
});
