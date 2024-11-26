/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import prisma from "../../../../prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email e senha são obrigatórios." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
    }

    return NextResponse.json({ message: "Login bem-sucedido!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao fazer login." }, { status: 500 });
  }
}
