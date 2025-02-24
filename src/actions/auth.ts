"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function User(data: {
    username: string;
    email: string;
    password: string;
}) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    try {
        const user = await db.user.create({
            data: {
                name: data.username,
                correo: data.email,
                password: hashPassword,
                alias: data.username,
                role: "USER",
            },
        });
        return { user };
    } catch (error) {
        console.error("error:", error);
        redirect("/dashboard");
    }
}



export async function findUser(data: { email: string, password: string }) {
    try {

        const findUser = await db.user.findUnique({
            where: { correo: data.email , },
        });
        if (!findUser) {
            throw new Error('Usuario no encontrado');
        } else {
            // console.log("usuario encontrado " + findUser);
        }

        const isPasswordValid = await bcrypt.compare(data.password, findUser.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña inválida');
        }
        const token = await new SignJWT({ userId: findUser.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .setSubject(findUser.id.toString())
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));
        (await cookies()).set('token', token)
        console.log("Generated JWT token: " + token);

        return { findUser }
    } catch {
        console.log("error en encontrar el usuario");
    }
}


