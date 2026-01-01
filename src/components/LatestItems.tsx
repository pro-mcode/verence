import { getAllProducts } from "@/lib/actions/product";
import { NormalizedProductFilters } from "@/lib/utils/query";
import LatestItemsClient from "./LatestItemsClient";

export default async function LatestItems() {
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
    sort: "newest",
    page: 1,
    limit: 12,
  };

  const { products } = await getAllProducts(filters);

  return <LatestItemsClient products={products} />;
}
