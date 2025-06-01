"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { BookForm } from "@/components/BookForm"
import { toast } from "sonner"
import Image from "next/image"
import { getBooks, DeletedBook, UpdateBook, Bookpost } from "@/actions/boock"

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

interface BookFormData {
  title: string
  descripcion: string
  image: File
  author: string
  price: number
  categories: string[]
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [showPreview, setShowPreview] = useState<Book | null>(null)

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      const fetchedBooks = await getBooks()
      setBooks(fetchedBooks as Book[])
    } catch (error) {
      toast.error("Error al cargar los libros")
    }
  }

  const allCategories = Array.from(
    new Set(books.flatMap(book => 
      book.libCategories?.map(cat => cat.category.name) || []
    ))
  )

  const handleAddBook = () => {
    setEditingBook(null)
    setShowForm(true)
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleDeleteBook = async (bookId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      try {
        await DeletedBook(bookId)
        await loadBooks()
        toast.success("Libro eliminado correctamente")
      } catch (error) {
        toast.error("Error al eliminar el libro")
      }
    }
  }

  const handleSubmit = async (data: BookFormData) => {
    try {
      if (editingBook) {
        await UpdateBook(editingBook.id, data.title, data.descripcion, data.price)
        toast.success("Libro actualizado correctamente")
      } else {
        await Bookpost(data.title, data.descripcion, data.image, {
          ...data,
          rating: 0,
          publishDate: new Date().toISOString(),
          fullDescription: data.descripcion,
          content: "",
          pages: 0,
          language: "Español",
          publisher: "",
          isbn: ""
        })
        toast.success("Libro añadido correctamente")
      }
      await loadBooks()
      setShowForm(false)
    } catch (error) {
      toast.error("Error al guardar el libro")
    }
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Autor[0]?.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || 
      book.libCategories?.some(cat => cat.category.name === selectedCategory)
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
            initialData={editingBook ? {
              id: editingBook.id,
              title: editingBook.title,
              author: editingBook.Autor[0]?.name || "",
              coverImage: editingBook.imagen[0]?.url || "",
              rating: 0,
              publishDate: new Date().toISOString(),
              categories: editingBook.libCategories?.map(cat => cat.category.name) || [],
              description: editingBook.descripcion,
              fullDescription: editingBook.descripcion,
              content: "",
              pages: 0,
              language: "Español",
              publisher: "",
              isbn: ""
            } : undefined}
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
                <Image
                  width={256}
                  height={384}
                  src={showPreview.imagen[0]?.url || ""}
                  alt={showPreview.title}
                  className="w-full aspect-[2/3] object-cover rounded-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-white">{showPreview.title}</h2>
                <p className="text-indigo-300">{showPreview.Autor[0]?.name}</p>
                <div className="flex flex-wrap gap-2">
                  {showPreview.libCategories?.map((cat, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                    >
                      {cat.category.name}
                    </span>
                  ))}
                </div>
                <div className="prose prose-invert">
                  <p>{showPreview.descripcion}</p>
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
                <Image
                  width={64}
                  height={96}
                  src={book.imagen[0]?.url || ""}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{book.title}</h3>
                  <p className="text-indigo-300">{book.Autor[0]?.name}</p>
                  <div className="flex gap-2 mt-2">
                    {book.libCategories?.map((cat, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
                      >
                        {cat.category.name}
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