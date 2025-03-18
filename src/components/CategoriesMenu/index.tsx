"use client";

import { Container, NavMenu, NavItem } from "./styles";
import { useSearchParams } from "next/navigation";
import { ICategory } from "@/app/page";
import DropdownMenu from "../DropdownMenu";

interface Props {
  categories: ICategory[];
}

export default function CategoryMenu({ categories }: Props) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  return (
    <Container>
      <NavMenu>
        {categories.map((cat) => (
          <NavItem
            key={cat.id}
            $isActive={activeCategory === cat.value}
            href={cat.value ? `/?category=${cat.value}` : `/`}
          >
            {cat.name}
          </NavItem>
        ))}
      </NavMenu>
      <DropdownMenu />
    </Container>
  );
}
