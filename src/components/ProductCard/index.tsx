"use client";

import { moneyMask } from "@/utils/functions";
import { Container, HorizontalLine, Price } from "./styles";
import Image from "next/image";
import { IProduct } from "@/mocks/products";

interface Props {
  product: IProduct;
}

export default function ProductCard({ product }: Props) {
  const { id, src, name, price } = product;

  return (
    <Container href={`/product/${id}`} data-testid={`product-card-${id}`}>
      <Image
        src={src}
        width={256}
        height={300}
        alt={"Produto"}
        style={{ borderTopRightRadius: "8px", borderTopLeftRadius: "8px" }}
        data-testid={`product-image-${id}`}
      />

      <p data-testid={`product-name-${id}`}>{name}</p>
      <HorizontalLine />
      <Price data-testid={`product-price-${id}`}>{moneyMask(price)}</Price>
    </Container>
  );
}
