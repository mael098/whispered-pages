import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("🔑 Este es el token:", token);

  // Si no hay token, redirige al login
  if (!token) {
    console.log("❌ Token no encontrado. Redirigiendo al login...");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Validamos el token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    console.log("✅ Token válido:", payload);
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Token inválido:", error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard'], // Ejecuta el middleware solo en /dashboard
};













