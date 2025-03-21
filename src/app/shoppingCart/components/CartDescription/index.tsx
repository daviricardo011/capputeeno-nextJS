"use client";

import {
  Container,
  Title,
  TotalTitle,
  DescriptionContainer,
  TotalsContainer,
  TotalText,
  HorizontalLine,
  LinksContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { moneyMask } from "@/utils/functions";
import { IQntProduct } from "../CartProductCard";
import Button from "@/components/Button";

interface Props {
  products: IQntProduct[];
}
const shippingFee = 40;

const links = [
  { value: "help", label: "Ajuda" },
  { value: "refunds", label: "Reembolsos" },
  { value: "shipping", label: "Entregas e frete" },
  { value: "returns", label: "Trocas e devoluções" },
];

export default function CartDescription({ products }: Props) {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getTotal = () => {
      const totalValue = products
        .map((p) => p.price * (p.quantity || 1))
        .reduce((result, actual) => result + actual, 0);

      setTotal(totalValue);
    };
    getTotal();
  }, [products]);

  return (
    <Container>
      <DescriptionContainer>
        <Title>RESUMO DO PEDIDO</Title>
        <TotalsContainer>
          <TotalText>
            <span>Subtotal de produtos</span>
            <span>{moneyMask(total)}</span>
          </TotalText>
          <TotalText>
            <span>Entrega</span>
            <span>{moneyMask(shippingFee)}</span>
          </TotalText>
          <HorizontalLine />
          <TotalText>
            <TotalTitle>Total</TotalTitle>
            <TotalTitle>{moneyMask(shippingFee + total)}</TotalTitle>
          </TotalText>
        </TotalsContainer>
        <Button
          text={"FINALIZAR A COMPRA"}
          onClick={() => console.log("Finalizar")}
          secondary
        />
      </DescriptionContainer>
      <LinksContainer>
        {links.map((l) => (
          <a key={l.value} href={`/faq/#${l.value}`}>
            {l.label}
          </a>
        ))}
      </LinksContainer>
    </Container>
  );
}
