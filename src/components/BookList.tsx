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
}

export function BookList({ books, title, onAddToLibrary }: BookListProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const booksPerPage = 6
  const totalPages = Math.ceil(books.length / booksPerPage)

  const currentBooks = books.slice(
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
