import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      message: "Username is required",
    })
    .min(1, "Username is required"),
  password: z
    .string({
      message: "Password is required",
    })
    .min(1, "Password is required"),
  firstName: z
    .string({
      message: "First name is required",
    })
    .min(1, "First name is required"),
  lastName: z
    .string({
      message: "Last name is required",
    })
    .min(1, "Last name is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
