import { CartProvider } from "@/contexts/CartContext";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TestCartProvider = ({ children }: Props) => (
  <CartProvider>{children}</CartProvider>
);
