import z from "zod";

export const getUsersModel = z.object({
  query: z.object({
    userName: z.string().max(20).min(2).optional(),
    email: z.string().email().max(50).optional(),
  }),
});

export type GetUsersModel = z.infer<typeof getUsersModel>;
