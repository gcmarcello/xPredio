import { initContract } from "@ts-rest/core";
import { loginDto, recoverAccountDto, signUpDto } from "./auth.dto";
import { createNextHandler } from "@ts-rest/serverless/next";
import { AuthService } from "./auth.service";

const c = initContract();

export const authContract = c.router(
  {
    login: {
      method: "POST",
      path: "/login",
      responses: {
        200: c.type<string>(),
        401: c.type<string>(),
      },
      body: loginDto,
    },
    signUp: {
      method: "POST",
      path: "/signup",
      responses: {
        200: c.type<string>(),
        409: c.type<string>(),
      },
      body: signUpDto,
    },
    recover: {
      method: "POST",
      path: "/recover",
      responses: {
        200: c.type<string>(),
        404: c.type<string>(),
      },
      body: recoverAccountDto,
    },
  },
  {
    pathPrefix: "/auth",
  }
);

export const authHandler = createNextHandler(
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
