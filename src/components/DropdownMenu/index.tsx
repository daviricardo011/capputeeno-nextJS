"use client";

import { useState } from "react";
import { Container, DropdownButton, Options, ScreenBackground } from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "next/navigation";

const dropdownOptions = [
  { label: "Novidades", value: "news" },
  { label: "Preço: Maior - menor", value: "highestPrice" },
  { label: "Preço: Menor - maior", value: "lowestPrice" },
  { label: "Mais vendidos", value: "bestSellers" },
];

export default function DropdownMenu() {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const updatePageParam = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortValue);
    return `/?${params.toString()}`;
  };

  return (
    <Container>
      <DropdownButton
        className="button"
        onClick={() => setDropdownOpened(!dropdownOpened)}
        $isOpened={dropdownOpened}
      >
        <span>Organizar por</span>
        {dropdownOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropdownButton>
      <ScreenBackground
        $isOpened={dropdownOpened}
        className="screenBackground"
        onClick={() => setDropdownOpened(!dropdownOpened)}
      />
      <Options className="dropdown" $isOpened={dropdownOpened}>
        {dropdownOptions.map((option) => (
          <a key={option.value} href={updatePageParam(option.value)}>
            {option.label}
          </a>
        ))}
      </Options>
    </Container>
  );
}
