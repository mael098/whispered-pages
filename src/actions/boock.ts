'use server';
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";
import { db } from "@/lib/prisma";

export async function Bookpost(title: string, descripcion: string, image: File, data: { title: string; descripcion: string; image: File;}) {
  if (!data.image) {
    throw new Error("No se recibió una imagen");
  }

  const filePath = `uploads/${randomUUID()}-${data.image.name}`;

  const { error } = await supabase.storage
    .from("imagenesbook")
    .upload(filePath, data.image, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(`Error al subir la imagen: ${error.message}`);
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagenesbook/${filePath}`;

  console.log("📸 Imagen subida:", imageUrl);

  try {
    await db.book.create({
      data: {
        title: data.title,
        descripcion: data.descripcion,
        price: 0,
        imagen: {
          create:{
            url:imageUrl,
          }
        }
      }
    });
  } catch(error){
    throw new Error(`Error al guardar en la base de datos: ${error}`);
  }

  return { message: "Imagen subida con éxito", imageUrl };
}


