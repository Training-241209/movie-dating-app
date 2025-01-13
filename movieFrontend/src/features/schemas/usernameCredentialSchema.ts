import { z } from "zod";
export const usernameSchema = z.object({
    username: z
      .string({
        message: "username is required",
      })
      .min(1, "username is required"),
    
    newUsername: z
    .string({
      message: "username is required",
    })
    .min(1, "username is required"),
  });
  
  
  export type UsernameSchema = z.infer<typeof usernameSchema>;