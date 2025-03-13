'use client'

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">
          Si puedes ver esta página, significa que estás autenticado correctamente.
        </p>
      </div>
    </div>
  )
}
