'use client'
import { removeToken } from '@/actions/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NavigationUser() {
  const router = useRouter()

  const handleLogout = async () => {
    await removeToken()
    router.push('/login')
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">Inicio</Link>
          <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  )
}
