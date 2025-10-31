"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        try {
            const r = localStorage.getItem('user-role');
            setRole(r);
        } catch {}
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-5">
                    <div className="flex items-center">
                        <Link href="/">
                            <div className="flex items-center text-[#194dbe] font-bold text-xl">
                                <span className="text-2xl font-bold">Clintrix ES</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="/" className="text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Home</Link>
                        <Link href="/about" className="text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Mission</Link>
                        <Link href="/features" className="text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Solution</Link>
                        {role === 'admin' ? (
                            <Link href="/admin" className="text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Admin</Link>
                        ) : (
                            <Link href="/dashboard" className="text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Dashboard</Link>
                        )}
                        <Link href="/login" className="text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Login</Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#000] focus:outline-none"
                        >
                            {/* Hamburger Icon */}
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/" className="block px-3 py-2 text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Home</Link>
                            <Link href="/about" className="block px-3 py-2 text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Mission</Link>
                            <Link href="/features" className="block px-3 py-2 text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Solution</Link>
                            {role === 'admin' ? (
                                <Link href="/admin" className="block px-3 py-2 text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Admin</Link>
                            ) : (
                                <Link href="/dashboard" className="block px-3 py-2 text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Dashboard</Link>
                            )}
                            <Link href="/login" className="block px-3 py-2 text-[#000] hover:text-opacity-80 transition-all font-medium text-base">Login</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;