import { initContract } from "@ts-rest/core";
import { loginDto, signUpDto } from "./auth.dto";
import { tsr } from "@ts-rest/serverless/next";
import { AuthService } from "./auth.service";

const c = initContract();

export const authContract = c.router(
  {
    login: {
      method: "POST",
      path: "/login",
      responses: {
        200: c.type<string>(),
      },
      body: loginDto,
      summary: "Create a post",
    },
    signUp: {
      method: "POST",
      path: "/signup",
      responses: {
        200: c.type<string>(),
        409: c.type<string>(),
      },
      body: signUpDto,
      summary: "Create a post",
    },
  },
  {
    pathPrefix: "/auth",
  }
);

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
});
