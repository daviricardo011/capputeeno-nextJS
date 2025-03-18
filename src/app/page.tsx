import CategoryMenu from "@/components/CategoriesMenu";
import { GridProducts } from "@/components/GridProducts";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";

export interface ICategory {
  id: number;
  name: string;
  value: string;
}
export interface IProduct {
  id: number;
  src: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  quantitySold: number;
}

const categories: ICategory[] = [
  { id: 1, name: "Todos os produtos", value: "" },
  { id: 2, name: "Camisetas", value: "camiseta" },
  { id: 3, name: "Canecas", value: "caneca" },
];

const products: IProduct[] = [
  {
    id: 1,
    src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lzszylrwm6o142",
    name: "T Shirt Feminina Camiseta",
    price: 24.99,
    category: "camiseta",
    createdAt: "2025-02-21T19:08:40.806Z",
    quantitySold: 1,
  },
  {
    id: 2,
    src: "https://down-br.img.susercontent.com/file/883a0156e011ad808f210267b1dad4e1",
    name: "Camiseta T-shirt Spy X Family",
    price: 49.99,
    category: "caneca",
    createdAt: "2025-03-10T19:08:40.806Z",
    quantitySold: 3,
  },
  {
    id: 3,
    src: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lkmu2aapqcib55",
    name: "T Shirt Feminina Docinho",
    price: 23.99,
    category: "camiseta",
    createdAt: "2025-03-15T19:08:40.806Z",
    quantitySold: 2,
  },
];

const itemsPerPage = 4;

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
    <main style={{ minHeight: "90vh" }}>
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
