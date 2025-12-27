import Card from "../../components/Card";
import { getAllProducts } from "@/lib/actions/product";
import { NormalizedProductFilters } from "@/lib/utils/query";

export default async function HomePage() {
  // Define filters for homepage — latest published products
  const filters: NormalizedProductFilters = {
    search: undefined,
    brandSlugs: [],
    categorySlugs: [],
    genderSlugs: [],
    sizeSlugs: [],
    colorSlugs: [],
    priceMin: undefined,
    priceMax: undefined,
    priceRanges: [],
    sort: "newest", // Or leave empty/null if you want default sorting
    page: 1,
    limit: 12, // Number of products to fetch
  };

  // Fetch products from DB
  const { products } = await getAllProducts(filters);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <section aria-labelledby="latest" className="pb-12">
        <h2 id="latest" className="mb-6 text-heading-3 text-dark-900">
          Latest shoes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Card
              key={p.id}
              title={p.name}
              subtitle={p.subtitle ?? ""}
              meta=""
              imageSrc={p.imageUrl ?? "/placeholder.jpg"}
              price={p.minPrice ?? 0}
              badge={undefined} // Add logic for "New"/"Trending" badges if needed
              href={`/products/${p.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
