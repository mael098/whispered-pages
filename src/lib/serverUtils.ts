'use server';

import {jwtDecrypt } from 'jose';
export interface UserRole {
  id: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
}

// ⚡ Ahora es asíncrona
export const getJwtSecretKey = async () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw new Error('JWT Secret key no está configurada');
  return secret;
};

// 🛡️ Server Action para verificar autenticación
export const verifyRole = async (token:string): Promise<UserRole | null> => {
  if (!token)
    throw new Error('Token no encontrado');
    return null;

  try {
    const secret = await getJwtSecretKey(); // ⚡ Ahora usamos await
    const { payload } = await jwtDecrypt(token, new TextEncoder().encode(secret));

    if (!payload.id || !payload.role) {
      throw new Error('Token inválido: faltan campos necesarios');
    }

    return {
      id: payload.id as string,
      role: payload.role as UserRole['role'],
    };
  } catch (error) {
    console.error('Error verificando token:', error);
    return null;
  }
}




