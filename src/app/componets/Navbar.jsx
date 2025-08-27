"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-xl font-bold">My Shop</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-300">
            Products
          </Link>

          {user ? (
            <>
              <Link
                href="/belal/add-products"
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
              >
                Add Product
              </Link>
              <span className="ml-2">Hi, {user.email}</span>
              <button
                onClick={() => signOut(auth)}
                className="ml-2 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/products" className="block hover:text-gray-300" onClick={() => setMenuOpen(false)}>
            Products
          </Link>

          {user ? (
            <>
            <Link
                href="/delete-products"
                className="block px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                delete
              </Link>
              <Link
                href="/belal/add-products"
                className="block px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                Add Product
              </Link>
              <p className="text-sm">Hi, {user.email}</p>
              <button
                onClick={() => {
                  signOut(auth);
                  setMenuOpen(false);
                }}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block px-3 py-1 bg-green-600 rounded hover:bg-green-700"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
