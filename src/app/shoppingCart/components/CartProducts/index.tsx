"use client";

import {
  Container,
  Title,
  TotalTitle,
  ProductsContainer,
  TitleContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { moneyMask } from "@/utils/functions";
import CartProductCart, { IQntProduct } from "../CartProductCard";

interface Props {
  products: IQntProduct[];
  changeQuantity: (id: number, quantity: number) => void;
}

export default function ProductImage({ products, changeQuantity }: Props) {
  const [totals, setTotals] = useState<{ length: number; value: number }>({
    length: 0,
    value: 0,
  });

  useEffect(() => {
    const getTotals = () => {
      const totalLength = products.length;
      const totalValue = products
        .map((p) => p.price)
        .reduce((result, actual) => result + actual, 0);

      setTotals({
        length: totalLength,
        value: totalValue,
      });
    };
    getTotals();
  }, [products]);

  return (
    <Container>
      <TitleContainer>
        <Title>SEU CARRINHO</Title>
        <TotalTitle>
          Total ({totals.length} produto{totals.length > 1 ? "s" : ""}){" "}
          <b>{moneyMask(totals.value)}</b>
        </TotalTitle>
      </TitleContainer>
      <ProductsContainer>
        {products.map((product) => (
          <CartProductCart
            key={product.id}
            product={product}
            changeQuantity={changeQuantity}
          />
        ))}
      </ProductsContainer>
    </Container>
  );
}
