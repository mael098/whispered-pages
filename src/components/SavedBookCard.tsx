import Image from "next/image"
import { Star, Calendar, Tag, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useLibrary } from "@/contexts/LibraryContext"
import { toast } from "sonner"

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

interface SavedBookCardProps {
  book: Book
  onClick: () => void
}

export function SavedBookCard({ book, onClick }: SavedBookCardProps) {
  const { removeBook } = useLibrary()

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeBook(book.id)
    toast.success("Libro eliminado de tu biblioteca")
  }

  return (
    <div
      className="bg-indigo-950/30 rounded-xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {book.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500/20">
            <div
              className="h-full bg-indigo-500"
              style={{ width: `${book.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-indigo-300 text-sm mb-2">{book.author}</p>

        <div className="flex items-center gap-2 text-yellow-400 mb-2">
          <Star className="w-4 h-4" />
          <span className="text-sm">{book.rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-2 text-indigo-300 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <span>{book.publishDate}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {book.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs"
            >
              <Tag className="w-3 h-3" />
              {category}
            </span>
          ))}
          {book.categories.length > 2 && (
            <span className="text-indigo-300 text-xs">
              +{book.categories.length - 2}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Leer
          </Button>
          <Button
            variant="outline"
            className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
            onClick={handleRemove}
          >
            Quitar
          </Button>
        </div>
      </div>
    </div>
  )
} 