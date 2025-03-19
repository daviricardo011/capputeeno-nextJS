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
        layout="responsive"
        objectFit="cover"
        width={640}
        height={480}
        alt={product?.name + " Imagem"}
        style={{ borderRadius: "4px" }}
      />
    </ImageContainer>
  );
}
