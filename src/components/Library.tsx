"use client"

import { useState } from "react"
import { BookList } from "./BookList"
import { Button } from "./ui/Button"
import Image from "next/image"

import { Book } from "@/types"

interface LibraryProps {
  books: Book[]
  onAddToLibrary?: (book: Book) => void
  onRemoveFromLibrary?: (book: Book) => void
}

export function Library({ books, onAddToLibrary, onRemoveFromLibrary }: LibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [...new Set(books.map(book => book.category)), "all"]

  const filteredBooks = selectedCategory === "all"
    ? books
    : books.filter(book => book.category === selectedCategory)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setShowFilters(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Mi Biblioteca</h1>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {showFilters ? "Ocultar" : "Mostrar"} Filtros
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="text-sm justify-start gap-2"
            >
              {category === "all" ? "Todos" : category}
            </Button>
          ))}
        </div>
      )}

      <BookList
        books={filteredBooks}
        title={`Libros (${filteredBooks.length})`}
        onAddToLibrary={onAddToLibrary}
        onRemoveFromLibrary={onRemoveFromLibrary}
      />

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-white">Historial de Lectura</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books
            .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
            .slice(0, 4)
            .map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-4 p-4 bg-[#121220] rounded-lg"
              >
                <div className="relative w-20 h-30">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-indigo-200 line-clamp-1">{book.author}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
