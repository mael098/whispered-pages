'use server';
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";
import { db } from "@/lib/prisma";

export async function Bookpost(data: { title: string; descripcion: string; image: File }) {
  if (!data.image) {
    throw new Error("No se recibió una imagen");
  }

  const filePath = `uploads/${randomUUID()}-${data.image.name}`; // Nombre único

  // 🔥 Subir imagen a Supabase Storage directamente sin convertir a ArrayBuffer
  const { error } = await supabase.storage
    .from("imagenesbook") // Usar el bucket correcto
    .upload(filePath, data.image, {
      cacheControl: "3600",
      upsert: true, // Reemplaza si ya existe
    });

  if (error) {
    throw new Error(`Error al subir la imagen: ${error.message}`);
  }

  // 📌 Obtener URL pública de la imagen
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagenesbook/${filePath}`;

  console.log("📸 Imagen subida:", imageUrl);

  // 📝 Guardar en la base de datos
  try {
    await db.book.create({
      data:{
        title:data.title,
        descripcion:data.descripcion,
        imagen:imageUrl,
      }
    });
  } catch{
    throw new Error(`Error al guardar en la base de datos: ${error}`);
  }

  return { message: "Imagen subida con éxito", imageUrl };
}
