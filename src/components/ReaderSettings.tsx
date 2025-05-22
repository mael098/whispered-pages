"use client"

import { useState } from "react"
import { Moon, Sun, Type, Bookmark, Settings } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

interface ReaderSettingsProps {
  fontSize: number
  onFontSizeChange: (size: number) => void
  isDarkMode: boolean
  onThemeChange: (isDark: boolean) => void
  onAddBookmark: () => void
  onShowBookmarks: () => void
}

export function ReaderSettings({
  fontSize,
  onFontSizeChange,
  isDarkMode,
  onThemeChange,
  onAddBookmark,
  onShowBookmarks,
}: ReaderSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-indigo-950/90 backdrop-blur-sm p-2 rounded-lg border border-indigo-500/20">
      <Button
        variant="outline"
        size="icon"
        className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
        onClick={onAddBookmark}
      >
        <Bookmark className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
        onClick={onShowBookmarks}
      >
        <Bookmark className="w-4 h-4 fill-current" />
      </Button>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-indigo-600/20 hover:bg-indigo-600/30 text-white"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-indigo-950/90 backdrop-blur-sm border border-indigo-500/20"
        >
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white">Tamaño de fuente</span>
              <Type className="w-4 h-4 text-indigo-300" />
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={([value]) => onFontSizeChange(value)}
              min={14}
              max={24}
              step={1}
              className="mb-4"
            />
          </div>

          <DropdownMenuItem
            className="flex items-center gap-2 text-white hover:bg-indigo-600/30 focus:bg-indigo-600/30"
            onClick={() => onThemeChange(!isDarkMode)}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4" />
                <span>Modo claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span>Modo oscuro</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 