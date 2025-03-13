'use client'
import { useState } from 'react'
import { loginUser } from '@/actions/auth'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await loginUser({ email, password })
        } catch (error) {
            console.error('Error en login:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6">
            <h1 className="text-2xl mb-4">Iniciar Sesión</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full p-2 mb-4 border rounded"
            />
            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
            >
                Iniciar Sesión
            </button>
        </form>
    )
} 