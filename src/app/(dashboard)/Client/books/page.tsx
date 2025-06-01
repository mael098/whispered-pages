"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookDetailCard } from "@/components/BookDetailCard"
import { SearchBar } from "@/components/SearchBar"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { getBooks } from "@/actions/boock"
import { toast } from "sonner"

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

export default function BooksPage() {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const fetchedBooks = await getBooks()
        setBooks(fetchedBooks)
      } catch (error) {
        toast.error("Error al cargar los libros")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  // Obtener todas las categorías únicas de los libros
  const categories = Array.from(
    new Set(books.flatMap(book => book.libCategories.map(cat => cat.category.name)))
  )

  const filteredBooks = books.filter(book => {
    const matchesCategory = !selectedCategory ||
      book.libCategories.some(cat => cat.category.name === selectedCategory)

    const matchesSearch = !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Autor[0]?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.descripcion.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a18] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-white mt-4">Cargando libros...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a18] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Biblioteca</h1>
          <p className="text-indigo-200/80">Explora nuestra colección de libros y encuentra tu próxima lectura favorita.</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar libros..."
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </Button>
          </div>

          {/* Filter Categories */}
          {showFilters && (
            <div className="bg-indigo-950/30 rounded-lg p-4 backdrop-blur-sm border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-indigo-400" />
                <h3 className="text-white font-medium">Categorías</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setSelectedCategory(null)}
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
                >
                  Todas
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-indigo-200/80">
            {filteredBooks.length} {filteredBooks.length === 1 ? "libro encontrado" : "libros encontrados"}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid gap-6">
          {filteredBooks.map((book) => (
            <BookDetailCard
              key={book.id}
              title={book.title}
              author={book.Autor[0]?.name || ""}
              coverImage={book.imagen[0]?.url || ""}
              rating={0}
              publishDate={new Date().toLocaleDateString()}
              description={book.descripcion}
              categories={book.libCategories.map(cat => cat.category.name)}
              onReadMore={() => router.push(`/Client/books/${book.id}`)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-indigo-200/80 text-lg">No se encontraron libros que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
} 