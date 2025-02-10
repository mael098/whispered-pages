import Navegaction from "@/components/Nav";
import Image from "next/image";
export default function Home(){
  return (
    <div className="container max-h-max max-w-full">
      <Navegaction/>
      <main className="flex justify-center items-center h-screen">
        <div className="flex flex-col min-h-screen justify-center items-center">
          <div className="absolute -z-10">
          <Image alt="imagen " src={'https://i.pinimg.com/736x/0a/67/80/0a67804ea01a2c18bd6209afebe5feb0.jpg'} width={100} height={100} className="" />
          </div>
          <h1 className="text-3xl ">bienvenido a la comunidad</h1>
        </div>
      </main>
      <footer className="flex justify-center items-center h-20">
        <p>footer</p>
      </footer>
    </div>
  );
}
