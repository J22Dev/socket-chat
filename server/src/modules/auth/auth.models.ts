import z from "zod";

export const userRegisterModel = z.object({
  body: z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    email: z.string().email().max(50),
    userName: z.string().min(2).max(20),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/g,
        "One Upper, One Lower, One Special, One Number, 8 to 16 Characters"
      ),
  }),
});

export type UserRegisterModel = z.infer<typeof userRegisterModel>["body"];

export const userLoginModel = z.object({
  body: z.object({
    email: z.string().email().max(50),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/g,
        "One Upper, One Lower, One Special, One Number, 8 to 16 Characters"
      ),
  }),
});

export type UserLoginModel = z.infer<typeof userLoginModel>["body"];
