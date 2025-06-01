"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { toast } from "sonner"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { Bookpost } from "@/actions/boock"

interface BookFormProps {
  initialData?: {
    id?: number
    title: string
    author: string
    coverImage: string
    rating: number
    publishDate: string
    categories: string[]
    description: string
    fullDescription: string
    content: string
    pages: number
    language: string
    publisher: string
    isbn: string
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function BookForm({ initialData, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImage: "",
    rating: 0,
    publishDate: "",
    categories: [] as string[],
    description: "",
    fullDescription: "",
    content: "",
    pages: 0,
    language: "",
    publisher: "",
    isbn: "",
  })

  const [newCategory, setNewCategory] = useState("")

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validación básica
    if (!formData.title || !formData.author || !formData.coverImage) {
      toast.error("Por favor completa los campos requeridos")
      return
    }

    try {
      // Convertir la imagen base64 a File
      const imageFile = await fetch(formData.coverImage)
        .then(res => res.blob())
        .then(blob => new File([blob], "cover.jpg", { type: "image/jpeg" }))

      const result = await Bookpost(
        formData.title,
        formData.description,
        imageFile,
        {
          title: formData.title,
          descripcion: formData.description,
          image: imageFile,
          author: formData.author,
          rating: formData.rating,
          publishDate: formData.publishDate,
          categories: formData.categories,
          fullDescription: formData.fullDescription,
          content: formData.content,
          pages: formData.pages,
          language: formData.language,
          publisher: formData.publisher,
          isbn: formData.isbn
        }
      )

      toast.success("Libro creado exitosamente")
      onSubmit(formData)
    } catch (error) {
      toast.error("Error al crear el libro: " + (error as Error).message)
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }))
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Aquí normalmente subirías la imagen a un servicio como Cloudinary o similar
      // Por ahora, usaremos una URL temporal
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          coverImage: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Básica */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Autor *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Portada del Libro *
            </label>
            <div className="flex items-center gap-4">
              {formData.coverImage && (
                <div className="relative w-24 h-36">
                  <Image
                    width={96}
                    height={144}
                    src={formData.coverImage}
                    alt="Portada"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-indigo-500/20 border-dashed rounded-lg cursor-pointer bg-indigo-600/20 hover:bg-indigo-600/30">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-indigo-300" />
                    <p className="mb-2 text-sm text-indigo-300">
                      <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-indigo-300/80">
                      PNG, JPG o WEBP (MAX. 2MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Calificación
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
              className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Información Adicional */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Fecha de Publicación
            </label>
            <input
              type="text"
              value={formData.publishDate}
              onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
              className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Categorías
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nueva categoría"
              />
              <Button
                type="button"
                onClick={handleAddCategory}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Añadir
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Páginas
            </label>
            <input
              type="number"
              value={formData.pages}
              onChange={(e) => setFormData(prev => ({ ...prev, pages: parseInt(e.target.value) }))}
              className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-300 mb-1">
              Idioma
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Descripciones */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">
            Descripción Corta
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">
            Descripción Completa
          </label>
          <textarea
            value={formData.fullDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
            rows={5}
            className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">
            Contenido del Libro
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={10}
            className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
        >
          {initialData?.id ? "Actualizar Libro" : "Publicar Libro"}
        </Button>
      </div>
    </form>
  )
} 