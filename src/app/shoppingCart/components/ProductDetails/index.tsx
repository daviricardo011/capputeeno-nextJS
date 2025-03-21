"use client";

import { Container } from "./styles";
import CartProducts from "../CartProducts";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { IProduct, products } from "@/mocks/products";
import { IQntProduct } from "../CartProductCard";

export default function CartDetails() {
  const { cart, setCart } = useCart();
  const [cartProducts, setCartProducts] = useState<IQntProduct[]>([]);

  useEffect(() => {
    const identifyProducts = () => {
      const productCounts: { [key: number]: number } = {};
      cart.forEach((id) => {
        productCounts[id] = (productCounts[id] || 0) + 1;
      });

      const prods = Object.keys(productCounts).reduce((acc, idStr) => {
        const id = Number(idStr);
        const actualProd = products.find((p) => p.id === id);
        if (actualProd) {
          acc.push({ ...actualProd, quantity: productCounts[id] });
        }
        return acc;
      }, [] as (IProduct & { quantity: number })[]);

      setCartProducts(prods);
    };

    identifyProducts();
  }, [cart]);

  const changeQuantity = (id: number, quantity: number) => {
console.log(id)
console.log(quantity)
    const cartStr = localStorage.getItem("cart");
    let currentCart: number[] = cartStr ? JSON.parse(cartStr) : [];
    currentCart = currentCart.filter((productId) => productId !== id);
    console.log(currentCart);
    const newEntries = Array.from({ length: quantity }, () => id);
    const newCart = [...currentCart, ...newEntries];

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <Container>
      <CartProducts products={cartProducts} changeQuantity={changeQuantity} />
      {/* <ProductDescription product={product} /> */}
    </Container>
  );
}
