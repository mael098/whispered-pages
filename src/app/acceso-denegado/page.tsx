import Link from "next/link";

export default function AccesoDenegado() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
                Acceso Denegado
            </h1>
            <p className="text-gray-600">
                No tienes permisos para acceder a esta página.
            </p>
            <Link
                href="/"
                className="mt-4 text-blue-500 hover:underline"
            >
                Volver al inicio
            </Link>
        </div>
    )
}