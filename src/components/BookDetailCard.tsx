import { BookOpen, Star, Calendar, User, Tag } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/Button"

interface BookDetailCardProps {
  title: string
  author: string
  coverImage: string
  rating: number
  publishDate: string
  description: string
  categories: string[]
  onReadMore: () => void
}

export function BookDetailCard({
  title,
  author,
  coverImage,
  rating,
  publishDate,
  description,
  categories,
  onReadMore,
}: BookDetailCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-indigo-950/50 to-purple-950/50 rounded-xl p-6 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover Image */}
        <div className="relative w-full md:w-48 h-64 rounded-lg overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-indigo-300">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-4 h-4" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-300">
              <Calendar className="w-4 h-4" />
              <span>{publishDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm"
              >
                <Tag className="w-3 h-3" />
                {category}
              </span>
            ))}
          </div>

          <p className="text-indigo-200/80 line-clamp-3">{description}</p>

          <Button
            onClick={onReadMore}
            className="relative group overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Leer más <BookOpen className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
} 