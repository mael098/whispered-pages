'use server';
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function Bookpost(
  title: string,
  descripcion: string,
  image: File,
  data: {
    title: string;
    descripcion: string;
    image: File;
    author: string;
    rating: number;
    publishDate: string;
    categories: string[];
    fullDescription: string;
    content: string;
    pages: number;
    language: string;
    publisher: string;
    isbn: string;
  }
) {
  if (!data.image) {
    throw new Error("No se recibió una imagen");
  }

  // Check if book with same title already exists
  const existingBook = await db.book.findUnique({
    where: { title: data.title }
  });

  if (existingBook) {
    throw new Error("Ya existe un libro con ese título");
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
    const book = await db.book.create({
      data: {
        title: data.title,
        descripcion: data.descripcion,
        price: 0,
        imagen: {
          create: {
            url: imageUrl,
          }
        },
        Autor: {
          create: {
            name: data.author
          }
        },
        // Aquí agregaremos las categorías si existen
        ...(data.categories.length > 0 && {
          libCategories: {
            create: data.categories.map(category => ({
              category: {
                connectOrCreate: {
                  where: { name: category },
                  create: { name: category }
                }
              }
            }))
          }
        })
      }
    });
    return { message: "Libro creado con éxito", book };
  } catch(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error("Ya existe un libro con ese título");
      }
    }
    throw new Error(`Error al guardar en la base de datos: ${error}`);
  }
}


export async function getBooks() {
  try {
    const books = await db.book.findMany({
      include: {
        Autor: true,
        imagen: true,
        libCategories: {
          include: {
            category: true
          }
        }
      }
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

export async function getBookById(bookId: number) {
  try {
    const book = await db.book.findUnique({
      where: { id: bookId },
      include: {
        Autor: true,
        imagen: true,
        libCategories: {
          include: {
            category: true
          }
        }
      }
    });

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return book;
  } catch (error) {
    throw new Error(`Error al obtener el libro: ${error}`);
  }
}