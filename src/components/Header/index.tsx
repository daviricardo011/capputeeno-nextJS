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
    <HeaderContainer>
      <Container>
        <Logo href="/" className={sairaStencil.className}>
          capputeeno
        </Logo>
        <LeftSection>
          <form onSubmit={handleSearchSubmit}>
            <SearchBar>
              <input
                placeholder="Procurando por algo específico?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FiSearch size={24} />
              </button>
            </SearchBar>
          </form>
          <Cart href="/shoppingCart">
            <FiShoppingBag size={24} />
            <div>
              <span>{cart.length}</span>
            </div>
          </Cart>
        </LeftSection>
      </Container>
    </HeaderContainer>
  );
}
