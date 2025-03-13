'use client'

import { loginUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Loginpage() {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({ email: formData.correo, password: formData.password });
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 p-6 bg-amber-900 text-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >

        <div className="flex flex-col gap-2">
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
  );
}
