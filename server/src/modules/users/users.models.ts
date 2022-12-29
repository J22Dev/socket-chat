import z from "zod";

export const getUsersModel = z.object({
  query: z.object({
    term: z.string().min(2).max(50).optional(),
    limit: z.string().optional(),
    page: z.string().optional(),
  }),
});

export type GetUsersModel = z.infer<typeof getUsersModel>["query"];

export const getUserModel = z.object({
  params: z.object({
    userId: z.string(),
  }),
});
export type GetUserModel = z.infer<typeof getUserModel>["params"];

export const updateUserModel = z.object({
  body: z.object({
    firstName: z.string().min(2).max(20).optional(),
    lastName: z.string().min(2).max(20).optional(),
    email: z.string().email().max(50).optional(),
    userName: z.string().min(2).max(20).optional(),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/g,
        "One Upper, One Lower, One Special, One Number, 8 to 16 Characters"
      ),
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/g,
        "One Upper, One Lower, One Special, One Number, 8 to 16 Characters"
      )
      .optional(),
  }),
  params: z.object({
    userId: z.string(),
  }),
});

export type UpdateUserModel = z.infer<typeof updateUserModel>["body"];
