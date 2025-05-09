"use client"

import { Star, Bookmark } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"

interface BookCardProps {
  title: string
  author: string
  coverImage: string
  rating?: number
  onAddToLibrary?: () => void
}

export function BookCard({ title, author, coverImage, rating, onAddToLibrary }: BookCardProps) {
  return (
    <div className="group relative bg-[#121220] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
      {/* Imagen del libro */}
      <div className="relative aspect-square w-full h-full">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Información del libro */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-indigo-200 mb-2">{author}</p>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400" : "text-yellow-400/20"
                }`}
              />
            ))}
          </div>
        )}

        {/* Botón de agregar a biblioteca */}
        {onAddToLibrary && (
          <Button
            variant="outline"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={onAddToLibrary}
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Agregar a Biblioteca
          </Button>
        )}
      </div>
    </div>
  )
}
