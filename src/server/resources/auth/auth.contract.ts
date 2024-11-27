import { initContract } from "@ts-rest/core";
import { loginDto, recoverAccountDto, signUpDto } from "./auth.dto";

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
