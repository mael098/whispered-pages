"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { BookOpen, Star, Calendar, User, Tag, ArrowLeft, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { BookReader } from "@/components/BookReader"
import { useLibrary } from "@/contexts/LibraryContext"
import { toast } from "sonner"
import { getBookById } from "@/actions/boock"

interface Book {
  id: number
  title: string
  descripcion: string
  price: number
  Autor: {
    id: number
    name: string
  }[]
  imagen: {
    id: number
    url: string
  }[]
  libCategories: {
    category: {
      id: number
      name: string
    }
  }[]
}

export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showReader, setShowReader] = useState(false)
  const { isBookSaved, addBook, removeBook } = useLibrary()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBook = async () => {
      try {
        const bookId = Number(params.id)
        const fetchedBook = await getBookById(bookId)
        setBook(fetchedBook)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error al cargar el libro")
        toast.error("Error al cargar el libro")
      } finally {
        setLoading(false)
      }
    }

    loadBook()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a18] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-white mt-4">Cargando libro...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-[#0a0a18] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{error || "Libro no encontrado"}</h1>
          <Button onClick={() => window.history.back()} className="bg-indigo-600 hover:bg-indigo-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  if (showReader) {
    return <BookReader content={book.descripcion} title={book.title} onClose={() => setShowReader(false)} bookId={book.id} />
  }

  const handleSaveBook = () => {
    if (isBookSaved(book.id)) {
      removeBook(book.id)
      toast.success("Libro eliminado de tu biblioteca")
    } else {
      addBook({
        id: book.id,
        title: book.title,
        author: book.Autor[0]?.name || "",
        coverImage: book.imagen[0]?.url || "",
        rating: 0,
        publishDate: new Date().toISOString(),
        categories: book.libCategories.map(cat => cat.category.name)
      })
      toast.success("Libro añadido a tu biblioteca")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `¡Mira este libro que encontré: ${book.title} de ${book.Autor[0]?.name}!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("¡Enlace copiado al portapapeles!")
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a18] py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          onClick={() => window.history.back()}
          className="mb-8 bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cover Image */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
              <Image
                src={book.imagen[0]?.url || ""}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover"
                unoptimized={book.imagen[0]?.url?.includes('supabase')}
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
              <div className="flex items-center gap-2 text-indigo-300 mb-4">
                <User className="w-5 h-5" />
                <span className="text-xl">{book.Autor[0]?.name}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-5 h-5" />
                <span className="text-xl">0.0</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-300">
                <Calendar className="w-5 h-5" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {book.libCategories.map((cat, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                >
                  <Tag className="w-4 h-4" />
                  {cat.category.name}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-indigo-200/80 text-lg leading-relaxed">{book.descripcion}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-indigo-500/20">
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">Precio</h3>
                <p className="text-white">${book.price}</p>
              </div>
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">Idioma</h3>
                <p className="text-white">Español</p>
              </div>
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">Editorial</h3>
                <p className="text-white">-</p>
              </div>
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">ISBN</h3>
                <p className="text-white">-</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowReader(true)}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Comenzar a Leer
              </Button>
              <Button
                variant="outline"
                className={`bg-indigo-600/20 hover:bg-indigo-600/30 text-white ${isBookSaved(book.id) ? "bg-indigo-600/40" : ""
                  }`}
                onClick={handleSaveBook}
              >
                <Bookmark className={`w-5 h-5 ${isBookSaved(book.id) ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="outline"
                className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 