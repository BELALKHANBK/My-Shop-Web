"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "./componets/Footer";


export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Welcome to My Shop</h2>
        <p className="text-lg mb-6">
          Discover the best products with amazing prices.
        </p>
        <Link
          href="/products"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Explore Products
        </Link>
      </section>

      {/* Product Highlights */}
      <section className="py-16 px-8">
        <h3 className="text-2xl font-bold text-center mb-10">
          Product Highlights
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mb-2 rounded"
              />
              <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
              <p>{product.description}</p>
              <p className="font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
