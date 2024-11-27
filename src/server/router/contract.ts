import { initContract } from "@ts-rest/core";
import { authContract } from "../resources/auth/auth.contract";
const c = initContract();

export const contract = c.router({
  auth: authContract,
});
