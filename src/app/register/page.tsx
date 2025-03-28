'use client'

import { registerUser } from '@/actions/auth'
import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    correo: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden')
      return
    }
    setError('')
    try {
      await registerUser({
        email: formData.correo,
        password: formData.password,
        username: formData.username
      })
      window.location.href = '/'
      }
      catch (error) {
        console.error("Error en registro:", error)
        setError("Error en registro")
      }
    }
  
    return (
      <div className="flex justify-center  items-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white overflow-x-hidden">
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
          <div className="flex flex-col gap-2">
            <label htmlFor="password2" className="font-medium">Repetir Contraseña:</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className="p-2 border rounded-md text-black"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

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
