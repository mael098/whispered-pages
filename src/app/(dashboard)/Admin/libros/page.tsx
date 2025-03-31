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

export default function CrearLibroPage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)

      // Create preview URL
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string)
      }
      fileReader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una imagen para el libro",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const title = formData.get("title") as string
      const descripcion = formData.get("descripcion") as string

      if (!title || !descripcion) {
        throw new Error("Todos los campos son obligatorios")
      }

      const props = {
        title,
        descripcion,
        image: file,
      }
      console.log("📸 Enviando datos:", props);


      await Bookpost(title, descripcion, file, props)

      toast({
        title: "¡Éxito!",
        description: "El libro ha sido creado correctamente",
      })

      // Reset form
      setFile(null)
      setFileName("")
      setPreviewUrl(null)
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Ha ocurrido un error al crear el libro",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-amber-500" />
            <CardTitle className="text-2xl">Crear Nuevo Libro</CardTitle>
          </div>
          <CardDescription>Completa el formulario para añadir un nuevo libro a la biblioteca</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Título del libro
              </Label>
              <Input id="title" name="title" placeholder="Ingresa el título del libro" required className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion" className="text-base">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Escribe una breve descripción del libro"
                required
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="image" className="text-base">
                Portada del libro
              </Label>

              <div className="grid gap-6 sm:grid-cols-2">
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
                    "hover:bg-muted/50 cursor-pointer",
                    file
                      ? "border-amber-300 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/20"
                      : "border-muted-foreground/25",
                  )}
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-sm font-medium">
                      {fileName ? (
                        <span className="text-amber-600 dark:text-amber-400">{fileName}</span>
                      ) : (
                        <>
                          <span className="text-primary">Haz clic para subir</span> o arrastra y suelta
                        </>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">PNG, JPG o WEBP (máx. 4MB)</p>
                  </div>

                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </div>

                {previewUrl && (
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg border">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Vista previa de la portada"
                      className="h-full w-full object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Libro"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

