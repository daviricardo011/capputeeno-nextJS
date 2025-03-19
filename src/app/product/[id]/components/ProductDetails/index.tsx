"use client";

import { IProduct } from "@/mocks/products";
import {
  Container,
} from "./styles";
import ProductImage from "../ProductImage";
import ProductDescription from "../ProductDescription";

interface Props {
  product: IProduct;
}

export default function ProductDetails({ product }: Props) {
  return (
    <Container>
      <ProductImage product={product} />
      <ProductDescription product={product} />
    </Container>
  );
}
