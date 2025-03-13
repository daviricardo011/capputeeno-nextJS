"use client";

import { FiSearch } from "react-icons/fi";
import { HeaderContainer, Logo, Nav, Cart, SearchBar } from "./styles";
import { Saira_Stencil_One } from "next/font/google";
import Image from "next/image";

const sairaStencil = Saira_Stencil_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  return (
    <HeaderContainer>
      <Logo href="/" className={sairaStencil.className}>
        capputeeno
      </Logo>
      <Nav>
        <SearchBar>
          <input placeholder="Procurando por algo específico?" />
          <FiSearch size={24} />
        </SearchBar>
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
    </HeaderContainer>
  );
}
