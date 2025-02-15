'use client'
import Link from "next/link";
import React from "react";

export default function Navigation() {
    return (
        <nav className="flex flex-row justify-between items-center w-full h-16 px-6 bg-[#a67c52] text-white shadow-md" aria-label="Main Navigation">
            <div className="flex flex-row items-center gap-4">
                <Link href={"#"} className="text-xl font-bold">Logo</Link>
            </div>
            <ul className="flex flex-row items-center gap-6">
                <li className="font-mono">
                    <Link href={"#"} className="hover:text-gray-400 transition duration-300">Home</Link>
                </li>
                <li>
                    <Link href={"#"} className="hover:text-gray-400 transition duration-300">Downloads</Link>
                </li>
                <li>
                    <Link href={"#"} className="hover:text-gray-400 transition duration-300">Contact</Link>
                </li>
                <li>
                    <Link href={"#"} className="hover:text-gray-400 transition duration-300">My Profile</Link>
                </li>
                <li>
                    <Link href={"#"} className="hover:text-gray-400 transition duration-300">Author</Link>
                </li>
            </ul>
            <div className="flex flex-row items-center gap-4">
                <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500 transition duration-300">Sign Up</button>
            </div>
        </nav>
    );
}
