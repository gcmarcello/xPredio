import prisma from "../../../../prisma/prisma";
import { SignupDto } from "./auth.dto";
import * as bcrypt from "bcrypt";

export class AuthService {
  static async login(data: SignupDto) {
    const { email, password } = data;

    if (!email || !password) {
      throw "Email e senha são obrigatórios.";
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw "Usuário ou senha incorretos.";
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw "Usuario ou senha incorretos";

    return "ok";
  }
}
