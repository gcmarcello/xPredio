import { z } from "@/utils/zod/zod";

export const loginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof loginDto>;

export const signUpDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignUpDto = z.infer<typeof signUpDto>;

export const recoverAccountDto = z.object({
  email: z.string().email(),
});

export type RecoverAccountDto = z.infer<typeof recoverAccountDto>;
