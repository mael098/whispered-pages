"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ReaderSettings } from "@/components/ReaderSettings"
import { useLibrary } from "@/contexts/LibraryContext"
import { toast } from "sonner"

interface BookReaderProps {
  content: string
  title: string
  onClose: () => void
  bookId: number
}

interface Bookmark {
  id: string
  position: number
  text: string
  createdAt: Date
}

export function BookReader({ content, title, onClose, bookId }: BookReaderProps) {
  const [fontSize, setFontSize] = useState(16)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [showBookmarks, setShowBookmarks] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { updateBookProgress } = useLibrary()

  // Cargar configuración guardada
  useEffect(() => {
    const savedFontSize = localStorage.getItem("reader-font-size")
    const savedTheme = localStorage.getItem("reader-theme")
    const savedBookmarks = localStorage.getItem(`bookmarks-${bookId}`)

    if (savedFontSize) setFontSize(Number(savedFontSize))
    if (savedTheme) setIsDarkMode(savedTheme === "dark")
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks))
  }, [bookId])

  // Guardar configuración
  useEffect(() => {
    localStorage.setItem("reader-font-size", fontSize.toString())
    localStorage.setItem("reader-theme", isDarkMode ? "dark" : "light")
  }, [fontSize, isDarkMode])

  // Guardar marcadores
  useEffect(() => {
    localStorage.setItem(`bookmarks-${bookId}`, JSON.stringify(bookmarks))
  }, [bookmarks, bookId])

  // Actualizar progreso de lectura
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current
      const progress = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
      updateBookProgress(bookId, progress)
    }
  }

  // Añadir marcador
  const handleAddBookmark = () => {
    if (contentRef.current) {
      const selection = window.getSelection()
      if (selection && selection.toString().trim()) {
        const bookmark: Bookmark = {
          id: Date.now().toString(),
          position: contentRef.current.scrollTop,
          text: selection.toString().trim(),
          createdAt: new Date(),
        }
        setBookmarks((prev) => [...prev, bookmark])
        toast.success("Marcador añadido")
      } else {
        toast.error("Selecciona un texto para añadir un marcador")
      }
    }
  }

  // Ir a marcador
  const handleGoToBookmark = (bookmark: Bookmark) => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: bookmark.position,
        behavior: "smooth",
      })
      setShowBookmarks(false)
    }
  }

  // Eliminar marcador
  const handleRemoveBookmark = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId))
    toast.success("Marcador eliminado")
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a18] z-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-indigo-950/90 backdrop-blur-sm border-b border-indigo-500/20 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <Button
          variant="outline"
          size="icon"
          className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className={`absolute inset-0 pt-16 pb-20 px-4 md:px-8 lg:px-16 overflow-y-auto ${
          isDarkMode ? "bg-[#0a0a18] text-white" : "bg-white text-gray-900"
        }`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="max-w-3xl mx-auto py-8">
          {content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Settings */}
      <ReaderSettings
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isDarkMode={isDarkMode}
        onThemeChange={setIsDarkMode}
        onAddBookmark={handleAddBookmark}
        onShowBookmarks={() => setShowBookmarks(!showBookmarks)}
      />

      {/* Bookmarks Panel */}
      {showBookmarks && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-indigo-950/90 backdrop-blur-sm border-l border-indigo-500/20 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Marcadores</h2>
            <Button
              variant="outline"
              size="icon"
              className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
              onClick={() => setShowBookmarks(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {bookmarks.length > 0 ? (
            <div className="space-y-2">
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="bg-indigo-600/20 rounded-lg p-3 text-sm"
                >
                  <p className="text-white mb-2 line-clamp-2">{bookmark.text}</p>
                  <div className="flex items-center justify-between text-xs text-indigo-300">
                    <span>
                      {bookmark.createdAt.toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white h-6 px-2"
                        onClick={() => handleGoToBookmark(bookmark)}
                      >
                        Ir a
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-600/20 hover:bg-red-600/30 text-white h-6 px-2"
                        onClick={() => handleRemoveBookmark(bookmark.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-indigo-300 text-center py-8">
              No hay marcadores guardados
            </p>
          )}
        </div>
      )}
    </div>
  )
} 