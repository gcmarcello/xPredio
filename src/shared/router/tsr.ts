import { contract } from "@/shared/router/contract";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  baseHeaders: {
    "x-app-source": "ts-rest",
  },
});
