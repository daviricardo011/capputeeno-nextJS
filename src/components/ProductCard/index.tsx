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
    <Container href={`/product/${id}`}>
      <Image
        src={src}
        width={256}
        height={300}
        alt={"Produto"}
        style={{ borderTopRightRadius: "8px", borderTopLeftRadius: "8px" }}
      />

      <p>{name}</p>
      <HorizontalLine />
      <Price>{moneyMask(price)}</Price>
    </Container>
  );
}
