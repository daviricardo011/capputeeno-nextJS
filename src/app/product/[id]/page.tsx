import BackMenu from "@/components/BackMenu";
import { IProduct, products } from "@/mocks/products";
import ProductDetails from "./components/ProductDetails";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
export function generateStaticParams() {
  return products.map((prod) => ({ id: String(prod.id) }));
}
export const revalidate = 60;

export default async function ProductPage({ params }: Props) {
  const resolvedSearchParams = await params;
  const productId = Number(resolvedSearchParams?.id);
  const selectedProduct: IProduct | undefined = products.find(
    (prod) => prod.id === productId
  );

  if (!selectedProduct) {
    notFound();
  }

  return (
    <main>
      <BackMenu />
      <ProductDetails product={selectedProduct} />
    </main>
  );
}