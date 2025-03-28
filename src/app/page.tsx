"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/Button"
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

            <p className="text-xl text-indigo-100/80 mb-10 max-w-2xl mx-auto">
              Explora una biblioteca infinita de historias, conocimiento y aventuras en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                      <Button className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-sm hover:bg-white/20 transition-all">
                        Ver más
                      </Button>
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

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(20px) rotate(-5deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; filter: blur(20px); }
          50% { opacity: 0.8; filter: blur(15px); }
        }
        
        @keyframes magic-text-animation {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        .magic-text {
          background-size: 200% auto;
          animation: magic-text-animation 5s linear infinite alternate;
        }
        
        .book-particle {
          position: absolute;
          opacity: 0.2;
          animation: float 20s infinite linear;
        }
        
        .book-particle-small {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.3);
          animation: pulse-glow 3s infinite ease-in-out;
        }
        
        .animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .slide-up {
          transform: translateY(60px);
        }
        
        .slide-right {
          transform: translateX(-60px);
        }
        
        .slide-left {
          transform: translateX(60px);
        }
        
        .fade-in {
          opacity: 0;
        }
        
        .show {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
        
        .delay-200 {
          transition-delay: 0.2s;
        }
        
        /* Book Carousel */
        .book-carousel {
          display: flex;
          gap: 30px;
          padding: 40px 0;
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .book-carousel::-webkit-scrollbar {
          display: none;
        }
        
        .book-item {
          flex: 0 0 auto;
          perspective: 1000px;
        }
        
        .book-cover {
          position: relative;
          width: 240px;
          height: 320px;
          transform-style: preserve-3d;
          transform: rotateY(0deg);
          transition: transform 0.5s ease;
        }
        
        .book-item:hover .book-cover {
          transform: rotateY(35deg);
        }
        
        .book-effect {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 100%;
          transform: translateX(100%) rotateY(90deg);
          transform-origin: left;
          background: linear-gradient(to left, #111, #333);
        }
        
        .book-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 0.5rem;
        }
        
        .book-item:hover .book-overlay {
          opacity: 1;
        }
        
        /* Feature Cards */
        .feature-card {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          background: rgba(30, 30, 60, 0.2);
          border: 1px solid rgba(99, 102, 241, 0.1);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          background: rgba(30, 30, 60, 0.3);
          border-color: rgba(99, 102, 241, 0.3);
          transform: translateY(-5px);
        }
        
        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.2);
          color: #a5b4fc;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover .feature-icon {
          background: rgba(99, 102, 241, 0.3);
          transform: scale(1.1);
        }
        
        .feature-content {
          flex: 1;
        }
        
        .feature-title {
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 4px;
          color: white;
        }
        
        .feature-desc {
          color: rgba(165, 180, 252, 0.8);
          font-size: 14px;
        }
        
        /* 3D Book */
        .book-3d-container {
          position: relative;
          width: 100%;
          height: 400px;
          perspective: 1500px;
        }
        
        .book-3d {
          position: absolute;
          width: 300px;
          height: 400px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateY(30deg) rotateX(10deg);
          transform-style: preserve-3d;
          animation: book-float 6s ease-in-out infinite;
        }
        
        @keyframes book-float {
          0%, 100% { transform: translate(-50%, -50%) rotateY(30deg) rotateX(10deg) translateZ(0); }
          50% { transform: translate(-50%, -50%) rotateY(35deg) rotateX(5deg) translateZ(20px); }
        }
        
        .book-3d-front, .book-3d-back, .book-3d-left, .book-3d-right, .book-3d-top, .book-3d-bottom {
          position: absolute;
          background: #1e1e3a;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        
        .book-3d-front {
          width: 300px;
          height: 400px;
          transform: translateZ(25px);
          overflow: hidden;
          border-radius: 5px 25px 25px 5px;
        }
        
        .book-3d-back {
          width: 300px;
          height: 400px;
          transform: translateZ(-25px) rotateY(180deg);
          border-radius: 25px 5px 5px 25px;
          background: #151530;
        }
        
        .book-3d-left {
          width: 50px;
          height: 400px;
          left: -25px;
          transform: rotateY(-90deg);
          transform-origin: right;
          background: linear-gradient(to right, #151530, #1e1e3a);
        }
        
        .book-3d-right {
          width: 50px;
          height: 400px;
          left: 275px;
          transform: rotateY(90deg);
          transform-origin: left;
          border-radius: 0 15px 15px 0;
          background: #0f0f25;
        }
        
        .book-3d-top {
          width: 300px;
          height: 50px;
          top: -25px;
          transform: rotateX(90deg);
          transform-origin: bottom;
          background: #1e1e3a;
        }
        
        .book-3d-bottom {
          width: 300px;
          height: 50px;
          top: 375px;
          transform: rotateX(-90deg);
          transform-origin: top;
          background: #151530;
        }
        
        .book-shadow {
          position: absolute;
          width: 300px;
          height: 50px;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.3);
          filter: blur(20px);
          border-radius: 50%;
          animation: shadow-pulse 6s ease-in-out infinite;
        }
        
        @keyframes shadow-pulse {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.7; transform: translateX(-50%) scale(1.1); }
        }
        
        .book-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        /* CTA Section */
        .cta-card {
          position: relative;
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          overflow: hidden;
          isolation: isolate;
        }
        
        .cta-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(79, 70, 229, 0.4) 0%, rgba(124, 58, 237, 0.4) 100%);
          z-index: -1;
          border-radius: 24px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          overflow: hidden;
        }
        
        .cta-background::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.5) 0%, transparent 70%);
          animation: pulse-glow 4s infinite ease-in-out;
        }
        
        .cta-background::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237c3aed' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.5;
        }
        
        .cta-content {
          position: relative;
          z-index: 1;
        }
        
        .cta-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #4f46e5, #7c3aed);
          color: white;
          border: none;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.5);
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
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

