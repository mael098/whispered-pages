"use client"

import { Bookpost } from "@/actions/boock"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/Button"
import { BookOpen, Upload, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utilis"
import Image from "next/image"

export default function CrearLibroPage(props) {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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
          await Bookpost(title, descripcion, File, props)
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

