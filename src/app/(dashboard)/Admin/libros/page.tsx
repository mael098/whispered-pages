'use client'

import { Bookpost } from '@/actions/boock'; /**server action */
import React, { useState } from 'react';

export default function Page() {
  const [File, setFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="">
      <h1>crea un libro</h1>
      <form className="flex flex-col justify-center items-center" onSubmit={async (e: React.FormEvent) => {
        e.preventDefault()
        if (!File) return
        try {
          const title = (e.target as HTMLFormElement).elements.namedItem('title') as HTMLInputElement;
          const descripcion = (e.target as HTMLFormElement).elements.namedItem('descripcion') as HTMLInputElement;
          const props = {
            title: title.value,
            descripcion: descripcion.value,
            image: File
          }
          await Bookpost(props)
        } catch (error) {
          console.error("Error al enviar el formulario:", error)
        }
      }}>
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="descripcion" placeholder="descripcion" />
        <input type="file" name="image" placeholder="agrega una imagen" onChange={handleFileChange} />
        <button className='bg-amber-400'>envio</button>
      </form>
    </div>
  )
}
