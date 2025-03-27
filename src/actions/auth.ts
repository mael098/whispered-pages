'use server'
import { db } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { getJwtSecretKey } from '@/lib/serverUtils';

export async function registerUser(data: { email: string; password: string; username: string }) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        correo: data.email,
        password: hashedPassword,
        role: 'USER',
        name: data.username,
        alias: '',
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error en registro:", error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
}

// Buscar usuario y generar token
export async function loginUser(data: { email: string; password: string }) {
  try {
    const user = await db.user.findUnique({
      where: { correo: data.email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    const token = await new SignJWT({
      userId: user.id,
      role: user.role // Asegúrate de que tu modelo de usuario incluya el campo role
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setSubject(user.id.toString())
      .sign(new TextEncoder().encode(await getJwtSecretKey()));

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function createToken(user: { id: string, role: string }) {
  const token = await new SignJWT({
    id: user.id,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(await getJwtSecretKey()))

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 1 día
  })

  return token
}

export async function removeToken() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}
