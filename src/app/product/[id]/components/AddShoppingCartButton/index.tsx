"use client";

import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/Button";

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
    <div data-testid="add-shopping-cart-button">
      <Button
        text={"Adicionar ao carrinho"}
        icon={FiShoppingBag}
        onClick={() => saveProductId()}
      />
    </div>
  );
}
