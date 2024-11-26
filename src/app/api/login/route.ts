import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/server/resources/auth/auth.service";

export async function POST(request: NextRequest) {
  try {
    const login = await AuthService.login(await request.json());
    return NextResponse.json(login);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
