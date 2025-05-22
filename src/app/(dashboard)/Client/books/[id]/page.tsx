"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { BookOpen, Star, Calendar, User, Tag, ArrowLeft, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { BookReader } from "@/components/BookReader"
import { useLibrary } from "@/contexts/LibraryContext"
import { toast } from "sonner"

// Datos de ejemplo - Esto debería venir de tu base de datos
const sampleBooks = [
  {
    id: 1,
    title: "El Señor de los Anillos",
    author: "J.R.R. Tolkien",
    coverImage: "https://i.pinimg.com/736x/36/b1/b6/36b1b62cd8580ffcf3dd351d3d15c237.jpg",
    rating: 4.8,
    publishDate: "1954",
    description: "Una épica historia de fantasía que sigue las aventuras de Frodo Bolsón y la Comunidad del Anillo en su misión para destruir el Anillo Único.",
    categories: ["Fantasía", "Aventura", "Clásico"],
    fullDescription: `El Señor de los Anillos es una novela de fantasía épica escrita por J.R.R. Tolkien. La historia se desarrolla en la Tierra Media, un mundo ficticio poblado por hombres y otras razas humanoides, como hobbits, elfos, enanos y orcos.

La novela sigue la misión del hobbit Frodo Bolsón para destruir el Anillo Único y así derrotar a su creador, el Señor Oscuro Sauron. El Anillo Único fue creado por Sauron para dominar a los demás Anillos de Poder y corromper a sus portadores.

La historia comienza cuando Frodo hereda el Anillo de su tío Bilbo Bolsón. Gandalf el Gris, un mago, descubre que el Anillo es en realidad el Anillo Único de Sauron. Frodo debe emprender un viaje peligroso para destruir el Anillo en el Monte del Destino, el único lugar donde puede ser destruido.

Durante su viaje, Frodo es acompañado por varios compañeros, incluyendo a su fiel amigo Sam Gamyi, el elfo Legolas, el enano Gimli, el humano Aragorn, y otros miembros de la Comunidad del Anillo. Juntos, deben enfrentar numerosos peligros y tentaciones mientras intentan cumplir su misión.`,
    content: `Capítulo 1: Una Reunión Esperada

En un agujero en el suelo vivía un hobbit. No un agujero húmedo, sucio, repugnante, con restos de gusanos y olor a fango, ni tampoco un agujero seco, desnudo y arenoso, sin nada en que sentarse o que comer: era un agujero-hobbit, y eso significa comodidad.

Tenía una puerta redonda y perfecta como un ojo de buey, pintada de verde, con un brillante tirador de latón amarillo exactamente en el centro. La puerta se abría a un vestíbulo en forma de tubo como un túnel: un túnel muy cómodo, sin humo, con paredes revestidas de paneles y suelos de baldosas y alfombras, provisto de sillas pulidas y montones y montones de percheros para sombreros y abrigos -el hobbit era aficionado a las visitas-. El túnel se extendía y serpenteaba y seguía adelante bastante recto, pero no por mucho tiempo, y el hobbit no sabía ni le importaba adónde iba.`,
    pages: 1178,
    language: "Español",
    publisher: "Minotauro",
    isbn: "978-84-450-7179-3",
  },
]

export default function BookDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showReader, setShowReader] = useState(false)
  const { isBookSaved, addBook, removeBook } = useLibrary()
  const book = sampleBooks.find((b) => b.id === Number(params.id))

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0a0a18] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Libro no encontrado</h1>
          <Button onClick={() => window.history.back()} className="bg-indigo-600 hover:bg-indigo-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  if (showReader) {
    return <BookReader content={book.content} title={book.title} onClose={() => setShowReader(false)} bookId={book.id} />
  }

  const handleSaveBook = () => {
    if (isBookSaved(book.id)) {
      removeBook(book.id)
      toast.success("Libro eliminado de tu biblioteca")
    } else {
      addBook(book)
      toast.success("Libro añadido a tu biblioteca")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `¡Mira este libro que encontré: ${book.title} de ${book.author}!`,
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
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
              <div className="flex items-center gap-2 text-indigo-300 mb-4">
                <User className="w-5 h-5" />
                <span className="text-xl">{book.author}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-5 h-5" />
                <span className="text-xl">{book.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-300">
                <Calendar className="w-5 h-5" />
                <span>{book.publishDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {book.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                >
                  <Tag className="w-4 h-4" />
                  {category}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-indigo-200/80 text-lg leading-relaxed">{book.fullDescription}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-indigo-500/20">
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">Páginas</h3>
                <p className="text-white">{book.pages}</p>
              </div>
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">Idioma</h3>
                <p className="text-white">{book.language}</p>
              </div>
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">Editorial</h3>
                <p className="text-white">{book.publisher}</p>
              </div>
              <div>
                <h3 className="text-indigo-300 text-sm mb-1">ISBN</h3>
                <p className="text-white">{book.isbn}</p>
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
                className={`bg-indigo-600/20 hover:bg-indigo-600/30 text-white ${
                  isBookSaved(book.id) ? "bg-indigo-600/40" : ""
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