"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Buscar..." }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-indigo-950/30 text-white placeholder-indigo-300/50 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-indigo-500/20"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-300/50" />
    </div>
  )
}
