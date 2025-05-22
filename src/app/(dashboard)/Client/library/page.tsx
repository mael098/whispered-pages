"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SavedBookCard } from "@/components/SavedBookCard"
import { SearchBar } from "@/components/SearchBar"
import { useLibrary } from "@/contexts/LibraryContext"
import { BookOpen, Filter } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function LibraryPage() {
  const router = useRouter()
  const { savedBooks } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Obtener todas las categorías únicas de los libros guardados
  const categories = Array.from(
    new Set(savedBooks.flatMap((book) => book.categories))
  )

  // Filtrar libros basado en la búsqueda y categoría seleccionada
  const filteredBooks = savedBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === null || book.categories.includes(selectedCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#0a0a18] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mi Biblioteca</h1>
            <p className="text-indigo-300">
              {savedBooks.length} {savedBooks.length === 1 ? "libro" : "libros"} guardados
            </p>
          </div>
          <Button
            onClick={() => router.push("/Client/books")}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Explorar Libros
          </Button>
        </div>

        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en tu biblioteca..."
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-300" />
            <h2 className="text-lg font-semibold text-white">Filtrar por categoría</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className={`${
                selectedCategory === null
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className={`${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <SavedBookCard
                key={book.id}
                book={book}
                onClick={() => router.push(`/Client/books/${book.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">
              {savedBooks.length === 0
                ? "Tu biblioteca está vacía"
                : "No se encontraron libros"}
            </h3>
            <p className="text-indigo-300 mb-6">
              {savedBooks.length === 0
                ? "Comienza a guardar libros para verlos aquí"
                : "Intenta con otra búsqueda o filtro"}
            </p>
            {savedBooks.length === 0 && (
              <Button
                onClick={() => router.push("/Client/books")}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explorar Libros
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 