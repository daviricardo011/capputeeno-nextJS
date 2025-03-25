"use client";

import { FiSearch, FiShoppingBag } from "react-icons/fi";
import {
  HeaderContainer,
  Logo,
  LeftSection,
  Cart,
  SearchBar,
  Container,
} from "./styles";
import { Saira_Stencil_One } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

const sairaStencil = Saira_Stencil_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <HeaderContainer data-testid="header-container">
      <Container>
        <Logo href="/" className={sairaStencil.className} data-testid="logo">
          capputeeno
        </Logo>
        <LeftSection>
          <form onSubmit={handleSearchSubmit} data-testid="search-form">
            <SearchBar data-testid="search-bar">
              <input
                placeholder="Procurando por algo específico?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="search-input"
              />
              <button type="submit" data-testid="search-button">
                <FiSearch size={24} />
              </button>
            </SearchBar>
          </form>
          <Cart href="/shoppingCart" data-testid="cart-button">
            <FiShoppingBag size={24} />
            <div>
              <span data-testid="cart-count">{cart.length}</span>
            </div>
          </Cart>
        </LeftSection>
      </Container>
    </HeaderContainer>
  );
}
