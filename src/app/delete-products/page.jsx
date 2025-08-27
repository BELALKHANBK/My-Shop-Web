"use client";

import { useEffect, useState } from "react";

export default function DeleteProductsPage() {
  const [products, setProducts] = useState([]);

  // Load products
  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.message === "Deleted") {
      alert("Product deleted successfully!");
      loadProducts(); // reload after delete
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p._id} style={{ margin: "10px 0" }}>
              <strong>{p.name}</strong> - {p.price}{" "}
              <button
                onClick={() => handleDelete(p._id)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
