"use client"

import { SetStateAction, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar la lógica de búsqueda aquí
    console.log("Buscando:", searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Buscar libros..."
        value={searchTerm}
        onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
        <Search className="w-4 h-4 mr-2" />
        Buscar
      </Button>
    </form>
  )
}
