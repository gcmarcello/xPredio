import { authContract } from "@/server/resources/auth/auth.contract";
import { AuthService } from "@/server/resources/auth/auth.service";
import { createNextHandler } from "@ts-rest/serverless/next";

export const handler = createNextHandler(
  authContract,
  {
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
  },
  {
    basePath: "/api",
    jsonQuery: true,
    responseValidation: true,
    handlerType: "app-router",
  }
);

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
