"use client";

import { FiSearch } from "react-icons/fi";
import {
  HeaderContainer,
  Logo,
  Nav,
  Cart,
  SearchBar,
  Spacing,
  Container,
} from "./styles";
import { Saira_Stencil_One } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sairaStencil = Saira_Stencil_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <>
      <HeaderContainer>
        <Container>
          <Logo href="/" className={sairaStencil.className}>
            capputeeno
          </Logo>
          <Nav>
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
            <Cart href="/carrinho">
              <Image
                src="/cartIcon.svg"
                width={24}
                height={24}
                alt={"Sacola de compras"}
              />
              <div>
                <span>1</span>
              </div>
            </Cart>
          </Nav>
        </Container>
      </HeaderContainer>
      <Spacing />
    </>
  );
}
