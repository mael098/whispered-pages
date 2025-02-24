import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookies = req.cookies.get("token")?.value;
  if (!cookies) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    await jwtVerify(cookies, new TextEncoder().encode(secret));
    return NextResponse.next(); // Importante para continuar si el token es válido
  } catch {
    return NextResponse.redirect(new URL("/register/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/"],
};
