import CategoryMenu from "@/components/CategoriesMenu";
import { GridProducts } from "@/components/GridProducts";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/mocks/categories";
import { IProduct, products } from "@/mocks/products";
import {
  filterByCategory,
  filterByPage,
  searchProduct,
  sortProducts,
} from "@/utils/productFilters";

export const itemsPerPage = 12;

interface HomeProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const actualPage = Number(resolvedSearchParams?.page || 1);
  const actualCategory = resolvedSearchParams?.category || undefined;
  const sortBy = resolvedSearchParams?.sortBy || undefined;
  const search = resolvedSearchParams?.search || "";

  const filterItems = (): IProduct[] => {
    const searchedProducts = search
      ? searchProduct(products, search as string)
      : products;
    const byCategory = filterByCategory(
      searchedProducts,
      actualCategory as string
    );
    const byPage = filterByPage(byCategory, actualPage, itemsPerPage);
    const sortedProducts = sortProducts(
      byPage,
      sortBy as "news" | "highestPrice" | "lowestPrice" | "bestSellers"
    );

    return sortedProducts;
  };

  const filteredItems = filterItems();

  return (
    <main>
      <CategoryMenu categories={categories} />
      <Pagination itemsPerPage={itemsPerPage} products={products} />
      <GridProducts>
        {filteredItems.map((p, index) => (
          <ProductCard key={p.name + index} product={p} />
        ))}
      </GridProducts>
      <Pagination itemsPerPage={itemsPerPage} products={products} />
    </main>
  );
}
