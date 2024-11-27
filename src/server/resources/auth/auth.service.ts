import prisma from "../../../../prisma/prisma";
import * as bcrypt from "bcrypt";
import { LoginDto, SignUpDto } from "./auth.dto";
import { TsRestResponseError } from "@ts-rest/core";
import { contract } from "@/server/router/contract";

export class AuthService {
  static async login(data: LoginDto) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw "Usuário ou senha incorretos.";
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw "Usuario ou senha incorretos";

    return "ok";
  }

  static async signUp(data: SignUpDto) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new TsRestResponseError(contract.auth.signUp, {
        body: "Email já cadastrado.",
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return "ok";
  }
}
