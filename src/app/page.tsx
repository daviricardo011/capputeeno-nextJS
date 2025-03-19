import CategoryMenu from "@/components/CategoriesMenu";
import { GridProducts } from "@/components/GridProducts";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/mocks/categories";
import { IProduct, products } from "@/mocks/products";

const itemsPerPage = 12;

interface HomeProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const actualPage = Number(resolvedSearchParams?.page || 1);
  const actualCategory = resolvedSearchParams?.category || undefined;
  const sortBy = resolvedSearchParams?.sortBy || undefined;
  const search = resolvedSearchParams?.search || "";

  const filterByCategory = (prods: IProduct[]): IProduct[] => {
    if (actualCategory && actualCategory !== "Todos os produtos")
      return prods.filter((prod) => prod.category === actualCategory);
    return prods;
  };

  const filterByPage = (prods: IProduct[]): IProduct[] => {
    const startIndex = (actualPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return prods.slice(startIndex, endIndex);
  };

  const sortProducts = (prods: IProduct[]): IProduct[] => {
    const sortedProducts = [...prods];

    switch (sortBy) {
      case "news":
        return sortedProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "highestPrice":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "lowestPrice":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "bestSellers":
        return sortedProducts.sort((a, b) => b.quantitySold - a.quantitySold);
      default:
        return sortedProducts;
    }
  };

  const searchProduct = (): IProduct[] => {
    return products.filter((prod) => prod.name.includes(search as string));
  };

  const filterItems = (): IProduct[] => {
    const searchedProducts = search ? searchProduct() : products;
    const byCategory = filterByCategory(searchedProducts);
    const byPage = filterByPage(byCategory);
    const sortedProducts = sortProducts(byPage);

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
