"use client";

import { moneyMask } from "@/utils/functions";
import { Container, HorizontalLine, Price } from "./styles";
import Image from "next/image";

interface Props {
  src: string;
  name: string;
  price: number;
}

export default function ProductCard({ src, name, price }: Props) {
  return (
    <Container>
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
