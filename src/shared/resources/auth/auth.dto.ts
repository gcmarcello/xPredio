import { z } from "@/utils/zod/zod";

//login dto
export const loginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof loginDto>;

//signup dto
export const signUpDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignUpDto = z.infer<typeof signUpDto>;

//recover account dto
export const recoverAccountDto = z.object({
  email: z.string().email(),
});

export type RecoverAccountDto = z.infer<typeof recoverAccountDto>;
