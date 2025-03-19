import BackMenu from "@/components/BackMenu";
import { IProduct, products } from "@/mocks/products";
import ProductDetails from "./components/ProductDetails";

interface Props {
  params: { id: string };
}

const defaultProduct = {
  id: 0,
  src: "",
  name: "",
  price: 0,
  category: "",
  createdAt: "",
  description: "",
  quantitySold: 0,
};

export default async function ProductPage({ params }: Props) {
  const resolvedSearchParams = await params;
  const productId = Number(resolvedSearchParams?.id);
  const selectedProduct: IProduct =
    products.find((prod) => prod.id === productId) || defaultProduct;

  return (
    <main>
      <BackMenu />
      <ProductDetails product={selectedProduct} />
    </main>
  );
}
