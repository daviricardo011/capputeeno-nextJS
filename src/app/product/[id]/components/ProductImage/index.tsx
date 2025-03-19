"use client";

import { IProduct } from "@/mocks/products";
import Image from "next/image";
import { ImageContainer } from "./styles";

interface Props {
  product: IProduct;
}

export default function ProductImage({ product }: Props) {
  return (
    <ImageContainer>
      <Image
        src={product?.src || ""}
        fill
        alt={product?.name + " Imagem"}
        style={{ borderRadius: "4px" }}
      />
    </ImageContainer>
  );
}
