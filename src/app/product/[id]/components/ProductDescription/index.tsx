"use client";

import { IProduct } from "@/mocks/products";
import {
  Container,
  Description,
  DescriptionText,
  DescriptionTitle,
  MainInfo,
  ProductCategory,
  ProductPrice,
  ProductTitle,
  ProductWarning,
} from "./styles";
import { moneyMask } from "@/utils/functions";
import { categories } from "@/mocks/categories";
import AddShoppingCartButton from "../AddShoppingCartButton";

interface Props {
  product: IProduct;
}

export default function ProductDescription({ product }: Props) {
  return (
    <Container>
      <div>
        <MainInfo>
          <ProductCategory>
            {categories.find((c) => c.value === product.category)?.name}
          </ProductCategory>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductPrice>{moneyMask(product.price)}</ProductPrice>
          <ProductWarning>
            *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
            R$900,00.
          </ProductWarning>
        </MainInfo>

        <Description>
          <DescriptionTitle>DESCRIÇÃO</DescriptionTitle>
          <DescriptionText>{product.description}</DescriptionText>
        </Description>
      </div>

      <AddShoppingCartButton productId={product.id} />
    </Container>
  );
}
