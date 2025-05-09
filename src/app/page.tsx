"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { SearchBar } from "@/components/SearchBar"
import { BookCard } from "@/components/BookCard"
import { Book, BookOpen, Star, BookMarked, ArrowRight, Sparkles, BookText, Bookmark } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  const handleButtonClick = () => {
    router.push("/Admin")
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll(".animate").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a18]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a18]"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="book-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            >
              <BookText className="text-indigo-500/20" style={{ fontSize: `${20 + Math.random() * 30}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/20 blur-[100px]"
            style={{
              transform: `translate(-50%, ${scrollY * 0.2}px) scale(${1 + scrollY * 0.0005})`,
              opacity: Math.max(0.2, 1 - scrollY * 0.001),
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 pt-24 pb-36 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate slide-up">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-md opacity-75 animate-pulse"></div>
                <div className="relative bg-[#0a0a18] p-3 rounded-full">
                  <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-purple-300 magic-text">
              Descubre Mundos a Través de la Lectura
            </h1>

            <p className="text-xl text-indigo-100/80 mb-8 max-w-2xl mx-auto">
              Explora una biblioteca infinita de historias, conocimiento y aventuras en un solo lugar.
            </p>

            {/* Barra de búsqueda */}
            <div className="mb-8">
              <SearchBar />
            </div>

            {/* Sección de libros destacados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <BookCard
                title="El Señor de los Anillos"
                author="J.R.R. Tolkien"
                coverImage="/books/lotr.jpg"
                rating={4.8}
              />
              <BookCard
                title="1984"
                author="George Orwell"
                coverImage="/books/1984.jpg"
                rating={4.5}
              />
              <BookCard
                title="Cien Años de Soledad"
                author="Gabriel García Márquez"
                coverImage="/books/100years.jpg"
                rating={4.9}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button
                onClick={handleButtonClick}
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 text-lg hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Comenzar Ahora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>

              <Button className="relative overflow-hidden rounded-full bg-transparent border border-indigo-500/30 text-indigo-300 px-8 py-4 text-lg hover:border-indigo-400 hover:text-indigo-200 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">Explorar Libros</span>
                <span className="absolute inset-0 bg-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>

          <div className="mt-24 relative">
            <div className="book-carousel">
              {[
                { src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e", title: "Colecciones Curadas" },
                { src: "https://images.unsplash.com/photo-1524578271613-d550eacf6090", title: "Tiempo de Lectura" },
                { src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8", title: "Vista de Biblioteca" },
                { src: "https://images.unsplash.com/photo-1589998059171-988d887df646", title: "Libros Populares" },
                { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6", title: "Clásicos Literarios" },
              ].map((book, index) => (
                <div key={index} className="book-item">
                  <div className="book-cover">
                    <div className="book-effect"></div>
                    <Image
                      src={book.src || "/placeholder.svg"}
                      alt={book.title}
                      width={240}
                      height={320}
                      className="rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    />
                    <div className="book-overlay">
                      <h3 className="text-xl font-bold">{book.title}</h3>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Explorar Biblioteca
                        </Button>
                        <Button variant="outline" className="bg-indigo-600/10 hover:bg-indigo-700/20 text-white">
                          Ver más
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-indigo-400 flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-indigo-950/40 to-[#0a0a18] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate slide-up">
            <h2 className="inline-block text-4xl font-bold relative text-white mb-4">
              Por Qué Elegirnos
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
            </h2>
            <p className="text-indigo-200/70 max-w-2xl mx-auto text-lg">
              Nuestra plataforma ofrece una experiencia de lectura única y personalizada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCardGlass
              icon={<BookOpen className="w-10 h-10 text-indigo-400" />}
              title="Biblioteca Extensa"
              description="Miles de libros digitales en múltiples géneros y formatos para todos los gustos y edades."
            />
            <FeatureCardGlass
              icon={<Star className="w-10 h-10 text-indigo-400" />}
              title="Lecturas Personalizadas"
              description="Recomendaciones inteligentes basadas en tus preferencias y hábitos de lectura."
              highlighted={true}
            />
            <FeatureCardGlass
              icon={<BookMarked className="w-10 h-10 text-indigo-400" />}
              title="Marcadores Inteligentes"
              description="Guarda tu progreso y retoma la lectura exactamente donde la dejaste en cualquier dispositivo."
            />
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="relative z-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a18] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate slide-right">
              <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Una Nueva Forma de Leer
              </h2>
              <p className="text-indigo-100/80 text-lg mb-10">
                Disfruta de una experiencia de lectura inmersiva con características diseñadas para los verdaderos
                amantes de los libros.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Bookmark />,
                    title: "Modo nocturno para lectura cómoda",
                    desc: "Perfecto para leer en cualquier ambiente y hora del día",
                  },
                  {
                    icon: <BookText />,
                    title: "Ajuste de texto personalizable",
                    desc: "Cambia el tamaño, fuente y espaciado a tu gusto",
                  },
                  {
                    icon: <Sparkles />,
                    title: "Sincronización perfecta",
                    desc: "Tu progreso se guarda en todos tus dispositivos",
                  },
                  {
                    icon: <Book />,
                    title: "Notas y resaltados",
                    desc: "Marca tus pasajes favoritos y toma notas mientras lees",
                  },
                ].map((feature, index) => (
                  <div key={index} className="feature-card group">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate slide-left relative">
              <div className="book-3d-container">
                <div className="book-3d">
                  <div className="book-3d-front">
                    <Image
                      src="https://images.unsplash.com/photo-1553729459-efe14ef6055d"
                      alt="Reading Experience"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="book-3d-back"></div>
                  <div className="book-3d-left"></div>
                  <div className="book-3d-right"></div>
                  <div className="book-3d-top"></div>
                  <div className="book-3d-bottom"></div>
                </div>

                <div className="book-shadow"></div>

                <div className="book-particles">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="book-particle-small"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          <div className="cta-card animate fade-in">
            <div className="cta-background"></div>
            <div className="cta-content">
              <h2 className="text-4xl font-bold mb-6 text-white">¿Listo para Comenzar Tu Viaje Literario?</h2>
              <p className="text-indigo-100/80 mb-10 max-w-2xl mx-auto text-lg">
                Únete a nuestra comunidad de lectores y descubre historias que transformarán tu mundo. El primer mes es
                completamente gratis.
              </p>
              <Button className="cta-button">
                <span className="relative z-10 flex items-center gap-2">
                  Comienza a Leer <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function FeatureCardGlass({
  icon,
  title,
  description,
  highlighted = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  highlighted?: boolean
}) {
  return (
    <div
      className={`relative group rounded-2xl p-8 overflow-hidden animate slide-up ${highlighted ? "z-10 transform-gpu scale-105" : ""
        }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/20 backdrop-blur-md border border-indigo-500/20 rounded-2xl z-0"></div>

      {highlighted && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}

      <div className="relative z-10">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-xl inline-block">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-indigo-200/70">{description}</p>
      </div>

      {highlighted && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
          Popular
        </div>
      )}
    </div>
  )
}

