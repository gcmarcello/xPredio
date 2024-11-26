import { z } from "@/utils/zod/zod";

export const signupDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignupDto = z.infer<typeof signupDto>;
