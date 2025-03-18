"use client";

import { JSX } from "react";
import { Container } from "./styles";

interface Props {
  children: JSX.Element[];
}

export const GridProducts = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
