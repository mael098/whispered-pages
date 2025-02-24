import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookies = req.cookies.get("token")?.value;
  if (!cookies) {
    return NextResponse.redirect("/register/login", { status: 302 });
  }
  try{
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    await jwtVerify(cookies, new TextEncoder().encode(secret));
    return NextResponse.next();
  }
  catch {
    return NextResponse.redirect("/register/login", { status: 302 });
  }

}

const config = {
  matcher: "/dashboard",
};

export default config;
