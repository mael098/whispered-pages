import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("🔑 Este es el token:", token);

  if (!token) {
    console.log("❌ Token no encontrado. Redirigiendo al login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );

    console.log("✅ Token válido:", payload);


    const userRole = payload.role;

    if (userRole === "ADMIN") {
      return NextResponse.next();
    } else if (userRole === "USER") {
      NextResponse.redirect(new URL("dashboardClient", request.url))
      return NextResponse.next();
    } else {
      console.log("⚠️ Rol desconocido, redirigiendo a login...");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("❌ Error verificando usuario:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/Admin", "/Client"]
};




