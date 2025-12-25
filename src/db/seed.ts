import { db } from "./index";
import { products } from "./schema";

async function seed() {
  await db.insert(products).values([
    {
      name: "Nike Air Force 1",
      brand: "Nike",
      price: 12000,
      imageUrl: "https://static.nike.com/a/images/air-force-1.jpg",
    },
    {
      name: "Nike Dunk Low",
      brand: "Nike",
      price: 11000,
      imageUrl: "https://static.nike.com/a/images/dunk-low.jpg",
    },
    {
      name: "Nike Air Max 270",
      brand: "Nike",
      price: 15000,
      imageUrl: "https://static.nike.com/a/images/air-max-270.jpg",
    },
  ]);

  console.log("✅ Seed complete");
}

seed();
