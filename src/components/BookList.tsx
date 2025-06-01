"use client"

import { useState } from "react"
import { BookCard } from "./BookCard"
import { Button } from "./ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Book } from "@/types"

interface BookListProps {
  books: Book[]
  title: string
  onAddToLibrary?: (book: Book) => void
  onRemoveFromLibrary?: (book: Book) => void
  searchTerm?: string
  filters?: {
    category?: string
    language?: string
    rating?: string
    sortBy?: string
  }
}

export function BookList({ books, title, onAddToLibrary, searchTerm, filters }: BookListProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const booksPerPage = 6

  // Filtrar libros según los criterios
  const filteredBooks = books.filter((book) => {
    // Filtrar por término de búsqueda
    const matchesSearch = searchTerm
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    // Filtrar por categoría
    const matchesCategory = !filters?.category || book.category === filters.category

    // Filtrar por idioma
    const matchesLanguage = !filters?.language || book.language === filters.language

    // Filtrar por calificación
    const matchesRating = !filters?.rating ||
      (filters.rating === "5" ? (book.rating ?? 0) === 5 :
      filters.rating === "4" ? (book.rating ?? 0) >= 4 :
      (book.rating ?? 0) >= 3)

    return matchesSearch && matchesCategory && matchesLanguage && matchesRating
  })

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

  // Ordenar libros según el criterio seleccionado
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!filters?.sortBy) return 0

    switch (filters.sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "author":
        return a.author.localeCompare(b.author)
      case "rating":
        return (b.rating ?? 0) - (a.rating ?? 0)
      case "date":
        if (!a.publicationDate || !b.publicationDate) return 0
        return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
      default:
        return 0
    }
  })

  const currentBooks = sortedBooks.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage
  )

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Button variant="outline" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Ver todos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            coverImage={book.coverImage}
            rating={book.rating}
            onAddToLibrary={() => onAddToLibrary?.(book)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages - 1}
          >
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
