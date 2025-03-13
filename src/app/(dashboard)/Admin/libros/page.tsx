'use client';
import React, { useState } from 'react';
import { Heart, Download, Plus, X } from 'lucide-react';
import Image from 'next/image';

export default function Librospage() {
    const [books, setBooks] = useState([
        { id: 1, title: 'Book Title 1', image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Book Title 2', image: 'https://via.placeholder.com/150' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', image: '' });

    const handleAddBook = () => {
        if (!newBook.title || !newBook.image) return;
        setBooks([...books, { id: books.length + 1, ...newBook }]);
        setNewBook({ title: '', image: '' });
        setShowModal(false);
    };

    return (
        <div className="p-6 flex flex-col items-center">
            {/* Botón para agregar libros */}
            <button
                onClick={() => setShowModal(true)}
                className="mb-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
                <Plus size={20} /> Agregar Libro
            </button>

            {/* Grid de libros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all bg-white"
                    >
                        <div className="relative w-full aspect-[3/4]">
                            <Image
                                src={book.image}
                                alt={`Cover of ${book.title}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-center">{book.title}</h3>
                        <div className="flex justify-between mt-3">
                            <button className="p-2 rounded-full hover:bg-red-100 transition-colors">
                                <Heart className="text-red-500" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-blue-100 transition-colors">
                                <Download className="text-blue-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para añadir libros */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Agregar Nuevo Libro</h2>
                            <button onClick={() => setShowModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Título del libro"
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            className="w-full mt-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="URL de la imagen"
                            value={newBook.image}
                            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
                            className="w-full mt-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddBook}
                            className="w-full bg-green-600 text-white py-2 mt-4 rounded-lg hover:bg-green-700 transition-all"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
