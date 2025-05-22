"use client"

import { useState } from "react"
import { useLibrary } from "@/contexts/LibraryContext"
import { BookOpen, Clock, TrendingUp, Bookmark, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"

export default function ClientDashboard() {
  const { savedBooks } = useLibrary()

  // Calcular estadísticas
  const totalBooks = savedBooks.length
  const completedBooks = savedBooks.filter(book => book.progress === 100).length
  const inProgressBooks = savedBooks.filter(book => book.progress && book.progress > 0 && book.progress < 100).length
  const notStartedBooks = savedBooks.filter(book => !book.progress || book.progress === 0).length

  // Obtener libros recientes
  const recentBooks = [...savedBooks]
    .sort((a, b) => (b.lastRead?.getTime() || 0) - (a.lastRead?.getTime() || 0))
    .slice(0, 4)

  // Obtener libros en progreso
  const inProgress = savedBooks
    .filter(book => book.progress && book.progress > 0 && book.progress < 100)
    .sort((a, b) => (b.progress || 0) - (a.progress || 0))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[#0a0a18] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenido a tu Biblioteca</h1>
          <p className="text-indigo-300">Gestiona tus libros y sigue tu progreso de lectura</p>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

        {/* Libros en Progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Continuar Leyendo</h2>
            <Link href="/Client/library" className="text-indigo-300 hover:text-white flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {inProgress.map((book) => (
              <Link
                key={book.id}
                href={`/Client/books/${book.id}`}
                className="bg-indigo-600/20 rounded-lg p-4 border border-indigo-500/20 hover:bg-indigo-600/30 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="relative w-20 h-28">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{book.title}</h3>
                    <p className="text-sm text-indigo-300 mb-2">{book.author}</p>
                    <div className="w-full bg-indigo-500/20 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-indigo-300 mt-1">{book.progress}% completado</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Libros Recientes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Libros Recientes</h2>
            <Link href="/Client/library" className="text-indigo-300 hover:text-white flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {recentBooks.map((book) => (
              <Link
                key={book.id}
                href={`/Client/books/${book.id}`}
                className="bg-indigo-600/20 rounded-lg overflow-hidden border border-indigo-500/20 hover:bg-indigo-600/30 transition-colors"
              >
                <div className="relative aspect-[2/3]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-indigo-300 line-clamp-1">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
