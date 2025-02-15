'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import { Book, BookOpen, Star, BookMarked, ArrowRight } from "lucide-react";
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary overflow-x-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32 relative">
        <div className="text-center max-w-3xl mx-auto animate slide-up">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 mb-6">
            Descubre Mundos a Través de la Lectura
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explora una biblioteca infinita de historias, conocimiento y aventuras en un solo lugar.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Comenzar Ahora <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Explorar Libros
            </Button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto animate slide-up delay-200">
          <Image
            src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
            alt="Book Collection"
            width={300}
            height={400}
            className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="https://images.unsplash.com/photo-1524578271613-d550eacf6090"
            alt="Reading Time"
            width={300}
            height={400}
            className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 mt-12"
          />
          <Image
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8"
            alt="Library View"
            width={300}
            height={400}
            className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 animate slide-up">Por Qué Elegirnos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-primary" />}
              title="Biblioteca Extensa"
              description="Miles de libros digitales en múltiples géneros y formatos."
            />
            <FeatureCard
              icon={<Star className="w-10 h-10 text-primary" />}
              title="Lecturas Personalizadas"
              description="Recomendaciones basadas en tus preferencias y hábitos de lectura."
            />
            <FeatureCard
              icon={<BookMarked className="w-10 h-10 text-primary" />}
              title="Marcadores Inteligentes"
              description="Guarda tu progreso y retoma la lectura donde la dejaste."
            />
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate slide-right">
              <h2 className="text-3xl font-bold mb-6">Una Nueva Forma de Leer</h2>
              <p className="text-muted-foreground mb-6">
                Disfruta de una experiencia de lectura inmersiva con características diseñadas para los amantes de los libros.
              </p>
              <ul className="space-y-4">
                {[
                  'Modo nocturno para lectura cómoda',
                  'Ajuste de tamaño de texto personalizable',
                  'Sincronización entre dispositivos',
                  'Notas y resaltados en la nube'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate slide-left">
              <Image
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d"
                alt="Reading Experience"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="bg-card rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto animate fade-in">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Comenzar Tu Viaje Literario?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de lectores y descubre historias que transformarán tu mundo.
          </p>
          <Button size="lg" className="gap-2">
            Comienza a Leer <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border hover:shadow-lg transition-all duration-300 animate slide-up">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}