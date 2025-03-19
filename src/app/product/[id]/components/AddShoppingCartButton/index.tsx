"use client";

import { FiShoppingBag } from "react-icons/fi";
import { ButtonContainer } from "./styles";
import { useCart } from "@/contexts/CartContext";

interface Props {
  productId: number;
}

export default function AddShoppingCartButton({ productId }: Props) {
  const { setCart } = useCart();

  function saveProductId(): void {
    try {
      const cartStr = localStorage.getItem("cart");
      let cart: number[] = [];

      if (cartStr) {
        try {
          cart = JSON.parse(cartStr);
        } catch {
          cart = [];
        }
      }
      cart.push(productId);

      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
    } catch (error) {
      console.error("Erro ao adicionar o produto no carrinho:", error);
    }
  }

  return (
    <ButtonContainer onClick={() => saveProductId()}>
      <FiShoppingBag size={24} />
      <span>Adicionar ao carrinho</span>
    </ButtonContainer>
  );
}
