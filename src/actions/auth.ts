'use server'

import { db } from "@/lib/prisma"


export async function CreateUser(data: {
    username: string,
    email: string,
    password: string,
}) {
    try {
        const user = await db.user.create({
            data: {
                name: data.username,
                correo: data.email,
                password: data.password,
                alias: data.username, // or any default value
                role: "USER"
            }
        })
        return user

    } catch {

    }
}