import { createNextHandler } from "@ts-rest/serverless/next";
import { contract } from "./contract";
import { authRouter } from "../resources/auth/auth.contract";

export const handler = createNextHandler(
  contract,
  {
    auth: authRouter,
  },
  {
    basePath: "/api/",
    jsonQuery: true,
    responseValidation: true,
    handlerType: "app-router",
  }
);
