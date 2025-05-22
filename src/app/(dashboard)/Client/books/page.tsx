"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookDetailCard } from "@/components/BookDetailCard"
import { SearchBar } from "@/components/SearchBar"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"

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
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://i.pinimg.com/736x/88/2d/99/882d997fa46b928ce004e7f1f48c8f6d.jpg",
    rating: 4.5,
    publishDate: "1949",
    description: "Una distopía que presenta una sociedad totalitaria donde el pensamiento individual es un crimen y la vigilancia es constante.",
    categories: ["Distopía", "Ciencia Ficción", "Política"],
  },
  {
    id: 3,
    title: "Cien Años de Soledad",
    author: "Gabriel García Márquez",
    coverImage: "https://i.pinimg.com/736x/c2/b1/f5/c2b1f556401d124fa0cccf7c9c73aa72.jpg",
    rating: 4.9,
    publishDate: "1967",
    description: "La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
    categories: ["Realismo Mágico", "Literatura Latinoamericana"],
  },
]

export default function BooksPage() {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const categories = Array.from(new Set(sampleBooks.flatMap(book => book.categories)))

  const filteredBooks = sampleBooks.filter(book => {
    const matchesCategory = !selectedCategory || book.categories.includes(selectedCategory)
    const matchesSearch = !searchQuery || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
              <SearchBar onSearch={setSearchQuery} />
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
              author={book.author}
              coverImage={book.coverImage}
              rating={book.rating}
              publishDate={book.publishDate}
              description={book.description}
              categories={book.categories}
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