// import { getAllProducts } from "@/lib/actions/product";
// import { NormalizedProductFilters } from "@/lib/utils/query";
// import NewestBannerClient from "./NewestBannerClient";

// export default async function TrendingSection() {
//   const filters: NormalizedProductFilters = {
//     search: undefined,
//     brandSlugs: [],
//     categorySlugs: [],
//     genderSlugs: [],
//     sizeSlugs: [],
//     colorSlugs: [],
//     priceMin: undefined,
//     priceMax: undefined,
//     priceRanges: [],
//     sort: "newest",
//     page: 1,
//     limit: 12,
//   };

//   const { products } = await getAllProducts(filters);
//   console.log("products from API2:", products);

//   return <NewestBannerClient products={products} />;
// }
