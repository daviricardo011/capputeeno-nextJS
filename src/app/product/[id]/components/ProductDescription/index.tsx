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
    <Container data-testid="product-description">
      <div>
        <MainInfo data-testid="main-info">
          <ProductCategory data-testid="product-category">
            {categories.find((c) => c.value === product.category)?.name}
          </ProductCategory>
          <ProductTitle data-testid="product-title">
            {product.name}
          </ProductTitle>
          <ProductPrice data-testid="product-price">
            {moneyMask(product.price)}
          </ProductPrice>
          <ProductWarning data-testid="product-warning">
            *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
            R$900,00.
          </ProductWarning>
        </MainInfo>

        <Description data-testid="description">
          <DescriptionTitle data-testid="description-title">
            DESCRIÇÃO
          </DescriptionTitle>
          <DescriptionText data-testid="description-text">
            {product.description}
          </DescriptionText>
        </Description>
      </div>

      <AddShoppingCartButton productId={product.id} />
    </Container>
  );
}
