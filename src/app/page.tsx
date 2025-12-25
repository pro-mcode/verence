import { db } from "../db";
import { products } from "../db/schema";
import Image from "next/image";

export default async function HomePage() {
  const items = await db.select().from(products);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Nike Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="mt-4 font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.brand}</p>
            <p className="font-bold mt-2">
              ${(product.price / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
