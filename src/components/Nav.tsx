'use client'
import Link from "next/link";
import React from "react";



export default function Navegaction(  ) {
    return (
            <nav className="flex justify-center items-center h-16  text-(--text-color) shadow-md font-geist-sans text-lg bg-fixed scroll-auto">
                <div className="container mx-auto flex justify-between">
                    <div className="flex justify-center items-center">
                        <Link href={'/'}>biblioteca</Link>
                    </div>
                <ul className="flex justify-center items-center space-x-6">
                    <li className="cursor-pointer">
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
                </div>
            </nav>
    );
}
