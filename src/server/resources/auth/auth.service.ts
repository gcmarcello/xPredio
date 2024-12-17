import prisma from "../../../../prisma/prisma";
import * as bcrypt from "bcrypt";
import { LoginDto, RecoverAccountDto, SignUpDto } from "../../../shared/resources/auth/auth.dto";
import { TsRestResponseError } from "@ts-rest/core";
import { authContract } from "../../../shared/resources/auth/auth.contract";
import { v4 as uuidv4 } from "uuid";
import { sendRecoveryEmail } from "@/utils/email";

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
      throw new TsRestResponseError(authContract.signUp, {
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

  static async recoverAccount(data: RecoverAccountDto) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      throw new TsRestResponseError(authContract.recover, {
        body: "Email não cadastrado.",
        status: 404,
      });
    }

    const recoveryToken = uuidv4();
    const recoveryExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await prisma.user.update({
      where: { email: data.email },
      data: {
        recoveryToken,
        recoveryExpiresAt,
      },
    });

    await sendRecoveryEmail(user.email, recoveryToken);

    return "Um e-mail de recuperação foi enviado para o endereço informado.";
  }
}
