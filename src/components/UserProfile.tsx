"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu"
import { LogOut, Settings, User, BookOpen, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const user = {
    name: "Juan Pérez",
    email: "juan@example.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    stats: {
      booksRead: 45,
      booksInLibrary: 123,
      rating: 4.8
    }
  }

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end" forceMount>
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">{user.name}</div>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">{user.stats.booksRead}</div>
                <div className="text-xs text-muted-foreground">
                  <BookOpen className="w-4 h-4 inline-block mr-1" />
                  Libros Leídos
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">{user.stats.booksInLibrary}</div>
                <div className="text-xs text-muted-foreground">
                  <Star className="w-4 h-4 inline-block mr-1" />
                  En Biblioteca
                </div>
              </div>
            </div>
          </div>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="w-4 h-4 mr-2" />
            Mi Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/library")}>
            <BookOpen className="w-4 h-4 mr-2" />
            Mi Biblioteca
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/logout")}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
