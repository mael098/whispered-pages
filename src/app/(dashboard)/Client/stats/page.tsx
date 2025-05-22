"use client"

import { ReadingStats } from "@/components/ReadingStats"

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a18] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Estadísticas de Lectura</h1>
        <ReadingStats />
      </div>
    </div>
  )
} 