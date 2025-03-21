'use server';

import { supabase } from "@/lib/supabase";


export const DownloadBook = async (filePath:string) => {
  const {data,error} = await supabase.storage.from('books').list(filePath);
  if (error) {
    console.error('Error al listar archivos:', error);
  } else {
    console.log('Archivos:', data);
  }

}