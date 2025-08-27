"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseconfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8 grid md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow">
          <img src={p.image} alt={p.name} className="mb-2 rounded" />
          <h3 className="font-bold">{p.name}</h3>
          <p>{p.description}</p>
          <p className="font-bold">${p.price}</p>
        </div>
      ))}
    </div>
  );
}
