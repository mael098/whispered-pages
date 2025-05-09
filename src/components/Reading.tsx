"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/Button"
import { ChevronLeft, ChevronRight, Bookmark, Star, Share2 } from "lucide-react"

interface ReadingProps {
  book: {
    title: string
    author: string
    coverImage: string
    content: string
    progress: number
  }
}

export function Reading({ book }: ReadingProps) {
  const [isReading, setIsReading] = useState(false)
  const [progress, setProgress] = useState(book.progress)
  const [currentChapter, setCurrentChapter] = useState(0)

  useEffect(() => {
    if (isReading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.1
          return newProgress > 100 ? 100 : newProgress
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isReading])

  const chapters = book.content.split("\n\n")

  return (
    <div className="relative h-full">
      {/* Fondo de lectura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] to-[#121220] z-0"></div>

      {/* Barra superior */}
      <div className="sticky top-0 z-10 bg-[#121220]/90 backdrop-blur-md p-4 border-b border-indigo-800/50">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setIsReading(false)}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="mt-2">
          <h1 className="text-xl font-bold text-white">{book.title}</h1>
          <p className="text-sm text-indigo-200">{book.author}</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl opacity-30"></div>
          <div className="relative">
            <p className="text-lg text-white leading-relaxed">
              {chapters[currentChapter]}
            </p>
          </div>
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentChapter((prev) => Math.max(0, prev - 1))}
            disabled={currentChapter === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentChapter((prev) => Math.min(chapters.length - 1, prev + 1))}
            disabled={currentChapter === chapters.length - 1}
          >
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Barra de progreso */}
        <div className="mt-6">
          <div className="relative h-2 rounded-full bg-indigo-800">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-indigo-200 mt-2">
            <span>{Math.round(progress)}%</span>
            <span>{(100 - Math.round(progress))}%</span>
          </div>
        </div>
      </div>

      {/* Botón flotante de lectura */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsReading(!isReading)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="sr-only">{isReading ? "Pausar lectura" : "Comenzar lectura"}</span>
          <span className="text-xl">{isReading ? "⏸" : "▶"}</span>
        </Button>
      </div>
    </div>
  )
}
