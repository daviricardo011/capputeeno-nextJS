"use client";

import { Container, NavMenu, NavItem } from "./styles";
import { useSearchParams } from "next/navigation";
import DropdownMenu, { IDropdownOption } from "../DropdownMenu";
import { ICategory } from "@/mocks/categories";

interface Props {
  categories: ICategory[];
}

const dropdownOptions: IDropdownOption[] = [
  { label: "Novidades", value: "news" },
  { label: "Preço: Maior - menor", value: "highestPrice" },
  { label: "Preço: Menor - maior", value: "lowestPrice" },
  { label: "Mais vendidos", value: "bestSellers" },
];

export default function CategoryMenu({ categories }: Props) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const createOptions = () => {
    const options = categories.map((cat) => ({
      label: cat.name,
      value: cat.value,
    }));
    return options;
  };

  return (
    <Container data-testid="category-menu">
      <div className={"onlyDesktop"} data-testid="desktop-nav">
        <NavMenu data-testid="nav-menu">
          {categories.map((cat) => (
            <NavItem
              key={cat.id}
              $isActive={activeCategory === cat.value}
              href={cat.value ? `/?category=${cat.value}` : `/`}
              data-testid={`nav-item-${cat.value}`}
            >
              {cat.name}
            </NavItem>
          ))}
        </NavMenu>
      </div>
      <div className={"onlyMobile"} data-testid="mobile-dropdown">
        <DropdownMenu
          title={"Filtrar por"}
          options={createOptions()}
          position={"left"}
          type={"category"}
          data-testid="filter-dropdown"
        />
      </div>
      <DropdownMenu
        title={"Organizar por"}
        options={dropdownOptions}
        position={"right"}
        type={"sortBy"}
        data-testid="sort-dropdown"
      />
    </Container>
  );
}
