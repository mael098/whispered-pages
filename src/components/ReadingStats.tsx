"use client"

import { useLibrary } from "@/contexts/LibraryContext"
import { BookOpen, Clock, Calendar, TrendingUp, Bookmark } from "lucide-react"

export function ReadingStats() {
  const { savedBooks } = useLibrary()

  // Calcular estadísticas
  const totalBooks = savedBooks.length
  const completedBooks = savedBooks.filter(book => book.progress === 100).length
  const inProgressBooks = savedBooks.filter(book => book.progress && book.progress > 0 && book.progress < 100).length
  const notStartedBooks = savedBooks.filter(book => !book.progress || book.progress === 0).length

  // Calcular tiempo total de lectura (estimado)
  const averageReadingTime = 30 // minutos por libro
  const estimatedReadingTime = totalBooks * averageReadingTime

  // Calcular categorías más leídas
  const categoryCount = savedBooks.reduce((acc, book) => {
    book.categories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const topCategories = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-300 mb-2">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-sm font-medium">Total de Libros</h3>
          </div>
          <p className="text-2xl font-bold text-white">{totalBooks}</p>
        </div>

        <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-300 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="text-sm font-medium">Completados</h3>
          </div>
          <p className="text-2xl font-bold text-white">{completedBooks}</p>
        </div>

        <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-300 mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="text-sm font-medium">En Progreso</h3>
          </div>
          <p className="text-2xl font-bold text-white">{inProgressBooks}</p>
        </div>

        <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-300 mb-2">
            <Bookmark className="w-5 h-5" />
            <h3 className="text-sm font-medium">Por Comenzar</h3>
          </div>
          <p className="text-2xl font-bold text-white">{notStartedBooks}</p>
        </div>
      </div>

      {/* Tiempo de Lectura */}
      <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20">
        <div className="flex items-center gap-2 text-indigo-300 mb-2">
          <Clock className="w-5 h-5" />
          <h3 className="text-sm font-medium">Tiempo Estimado de Lectura</h3>
        </div>
        <p className="text-2xl font-bold text-white">
          {estimatedReadingTime} minutos
        </p>
        <p className="text-sm text-indigo-300 mt-1">
          Basado en un promedio de {averageReadingTime} minutos por libro
        </p>
      </div>

      {/* Categorías Populares */}
      <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20">
        <div className="flex items-center gap-2 text-indigo-300 mb-4">
          <Calendar className="w-5 h-5" />
          <h3 className="text-sm font-medium">Categorías Más Leídas</h3>
        </div>
        <div className="space-y-3">
          {topCategories.map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-white">{category}</span>
              <span className="text-indigo-300">{count} libros</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progreso General */}
      <div className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20">
        <h3 className="text-sm font-medium text-indigo-300 mb-4">Progreso General</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white">Libros Completados</span>
            <span className="text-indigo-300">
              {((completedBooks / totalBooks) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-indigo-500/20 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{ width: `${(completedBooks / totalBooks) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 