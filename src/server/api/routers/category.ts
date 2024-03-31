import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { faker } from "@faker-js/faker";

export const categoryRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany({
      include: {
        users: true,
      },
    });
  }),

  create: publicProcedure.mutation(async ({ ctx }) => {
    try {
      let categories: string[] = [];
      let i = 0;

      while (i < 100) {
        let category = faker.commerce.department();
        if (categories.includes(category))
          categories.push(`${category}-${categories.length + 1}`);
        else categories.push(category);
        i++;
      }

      let pushed_categories = await ctx.db.category.createMany({
        data: categories.map((category) => {
          return {
            title: category,
          };
        }),
        skipDuplicates: true,
      });
    } catch (err) {
      console.log(err);
    }

    return {
      status: "success",
      data: "hi",
    };
  }),

  create_category_user: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        category_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.userAndCategory.create({
        data: input,
      });
    }),

  delete_category_user: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        category_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.userAndCategory.delete({
        where: {
          user_id_category_id: {
            user_id: input.user_id,
            category_id: input.category_id,
          },
        },
      });
    }),
});
