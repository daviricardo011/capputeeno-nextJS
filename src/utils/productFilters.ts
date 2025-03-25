import { IProduct } from "@/mocks/products";

export const filterByCategory = (
  prods: IProduct[],
  category?: string
): IProduct[] => {
  if (category && category !== "Todos os produtos")
    return prods.filter((prod) => prod.category === category);
  return prods;
};

export const filterByPage = (
  prods: IProduct[],
  page: number,
  itemsPerPage: number
): IProduct[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return prods.slice(startIndex, endIndex);
};

export const sortProducts = (
  prods: IProduct[],
  sortBy?: "news" | "highestPrice" | "lowestPrice" | "bestSellers"
): IProduct[] => {
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

export const searchProduct = (
  prods: IProduct[],
  search: string
): IProduct[] => {
  return prods.filter((prod) => prod.name.includes(search));
};
