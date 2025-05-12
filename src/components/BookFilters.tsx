"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Button } from "@/components/ui/Button"
import { ChevronDown } from "lucide-react"

interface BookFiltersProps {
  onApplyFilters: (filters: {
    category?: string
    language?: string
    rating?: string
    sortBy?: string
  }) => void
}

export function BookFilters({ onApplyFilters }: BookFiltersProps) {
  const [category, setCategory] = useState("")
  const [language, setLanguage] = useState("")
  const [rating, setRating] = useState("")
  const [sortBy, setSortBy] = useState("")

  interface SelectOption {
    value: string
    label: string
  }

  const categories: SelectOption[] = [
    { value: "", label: "Todas las categorías" },
    { value: "novela", label: "Novela" },
    { value: "ciencia", label: "Ciencia" },
    { value: "historia", label: "Historia" },
    { value: "fantasia", label: "Fantasía" },
  ]

  const languages: SelectOption[] = [
    { value: "", label: "Todos los idiomas" },
    { value: "es", label: "Español" },
    { value: "en", label: "Inglés" },
    { value: "fr", label: "Francés" },
    { value: "de", label: "Alemán" },
  ]

  const ratings: SelectOption[] = [
    { value: "", label: "Todas las calificaciones" },
    { value: "5", label: "5 estrellas" },
    { value: "4", label: "4 estrellas o más" },
    { value: "3", label: "3 estrellas o más" },
  ]

  const sortOptions: SelectOption[] = [
    { value: "", label: "Ordenar por" },
    { value: "title", label: "Título" },
    { value: "author", label: "Autor" },
    { value: "rating", label: "Calificación" },
    { value: "date", label: "Fecha de publicación" },
  ]

  const applyFilters = () => {
    onApplyFilters({
      category,
      language,
      rating,
      sortBy,
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#121220] rounded-xl">
      <Select
        value={category}
        onValueChange={(value) => setCategory(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={language}
        onValueChange={(value) => setLanguage(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Idioma" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={rating}
        onValueChange={(value) => setRating(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Calificación" />
        </SelectTrigger>
        <SelectContent>
          {ratings.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) => setSortBy(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        onClick={applyFilters}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        <ChevronDown className="w-4 h-4 mr-2" />
        Aplicar filtros
      </Button>
    </div>
  )
}
