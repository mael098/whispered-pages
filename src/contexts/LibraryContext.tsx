"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface Book {
  id: number
  title: string
  author: string
  coverImage: string
  rating: number
  publishDate: string
  categories: string[]
  lastRead?: Date
  progress?: number
}

interface LibraryContextType {
  savedBooks: Book[]
  addBook: (book: Book) => void
  removeBook: (bookId: number) => void
  isBookSaved: (bookId: number) => boolean
  updateBookProgress: (bookId: number, progress: number) => void
  clearLibrary: () => void
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined)

const STORAGE_KEY = "whispered-pages-library"

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [savedBooks, setSavedBooks] = useState<Book[]>([])

  // Cargar libros guardados al iniciar
  useEffect(() => {
    const loadSavedBooks = () => {
      try {
        const storedBooks = localStorage.getItem(STORAGE_KEY)
        if (storedBooks) {
          const parsedBooks = JSON.parse(storedBooks)
          // Convertir las fechas de string a Date
          const booksWithDates = parsedBooks.map((book: any) => ({
            ...book,
            lastRead: book.lastRead ? new Date(book.lastRead) : undefined,
          }))
          setSavedBooks(booksWithDates)
        }
      } catch (error) {
        console.error("Error loading saved books:", error)
      }
    }

    loadSavedBooks()
  }, [])

  // Guardar libros cuando cambian
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBooks))
    } catch (error) {
      console.error("Error saving books:", error)
    }
  }, [savedBooks])

  const addBook = (book: Book) => {
    setSavedBooks((prev) => {
      if (!prev.find((b) => b.id === book.id)) {
        return [...prev, { ...book, lastRead: new Date(), progress: 0 }]
      }
      return prev
    })
  }

  const removeBook = (bookId: number) => {
    setSavedBooks((prev) => prev.filter((book) => book.id !== bookId))
  }

  const isBookSaved = (bookId: number) => {
    return savedBooks.some((book) => book.id === bookId)
  }

  const updateBookProgress = (bookId: number, progress: number) => {
    setSavedBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? { ...book, progress, lastRead: new Date() }
          : book
      )
    )
  }

  const clearLibrary = () => {
    setSavedBooks([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <LibraryContext.Provider
      value={{
        savedBooks,
        addBook,
        removeBook,
        isBookSaved,
        updateBookProgress,
        clearLibrary,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider")
  }
  return context
} 