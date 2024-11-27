import { tsr } from "@ts-rest/serverless/next";
import { authContract } from "../../../shared/resources/auth/auth.contract";
import { AuthService } from "./auth.service";

export const authRouter = tsr.router(authContract, {
  login: async ({ body }) => {
    const data = await AuthService.login(body);

    return {
      status: 200,
      body: data,
    };
  },
  signUp: async ({ body }) => {
    const data = await AuthService.signUp(body);

    return {
      status: 200,
      body: data,
    };
  },
  recover: async ({ body }) => {
    const data = await AuthService.recoverAccount(body);

    return {
      status: 200,
      body: data,
    };
  },
});
