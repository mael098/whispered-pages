'use client'
import { useState } from "react";
import Image from 'next/image';

export default function NewPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    image: null as File | null,
    category: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (formData.image) data.append("image", formData.image);
    data.append("category", formData.category);
    if (formData.file) data.append("file", formData.file);

    // Imprimir los datos del formulario en la consola
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  return (
    <main>
      <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded text-black" onSubmit={handleSubmit}>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="file"
          name="image"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="file"
          name="file"
          onChange={handleChange}
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 p-4 bg-gray-100 rounded text-black">
        <h2 className="text-lg font-semibold mb-2">Form Data Preview:</h2>
        <p><strong>Title:</strong> {formData.title}</p>
        <p><strong>Author:</strong> {formData.author}</p>
        <p><strong>Description:</strong> {formData.description}</p>
        <p><strong>Price:</strong> {formData.price}</p>
        <p><strong>Category:</strong> {formData.category}</p>
        <p><strong>Image:</strong> {formData.image ? formData.image.name : "No image selected"}</p>
        {formData.image && (
          <Image src={URL.createObjectURL(formData.image)} alt="Image preview" width={200} height={200} />
        )}
        <br />
        <p><strong>File:</strong> {formData.file ? formData.file.name : "No file selected"}</p>
        {formData.file && (
          <a href={URL.createObjectURL(formData.file)} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        )}
      </div>
    </main>
  );
}
