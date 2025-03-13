'use server'
import { db } from "@/lib/prisma"

export async function librosCreate(data: { title: string, descripcion: string }) {
  try{
    await db.book.create({ data: { title: data.title, descripcion: data.descripcion ,} })

  }catch(e){
    throw new Error(e instanceof Error ? e.message : String(e))
  }

}
