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
  confirmPassword: z
    .string({
      message: "Confirm password is required",
    })
    .min(1, "Confirm password is required"),
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
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;
