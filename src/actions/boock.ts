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


export async function getBooks() {
  try {
    const books = await db.book.findMany({
      select:{
        title: true,
        Autor:true
        ,
        descripcion: true,
        price: true,
        imagen: {
          select: {
            url: true,
          },
        },
      },
    });
    return books;
  } catch (error) {
    throw new Error(`Error al obtener los libros: ${error}`);
  }
}


export async function DeletedBook(bookId: number) {
  try {
    const book = await db.book.delete({
      where: { id: bookId },
    });
    return book;
  } catch (err) {
    throw new Error(`Error al eliminar el libro: ${err}`);
  }
}



export async function UpdateBook(bookId: number, title: string, descripcion: string, price:number){

  try {
    const book = await db.book.update({
      where: { id: bookId},
      data: {
        title: title,
        descripcion: descripcion,
        price: price
      }
    })
    return book;
  } catch (err) {
    throw new Error(`Error en editar el libro: ${err}`)
  }

}