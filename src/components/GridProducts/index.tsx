"use client";

import { JSX } from "react";
import { Container } from "./styles";

interface Props {
  children: JSX.Element[];
}

export const GridProducts = ({ children }: Props) => {
  return (
    <Container data-testid="grid-products-container">{children}</Container>
  );
};
