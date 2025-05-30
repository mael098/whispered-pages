"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search,  Eye } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { BookForm } from "@/components/BookForm"
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
    fullDescription: "El Señor de los Anillos es una novela de fantasía épica...",
    content: "Capítulo 1: Una Reunión Esperada...",
    pages: 1178,
    language: "Español",
    publisher: "Minotauro",
    isbn: "978-84-450-7179-3",
  },
]

export default function AdminBooksPage() {
  const [books, setBooks] = useState(sampleBooks)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [showPreview, setShowPreview] = useState<any>(null)

  useEffect(() => {
    const savedBooks = localStorage.getItem("admin-books")
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("admin-books", JSON.stringify(books))
  }, [books])

  const allCategories = Array.from(
    new Set(books.flatMap(book => book.categories))
  )

  const handleAddBook = () => {
    setEditingBook(null)
    setShowForm(true)
  }

  const handleEditBook = (book: any) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleDeleteBook = (bookId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      setBooks(books.filter(book => book.id !== bookId))
      toast.success("Libro eliminado correctamente")
    }
  }

  const handleSubmit = (data: any) => {
    if (editingBook) {
      setBooks(books.map(book =>
        book.id === editingBook.id ? { ...data, id: book.id } : book
      ))
      toast.success("Libro actualizado correctamente")
    } else {
      const newBook = {
        ...data,
        id: Math.max(...books.map(b => b.id), 0) + 1
      }
      setBooks([...books, newBook])
      toast.success("Libro añadido correctamente")
    }
    setShowForm(false)
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || book.categories.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  if (showForm) {
    return (
      <div className="min-h-screen bg-[#0a0a18] py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">
            {editingBook ? "Editar Libro" : "Añadir Nuevo Libro"}
          </h1>
          <BookForm
            initialData={editingBook}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      </div>
    )
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-[#0a0a18] py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Vista Previa</h1>
            <Button
              onClick={() => setShowPreview(null)}
              className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
            >
              Volver
            </Button>
          </div>
          <div className="bg-indigo-600/20 border border-indigo-500/20 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <img
                  src={showPreview.coverImage}
                  alt={showPreview.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-white">{showPreview.title}</h2>
                <p className="text-indigo-300">{showPreview.author}</p>
                <div className="flex flex-wrap gap-2">
                  {showPreview.categories.map((category: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="prose prose-invert">
                  <p>{showPreview.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a18] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Administrar Libros</h1>
          <Button
            onClick={handleAddBook}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Añadir Libro
          </Button>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar libros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-indigo-600/20 border border-indigo-500/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("")}
              className={`${!selectedCategory
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-600/20 text-indigo-300"
                }`}
            >
              Todos
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => setSelectedCategory(category)}
                className={`${selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-600/20 text-indigo-300"
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de libros */}
        <div className="grid gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-indigo-600/20 border border-indigo-500/20 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{book.title}</h3>
                  <p className="text-indigo-300">{book.author}</p>
                  <div className="flex gap-2 mt-2">
                    {book.categories.map((category, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPreview(book)}
                  className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditBook(book)}
                  className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteBook(book.id)}
                  className="bg-red-600/20 hover:bg-red-600/30 text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 