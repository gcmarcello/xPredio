import { authContract } from "@/shared/resources/auth/auth.contract";
import { authRouter } from "@/server/resources/auth/auth.router";
import { createNextHandler, RequestValidationError } from "@ts-rest/serverless/next";

export const handler = createNextHandler(
  {
    auth: authContract,
  },
  {
    auth: authRouter,
  },
  {
    basePath: "/api/",
    jsonQuery: true,
    responseValidation: true,
    handlerType: "app-router",
    errorHandler: (error) => {
      try {
        if (error instanceof RequestValidationError) {
          throw {
            status: 400,
            body: error.message,
          };
        }
        throw {
          status: 500,
          body: "Internal server error",
        };
      } catch (error) {
        console.log(error);
      }
    },
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
