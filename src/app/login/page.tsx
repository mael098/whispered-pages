'use client'

import { useState } from 'react'

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        correo: '',
        password: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Datos enviados:', formData)

    }

    return (
        <div className="flex min-h-screen w-screen justify-center items-center bg-gray-100">
            <form
                className="flex flex-col gap-4 p-6 bg-amber-900 text-white rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="font-medium">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="p-2 border rounded-md text-black"
                    />

                    <label htmlFor="correo" className="font-medium">Correo:</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        className="p-2 border rounded-md text-black"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-medium">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-2 border rounded-md text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    )
}
