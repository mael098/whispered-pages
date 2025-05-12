import React from 'react'
import Image from 'next/image';
export default function page() {

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-col w-full h-full'>
        <div className='flex flex-col w-full h-full'>
          <h1 className='text-2xl font-bold'>Publicaciones</h1>
          <p className='text-gray-500'>Gestiona las publicaciones de los libros</p>
        </div>
        </div>

        <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          <div className="">
            <Image src={} ></Image>
          </div>

        </main>

    </div>
  )
}
